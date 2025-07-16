"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface PartnershipProps {
  darkMode?: boolean;
  id?: string;
}

export default function Partnership({ darkMode = false, id }: PartnershipProps) {
  const partners: Partner[] = [
    { id: 1, name: "Coinbase", logo: "/assets/prelogin-img/logo2/logo1.png" },
    { id: 2, name: "NASA", logo: "/assets/prelogin-img/logo2/logo2.jpeg" },
    { id: 3, name: "Netflix", logo: "/assets/prelogin-img/logo2/logo3.jpeg" },
    { id: 4, name: "Pinterest", logo: "/assets/prelogin-img/logo2/logo4.png" },
    { id: 5, name: "Microsoft", logo: "/assets/prelogin-img/logo2/logo5.png" },
    { id: 6, name: "Google Cloud", logo: "/assets/prelogin-img/logo2/logo6.png" },
    { id: 7, name: "Amazon Web Services", logo: "/assets/prelogin-img/logo2/logo7.jpeg" },
    { id: 8, name: "IBM Watson", logo: "/assets/prelogin-img/logo2/logo8.jpeg" },
  ];

  return (
    <section id={id}
      className={`py-16 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2
            className={`mb-4 text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Partnership
          </h2>
          <p
            className={`mx-auto max-w-6xl text-xl ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            We collaborate with top healthcare providers, research institutions,
            and medical organizations to enhance patient outcomes. Our partners
            include:
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden mt-12">
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={`${partner.id}-${idx}`}
                className={`text-xl font-semibold flex items-center justify-center min-w-[200px] transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                 <Image
                                src={partner.logo}
                                alt={`logo-${idx}`}
                                width={100}
                                height={100}
                                className="object-contain "
                                priority={idx < 8}
                              />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
