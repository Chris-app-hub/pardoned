"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const signRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      if (quoteRef.current) {
        const split = new SplitText(quoteRef.current, { type: "lines" });
        gsap.from(split.lines, {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
          },
        });
      }

      gsap.from(signRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: signRef.current,
          start: "top 88%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-white" id="founder">
      <div className="max-w-4xl mx-auto">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-12"
          style={{ color: "var(--pd-turquoise)", fontFamily: "var(--font-sans)" }}
        >
          Built in Puerto Rico
        </p>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="flex-shrink-0">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-medium text-white"
              style={{
                background: "linear-gradient(135deg, #2BBCB4 0%, #1A7A74 100%)",
                fontFamily: "var(--font-display)",
              }}
            >
              PD
            </div>
          </div>

          <div className="flex-1">
            <p
              ref={quoteRef}
              className="text-2xl md:text-3xl font-light leading-[1.5] text-[#1C1C1E] mb-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;I&apos;m 17 and I&apos;ve lived in Puerto Rico my whole life. I got
              tired of people wasting hours figuring out where to go and missing
              the best spots. So I&apos;m building{" "}
              <span style={{ color: "var(--pd-turquoise)" }}>PaDonde</span> — a
              real island guide, made by someone who actually knows it.&rdquo;
            </p>

            <div ref={signRef}>
              <p
                className="text-sm font-medium text-[#1C1C1E]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Founder, PaDonde
              </p>
              <p
                className="text-sm text-[#6B6B70] mt-1"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Guaynabo, Puerto Rico
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
