"use client";

import { motion } from "framer-motion";
import {
  MdDashboardCustomize,
  MdOutlineMedicalServices,
  MdOutlineChat,
  MdOutlineSchedule,
  MdOutlineMoneyOffCsred,
  MdOutlineBusiness,
  MdLocalHospital,
  MdOutlineLocalPharmacy,
} from "react-icons/md";
import { ReactNode } from "react";
import Image from "next/image";

interface Capability {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

interface Segment {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  darkMode?: boolean;
}

export default function CoreCapabilities({ darkMode = false, ...props }: Props) {
  const capabilities: Capability[] = [
    {
      id: 1,
      title: "Unified Clinical Dashboard with EHR Sync",
      description:
        "Gain instant access to patient records, appointments, prescriptions, and analytics—all in one intelligent, secure interface. Stay informed, stay ahead.",
      icon: <MdDashboardCustomize size={40} />,
    },
    {
      id: 2,
      title: "Automated Billing & Claims Reconciliation",
      description:
        "Generate invoices, process insurance claims, and track payments in real‑time—no paperwork, no delays, no errors.",
      icon: <MdOutlineMoneyOffCsred size={40} />,
    },
    {
      id: 3,
      title: "24/7 Smart Digital Communication",
      description:
        "Let lifelike virtual assistants manage confirmations, queries, reminders, and follow‑ups—so you never miss a patient touch‑point.",
      icon: <MdOutlineChat size={40} />,
    },
    {
      id: 4,
      title: "Integrated OPD & Telemedicine Platform",
      description:
        "Conduct secure in‑clinic and video consultations, issue e‑prescriptions, and manage records—all from one compliant, cloud‑based system.",
      icon: <MdOutlineMedicalServices size={40} />,
    },
    {
      id: 5,
      title: "Touchless Appointment Scheduling & OPD Flow",
      description:
        "Automate the entire patient journey—from booking and queue management to no‑show prevention—without lifting a finger.",
      icon: <MdOutlineSchedule size={40} />,
    },
  ];

  const segments: Segment[] = [
    {
      id: 1,
      title: "Specialty Clinics & Independent Practices",
      description:
        "Simplify daily workflows and reduce administrative stress while enhancing the patient experience.",
      icon: <MdOutlineLocalPharmacy size={32} />,
    },
    {
      id: 2,
      title: "Multi-Specialty Hospitals",
      description:
        "Unify departments, streamline inter-specialty coordination, and access centralized data in real time.",
      icon: <MdLocalHospital size={32} />,
    },
    {
      id: 3,
      title: "Healthcare Chains & Networks",
      description:
        "Scale effortlessly across branches, monitor performance dashboards, and enable cross-facility collaboration without friction.",
      icon: <MdOutlineBusiness size={32} />,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      {...props}
      className={`relative min-h-screen py-2 px-4 sm:px-6 lg:px-8 overflow-hidden`}
    >
      <div className="absolute inset-0 -z-0 h-full w-full">
        <Image
          src={
            darkMode
              ? "/assets/prelogin-img/product-bg-dark-1.png"
              : "/assets/prelogin-img/product-bg-light-1.png"
          }
          alt="Background"
          fill
          className="bg-contain"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl border-t py-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-16 text-center text-3xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Core Capabilities
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {capabilities.map((cap) => {
            const extraClasses =
              cap.id === 3 ? "md:col-span-2 md:max-w-xl md:mx-auto" : "";
            return (
              <motion.article
                key={cap.id}
                variants={item}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex gap-6 rounded-xl border p-6 shadow-sm hover:shadow-xl transition-all ${
                  darkMode
                    ? "border-gray-700 bg-gray-800 hover:border-teal-500"
                    : "border-gray-200 bg-white hover:border-teal-600"
                } ${extraClasses}`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    darkMode
                      ? "bg-teal-700/20 text-teal-300"
                      : "bg-teal-600/10 text-teal-600"
                  }`}
                >
                  {cap.icon}
                </div>
                <div>
                  <h3
                    className={`mb-2 text-lg font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {cap.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {cap.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="my-20 h-0.5 w-full bg-gray-200 dark:bg-gray-700" />

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-2 text-5xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Who We&apos;re Built For
        </motion.h2>
        <p
          className={`mb-10 text-2xl font-bold ${
            darkMode ? "text-gray-300" : "text-gray-900"
          }`}
        >
          Designed to Serve Every Corner of Modern Medicine
        </p>
        {/* seg.description */}
        {/* {seg.title} */}
        {/*  {seg.icon} */}

        {/* <div className="flex items-stretch grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
<div className="flex items-stretch grid grid-cols-1 lg:grid-cols-2 gap-8">
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="flex flex-col gap-8 space-y-6"
  >
    {/* Card 1 */}
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-xl border p-6 hover:shadow-xl transition-all ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-[white] border-teal-300"
      }`}
    >
      <div
        className={`mb-3 flex items-center text-lg font-semibold ${
          darkMode ? "text-white" : "text-[#004540]"
        }`}
      >
        {/* Replace with your actual icon */}
          {segments[0].icon}
        <span className="ml-2">{segments[0].title}</span>
      </div>
      <p
        className={`text-sm leading-relaxed ${
          darkMode ? "text-gray-300" : "text-black"
        }`}
      >
        {segments[0].description} 
      </p>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-xl border p-6 hover:shadow-xl transition-all ${
        darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-[#E7F2F1] border-teal-300"
      } border-2 border-blue-500`}
    >
      <div
        className={`mb-3 flex items-center text-lg font-semibold ${
          darkMode ? "text-white" : "text-[#004540]"
        }`}
      >
        {segments[1].icon}
        <span className="ml-2">{segments[1].title}</span>
      </div>
      <p
        className={`text-sm leading-relaxed ${
          darkMode ? "text-gray-300" : "text-black"
        }`}
      >
        {segments[1].description} 
      </p>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-xl border p-6 hover:shadow-xl transition-all ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-[#95C2BF] border-teal-300"
      }`}
    >
      <div
        className={`mb-3 flex items-center text-lg font-semibold ${
          darkMode ? "text-white" : "text-[#004540]"
        }`}
      >
        {segments[2].icon}
        <span className="ml-2">{segments[2].title} </span>
      </div>
      <p
        className={`text-sm leading-relaxed ${
          darkMode ? "text-gray-300" : "text-black"
        }`}
      >
        {segments[2].description} 
      </p>
    </motion.div>
  </motion.div>
{/* </div> */}

          <div className="flex justify-center items-center">
            <Image
              src="/assets/prelogin-img/WhoBuiltFor.png"
              alt="Who we're Built for"
              width={500}
              height={500}
              className="max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
