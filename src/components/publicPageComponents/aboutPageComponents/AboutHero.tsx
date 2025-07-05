/* app/components/AboutSection.tsx (Next 13+/app router) */
import React from "react";
import { motion, Variants } from "framer-motion";
import { Globe } from "lucide-react";

type AboutSectionProps = {
  /** Theme flag supplied by parent */
  darkMode: boolean;
};

/* ---------- motion variants ---------- */
const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  /* convenience */
  const isDark = darkMode;

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full overflow-hidden py-20 px-4 lg:px-16 flex flex-col lg:flex-row items-center gap-12 ${
        isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* ---------- Left: Globe + About Card ---------- */}
      <motion.div
        variants={item}
        className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 relative w-full"
      >
        {/* Globe */}
        <motion.div
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-50 h-50 shrink-0 z-10"
        >
          {/* soft halo behind the globe */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: isDark
                ? "0 0 0 20px rgba(255,255,255,0.04)"
                : "0 0 0 20px rgba(219, 232, 230, 1)",
              borderRadius: "50%",
            }}
            aria-hidden
          />
          {/* Globe Icon */}
          <div className="w-full h-full flex items-center justify-center bg-teal-600 rounded-full">
            <Globe
              className="w-24 h-24 text-white"
              aria-label="Earth globe icon"
            />
          </div>
        </motion.div>

        {/* About Us Pill behind the globe and stretched */}
        <div
          className="rounded-xl px-16 py-10 z-0 w-full lg:ml-[-50px] min-h-[120px]"
          style={{
            backgroundColor: "#066965",
            color: "#ffffff",
          }}
        >
          <h3 className="text-3xl font-bold mb-3">About Us</h3>
          <p className="text-md leading-relaxed">
            Our cutting‑edge technology bridges the gap between doctors and
            digital transformation—enabling faster, smarter, and more connected
            care.
          </p>
        </div>
      </motion.div>

      {/* ---------- Right: Main Copy ---------- */}
      <motion.div
        variants={item}
        className="max-w-2xl space-y-4 px-5 leading-relaxed"
      >
        <span
          className={`text-4xl font-bold ${
            isDark ? "text-teal-400" : "text-[#086861]"
          }`}
        >
          At Docspath,
        </span>
        <span className="text-xl font-bold">
          we are revolutionizing healthcare by equipping doctors with an
          AI‑powered, unified dashboard that streamlines patient management,
          enhances clinical decision‑making, and drives operational excellence.
        </span>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;
