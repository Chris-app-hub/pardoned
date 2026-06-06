"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import WaitlistForm from "./WaitlistForm";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "lines" });
        gsap.from(split.lines, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
          },
        });
      }

      gsap.from(innerRef.current?.querySelectorAll(".cta-fade") ?? [], {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: innerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6"
      style={{ backgroundColor: "#1C1C1E" }}
      id="cta"
    >
      <div ref={innerRef} className="max-w-2xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to explore Puerto Rico{" "}
          <em style={{ color: "var(--pd-turquoise)" }}>differently?</em>
        </h2>
        <p
          className="cta-fade text-base text-white/60 mb-10"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Join the waitlist and be first to know when PaDonde launches.
        </p>
        <div className="cta-fade flex flex-col items-center gap-4">
          <WaitlistForm dark />
          <p
            className="text-xs text-white/40"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No spam. Ever.
          </p>
        </div>
      </div>
    </section>
  );
}
