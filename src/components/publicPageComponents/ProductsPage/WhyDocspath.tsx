'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import {
  BarChart2,
  Plug,
  Handshake,
  ShieldCheck,
  HeartHandshake,
  ThumbsUp,
} from 'lucide-react'; // any icon lib is fine

/* ─────────────── Types ─────────────── */

interface WhyDocsPathProps {
  /** Toggle dark theme */
  darkMode?: boolean;
}

/* ─────────────── Motion Variants ─────────────── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

/* ─────────────── Card Data ─────────────── */

const cards = [
  {
    id: 1,
    icon: <BarChart2 className="w-6 h-6 shrink-0" />,
    title: 'Real‑Time Analytics &\nSmart Dashboards',
    text:
      'Track performance, identify trends, and make data‑backed decisions—' +
      'all from a clean, intuitive interface.',
  },
  {
    id: 2,
    icon: <Plug className="w-6 h-6 shrink-0" />,
    title: 'Lightning‑Fast Setup &\nSeamless Integration',
    text:
      'Onboard in days, not months. Connect with your existing tools and ' +
      'infrastructure without disruption.',
  },
  {
    id: 3,
    icon: <Handshake className="w-6 h-6 shrink-0" />,
    title: 'Built to Scale with You',
    text:
      'From startups to superspecialties, our platform evolves with your ' +
      'growth—no need to change systems.',
  },
  {
    id: 4,
    icon: <ShieldCheck className="w-6 h-6 shrink-0" />,
    title: 'Uncompromising Security & Privacy',
    text:
      'HIPAA & GDPR compliant. Role‑based access, bank‑grade encryption, ' +
      'and total control over data sharing.',
  },
  {
    id: 5,
    icon: <ThumbsUp className="w-6 h-6 shrink-0" />,
    title: 'Customizable. Reliable.\nAlways On.',
    text:
      '99.9% uptime. Flexible modules tailored to your exact needs. ' +
      'Premium support, 24/7.',
  },
  {
    id: 6,
    icon: <HeartHandshake className="w-6 h-6 shrink-0" />,
    title: 'Customer‑Centric Support',
    text:
      'Dedicated success managers, onboarding specialists, and in‑app ' +
      'guides keep your team moving fast.',
  },
];

/* ─────────────── Component ─────────────── */

export const WhyDocsPath: FC<WhyDocsPathProps> = ({ darkMode = false }) => {
  const cardBg     = darkMode ? 'bg-slate-800' : 'bg-white';
  const cardBorder = darkMode ? 'border-slate-600' : 'border-teal-600/60';
  const cardTitle  = darkMode ? 'text-white' : 'text-teal-900';
  const cardText   = darkMode ? 'text-slate-300' : 'text-slate-700';

  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl md:text-4xl bg-[#086861] w-full py-6 font-bold text-white mb-12">
        Why DocsPath?
      </h2>

      {/* ── Grid wrapper ─────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
      >
        {/* Doctor image (absolute on md+) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pointer-events-none md:absolute md:inset-0 md:z-10 md:flex md:items-center md:justify-center"
        >
          <Image
            src="/assets/prelogin-img/doctor.png"
            alt="Doctor giving thumbs up"
            width={400}
            height={450}
            className="md:w-72 md:h-auto object-contain select-none"
            priority
          />
        </motion.div>

        {/* Cards */}
        {cards.map(({ id, icon, title, text }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className={`relative z-20 flex items-start gap-3 rounded-xl border ${cardBg} ${cardBorder} p-6 shadow-sm`}
          >
            {/* icon */}
            <div className={darkMode ? 'text-teal-400' : 'text-teal-600'}>
              {icon}
            </div>

            {/* copy */}
            <div className="text-left whitespace-pre-wrap">
              <h3 className={`font-semibold leading-snug ${cardTitle}`}>
                {title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${cardText}`}>
                {text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyDocsPath;
