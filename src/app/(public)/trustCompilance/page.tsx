"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { Bell } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const badges = [
  { src: "/assets/prelogin-img/certified.jpg", label: "ISO 27001 Certified" },
  { src: "/assets/prelogin-img/hippa.jpg", label: "HIPAA Compliant" },
  { src: "/assets/prelogin-img/mfa.jpg", label: "MFA Security" },
  { src: "/assets/prelogin-img/soc2.jpg", label: "SOC 2 Type II" },
  { src: "/assets/prelogin-img/gdr.jpg", label: "GDPR Certified" },
];

const itemsLeft = [
  {
    title: "HIPAA Compliant",
    points: [
      "Ensures patient data security with strict access control.",
      "Data encryption and compliance with privacy laws.",
    ],
  },
  {
    title: "GDPR Compliant",
    points: [
      "Protects personal data of European users.",
      "Provides full transparency on data processing & storage.",
    ],
  },
  {
    title: "ISO 27001 Certified",
    points: [
      "Internationally recognized security management standard.",
      "Protects against threats and data protection measures.",
    ],
  },
  {
    title: "SOC 2 Type II Certified",
    points: [
      "Independent third-party audits for security & confidentiality.",
      "Meets high standards for data protection & integrity.",
    ],
  },
];

const itemsRight = [
  {
    title: "End-to-End Data Encryption",
    points: [
      "AES-256 encryption for stored data.",
      "TLS 1.2+ encryption for secure transmission.",
    ],
  },
  {
    title: "Multi-Factor Authentication (MFA)",
    points: [
      "Protects accounts from unauthorized access.",
      "Enhances security with multiple authentication layers.",
    ],
  },
  {
    title: "Secure Cloud Infrastructure",
    points: [
      "HIPAA-compliant, GDPR-ready cloud hosting.",
      "Robust monitoring, access control & redundancy.",
    ],
  },
  {
    title: "Compliance with Local Medical Regulations",
    points: [
      "Follows NHS Digital Standards (UK) & CCPA (California).",
      "Adheres to WHO & MHRA guidelines for patient safety.",
    ],
  },
];

const CommitmentCard = () => (
  <div className={clsx("relative max-w-3xl w-full mx-auto px-4 sm:px-6", inter.className)}>
    <div className="absolute -top-5 left-1/2 md:left-1/80 transform -translate-x-1/2 md:-translate-x-0 z-10">
      <div
        className={clsx(
          "bg-[#086861] text-white lg:-ml-20 lg:text-2xl shadow-xl sm:text-base  font-semibold px-20 py-2 rounded-full shadow-lg text-center whitespace-nowrap",
          inter.className
        )}
      >
        Our Commitment to Ethical AI & Data Privacy
      </div>
    </div>
    <div
      className={clsx(
        "bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg rounded-2xl pt-10 pb-6 px-6 sm:px-10 mt-6",
        inter.className
      )}
    >
      <ul className={clsx("list-disc list-inside space-y-2 sm:text-base lg:text-lg ", inter.className)}>
        <li>We never sell user or patient data to third parties.</li>
        <li>AI-generated analytics are fully anonymized for privacy.</li>
        <li>Regular security training & audits to prevent breaches.</li>
      </ul>
    </div>
  </div>
);

export default function TrustCompliancePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
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

      <main
        className={clsx(
          "bg-gradient-to-b from-teal-50 to-white dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white min-h-screen py-15 px-4 sm:px-8 lg:px-16",
          inter.className
        )}
      >
        <h1
          className={clsx(
            "text-2xl sm:text-4xl font-shadow-xl text-shadow-lg font-bold text-center text-[#005C56] dark:text-teal-300 mb-2",
            inter.className
          )}
        >
          Trust & Compliance Badges
        </h1>

        <p
          className={clsx(
            "text-center mb-10 max-w-9xl mx-auto text-2xl mt-5 ",
            inter.className
          )}
        >
          We are committed to maintaining the highest standards of security,
          privacy, and compliance to ensure that your data is protected at all times.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-12 place-items-center">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center">
              <Image
                src={badge.src}
                alt={badge.label}
                width={100}
                height={100}
                className="rounded-[20px] border-1 border-[black]"
              />
              <p
                className={clsx(
                  "mt-2 lg:text-lg w-2/3 text-center font-semibold text-[#005A51] dark:text-teal-300 sm:text-sm",
                  inter.className
                )}
              >
                {badge.label}
              </p>
            </div>
          ))}
        </div>

        <h2
          className={clsx(
            "lg:text-3xl md:text-2xl sm:text-xl font-semibold text-center text-[#00443E] underline dark:text-teal-300 mb-6",
            inter.className
          )}
        >
          Our Compliance & Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 mt-12 px-2 sm:px-4">
          <div className="space-y-4 md:ml-8 lg:ml-25 xl:ml-50">
            {itemsLeft.map((item, index) => (
              <div key={index} className={inter.className}>
                <h3 className={clsx("font-bold text-2xl mb-1", inter.className)}>
                  {index + 1}. {item.title}
                </h3>
                <ul
                  className={clsx(
                    "list-disc list-inside text-lg pl-8 space-y-1 text-lg",
                    inter.className
                  )}
                >
                  {item.points.map((point, k) => (
                    <li key={k}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="space-y-4 lg:w-2/3 md:ml-8 lg:ml-20">
            {itemsRight.map((item, index) => (
              <div key={index} className={inter.className}>
                <h3 className={clsx("font-bold text-2xl mb-1", inter.className)}>
                  {index + 1}. {item.title}
                </h3>
                <ul
                  className={clsx(
                    "list-disc list-inside text-lg pl-8 space-y-1 text-lg",
                    inter.className
                  )}
                >
                  {item.points.map((point, k) => (
                    <li key={k}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <CommitmentCard />
      </main>
    </div>
  );
}
