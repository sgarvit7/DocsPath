"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Bot,
  FileText,
  File,
  Lock,
  ClipboardList,
  Sun,
  Users,
} from "lucide-react";

interface CoreFeaturesSectionProps {
  darkMode: boolean;
}

export default function CoreFeaturesManual({ darkMode }: CoreFeaturesSectionProps) {
  const animationProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 py-20 relative ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Desktop & Tablet Layout */}
      <div className="relative w-[800px] h-[800px] hidden md:block">
        <div
          className={`absolute z-10 w-80 h-80 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            darkMode ? "bg-gray-800 text-white" : "bg-teal-700 text-white"
          }`}
        >
          Core Features
        </div>

        {/* Each Feature (same structure with color logic) */}
        <motion.div
          {...animationProps}
          className={`absolute w-150 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ top: "24%", left: "64%" }}
        >
          <div className="flex">
            <div className="absolute w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center">
              <Sun className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold ml-25 text-teal-600 dark:text-white">
              Smart Doctor Dashboard
              <p className="mt-2 w-80 text-sm text-gray-600 dark:text-gray-300">
                Everything you need, at a glance from appointments to analytics.
                Intuitive, customizable, and fast.
              </p>
            </h3>
          </div>
        </motion.div>

        <motion.div
          {...animationProps}
          className={`absolute w-80 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ top: "3%", left: "31%", borderRadius: "50%" }}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-teal-600 dark:text-white">
              One-Tap Appointment
            </h3>
          </div>
          <p className="mt-2 text-md text-gray-600 dark:text-gray-300">
            Automate bookings, manage OPD queues, and reduce no-shows—without
            lifting a finger.
          </p>
          <span className="w-20 h-20 rounded-full bg-teal-700 flex mx-auto items-center justify-center">
            <Calendar className="w-10 h-10 text-white" />
          </span>
        </motion.div>

        <motion.div
          {...animationProps}
          className={`absolute w-80 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ top: "17%", left: "-9%" }}
        >
          <h3 className="text-lg font-semibold text-teal-600 dark:text-white">
            Intelligent Communication
          </h3>
          <div className="flex items-center mt-2">
            <p className="text-md text-gray-600 dark:text-gray-300">
              Handle patient queries, confirmations, reminders, and follow-ups—
              24/7.
            </p>
            <div className="absolute ml-60 mt-20 w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center">
              <Bot className="w-10 h-10 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          {...animationProps}
          className={`absolute w-130 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ top: "44%", left: "-25%" }}
        >
          <div className="flex items-center gap-10">
            <h3 className="text-lg font-semibold ml-30 text-teal-600 dark:text-white">
              Automated Billing
            </h3>
            <div className="w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center">
              <FileText className="w-10 h-10 text-white" />
            </div>
          </div>
          <p className="text-md pr-40 text-gray-600 dark:text-gray-300">
            Instant invoicing, claims management, and payment tracking—all
            without manual work.
          </p>
        </motion.div>

        <motion.div
          {...animationProps}
          className={`absolute w-80 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ bottom: "15%", left: "-3%" }}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-teal-600 dark:text-white">
              EHR + E-Prescriptions
            </h3>
            <div className="w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center">
              <File className="w-10 h-10 text-white" />
            </div>
          </div>
          <p className="text-md pr-8 text-gray-600 dark:text-gray-300">
            Access, update, and share digital health records securely and
            accurately.
          </p>
        </motion.div>

        <motion.div
          {...animationProps}
          className={`absolute w-80 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ bottom: "5%", left: "36%", borderRadius: "50%" }}
        >
          <div className="items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-teal-700 flex items-center mx-auto justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-center text-teal-600 my-2 dark:text-white">
              Role-Based Access
            </h3>
          </div>
          <p className="text-md text-gray-600 text-center dark:text-gray-300">
            Full HIPAA/GDPR compliance with customizable staff permissions.
          </p>
        </motion.div>

        <motion.div
          {...animationProps}
          className={`absolute w-150 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ bottom: "27%", left: "69%" }}
        >
          <div className="flex items-center">
            <div className="absolute w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center">
              <ClipboardList className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold ml-25 text-teal-600 dark:text-white">
              Real-Time Dashboards
            </h3>
          </div>
          <p className="mt-2 text-md ml-20 text-gray-600 dark:text-gray-300">
            Make smarter decisions with real-time reports.
          </p>
        </motion.div>

        <motion.div
          {...animationProps}
          className={`absolute w-120 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ top: "42%", right: "-31%" }}
        >
          <div className="flex">
            <div className="absolute w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold ml-25 text-teal-600 dark:text-white">
              Integrated OPD + Telemedicine
            </h3>
          </div>
          <p className="mt-2 text-md text-gray-600 ml-23 dark:text-gray-300">
            Manage in-clinic and online appointments from a single platform.
          </p>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden w-full max-w-md text-center space-y-5">
        <div
          className={`text-3xl py-3 rounded-xl shadow-xl font-bold ${
            darkMode ? "text-white bg-gray-800" : "text-white bg-teal-700"
          }`}
        >
          Core Features
        </div>

        {[
          {
            icon: <Sun className="w-6 h-6 text-white" />,
            title: "Smart Doctor Dashboard",
            desc:
              "Everything you need, from appointments to analytics. Intuitive and fast.",
          },
          {
            icon: <Calendar className="w-6 h-6 text-white" />,
            title: "One-Tap Appointment",
            desc:
              "Manage OPD queues, bookings, and reduce no-shows automatically.",
          },
          {
            icon: <Bot className="w-6 h-6 text-white" />,
            title: "Communication Tools",
            desc: "Respond to patient queries, 24/7, using intelligent assistants.",
          },
          {
            icon: <FileText className="w-6 h-6 text-white" />,
            title: "Automated Billing",
            desc: "Instant invoicing, claims & payment tracking—no manual work.",
          },
          {
            icon: <File className="w-6 h-6 text-white" />,
            title: "EHR + E-Prescriptions",
            desc: "Securely access, update and share digital health records.",
          },
          {
            icon: <Lock className="w-6 h-6 text-white" />,
            title: "Role-Based Access",
            desc: "Compliant with HIPAA/GDPR with custom staff permissions.",
          },
          {
            icon: <ClipboardList className="w-6 h-6 text-white" />,
            title: "Dashboards & Insights",
            desc: "Smarter decisions with real-time care and revenue data.",
          },
          {
            icon: <Users className="w-6 h-6 text-white" />,
            title: "OPD + Telemedicine",
            desc: "Consult in-clinic or virtually from a single interface.",
          },
        ].map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="mx-auto w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center">
              {item.icon}
            </div>
            <h3
              className={`font-semibold text-lg ${
                darkMode ? "text-white" : "text-teal-700"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-sm px-2 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
