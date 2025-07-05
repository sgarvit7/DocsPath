"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  stars: 1 | 2 | 3 | 4 | 5;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    stars: 5,
    quote:
      "This platform has completely transformed the way I manage my clinic. AI‑powered automation has saved me hours of manual work.",
    name: "Dr. Aakash Mehta",
    role: "Cardiologist",
  },
  {
    stars: 5,
    quote:
      "Patient engagement and appointment management have never been this seamless. Highly recommended for doctors.",
    name: "Dr. Priya Nair",
    role: "General Physician",
  },
  {
    stars: 5,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Nulla facilisi. Sed mi quam, consectetur eu.",
    name: "Dr. Ravi Desai",
    role: "Orthopedic Surgeon",
  },
];

interface DoctorTestimonialsProps {
  darkMode?: boolean;
}

/* ---------- Framer variants ---------- */
const cardFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const DoctorTestimonials: React.FC<DoctorTestimonialsProps> = ({
  darkMode = false,
}) => {
  const bg = darkMode ? "bg-gray-900" : "bg-[#086861]";
  const textHeading = "text-white";
  const cardBg = "bg-white";
  const borderColor = darkMode ? "border-teal-800" : "border-teal-100";

  return (
    <section className={clsx(bg, "py-16")}>
      <div className="mx-auto max-w-7xl grid grid-col-1 md:grid-col-2 lg-grid-col-3 px-4 sm:px-6 lg:px-8">
        <h2 className={clsx(textHeading, "text-3xl font-extrabold")}>
          What Doctors Say About DocsPath
        </h2>

        {/* horizontal scroll wrapper */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -600, right: 0 }}
          className="mt-8 flex gap-8 overflow-x-auto snap-x snap-mandatory"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={cardFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -4 }}
              className={clsx(
                cardBg,
                borderColor,
                "relative snap-center w-[23rem] shrink-0 border-b-4 border-r-4 border-white"
              )}
            >
              <div className="pb-3 pr-3 bg-[#086861]">
                {/* fancy left quote mark */}
            
                <div className="p-6 bg-white rounded-md" style={{boxShadow: '0 4px 10px rgba(255, 255, 255, 0.3)'}}>
                  {/* stars */}
                  <div className="mb-1 flex gap-1 text-amber-400">
                    {Array.from({ length: t.stars }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        fill="currentColor"
                        className="shrink-0"
                      />
                    ))}
                  </div>

                  {/* quote */}
                  <p className="text-sm text-gray-700">{t.quote}</p>

                  {/* footer */}
                  <div className="mt-4 flex items-center gap-3">
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-300" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorTestimonials;
