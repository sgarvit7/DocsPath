"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import clsx from "clsx";
import { Inter, Roboto, Roboto_Slab } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "500", "700"] });

const sections = [
  {
    title: "Authentication",
    id: "authentication",
    description: "Authenticate every request using your API key in the headers.",
    code: `GET /api/v1/patients

Headers:
Authorization: Bearer YOUR_API_KEY`,
    tabs: ["GET", "Python", "cURL"],
  },
  {
    title: "Appointments",
    id: "appointments",
    description: "Retrieve all appointments for a specific patient.",
    code: `GET /api/v1/appointments?patient_id=12345

Headers:
Authorization: Bearer your_token`,
    tabs: ["GET", "Python", "cURL"],
  },
  {
    title: "Patient Records",
    id: "patient-records",
    description: "Fetch full patient history with medical records.",
    code: `GET /api/v1/patient/12345

Headers:
Authorization: Bearer your_token`,
    tabs: ["GET", "Python", "cURL"],
  },
  {
    title: "Billing & Requests",
    id: "billing-requests",
    description: "Submit a billing request for insurance processing.",
    code: `POST /api/v1/billing

Headers:
Content-Type: application/json
Authorization: Bearer your_token

Body:
{
  "patient_id": "12345",
  "amount": "500.00"
}`,
    tabs: ["POST", "Python", "cURL"],
  },
  {
    title: "Voice Agent",
    id: "voice-agent",
    description: "Integrate with the voice agent for real-time support.",
    code: `POST /api/v1/voice

Headers:
Content-Type: application/json
Authorization: Bearer your_token

Body:
{
  "query": "get patient record",
  "context": "healthcare"
}`,
    tabs: ["POST", "Python", "cURL"],
  },
];

const responseCodes = [
  { code: "200 OK", description: "Request was successful." },
  { code: "400 Bad Request", description: "Invalid request syntax." },
  { code: "401 Unauthorized", description: "invalid API key" },
  { code: "404 Not Found", description: "Resource not found." },
  { code: "500 Internal Server Error", description: " Something went wrong on our end." },
];

export default function APIDocs() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="dark:bg-gray-900">
      <div className="w-full h-1 bg-teal-600 dark:bg-teal-500" />

      <div className="dark:bg-gray-900">
        <div className="bg-teal-600 dark:bg-teal-500">
          <div className="absolute mt-3 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
            <Bell className="w-6 h-6" />
            <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}>Dark mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={clsx(
                "relative w-10 h-5 rounded-full border border-black transition-colors duration-200",
                darkMode ? "bg-teal-600" : "bg-white"
              )}
            >
              <div
                className={clsx(
                  "absolute top-[-2px] w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200",
                  darkMode ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>

          <div className="bg-[#e5f4f3] dark:bg-gray-700">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={clsx("text-4xl font-semibold text-[#005c56] mt-10 py-3 mx-15 dark:text-teal-300", inter.className)}
            >
              DocsPath API Documentation
            </motion.h1>
          </div>

          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
            <aside className="hidden md:block w-64 bg-[#b4d9d6] px-11 dark:bg-gray-800 p-6">
              <div className={clsx("font-bold dark:text-teal-300 mb-7 text-lg", roboto.className)}>API Sections</div>
              <ul className="space-y-2">
                {sections.map((sec, idx) => (
                  <li key={idx}>
                    <a href={`#${sec.id}`} className={clsx("hover:underline font-bold text-md font-thin cursor-pointer block", roboto.className)}>
                      {sec.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#response-codes" className={clsx("hover:underline font-bold text-md font-thin cursor-pointer block", roboto.className)}>
                    Response Codes
                  </a>
                </li>
              </ul>
            </aside>

            <main className="flex-1 py-8 bg-white dark:bg-gray-900">
              <div className="text-center mb-10 sm:px-10">
                <p className={clsx("mt-2 text-lg text-[#565656] font-bold dark:text-gray-300 max-w-xl mx-auto", roboto.className)}>
                  Developer-Friendly API for Seamless Integration
                </p>
                <p className={clsx("max-w-xl text-md text-[#565656] mx-auto my-1 dark:text-gray-300", roboto.className)}>
                  Our RESTful APIs allow you to integrate appointment scheduling, voice agents, patient data, billing, and more — into your health platform or application.
                  Explore Postman Collection
                </p>
              </div>

              <div className="space-y-10 sm:px-10">
                {sections.map((sec, idx) => (
                  <motion.div
                    id={sec.id}
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="border dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800"
                  >
                    <h2 className={clsx("text-xl font-semibold text-[#344767] dark:text-teal-300 mb-1", robotoSlab.className)}>
                      {idx + 1}. {sec.title}:
                    </h2>
                    <p className={clsx("text-md mb-3 pl-7 text-gray-400  font-light dark:text-gray-400", robotoSlab.className)}>
                      {sec.description}
                    </p>
                    <div className="flex gap-2 mb-4">
                      {sec.tabs.map((tab, tabIdx) => (
                        <button
                          key={tabIdx}
                          className="px-4 py-2 rounded-md bg-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <pre className="bg-gray-900 text-[#a5f1ce] text-md rounded-md p-4 overflow-auto whitespace-pre-wrap">
                      {sec.code}
                    </pre>
                  </motion.div>
                ))}
              </div>

              <div id="response-codes" className="mt-12 sm:px-10">
                <h3 className={clsx("text-3xl text-[#005C56] font-semibold dark:text-teal-300 mb-4", robotoSlab.className)}>
                  Response Codes
                </h3>
                <div className="overflow-x-auto border">
                  <table className="min-w-full table-auto bg-gray-100 dark:bg-gray-700 border border-collapse border-gray-400">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                        <th className="p-2 w-1/2 border border-gray-400 font-semibold">Status Code</th>
                        <th className="p-2 border w-1/2 border-gray-400 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {responseCodes.map((row, idx) => (
                        <tr key={idx} className="border border-gray-300 dark:border-gray-600">
                          <td className="p-2 border border-gray-400 text-sm">{row.code}</td>
                          <td className="p-2 border border-gray-400 text-sm">{row.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-12 bg-[#086861] dark:bg-gray-700 text-white sm:p-6 rounded-r-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                <h4 className={clsx("text-xl font-semibold mb-2 text-center sm:text-left sm:pl-12", robotoSlab.className)}>
                  Contact Support
                </h4>
                <p className={clsx("text-lg text-center sm:text-left sm:pl-12", roboto.className)}>
                  If you have any issues, please contact our support team at{" "}
                  <a className="underline" href="mailto:support@DocsPath.dev">
                    support@Docspath.dev
                  </a>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
