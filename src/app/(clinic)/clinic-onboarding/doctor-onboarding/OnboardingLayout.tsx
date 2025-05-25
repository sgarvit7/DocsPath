import React from 'react';
import { motion } from 'framer-motion';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children, currentStep }) => {
  const getProgressPercentage = () => {
    switch (currentStep) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 75;
      case 4: return 99;
      default: return 25;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-teal-200/30 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-teal-200/30 to-transparent rounded-tr-full"></div>
      <div className="absolute top-1/2 right-0 w-1/5 h-1/5 bg-gradient-to-l from-teal-100/20 to-transparent rounded-l-full"></div>

      {/* Main container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
          style={{ minHeight: '600px' }}
        >
          <div className="flex h-full">
            {/* Left side - Branding */}
            <div className="w-1/3 bg-teal-600 text-white p-8 flex flex-col justify-center items-center relative">
              <div className="text-center">
                {/* Medical icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto">
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      {/* Stethoscope icon */}
                      <path 
                        d="M20 8C16 8 14 12 14 16V28C14 32 16 36 20 40C22 42 24 42 26 40C30 36 32 32 32 28V16C32 12 30 8 26 8H20Z" 
                        stroke="white" 
                        strokeWidth="2" 
                        fill="none"
                      />
                      <path 
                        d="M38 8C42 8 44 12 44 16V28C44 32 42 36 38 40C36 42 34 42 32 40" 
                        stroke="white" 
                        strokeWidth="2" 
                        fill="none"
                      />
                      <circle cx="23" cy="48" r="8" stroke="white" strokeWidth="2" fill="none"/>
                      <circle cx="41" cy="48" r="8" stroke="white" strokeWidth="2" fill="none"/>
                      <path d="M26 40L23 48" stroke="white" strokeWidth="2"/>
                      <path d="M32 40L41 48" stroke="white" strokeWidth="2"/>
                      <path d="M20 16H26" stroke="white" strokeWidth="2"/>
                      <path d="M20 20H26" stroke="white" strokeWidth="2"/>
                      <path d="M38 16H44" stroke="white" strokeWidth="2"/>
                      <path d="M38 20H44" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold mb-4">Join Us</h1>
                <p className="text-teal-100 text-sm leading-relaxed">
                  to keep connected with us<br />
                  please enter your personal info
                </p>
              </div>
            </div>

            {/* Right side - Form content */}
            <div className="w-2/3 p-8 flex flex-col">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-teal-600 mb-2">Doctor onboarding</h2>
                <p className="text-gray-500 text-sm">Sign Up & Begin Your Journey!</p>
                
                {/* Progress bar */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-right text-teal-600 font-medium text-sm">
                      {getProgressPercentage()}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <motion.div 
                      className="bg-teal-600 h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>

              {/* Form content */}
              <div className="flex-1">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingLayout;