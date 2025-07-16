// components/about/LeadershipTeam.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface LeadershipProps {
  darkMode?: boolean;
  id?: string;
}

export default function LeadershipTeam({ darkMode = false, id }: LeadershipProps) {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "CEO Name",
      role: "Chief Executive Officer",
      description:
        "Lorem ipsum dolor amet with local magnet dolar amet lorem adipiscing lorem. adipiscing cum lorem ipsum delor amet cum magnet adipiscing lorem",
      image: "/assets/prelogin-img/about/leader1.jpeg",
    },
    {
      id: 2,
      name: "CTO Name",
      role: "Chief Technology Officer",
      description:
        "Lorem ipsum dolor amet with local magnet dolar amet lorem adipiscing dolar amet lorem adipiscing lorem",
      image: "/assets/prelogin-img/about/leader2.jpg",
    },
    {
      id: 3,
      name: "CMO Name",
      role: "Chief Marketing Officer",
      description:
        "Lorem ipsum dolor amet with local magnet dolar amet lorem adipiscing lorem. adipiscing cum lorem ipsum delor amet cum",
      image: "/assets/prelogin-img/about/leader3.jpg",
    },
    {
      id: 4,
      name: "HR Name",
      role: "Human Resources",
      description:
        "Lorem ipsum dolor amet with local magnet dolar amet lorem adipiscing cum lorem ipsum",
      image: "/assets/prelogin-img/about/leader4.jpg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id={id}
      className={`py-16 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            className={`text-3xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Leadership Team
          </h2>
          <p
            className={`text-lg leading-relaxed max-w-4xl ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Meet the minds shaping the future of digital healthcare—a team of
            healthcare professionals, AI engineers, and innovation leaders
            dedicated to building intelligent systems that work for both
            doctors and patients.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`group relative rounded-xl shadow-lg overflow-hidden border-2 border-[#086861] transition-all duration-300 ${
                darkMode
                  ? "bg-gray-700 hover:shadow-2xl"
                  : "bg-white hover:shadow-2xl"
              }`}
            >
              {/* Background Image or Placeholder */}
              <div className="relative w-auto h-72 sm:h-80 md:h-72 lg:h-70">
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    darkMode ? "bg-gray-300" : "bg-gray-200"
                  }`}
                >
                  <Image
                  src= {member.image}
                  alt = "image"
                  fill
                    
                  />
                </div>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black/40 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-gray-200 text-sm leading-snug">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
