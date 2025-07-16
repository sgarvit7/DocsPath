"use client";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={clsx(
        "relative bg-[url('/assets/prelogin-img/blog/blogHero1.jpg')] dark:bg-[url('/assets/prelogin-img/blog/darkblogHero1.png')] bg-no-repeat bg-cover md:h-[700px] sm:h-auto dark:bg-teal-900 py-18 lg:py-15 px-6 md:px-12 flex flex-col lg:flex-row gap-10",
        inter.className
      )}
    >
      <div className="max-w-sm border rounded-3xl border-gray-700 bg-[white] dark:bg-black/30 p-5 h-[42%]">
        <h1 className="text-3xl md:text-4xl font-bold text-[#086861] dark:text-teal-300 mb-4">
          Stay Informed with the latest Updates and ....{" "}
          <span className="italic font-light text-3xl text-[#086861] dark:text-teal-200">
            Blog highlights
          </span>
        </h1>
        <p className=" dark:text-white text-xl">
          Featuring essentials insights and expert analysis.
        </p>
      </div>
    </motion.section>
  );
}
