"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Inter, Roboto } from "next/font/google";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","900"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","900"],
});

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
      className={`relative pt-16 px-4 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } overflow-hidden`}
    >
      {/* ✅ Background Image */}
      <div className="absolute inset-0 z-0 w-full">
        <Image
          src={
            darkMode
              ? "/assets/prelogin-img/home/faq-pattern-black-1.png"
              : "/assets/prelogin-img/home/faq-pattern-light-1.png"
          }
          alt="Background"
          fill
          className="bg-contain"
          priority
        />
      </div>

      {/* 🔳 Foreground Content */}
      <div className="container mx-auto relative z-10">
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
              className={ clsx ("text-4xl md:text-5xl font-extrabold mb-8 ",
                darkMode ? "text-white" : "text-gray-800",
                inter.className
  )}
            >
              Frequently asked questions
            </motion.h2>

            <div className="space-y-4 p-6 md:p-10">
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
                      className={clsx("font-bold pr-4 ",
                        darkMode ? "text-white" : "text-[#005C56]",
                        roboto.className
              )}
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
                            className={clsx(roboto.className,
                              darkMode ? "text-gray-300" : "text-gray-600"
                             ," leading-relaxed")}
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

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
  className="w-full flex justify-center items-center order-first lg:order-last lg:col-span-1 mb-10 lg:mb-0"
>
  <div className="relative flex flex-col items-center justify-end w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] h-[420px] sm:h-[500px] md:h-[600px] lg:h-[620px]">

    {/* Floating Question Mark just above head */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative z-20 w-16 h-16 sm:w-24 sm:h-24 mb-[-12px]"
    >
      <Image
        src={
          darkMode
            ? "/assets/prelogin-img/home/question-mark-dark-1.png"
            : "/assets/prelogin-img/home/question-mark.png"
        }
        alt="?"
        width={100}
        height={100}
        className="w-full h-full object-contain"
      />
    </motion.div>

    {/* Large Doctor Image */}
    <div className="w-full flex justify-center z-10">
      <Image
        src={
          darkMode
            ? "/assets/prelogin-img/home/faq-1.png"
            : "/assets/prelogin-img/home/faq-1.png"
        }
        alt="FAQ Doctor"
        width={600}
        height={600}
        className="w-full max-w-[90%] h-auto object-contain"
        priority
      />
    </div>
  </div>
</motion.div>



        </div>
      </div>
    </section>
  );
}
