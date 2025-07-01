"use client";
import React, { useState } from "react";
import {
  Database,
  RefreshCw,
  MessageSquare,
  Users,
  Calendar,
  Network,
  Stethoscope,
  Building2,
  Clock,
  FileText,
  Heart,
  Bell
} from "lucide-react";

import WhyDocsPath from "@/components/publicPageComponents/ProductsPage/WhyDocspath";

interface Capability {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ServiceTarget {
  title: string;
  description: string;
  bgColor: string;
}

const HealthcareLanding: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const capabilities: Capability[] = [
    {
      title: "Unified Clinical Dashboard with EHR Sync",
      description:
        "Gain instant access to patient records, appointments, prescriptions, and analytics—all in one intelligent, secure interface. Stay informed, stay ahead.",
      icon: <Database className="w-8 h-8" />,
      color: "text-teal-600",
    },
    {
      title: "Automated Billing & Claims Reconciliation",
      description:
        "Generate invoices, process insurance claims, and track payments in real time—no paperwork, no delays, no errors.",
      icon: <RefreshCw className="w-8 h-8" />,
      color: "text-blue-600",
    },
    {
      title: "24/7 Smart Digital Communication",
      description:
        "Let flexible virtual assistants manage confirmations, queries, reminders, and follow-ups—so you never miss a patient touchpoint.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "text-teal-600",
    },
    {
      title: "Integrated OPD & Telemedicine Platform",
      description:
        "Conduct secure in-clinic and video consultations, issue e-prescriptions, and manage records—all from one compliant, cloud-based system.",
      icon: <Users className="w-8 h-8" />,
      color: "text-teal-600",
    },
    {
      title: "Touchless Appointment Scheduling & OPD Flow",
      description:
        "Automate the entire patient journey—from booking and check-in to consultation queues—without human intervention, filling a finger.",
      icon: <Calendar className="w-8 h-8" />,
      color: "text-green-600",
    },
  ];

  const serviceTargets: ServiceTarget[] = [
    {
      title: "Specialty Clinics & Independent Practices",
      description:
        "Simplify daily workflows and reduce administrative stress while enhancing the patient experience.",
      bgColor: "bg-white",
    },
    {
      title: "Multi-Specialty Hospitals",
      description:
        "Unify departments, streamline inter-specialty coordination, and access centralized data in real time.",
      bgColor: "bg-gray-50",
    },
    {
      title: "Healthcare Chains & Networks",
      description:
        "Scale effortlessly across branches, monitor performance dashboards, and enable cross-facility collaboration without friction.",
      bgColor: "bg-teal-50",
    },
  ];

  const hexagonIcons = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-600",
    },
    { icon: <Heart className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
    {
      icon: <FileText className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Network className="w-6 h-6" />,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-teal-300 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-teal-100 rounded-full opacity-10"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-teal-200 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-teal-300 rounded-full opacity-20"></div>

        {/* Hexagonal shapes */}
        <div className="absolute top-20 right-1/3 w-16 h-16 transform rotate-45 border-2 border-teal-200 opacity-30"></div>
        <div className="absolute bottom-32 left-1/3 w-12 h-12 transform rotate-12 border-2 border-teal-300 opacity-25"></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 transform -rotate-45 border-2 border-teal-200 opacity-40"></div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
        <Bell className={` ${darkMode ? "text-white" : "text-black"} w-6 h-6`} />
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

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1
              className={`text-5xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Powering the Future of{" "}
              <span className="text-teal-600">Healthcare</span>
            </h1>

            <div className="space-y-4 mb-8">
              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                DocsPath is more than a tool. It&apos;s a complete care
                infrastructure designed to streamline clinical workflows,
                optimize operations, and elevate the standard of care.
              </p>

              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Whether you&apos;re running a high-volume hospital or a private
                practice, DocsPath replaces complexity with clarity—freeing your
                team to do what matters most: treat patients.
              </p>
            </div>
          </div>

          {/* Team Image Placeholder */}
          <div className="relative">
            <div
              className={`rounded-2xl p-8 shadow-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <p
                className={`text-center mt-4 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Healthcare professionals working together
              </p>
            </div>
          </div>
        </div>

        {/* Core Capabilities Section */}
        <div className="mb-20">
          <h2
            className={`text-4xl font-bold text-center mb-12 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Core Capabilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className={`mb-4 ${capability.color}`}>
                  {capability.icon}
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {capability.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We're Built For Section */}
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className={`text-4xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Who We&apos;re Built For
              </h2>
              <p
                className={`text-lg mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Designed to Serve Every Corner of Modern Medicine
              </p>

              <div className="space-y-6">
                {serviceTargets.map((target, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                      index === 2
                        ? "bg-teal-50 border-teal-200"
                        : darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold mb-3 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {target.title}
                    </h3>
                    <p
                      className={`leading-relaxed ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {target.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hexagonal Icon Grid */}
            <div className="flex justify-center items-center">
              <div className="relative">
                {/* Central HEALTH text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400 tracking-widest">
                    HEALTH
                  </span>
                </div>

                {/* Hexagonal arrangement */}
                <div className="grid grid-cols-3 gap-4 w-80 h-80">
                  {hexagonIcons.map((item, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 ${item.color} rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200`}
                    >
                      {item.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <WhyDocsPath darkMode={darkMode} />
      </div>
    </div>
  );
};

export default HealthcareLanding;
