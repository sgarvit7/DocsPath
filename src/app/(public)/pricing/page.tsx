"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useCountry } from "@/contexts/CountryContext";
import { motion } from "framer-motion";
import Link from "next/link";

interface Feature {
  text: string;
  included: boolean;
}
interface PlanTemplate {
  name: "Basic" | "Premium";
  features: Feature[];
  basePrice: number;
}

const priceTable: Record<string, { basic: number; premium: number }> = {

//   Code	Country Name
// IN	India
// US	United States
// GB	United Kingdom
// AE	United Arab Emirates
// AU	Australia
// CA	Canada
// DE	Germany
// FR	France
// SG	Singapore
// JP	Japan
// KR	South Korea
// ZA	South Africa
// BR	Brazil
// MX	Mexico
// NG	Nigeria
// ID	Indonesia
// TH	Thailand
// MY	Malaysia
// PH	Philippines
// VN	Vietnam
// PK	Pakistan
// BD	Bangladesh
// RU	Russia
// EG	Egypt

  IN: { basic: 10000, premium: 20000 },
  US: { basic: 120, premium: 240 },
  GB: { basic: 99, premium: 199 },
  AE: { basic: 439, premium: 879 },
  AU: { basic: 180, premium: 360 },
  CA: { basic: 160, premium: 320 },
  DE: { basic: 109, premium: 219 },
  FR: { basic: 109, premium: 219 },
  SG: { basic: 160, premium: 320 },
  JP: { basic: 17800, premium: 35600 },
  KR: { basic: 158000, premium: 316000 },
  ZA: { basic: 1999, premium: 3999 },
  BR: { basic: 599, premium: 1199 },
  MX: { basic: 2199, premium: 4399 },
  NG: { basic: 80000, premium: 160000 },
  ID: { basic: 950000, premium: 1890000 },
  TH: { basic: 3900, premium: 7800 },
  MY: { basic: 499, premium: 999 },
  PH: { basic: 3400, premium: 6800 },
  VN: { basic: 250000, premium: 500000 },
  PK: { basic: 34000, premium: 68000 },
  BD: { basic: 10500, premium: 21000 },
  RU: { basic: 9900, premium: 19800 },
  EG: { basic: 3700, premium: 7400 },
};

const PricingPlans: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const [useDynamicPricing, setDynamic] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dynamicPricing") === "true";
    }
    return false;
  });

  const { countryCode } = useCountry();
  const [currency, setCurrency] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("dynamicPricing", String(useDynamicPricing));
  }, [useDynamicPricing]);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await res.json();
        const code = Object.keys(data?.[0]?.currencies ?? {})[0];
        setCurrency(data?.[0]?.currencies?.[code]?.symbol ?? "");
      } catch (err) {
        console.error("Currency fetch failed:", err);
        setCurrency("");
      }
    };
    fetchCurrency();
  }, [countryCode]);

  const planTemplates: PlanTemplate[] = [
    {
      name: "Basic",
      basePrice: 10000,
      features: [
        { text: "✔ Essential report & analytics access", included: true },
        { text: "✔ Basic online booking system with standard reminders", included: true },
        { text: "✔ Standard OPD booking access", included: true },
        { text: "✔ Up to 30 days of record storage", included: true },
        { text: "✔Standard transcription with manual adjustments", included: true },
        { text: "✔ Basic chatbot responses & limited automation", included: true },
        { text: "✔ Communication via Chat & audio calls", included: true },
        { text: "✔ Standard invoicing features", included: true },
        { text: "✔ Smart patient engagement", included: false },
        { text: "❌ Selected third‑party integrations", included: true },
        { text: "❌ Plug‑and‑play EHR", included: false },
        { text: "❌ AI Avatars", included: false },
        { text: "❌ Advanced insights with full real‑time data visibility", included: true },
        { text: "❌ Smart scheduling, automated reminders & dynamic slot optimisation", included: true },
        { text: "❌ Priority booking with intelligent slot management", included: true },
        { text: "❌ AI‑enhanced record with predictive analytics & structural insights", included: true },
        { text: "❌ AI‑powered transcription with structured medical notes", included: true },
        { text: "❌ Fully interactive AI avatars for patient engagement", included: true },
      ],
    },
    {
      name: "Premium",
      basePrice: 20000,
      features: [
        { text: "✔ Advanced insights with full real‑time data visibility", included: true },
        { text: "✔ Smart scheduling, automated reminders & dynamic slot optimisation", included: true },
        { text: "✔ Priority booking with intelligent slot management", included: true },
        { text: "✔ AI‑enhanced record with predictive analytics & structural insights", included: true },
        { text: "✔ AI‑powered transcription with structured medical notes", included: true },
        { text: "✔ Fully interactive AI avatars for patient engagement", included: true },
        { text: "✔ Advanced AI‑driven chat & voice agents (24/7)", included: true },
        { text: "✔ HD video, audio & chat with real‑time sync", included: true },
        { text: "✔ AI‑driven proactive engagement & personalised tracking", included: true },
        { text: "✔ Automated claim processing & payment tracking", included: true },
        { text: "✔ Full interoperability with major healthcare platforms", included: true },
        { text: "✔ Instant deployment with seamless workflow integration", included: true },
        { text: "✔ Essential report & analytics access", included: true },
        { text: "✔ Basic online booking system with standard reminders", included: true },
        { text: "✔ Standard OPD booking access", included: true },
        { text: "✔ Up to 30 days of record storage", included: true },
        { text: "✔Standard transcription with manual adjustments", included: true },
      ],
    },
  ];

  const plans = useMemo(() => {
    const lookup = priceTable[countryCode];
    return planTemplates.map(({ name, features, basePrice }) => {
      const dynamicPrice = lookup?.[name.toLowerCase() as "basic" | "premium"] ?? basePrice;
      return {
        name,
        features,
        price: useDynamicPricing ? dynamicPrice : basePrice,
      };
    });
  }, [useDynamicPricing, countryCode]);

  const FeatureItem: React.FC<{ feature: Feature; planName: string }> = ({ feature }) => (
    <div className="flex items-start space-x-3 mb-3">
      <span
        className={`leading-relaxed text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        {feature.text}
      </span>
    </div>
  );

  const PlanCard: React.FC<{ plan: (typeof plans)[number] }> = ({ plan }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <motion.div
        layout
        transition={{ layout: { duration: 0.5, type: "spring" } }}
        className={`relative flex flex-col w-full sm:w-[400px] lg:w-[450px] rounded-lg p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-300 hover:shadow-xl ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <div className="absolute mb-6 -left-2 w-1/2">
          <div className="absolute -top-6 font-semibold text-white text-base">
            <div className="absolute rotate-270 -bottom-2 left-0 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-[#064b47]" />
            <div
              className="relative px-6 py-2 w-fit text-white"
              style={{
                backgroundColor: "#086861",
                clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)",
              }}
            >
              {plan.name} {currency} {plan.price}
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="space-y-2 mb-4 mt-8 overflow-hidden"
          initial={false}
          animate={{ height: expanded ? "auto" : 360 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {plan.features.map((f, i) => (
            <FeatureItem key={i} feature={f} planName={plan.name} />
          ))}
        </motion.div>

        <motion.button
          layout
          className="w-full sm:w-1/2 mx-auto text-white cursor-pointer font-semibold px-6 py-3 rounded-full border border-white shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
          onClick={() => setExpanded((prev) => !prev)}
          style={{ backgroundColor: "#086861" }}
          whileTap={{ scale: 0.95 }}
        >
          {expanded ? "See less" : "See more"}
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Image src="/assets/bg-pattern.png" alt="" width={350} height={350} className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180" />
      <Image src="/assets/lower-bg-pattern.png" alt="" width={350} height={350} className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-50" />

      <div className="absolute top-4 right-4 space-y-3 z-20">
        <div className="flex bg-[#08686117] p-2 rounded-full cursor-pointer items-center space-x-3">
          <Bell className="w-6 h-6" />
          <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Dark mode</span>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className={`relative w-10 h-5 rounded-full border border-black cursor-pointer transition-colors duration-200 ${
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

        <div className="flex bg-[#08686117] p-2 rounded-full items-center space-x-3 cursor-pointer">
          <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Dynamic pricing</span>
          <button
            onClick={() => setDynamic((p) => !p)}
            className={`relative w-10 h-5 rounded-full border border-black cursor-pointer transition-colors duration-200 ${
              useDynamicPricing ? "bg-teal-600" : "bg-white"
            }`}
          >
            <div
              className={`absolute -top-0.5 -left-2 w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200 ${
                useDynamicPricing ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-full">
        <header className="text-center mb-12">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Pick a plan that&apos;s right for you
          </h1>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Choose your plan that fits your needs. All plans include essential features to get you started!
          </p>
        </header>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 sm:gap-12 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <PlanCard key={idx} plan={plan} />
          ))}
        </div>
      </div>

      <motion.div
        className="py-8 md:py-12 max-w-4xl z-20 mx-auto px-4 sm:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`p-6 sm:p-8 md:p-12 w-full rounded-2xl shadow-lg text-center ${
          darkMode ? "bg-gray-900 border border-gray-700" : "bg-white"
        }`}>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Still Have Questions?
          </h2>
          <p className={`mb-6 text-sm sm:text-base md:text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Our team is ready to assist you. Contact us today for a personalized consultation or to learn more about our plans.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-[#086861] hover:bg-emerald-700 text-white text-sm md:text-base font-semibold rounded-lg transition-colors duration-300"
          >
            Contact Our Sales Team
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingPlans;
