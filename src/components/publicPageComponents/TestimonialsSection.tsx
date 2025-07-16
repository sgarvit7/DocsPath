"use client";

import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","900"],
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

  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const infiniteTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    []
  );

  useEffect(() => {
    if (isHovered) {
      controls.start({ x: "0%", transition: { duration: 0.5 } });
    } else {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      });
    }
  }, [isHovered, controls]);

  return (
    <section className={clsx(bg, "py-16 overflow-hidden")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={clsx(textHeading, "text-3xl font-extrabold",roboto.className)}>
          What Doctors Say About DocsPath
        </h2>

        {/* animated wrapper */}
        <div
          className="mt-8 overflow-x-auto"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
        >
          <motion.div
            className="flex gap-8 min-w-max md:min-w-full"
            animate={controls}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              // Hide scrollbar for WebKit browsers
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {infiniteTestimonials.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
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
                  "relative snap-center w-[20rem] sm:w-[23rem] shrink-0 border-b-4 border-r-4 border-white"
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
                    <p className= {clsx("text-sm text ",roboto.className,darkMode?"text-white":"text-black")}>
                      {t.quote}
                    </p>
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
                        <p  className={clsx("text-sm font-semibold  ",roboto.className, darkMode?"text-[white]":"text-[black]")}>
                          {t.name}
                        </p>
                        <p className={clsx("text-xs text-gray-400",roboto.className)}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DoctorTestimonials;
