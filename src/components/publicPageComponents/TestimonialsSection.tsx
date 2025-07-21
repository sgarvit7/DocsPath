"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { Star } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

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
    avatar : "/assets/prelogin-img/home/img1.jpg"
  },
  {
    stars: 5,
    quote:
      "Patient engagement and appointment management have never been this seamless. Highly recommended for doctors.",
    name: "Dr. Priya Nair",
    role: "General Physician",
     avatar : "/assets/prelogin-img/home/img2.jpg"
  },
  {
    stars: 5,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Nulla facilisi. Sed mi quam, consectetur eu.",
    name: "Dr. Ravi Desai",
    role: "Orthopedic Surgeon",
     avatar : "/assets/prelogin-img/home/img3.jpeg"
  },
];

interface DoctorTestimonialsProps {
  darkMode?: boolean;
}

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
  const cardBg = darkMode ? "bg-gray-600" : "bg-white";
  const borderColor = darkMode ? "border-teal-800" : "border-teal-100";

  const infiniteTestimonials = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    []
  );

  const generateAnimation = (delay: number) => ({
    y: ["0%", "-50%"],
    transition: {
      repeat: Infinity,
      duration: 20 + delay * 3,
      ease: "linear",
    },
  });

  return (
    <section className={clsx(bg, "py-16 overflow-hidden")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className={clsx(
            textHeading,
            "text-3xl font-extrabold mb-12",
            roboto.className
          )}
        >
          What Doctors Say About DocsPath
        </h2>

        {/* Responsive: one column on mobile, three on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((rowIndex) => (
            <div
              key={rowIndex}
              className={clsx(
                "overflow-hidden",
                rowIndex === 0 ? "block" : "hidden",
                "md:block h-96"
              )}
            >
              <motion.div
                className="flex flex-col gap-6"
                animate={generateAnimation(rowIndex)}
              >
                {infiniteTestimonials.map((t, i) => (
                  <motion.div
                    key={`${t.name}-${rowIndex}-${i}`}
                    custom={i}
                    variants={cardFade}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className={clsx(
                      cardBg,
                      borderColor,
                      "relative w-[20rem] sm:w-full shrink-0 border-b-4 border-r-4 border-white mx-auto"
                    )}
                  >
                    <div className="pb-3 pr-3 bg-[#086861]">
                      <div
                        className={clsx("p-6 rounded-md", cardBg)}
                        style={{
                          boxShadow: darkMode
                            ? "0 4px 10px rgba(0, 0, 0, 0.6)"
                            : "0 4px 10px rgba(255, 255, 255, 0.3)",
                        }}
                      >
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
                        <p
                          className={clsx(
                            "text-sm",
                            roboto.className,
                            darkMode ? "text-white" : "text-black"
                          )}
                        >
                          {t.quote}
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          {t.avatar ? (
                            <Image
                              src={t.avatar}
                              alt={t.name}
                              width={40}
                              height={32}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-300" />
                          )}
                          <div>
                            <p
                              className={clsx(
                                "text-sm font-semibold",
                                roboto.className,
                                darkMode ? "text-[white]" : "text-[black]"
                              )}
                            >
                              {t.name}
                            </p>
                            <p
                              className={clsx(
                                "text-xs text-gray-400",
                                roboto.className
                              )}
                            >
                              {t.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorTestimonials;
