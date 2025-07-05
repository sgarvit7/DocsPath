"use client";
import React from "react";
import Image from "next/image";

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
  <div className="relative max-w-3xl w-full mx-auto px-4 sm:px-6">
    {/* Pill Header */}
    <div className="absolute -top-5 left-1/2 md:left-1/80 transform -translate-x-1/2 md:-translate-x-0 z-10">
      <div className="bg-teal-700 text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-full shadow-lg text-center whitespace-nowrap">
        Our Commitment to Ethical AI & Data Privacy
      </div>
    </div>

    {/* Card Body */}
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg rounded-2xl pt-10 pb-6 px-6 sm:px-10 mt-6">
      <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
        <li>We never sell user or patient data to third parties.</li>
        <li>AI-generated analytics are fully anonymized for privacy.</li>
        <li>Regular security training & audits to prevent breaches.</li>
      </ul>
    </div>
  </div>
);

export default function TrustCompliancePage() {
  return (
    <main className="bg-gradient-to-b from-teal-50 to-white dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white min-h-screen py-10 px-4 sm:px-8 lg:px-16">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#086861] dark:text-teal-300 mb-2">
        Trust & Compliance Badges
      </h1>

      <p className="text-center mb-10 max-w-3xl mx-auto text-sm sm:text-base">
        We are committed to maintaining the highest standards of security,
        privacy, and compliance to ensure that your data is protected at all times.
      </p>

      {/* Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  mb-12 place-items-center">
        {badges.map((badge, i) => (
          <div key={i} className="flex flex-col items-center">
            <Image src={badge.src} alt={badge.label} width={100} height={100} />
            <p className="mt-2 text-lg  text-center font-semibold text-teal-700 dark:text-teal-300  sm:text-sm">
              {badge.label}
            </p>
          </div>
        ))}
      </div>

      {/* Subheading */}
      <h2 className="lg:text-3xl md:text-2xl sm:text-xl font-semibold text-center text-teal-800 dark:text-teal-300 mb-6 ">
        Our Compliance & Certifications
      </h2>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16  px-2 sm:px-4">
        <div className="space-y-4  md:ml-8 lg:ml-25 xl:ml-50">
          {itemsLeft.map((item, index) => (
            <div key={index}>
              <h3 className="font-bold text-xl mb-1">{index + 1}. {item.title}</h3>
              <ul className="list-disc list-inside text-lg pl-8 space-y-1 text-sm">
                {item.points.map((point, k) => (
                  <li key={k}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="space-y-4  md:ml-8 lg:ml-20  ">
          {itemsRight.map((item, index) => (
            <div key={index}>
              <h3 className="font-bold text-xl mb-1">{index + 1}. {item.title}</h3>
              <ul className="list-disc list-inside text-lg pl-8 space-y-1 text-sm">
                {item.points.map((point, k) => (
                  <li key={k}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment Card */}
      <CommitmentCard />
    </main>
  );
}
