"use client";

import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, Bell } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import  PhoneInput from "@/components/publicPageComponents/PhoneInput";
import EmailInput from "@/components/publicPageComponents/EmailInput";
import axios from "axios";

interface FormData {
  name: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  // Update localStorage and optionally add a dark class to <body> or <html>
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    subject: "",
    message: "",
  });

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // already present
  // const [phoneOk, setPhoneOk] = useState(false);
  const [loading, setLoading] = useState(false);
   const [phoneOk, setPhoneOk] = useState(false);
  const [status,  setStatus]  = useState<"idle" | "success" | "error">("idle");

  // Animation variants
  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants : Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const formVariants : Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const imageVariants : Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    console.log( loading, status)
    try {
      /** 📌 POST everything to /api/contact */
      const response = await axios.post("/api/contact", {
        ...formData,
        email,
        phone,
      });

      console.log(response);  
      console.log(phoneOk);

      /* success feedback */
      setStatus("success");
      setFormData({ name: "", subject: "", message: "" });
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <style jsx>{`
        .contact-bg-pattern {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="${darkMode
            ? "%23374151"
            : "%23e0e0e0"}" fill-opacity="0.2"><path d="M 0 0 L 100 0 L 100 100 L 0 100 Z M 10 10 L 90 10 L 90 90 L 10 90 Z" /></g></svg>');
          background-size: 200px;
          background-repeat: repeat;
        }
      `}</style>

      {/* Background Pattern */}
      <Image
        src="/assets/bg-pattern.png"
        alt="bg"
        width={350}
        height={350}
        className="absolute -top-20 -left-10 z-0 opacity-50 rotate-180"
      ></Image>

      <Image
        src="/assets/lower-bg-pattern.png"
        alt="bg"
        width={350}
        height={350}
        className="absolute -top-10 -right-0 z-0 rotate-180 transform scale-x-[-1] opacity-50"
      ></Image>

      <motion.main
        className="contact-bg-pattern flex-grow py-10 px-5 flex flex-col items-center gap-10 relative z-10"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section
          className="flex flex-col justify-center items-center gap-8 w-full max-w-7xl p-10 text-center"
          variants={itemVariants}
        >
          {/* Dark Mode Toggle */}
          <div className="absolute top-4 right-4 z-10 flex bg-[#08686130] p-2 rounded-full items-center space-x-3 cursor-pointer">
            <Bell
              className={` ${darkMode ? "text-white" : "text-black"} w-6 h-6`}
            />
            <span
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Dark mode
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-10 h-5 rounded-full border border-black transition-colors duration-200 ${
                darkMode ? "bg-teal-600" : "bg-white"
              }`}
            >
              <div
                className={`absolute -top-0.5 -left-2 w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200 ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <motion.div className="text-center mb-5" variants={itemVariants}>
            <motion.h1
              className={`text-5xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
              variants={itemVariants}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className={`text-lg max-w-4xl mx-auto leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
              variants={itemVariants}
            >
              We&apos;d love to hear from you. Fill out the form or contact us
              directly.
            </motion.p>
          </motion.div>

          {/* Form and Image Container */}
          <div className="flex flex-wrap justify-center items-start gap-10 w-full pt-5">
            {/* Contact Form */}
            <motion.div
              className={`flex-1 min-w-[300px] max-w-lg rounded-xl p-8 shadow-lg text-left backdrop-blur-sm ${
                darkMode
                  ? "bg-gray-800/80 border border-gray-700"
                  : "bg-white/80 border border-gray-200"
              }`}
              variants={formVariants}
            >
              <h2
                className={`text-3xl font-semibold mb-4 ${
                  darkMode ? "text-teal-400" : "text-[#008D83]"
                }`}
              >
                Write to us
              </h2>
              <p
                className={`text-base mb-6 leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Fill out the form below and we will get back to you as soon as
                possible.
              </p>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label
                    htmlFor="name"
                    className={`block text-sm mb-2 font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name <span className="text-red-600 text-md">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className={`w-full px-4 py-3 border rounded-lg font-sans text-base transition-all duration-300 focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400/20"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:ring-teal-200"
                    }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <label
                    htmlFor="email"
                    className={`block text-sm mb-2 font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    E-mail<span className="text-red-600 text-md">*</span>
                  </label>
                  <EmailInput value={email} onChange={setEmail} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <label
                    htmlFor="phone"
                    className={`block text-sm mb-2 font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Mobile No.<span className="text-red-600 text-md">*</span>
                  </label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    onValidate={setPhoneOk} // optional validity callback
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <label
                    htmlFor="subject"
                    className={`block text-sm mb-2 font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is your query about?"
                    required
                    className={`w-full px-4 py-3 border rounded-lg font-sans text-base transition-all duration-300 focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400/20"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:ring-teal-200"
                    }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <label
                    htmlFor="message"
                    className={`block text-sm mb-2 font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg font-sans text-base transition-all duration-300 focus:outline-none focus:ring-2 resize-vertical min-h-[120px] ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400/20"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:ring-teal-200"
                    }`}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-4 px-8 border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 mt-4 bg-[#008D83] text-white hover:from-[#008D83] hover:to-[#008D83] shadow-lg shadow-teal-500/25"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>

            {/* Doctor Image */}
            <motion.div
              className="flex-1 min-w-[300px] max-w-lg h-full flex justify-center items-center p-5"
              variants={imageVariants}
            >
              <motion.div
                className={`w-full h-full rounded-2xl overflow-hidden flex items-center justify-center`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/assets/prelogin-img/contactus.png"
                  alt="Contact Us"
                  width={600}
                  height={990}
                  className=" rounded-[20px] border-2 border-[#086861]"
                ></Image>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Information Section */}
        <motion.section
          className={`w-full max-w-7xl rounded-2xl shadow-lg p-10 mt-10 text-center backdrop-blur-sm ${
            darkMode
              ? "bg-gray-800/80 border border-gray-700"
              : "bg-white/80 border border-gray-200"
          }`}
          variants={itemVariants}
        >
          <motion.h2
            className={`text-4xl font-bold mb-8 ${
              darkMode ? "text-teal-400" : "text-teal-800"
            }`}
            variants={itemVariants}
          >
            Contact Information
          </motion.h2>

          {/* Info Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center"
            variants={containerVariants}
          >
            <motion.div
              className={`rounded-xl p-6 shadow-sm flex flex-col items-center text-center transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700/70"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Mail
                  className={`w-10 h-10 mb-4 ${
                    darkMode ? "text-teal-400" : "text-teal-600"
                  }`}
                />
              </motion.div>
              <h4
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-teal-400" : "text-teal-800"
                }`}
              >
                Email Support
              </h4>
              <a
                href="mailto:support@DocsPath.com"
                className={`text-base no-underline transition-colors ${
                  darkMode
                    ? "text-gray-300 hover:text-teal-400"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                support@Docspath.com
              </a>
              <p
                className={`text-base leading-relaxed mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Our team responds within 24 hours.
              </p>
            </motion.div>

            <motion.div
              className={`rounded-xl p-6 shadow-sm flex flex-col items-center text-center transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700/70"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Phone
                  className={`w-10 h-10 mb-4 ${
                    darkMode ? "text-teal-400" : "text-teal-600"
                  }`}
                />
              </motion.div>
              <h4
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-teal-400" : "text-teal-800"
                }`}
              >
                Phone Number
              </h4>
              <p
                className={`text-base leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                +91 98765 43210
              </p>
              <p
                className={`text-base leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Call us during office hours for immediate assistance.
              </p>
            </motion.div>

            <motion.div
              className={`rounded-xl p-6 shadow-sm flex flex-col items-center text-center transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700/70"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Clock
                  className={`w-10 h-10 mb-4 ${
                    darkMode ? "text-teal-400" : "text-teal-600"
                  }`}
                />
              </motion.div>
              <h4
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-teal-400" : "text-teal-800"
                }`}
              >
                Office Hours
              </h4>
              <p
                className={`text-base leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Mon-Fri, 9 AM - 6 PM IST
              </p>
              <p
                className={`text-base leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                We are closed on weekends and public holidays.
              </p>
            </motion.div>

            {/* Address Card */}
            <motion.div
              className={`flex-1 min-w-[300px] max-w-md rounded-xl p-8 shadow-sm flex flex-col items-center text-center transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700/50 hover:bg-gray-700/70"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <MapPin
                  className={`w-10 h-10 mb-4 ${
                    darkMode ? "text-teal-400" : "text-teal-600"
                  }`}
                />
              </motion.div>
              <h4
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? "text-teal-400" : "text-teal-800"
                }`}
              >
                Our Office Address
              </h4>
              <div
                className={`text-base leading-relaxed space-y-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <p>DocsPath Pvt. Ltd.</p>
                <p>5th Floor, Tech Park One</p>
                <p>Bengaluru, Karnataka,</p>
                <p>India - 560001</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Map Container */}
          <motion.div
            className="flex flex-wrap gap-8 mt-10 justify-center w-full"
            variants={containerVariants}
          >
            <motion.div
              className={`flex-[2] min-w-full h-80 rounded-xl overflow-hidden shadow-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.00035136894!2d77.61864531482206!3d12.9715983908479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167e42d7b42f%3A0xc0c8e0e1b6f0e2b!2sTech%20Park%20One!5e0!3m2!1sen!2sin!4v1678280000000!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                className={`w-full h-full border-none ${
                  darkMode ? "filter invert" : ""
                }`}
                title="Office Location Map"
                style={
                  darkMode ? { filter: "invert(90%) hue-rotate(180deg)" } : {}
                }
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.main>
    </motion.div>
  );
};

export default ContactUs;