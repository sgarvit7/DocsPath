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
        return 15;
      case 2:
        return 30;
      case 3:
        return 45;
      case 4:
        return 60;
      case 5:
        return 75;
      case 6:
        return 90;

      default:
        return 25;
    }
  };

  const getImage = () => {
    switch (currentStep) {
      case 1:
        return "/assets/onboarding/docs/docc.jpg";
      case 2:
        return "/assets/onboarding/admin/clinic.jpg";
      case 3:
        return "/assets/onboarding/docs/doc8.avif";
      case 4:
        return "/assets/onboarding/docs/doc111.jpg";
      case 5:
        return "/assets/onboarding/docs/doc100.webp";
      case 6:
        return "/assets/onboarding/docs/doc77.png";
      default:
        return "/assets/onboarding/docs/doc10.jpeg";
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <Image
        src="/assets/bg-pattern.png"
        alt=""
        width={500}
        height={350}
        className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180"
      />
      <Image
        src="/assets/lower-bg-pattern.png"
        alt=""
        width={500}
        height={350}
        className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-50"
      />

      {/* Main container */}
      <div className="flex items-center z-50 justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl h-auto lg:h-[70vh] shadow-2xl z-50 overflow-hidden max-w-4xl w-full"
        >
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left side - Branding */}
            <div className="w-full lg:w-[380px] bg-white text-white flex flex-col justify-center items-center relative p-0 lg:p-0">
              <div className="text-center flex flex-col justify-center items-center h-full">
                {/* Medical icon */}
                <div>
                  <Image
                    src={getImage()}
                    alt="Docspath"
                    width={800}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Form content */}
            <div className="w-full lg:w-2/3 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-screen flex flex-col">
              {/* Header */}
              <div className="text-center mb-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#086861] mb-2">
                  DocMin onboarding
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base">
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
                    <div className="text-right text-[#086861] font-bold text-xs sm:text-sm">
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
