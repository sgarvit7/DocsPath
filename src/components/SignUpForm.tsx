"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useSignInWithFacebook } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const SignUpForm = () => {
  const router = useRouter();
  
  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Firebase hooks
  const [createUserWithEmailAndPassword, user, loading, error] = 
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = 
    useSignInWithGoogle(auth);
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = 
    useSignInWithFacebook(auth);

  // Form validation
  const isFormValid = () => {
    if (!name || !phone || !email || !password || !confirmPassword) return false;
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return false;
    }
    setPasswordMismatch(false);
    return true;
  };

  // Setup reCAPTCHA verifier
  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  };

  // Send OTP to phone
  const sendOTP = async () => {
    if (!phone || phone.length < 10) {
      return alert('Please enter a valid phone number');
    }

    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      
      // Store confirmation result in session storage to access it on the OTP page
      window.sessionStorage.setItem('confirmationResult', JSON.stringify({ 
        verificationId: confirmationResult.verificationId 
      }));
      
      // Store user data in session storage to access after OTP verification
      window.sessionStorage.setItem('userData', JSON.stringify({
        name,
        phone,
        email,
        password
      }));
      
      // Navigate to OTP verification page
      router.push('/sign-up/verify-otp');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
      // Reset reCAPTCHA
      (window as any).recaptchaVerifier.clear();
      (window as any).recaptchaVerifier = null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;
    
    try {
      // Send OTP instead of directly creating user
      await sendOTP();
    } catch (err) {
      console.error('Error during signup process:', err);
    }
  };

  // Get the appropriate error message
  const getErrorMessage = () => {
    if (passwordMismatch) return "Passwords don't match";
    if (error) return error.message;
    if (googleError) return googleError.message;
    if (facebookError) return facebookError.message;
    return '';
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-teal-50">
      <div className="flex w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Left Panel */}
        <div className="w-2/5 bg-teal-800 p-8 text-white">
          <div className="flex h-full flex-col items-center">
            <div className="my-6 flex w-20 h-20 items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 10C34.4444 10 30 14.4444 30 20C30 25.5556 34.4444 30 40 30C45.5556 30 50 25.5556 50 20C50 14.4444 45.5556 10 40 10ZM40 15C42.7778 15 45 17.2222 45 20C45 22.7778 42.7778 25 40 25C37.2222 25 35 22.7778 35 20C35 17.2222 37.2222 15 40 15Z" fill="white"/>
                <path d="M40 0C17.9167 0 0 17.9167 0 40C0 62.0833 17.9167 80 40 80C62.0833 80 80 62.0833 80 40C80 17.9167 62.0833 0 40 0ZM40 5C59.3333 5 75 20.6667 75 40C75 59.3333 59.3333 75 40 75C20.6667 75 5 59.3333 5 40C5 20.6667 20.6667 5 40 5Z" fill="white"/>
                <path d="M55 30H25C20.5833 30 17.5 33.0833 17.5 37.5V60C17.5 64.4167 20.5833 67.5 25 67.5H55C59.4167 67.5 62.5 64.4167 62.5 60V37.5C62.5 33.0833 59.4167 30 55 30ZM57.5 60C57.5 61.6667 56.6667 62.5 55 62.5H25C23.3333 62.5 22.5 61.6667 22.5 60V37.5C22.5 35.8333 23.3333 35 25 35H55C56.6667 35 57.5 35.8333 57.5 37.5V60Z" fill="white"/>
                <path d="M35 50H45V55H35V50Z" fill="white"/>
                <path d="M30 40H50V45H30V40Z" fill="white"/>
              </svg>
            </div>
            
            <h2 className="mb-4 mt-8 text-3xl font-bold">Welcome</h2>
            
            <p className="text-center text-sm opacity-80">
              to keep connected with us<br />
              please login with your personal info
            </p>
          </div>
        </div>
        
        {/* Right Panel - Form */}
        <div className="w-3/5 p-8">
          <div className="flex flex-col items-center">
            <h1 className="mb-1 text-2xl font-bold text-teal-800">Create Account</h1>
            <p className="mb-6 text-sm text-gray-500">Sign Up & Begin Your Journey!</p>
            
            {/* Error message display */}
            {getErrorMessage() && (
              <div className="mb-4 w-full rounded bg-red-100 p-2 text-center text-sm text-red-600">
                {getErrorMessage()}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:border-teal-500 focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="#9CA3AF"/>
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+91"
                    className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:border-teal-500 focus:outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6667 10.2733L9.98 9.94667C9.58 9.88667 9.18 10.02 8.90667 10.3L7.56 11.6467C5.48 10.58 3.75333 8.86 2.68667 6.77333L4.04 5.42C4.32 5.14 4.45333 4.74 4.39333 4.34667L4.06667 1.66667C3.96667 1.01333 3.41333 0.533333 2.75333 0.533333H1.46667C0.733333 0.533333 0.126667 1.14 0.186667 1.87333C0.673333 7.84 5.49333 12.6533 11.4533 13.14C12.1867 13.2 12.7933 12.5933 12.7933 11.86V10.5733C12.8 9.92 12.32 9.36667 12.6667 9.26667V10.2733Z" fill="#9CA3AF"/>
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:border-teal-500 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3333 2.66667H2.66667C1.93333 2.66667 1.34 3.26667 1.34 4L1.33333 12C1.33333 12.7333 1.93333 13.3333 2.66667 13.3333H13.3333C14.0667 13.3333 14.6667 12.7333 14.6667 12V4C14.6667 3.26667 14.0667 2.66667 13.3333 2.66667ZM13.3333 5.33333L8 8.66667L2.66667 5.33333V4L8 7.33333L13.3333 4V5.33333Z" fill="#9CA3AF"/>
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:border-teal-500 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6667 5.33333H11.3333V4C11.3333 2.16 9.84 0.666667 8 0.666667C6.16 0.666667 4.66667 2.16 4.66667 4V5.33333H3.33333C2.6 5.33333 2 5.93333 2 6.66667V13.3333C2 14.0667 2.6 14.6667 3.33333 14.6667H12.6667C13.4 14.6667 14 14.0667 14 13.3333V6.66667C14 5.93333 13.4 5.33333 12.6667 5.33333ZM8 11.3333C7.26667 11.3333 6.66667 10.7333 6.66667 10C6.66667 9.26667 7.26667 8.66667 8 8.66667C8.73333 8.66667 9.33333 9.26667 9.33333 10C9.33333 10.7333 8.73333 11.3333 8 11.3333ZM6 5.33333V4C6 2.89333 6.89333 2 8 2C9.10667 2 10 2.89333 10 4V5.33333H6Z" fill="#9CA3AF"/>
                    </svg>
                  </span>
                  <button 
                    type="button" 
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className={`w-full rounded-md border ${
                      passwordMismatch ? 'border-red-500' : 'border-gray-300'
                    } p-3 pl-10 focus:border-teal-500 focus:outline-none`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6667 5.33333H11.3333V4C11.3333 2.16 9.84 0.666667 8 0.666667C6.16 0.666667 4.66667 2.16 4.66667 4V5.33333H3.33333C2.6 5.33333 2 5.93333 2 6.66667V13.3333C2 14.0667 2.6 14.6667 3.33333 14.6667H12.6667C13.4 14.6667 14 14.0667 14 13.3333V6.66667C14 5.93333 13.4 5.33333 12.6667 5.33333ZM8 11.3333C7.26667 11.3333 6.66667 10.7333 6.66667 10C6.66667 9.26667 7.26667 8.66667 8 8.66667C8.73333 8.66667 9.33333 9.26667 9.33333 10C9.33333 10.7333 8.73333 11.3333 8 11.3333ZM6 5.33333V4C6 2.89333 6.89333 2 8 2C9.10667 2 10 2.89333 10 4V5.33333H6Z" fill="#9CA3AF"/>
                    </svg>
                  </span>
                  <button 
                    type="button" 
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>
              
              {/* Invisible reCAPTCHA container */}
              <div id="recaptcha-container"></div>
              
              <button
                type="submit"
                className="mb-3 w-full rounded-md bg-teal-800 py-3 text-white hover:bg-teal-700 focus:outline-none"
                disabled={loading || googleLoading || facebookLoading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
              
              <button
                type="button"
                onClick={() => window.location.href = '/signin'}
                className="mb-6 w-full rounded-md border border-teal-800 py-3 text-teal-800 hover:bg-teal-50 focus:outline-none"
              >
                Sign In
              </button>
              
              <div className="flex items-center justify-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => signInWithGoogle()}
                  className="rounded-full p-2 hover:bg-gray-100"
                  disabled={googleLoading}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </button>
                
                <button
                  type="button"
                  onClick={() => signInWithFacebook()}
                  className="rounded-full p-2 hover:bg-gray-100"
                  disabled={facebookLoading}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#1877F2" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;