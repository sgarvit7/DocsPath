"use client";
import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { Bell } from "lucide-react";

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  features: Feature[];
  price: number;
}

const PricingPlans: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [countryCode, setCountryCode] = useState<string>("US");
  const [currency, setCurrency] = useState<string>("");

  useEffect(() => {
    const storedCode = localStorage.getItem("countryCode") || "US";
    const sanitizedCode = storedCode.replace(/"/g, '');
    setCountryCode(storedCode);
    console.log("Country Code: ", storedCode);
    
    const fetchCurrency = async () => {
      try {
        
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${sanitizedCode}`
        );
        const data = await res.json();

        if (!Array.isArray(data) || !data[0] || !data[0].currencies) {
          console.error("Invalid country data received:", data);
          return;
        }

        const currencyCode = Object.keys(data[0].currencies)[0];
        const currencySymbol = data[0].currencies[currencyCode]?.symbol || "";
        setCurrency(currencySymbol);
      } catch (error) {
        console.error("Failed to fetch currency:", error);
      }
    };
    fetchCurrency();
  }, []);

  const plans: Plan[] = [
    {
      name: "Basic",
      features: [
        { text: "Essential report & analytics access", included: true },
        {
          text: "Basic online booking system with standard reminders",
          included: true,
        },
        { text: "Standard OPD booking access", included: true },
        { text: "Up to 30 days of record storage", included: true },
        {
          text: "Standard transcription with manual adjustments",
          included: true,
        },
        { text: "AI Avatars", included: false },
        {
          text: "Basic chatbot responses & limited automation",
          included: true,
        },
        { text: "Communication via Chat & audio calls", included: true },
        { text: "Standard Invoicing features", included: true },
        { text: "Smart patient engagement", included: false },
        { text: "Standered invoicing features", included: true },
        { text: "Selected third party integrations", included: true },
        { text: "Plug and play EHR", included: false },
      ],
      price: 10000,
    },
    {
      name: "Premium",
      features: [
        {
          text: "Advanced insights with full real time data visibility",
          included: true,
        },
        {
          text: "Smart scheduling, automated reminders & dynamic slot optimization",
          included: true,
        },
        {
          text: "Priority booking with intelligent slot management",
          included: true,
        },
        {
          text: "AI enhanced record with predictive analytics, structural insights & long term data retention",
          included: true,
        },
        {
          text: "AI powered transcription with structured medical notes",
          included: true,
        },
        {
          text: "Fully interactive AI avatars for patient engagement",
          included: true,
        },
        {
          text: "Advanced AI driven chat & voice agents for 24/7 patient interaction",
          included: true,
        },
        {
          text: "Communication via HD video, Audio & chat with real time full syncing & automated follow-ups",
          included: true,
        },
        {
          text: "AI driven proactive engagement & personalised health tracking",
          included: true,
        },
        {
          text: "Automated claim processing & seamless payment tracking",
          included: true,
        },
        {
          text: "Full interoperability with major healthcare platforms",
          included: true,
        },
        {
          text: "Instant deployment with seamless workflow integration",
          included: true,
        },
      ],
      price: 20000,
    },
  ];

  const FeatureItem: React.FC<{ feature: Feature; planName: string }> = ({
    feature,
    planName,
  }) => (
    <div className="flex items-start space-x-3 mb-3">
      <div className="flex-shrink-0 mt-0.5">
        {feature.included ? (
          <div
            className={`${
              planName === "Premium" ? "w-3 h-3" : "w-5 h-5"
            } bg-black rounded-full flex items-center justify-center`}
          >
            <Check
              className={`${
                planName === "Premium" ? "w-2 h-2" : "w-3 h-3"
              } text-white`}
            />
          </div>
        ) : (
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" />
        )}
      </div>
      <span
        className={`leading-relaxed ${
          planName === "Premium" ? "text-xs" : "text-sm"
        } ${darkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        {feature.text}
      </span>
    </div>
  );

  /* --- PlanCard.tsx (only the className lines changed) --- */

  const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => (
    <div
      className={`relative flex flex-col  /* 👈 NEW */
                w-[450px] rounded-lg p-10 shadow-lg
                transition-all duration-300 hover:shadow-xl
                ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
    >
      {/* Plan Header */}
      <div className="absolute mb-6 -left-2 w-1/2">
        <div className="absolute -top-6 font-semibold text-white text-base">
          {/* Left tail */}
          <div className="absolute rotate-270 -bottom-2 left-0 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-[#064b47]" />
          {/* Slanted Ribbon */}
          <div
            className="relative text-white px-6 py-2 w-fit"
            style={{
              backgroundColor: "#086861",
              clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)",
            }}
          >
            {plan.name} {currency} {plan.price}
          </div>
        </div>
      </div>

      {/* Features List ─ now flex‑grows */}
      <div className="flex-grow space-y-2 mb-8 mt-8">
        {" "}
        {/* 👈 NEW flex-grow */}
        {plan.features.map((feature, i) => (
          <FeatureItem key={i} feature={feature} planName={plan.name} />
        ))}
      </div>

      {/* Button stays at the bottom of every card */}
      <button
        className="w-1/2 mx-auto text-white font-semibold px-10 py-3
                 rounded-full border border-white
                 shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
        style={{ backgroundColor: "#086861" }}
      >
        See more
      </button>
    </div>
  );

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background Pattern */}
      <Image
        src="/assets/bg-pattern.png"
        alt="bg"
        width={350}
        height={350}
        className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180"
      ></Image>

      <Image
        src="/assets/lower-bg-pattern.png"
        alt="bg"
        width={350}
        height={350}
        className="absolute bottom-0 right-0 z-0 opacity-50"
      ></Image>

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
        <Bell className="w-6 h-6" />
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Dark mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-10 h-5 rounded-full cursor-pointer border border-black transition-colors duration-200 ${
            darkMode ? "bg-teal-600" : "bg-white"
          }`}
        >
          <div
            className={`absolute -top-0.5 -left-2 w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Pick a plan that&apos;s right for you
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Choose your plan who fits your needs. All plans include essential
            features to get you started!
          </p>
        </div>

        {/* Plans Grid */}
        <div className="flex justify-center grid md:grid-col-1 lg:grid-cols-2  items-stretch w-4/5 h-full gap-20 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
