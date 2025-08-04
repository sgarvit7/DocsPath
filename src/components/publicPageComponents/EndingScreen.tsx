"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react"; // you can swap with any icon
import Image from "next/image";

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
    <div className="flex items-center justify-center h-screen bg-teal-50">
      <Image
              src="/assets/bg-pattern.png"
              alt=""
              width={500}
              height={350}
              className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180"
            />
            <Image
              src="/assets/lower-bg-pattern.png"
              alt=""
              width={500}
              height={350}
              className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-50"
            />
      <div className="text-center p-8  rounded-2xl  max-w-md">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="flex justify-center mb-6"
        >
          <ThumbsUp className="w-20 h-20 text-teal-900" />
        </motion.div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-[black]">Thank you!</h1>
        <h1 className="text-2xl font-bold text-[black]">you have completed the {name}</h1>
        <p className="mt-4 text-[black]">You’ll be redirected shortly...</p>

        {/* Manual Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push(link)}
          className="mt-6 px-6 py-3 rounded-xl bg-teal-700 text-white font-semibold shadow-md hover:bg-teal-700 transition"
        >
          Click here if not redirected
        </motion.button>
      </div>
    </div>
  );
}
