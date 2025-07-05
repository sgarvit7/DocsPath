"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import JobApplication from "@/components/publicPageComponents/CareersPage/JobApplication";
import { JobDescription } from "@/types/jobs";
import Image from "next/image";

interface JobDescriptionPageProps {
  jobPosting: JobDescription | null;
  loading: boolean;
  error: string;
}

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function JobDescriptionPage({
  jobPosting,
  loading,
  error,
}: JobDescriptionPageProps) {
  const jobTitle = jobPosting?.title || "Job Application";

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>{jobTitle}</title>
        <meta name="description" content={jobPosting?.description || ""} />
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
              <h1 className="text-4xl font-bold text-black mb-2 z-10">
                {jobTitle}
              </h1>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Job Details */}
          <motion.div
            variants={fadeSlideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-1"
          >
            {loading && (
              <div className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                Loading job details...
              </div>
            )}

            {!loading && error && (
              <div className="text-red-500 font-semibold text-lg">{error}</div>
            )}

            {!loading && !error && jobPosting && (
              <div className="bg-white dark:bg-gray-800 rounded-lg space-y-1">
                {[
                  ["Key Responsibilities:", jobPosting.responsibilities],
                  ["What We're Looking For:", jobPosting.requirements],
                  ["Perks & Benefits:", jobPosting.benefits],
                  ["Remote Key Example:", jobPosting.howToApply],
                  ["Why Digitoonz?", jobPosting.whyJoin],
                  ["Emoluments:", jobPosting.emoluments],
                ].map(([sectionTitle, items], index) => (
                  <motion.section
                    key={index}
                    variants={fadeSlideUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {sectionTitle}
                    </h2>
                    <ul className="space-y-2">
                      {(items as string[]).map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                ))}

                {/* Footer Info */}
                <div className="border-gray-200 dark:border-gray-700 pt-4">
                  <p className="dark:text-gray-400 mb-2">
                    Ready to create stunning motion graphics that captivate
                    audiences? Apply now and unleash your creativity!
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Job Category:</strong> {jobPosting.category}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Job Type:</strong> {jobPosting.jobType}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Panel - Job Application Form (Always Visible) */}
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
