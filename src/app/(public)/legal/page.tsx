"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LegalCompliancePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = "Legal & Compliance";

    // Initialize based on system preference
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isSystemDark);
    document.documentElement.classList.toggle("dark", isSystemDark);
  }, []);

  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <div>
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4 z-10 flex bg-[#08686130] p-2 rounded-full items-center space-x-3 cursor-pointer">
        <Bell className={`${darkMode ? "text-white" : "text-black"} w-6 h-6`} />
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Dark mode
        </span>
        <button
          onClick={handleDarkModeToggle}
          className={`relative w-10 h-5 rounded-full border border-black transition-colors duration-200 ${
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

      <main className="min-h-screen bg-white dark:bg-gray-900 lg:px-70 text-gray-900 dark:text-white px-6 md:px-20 py-18">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
          className="text-5xl font-bold mb-8"
        >
          Legal & Compliance
        </motion.h1>

        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariant}
            className="mb-10"
          >
            <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
              {section.heading}
            </h2>

            {section.content.map((item, subIdx) => (
              <div key={subIdx} className="mb-4">
                {item.subheading && (
                  <p className="font-semibold text-xl mb-1">{item.subheading}</p>
                )}
                <ul className="list-disc list-inside space-y-1 text-md text-gray-800 dark:text-gray-300">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ))}
      </main>
    </div>
  );
}

const sections = [
  {
    heading: "1. Terms & Conditions",
    content: [
      {
        subheading: "1.1 User Eligibility",
        points: [
          "Only verified doctors, hospital administrators, and authorized personnel can access our platform.",
          "Users must provide valid credentials, including government-issued ID and relevant medical certifications.",
          "Fraudulent activities, including falsifying qualifications, will lead to immediate termination and legal consequences.",
        ],
      },
      {
        subheading: "1.2 Platform Usage",
        points: [
          "Doctors can schedule and conduct in-person or telemedicine consultations.",
          "Administrators can manage hospital records, verify doctor credentials, and oversee medical data.",
          "Patients cannot directly access the platform; they interact via secure appointment scheduling.",
        ],
      },
    ],
  },
  {
    heading: "2. Privacy Policy",
    content: [
      {
        subheading: "2.1 Data Collection",
        points: [
          "We collect user details, including name, email, phone, medical license number, and hospital affiliations.",
          "Patient data such as medical history, prescriptions, and consultations are securely stored.",
        ],
      },
      {
        subheading: "2.2 Data Usage",
        points: [
          "Data is used solely for consultation scheduling, medical records management, and operational purposes.",
          "We do not sell, share, or disclose user or patient data to third parties unless legally required.",
          "AI-generated analytics and reports are anonymized to maintain confidentiality.",
        ],
      },
      {
        subheading: "2.3 Data Security",
        points: [
          "All communications are encrypted to ensure privacy.",
          "Patient records are stored on HIPAA-compliant cloud servers with strict access control.",
          "Unauthorized data access or sharing will result in legal action.",
        ],
      },
    ],
  },
  {
    heading: "3. Compliance with Medical Regulations",
    content: [
      {
        subheading: "",
        points: [
          "All doctors must be registered medical practitioners and adhere to national and regional medical regulations.",
          "Telemedicine consultations must comply with jurisdictional laws.",
          "Hospitals/clinics must provide verifiable registration details.",
        ],
      },
    ],
  },
  {
    heading: "4. Intellectual Property Rights",
    content: [
      {
        subheading: "",
        points: [
          "Our platform, including software and AI models, is proprietary intellectual property.",
          "Unauthorized reproduction, modification, or resale is strictly prohibited.",
          "Doctors and hospitals retain ownership of patient data but grant permission for secure storage and processing.",
        ],
      },
    ],
  },
  {
    heading: "5. Payment & Billing",
    content: [
      {
        subheading: "5.1 Subscription Plans",
        points: [
          "We offer flexible monthly and annual subscription plans.",
          "Pricing is subject to periodic updates, with advance notifications provided.",
        ],
      },
      {
        subheading: "5.2 Refund Policy",
        points: [
          "Subscription fees are non-refundable unless service failures occur.",
          "Refund requests must be submitted in writing within 7 days of the transaction.",
        ],
      },
      {
        subheading: "5.3 Third-Party Payment Processing",
        points: [
          "Payments are processed through secure gateways.",
          "We do not store credit card or banking information.",
        ],
      },
    ],
  },
  {
    heading: "6. Dispute Resolution & Liability",
    content: [
      {
        subheading: "6.1 Liability Disclaimer",
        points: [
          "We provide a technology platform for medical services but do not assume responsibility for medical advice given by doctors.",
          "Doctors are responsible for their medical decisions and ethical conduct.",
        ],
      },
      {
        subheading: "6.2 Dispute Resolution",
        points: [
          "Users should contact support to resolve disputes.",
          "If unresolved, disputes will be handled under the jurisdiction of [Your Country's Courts].",
        ],
      },
    ],
  },
  {
    heading: "7. Third-Party Integrations",
    content: [
      {
        subheading: "",
        points: [
          "Our platform may integrate with telemedicine tools, CRM systems, or electronic health records (EHRs).",
          "We are not liable for data breaches or service issues arising from third-party tools.",
        ],
      },
    ],
  },
];
