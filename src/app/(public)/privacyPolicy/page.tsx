"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import clsx from "clsx";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });

export default function PrivacyPolicy() {
const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  // Update localStorage and optionally add a dark class to <body> or <html>
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      className={clsx(
        "min-h-screen px-6 md:px-20 py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
        darkMode && "dark",
        inter.className
      )}
    >
      <div className="absolute top-4 right-4 z-10 flex bg-[#08686130] p-2 rounded-full items-center space-x-3 cursor-pointer">
        <Bell className={clsx(darkMode ? "text-white" : "text-black", "w-6 h-6", inter.className)} />
        <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600", inter.className)}>
          Dark mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={clsx(
            "relative w-10 h-5 rounded-full border border-black transition-colors duration-200",
            darkMode ? "bg-teal-600" : "bg-white",
            inter.className
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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className={clsx("space-y-8 mt-10 mx-15 leading-relaxed", inter.className)}
      >
        <section className={clsx("border border-teal-600 font-semibold p-5 lg:px-35 lg:text-3xl rounded-md", inter.className)}>
          <p>
            Welcome to <span className="text-[#00645D] dark:text-teal-500 font-black">DocsPath</span>. Your privacy is our priority. This Privacy Policy explains how we collect, use, store, and protect your personal and patient data in compliance with Indian data protection laws.
          </p>
        </section>

        <section className="lg:mx-31 ">
          <h2 className={clsx("font-black text-2xl", inter.className)}>1. How and why Do We Use Your Personal Data?</h2>
          <p className={clsx("text-lg", inter.className)}>
            The Personal Data shall be collected for the business purpose of identifying you to the Provider using the Services and to assure full operation of the Services during all Sessions.
          </p>
          <p className={inter.className}>The Company may use Personal Data for the following purposes:</p>
          <ul className={clsx("list-disc list-inside space-y-1 text-lg", inter.className)}>
            <li>To provide and maintain Our Service, including to monitor the usage of Our Services.</li>
            <li>To notify You: If Your Provider enables email notifications within the Services, We will send You an email notifying You when it is time for Your appointment. Your Provider may also enable You to be notified by text message should You provide Your mobile number. To opt-out of such notifications, please contact Your Provider.</li>
            <li>To manage Your support requests: To respond to Your customer support requests to Us.</li>
            <li>To provide billing services: To provide billing services, if subscribed to by Your Provider.</li>
            <li>To send Provider Links: To send Provider Links to You by email, text or calendar invitation if this Service is subscribed to by Your Provider.</li>
            <li>For our legitimate interests or those of a third party. A legitimate interest is when we have a business or commercial reason to use your information, as long as that is not overridden by your own rights or interests.</li>
            <li>For any reason for which you have given consent.</li>
          </ul>
        </section>

        <section className="lg:mx-80 mt-3">
          <h2 className={clsx("font-extrabold text-2xl", inter.className)}>Purpose of Data Collection</h2>
          <ul className={clsx("text-lg list-inside space-y-1", inter.className)}>
            <li>✅ Providing healthcare services (scheduling, patient records, consultations)</li>
            <li>✅ Compliance with Indian medical and data protection laws</li>
            <li>✅ Enhancing security &amp; fraud prevention</li>
            <li>✅ Billing, payments, and insurance claims processing</li>
          </ul>
          <p className={clsx("mt-10 font-bold text-md", inter.className)}><strong>We DO NOT sell, rent, or trade personal data for marketing purposes.</strong></p>
        </section>

        <section className="lg:mx-80 my-3">
          <h2 className={clsx("font-extrabold text-2xl", inter.className)}>Your Rights Under Indian Law</h2>
          <p className={clsx("text-lg", inter.className)}>Under DPDP 2023, you have the right to:</p>
          <ul className={clsx("list-inside space-y-1 text-lg", inter.className)}>
            <li>✅ Access &amp; Review Your Data</li>
            <li>✅ Request Data Correction</li>
            <li>✅ Withdraw Consent &amp; Request Deletion</li>
            <li>✅ Lodge a Complaint with the Data Protection Board of India</li>
          </ul>
          <p className={inter.className}>Contact us at <a className="text-blue-400 underline" href="mailto:supportDocspath@email.com">supportMedycall@email.com</a></p>
        </section>

        <section className="lg:mx-80 mt-5">
          <h2 className={clsx("font-extrabold text-2xl", inter.className)}>Legal Basis for Data Processing</h2>
          <ul className={clsx("list-inside space-y-1 text-lg", inter.className)}>
            <li>✅ Consent – Your data is processed only after your explicit consent.</li>
            <li>✅ Medical &amp; Legal Obligations – Compliance with NDHM and other regulations.</li>
            <li>✅ Legitimate Interest – To improve service efficiency and security.</li>
          </ul>
        </section>

        <section className="lg:mx-31 ">
          <h2 className={clsx("font-black text-2xl", inter.className)}>2. Access to information</h2>
          <p className={clsx("text-lg", inter.className)}>You have the right to access certain information held about you so that you can be aware of, and verify the lawfulness of, the processing we undertake.</p>
          <p className={clsx("text-lg", inter.className)}>You can exercise your right of access by making what is generally referred to as a &lsquo;subject access request&rsquo;.</p>
          <p className={clsx("text-lg", inter.className)}>We will review each request which we receive and if we agree that we are obliged to provide personal data to you then we will (subject to certain limited exceptions provided under the relevant law) amongst other things: (i) describe it to you; (ii) tell you why we are holding it; (iii) tell you who it could be disclosed to; and (iv) let you have a copy of it (this may include providing an electronic copy).</p>

          <h3 className={clsx("font-bold text-lg mt-6", inter.className)}>Right to have information corrected</h3>
          <p className={inter.className}>If you identify that any personal data that we hold about you is wrong, inaccurate or out of date then you may ask us to correct or update it. Please contact us via the details provided below and we will review each request and respond accordingly.</p>

          <h3 className={clsx("font-bold text-lg mt-6", inter.className)}>Right of erasure and the right to stop or limit our processing of your personal data</h3>
          <p className={inter.className}>The right of erasure is also known as the &lsquo;right to be forgotten&rsquo;. You have the right to ask us to stop or to erase data we hold about you. Alternatively, you can ask us to limit any processing we are undertaking in respect of your personal data. These rights arise if we no longer have a valid reason to do so or if we have held it for too long.</p>
          <p className={inter.className}>These are not absolute rights but every request we receive will be considered carefully and we will respond accordingly (providing grounds for any decision we make).</p>

          <h3 className={clsx("font-bold mt-6 text-lg", inter.className)}>Right to withdraw consent</h3>
          <p className={inter.className}>You are free to withdraw any consent which you have given to us in relation to our use of your personal data at any time. Please note that not all uses which we make of your personal data require your consent (for example, if we need to use that information in order to provide a service you have requested then we do not need your consent in order to do so).</p>

          <h3 className={clsx("font-bold text-lg mt-12", inter.className)}>Right to complain</h3>
          <p className={clsx("mb-9", inter.className)}>If you are unhappy about the way in which we have processed your personal data then you have a right to raise the issue</p>
        </section>

        <section className="lg:mx-31 mt-14 ">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="my-6"
          >
            <Image
              src={"/assets/prelogin-img/new/privacy.png"}
              alt="image"
              width={60}
              height={60}
            />
          </motion.div>

          <h2 className={clsx("font-black text-2xl", inter.className)}>3. Session Information</h2>
          <h3 className={clsx("font-bold text-xl", inter.className)}>Screenshare</h3>
          <p className={clsx("text-lg", inter.className)}>The Services provide a feature whereby You may share all or part of Your computer screen with the Patient or You may request to view the Patient&rsquo;s screen.</p>
          <p className={clsx("text-lg", inter.className)}>There are obvious privacy issues associated with sharing one&rsquo;s screen. It is up to You to ensure that no sensitive or confidential information (other than that which the Patient is allowed to see) is viewable during the screensharing session.</p>
          <p className={clsx("text-lg", inter.className)}>Conversely, it is up to the Patient to ensure that there is no sensitive or confidential information on their screen prior to agreeing to the screenshare.</p>
          <p className={clsx("text-lg", inter.className)}>Doxy.me cannot control and is not in possession of any Personal Data You or the Patient might share when using screenshare.</p>

          <h3 className={clsx("font-bold text-xl mt-12", inter.className)}>Session Privacy</h3>
          <p className={clsx("text-lg", inter.className)}>At any time during the Session, You may disable the audio, video, or both. Doing so may prevent effective communication with the Patient. However, there may be times when You wish to disable the audio or video for personal reasons.</p>
          <p className={inter.className}>You may terminate the Session at any time.</p>
        </section>

        <section className="lg:mx-31 mt-16">
          <h2 className={clsx("font-black text-2xl", inter.className)}>Changes to This Privacy Policy</h2>
          <p className={clsx("text-lg w-1/2", inter.className)}>We may update this policy periodically to comply with new Indian regulations. Significant changes will be communicated via email or platform notifications.</p>
        </section>
        <section className="lg:mx-50 mt-19">
          <p className={clsx("text-lg font-medium", inter.className)}>If you have any questions about this Privacy Policy, reach out to <span className="font-black">Contacts</span></p>
        </section>

        <footer className={clsx("pt-6 mt-10 lg:-ml-21 text-lg font-semibold dark:text-teal-500 text-[#086861]", inter.className)}>
          <p>
            Copyright © 2025 DocsPath
            <br />
            Powered by Healthcek
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
