"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, Eye, X, Bell, HeartPulse, BrainCircuit, ShieldCheck } from "lucide-react";

const whitepapers = [
  {
    title: "Innovations in Telemedicine Services",
    description:
      "Explore the latest advancements in telehealth, from virtual consultations to remote monitoring, and understand their impact on accessibility and continuity of care.",
    icon: <HeartPulse className="w-30 h-30 text-teal-700" />,
    pdfUrl: "/pdfs/healthcare-ai.pdf",
    content:
      "This whitepaper investigates the rapid growth and evolution of telemedicine. It covers key technologies enabling remote patient interactions, the benefits for underserved populations, and challenges related to regulatory frameworks and reimbursement models. Discover how telemedicine is reshaping healthcare delivery and patient engagement globally. The report also highlights emerging trends such as AI-powered virtual assistants for triage, wearable health tech integration with telemedicine platforms, and the expansion of tele-specialty services to rural areas. It provides a comprehensive analysis of the economic and social implications of widespread telemedicine adoption",
  },
  {
    title: "The Future of AI in Diagnostics",
    description:
      "Discover how cutting-edge artificial intelligence is revolutionizing the accuracy and speed of medical diagnoses, leading to earlier interventions and better patient outcomes.",
    icon: <BrainCircuit className="w-30 h-30 text-teal-700" />,
    pdfUrl: "/pdfs/ai-diagnostics.pdf",
    content:
      "This whitepaper delves into the transformative impact of AI on diagnostic processes. It covers advancements in image recognition for radiology, predictive analytics for early disease detection, and personalized treatment recommendations. Learn about the ethical considerations, implementation challenges, and the immense potential of AI to enhance diagnostic precision and patient care pathways. The document further explores case studies of successful AI integration in clinics worldwide, highlighting quantifiable improvements in efficiency and diagnostic accuracy. It also addresses the ongoing research into new AI models and their potential applications in areas like genomic medicine and personalized drug discovery, offering a glimpse into the future of healthcare diagnostics.",
  },
  {
    title: "Cybersecurity in Healthcare Data",
    description:
      "Understand the critical strategies and technologies vital for protecting sensitive patient data from evolving cyber threats, ensuring compliance and trust in digital healthcare.",
    icon: <ShieldCheck className="w-30 h-30  text-teal-700" />,
    pdfUrl: "/pdfs/patient-monitoring.pdf",
    content:
      "This whitepaper addresses the growing importance of cybersecurity in safeguarding patient information. It outlines common threats, best practices for data protection, and regulatory requirements like HIPAA. Learn how healthcare organizations can build robust security infrastructures to maintain patient trust and prevent costly data breaches. It further details specific attack vectors targeting healthcare, such as ransomware and phishing, and provides actionable recommendations for implementing multi-layered security protocols, employee training programs, and incident response plans to mitigate risks effectively.",
  },
];

export default function Whitepapers() {
  const [selectedPaper, setSelectedPaper] = useState<null | typeof whitepapers[0]>(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section
      className={`relative py-10 px-4 sm:px-8 md:px-16 lg:px-24 transition-all duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-[radial-gradient(circle_at_center,_#ffffff_70%,_#d1fae5_100%)]"
      }`}
    >
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
        <Bell className="w-6 h-6 text-black dark:text-white" />
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Dark mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-10 h-5 rounded-full border border-black transition-colors duration-200 ${
            darkMode ? "bg-teal-600" : "bg-white"
          }`}
        >
          <div
            className={`absolute top-[-2px] left-[2px] w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200 ${
              darkMode ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="py-8">
      {/* Background Decorations */}
      <Image
        src="/assets/bg-pattern.png"
        alt="bg"
        width={350}
        height={350}
        className="absolute -top-20 -left-10 z-0 opacity-50 rotate-180"
      />
      <Image
        src="/assets/lower-bg-pattern.png"
        alt="bg"
        width={350}
        height={350}
        className="absolute -top-10 -right-0 z-0 rotate-180 scale-x-[-1] opacity-50"
      />

      {/* Header */}
      <div className="relative text-center z-10 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold  text-center text-gray-900 dark:text-white"
        >
          Whitepapers
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 font-bold max-w-2xl mx-auto text-base sm:text-lg">
          Deep dive into cutting-edge research and innovation shaping the future of healthcare.
        </p>
      </div>

      {/* Cards */}
      <div className="relative space-y-10 w-full sm:w-11/12 md:w-4/5 z-10 lg:w-3/4 mx-auto md:ml-20 lg:ml-40 xl:ml-40">
        {whitepapers.map((paper, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl flex flex-col sm:flex-row overflow-visible border-2 p-6 sm:p-8 items-center"
          >
            {/* Icon Section */}
            <div className="sm:mb-0 sm:mr-6 w-[300px] sm:w-[350px] md:w-[450px] flex justify-center items-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg flex items-center justify-center">
                {paper.icon}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center sm:text-left mt-6 sm:mt-0">
              <h3 className="text-xl sm:text-2xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
                {paper.title}
              </h3>
              <p className="text-gray-600 text-md sm:text-base font-serif dark:text-gray-300 mb-4">
                {paper.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <a
                  href={paper.pdfUrl}
                  download
                  className="flex items-center gap-2 justify-center bg-[#086861] hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2  transition"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="flex items-center gap-2 justify-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white text-sm font-medium px-5 py-2  transition"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-lg max-w-3xl w-full relative text-gray-800 dark:text-white"
            >
              <button
                onClick={() => setSelectedPaper(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={30} />
              </button>
              <h2 className="text-3xl text-center font-bold mb-4">{selectedPaper.title}</h2>
              <p className="text-lg">{selectedPaper.content}</p>
              <a
                href={selectedPaper.pdfUrl}
                download
                className="mt-6 inline-block bg-emerald-700 text-white px-4 py-2 rounded-lg"
              >
                Download PDF
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
    </section>
  

  );
}
