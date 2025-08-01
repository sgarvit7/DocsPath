'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { verifyMagicLink } from '../../utils/emailMagicLink'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [error, setError] = useState('')
  const router = useRouter()
  // const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = window.location.href
        const result = await verifyMagicLink(url)
        
        if (result.success) {
          setStatus('success')
          
          // Get the email from localStorage (set during magic link sending)
          const emailForSignIn = window.localStorage.getItem('emailAddress')
          
          if (emailForSignIn) {
            // Store the verified email in sessionStorage to match SignUpPage
            const existingVerifiedEmails = window.sessionStorage.getItem('verifiedEmails')
            let verifiedEmails = []
            
            if (existingVerifiedEmails) {
              try {
                verifiedEmails = JSON.parse(existingVerifiedEmails)
              } catch (e) {
                console.log(e);
                verifiedEmails = []
              }
            }
            
            // Add the verified email if not already present
            if (!verifiedEmails.includes(emailForSignIn)) {
              verifiedEmails.push(emailForSignIn)
              window.sessionStorage.setItem('verifiedEmails', JSON.stringify(verifiedEmails))
            }

            // Also update the signup form data to include the verified email
            const existingFormData = window.sessionStorage.getItem('signupFormData')
            if (existingFormData) {
              try {
                const formData = JSON.parse(existingFormData)
                // Update email if it's empty or matches the verified email
                if (!formData.email || formData.email === emailForSignIn) {
                  formData.email = emailForSignIn
                  window.sessionStorage.setItem('signupFormData', JSON.stringify(formData))
                }
              } catch (e) {
                console.log(e);
                // If form data doesn't exist or is corrupted, create new one
                const newFormData = {
                  name: '',
                  email: emailForSignIn,
                  phone: '',
                  password: '',
                  confirmPassword: ''
                }
                window.sessionStorage.setItem('signupFormData', JSON.stringify(newFormData))
              }
            } else {
              // Create form data with verified email
              const newFormData = {
                name: '',
                email: emailForSignIn,
                phone: '',
                password: '',
                confirmPassword: ''
              }
              window.sessionStorage.setItem('signupFormData', JSON.stringify(newFormData))
            }
          }
          
          // Check if this is a popup window
          if (window.opener && !window.opener.closed) {
            // Dispatch event to notify the parent signup page
            const event = new CustomEvent('emailVerified', {
              detail: { email: emailForSignIn }
            })
            window.opener.dispatchEvent(event)
            
            // Close this popup window after 2 seconds
            setTimeout(() => {
              window.close()
            }, 2000)
          } else {
            // If not opened in a popup, redirect to signup page with verification flag
            setTimeout(() => {
              router.push('/sign-up?verified=true')
            }, 2000)
          }
        } else {
          setStatus('error')
          setError(result.error || 'Verification failed')
        }
      } catch (err) {
        console.error('Verification error:', err)
        setStatus('error')
        setError('An unexpected error occurred')
      }
    }

    verifyEmail()
  }, [router])

  const handleRetry = () => {
    if (window.opener && !window.opener.closed) {
      window.close()
    } else {
      router.push('/sign-up')
    }
  }

  const handleGoToSignUp = () => {
    if (window.opener && !window.opener.closed) {
      // Focus the parent window and close this one
      window.opener.focus()
      window.close()
    } else {
      router.push('/sign-up')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center"
      >
        {status === 'verifying' && (
          <div>
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 animate-spin">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="12" cy="12" r="10" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-teal-700 mb-2">Verifying Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        )}

        {status === 'success' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-4">Your email has been successfully verified. You can now complete your registration.</p>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoToSignUp}
                className="w-full bg-teal-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition duration-300"
              >
                Continue to Sign Up
              </motion.button>
              <p className="text-sm text-gray-500">
                {window.opener && !window.opener.closed 
                  ? "This window will close automatically in 2 seconds..." 
                  : "Click the button above to continue with your registration"
                }
              </p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="bg-teal-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition duration-300"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}