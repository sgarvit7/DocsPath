"use client";

import { motion, Variants } from "framer-motion";
import { Eye, Target } from "lucide-react";

type MissionVisionProps = {
  darkMode: boolean;
  id?: string;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function MissionVision({ darkMode, id }: MissionVisionProps) {
  const teal = "#04786f";
  const cardBg = darkMode ? "#1f2937" : "#eaf7f6";
  const textColor = darkMode ? "text-gray-300" : "text-gray-700";

  return (
    <section id={id}
      className={`py-16 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Divider */}
      <hr
        className={`mx-auto w-11/12 border-t mb-6 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      />
      <h2
        className={`text-3xl font-bold text-center mb-12 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Our Mission &amp; Vision
      </h2>

      {/* Two Cards */}
      <div className="grid   lg:grid-cols-2 max-w-8xl ">
        {/* Vision Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
          className="flex flex-col lg:flex-row w-10/11 items-center bg-white rounded-xl shadow-xl "
          style={{ backgroundColor: cardBg }}
        >
          

          {/* Text */}
          <div className="p-6 text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-2" style={{ color: teal }}>
              Vision
            </h3>
            <p className={`text-md leading-relaxed ${textColor}`}>
              To modernize healthcare infrastructure by equipping doctors with
              next-gen automation and delivering patients a seamless, on-demand
              care experience built for scale, speed, and trust.
            </p>
          </div>

          {/* Icon */}
          <div className="flex-shrink-0 ">
            <div
              className="w-38 h-38 lg:-mr-10 rounded-full flex items-center justify-center ring-4 ring-white"
              style={{ backgroundColor: teal }}
            >
              <Eye className="w-25 h-25 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Mission Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
          className="flex flex-col w-10/11 lg:flex-row items-center bg-white rounded-xl lg:mx-20 shadow-xl "
          style={{ backgroundColor: cardBg }}
        >
          {/* Icon */}
          <div className="flex-shrink-0 ">
            <div
              className="w-38 h-38 lg:-ml-20 rounded-full flex items-center justify-center ring-4 ring-white"
              style={{ backgroundColor: teal }}
            >
              <Target className="w-25 h-25 text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="p-6 text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-2" style={{ color: teal }}>
              Mission
            </h3>
            <p className={`text-md leading-relaxed ${textColor}`}>
              To revolutionize healthcare by creating a seamless, intelligent
              ecosystem that optimizes clinical workflows, enhances patient
              engagement, and redefines care delivery—unlocking long-term value
              for doctors, patients, and the healthcare industry.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
