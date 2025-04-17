"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase/config';
import { PhoneAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';

const OtpVerificationForm = () => {
  const router = useRouter();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Load confirmation result and user data from session storage
  useEffect(() => {
    const userData = window.sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setPhone(parsedData.phone);
    } else {
      // If no userData is found, redirect back to signup
      router.push('/signup');
    }
    
    // Start countdown timer
    startTimer();
  }, [router]);
  
  // Handle timer countdown
  const startTimer = () => {
    const countdownInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(countdownInterval);
  };
  
  // Format timer to MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Move focus to next input if current input is filled
    if (value && index < 5) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle backspace key
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  // Handle input focus
  const handleFocus = (index: number) => {
    setActiveInput(index);
  };
  
  // Handle clicking on an input box
  const handleClick = (index: number) => {
    setActiveInput(index);
    inputRefs.current[index]?.select();
  };
  
  // Set up refs for input elements
  const setRef = (index: number, ref: HTMLInputElement | null) => {
    inputRefs.current[index] = ref;
  };
  
  // Handle OTP resend
  const handleResendOtp = async () => {
    setIsResending(true);
    setError('');
    
    try {
      // Setup recaptcha verifier
      if (!(window as any).recaptchaVerifier) {
        // This would typically be in your main component
        // For this implementation, we'd redirect to signup
        router.push('/signup');
        return;
      }
      
      const userData = window.sessionStorage.getItem('userData');
      if (!userData) {
        router.push('/signup');
        return;
      }
      
      const parsedData = JSON.parse(userData);
      
      // Using the existing verifier from signup page
      const appVerifier = (window as any).recaptchaVerifier;
      
      // Resend OTP
      const confirmationResult = await signInWithPhoneNumber(auth, parsedData.phone, appVerifier);
      
      // Store new confirmation result
      window.sessionStorage.setItem('confirmationResult', JSON.stringify({ 
        verificationId: confirmationResult.verificationId 
      }));
      
      // Reset timer
      setTimer(60);
      startTimer();
      
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };
  
  // Handle form submission - updated for 6-digit OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }
    
    try {
      // Get verification ID from session storage
      const confirmationResultString = window.sessionStorage.getItem('confirmationResult');
      const userData = window.sessionStorage.getItem('userData');
      
      if (!confirmationResultString || !userData) {
        setError('Session expired. Please try again.');
        router.push('/signup');
        return;
      }
      
      const { verificationId } = JSON.parse(confirmationResultString);
      const parsedUserData = JSON.parse(userData);
      
      // Create credential using verification ID and OTP
      const credential = PhoneAuthProvider.credential(verificationId, otpValue);
      
      // Sign in with phone credential
      await signInWithCredential(auth, credential);
      
      // After phone verification, create user with email/password
      await createUserWithEmailAndPassword(
        auth,
        parsedUserData.email,
        parsedUserData.password
      );
      
      // Clear session storage
      window.sessionStorage.removeItem('confirmationResult');
      window.sessionStorage.removeItem('userData');
      
      // Redirect to dashboard or success page
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle email signup instead
  const handleEmailSignup = () => {
    router.push('/signup?method=email');
  };
  
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-teal-50 p-4">
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
        {/* Left Panel */}
        <div className="w-full bg-teal-800 p-6 text-white md:w-2/5 md:p-8">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-6">
              <div className="relative mx-auto h-32 w-24 md:h-44 md:w-32">
                <svg viewBox="0 0 120 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                  {/* Phone outline */}
                  <rect x="10" y="10" width="100" height="200" rx="15" stroke="white" strokeWidth="4" fill="#075e54" />
                  {/* Screen */}
                  <rect x="20" y="30" width="80" height="160" rx="2" fill="white" />
                  {/* Camera */}
                  <circle cx="60" cy="20" r="3" fill="black" />
                  {/* OTP Text */}
                  <text x="60" y="70" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="black" textAnchor="middle">OTP</text>
                  {/* 6 Boxes */}
                  <rect x="23" y="90" width="12" height="12" rx="2" stroke="black" strokeWidth="1" fill="none" />
                  <rect x="38" y="90" width="12" height="12" rx="2" stroke="black" strokeWidth="1" fill="none" />
                  <rect x="53" y="90" width="12" height="12" rx="2" stroke="black" strokeWidth="1" fill="none" />
                  <rect x="68" y="90" width="12" height="12" rx="2" stroke="black" strokeWidth="1" fill="none" />
                  <rect x="83" y="90" width="12" height="12" rx="2" stroke="black" strokeWidth="1" fill="none" />
                  <rect x="98" y="90" width="12" height="12" rx="2" stroke="black" strokeWidth="1" fill="none" transform="translate(-13, 0)" />
                  {/* Lock icon */}
                  <circle cx="60" cy="130" r="15" fill="#4ecdc4" />
                  <rect x="55" y="127" width="10" height="12" rx="2" fill="white" />
                  <rect x="57" y="122" width="6" height="7" rx="3" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
            <p className="text-center text-sm mb-3">
              Enter 6-digit OTP<br />
              that you received on<br />
              <span className="font-semibold">{phone || '+91 11111 11111'}</span>
            </p>
            <button 
              onClick={() => router.push('/signup')}
              className="mt-6 rounded-full bg-teal-700 px-6 py-2 text-sm text-white hover:bg-teal-600 focus:outline-none"
            >
              Get Help
            </button>
          </div>
        </div>
        
        {/* Right Panel - Form */}
        <div className="w-full p-6 md:w-3/5 md:p-8">
          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="mb-1 text-xl font-bold text-teal-800 md:text-2xl">Enter your OTP</h1>
            <p className="mb-6 text-sm text-gray-500">Verify your account</p>
            
            {/* Error message */}
            {error && (
              <div className="mb-4 w-full rounded bg-red-100 p-2 text-center text-sm text-red-600">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              {/* OTP Input Boxes - Updated to 6 digits */}
              <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(ref) => setRef(index, ref)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={() => handleFocus(index)}
                    onClick={() => handleClick(index)}
                    className="h-12 w-12 rounded-md bg-gray-50 text-center text-lg font-bold focus:border-teal-500 focus:bg-white focus:outline-none md:h-14 md:w-14 md:text-xl"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              
              {/* Timer and Resend */}
              <div className="mb-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || isResending}
                  className={`text-sm ${
                    timer > 0 || isResending
                      ? 'text-gray-400'
                      : 'text-teal-800 hover:underline'
                  }`}
                >
                  Reset OTP in
                </button>
                <span className="text-sm font-medium">
                  {formatTime()} seconds
                </span>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="mb-4 w-full rounded-md bg-teal-800 py-3 text-white hover:bg-teal-700 focus:outline-none disabled:bg-teal-300"
              >
                {loading ? 'Verifying...' : 'Sign Up'}
              </button>
              
              {/* Email Alternative */}
              <div className="text-center">
                <p className="mb-4 text-sm text-gray-500">
                  Trouble signing up? Try email instead.
                </p>
                <button
                  type="button"
                  onClick={handleEmailSignup}
                  className="w-full rounded-md border border-teal-800 py-3 text-teal-800 hover:bg-teal-50 focus:outline-none"
                >
                  Sign up with Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationForm;