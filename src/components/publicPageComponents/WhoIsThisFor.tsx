"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

interface AudienceCollageProps {
  darkMode?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Animation variant                                                         */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Data describing each collage block                                        */
/* -------------------------------------------------------------------------- */
// type Card =
//   | {
//       type: "text";
//       title: string;
//       desc: string;
//       col: number;
//       row: number;
//     }
//   | {
//       type: "image";
//       src: string;
//       alt: string;
//       col: number;
//       row: number;
//     };

// const cards: Card[] = [
//   {
//     type: "text",
//     title: "Hospitals &\nSpecialty Clinics",
//     desc: "Reduce overhead, enhance team coordination, and accelerate patient care—without expanding your staff.",
//     col: 1,
//     row: 1,
//   },
//   {
//     type: "image",
//     src: "/assets/prelogin-img/home/collage-1.png",
//     alt: "Stethoscope",
//     col: 1,
//     row: 1,
//   },
//   {
//     type: "image",
//     src: "/assets/prelogin-img/home/collage-2.jpg",
//     alt: "Doctors handshake",
//     col: 2,
//     row: 1,
//   },
//   {
//     type: "image",
//     src: "/assets/prelogin-img/collage.jpg",
//     alt: "Medical clipboard",
//     col: 1,
//     row: 2,
//   },
//   {
//     type: "image",
//     src: "/assets/prelogin-img/home/collage-3.jpg",
//     alt: "Heart monitor",
//     col: 3,
//     row: 1,
//   },
//   {
//     type: "text",
//     title: "Independent Doctors &\nTelemedicine Providers",
//     desc: "Launch a fully functional AI‑enabled clinic in minutes. Automate your backend and focus on care.",
//     col: 2,
//     row: 1,
//   },
// ];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const AudienceCollage: React.FC<AudienceCollageProps> = ({
  darkMode = false,
}) => {
  // const tealBg = darkMode ? "bg-[#04645f]" : "bg-[#086861]";
  // const baseText = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <section
      className={clsx(darkMode ? "bg-[black]" : "bg-white", "py-10 px-20")}
    >
      <h2 className={clsx("text-4xl font-bold", darkMode && "text-white")}>
        Who is this for?
      </h2>
      <p className={clsx("max-w-full text-xl py-4", darkMode && "text-white")}>
        Our Platform is designed for modern healthcare teams and visionaries who
        want to grow smarter—not just bigger.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-10">
        {/* First Block */}
        <div className="h-[500px] col-span-3 grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 grid-col-2 w-full h-full flex flex-row gap-4"
          >
            <div className="flex gap-4 col-span-1 w-full h-full">
              <div className="max-w-lg h-full p-6 rounded-lg bg-teal-800 text-white shadow-md">
                <h2 className="text-xl font-bold leading-snug">
                  Hospitals &<br />
                  Specialty Clinics
                </h2>
                <p className="mt-4 text-sm leading-relaxed">
                  Reduce overhead, enhance team coordination, and accelerate
                  patient care—without expanding your staff.
                </p>
              </div>
              <div className="col-span-1 w-full h-full">
                <Image
                  src="/assets/prelogin-img/home/collage-1.png"
                  alt="Collage 1"
                  fill={false}
                  width={0}
                  height={0}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="col-span-3 w-full h-full"
          >
            <Image
              src="/assets/prelogin-img/home/collage-3.jpg"
              alt="Collage 3"
              fill={false}
              width={0}
              height={0}
              className="w-full h-4/5 object-cover rounded-lg"
            />
          </motion.div>
        </div>

        {/* Second Block */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1 lg:col-span-2 flex flex-col gap-4"
        >
          <Image
            src="/assets/prelogin-img/home/collage-2.jpg"
            alt="Collage 2"
            fill={false}
            width={0}
            height={0}
            className="w-full h-1/2 object-cover rounded-lg"
          />
          <div className="max-w-lg h-full p-6 rounded-lg bg-teal-800 text-white shadow-md">
            <h2 className="text-xl font-bold leading-snug">
              Independent Doctors &<br />
              Telemedicine Providers
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Launch a fully functional AI-enabled clinic in minutes. Automate
              your backend and focus on care.
            </p>
          </div>
        </motion.div>

        {/* Third Block */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 h-full flex items-start justify-start" // full height and align to top-left
        >
          <div className="w-full h-[500px]">
            <Image
              src="/assets/prelogin-img/home/collage-5.png"
              alt="Collage 4"
              width={500}
              height={100}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AudienceCollage;
