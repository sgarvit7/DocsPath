"use client";

import { motion } from "framer-motion";


const sections = [
  {
    title: "Authentication",
    description: "Authenticate every request using your API key in the headers.",
    code: `GET /api/v1/patients

Headers:
Authorization: Bearer YOUR_API_KEY`,
    tabs: ["GET", "Python", "cURL"],
  },
  {
    title: "Appointments",
    description: "Retrieve all appointments for a specific patient.",
    code: `GET /api/v1/appointments?patient_id=12345

Headers:
Authorization: Bearer your_token`,
     tabs: ["GET", "Python", "cURL"],
  },
  {
    title: "Patient Records",
    description: "Fetch full patient history with medical records.",
    code: `GET /api/v1/patient/12345

Headers:
Authorization: Bearer your_token`,
     tabs: ["GET", "Python", "cURL"],
  },
  {
    title: "Billing & Requests",
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
  { code: 200, description: "Request was successful." },
  { code: 400, description: "Bad Request: Invalid input." },
  { code: 401, description: "Unauthorized: Missing or invalid token." },
  { code: 404, description: "Not Found: Resource not found." },
  { code: 500, description: "Internal Server Error: Something went wrong on our end." },
];

export default function APIDocs() {
  return (
    <div>    
     <div className="bg-[#e5f4f3] dark:bg-gray-700">
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-teal-800 mx-15 py-5 dark:text-teal-300"
          >
            Medycall API Documentation
          </motion.h1>
     </div>
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      {/* Sidebar */} 
     
      <aside className="hidden md:block w-64 bg-teal-100 dark:bg-gray-800 p-6 ">
        <div className="font-bold dark:text-teal-300 mb-10 text-md">API Sections</div>
        <ul className="space-y-2">
          {sections.map((sec, idx) => (
            <li key={idx} className="hover:underline font-bold cursor-pointer">
              {sec.title}
            </li>
          ))}
        </ul>
      </aside>



      {/* Main Content */}
      <main className="flex-1   py-8 bg-white dark:bg-gray-900">
        <div className="text-center mb-10 sm:px-10">
          
          <p className="mt-2 text-lg font-bold  dark:text-gray-300 max-w-xl mx-auto">
           Developer-Friendly API for Seamless Integration </p>
           <p className="max-w-xl text-md mx-auto my-1  dark:text-gray-300">
Our RESTful APIs allow you to integrate appointment scheduling, voice agents, patient data, billing, and more — into your health platform or application.
Explore Postman Collection

          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 sm:px-10">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="border dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800"
            >
              <h2 className="text-xl font-black font-serif text-[#3f516f] dark:text-teal-300 mb-1">
                {idx + 1}. {sec.title}:
              </h2>
              <p className="text-md mb-3 pl-7 text-gray-400 font-serif dark:text-gray-400">
                {sec.description}
              </p>

              {/* Language Tabs */}
              <div className="flex gap-2 mb-4">
                {sec.tabs.map((tab, tabIdx) => (
                  <button
                    key={tabIdx}
                    className="px-4 py-1 rounded-md bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
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

        {/* Response Codes */}
           <div className="mt-12 sm:px-10">
          <h3 className="text-3xl font-serif font-black text-teal-700 dark:text-teal-300 mb-4">Response Codes</h3>
          <div className="overflow-x-auto border ">
            <table className="min-w-full table-auto bg-gray-100 dark:bg-gray-700 border border-collapse border-gray-400">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-2 border border-gray-400 font-semibold">Status Code</th>
                  <th className="p-2 border border-gray-400 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {responseCodes.map((row, idx) => (
                  <tr key={idx} className=" border border-gray-300 dark:border-gray-600">
                    <td className="p-2 border border-gray-400 text-sm">{row.code}</td>
                    <td className="p-2 border border-gray-400 text-sm">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Contact Support */}
       <div className="mt-12 bg-[#086861] dark:bg-gray-700 text-white p-4 sm:p-6 rounded-r-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 ">
  <h4 className="text-lg font-semibold mb-2 text-center sm:text-left sm:pl-12">Contact Support</h4>
  <p className="text-md text-center sm:text-left sm:pl-12">
    If you have any issues, please contact our support team at{" "}
    <a className="underline" href="mailto:support@medycall.dev">support@medycall.dev</a>
  </p>
</div>

      </main>
    </div>
    </div>
 
  );
}
