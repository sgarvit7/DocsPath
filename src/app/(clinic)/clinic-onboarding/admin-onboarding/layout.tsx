'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Image from 'next/image';

export default function AdminOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AdminOnboardingWrapper>{children}</AdminOnboardingWrapper>
    </Provider>
  );
}

function AdminOnboardingWrapper({ children }: { children: React.ReactNode }) {
  const currentStep = useSelector((state: RootState) => state.admin.currentStep);
  // const steps = ['Personal Info', 'Clinic Info', 'Documents'];
  
  const getProgressPercentage = () => {
    const stepPercentages = [15, 40, 65];
    return stepPercentages[currentStep] || 0;
  };
  
  return (
    <div className="min-h-screen bg-[#f0f9f9] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md overflow-hidden max-w-3xl w-full"
      >
        <div className="flex">
          <div className="bg-[#00665B] w-1/3 p-6 text-white flex flex-col justify-center items-center">
            <div className="mb-8 flex flex-col items-center">
              <div className="mb-2">
                <Image src="/assets/docspath-logo.png" alt="Docspath" width={100} height={100}></Image>
              </div>
              <h2 className="text-2xl font-bold text-center">Join Us</h2>
            </div>
            <p className="text-sm t">
              to keep connected with us
              <br />please enter your personal info
            </p>
          </div>
          <div className="flex-1 p-8">
            <div className="mb-8">
              <h2 className="text-[#00665B] text-2xl font-bold text-center">Admin onboarding</h2>
              <p className="text-gray-500 text-center text-sm">Sign Up & Begin Your Journey!</p>
              
              <div className="mt-4 relative">
                <div className="h-1 bg-gray-200 rounded-full">
                  <motion.div 
                    className="h-1 bg-[#00665B] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.5 , ease: "linear"}}
                  />
                </div>
                <div className="text-[#00665B] text-xs mt-1 text-right">{getProgressPercentage()}%</div>
              </div>
            </div>
            
            {children}
            
          </div>
        </div>
      </motion.div>
    </div>
  );
}