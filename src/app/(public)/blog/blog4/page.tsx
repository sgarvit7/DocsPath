"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Bell, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HenryMedsArticle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={clsx("dark:bg-gray-900", inter.className)}>
      <Link
        href="/blog"
        className={clsx(
          "absolute top-4 left-4 z-10 flex items-center space-x-2 text-teal-700 dark:text-teal-300 hover:underline",
          inter.className
        )}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Blog</span>
      </Link>

      {/* Dark Mode Toggle */}
      <div
        className={clsx(
          "absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center mb-9 space-x-3",
          inter.className
        )}
      >
        <Bell className="w-6 h-6" />
        <span
          className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}
        >
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
              "absolute top-[-2px] w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200",
              darkMode ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>

      <section
        className={clsx(
          "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 dark:border-2 px-4 sm:px-6 md:px-10 py-15 md:py-15 max-w-7xl mx-auto rounded-lg border-2 border-[#086861] lg:mt-10 mb-10",
          inter.className
        )}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <h1
            className={clsx(
              "text-2xl sm:text-3xl md:text-4xl font-bold flex-1",
              inter.className
            )}
          >
            How Henry Meds is tackling the obesity epidemic—and transforming the
            patient experience
          </h1>
          <div className="flex-shrink-0 w-full md:w-auto max-w-sm">
            <Image
              src="/assets/prelogin-img/blog/blog41.jpg"
              alt="Doctor portrait"
              width={300}
              height={100}
              className="rounded-md object-cover w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className={clsx("leading-relaxed text-base sm:text-lg md:text-xl pt-4", inter.className)}
        >
          Obesity is one of America’s biggest health issues. Despite the connection between weight and other health concerns, obesity has, historically, been seen as nothing more than a cosmetic concern, leaving many patients with little support when it comes to improving overall health.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="space-y-3 pt-6"
        >
          <h2 className={clsx("text-lg sm:text-xl font-bold", inter.className)}>
            Henry Meds’ vision
          </h2>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            If you could make a few medications more accessible to Americans, which would you choose? 
            This is a question that Henry Meds asked themselves before launching their virtual services. For Henry Meds, the answer was helping Americans address metabolic syndromes, which can result in conditions that shorten years of lack of treatment: obesity, stress, and diabetes.
          </p>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            So, Henry Meds focuses on offering treatments for endocrine-related conditions. Today, they work with top pharmacists to manage insomnia, testosterone levels, and weight—with their greatest success coming from compounded GLP-1s.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="space-y-3 pt-6"
        >
          <h2 className={clsx("text-lg sm:text-xl mt-10 font-bold", inter.className)}>
            Improving accessibility
          </h2>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            These are some of the key ways Henry Meds has designed their telehealth-only, subscription-based model around patient needs:
          </p>
          <ul className={clsx("list-disc list-inside text-base sm:text-lg space-y-1", inter.className)}>
            <li>All visits are done over telehealth</li>
            <li>Patients are then regularly supported by staff</li>
            <li>Prescriptions are shipped directly to patients from licensed pharmacies</li>
            <li>Their pricing model is very stable</li>
            <li>Their onboarding process is easy to understand</li>
            <li>Funding is transparent and easy to understand</li>
          </ul>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            So much impact, so quickly. But how exactly has Henry Meds been able to check all these boxes?
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="space-y-3 pt-6"
        >
          <h2 className={clsx("text-lg sm:text-xl mt-10 font-bold", inter.className)}>
            Telehealth-only visits
          </h2>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            Because all visits are done over telehealth, patients can get the prescriptions they need without taking off work or worrying about transportation. If patients need doctor access, Henry Meds patterns them with a tele-nurse to make it possible to make it possible to support from the comfort of one’s home.
          </p>
           <h2 className={clsx("text-lg sm:text-xl mt-10 font-bold", inter.className)}>
            Patient Support
          </h2>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            Henry Meds is known for great patient support—both during and between visits. During appointments, “our providers always ask permission to follow up with the same patient and, once that’s approved, they know who they’re talking to and when they’ll be checking in,” said the support services lead at Henry Meds.
          </p>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            One area where they’ve made a big impact is speed. Dr. Cheryl Peacock of Med Circuit clarified: “We prefer a patient call-in, and then we have them connected with a provider,” said Dr. Peacock. “That gives patients a high degree of care while delegating work across team members as much as possible.”
          </p>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            Convenient ways to get medications
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="space-y-3 pt-6"
        >
          <h2 className={clsx("text-lg sm:text-xl font-bold mt-30", inter.className)}>
            How you can get started with human-centric telehealth
          </h2>
          <p className={clsx("text-base sm:text-lg leading-relaxed", inter.className)}>
            In the book <a href="https://www.amazon.in/Telehealth-Success-Thrive-Remote-Care/dp/B0CBM31HGQ" className="font-bold">Telehealth Success Ideas to Thrive in the New Age of Remote Care</a>, the authors describe how direct-to-consumer models like Henry Meds can thrive with telehealth. Check out the book to learn how technology-driven practices can improve efficiency and help providers focus on building the provider-patient relationship.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
