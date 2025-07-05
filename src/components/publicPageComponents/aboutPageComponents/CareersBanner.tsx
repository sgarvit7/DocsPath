/* components/CareersBanner.tsx */
"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function CareersBanner() {
  return (
    <section className="w-full bg-[#cfe3e3] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Card */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          whileHover="hover"
          className="rounded-2xl bg-[#005a55] text-white px-8 py-5 shadow-lg flex flex-col gap-1"
        >
          {/* Title & subtitle */}
          <h2 className="text-3xl font-extrabold flex items-center gap-1">
            <span role="img" aria-label="Suit person">
              🧑‍💼
            </span>
            Careers
          </h2>
          <h3 className="text-lg font-semibold">
            Join Our Mission to Transform Healthcare
          </h3>
          <p className="max-w-4xl leading-relaxed">
            We’re building the next era of digital health—and we’re looking for
            passionate, purpose‑driven individuals to join us. Whether your
            expertise lies in AI, engineering, clinical operations, or customer
            success, there’s a place for you here.
          </p>

          {/* CTA */}
          <div className="pt-4 w-full text-right">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 font-semibold hover:underline"
            >
              Explore Careers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
