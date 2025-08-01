"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../../../firebase/config";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email address");
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setSuccessMessage("✅ Password reset email sent! Please check your inbox.");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-email") {
          setError("Invalid email format.");
        } else if (err.code === "auth/user-not-found") {
          setError("No account found with this email.");
        } else {
          setError("Failed to send password reset email. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-teal-50">
      <Image
              src="/assets/bg-pattern.png"
              alt=""
              width={450}
              height={350}
              className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180"
            />
            <Image
              src="/assets/lower-bg-pattern.png"
              alt=""
              width={450}
              height={350}
              className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-50"
            />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white px-10 py-12 rounded-lg shadow-lg"
      >
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-teal-800 mb-4"
        >
          Forgot Password
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-600 text-center mb-6"
        >
          Enter your email and we’ll send you a link to reset your password.
        </motion.p>

        {successMessage && (
          <div className="text-green-600 text-sm text-center mb-4">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-1 focus:ring-teal-600 pl-10"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-3 rounded-full hover:bg-teal-700 transition-colors text-center"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/sign-in" className="text-teal-700 hover:underline">
            Back to Sign In
          </a>
        </div>
      </motion.div>
    </div>
  );
}
