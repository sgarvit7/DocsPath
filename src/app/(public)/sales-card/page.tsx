// components/AdvertisingForm.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Inter, Roboto } from "next/font/google";
import clsx from "clsx";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["500", "600", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function AdvertisingForm() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !mobile || !message) {
      setError("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mobile, message }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail("");
        setMobile("");
        setMessage("");
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to send request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full bg-gray-100 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full   bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Image Section */}
        <div className="md:w-1/2">
          <Image
            src="/assets/prelogin-img/new/salesCard.png"
            alt="Advertising Image"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h2
            className={clsx(
              "text-2xl sm:text-3xl font-semibold text-center text-gray-900 mb-6",
              inter.className
            )}
          >
            Interested in Advertising?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={clsx(
                "w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600",
                roboto.className
              )}
              required
            />
            <input
              type="tel"
              placeholder="Mobile.."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={clsx(
                "w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600",
                roboto.className
              )}
              required
            />
            <textarea
              placeholder="Tell us more"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className={clsx(
                "w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600",
                roboto.className
              )}
              required
            ></textarea>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm">Form submitted successfully!</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !email || !mobile || !message}
              className={clsx(
                "bg-teal-700 hover:bg-teal-600 text-white text-sm px-6 py-3 rounded-full transition duration-200",
                isSubmitting || !email || !mobile || !message
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit request"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
