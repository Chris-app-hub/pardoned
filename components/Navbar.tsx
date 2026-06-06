"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#FAF8F3]/80 backdrop-blur-sm border-b border-[#EDE8E0]/50 py-5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <span
          className={`text-xl font-medium tracking-tight transition-colors duration-500 ${
            scrolled ? "text-[#1C1C1E]" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          PaDonde
        </span>

        <a
          href="#cta"
          className="px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
          style={{
            backgroundColor: "var(--pd-turquoise)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Join waitlist
        </a>
      </div>
    </nav>
  );
}
