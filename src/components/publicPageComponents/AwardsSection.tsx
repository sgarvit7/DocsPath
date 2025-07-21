"use client";

import { useState } from "react";
import Image from "next/image";
import { Inter, Roboto } from "next/font/google";
import clsx from "clsx";
import { motion } from "framer-motion";

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
  backDescription: string;
}

interface AwardsProps {
  darkMode?: boolean;
}

export default function Awards({ darkMode = false }: AwardsProps) {
  const awards: AwardItem[] = [
    {
      id: 1,
      name: "HealthTech Excellence 2024",
      description: "Awarded for cutting-edge solutions in healthcare tech.",
      image: "/assets/prelogin-img/award.png",
      backDescription:
        "This award honors our leadership in modernizing digital health.",
    },
    {
      id: 2,
      name: "Innovation Award",
      description: "Recognized for outstanding product innovation.",
      image: "/assets/prelogin-img/award.png",
      backDescription:
        "We received this for pioneering healthcare platform innovations.",
    },
    {
      id: 3,
      name: "Best Healthcare Platform",
      description: "Top-rated digital healthcare delivery system.",
      image: "/assets/prelogin-img/award.png",
      backDescription:
        "Chosen as the most user-friendly and impactful platform in 2024.",
    },
  ];

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleFlip = (id: number, flip: boolean) => {
    setFlippedCards((prev) =>
      flip ? [...prev, id] : prev.filter((cardId) => cardId !== id)
    );
  };

  return (
    <section
      className={clsx(
        "relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden",
        darkMode ? "bg-gray-900" : "bg-white"
      )}
    >
      {/* Background Image */}
      <div className="absolute w-1/3 ml-250 inset-0 z-0 pointer-events-none">
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
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2
            className={clsx(
              "text-5xl text-start font-extrabold",
              darkMode ? "text-white" : "text-gray-900",
              inter.className
            )}
          >
            Recognized and Awarded
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award) => {
            const isFlipped = flippedCards.includes(award.id);

            return (
              <div
                key={award.id}
                className="relative w-full h-[360px] cursor-pointer"
                onMouseEnter={() => handleFlip(award.id, true)}
                onMouseLeave={() => handleFlip(award.id, false)}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    position: "relative",
                  }}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {/* Front */}
                  <div
                    className={clsx(
                      "absolute w-full h-full rounded-xl shadow-lg overflow-hidden p-4 border-2 border-[#08685EA1] backface-hidden",
                      darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    )}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <Image
                      src={award.image}
                      alt={award.name}
                      width={500}
                      height={200}
                    />
                    <div className="p-4">
                      <h3
                        className={clsx(
                          "text-lg font-semibold text-center mb-2",
                          roboto.className
                        )}
                      >
                        {award.name}
                      </h3>
                      <p
                        className={clsx(
                          "text-sm text-center",
                          darkMode ? "text-gray-300" : "text-[#005A51]",
                          roboto.className
                        )}
                      >
                        {award.description}
                      </p>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className={clsx(
                      "absolute w-full h-full rounded-xl shadow-lg overflow-hidden p-4 border-2 border-[#08685EA1] flex justify-center items-center text-center",
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="p-6">
                      <h3
                        className={clsx(
                          "text-lg font-semibold mb-2",
                          roboto.className
                        )}
                      >
                        {award.name}
                      </h3>
                      <p
                        className={clsx(
                          "text-sm",
                          roboto.className,
                          darkMode ? "text-gray-300" : "text-[#08685E]"
                        )}
                      >
                        {award.backDescription}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
