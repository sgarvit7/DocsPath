"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = false }: FooterProps) {
  const footerLinks = {
    Product: ["Company", "Resources", "Legal", "Advertise with us"],
    "Join us": ["Request Demo", "Blog", "Trust & compliance badges"],
  };

  const socialLinks = [
    { icon: faWhatsapp, link: "https://wa.me/your-number" },
    { icon: faInstagram, link: "https://instagram.com/your-profile" },
    { icon: faLinkedin, link: "https://linkedin.com/in/your-profile" },
    { icon: faFacebook, link: "https://facebook.com/your-profile" },
  ];

  return (
    <footer
      className={`${
        darkMode ? "bg-gray-900" : "bg-[#086861]"
      } text-white transition-colors duration-300 z-10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 flex flex-col items-start">
            <motion.div
              className="flex flex-col justify-center items-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center mr-4">
                <div className="relative">
                  <Image
                    src="/assets/docspath-logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                  ></Image>
                </div>
              </div>
              <h2 className="text-2xl font-bold">Docspath</h2>
            </motion.div>
            <div className="text-sm">
              <p>Copyright © 2025 Medycall</p>
              <p>Powered by Healtheck</p>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="hover:text-teal-200 transition-colors duration-200"
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
                {category === "Product" ? (
                  <li>
                    <motion.div whileHover={{ scale: 1.1 }} className="inline">
                      <span>
                        <Image
                          src="/assets/DPIIT-header.png"
                          alt="DPIIT"
                          width={100}
                          height={100}
                          className="inline m-1"
                        ></Image>
                      </span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="inline">
                      <span>
                        <Image
                          src="/assets/msme-logo.png"
                          alt="DPIIT"
                          width={80}
                          height={80}
                          className="inline m-1"
                        ></Image>
                      </span>
                    </motion.div>
                  </li>
                ) : (
                  <div className="mb-6">
                    <p className="text-xs text-teal-200 mb-2">
                      We accept Visa, Mastercard, Gpay
                    </p>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">
                          VISA
                        </span>
                      </div>
                      <div className="w-8 h-5 bg-red-500 rounded">
                        MasterCard
                      </div>
                      <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">
                          G
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          ))}

          {/* Right Section - Social Media, Certifications, Apps */}
          <div className="col-span-1">
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map(({ icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 px-6 text-2xl dark:bg-gray-700 bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-40 transition-all text-[#086861]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <FontAwesomeIcon icon={icon} size="2x" className="text-white"></FontAwesomeIcon>
                </motion.a>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="space-y-2">
              <motion.a
                href="#"
                className="block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </motion.a>
              <motion.a
                href="#"
                className="block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
