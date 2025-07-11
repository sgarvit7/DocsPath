'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  AuthError
} from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { sendMagicLink } from '@/utils/emailMagicLink'
import Image from 'next/image'
import EmailInput from './publicPageComponents/EmailInput'
import { setEmail } from '@/store/userSlice'
import PreloginPhoneInput from "./publicPageComponents/PreloginPhoneInput";

interface FormData {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function SignUpPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [isSendingVerification, setIsSendingVerification] = useState(false)
  const [verifiedEmails, setVerifiedEmails] = useState<Set<string>>(new Set())
  const router = useRouter()
  const searchParams = useSearchParams()

useEffect(() => {
  if (typeof window !== 'undefined') {
    const savedFormData = window.sessionStorage.getItem('signupFormData')
    const savedVerifiedEmails = window.sessionStorage.getItem('verifiedEmails')
    
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData)
        setForm(parsedData)
      } catch (error) {
        console.error('Error parsing saved form data:', error)
      }
    }

    if (savedVerifiedEmails) {
      try {
        const parsedEmails = JSON.parse(savedVerifiedEmails)
        setVerifiedEmails(new Set(parsedEmails))
      } catch (error) {
        console.error('Error parsing saved verified emails:', error)
      }
    }

    // Check if coming back from email verification
    const verified = searchParams?.get('verified')
    if (verified === 'true') {
      // Check both localStorage and sessionStorage for the email
      const emailFromLocalStorage = window.localStorage.getItem('emailForSignIn')
      const emailFromSession = savedFormData ? JSON.parse(savedFormData).email : ''
      const emailToVerify = emailFromLocalStorage || emailFromSession
      
      if (emailToVerify) {
        // Add to verified emails set
        setVerifiedEmails(prev => {
          const newSet = new Set(prev)
          newSet.add(emailToVerify)
          // Save to sessionStorage
          window.sessionStorage.setItem('verifiedEmails', JSON.stringify([...newSet]))
          return newSet
        })
        
        // Update form with verified email
        setForm(prev => {
          const updatedForm = { ...prev, email: emailToVerify }
          // Save updated form data
          window.sessionStorage.setItem('signupFormData', JSON.stringify(updatedForm))
          return updatedForm
        })
        
        // Clear the localStorage item
        if (emailFromLocalStorage) {
          window.localStorage.removeItem('emailForSignIn')
        }
        
        // Clear the URL parameter
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('verified')
        window.history.replaceState({}, '', newUrl.toString())
      }
    }
  }
}, [searchParams])

  // Save form data to sessionStorage whenever form changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('signupFormData', JSON.stringify(form))
    }
  }, [form])

  // Save verified emails to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('verifiedEmails', JSON.stringify([...verifiedEmails]))
    }
  }, [verifiedEmails])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing again
    if (error) setError('')
    
    // Reset email verification sent state if email changes
    if (name === 'email') {
      setEmailVerificationSent(false)
    }
  }

  const checkPhoneExists = async (phoneNumber: string): Promise<boolean> => {
    try {
      setIsChecking(true)
      const response = await axios.post('/api/check-phone', { phoneNumber })
      return response.data.exists
    } catch (err) {
      console.error('Error checking phone number:', err)
      setError('Error verifying phone number. Please try again.')
      return false
    } finally {
      setIsChecking(false)
    }
  }

  const handleSendVerification = async () => {
    if (!form.email) {
      setError('Please enter your email address first')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address')
      return
    }

    // Check if email is already verified
    if (verifiedEmails.has(form.email)) {
      setError('This email is already verified')
      return
    }

    setIsSendingVerification(true)
    setError('')

    const result = await sendMagicLink(form.email)
    
    if (result.success) {
      setEmailVerificationSent(true)
      setError('')
    } else {
      setError(result.error || 'Failed to send verification email')
    }
    
    setIsSendingVerification(false)
  }

  const handleSubmit = async () => {
    setError('')
    const { name, email, phone, password, confirmPassword } = form

    // Validate form fields
    if (!name) return setError('Name is required')
    if (!email) return setError('Email is required')
    if (!verifiedEmails.has(email)) return setError('Please verify your email before proceeding')
    if (!phone) return setError('Phone number is required')
    if (!password) return setError('Password is required')
    if (password !== confirmPassword) return setError('Passwords do not match')

    try {
      // Check if phone number already exists
      const phoneExists = await checkPhoneExists(phone)
      if (phoneExists) {
        return setError('This phone number is already registered. Please use a different number or sign in.')
      }

      // Proceed with user creation
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(res.user, { displayName: name })

      // Store phone temporarily for OTP linking
      window.sessionStorage.setItem('userData', JSON.stringify({ name, email, phone }))
      // Clear signup form data as registration is successful
      window.sessionStorage.removeItem('signupFormData')
      window.sessionStorage.removeItem('verifiedEmails')
      
      router.push('/sign-up/verify-otp')
    } catch (err: unknown) {
      if (err instanceof Error) {
        const authError = err as AuthError;
        if (authError.code === 'auth/email-already-in-use') {
          setError('Email is already in use')
        } else if (authError.code === 'auth/invalid-email') {
          setError('Invalid email format')
        } else if (authError.code === 'auth/weak-password') {
          setError('Password should be at least 6 characters')
        } else {
          setError('Something went wrong. Please try again.')
        }
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const {user} = await signInWithPopup(auth, provider)
      console.log( user.displayName,  user.email)
      window.sessionStorage.setItem('userData', JSON.stringify({ name: user.displayName, email: user.email }))
      // Clear signup form data
      window.sessionStorage.removeItem('signupFormData')
      window.sessionStorage.removeItem('verifiedEmails')
      router.push('/clinic-onboarding')
    } catch (err: unknown) {
      console.log(err)
      setError('Google Sign-in failed')
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider()
      const {user} = await signInWithPopup(auth, provider)
      window.sessionStorage.setItem('userData', JSON.stringify({ name: user.displayName, email: user.email }))
      // Clear signup form data 
      window.sessionStorage.removeItem('signupFormData')
      window.sessionStorage.removeItem('verifiedEmails')
      router.push('/clinic-onboarding')
    } catch (error) {
      console.log(error)
      setError('Facebook Sign-in failed')
    }
  }

  const handleSignIn = () => {
    router.push('/sign-in')
  }

  // Listen for email verification from the magic link page (popup scenario)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleEmailVerified = (event: CustomEvent) => {
        const email = event.detail?.email || form.email
        if (email) {
          setVerifiedEmails(prev => {
            const newSet = new Set(prev)
            newSet.add(email)
            return newSet
          })
          setEmailVerificationSent(false)
        }
      }

      window.addEventListener('emailVerified', handleEmailVerified as EventListener)
      
      return () => {
        window.removeEventListener('emailVerified', handleEmailVerified as EventListener)
      }
    }
  }, [form.email])

  // Determine email field state
  const isCurrentEmailVerified = verifiedEmails.has(form.email)
  const shouldShowVerifyButton = form.email && !isCurrentEmailVerified

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Section */}
        <div className="bg-teal-700 text-white p-8 md:w-1/3 flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto mb-4">
              <Image src="/assets/docspath-logo.png" alt="Docspath" width={200} height={200} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome</h2>
          <p className="text-sm opacity-80">to keep connected with us<br />please login with your personal info</p>
        </div>

        {/* Right Section */}
        <div className="p-8 flex-1">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-teal-700">Create Account</h1>
            <p className="text-gray-500 text-sm">Sign Up & Begin Your Journey!</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
            </div>

            <div className="relative">
              <PreloginPhoneInput />
            </div>

            <div className="relative">
              <div className="flex">
                <EmailInput value={form.email} onChange={setEmail} />
                {/* <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`flex-1 p-3 border ${isCurrentEmailVerified ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-l-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10`}
                  disabled={isCurrentEmailVerified}
                /> */}
                {/* <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleSendVerification}
                  disabled={isSendingVerification || isCurrentEmailVerified || !shouldShowVerifyButton}
                  className={`px-4 py-3 rounded-r-lg text-sm font-medium transition duration-300 ${
                    isCurrentEmailVerified 
                      ? 'bg-green-600 text-white cursor-default' 
                      : isSendingVerification || !shouldShowVerifyButton
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-teal-700 text-white hover:bg-teal-800'
                  }`}
                >
                  {isCurrentEmailVerified ? 'Verified' : isSendingVerification ? 'Sending...' : 'Verify Email'}
                </motion.button> */}
              </div>
              <span className="absolute left-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              {isCurrentEmailVerified && (
                <span className="absolute right-20 top-3 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>

            {emailVerificationSent && !isCurrentEmailVerified && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-blue-600 text-sm bg-blue-50 p-3 rounded border border-blue-200"
              >
                📧 Verification email sent! Please check your inbox and click the verification link to continue.
              </motion.div>
            )}

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 p-2 rounded"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isChecking || !isCurrentEmailVerified}
              className={`w-full ${isChecking || !isCurrentEmailVerified ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800'} text-white py-3 rounded-lg font-medium transition duration-300`}
            >
              {isChecking ? 'Checking...' : 'Sign Up'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignIn}
              className="w-full bg-white text-teal-700 py-3 rounded-lg font-medium border border-teal-700 transition duration-300 mt-3"
            >
              Sign In
            </motion.button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleGoogleSignIn}
                className="p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFacebookSignIn}
                className="p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}