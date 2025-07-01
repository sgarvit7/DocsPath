"use client";
import React, { useState } from 'react';
import { 
  Shield, 
  MessageCircle, 
  Sparkles, 
  Users, 
  RefreshCw 
} from 'lucide-react';

interface IncludedFeature {
  text: string;
  icon: React.ReactNode;
}

const PricingSection: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const includedFeatures: IncludedFeature[] = [
    {
      text: "Top-tier security",
      icon: <Shield className="w-5 h-5" />
    },
    {
      text: "Live support",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      text: "Feature enhancements",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      text: "Dedicated onboarding",
      icon: <Users className="w-5 h-5" />
    },
    {
      text: "Regular updates",
      icon: <RefreshCw className="w-5 h-5" />
    }
  ];

  const FeaturePill: React.FC<{ feature: IncludedFeature }> = ({ feature }) => (
    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg`}>
      {feature.icon}
      <span className="text-sm font-medium">{feature.text}</span>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-teal-200 rounded-full opacity-20"></div>
        <div className="absolute top-32 left-20 w-24 h-24 bg-teal-300 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 right-32 w-40 h-40 bg-teal-100 rounded-full opacity-10"></div>
        <div className="absolute bottom-40 left-10 w-28 h-28 bg-teal-200 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-teal-300 rounded-full opacity-20"></div>
        
        {/* Hexagonal shapes */}
        <div className="absolute top-20 left-1/3 w-16 h-16 transform rotate-45 border-2 border-teal-200 opacity-30"></div>
        <div className="absolute bottom-32 right-1/3 w-12 h-12 transform rotate-12 border-2 border-teal-300 opacity-25"></div>
        <div className="absolute top-1/3 left-20 w-8 h-8 transform -rotate-45 border-2 border-teal-200 opacity-40"></div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 flex items-center space-x-3 z-10">
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Dark mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
            darkMode ? 'bg-teal-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
              darkMode ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Header */}
      <div className="bg-teal-600 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">
            Pricing Plans
          </h1>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              No hidden costs. No guesswork
            </h2>
            <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Explore flexible plans built for solo practitioners, group clinics, and enterprise hospitals 
              with enterprise-grade features in every tier.
            </p>
          </div>

          {/* All Plans Include Section */}
          <div className={`p-8 rounded-2xl shadow-lg mb-12 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <h3 className={`text-2xl font-semibold mb-8 text-center ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              All plans include:
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {includedFeatures.map((feature, index) => (
                <FeaturePill key={index} feature={feature} />
              ))}
            </div>
          </div>

          {/* Separator Line */}
          <div className={`w-full h-px mb-12 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>

          {/* Call to Action Section */}
          <div className="text-center">
            <h3 className={`text-3xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Start the Transformation Today
            </h3>
            <p className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join over 10,000 doctors and healthcare providers who trust DocsPath to modernize their practice, 
              enhance patient satisfaction, and grow without limits.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
              <button className={`w-full sm:w-auto border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-teal-50'
              }`}>
                Request a Demo
              </button>
            </div>
          </div>

          {/* Statistics or Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <div className="text-3xl font-bold text-teal-600 mb-2">10,000+</div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Healthcare Providers
              </div>
            </div>
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <div className="text-3xl font-bold text-teal-600 mb-2">99.9%</div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Uptime Guarantee
              </div>
            </div>
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Premium Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;