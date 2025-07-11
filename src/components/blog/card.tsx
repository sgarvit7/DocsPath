"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function BlogCard({
  title,
  description,
  image,
  link,
}: BlogCardProps) {
  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl  shadow-md p-6 pt-5 flex flex-col justify-between"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="flex   ">
        {/* Blog Badge */}
        <div className="absolute top-4 left-4 bg-teal-700 text-white w-11 h-11 text-sm font-medium rounded-full shadow-sm flex items-center justify-center">
          Blog
        </div>

        {/* Subheading */}
        <p className=" text-sm ml-13 font-bold text-[black] dark:text-teal-300 mb-2">
          Our news specially for Medical Professionals
        </p>
      </div>
      {/* Image */}
      <div className="w-full h-40 relative rounded-lg overflow-hidden mb-3 mt-3">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg mb-2 text-gray-900 mt-2 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-4">
        {description}
      </p>

      {/* CTA */}
      <Link href={link} passHref>
        <button className="mt-2 mb-2 lg:ml-45 bg-teal-800 hover:bg-teal-700 text-white text-sm cursor-pointer px-4 py-2 rounded-3xl self-start">
          Read more
        </button>
      </Link>
    </motion.div>
  );
}
