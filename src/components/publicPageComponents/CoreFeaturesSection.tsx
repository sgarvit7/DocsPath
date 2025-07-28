"use client";

import { useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { Afacad, Inter } from "next/font/google";
import Image from "next/image";

interface CoreFeaturesSectionProps {
  darkMode: boolean;
}

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function CoreFeaturesManual({ darkMode }: CoreFeaturesSectionProps) {
  const radius = 280;
  const centerX = 400;
  const centerY = 400;

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      icon: "/assets/prelogin-img/coreFeatures/sd.png", title: "Smart Doctor Dashboard", desc: "Everything you need, at a glance from appointments to analytics. Intuitive, customizable, and fast."
    },
    {
      icon: "/assets/prelogin-img/coreFeatures/otp.png", title: "One-Tap Appointment", desc: "Automate bookings, manage OPD queues, and reduce no-shows—without lifting a finger."
    },
    {
      icon: "/assets/prelogin-img/coreFeatures/ct.png", title: "Intelligent Communication", desc: "Handle patient queries, confirmations, reminders, and follow-ups—24/7."
    },
    {
      icon: "/assets/prelogin-img/coreFeatures/ap.png", title: "Automated Billing", desc: "Instant invoicing, claims management, and payment tracking—all without manual work."
    },
    {
      icon: "/assets/prelogin-img/coreFeatures/ep.png", title: "EHR + E-Prescriptions", desc: "Access, update, and share digital health records securely and accurately."
    },
    {
      icon: "/assets/prelogin-img/coreFeatures/ss.png", title: "Role-Based Access", desc: "Full HIPAA/GDPR compliance with customizable staff permissions."
    },
    {
      icon: "/assets/prelogin-img/coreFeatures/db.png", title: "Real-Time Dashboards", desc: "Make smarter decisions with real-time reports."
    },
    {
      icon: "/assets/prelogin-img/coreFeatures/opd.png", title: "Integrated OPD + Telemedicine", desc: "Manage in-clinic and online appointments from a single platform."
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const circleRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (isHovered || isMobile) return;

    if (containerRef.current && circleRef.current) {
      rotationRef.current += delta * 0.01;
      const currentRotation = rotationRef.current;

      containerRef.current.style.transform = `rotate(${currentRotation}deg)`;
      circleRef.current.style.transform = `rotate(${currentRotation}deg)`;

      Array.from(containerRef.current.children).forEach((child, index) => {
        const baseAngle = (index * 360) / cards.length;
        const card = child as HTMLDivElement;
        const inner = card.querySelector('.inner-card') as HTMLDivElement;

        // Position card
        card.style.transform = `translate(-50%, -50%) rotate(${baseAngle}deg) translate(${radius}px)`;

        // Keep inner content upright + handle scale on hover
        if (inner) {
          const totalAngle = currentRotation + baseAngle;
          const isCardHovered = hoveredCard === index;
          const scale = isCardHovered ? 1.12 : 1;
          inner.style.transform = `scale(${scale}) rotate(${-totalAngle-15}deg)`;
        }
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
        "min-h-screen flex items-center justify-center px-6  relative font-roboto w-full",
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      )}
    >
      {isMobile ? (
        <div
          className={clsx(
            "w-full min-h-screen px-4 py-4 flex flex-col items-center",
            darkMode && "bg-gray-900"
          )}
        >
          <h2
            className={clsx(
              "text-3xl font-bold p-2 rounded-lg text-center w-full mb-10",
              darkMode ? "text-white bg-gray-800" : "text-white bg-[#086861]",
              inter.className
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
                <Image src={card.icon} alt="icon" width={42} height={50} />
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
        <div className="relative w-[800px] mt-24 dark:bg-gray-900 h-[800px] hidden md:block">
          <div className="absolute z-60 w-90 h-90 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={clsx(
                "absolute inset-0 flex items-center justify-center text-4xl font-bold shadow-xl rounded-full font-roboto",
                darkMode ? "bg-teal-700 text-white" : "bg-[#086861] text-white",
                inter.className
              )}
            >
              <div
                ref={circleRef}
                className="absolute inset-0 rounded-full border-[2px] justify-center items-center border-white"
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
            {cards.map((card, index) => {
              const angle = (360 / cards.length) * index;
              const x = 60 * Math.cos((angle * Math.PI) / 180);
              const y = 60 * Math.sin((angle * Math.PI) / 180);
              const isCardHovered = hoveredCard === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={clsx(
                    "absolute w-72 p-4 text-center rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-500 ease-in-out",
                    darkMode ? "text-white " : "text-gray-900 bg-white"
                  )}
                  style={{
                    left: `${centerX + x}px`,
                    top: `${centerY + y}px`,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50px",
                    perspective: "1000px",
                    zIndex: isCardHovered ? 50 : 1,
                  }}
                >
                  <div
                    className={clsx(
                      "inner-card flex flex-col items-center  justify-center transition-transform duration-300 will-change-transform",
                      isCardHovered &&
                        "p-5 shadow-[0_8px_30px_rgba(0,0,0,0.7)] border rotate-[15deg] border-gray-900 rounded-3xl   ",
                         )}
                  >
                    <div className="w-20 h-20 rounded-full bg-[#086861] flex items-center justify-center">
                      <Image src={card.icon} alt="icon" width={42} height={50} />
                    </div>
                    <div>
                      <h3
                        className={clsx(
                          "text-lg font-semibold  text-teal-600 dark:text-white",
                          afacad.className
                        )}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={clsx(
                          "text-md  text-gray-600 dark:text-gray-300",
                          afacad.className
                        )}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
