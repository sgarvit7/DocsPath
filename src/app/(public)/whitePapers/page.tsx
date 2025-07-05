"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const whitepapers = [
  {
    title: "Revolutionizing Healthcare with AI",
    description:
      "This whitepaper explores how AI-driven platforms are transforming patient care, streamlining workflows, and improving operational efficiency across clinics and hospitals.",
    image: "/assets/prelogin-img/whitePaper1.jpg",
    link: "#",
  },
  {
    title: "Revolutionizing Healthcare with AI",
    description:
      "This whitepaper explores how AI-driven platforms are transforming patient care, streamlining workflows, and improving operational efficiency across clinics and hospitals.",
    image: "/assets/prelogin-img/whitePaper1.jpg",
    link: "#",
  },
  {
    title: "Revolutionizing Healthcare with AI",
    description:
      "This whitepaper explores how AI-driven platforms are transforming patient care, streamlining workflows, and improving operational efficiency across clinics and hospitals.",
    image: "/assets/prelogin-img/whitePaper1.jpg",
    link: "#",
  },
];

export default function Whitepapers() {
  return (
    <section className="relative py-10 px-4 sm:px-8 md:px-16 lg:px-24 transition-all duration-300 dark:bg-gray-700 bg-[radial-gradient(circle_at_center,_#ffffff_70%,_#d1fae5_100%)] dark:bg-none">

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
          className="text-3xl sm:text-4xl font-bold text-gray-900  dark:text-white"
        >
          Whitepapers
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 font-bold max-w-2xl mx-auto text-base sm:text-lg">
          Deep dive into cutting-edge research and innovation shaping the future
          of healthcare.
        </p>
      </div>

      {/* Cards */}
      <div className="relative space-y-10 w-full sm:w-11/12 md:w-4/5 z-10 lg:w-3/4 mx-auto md:ml-20 lg:ml-40 xl:ml-50">
        {whitepapers.map((paper, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl flex flex-col sm:flex-row overflow-visible border-2 p-6 sm:p-8 items-center"
          >
            <div className="sm:mb-0 sm:mr-6 w-[300px] sm:w-[350px] md:w-[450px]">
              <Image
                src={paper.image}
                alt="Whitepaper"
                width={450}
                height={120}
                className="rounded-lg mx-auto sm:ml-[-85px]"
              />
            </div>

            <div className="flex-1 text-center sm:text-left mt-6 sm:mt-0">
              <h3 className="text-xl sm:text-2xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
                {paper.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-serif dark:text-gray-300 mb-4">
                {paper.description}
              </p>
              <a
                href={paper.link}
                className="inline-block bg-[#086861] hover:bg-emerald-600 text-white lg:ml-70 text-sm font-medium px-5 py-2 rounded-full transition mt-2 sm:mt-0 sm:ml-4"
              >
                Download PDF
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
