"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import { Inter, Roboto } from "next/font/google";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

interface AwardItem {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface AwardsProps {
  darkMode?: boolean;
  id?: string; // ✅ Added id prop here
}

export default function Awards({ darkMode = false, id }: AwardsProps) {
  const awards: AwardItem[] = [
    {
      id: 1,
      name: "HealthTech Excellence 2024",
      description:
        "Lorem ipsum dolor sit lorem magna aliqua enim ad minim veniam elit eiusmod tempor",
      image: "/api/placeholder/280/200",
    },
    {
      id: 2,
      name: "Innovation Award",
      description:
        "Lorem ipsum dolor sit lorem magna aliqua enim ad minim veniam elit eiusmod tempor",
      image: "/api/placeholder/280/200",
    },
    {
      id: 3,
      name: "Best Healthcare Platform",
      description:
        "Lorem ipsum dolor sit lorem magna aliqua enim ad minim veniam elit eiusmod tempor",
      image: "/api/placeholder/280/200",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95, rotate: -2 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const hoverAnimation = {
    scale: 1.03,
    rotate: 1,
    boxShadow: "0px 12px 20px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  };

  return (
    <section
      id={id}
      className={`relative py-16 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } overflow-hidden`}
    >
      {/* ✅ Background Image added here
      <div className="absolute w-1/3  ml-250 inset-0 z-0  pointer-events-none">
        <Image
          src={
            darkMode
              ? "/assets/prelogin-img/home/hero-dark-41.png"
              : "/assets/prelogin-img/home/hero-light-4.png"
          }
          alt="Background"
          fill
          className="bg-contain"
          priority
        />
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className={clsx(
              "text-5xl  font-extrabold ",
              darkMode ? "text-white" : "text-gray-900",
              inter.className
            )}
          >
            Our Awards
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {awards.map((award) => (
            <motion.div
              key={award.id}
              variants={itemVariants}
              whileHover={hoverAnimation}
              className={`rounded-xl shadow-lg overflow-hidden p-4 border-2 border-[#08685EA1] transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 hover:shadow-2xl"
                  : "bg-white hover:shadow-2xl"
              }`}
            >
              <Image
                src={"/assets/prelogin-img/award.png"}
                alt="award"
                width={500}
                height={200}
              />
              <div className="p-6">
                <h3
                  className={clsx(
                    "text-lg font-semibold mb-3 text-center",
                    darkMode ? "text-white" : "text-gray-900",
                    roboto.className
                  )}
                >
                  {award.name}
                </h3>
                <p
                  className={clsx(
                    "text-sm leading-relaxed text-center ",
                    darkMode ? "text-gray-300" : "text-[#005A51]",
                    roboto.className
                  )}
                >
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
