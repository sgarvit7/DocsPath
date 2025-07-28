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
import Link from "next/link";
import GeoTracker from "@/utils/GeolocationTracker";
import { useAuth } from "@/contexts/AuthContext";

interface FooterProps {
  darkMode?: boolean;
}


export default function Footer({ darkMode = false }: FooterProps) {

  const { user } = useAuth();
  
  const footerLinks = {
    Product: [
      { name: "Company", href: "/about" },
      { name: "Help Center", href: "/help-center" },
      { name: "Legal", href: "/legal" },
      { name: "Advertise with us", href: "/advertise" },
    ],
    "Join us": [
      { name: "Request Demo", href: `${user ? "/request-demo" : "/request-demo"}` },
      { name: "Blog", href: "/blog" },
      { name: "Trust & compliance badges", href: "/trustCompilance" },
    ],
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
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Docspath</h2>
            </motion.div>
            <div className="text-sm">
              <p>Copyright © 2025 DocsPath</p>
              <p>Powered by Healtheck</p>
              <GeoTracker />
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => {
            const categoryHref =
              category.toLowerCase() === "product"
                ? "/product"
                : category.toLowerCase() === "join us"
                ? "/sign-up"
                : "#";

            return (
              <div key={category} className="col-span-1">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={categoryHref}
                    className="text-lg font-semibold mb-4 block hover:text-teal-200 transition-colors duration-200"
                  >
                    {category}
                  </Link>
                </motion.div>
                <ul className="space-y-2 text-sm">
                  {links.map(({ name, href }) => (
                    <li key={name}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Link
                          href={href}
                          className="hover:text-teal-200 transition-colors duration-200"
                        >
                          {name}
                        </Link>
                      </motion.div>
                    </li>
                  ))}

                  {category === "Product" ? (
                    <li>
                      <motion.div whileHover={{ scale: 1.1 }} className="inline">
                        <Image
                          src="/assets/DPIIT-header.png"
                          alt="DPIIT"
                          width={100}
                          height={100}
                          className="inline m-1"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} className="inline">
                        <Image
                          src="/assets/msme-logo.png"
                          alt="MSME"
                          width={80}
                          height={80}
                          className="inline m-1"
                        />
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
                        <div className="w-8 h-5 bg-red-500 rounded text-xs flex items-center justify-center text-white font-bold">
                          MC
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
            );
          })}

          {/* Social & App Store */}
          <div className="col-span-1">
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
                  <FontAwesomeIcon icon={icon} size="2x" className="text-white" />
                </motion.a>
              ))}
            </div>

            <div className="space-y-2">
              <motion.a
                href="#"
                className="block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-...z" />
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
                    <path d="M3,20.5V3.5C...Z" />
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
