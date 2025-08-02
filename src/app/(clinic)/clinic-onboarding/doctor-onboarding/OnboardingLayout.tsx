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
        return 20;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      default:
        return 80;
    }
  };

  const getImage = () => {
    switch (currentStep) {
      case 1:
        return "/assets/onboarding/docs/doc10.jpeg";
      case 2:
        return "/assets/onboarding/docs/doc8.avif";
      case 3:
        return "/assets/onboarding/docs/doc22.webp";
      case 4:
        return "/assets/onboarding/docs/doc77.png";
      default:
        return "/assets/onboarding/docs/doc10.jpeg";
    }
  };

  return (
    <div className="min-h-screen bg-teal-50  overflow-hidden">
      <div className="fixed top-4 right-4 z-50">
        <a
          href="/sign-up"
          className="bg-teal-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium hover:bg-teal-700 transition"
        >
          Register as a Admin
        </a>
      </div>
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
      <div className="flex  items-center z-50 justify-center  p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl mt-15 h-[72vh] shadow-2xl z-50 overflow-hidden max-w-4xl w-full"
          style={{ minHeight: "500px" }}
        >
          <div className="flex h-full">
            {/* Left side - Branding */}
            <div className="w-[380px] bg-[#086861] relative overflow-hidden h-full text-white ">
              
                {/* Medical icon */}
                <div className="h-full ">
                  <Image
                    src= {getImage()}
                    alt="Docspath"
                    width={1100}
                    height={100}
                  // fill
                  className="object-cover"
                  />
                </div>

                {/* <h1 className="text-2xl font-bold mb-4">Join Us</h1>
                <p className="text-teal-100 text-sm leading-relaxed">
                  to keep connected with us
                  <br />
                  please enter your personal info
                </p> */}
              
            </div>

            {/* Right side - Form content */}
            <div className="w-2/3 p-8 overflow-y-auto max-h-screen flex flex-col">
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
