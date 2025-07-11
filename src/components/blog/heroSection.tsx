"use client";

import { motion } from "framer-motion";


export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-[url('/assets/prelogin-img/blog/blogHero1.jpg')] dark:bg-[url('/assets/prelogin-img/blog/darkbloghero1.png')] bg-no-repeat bg-cover md:h-[700px] sm:h-auto dark:bg-teal-900 sm:py-5 lg:py-15 px-6 md:px-12 flex flex-col lg:flex-row  gap-10"
    >
      <div className="max-w-sm border rounded-3xl border-gray-700 bg-[white] p-5  h-[42%] ">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-700   mb-4">
          Stay Informed with the latest Updates and ....{" "}
          <span className="italic font-light text-3xl  text-teal-600">
            Blog highlights
          </span>
        </h1>
        <p className="text-gray-600 text-xl ">
          Featuring essentials insights and expert analysis.
        </p>
      </div>
    </motion.section>
  );
}
