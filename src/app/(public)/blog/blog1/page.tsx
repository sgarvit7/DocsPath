"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function RoboticSurgeryArticle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className={clsx("min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 p-6 md:p-12", inter.className)}>
      <Link
        href="/blog"
        className={clsx("absolute top-4 left-4 z-10 flex items-center space-x-2 text-teal-700 dark:text-teal-300 hover:underline", inter.className)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Blog</span>
      </Link>

      {/* Dark Mode Toggle */}
      <div className={clsx("absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3", inter.className)}>
        <Bell className="w-6 h-6" />
        <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600", inter.className)}>Dark mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={clsx(
            "relative w-10 h-5 rounded-full border border-black transition-colors duration-200",
            darkMode ? "bg-teal-600" : "bg-white",
            inter.className
          )}
        >
          <div
            className={clsx(
              "absolute top-[-2px] w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200",
              darkMode ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>

      {/* ✨ Animated article section */}
      <motion.section
        initial="hidden"
        animate="visible"
        className={clsx("bg-white dark:bg-gray-800 border-2 border-[#086861] mt-10 dark:border-gray-700 rounded-xl p-6 md:p-10 max-w-7xl mx-auto shadow-xl", inter.className)}
      >
        <motion.h1 className={clsx("text-2xl md:text-4xl font-bold mb-2", inter.className)} variants={fadeInUp} custom={0}>
          How Robotics is Assisting in Surgeries: A Game Changer in 2025
        </motion.h1>

        <motion.p className={clsx("text-md  dark:text-gray-400 mb-6", inter.className)} variants={fadeInUp} custom={1}>
          March 5, 2025 | ✍️ Dr. Kavita Rao
        </motion.p>

        <motion.div className="w-full flex justify-center mb-6" variants={fadeInUp} custom={2}>
          <Image
            src={darkMode?"/assets/prelogin-img/blog/blog11.jpg":"/assets/prelogin-img/blog/blog111.jpg"}
            alt="Robotic Surgery Illustration"
            width={250}
            height={250}
            className="rounded"
          />
        </motion.div>

        <div className={clsx("text-xl", inter.className)}>
          <motion.p className={clsx("mb-4 text-xl", inter.className)} variants={fadeInUp} custom={3}>
            Surgical robotics has transformed the way doctors perform procedures, offering greater precision, reduced recovery times, and enhanced patient outcomes. In 2025, advancements in robotic-assisted surgeries are making complex operations safer and more efficient than ever.
          </motion.p>

          <motion.h2 className={clsx("font-semibold text-xl mb-2", inter.className)} variants={fadeInUp} custom={4}>
            How Robotics is Changing Surgery?
          </motion.h2>

          <motion.ol
            className={clsx("list-decimal text-xl ml-5 space-y-1 mb-6", inter.className)}
            initial="hidden"
            animate="visible"
          >
            {[
              "Enhanced Precision – Robotic arms can make micro-movements beyond human capability, reducing errors.",
              "Minimally Invasive Procedures – Smaller incisions mean less pain, lower infection risk, and faster recovery.",
              "AI-Powered Assistance – AI integration helps with real-time decision-making during procedures.",
              "Remote Surgery Possibilities – With 5G and AI, surgeons can operate on patients remotely using robotic systems.",
            ].map((point, index) => (
              <motion.li key={index} variants={fadeInUp} custom={5 + index} className={clsx("text-sm", inter.className)}>
                {point}
              </motion.li>
            ))}
          </motion.ol>

          <motion.h2 className={clsx("font-semibold text-xl mb-2", inter.className)} variants={fadeInUp} custom={10}>
            Key Robotic Surgery Systems in 2025
          </motion.h2>

          <motion.ul
            className={clsx("list-disc ml-5 text-2xl space-y-1 mb-6", inter.className)}
            initial="hidden"
            animate="visible"
          >
            {[
              "Da Vinci Xi – The most advanced robotic-assisted surgery system for minimally invasive procedures.",
              "Mako SmartRobotics™ – Transforming orthopedic surgeries with AI-driven precision.",
              "Hugo™ RAS System – Expanding access to robotic-assisted surgery in underserved areas.",
            ].map((item, index) => (
              <motion.li key={index} variants={fadeInUp} custom={11 + index} className={clsx("text-sm", inter.className)}>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.h2 className={clsx("font-semibold mb-2", inter.className)} variants={fadeInUp} custom={15}>
            Challenges &amp; Future Potential
          </motion.h2>

          <motion.ul
            className={clsx("list-disc ml-5 space-y-1 mb-6", inter.className)}
            initial="hidden"
            animate="visible"
          >
            {[
              "High Costs – Robotic systems are expensive, limiting accessibility.",
              "Training Requirements – Surgeons must undergo extensive training.",
              "AI Regulation & Ethics – As AI becomes more involved in decision-making, regulations must ensure patient safety.",
            ].map((item, index) => (
              <motion.li key={index} variants={fadeInUp} custom={16 + index} className={clsx("text-sm", inter.className)}>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.h2 className={clsx("font-semibold mb-2", inter.className)} variants={fadeInUp} custom={20}>
            Conclusion
          </motion.h2>

          <motion.p className={clsx("mb-4", inter.className)} variants={fadeInUp} custom={21}>
            Robotics in surgery is no longer futuristic—it&rsquo;s reality. As costs decrease and accessibility improves, robot-assisted surgeries will become a standard practice worldwide.
          </motion.p>

          <motion.p className={clsx("italic", inter.className)} variants={fadeInUp} custom={22}>
            What do you think about robotic surgery? Share your thoughts in the comments!
          </motion.p>

          <motion.p
            className={clsx("mt-6 text-lg text-end cursor-pointer dark:text-blue-400 underline", inter.className)}
            variants={fadeInUp}
            custom={23}
          >
            <a
            href="https://www.telit.com/blog/connected-medical-devices-guide/">
            Read more &rarr; Medical Device Network
            </a>
          </motion.p>
        </div>
      </motion.section>
    </main>
  );
}
