"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface FAQSectionProps {
  darkMode: boolean;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQSection({ darkMode }: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 0,
      question: "How does DocsPath improve clinical operations?",
      answer:
        "It automates appointments, billing, patient communications, EHR management, and more—giving you back time to focus on patients.",
    },
    {
      id: 1,
      question: "Can this system integrate with what I already use?",
      answer:
        "Yes, DocsPath integrates seamlessly with most existing healthcare systems, EHRs, and third-party applications through our comprehensive API and integration capabilities.",
    },
    {
      id: 2,
      question: "Is patient data secure?",
      answer:
        "Absolutely. We implement bank-grade encryption, HIPAA compliance, role-based access controls, and regular security audits to ensure your patient data is completely secure.",
    },
    {
      id: 3,
      question: "Do I need to train my staff?",
      answer:
        "Our platform is designed to be intuitive and user-friendly. We provide comprehensive onboarding, training materials, and ongoing support to ensure your team is comfortable using the system.",
    },
    {
      id: 4,
      question: "How do I get started?",
      answer:
        "Simply sign up for a free trial, customize your dashboard, and start managing your practice more efficiently. Our team will guide you through the setup process.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className={`pt-16 px-15 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } relative overflow-hidden`}
    >
      

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* FAQ Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-2"
          >
            <motion.h2
              variants={itemVariants}
              className={`text-5xl font-bold mb-8 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Frequently asked questions
            </motion.h2>

            <div className="space-y-4 p-10">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className={`${
                    darkMode ? "bg-gray-700" : "bg-white"
                  } rounded-lg shadow-sm border ${
                    darkMode ? "border-gray-600" : "border-[#005C56]"
                  } overflow-hidden`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className={`w-full text-left p-6 flex items-center justify-between hover:${
                      darkMode ? "bg-gray-600" : "bg-gray-50"
                    } transition-colors duration-200`}
                  >
                    <span
                      className={`font-semibold pr-4 ${
                        darkMode ? "text-white" : "text-[#005C56]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full ${
                        openFAQ === faq.id
                          ? "bg-teal-600"
                          : darkMode
                          ? "bg-gray-600"
                          : "bg-white"
                      } flex items-center justify-center transition-colors duration-200`}
                    >
                      {openFAQ === faq.id ? (
                        <Minus className="w-6 h-6 text-white" />
                      ) : (
                        <Plus
                          className={`w-6 h-6 ${
                            darkMode ? "text-gray-300" : "text-[#005C56]"
                          }`}
                        />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`border-t ${
                          darkMode ? "border-gray-600" : "border-gray-200"
                        }`}
                      >
                        <div className="p-6">
                          <p
                            className={`${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            } leading-relaxed`}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>  
          </motion.div>

          {/* Illustration/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1 flex justify-end items-start"
          >
            {/* Doctor Image Container */}
            <div className="relative w-200 h-150 rounded-2xl overflow-hidden">
              {/* Image anchored to bottom */}
              <div className="absolute bottom-0 left-0 right-0 top-1/2">
                <Image
                  src="/assets/prelogin-img/home/faq.png"
                  alt="FAQ"
                  fill // ✅ Required for layout to work
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Circle on top-right corner */}
              <div className="w-50 h-50 -right-5 bottom-50 absolute flex items-center justify-center z-10">
                <Image src="/assets/prelogin-img/home/question-mark.png" alt="?" fill className="flex justify-center items-end"/>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
