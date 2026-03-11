import { useEffect, useRef, useState } from "react";
import Logo from "../assets/ardra3.png";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  // observer
  useEffect(() => {
    const homeSection = document.querySelector("#home");

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  // scroll
  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) {
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      if (timerId.current) clearTimeout(timerId.current);

      timerId.current = setTimeout(() => {
        setVisible(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible]);

  // ✅ FIX FOR REACH OUT SCROLL
  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (!el) return;

    const yOffset = -80; // navbar height
    const y =
      el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div className="h-10 flex items-center overflow-visible">
        <img
          src={Logo}
          alt="Logo"
          className="h-25 w-auto object-contain"
        />
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex items-center gap-8 text-white font-medium">
        <button onClick={() => handleScrollTo("#home")}>Home</button>
        <button onClick={() => handleScrollTo("#about")}>About</button>
        <button onClick={() => handleScrollTo("#projects")}>Projects</button>
        <button onClick={() => handleScrollTo("#contact")}>Contact</button>

        <button
          onClick={() => handleScrollTo("#contact")}
          className="bg-gradient-to-r from-[#54ACBF] via-[#26658C] to-[#023859] to-[#011C40] px-4 py-2 rounded-full"
        >
          Reach out
        </button>
      </div>

      {/* Mobile button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white text-3xl lg:hidden"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 sm:right-6 bg-black/90 backdrop-blur-md text-white px-6 py-6 rounded-xl flex flex-col gap-4 lg:hidden shadow-xl">
          <button onClick={() => handleScrollTo("#home")}>
            Home
          </button>
          <button onClick={() => handleScrollTo("#about")}>
            About
          </button>
          <button onClick={() => handleScrollTo("#projects")}>
            Projects
          </button>
          <button onClick={() => handleScrollTo("#contact")}>
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}