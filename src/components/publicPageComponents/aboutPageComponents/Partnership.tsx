"use client";

import { motion } from "framer-motion";

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
    { id: 1, name: "Coinbase", logo: "Coinbase" },
    { id: 2, name: "NASA", logo: "NASA" },
    { id: 3, name: "Netflix", logo: "NETFLIX" },
    { id: 4, name: "Pinterest", logo: "Pinterest" },
    { id: 5, name: "Microsoft", logo: "Microsoft" },
    { id: 6, name: "Google Cloud", logo: "Google Cloud" },
    { id: 7, name: "Amazon Web Services", logo: "Amazon Web Services" },
    { id: 8, name: "IBM Watson", logo: "IBM Watson" },
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
            className={`mx-auto max-w-3xl text-lg ${
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
                {partner.logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
