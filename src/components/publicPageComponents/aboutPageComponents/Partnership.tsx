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
    { id: 1, name: "Coinbase", logo: "/assets/prelogin-img/logo2/logon1.png" },
    { id: 2, name: "NASA", logo: "/assets/prelogin-img/logo2/logo2.png" },
    { id: 3, name: "Netflix", logo: "/assets/prelogin-img/logo2/logon3.png" },
    { id: 4, name: "Pinterest", logo: "/assets/prelogin-img/logo2/logon4.png" },
    { id: 5, name: "Microsoft", logo: "/assets/prelogin-img/logo2/logon5.png" },
    { id: 6, name: "Google Cloud", logo: "/assets/prelogin-img/logo2/logon6.png" },
    { id: 7, name: "Amazon Web Services", logo: "/assets/prelogin-img/logo2/logon7.png" },
    { id: 8, name: "IBM Watson", logo: "/assets/prelogin-img/logo2/logo1.png" },
     { id: 9, name: "Coinbase", logo: "/assets/prelogin-img/logo2/logon1.png" },
    { id: 10, name: "NASA", logo: "/assets/prelogin-img/logo2/logo2.png" },
    { id: 11, name: "Netflix", logo: "/assets/prelogin-img/logo2/logon3.png" },
    { id: 14, name: "Pinterest", logo: "/assets/prelogin-img/logo2/logon4.png" },
    { id: 15, name: "Microsoft", logo: "/assets/prelogin-img/logo2/logon5.png" },
    { id: 16, name: "Google Cloud", logo: "/assets/prelogin-img/logo2/logon6.png" },
    { id: 17, name: "Amazon Web Services", logo: "/assets/prelogin-img/logo2/logon7.png" },
    { id: 18, name: "IBM Watson", logo: "/assets/prelogin-img/logo2/logo1.png" },
     { id: 21, name: "Coinbase", logo: "/assets/prelogin-img/logo2/logon1.png" },
    { id: 22, name: "NASA", logo: "/assets/prelogin-img/logo2/logo2.png" },
    { id: 23, name: "Netflix", logo: "/assets/prelogin-img/logo2/logon3.png" },
    { id: 24, name: "Pinterest", logo: "/assets/prelogin-img/logo2/logon4.png" },
    { id: 5, name: "Microsoft", logo: "/assets/prelogin-img/logo2/logon5.png" },
    { id: 26, name: "Google Cloud", logo: "/assets/prelogin-img/logo2/logon6.png" },
    { id: 27, name: "Amazon Web Services", logo: "/assets/prelogin-img/logo2/logon7.png" },
    { id: 28, name: "IBM Watson", logo: "/assets/prelogin-img/logo2/logo1.png" },
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
            className="flex gap-10 whitespace-nowrap"
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
              ><Image
  src={partner.logo}
  alt={`logo-${idx}`}
  width={160}
  height={100}
  className="object-contain transition duration-300 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
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
