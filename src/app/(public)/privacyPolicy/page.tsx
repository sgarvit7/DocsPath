"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function PrivacyPolicy() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 md:px-20 py-12`}>
      <div className="absolute top-4 right-4 z-10 flex bg-[#08686130] p-2 rounded-full items-center space-x-3 cursor-pointer">
        <Bell className={`${darkMode ? "text-white" : "text-black"} w-6 h-6`} />
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Dark mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
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

      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-8 mt-10 mx-15 leading-relaxed">
        <section className="border border-teal-600 p-5 text-2xl rounded-md">
          <p>
            <strong className="text-2xl">Welcome to <span className="text-teal-600 font-bold">MedyCall</span>.</strong> Your privacy is our priority. This Privacy Policy explains how we collect, use, store, and protect your personal and patient data in compliance with Indian data protection laws.
          </p>
        </section>

        <section className="mx-10">
          <h2 className="font-semibold text-2xl">1. How and why Do We Use Your Personal Data?</h2>
          <p className="text-lg">
            The Personal Data shall be collected for the business purpose of identifying you to the Provider using the Services and to assure full operation of the Services during all Sessions.
          </p>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul className="list-disc list-inside space-y-1 text-lg">
            <li>To provide and maintain Our Service, including to monitor the usage of Our Services.</li>
            <li>To notify You: If Your Provider enables email notifications within the Services, We will send You an email notifying You when it is time for Your appointment. Your Provider may also enable You to be notified by text message should You provide Your mobile number. To opt-out of such notifications, please contact Your Provider.</li>
            <li>To manage Your support requests: To respond to Your customer support requests to Us.</li>
            <li>To provide billing services: To provide billing services, if subscribed to by Your Provider.</li>
            <li>To send Provider Links: To send Provider Links to You by email, text or calendar invitation if this Service is subscribed to by Your Provider.</li>
            <li>For our legitimate interests or those of a third party. A legitimate interest is when we have a business or commercial reason to use your information, as long as that is not overridden by your own rights or interests.</li>
            <li>For any reason for which you have given consent.</li>
          </ul>
        </section>

        <section className="text-center mt-3">
          <h2 className="font-semibold text-2xl">Purpose of Data Collection</h2>
          <ul className="text-lg list-inside space-y-1">
            <li>✅ Providing healthcare services (scheduling, patient records, consultations)</li>
            <li>✅ Compliance with Indian medical and data protection laws</li>
            <li>✅ Enhancing security & fraud prevention</li>
            <li>✅ Billing, payments, and insurance claims processing</li>
          </ul>
          <p><strong>We DO NOT sell, rent, or trade personal data for marketing purposes.</strong></p>
        </section>

        <section className="text-center my-3">
          <h2 className="font-semibold  text-2xl">Your Rights Under Indian Law</h2>
          <p className="text-lg">Under DPDP 2023, you have the right to:</p>
          <ul className=" list-inside space-y-1 text-lg">
            <li>✅ Access & Review Your Data</li>
            <li>✅ Request Data Correction</li>
            <li>✅ Withdraw Consent & Request Deletion</li>
            <li>✅ Lodge a Complaint with the Data Protection Board of India</li>
          </ul>
          <p>Contact us at <a className="text-blue-400 underline" href="mailto:supportMedycall@email.com">supportMedycall@email.com</a></p>
        </section>

        <section className="text-center mt-5">
          <h2 className="font-semibold text-2xl">Legal Basis for Data Processing</h2>
          <ul className="list-inside space-y-1 text-lg">
            <li>✅ Consent – Your data is processed only after your explicit consent.</li>
            <li>✅ Medical & Legal Obligations – Compliance with NDHM and other regulations.</li>
            <li>✅ Legitimate Interest – To improve service efficiency and security.</li>
          </ul>
        </section>

        <section className="mx-10">
          <h2 className="font-semibold text-2xl">2. Access to information</h2>
          <p className="text-lg">You have the right to access certain information held about you so that you can be aware of, and verify the lawfulness of, the processing we undertake.</p>
          <p>You can exercise your right of access by making what is generally referred to as a &apos;subject access request&apos;.</p>
          <p>We will review each request which we receive and if we agree that we are obliged to provide personal data to you then we will (subject to certain limited exceptions provided under the relevant law) amongst other things: (i) describe it to you; (ii) tell you why we are holding it; (iii) tell you who it could be disclosed to; and (iv) let you have a copy of it (this may include providing an electronic copy).</p>

          <h3 className="font-semibold mt-4">Right to have information corrected</h3>
          <p>If you identify that any personal data that we hold about you is wrong, inaccurate or out of date then you may ask us to correct or update it. Please contact us via the details provided below and we will review each request and respond accordingly.</p>

          <h3 className="font-semibold mt-4">Right of erasure and the right to stop or limit our processing of your personal data</h3>
          <p>The right of erasure is also known as the &apos;right to be forgotten&apos;. You have the right to ask us to stop or to erase data we hold about you. Alternatively, you can ask us to limit any processing we are undertaking in respect of your personal data. These rights arise if we no longer have a valid reason to do so or if we have held it for too long.</p>
          <p>These are not absolute rights but every request we receive will be considered carefully and we will respond accordingly (providing grounds for any decision we make).</p>

          <h3 className="font-semibold mt-4">Right to withdraw consent</h3>
          <p>You are free to withdraw any consent which you have given to us in relation to our use of your personal data at any time. Please note that not all uses which we make of your personal data require your consent (for example, if we need to use that information in order to provide a service you have requested then we do not need your consent in order to do so).</p>

          <h3 className="font-semibold mt-4">Right to complain</h3>
          <p>If you are unhappy about the way in which we have processed your personal data then you have a right to raise the issue</p>
        </section>

        <section className="mx-10">
          <h2 className="font-semibold text-2xl">3. Session Information</h2>
          <h3 className="font-medium text-xl">Screenshare</h3>
          <p className="text-lg">The Services provide a feature whereby You may share all or part of Your computer screen with the Patient or You may request to view the Patient&apos;s screen.</p>
          <p>There are obvious privacy issues associated with sharing one&apos;s screen. It is up to You to ensure that no sensitive or confidential information (other than that which the Patient is allowed to see) is viewable during the screensharing session.</p>
          <p>Conversely, it is up to the Patient to ensure that there is no sensitive or confidential information on their screen prior to agreeing to the screenshare.</p>
          <p>Doxy.me cannot control and is not in possession of any Personal Data You or the Patient might share when using screenshare.</p>

          <h3 className="font-medium text-xl mt-6">Session Privacy</h3>
          <p className="text-lg">At any time during the Session, You may disable the audio, video, or both. Doing so may prevent effective communication with the Patient. However, there may be times when You wish to disable the audio or video for personal reasons.</p>
          <p>You may terminate the Session at any time.</p>
        </section>

        <section className="mx-10">
          <h2 className="font-semibold text-xl">Changes to This Privacy Policy</h2>
          <p className="text-md">We may update this policy periodically to comply with new Indian regulations. Significant changes will be communicated via email or platform notifications.</p>
        </section>

        <footer className="pt-6 mt-10 text-md text-teal-700">
          <p>Copyright © 2025 Medycall<br />Powered by Healthcek</p>
        </footer>
      </motion.div>
    </div>
  );
}
