"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import JobApplication from "@/components/publicPageComponents/CareersPage/JobApplication";
import Image from "next/image";

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function JobDescriptionPage() {
  const jobTitle = "Motion Graphic Designing Intern";

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>{jobTitle}</title>
        <meta name="description" content="Motion Graphic Designing Intern job details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-white shadow-sm"
      >
        <div className="relative w-full h-180 overflow-hidden rounded-lg shadow-lg mb-6">
          <div className="absolute inset-0 bg-[url('/assets/prelogin-img/job-description.png')] bg-cover bg-no-repeat bg-right" />
          <Image
            src="/assets/bg-pattern.png"
            alt="bg"
            width={350}
            height={350}
            className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180"
          />
          <div className="relative h-full flex items-start px-30 py-15">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="max-w-lg"
            >
              <h1 className="text-4xl font-bold text-black mb-2 z-10">{jobTitle}</h1>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Static Job Details */}
          <motion.div
            variants={fadeSlideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg space-y-6 p-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities:</h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>Design and produce engaging motion graphics for social media, ads, and video campaigns</li>
                  <li>Work with creative teams to conceptualize and execute animations aligned with brand voice</li>
                  <li>Edit video footage and add visual effects, animation, and sound design</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What We’re Looking For:</h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>Strong understanding of motion principles, typography, and composition</li>
                  <li>Proficiency in Adobe After Effects, Illustrator, and Photoshop</li>
                  <li>Portfolio showcasing strong design and animation work</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Perks & Benefits:</h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>Flexible working hours</li>
                  <li>Remote working options</li>
                  <li>Opportunities for growth</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Job Information:</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Job Category:</strong> Marketing and Communications
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Job Type:</strong> Internship
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Location:</strong> Remote
                </p>
              </section>
            </div>
          </motion.div>

          {/* Right Panel - Job Application Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <JobApplication jobTitle={jobTitle} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
