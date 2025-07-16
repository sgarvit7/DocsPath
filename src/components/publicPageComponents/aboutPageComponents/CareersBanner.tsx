"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface CareersBannerProps {
  darkMode?: boolean;
}

/* ----------------- motion variants ----------------- */
const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  hover: { y: -4, scale: 1.01, transition: { duration: 0.25 } },
};

export default function CareersBanner({ darkMode = false }: CareersBannerProps) {
  return (
    <section className={clsx("w-full py-16 px-4", darkMode ? "bg-gray-800" : "bg-[#cfe3e3]")}>
      <div className="max-w-4xl mx-auto">
        {/* Card */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          whileHover="hover"
          className={clsx(
            "rounded-2xl px-8 py-5 shadow-lg flex flex-col gap-1",
            darkMode ? "bg-[#004743] text-white" : "bg-[#005a55] text-white"
          )}
        >
          {/* Title & subtitle */}
          <h2
            className={clsx(
              "text-3xl font-extrabold flex items-center gap-1",
              darkMode ? "text-white" : "text-white"
            )}
          >
            <span role="img" aria-label="Suit person">
              🧑‍💼
            </span>
            Careers
          </h2>
          <h3
            className={clsx(
              "text-lg font-semibold",
              darkMode ? "text-gray-100" : "text-white"
            )}
          >
            Join Our Mission to Transform Healthcare
          </h3>
          <p
            className={clsx(
              "max-w-4xl leading-relaxed",
              darkMode ? "text-gray-300" : "text-white"
            )}
          >
            We’re building the next era of digital health—and we’re looking for
            passionate, purpose‑driven individuals to join us. Whether your
            expertise lies in AI, engineering, clinical operations, or customer
            success, there’s a place for you here.
          </p>

          {/* CTA */}
          <div className="pt-4 w-full text-right">
            <Link
              href="/careers"
              className={clsx(
                "inline-flex items-center gap-2 font-semibold hover:underline",
                darkMode ? "text-white" : "text-white"
              )}
            >
              Explore Careers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
