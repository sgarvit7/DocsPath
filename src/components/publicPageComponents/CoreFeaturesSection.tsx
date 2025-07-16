"use client";

import { useAnimationFrame } from "framer-motion";
import {
  Calendar,
  Bot,
  FileText,
  File,
  Lock,
  ClipboardList,
  Sun,
  Users,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

interface CoreFeaturesSectionProps {
  darkMode: boolean;
}

export default function CoreFeaturesManual({ darkMode }: CoreFeaturesSectionProps) {
  const radius = 280;
  const centerX = 400;
  const centerY = 400;

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      icon: <Sun className="w-10 h-10 text-white" />, title: "Smart Doctor Dashboard", desc: "Everything you need, at a glance from appointments to analytics. Intuitive, customizable, and fast."
    },
    {
      icon: <Calendar className="w-10 h-10 text-white" />, title: "One-Tap Appointment", desc: "Automate bookings, manage OPD queues, and reduce no-shows—without lifting a finger."
    },
    {
      icon: <Bot className="w-10 h-10 text-white" />, title: "Intelligent Communication", desc: "Handle patient queries, confirmations, reminders, and follow-ups—24/7."
    },
    {
      icon: <FileText className="w-10 h-10 text-white" />, title: "Automated Billing", desc: "Instant invoicing, claims management, and payment tracking—all without manual work."
    },
    {
      icon: <File className="w-10 h-10 text-white" />, title: "EHR + E-Prescriptions", desc: "Access, update, and share digital health records securely and accurately."
    },
    {
      icon: <Lock className="w-10 h-10 text-white" />, title: "Role-Based Access", desc: "Full HIPAA/GDPR compliance with customizable staff permissions."
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-white" />, title: "Real-Time Dashboards", desc: "Make smarter decisions with real-time reports."
    },
    {
      icon: <Users className="w-10 h-10 text-white" />, title: "Integrated OPD + Telemedicine", desc: "Manage in-clinic and online appointments from a single platform."
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const circleRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (isHovered || isMobile) return;

    if (containerRef.current && circleRef.current) {
      rotationRef.current += delta * 0.01;
      containerRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      circleRef.current.style.transform = `rotate(${rotationRef.current}deg)`;

      Array.from(containerRef.current.children).forEach((child, index) => {
        const baseAngle = (index * 360) / cards.length;
        const card = child as HTMLDivElement;
        const inner = card.querySelector('.inner-card') as HTMLDivElement;

        const rotation = hoveredCard === index ? 0 : rotationRef.current;
        card.style.transform = `translate(-50%, -50%) rotate(${baseAngle}deg) translate(${radius}px) rotate(-${rotation + baseAngle}deg)`;
        if (inner) inner.style.transform = `rotate(${hoveredCard === index ? -(rotation + baseAngle) : 0}deg)`;
      });
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center px-6 py-20 relative font-roboto w-full",
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      )}
    >
{isMobile ? (
  <div
    className={clsx(
      "w-full min-h-screen px-4 py-10 flex flex-col items-center ",
      darkMode && "bg-black"
    )}
  >
    <h2
      className={clsx(
        "text-3xl font-bold text-center mb-10",
        darkMode ? "text-white" : "text-teal-700"
      )}
    >
      Core Features
    </h2>

    {cards.map((card, index) => (
      <div
        key={index}
        className={clsx(
          "w-full max-w-md p-6 mb-6 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105",
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        )}
      >
        <div className="w-16 h-16 mb-4 mx-auto rounded-full bg-teal-700 flex items-center justify-center">
          {card.icon}
        </div>
        <h3
          className={clsx(
            "text-xl font-semibold font-[afacad] mb-2",
            darkMode ? "text-white" : "text-teal-600"
          )}
        >
          {card.title}
        </h3>
        <p
          className={clsx(
            "text-sm font-[afacad] text-center",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}
        >
          {card.desc}
        </p>
      </div>
    ))}
  </div>
) : (

        <div className="relative w-[800px] h-[800px] hidden md:block">
          <div className="absolute  w-60 h-62 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={clsx(
                "absolute inset-0 flex items-center justify-center text-3xl font-bold shadow-xl rounded-full font-roboto",
                darkMode ? "bg-teal-700 text-white" : "bg-teal-700 text-white"
              )}
            >
              <div
                ref={circleRef}
                className="absolute inset-0 rounded-full border-[5px] border-dotted  border-white"
                style={{ animation: "spin 50s linear infinite" }}
              />
              Core Features
            </div>
          </div>

          <div
            className="absolute w-full h-full left-0 top-0"
            ref={containerRef}
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoveredCard(null);
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={clsx(
                  "absolute w-72 p-4 text-center rounded-xl flex flex-col items-center justify-center gap-2 dark:hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:overflow-hidden",
                  darkMode ? " text-white" : "text-gray-900"

                )}
                style={{
                  left: centerX,
                  top: centerY,
                  borderRadius: "50px",
                  perspective: "1000px",
                  zIndex: hoveredCard === index ? 999 : 1
                }}
              >
                <div className="inner-card flex flex-col items-center justify-center transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-teal-700 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-[afacad] font-semibold text-end text-teal-600 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-md text-end font-[afacad] text-gray-600 dark:text-gray-300">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
