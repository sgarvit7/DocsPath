"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import clsx from "clsx";
import { Afacad } from "next/font/google";
import {
  Building2,
  FileText,
  UserPlus,
} from "lucide-react"; 
import { Inter } from "next/font/google";
import { Geist } from "next/font/google";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","900"],
});
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","900"],
});
interface HomeHeroProps {
  darkMode?: boolean;
}

const textFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const HomeHero: React.FC<HomeHeroProps> = ({ darkMode = false }) => {
  const bgMain = darkMode ? "bg-gray-900" : "bg-white";
  const textPrimary = darkMode ? "text-teal-400" : "text-[#086861]";
  const textHeading = darkMode ? "text-white" : "text-gray-900";
  const textBody = darkMode ? "text-gray-300" : "text-[#086861]";
  const cardBg = darkMode ? "bg-gray-600" : "bg-white";

  return (
    <section
      className={clsx(
        "relative overflow-hidden border-b-20 border-b-[#086861]",
        afacad.className
      )}
    >
      {/* Background Color */}
      <div className={clsx("absolute inset-0 z-0", bgMain)} />

      {/* Background Image */}
      <div
        className={clsx(
          "absolute inset-0 z-10 bg-no-repeat bg-contain bg-top",
          darkMode
            ? 'bg-[url("/assets/prelogin-img/home/dark-pattern-1.png")]'
            : 'bg-[url("/assets/prelogin-img/home/hero-section-pattern.png")]'
        )}
      />
      {/* <div
        className={clsx(
          "absolute inset-0 z-10",
          darkMode
            ? "bg-gray-800"
            : 'bg-[url("/assets/prelogin-img/home/hero-section-pattern.png")] bg-no-repeat bg-contain bg-top'
        )}
      /> */}


      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 lg:pt-13">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:items-center">
          {/* Left Column */}
          <div className="space-y-8 md:col-span-1 lg:col-span-2">
            <motion.h1
              variants={textFade}
              initial="hidden"
              animate="visible"
              custom={0}
              className={clsx(
                textHeading,
                "text-4xl sm:text-6xl lg:text-6xl font-extrabold leading-tight",inter.className
              )}
            >
              Transform Your Practice
              <br />
              <span className={clsx(textPrimary, "font-black inline-block",inter.className)}>
                Effortlessly
              </span>
            </motion.h1>

            <motion.p
              variants={textFade}
              initial="hidden"
              animate="visible"
              custom={1}
              className={clsx(textHeading, "max-w-xl text-base sm:text-xl")}
            >
             <p className="text-2xl mb-10"> Welcome to <span className={clsx(textPrimary,"font-bold")}>DocsPath</span> ... </p> a
              smarter way to run your clinic. From automated scheduling to
              intelligent patient communication and real‑time analytics,
              everything you need is unified in one powerful platform.
            </motion.p>
 
            <motion.ul
              variants={textFade}
              initial="hidden"
              animate="visible"
              custom={2}
              className="flex flex-wrap   gap-y-1 text-sm sm:text-base font-medium"
            >
              
              {[
                "Streamline Appointments",
                "Simplify Billing",
                "Digitize Records",
                
              ].map((tag) => (
               
                <li
                  key={tag}
                  className={clsx(
                    "underline-offset-4 hover:underline px-2",
                    textPrimary,
                    darkMode ? "border-r-1 border-r-white" : "border-r-1 border-r-black"
                  )}
                >
                  {tag}
                   </li>
                   ) )}
                  <span  className={clsx(
                    "underline-offset-4 hover:underline px-2",
                    textPrimary,
                    
                  )}>Deliver SmartCare </span>
               
                
             
            </motion.ul>

            <motion.p
              variants={textFade}
              initial="hidden"
              animate="visible"
              custom={3}
              className={clsx(
                textHeading,
                "text-base sm:text-lg md:text-xl lg:text-xl"
              )}
            >
              Built for doctors. Trusted by thousands. Ready for you.
            </motion.p>

            <motion.div
              variants={textFade}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap lg:-ml-20 lg:mt-23 gap-4"
            >
              <button className={clsx("rounded-full bg-[#086861] px-6 py-3 cursor-pointer lg:text-xl lg:w-1/3  sm:text-base font-bold text-white shadow hover:bg-teal-700 focus:outline-none  focus:ring-teal-300",inter.className)}>
                Start Free Trial
              </button>
              <button
                className={clsx(
                  "rounded-full border-2  px-6 py-3 lg:text-xl lg:w-1/3 sm:text-base cursor-pointer font-bold",
                  darkMode
                    ? "border-gray-700    text-gray-100 hover:bg-gray-700"
                    : "border-[#086861] text-gray-700 hover:bg-gray-100"
                    , geist.className
                )}
              >
                Request a Demo
              </button>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            variants={textFade}
            initial="hidden"
            animate="visible"
            custom={5}
            className="relative col-span-1"
          >
            {/* <div
              aria-hidden
              className={clsx(
                "absolute -right-10 -top-12 h-96 w-96 rounded-full",
                darkMode && "!bg-teal-500/20"
              )}
            /> */}
            <Image
              src="/assets/prelogin-img/home/hero-doctor.png"
              alt="Doctor using DocsPath"
              width={500}
              height={560}
              priority
              className="relative z-10 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
            />
          </motion.div>
        </div>
      </div>

      {/* Why DocsPath */}
      <div className="mt-10 relative z-10">
        <div className="relative py-4 ">
          <h2 className="max-w-2xl bg-[#086861] rounded-br-2xl rounded-tr-2xl px-20 py-8 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white sm:px-6 lg:px-8">
            <div className={clsx("text-center",inter.className)}>Why Docspath?</div>
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/assets/prelogin-img/home/doctor-group.png"
              alt="Team of doctors"
              width={800}
              height={600}
              className="mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <p
              className={clsx(
                textBody,
                "lg:text-xl sm:text-lg font-semibold leading-relaxed"
              )}
            >
              Managing a clinic shouldn&rsquo;t feel like a second job. DocsPath
              gives you a powerful command center to control every part of your
              practice 
              <p>from the front desk to follow‑ups—
              <span className="font-semibold"> with zero hassle</span>.
            </p>
            </p>

{[
  {
    text: "Built for busy clinics and hospitals",
    icon: <Building2 className="shrink-0 text-teal-600" size={22} />,
  },
  {
    text: "Designed to reduce paperwork, errors, and burnout",
    icon: <FileText className="shrink-0 text-teal-600" size={22} />,
  },
  {
    text: "Empowers you to spend more time on patients, not admin",
    icon: <UserPlus className="shrink-0 text-teal-600" size={22} />,
  },
].map(({ text, icon }) => (
  <div
    key={text}
    className={clsx(
      cardBg,
      "flex items-center gap-3 rounded-2xl px-6 py-4 shadow-lg"
    )}
  >
    
    {icon}
    
    <span
      className={clsx(
        textHeading,
        "text-sm sm:text-lg lg:text-xl font-medium"
      )}
    >
      {text}
    </span>
  </div>
))}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
