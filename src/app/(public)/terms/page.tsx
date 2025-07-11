"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = "Terms of Service";

    // Initialize based on system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <div>
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 z-10 flex bg-[#08686130] p-2 rounded-full items-center space-x-3 cursor-pointer">
        <Bell className={`${darkMode ? "text-white" : "text-black"} w-6 h-6`} />
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Dark mode
        </span>
        <button
          onClick={toggleDarkMode}
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

      {/* Main content */}
      <main className="min-h-screen px-6 md:px-20 py-18 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-5xl font-bold mb-6"
        >
          Terms of Service
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-8 text-md md:text-base leading-relaxed"
        >
          <section>
            <p className="font-bold">Effective Date: [Insert Date]</p>
            <p>
              <strong>Welcome to Medycall. By using our platform, you agree to these Terms of Service.</strong>{" "}
              Please read them carefully before accessing or using our services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Introduction</h2>
            <p className="text-lg">
              These Terms govern your use of [Your Website Name], a platform designed for healthcare
              professionals to access patient management tools, telemedicine features, and medical
              records securely. By accessing our website, you agree to comply with these Terms and all
              applicable laws. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Eligibility &amp; Account Registration</h2>
            <ul className="list-inside text-lg">
              <li>✔️ Only licensed healthcare professionals and authorized personnel may use this platform.</li>
              <li>✔️ You must provide accurate information during account creation.</li>
              <li>✔️ You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>Unauthorized use of another person&apos;s account is strictly prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Medical Disclaimer</h2>
            <p className="text-lg">
              Our platform does not replace professional medical advice. While we provide tools for
              doctors, final medical decisions must be made by licensed professionals. We do not
              assume liability for medical decisions made based on the use of our platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Use of Services</h2>
            <ul className="list-inside text-lg">
              <li>✔️ Use the platform only for legal and ethical medical purposes.</li>
              <li>✔️ Follow all applicable healthcare laws and regulations in India (including DPDP Act 2023, IT Act 2000, and MCI Guidelines).</li>
              <li>❌ Do not misuse the platform for fraudulent activities, spamming, or unauthorized data access.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Data Privacy &amp; Security</h2>
            <ul className="list-inside">
              <li>
                <p className="text-xl font-bold">Patient Data Protection:</p> All personal health data collected is protected under DPDP Act 2023 and stored securely.
              </li>
              <li>
                <p className="text-xl font-bold">Security Measures:</p> We use encryption, multi-factor authentication, and secure servers to protect data. However, users must also maintain data confidentiality on their end.
              </li>
            </ul>
            <p>
              For details, refer to our{" "}
              <a href="/privacy" className="text-blue-500 underline">
                Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Payment &amp; Subscription</h2>
            <ul className="list-inside text-lg">
              <li>✔️ Fees and billing cycles will be displayed before purchase.</li>
              <li>✔️ No refunds are offered for used subscription periods.</li>
              <li>✔️ We may change pricing with prior notification.</li>
              <li>Failure to pay may result in account suspension.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Telemedicine Guidelines</h2>
            <p>If you use our platform for telemedicine consultations, you must comply with:</p>
            <ul className="list-inside text-lg">
              <li>- Telemedicine Practice Guidelines, 2020 (India)</li>
              <li>- Confidentiality and Informed Consent regulations</li>
              <li>- Prescription Rules – Only prescribe medicine as per legal guidelines</li>
            </ul>
            <p className="text-lg">Misuse of telemedicine features may lead to legal consequences.</p>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Prohibited Activities</h2>
            <ul className="text-lg list-inside">
              <li>🚫 Upload false, misleading, or harmful content.</li>
              <li>🚫 Engage in unauthorized access or hacking.</li>
              <li>🚫 Violate patient confidentiality.</li>
              <li>🚫 Use the platform for commercial promotions or advertisements.</li>
            </ul>
            <p className="text-lg">
              Violations will lead to account termination and may result in legal action.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-2xl">Intellectual Property Rights</h2>
            <p className="text-lg">
              All content, trademarks, and technology on our website belong to Digipioneer. Users may
              not copy, distribute, or modify any part of our services without permission.
            </p>
          </section>

          <section>
            <p className="text-md text-gray-600 dark:text-gray-400">
              We reserve the right to modify or terminate any portion of the Agreement for any reason
              and at any time, and such modifications shall be informed to you in writing. You should
              read the Agreement at regular intervals. Your use of the Website following any such
              modification constitutes your agreement to follow and be bound by the Agreement so
              modified.
            </p>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
