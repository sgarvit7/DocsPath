"use client";
import React from "react";
import clsx from "clsx";
import {
  Shield,
  MessageCircle,
  Sparkles,
  Users,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

// ✅ Import Roboto font
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

interface IncludedFeature {
  text: string;
  icon: React.ReactNode;
}

interface PricingSectionProps {
  darkMode?: boolean;
  id?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  darkMode = false,
  id,
}) => {
  const includedFeatures: IncludedFeature[] = [
    {
      text: "Top-tier security",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      text: "Live support",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      text: "Feature enhancements",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      text: "Dedicated onboarding",
      icon: <Users className="w-5 h-5" />,
    },
    {
      text: "Regular updates",
      icon: <RefreshCw className="w-5 h-5" />,
    },
  ];

  const FeaturePill: React.FC<{ feature: IncludedFeature }> = ({
    feature,
  }) => (
    <div className="inline-flex items-center space-x-2 px-6 py-4 rounded-lg text-white bg-[#08685EA1] hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg">
      <span className={clsx("text-xl sm:text-2xl font-medium", roboto.className)}>
        {feature.text}
      </span>
    </div>
  );

  return (
    
    <section
      id={id}
      className={clsx(
        "relative min-h-screen transition-colors duration-300",
        darkMode ? "bg-gray-900" : "bg-[white]"
      )}
    >
      {/* ✅ Background Image */}
      <div className="absolute inset-0 -z-0 h-full w-full hidden lg:block">
        <Image
          src={
            darkMode
              ? "/assets/prelogin-img/home/faq-pattern-black-1.png"
              : "/assets/prelogin-img/pricing1.png"
          }
          alt="Background"
          fill
          className="bg-contain"
          priority
        />
      </div>
      <Image
        src="/assets/lower-bg-pattern.png"
        alt="bg"
        width={350}
        height={350}
        className="absolute top-20 -right-0 z-0 rotate-180 scale-x-[-1] opacity-50"
      />

      <div className="relative z-10">
        {/* Header Banner */}
        <div className="bg-[#086861] py-8">
          <div className="container w-full px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
              Pricing Plans
            </h1>
          </div>
        </div>

        <div className="relative container py-12 sm:py-16 px-4 sm:px-8">
          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-12">
              <h2
                className={clsx(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold mb-6",
                  darkMode ? "text-white" : "text-[#086861]"
                )}
              >
                No hidden costs. No guesswork
              </h2>
              <p
                className={clsx(
                  "text-base sm:text-lg lg:text-xl font-bold max-w-5xl",
                  darkMode ? "text-gray-300" : "text-[black]",
                  roboto.className
                )}
              >
                Explore flexible plans built for solo practitioners, group
                clinics, and enterprise hospitals with enterprise-grade features
                in every tier.
              </p>
            </div>

            {/* All Plans Include */}
            <div className="p-4 sm:p-8 rounded-2xl mb-12">
              <h3
                className={clsx(
                  "text-2xl sm:text-3xl lg:text-4xl font-bold mb-8",
                  darkMode ? "text-white" : "text-[black]",
                  roboto.className
                )}
              >
                All plans include:
              </h3>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-14 max-w-6xl mb-6">
                {includedFeatures.map((feature, index) => (
                  <FeaturePill key={index} feature={feature} />
                ))}
              </div>
            </div>

            {/* Separator */}
            <div
              className={clsx(
                "w-full h-px mb-12",
                darkMode ? "bg-gray-700" : "bg-gray-900"
              )}
            />

            {/* Call to Action */}
            <div className="text-left">
              <h3
                className={clsx(
                  "text-2xl sm:text-3xl lg:text-4xl font-bold mb-6",
                  darkMode ? "text-white" : "text-black",
                  roboto.className
                )}
              >
                Start the Transformation Today
              </h3>
              <p
                className={clsx(
                  "text-base sm:text-lg lg:text-xl leading-relaxed font-bold mb-8",
                  darkMode ? "text-gray-300" : "text-black",
                  roboto.className
                )}
              >
                Join over 10,000 doctors and healthcare providers who trust
                DocsPath to modernize their practice, enhance patient
                satisfaction, and grow without limits.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-2xl mx-auto">
                <a href="/free-trail">
                <button
                // onClick={() => router.push("/free-trail")}
                  className={clsx(
                    "w-full sm:w-auto cursor-pointer bg-[#086861] hover:bg-teal-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-20 rounded-full transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-xl",
                    roboto.className
                  )}
                >
                  Start Free Trial
                </button>
                </a>
                <a href="/request-demo">
                <button
                // onClick={() => router.push("/request-demo")}
                  className={clsx(
                    "w-full sm:w-auto cursor-pointer border-2 border-[#086861] font-semibold py-3 sm:py-4 px-6 sm:px-20 rounded-full shadow-xl transition-all duration-200 transform hover:scale-105",
                    darkMode
                      ? "text-white hover:bg-gray-800"
                      : "text-[#086861] hover:bg-teal-50",
                    roboto.className
                  )}
                >
                  Request a Demo
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
