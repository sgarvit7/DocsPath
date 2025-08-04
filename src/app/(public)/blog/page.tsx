"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import HeroSection from "@/components/blog/heroSection";
import BlogCard from "@/components/blog/card";

const blogData = [
  {
    title: "How Robotics is Assisting Surgeries",
    description:
      "Surgical robotics has transformed the way doctors perform procedures, offering...",
    image: "/assets/prelogin-img/blog/blog1.jpg",
    link: "/blog/blog1",
  },
  {
    title: "How Henry Meds is tackling the obesity epidemic",
    description:
      "Obesity is one of America's biggest health issues. Despite the connection...",
    image: "/assets/prelogin-img/blog/blog2.jpg",
    link: "/blog/blog4",
  },
  {
    title: "New FDA-Approved Treatments 2025",
    description:
      "What doctors need to know is the FDA has approved groundbreaking new drugs...",
    image: "/assets/prelogin-img/blog/blog3.jpg",
    link: "/blog/blog3",
  },
  {
    title: "Burnout in Healthcare",
    description:
      "Doctors are known for their dedication to saving lives, but what happens when their own well-being is at risk...",
    image: "/assets/prelogin-img/blog/blog4.jpg",
    link: "/blog/blog2",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
        <Bell className="w-6 h-6" />
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
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
            className={`absolute top-[-2px]  w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200 ${
              darkMode ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
<div className="pt-16 lg:pt-0">
      <HeroSection />
</div>
      <section className="px-4 md:px-12 py-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogData.map((post, i) => (
          <BlogCard key={i} {...post} />
        ))}
      </section>
    </main>
  );
}
