"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {  Menu, X, ChevronDown } from "lucide-react";
import NavbarCountrySelect from "./NavbarCountrySelect";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import SearchTrigger from "./SearchTrigger";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // const [isUser, setIsUser] = useState(false);
  // const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // setIsUser(true);
    }
  }, [user]);

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Product",
      href: "/product",
      hasDropdown: true,
      dropdownItems: ["Features", "Pricing", "Integrations"],
      dropdownItemsLink: [
        "/product#features",
        "/product#pricing",
        "/integrations",
      ],
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
        "/WP",
        "/blog",
        "/KB",
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
      className={`fixed top-0 left-0 right-0 z-999 transition-colors duration-300 ${
        darkMode ? "bg-gray-900/95" : "bg-teal-700/95"
      } backdrop-blur-sm`}
    >
      <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
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
              />
            </div>
            <span className="text-white font-bold text-xl">Docspath</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex ml-35 items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
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
                    className={`text-white hover:text-teal-200 transition-colors duration-200 flex items-center space-x-1 ${
                      isActive
                        ? "underline underline-offset-8 decoration-2"
                        : ""
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </motion.a>

                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 pt-2 w-48 z-50"
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
              );
            })}
          </div>
          <div className="ml-35">          <SearchTrigger/> </div>


          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex ml-0 items-center space-x-4">
            <motion.button
              onClick={() => router.push("/sign-in")}
              className="text-white dark:text-teal-300 hover:text-teal-200 dark:hover:text-teal-100 transition-colors duration-200"
              whileHover={{ y: -2 }}
            >
              Sign In
            </motion.button>

            <span className="mx-2 text-white/60 dark:text-white/40">|</span>

            <motion.button
              // onClick={
              //   user
              //     // ? () => setIsJoinModalOpen(true)
              //     : () => router.push("/sign-up")
              // }
              className="bg-white text-teal-700 dark:bg-teal-600 dark:text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join us
            </motion.button>
          </div>

          {/* Hide Country Select on Mobile */}
          <div className="hidden md:block ">
            <NavbarCountrySelect />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
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
                  // onClick={
                  //   user
                  //     ? () => setIsJoinModalOpen(true)
                  //     : () => router.push("/sign-up")
                  // }
                  className="bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors duration-200 w-fit"
                >
                  Join us
                </button>
              </div>
            </div>
            <span className="mt-5">
            <NavbarCountrySelect />
            </span>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
