import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
}) => {
  const getProgressPercentage = () => {
    switch (currentStep) {
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 75;
      case 4:
        return 99;
      default:
        return 25;
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
          style={{ minHeight: "600px" }}
        >
          <div className="flex h-full">
            {/* Left side - Branding */}
            <div className="w-1/3 bg-[#086861] text-white p-8 flex flex-col justify-center items-center relative">
              <div className="text-center flex flex-col justify-center items-center">
                {/* Medical icon */}
                <div className="mb-2">
                  <Image
                    src="/assets/docspath-logo.png"
                    alt="Docspath"
                    width={100}
                    height={100}
                  ></Image>
                </div>

                <h1 className="text-2xl font-bold mb-4">Join Us</h1>
                <p className="text-teal-100 text-sm leading-relaxed">
                  to keep connected with us
                  <br />
                  please enter your personal info
                </p>
              </div>
            </div>

            {/* Right side - Form content */}
            <div className="w-2/3 p-8 flex flex-col">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-[#086861] mb-2">
                  Doctor onboarding
                </h2>
                <p className="text-gray-500 text-sm">
                  Sign Up & Begin Your Journey!
                </p>

                {/* Progress bar */}
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <motion.div
                      className="bg-[#086861] h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="flex justify-center items-center m-2">
                    <div className="text-right text-[#086861] font-bold text-sm">
                      {getProgressPercentage()}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Form content */}
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
