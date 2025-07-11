"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const router = useRouter();
  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Product",
      href: "/product",
      hasDropdown: true,
      dropdownItems: ["Features", "Pricing", "Integrations"],
      dropdownItemsLink: ["/product#features", "/product#pricing", "/integrations"],
    },
    { name: "Pricing", href: "/pricing" },
    {
      name: "Resources",
      href: "/resources",
      hasDropdown: true,
      dropdownItems: [
        "Whitepapers",
        "Blog",
        "Knowledge Base",
        "API Documentation",
        "Help Center",
      ],
      dropdownItemsLink: [
        "/whitepapers",
        "/blog",
        "/knowledgeBase",
        "/documentation",
        "/help-center",
      ],
    },
    {
      name: "Company",
      href: "/about",
      hasDropdown: true,
      dropdownItems: [
        "About Us",
        "Our Mission & Vision",
        "Leadership Team",
        "Careers",
        "Awards",
        "Partnerships",
        "Contact Us",
      ],
      dropdownItemsLink: [
        "/about",
        "/about#mission",
        "/about#leadership",
        "/careers",
        "/about#awards",
        "/about#partnership",
        "/contact",
      ],
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        darkMode ? "bg-gray-900/95" : "bg-teal-700/95"
      } backdrop-blur-sm`}
    >
      {/* <GeoTracker /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center mt-2 space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-15 h-15 rounded-lg flex items-center justify-center">
              <Image
                src="/assets/docspath-logo.png"
                alt="logo"
                width={150}
                height={150}
              ></Image>
            </div>
            <span className="text-white font-bold text-xl">Docspath</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.a
                  href={item.href}
                  className="text-white hover:text-teal-200 transition-colors duration-200 flex items-center space-x-1"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </motion.a>

                {/* Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full left-0 pt-2 w-48 z-50`}
                  >
                    <div
                      className={`${
                        darkMode ? "bg-gray-800" : "bg-white"
                      } rounded-lg shadow-lg py-2`}
                    >
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <Link
                          key={dropdownItem}
                          href={item.dropdownItemsLink[index]}
                          className={`block px-4 py-2 text-sm ${
                            darkMode
                              ? "text-gray-300 hover:text-white hover:bg-gray-700"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          } transition-colors duration-200`}
                        >
                          {dropdownItem}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Dark Mode Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Auth Buttons */}
            <motion.button
              onClick={() => router.push("/sign-in")}
              className="text-white dark:text-teal-300 hover:text-teal-200 dark:hover:text-teal-100 transition-colors duration-200"
              whileHover={{ y: -2 }}
            >
              Sign In
            </motion.button>

            <span className="mx-2 text-white/60 dark:text-white/40">|</span>

            <motion.button
              onClick={() => router.push("/sign-up")}
              className="bg-white text-teal-700 dark:bg-teal-600 dark:text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join us
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </motion.button>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 mt-4 pt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-teal-200 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/20 pt-4 flex flex-col space-y-2">
                <button
                  onClick={() => router.push("/sign-in")}
                  className="text-white hover:text-teal-200 transition-colors duration-200 text-left"
                >
                  Sign In
                </button>

                <button
                  onClick={() => router.push("/sign-up")}
                  className="bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors duration-200 w-fit"
                >
                  Join us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
