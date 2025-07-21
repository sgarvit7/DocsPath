"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function JobOpenings({ darkMode }: { darkMode: boolean }) {
  const jobs = [
    "Deck Artefact Intern",
    "Motion Graphic Designing Intern",
    "UI/UX Designing Intern",
    "Product Management Intern",
    "Full Stack Development Intern",
    "Pre-Sales Reps Intern",
    "AI Intern",
    "Business Development Intern",
    "Content Writer Intern"
  ];

  return (
    <section className="w-full bg-[#0868610F]  flex flex-col ">
      <div className=" lg:mx-13 sm:mx-auto lg:mt-9 mb-3">
        <h2
          className={clsx(
            "text-5xl font-bold",
            darkMode ? "text-white" : "text-[#00665F]"
          )}
        >
          Join our team
        </h2>
        <p
          className={clsx(
            "text-2xl font-bold mt-2",
            darkMode ? "text-gray-300" : "text-[#00665F]"
          )}
        >
          Current openings
        </p>
      </div>

      <div className="grid grid-cols-1 px-4 sm:px-8 py-12 items-center mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={clsx(
              "rounded-xl border p-4 shadow-xl hover:shadow-md transition",
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-[#086861]"
            )}
          >
            <h3 className="font-semibold text-lg mb-2">{job}</h3>
            <p className="text-sm mb-1">Marketing and Communications</p>
            <p className="text-sm mb-1">Internship</p>
            <p className="text-sm mb-3">Remote</p>
            <Link href="/jobDescription">
              <p
                className={clsx(
                  "text-sm text-red-500 cursor-pointer mb-3",
                  darkMode && "text-red-400"
                )}
              >
                More Details →
              </p>
            </Link>
            <Link href="/jobDescription">
              <button
                className={clsx(
                  "rounded-full px-6 sm:mx-auto lg:ml-18 shadow-xl cursor-pointer py-2 font-semibold ",
                  darkMode
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "bg-[#086861] text-white hover:bg-teal-800"
                )}
              >
                Apply Now
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className={clsx(
          "mt-3 mb-10  border px-6 py-3 lg:max-w-6xl lg:ml-45 sm:w-auto sm:ml-auto shadow-2xl rounded-lg font-semibold",
          darkMode
            ? "text-white border-white  hover:bg-gray-700"
            : "text-teal-800 border-[#086861] bg-[white] hover:bg-gray-100"
        )}
      >
        Load More
      </motion.button>
    </section>
  );
}
