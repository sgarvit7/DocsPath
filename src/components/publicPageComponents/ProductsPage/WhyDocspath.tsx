"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BarChart2,
  Plug,
  Handshake,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";

interface WhyDocsPathProps {
  darkMode?: boolean;
}

const floatAnim = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  hover: {
    y: 0,
  },
};

export const WhyDocsPath: FC<WhyDocsPathProps> = ({ darkMode = false }) => {
  const cardBase =
    "max-w-sm border border-teal-600/60 shadow-xl rounded-xl p-5 flex gap-3 transition-all duration-300";

  return (
    <section
      className={`relative w-full py-28 overflow-hidden ${
        darkMode ? "dark bg-black text-white" : "bg-[#f8fdfd]"
      }`}
    >
      <h2 className="text-3xl md:text-4xl bg-[#086861] w-full py-6 font-bold text-white text-center mb-12">
        Why DocsPath?
      </h2>

      {/* Doctor Image */}
      <div className="relative z-0 flex justify-center">
        <Image
          src={darkMode?"/assets/prelogin-img/doctor-dark.jpg":"/assets/prelogin-img/doctor.png"}
          alt="Doctor"
          width={400}
          height={400}
          className="relative z-10 object-contain"
        />
      </div>

      {/* Floating Cards for Desktop */}
      <div className="hidden md:block relative max-w-7xl h-[500px] mx-auto mt-[-350px] z-0">
        {/* Top Left */}
        <motion.div
          className={`${cardBase} absolute top-[10px] left-[60px] bg-white dark:bg-gray-800 text-black dark:text-white`}
          variants={floatAnim}
          animate="animate"
          whileHover="hover"
        >
          <BarChart2 className="text-teal-600 w-6 h-6 shrink-0 mt-1" />
          <div className="text-left">
            <h3 className="font-semibold text-teal-900 dark:text-white">
              Real‑Time Analytics & Smart Dashboards
            </h3>
            <p className="mt-1 text-sm text-slate-700 dark:text-gray-300">
              Track performance, identify trends, and make data‑backed
              decisions—all from a clean, intuitive interface.
            </p>
          </div>
        </motion.div>

        {/* Top Right */}
        <motion.div
          className={`${cardBase} absolute top-[10px] right-[60px] bg-white dark:bg-gray-800 text-black dark:text-white`}
          variants={floatAnim}
          animate="animate"
          whileHover="hover"
        >
          <Plug className="text-teal-600 w-6 h-6 shrink-0 mt-1" />
          <div className="text-left">
            <h3 className="font-semibold text-teal-900 dark:text-white">
              Lightning‑Fast Setup & Seamless Integration
            </h3>
            <p className="mt-1 text-sm text-slate-700 dark:text-gray-300">
              Onboard in days, not months. Connect with your existing tools and
              infrastructure without disruption.
            </p>
          </div>
        </motion.div>

        {/* Bottom Left */}
        <motion.div
          className={`${cardBase} absolute bottom-[120px] left-[30px] bg-white dark:bg-gray-800 text-black dark:text-white`}
          variants={floatAnim}
          animate="animate"
          whileHover="hover"
        >
          <Handshake className="text-teal-600 w-6 h-6 shrink-0 mt-1" />
          <div className="text-left">
            <h3 className="font-semibold text-teal-900 dark:text-white">
              Built to Scale with You
            </h3>
            <p className="mt-1 text-sm text-slate-700 dark:text-gray-300">
              From startups to superspecialties, our platform evolves with your
              growth—no need to change systems.
            </p>
          </div>
        </motion.div>

        {/* Center Bottom */}
        <motion.div
          className={`${cardBase} absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-black dark:text-white`}
          variants={floatAnim}
          animate="animate"
          whileHover="hover"
        >
          <ShieldCheck className="text-teal-600 w-6 h-6 shrink-0 mt-1" />
          <div className="text-left">
            <h3 className="font-semibold text-teal-900 dark:text-white">
              Uncompromising Security & Privacy
            </h3>
            <p className="mt-1 text-sm text-slate-700 dark:text-gray-300">
              HIPAA & GDPR compliant. Role‑based access, bank‑grade encryption,
              and total control over data sharing.
            </p>
          </div>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          className={`${cardBase} absolute bottom-[120px] right-[30px] bg-white dark:bg-gray-800 text-black dark:text-white`}
          variants={floatAnim}
          animate="animate"
          whileHover="hover"
        >
          <ThumbsUp className="text-teal-600 w-6 h-6 shrink-0 mt-1" />
          <div className="text-left">
            <h3 className="font-semibold text-teal-900 dark:text-white">
              Customizable. Reliable. Always On.
            </h3>
            <p className="mt-1 text-sm text-slate-700 dark:text-gray-300">
              99.9% uptime. Flexible modules tailored to your exact needs.
              Premium support, 24/7.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden px-4 space-y-6 mt-12">
        {[
          {
            icon: <BarChart2 className="text-teal-600 w-6 h-6 mt-1" />,
            title: "Real‑Time Analytics & Smart Dashboards",
            desc: "Track performance, identify trends, and make data‑backed decisions—all from a clean, intuitive interface.",
          },
          {
            icon: <Plug className="text-teal-600 w-6 h-6 mt-1" />,
            title: "Lightning‑Fast Setup & Seamless Integration",
            desc: "Onboard in days, not months. Connect with your existing tools and infrastructure without disruption.",
          },
          {
            icon: <Handshake className="text-teal-600 w-6 h-6 mt-1" />,
            title: "Built to Scale with You",
            desc: "From startups to superspecialties, our platform evolves with your growth—no need to change systems.",
          },
          {
            icon: <ShieldCheck className="text-teal-600 w-6 h-6 mt-1" />,
            title: "Uncompromising Security & Privacy",
            desc: "HIPAA & GDPR compliant. Role‑based access, bank‑grade encryption, and total control over data sharing.",
          },
          {
            icon: <ThumbsUp className="text-teal-600 w-6 h-6 mt-1" />,
            title: "Customizable. Reliable. Always On.",
            desc: "99.9% uptime. Flexible modules tailored to your exact needs. Premium support, 24/7.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className={`rounded-xl p-5 flex gap-3 border shadow-md ${
              darkMode ? "bg-gray-800 text-white border-teal-500" : "bg-white border-teal-300"
            }`}
          >
            {item.icon}
            <div>
              <h3 className="font-semibold text-teal-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyDocsPath;
