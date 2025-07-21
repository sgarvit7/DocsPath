"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

interface AudienceCollageProps {
  darkMode?: boolean;
}

const AudienceCollage: React.FC<AudienceCollageProps> = ({
  darkMode = false,
}) => {
  return (
    <section
      className={clsx(
        darkMode ? "bg-gray-900" : "bg-white",
        "py-10 px-6 md:px-10 lg:px-20"
      )}
    >
      <h2
        className={clsx(
          "text-3xl md:text-4xl font-extrabold",
          darkMode && "text-white",
          inter.className
        )}
      >
        Who is this for?
      </h2>
      <p
        className={clsx(
          "max-w-full text-md md:text-xl py-4",
          darkMode && "text-white",
          inter.className
        )}
      >
        Our Platform is designed for modern healthcare teams and visionaries who
        want to grow smarter—not just bigger.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-10">
        {/* First Block */}
        <div className="h-auto md:h-[500px] col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 w-full h-full flex flex-col sm:flex-row gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full h-full">
              <div className="w-full sm:w-1/2 h-full p-6 rounded-lg bg-teal-800 text-white shadow-md">
                <h2
                  className={clsx(
                    "text-xl font-extrabold leading-snug",
                    inter.className
                  )}
                >
                  Hospitals &<br />
                  Specialty Clinics
                </h2>
                <p
                  className={clsx(
                    "mt-4 text-sm leading-relaxed",
                    inter.className
                  )}
                >
                  Reduce overhead, enhance team coordination, and accelerate
                  patient care—without expanding your staff.
                </p>
              </div>
              <div className="w-full sm:w-1/2 h-[200px] sm:h-full">
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
            className="col-span-2 md:col-span-3 w-full lg:h-[285px] md:h-full"
          >
            <Image
              src="/assets/prelogin-img/home/collage-3.jpg"
              alt="Collage 3"
              fill={false}
              width={0}
              height={0}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        </div>

        {/* Second Block */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 flex flex-col h-full"
        >
          <div className="flex flex-col h-full">
            <div className="w-full h-1/2">
              <Image
                src="/assets/prelogin-img/home/collage-2.jpg"
                alt="Collage 2"
                fill={false}
                width={0}
                height={0}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-full mt-3 h-1/2 p-6 rounded-lg bg-teal-800 text-white shadow-md">
              <h2
                className={clsx(
                  "text-xl font-extrabold leading-snug",
                  inter.className
                )}
              >
                Independent Doctors &<br />
                Telemedicine Providers
              </h2>
              <p
                className={clsx(
                  "mt-3 text-md leading-relaxed",
                  inter.className
                )}
              >
                Launch a fully functional AI-enabled clinic in minutes. Automate
                your backend and focus on care.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Third Block */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 w-full h-[300px] md:h-[500px] flex items-start justify-start"
        >
          <div className="w-full h-full">
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
