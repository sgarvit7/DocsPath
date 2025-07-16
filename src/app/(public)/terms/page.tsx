"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = "Terms of Service";
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
    <div className="dark:bg-gray-900">
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 z-10 flex bg-[#08686130] p-2 rounded-full items-center space-x-3 cursor-pointer">
        <Bell className={clsx("w-6 h-6", darkMode ? "text-white" : "text-black")} />
        <span className={clsx("text-sm", inter.className, darkMode ? "text-gray-300" : "text-gray-600")}>
          Dark mode
        </span>
        <button
          onClick={toggleDarkMode}
          className={clsx(
            "relative w-10 h-5 rounded-full border border-black transition-colors duration-200",
            darkMode ? "bg-teal-600" : "bg-white"
          )}
        >
          <div
            className={clsx(
              "absolute -top-0.5 -left-2 w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200",
              darkMode ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>

      {/* Main content */}
      <main className={clsx("min-h-screen lg:max-w-7xl  lg:mx-auto md:px-20 py-18 bg-white dark:bg-gray-900 text-gray-900 dark:text-white", inter.className)}>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={clsx("text-5xl font-semibold mb-16", inter.className)}
        >
          Terms of Service
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={clsx("text-md md:text-base leading-relaxed", inter.className)}
        >
          <section>
            <p className={clsx("font-bold", inter.className)}>Effective Date: [Insert Date]</p>
            <p className={clsx("text-lg", inter.className)}>
              <strong>Welcome to DocsPath. By using our platform, you agree to these Terms of Service.
              Please read them carefully before accessing or using our services.</strong>
            </p>
          </section>

          <section>
            <h2 className={clsx("font-bold mt-2 text-xl", inter.className)}>Introduction</h2>
            <p className={clsx("text-lg", inter.className)}>
              These Terms govern your use of [Your Website Name], a platform designed for healthcare
              professionals to access patient management tools, telemedicine features, and medical
              records securely. By accessing our website, you agree to comply with these Terms and all
              applicable laws. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className={clsx("font-bold mt-8 text-xl", inter.className)}>Eligibility &amp; Account Registration</h2>
            <ul className={clsx("list-inside text-lg", inter.className)}>
              <li>✔️ Only licensed healthcare professionals and authorized personnel may use this platform.</li>
              <li>✔️ You must provide accurate information during account creation.</li>
              <li>✔️ You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>Unauthorized use of another person&apos;s account is strictly prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className={clsx("font-bold mt-2 text-xl", inter.className)}>Medical Disclaimer</h2>
            <p className={clsx("text-lg", inter.className)}>
              Our platform does not replace professional medical advice. While we provide tools for
              doctors, final medical decisions must be made by licensed professionals. We do not
              assume liability for medical decisions made based on the use of our platform.
            </p>
          </section>

          <section>
            <h2 className={clsx("font-bold mt-2 text-xl", inter.className)}>Use of Services</h2>
            <ul className={clsx("list-inside text-lg", inter.className)}>
              <li>Users agree to: </li>
              <li>✔️ Use the platform only for legal and ethical medical purposes.</li>
              <li>✔️ Follow all applicable healthcare laws and regulations in India (including DPDP Act 2023, IT Act 2000, and MCI Guidelines).</li>
              <li>✔️ Do not misuse the platform for fraudulent activities, spamming, or unauthorized data access.</li>
              <li>Any violation of these rules may result in account suspension or legal action.</li>
            </ul>
          </section>

          <section>
            <h2 className={clsx("font-bold mt-12 text-xl", inter.className)}>Data Privacy &amp; Security</h2>
            <ul className={clsx("list-inside list-disc", inter.className)}>
              <li>
                <span className={clsx("text-lg ", inter.className)}>Patient Data Protection:</span> <br/> All personal health data collected is protected under DPDP Act 2023 and stored securely . We do not sell, share, or misuse patient data.
              </li>
              <li>
                <span className={clsx("text-lg ", inter.className)}>Security Measures:</span><br/> We use encryption, multi-factor authentication, and secure servers to protect data. However, users must also maintain data confidentiality on their end.
              </li>
            </ul>
            <p className={clsx(inter.className)}>
              For details, refer to our[{" "}
              <a href="/privacyPolicy" className="text-blue-500 underline">
                Privacy Policy
              </a>].
            </p>
          </section>

          <section>
            <h2 className={clsx("font-bold mt-9 text-xl", inter.className)}>Payment &amp; Subscription</h2>
            <ul className={clsx("list-inside text-lg", inter.className)}>
              <li>if you use paid services: </li>
              <li>✔️ Fees and billing cycles will be displayed before purchase.</li>
              <li>✔️ No refunds are offered for used subscription periods.</li>
              <li>✔️ We may change pricing with prior notification.</li>
              <li>Failure to pay may result in account suspension.</li>
            </ul>
          </section>

          <section>
            <h2 className={clsx("font-bold mt-9  text-xl", inter.className)}>Telemedicine Guidelines</h2>
            <p className={clsx(inter.className)}>If you use our platform for telemedicine consultations, you must comply with:</p>
            <ul className={clsx("list-inside text-lg", inter.className)}>
              <li>- Telemedicine Practice Guidelines, 2020 (India)</li>
              <li>- Confidentiality and Informed Consent regulations</li>
              <li>- Prescription Rules – Only prescribe medicine as per legal guidelines</li>
            </ul>
            <p className={clsx("text-lg", inter.className)}>Misuse of telemedicine features may lead to legal consequences.</p>
          </section>

          <section>
            <h2 className={clsx("font-bold mt-9 text-xl", inter.className)}>Prohibited Activities</h2>
            <ul className={clsx("text-lg list-inside", inter.className)}>
              <li>Users may not:</li>
              <li>🚫 Upload false, misleading, or harmful content.</li>
              <li>🚫 Engage in unauthorized access or hacking.</li>
              <li>🚫 Violate patient confidentiality.</li>
              <li>🚫 Use the platform for commercial promotions or advertisements.</li>
            </ul>
            <p className={clsx("text-lg", inter.className)}>
              Violations will lead to account termination and may result in legal action.
            </p>
          </section>

          <section>
            <h2 className={clsx("text-lg mt-17", inter.className)}>Intellectual Property Rights</h2>
            <p className={clsx("text-lg", inter.className)}>
              All content, trademarks, and technology on our website belong to Digipioneer. Users may
              not copy, distribute, or modify any part of our services without permission.
            </p>
          </section>

          <section>
            <p className={clsx("text-lg mt-15 dark:text-gray-400", inter.className)}>
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
