"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react"; // you can swap with any icon

interface EndingScreenProps {
  name: string;
  link: string;
  delay?: number; // optional auto redirect delay in ms
}

export default function EndingScreen({ name, link, delay = 3000 }: EndingScreenProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(link);
    }, delay);

    return () => clearTimeout(timer);
  }, [link, delay, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-teal-100 to-blue-200">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="flex justify-center mb-6"
        >
          <ThumbsUp className="w-20 h-20 text-teal-700" />
        </motion.div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-gray-800">Thank you!</h1>
        <h1 className="text-2xl font-bold text-gray-800">you have completed the {name}</h1>
        <p className="mt-4 text-gray-600">You’ll be redirected shortly...</p>

        {/* Manual Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push(link)}
          className="mt-6 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold shadow-md hover:bg-teal-700 transition"
        >
          Click here if not redirected
        </motion.button>
      </div>
    </div>
  );
}
