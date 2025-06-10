// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import AboutHero from "@/components/publicPageComponents/aboutPageComponents/AboutHero";
import MissionVision from "@/components/publicPageComponents/aboutPageComponents/MissionVision";
import LeadershipTeam from "@/components/publicPageComponents/aboutPageComponents/LeadershipTeam";
import Awards from "@/components/publicPageComponents/aboutPageComponents/Awards";
import Partnership from "@/components/publicPageComponents/aboutPageComponents/Partnership";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <AboutHero />
      <MissionVision />
      <LeadershipTeam />
      <Awards />
      <Partnership />
    </motion.div>
  );
}