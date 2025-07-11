"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";

interface AwardItem {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface AwardsProps {
  darkMode?: boolean;
}

export default function Awards({ darkMode = false }: AwardsProps) {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className={`relative py-16 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-[black]" : "bg-white"
      } overflow-hidden`}
    >
      {/* ✅ Background Image added here */}
      <div className="absolute w-1/3  ml-250 inset-0 z-0  pointer-events-none">
        <Image
          src={darkMode?"/assets/prelogin-img/home/hero-dark-4.png":"/assets/prelogin-img/home/hero-light-4.png"}
          alt="Background"
          fill
          className="bg-contain"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
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
              whileHover={{ y: -10 }}
              className={`rounded-xl shadow-lg overflow-hidden p-4 border-2 border-[#08685EA1] transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 hover:shadow-2xl"
                  : "bg-white hover:shadow-2xl"
              }`}
            >
              <div className="aspect-video relative overflow-hidden">
                <div
                  className={`w-full h-full flex items-center rounded-lg justify-center ${
                    darkMode ? "bg-purple-900" : "bg-purple-600"
                  } bg-gradient-to-br from-purple-600 to-pink-600`}
                >
                  <div className="text-center">
                    <Award className="w-16 h-16 text-white mx-auto mb-4" />
                    <div className="text-white text-sm font-medium">
                      Award Ceremony
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3
                  className={`text-lg font-bold mb-3 text-center ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {award.name}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-[#005A51]"
                  }`}
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
