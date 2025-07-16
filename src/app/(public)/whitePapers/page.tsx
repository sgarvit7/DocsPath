"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, Eye, X, Bell } from "lucide-react";
import clsx from "clsx";
import { Inter, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700","800","900"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400","500","600","700","800","900"] });

const whitepapers = [
  {
    title: "Innovations in Telemedicine Services",
    description:
      "Explore the latest advancements in telehealth, from virtual consultations to remote monitoring, and understand their impact on accessibility and continuity of care.",
    image: "/assets/prelogin-img/new/wp1.png",
    pdfUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8590973/pdf/main.pdf",
    content:
      "This whitepaper investigates the rapid growth and evolution of telemedicine. It covers key technologies enabling remote patient interactions, the benefits for underserved populations, and challenges related to regulatory frameworks and reimbursement models. Discover how telemedicine is reshaping healthcare delivery and patient engagement globally. The report also highlights emerging trends such as AI-powered virtual assistants for triage, wearable health tech integration with telemedicine platforms, and the expansion of tele-specialty services to rural areas. It provides a comprehensive analysis of the economic and social implications of widespread telemedicine adoption",
  },
  {
    title: "The Future of AI in Diagnostics",
    description:
      "Discover how cutting-edge artificial intelligence is revolutionizing the accuracy and speed of medical diagnoses, leading to earlier interventions and better patient outcomes.",
    image: "/assets/prelogin-img/new/wp22.jpg",
    pdfUrl: "https://publishing.emanresearch.org/CurrentIssuePDF/EmanPublisher_26_5899primeasia-6110151.pdf",
    content:
      "This whitepaper delves into the transformative impact of AI on diagnostic processes. It covers advancements in image recognition for radiology, predictive analytics for early disease detection, and personalized treatment recommendations. Learn about the ethical considerations, implementation challenges, and the immense potential of AI to enhance diagnostic precision and patient care pathways. The document further explores case studies of successful AI integration in clinics worldwide, highlighting quantifiable improvements in efficiency and diagnostic accuracy. It also addresses the ongoing research into new AI models and their potential applications in areas like genomic medicine and personalized drug discovery, offering a glimpse into the future of healthcare diagnostics.",
  },
  {
    title: "Cybersecurity in Healthcare Data",
    description:
      "Understand the critical strategies and technologies vital for protecting sensitive patient data from evolving cyber threats, ensuring compliance and trust in digital healthcare.",
    image: "/assets/prelogin-img/new/wp3.jpg",
    pdfUrl: "https://www.infosys.com/industries/healthcare/insights/documents/healthcare-cybersecurity-threats.pdf",
    content:
      "This whitepaper addresses the growing importance of cybersecurity in safeguarding patient information. It outlines common threats, best practices for data protection, and regulatory requirements like HIPAA. Learn how healthcare organizations can build robust security infrastructures to maintain patient trust and prevent costly data breaches. It further details specific attack vectors targeting healthcare, such as ransomware and phishing, and provides actionable recommendations for implementing multi-layered security protocols, employee training programs, and incident response plans to mitigate risks effectively.",
  },
];

export default function Whitepapers() {
  const [selectedPaper, setSelectedPaper] = useState<null | typeof whitepapers[0]>(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section
      className={clsx(
        "relative py-10 px-4 sm:px-8 md:px-16 lg:px-24 transition-all duration-300",
        inter.className,
        darkMode
          ? "dark bg-gray-900"
          : "bg-[radial-gradient(circle_at_center,_#ffffff_70%,_#d1fae5_100%)]"
      )}
    >
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
        <Bell className="w-6 h-6 text-black dark:text-white" />
        <span className={clsx("text-sm", inter.className, darkMode ? "text-gray-300" : "text-gray-600")}>
          Dark mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={clsx(
            "relative w-10 h-5 rounded-full border border-black transition-colors duration-200",
            darkMode ? "bg-teal-600" : "bg-white"
          )}
        >
          <div
            className={clsx(
              "absolute top-[-2px]  w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200",
              darkMode ? "translate-x-5" : "translate-x-0"
            )}
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
            className={clsx("text-4xl sm:text-4xl font-bold text-gray-900 dark:text-white", roboto.className)}
          >
            Whitepapers
          </motion.h2>
          <p className={clsx("mt-2 font-semibold max-w-2xl mx-auto text-base sm:text-2xl text-gray-900 dark:text-gray-300", roboto.className)}>
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
              {/* Image Section (replaces icon) */}
              <div className="sm:mb-0 sm:mr-6  flex justify-center items-center">
                <div className="  p-6 rounded-xl flex items-center justify-center">
                  <Image src={paper.image} alt="Whitepaper" width={400} height={400} />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 text-center sm:text-left mt-6 sm:mt-0">
                <h3 className={clsx("text-xl sm:text-2xl font-bold text-[#005C56] text-shadow-lg dark:text-teal-300 mb-2", inter.className)}>
                  {paper.title}
                </h3>
                <p className={clsx("text-md sm:text-base text-gray-600 dark:text-gray-300 mb-4", inter.className)}>
                  {paper.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                  <a
                    href={paper.pdfUrl}
                  
                    className={clsx("flex items-center gap-2 justify-center bg-[#086861] hover:bg-emerald-600 text-white text-sm rounded-xl font-medium px-5 py-2 transition", inter.className)}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                  <button
                    onClick={() => setSelectedPaper(paper)}
                    className={clsx("flex items-center gap-2 justify-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white text-sm font-medium px-5 py-2 rounded-xl transition", inter.className)}
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
                className={clsx("bg-white dark:bg-gray-900 p-8 rounded-lg max-w-3xl w-full relative text-gray-800 dark:text-white", inter.className)}
              >
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={30} />
                </button>
                <h2 className={clsx("text-3xl text-center font-bold mb-4", inter.className)}>
                  {selectedPaper.title}
                </h2>
                <p className={clsx("text-lg", inter.className)}>{selectedPaper.content}</p>
                <a
                  href={selectedPaper.pdfUrl}
                  
                  className={clsx("mt-6 inline-block bg-emerald-700 text-white px-4 py-2 rounded-lg", inter.className)}
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
