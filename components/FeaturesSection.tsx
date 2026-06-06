"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
        <path d="M9 4v13M15 7v13" />
      </svg>
    ),
    title: "AI Road Trips",
    description:
      "Tell it your time, budget, and vibe — it builds your perfect trip in seconds.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c2-4 5-6 10-6s8 2 10 6" />
        <path d="M2 16c2-4 5-6 10-6s8 2 10 6" />
        <path d="M2 20c2-4 5-6 10-6s8 2 10 6" />
      </svg>
    ),
    title: "Beach Intel",
    description:
      "Rain, waves, and water temp for every beach before you make the drive.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    title: "Local Spots",
    description:
      "The best food and hidden gems that match your mood, not a tourist list.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: "Creator Picks",
    description:
      "Real recommendations from Puerto Rican locals and creators, pinned to the map.",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      // Heading SplitText reveal
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "lines" });
        gsap.from(split.lines, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
          },
        });
      }

      // All four cards animate together — no stagger, no positional drift
      if (cardsRef.current) {
        gsap.from(cardsRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 78%",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#FAF8F3]" id="features">
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-6"
          style={{ color: "var(--pd-turquoise)", fontFamily: "var(--font-sans)" }}
        >
          What PaDonde Does
        </p>

        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight text-[#1C1C1E] mb-16 max-w-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Everything you need to explore Puerto Rico,{" "}
          <em>in one app.</em>
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="feature-card group p-10 rounded-2xl bg-white border border-[#EDE8E0] hover:border-[#2BBCB4]/40 hover:shadow-lg transition-all duration-300"
            >
              <span className="mb-6 block" style={{ color: "var(--pd-turquoise)" }}>{f.icon}</span>
              <h3
                className="text-2xl font-medium text-[#1C1C1E] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-[#6B6B70]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
