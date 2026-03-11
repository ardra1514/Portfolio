import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "MERN Stack Intern",
    company: "Bloombis Creatives",
    duration: "2024",
    description:
      "Worked on MERN stack projects, built responsive UI, created REST APIs, and integrated MongoDB database.",
  },
  {
    role: "Web Development Intern",
    company: "ICT Academy",
    duration: "2023",
    description:
      "Learned full stack development concepts including React, Node.js, Express, and MongoDB with hands-on projects.",
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="bg-black text-white py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold text-center mb-16"
        >
          Experience
        </motion.h2>

        <div className="relative">

          {/* vertical line */}
          <div className="absolute left-5 top-0 w-[2px] h-full bg-white/20" />

          <div className="flex flex-col gap-16">

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                viewport={{ once: true }}
                className="relative pl-14"
              >

                {/* dot */}
                <div className="absolute left-0 top-3 w-5 h-5 rounded-full bg-white shadow-[0_0_10px_white]" />

                {/* card */}
                <div className="bg-gray-900/80 backdrop-blur border border-gray-700 rounded-xl p-6 shadow-lg hover:scale-[1.03] transition duration-300">

                  <h3 className="text-xl font-semibold">
                    {exp.role}
                  </h3>

                  <p className="text-gray-400">
                    {exp.company} • {exp.duration}
                  </p>

                  <p className="text-gray-300 mt-2">
                    {exp.description}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;