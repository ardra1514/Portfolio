import React, { useEffect, useRef, useState, useMemo } from "react";
import serenoph from "../assets/serenoph.png";
import sereno1 from "../assets/sereno1.png";
import livechatph from "../assets/livechatph.png"
import livechat from "../assets/livechat.png"

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const useIsMobile = (query = "(max-width:639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);

    const handler = (e) => {
      setIsMobile(e.matches);
    };

    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "Live Chat",
        link: "https://chat-applications-front.onrender.com",
        bgColor: "#436775",
        image: isMobile ? livechatph : livechat,
      },


      {
        title: "Sereno Care",
        link: "https://serenocare-front-end.onrender.com",
        bgColor: "#740707",
        image: isMobile ? serenoph : sereno1,
      },

    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sceneRef}
      id="projects"
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject?.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2
          className={`text-3xl font-semibold flex flex-col items-center ${isMobile ? "mt-4" : "mt-8"
            }`}
        >
          My Work
        </h2>

        <div
          className={`relative w-full flex flex-1 items-center justify-center ${isMobile ? "-mt-4" : ""
            }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
                }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${isMobile ? "-mt-24" : ""
                      }`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${isMobile
                    ? "mb-6 rounded-lg"
                    : "mb-10 sm:mb-12 rounded-xl"
                  } h-[62vh] sm:h-[66vh]`}
                style={{
                  zIndex: 10,
                  transition: "box-shadow 250ms ease",
                }}
              >
                <img
                  src={project.image}
                  className="w-full h-full object-cover object-center"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease"
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        <div className={`absolute ${isMobile ? "bottom-20 " : "bottom-10"}`}>
          <a href={activeProject?.link}
            target="_blank">View project</a>

        </div>
      </div>
    </section>
  );
};

export default Projects;