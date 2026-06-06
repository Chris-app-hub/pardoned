"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import WaitlistForm from "./WaitlistForm";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const headline = headlineRef.current;
      const subline = sublineRef.current;
      if (!headline || !subline) return;

      // Set initial states so elements are hidden before their entrance
      gsap.set(headline, { opacity: 0 });
      gsap.set(ctaRef.current, { opacity: 0, y: 24 });
      gsap.set(pillRef.current, { opacity: 0, y: -16 });

      // Pill entrance
      gsap.to(pillRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });

      // Main headline timeline
      const tl = gsap.timeline({ delay: 0.6 });

      // Fade in the headline, then scramble-reveal the text
      tl.to(headline, { opacity: 1, duration: 0.1 }).to(headline, {
        duration: 1.4,
        // @ts-ignore – scrambleText is added to TweenVars by ScrambleTextPlugin
        scrambleText: {
          text: "¿Pa' dónde vamos?",
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz¿?!",
          revealDelay: 0.3,
          speed: 0.5,
        },
        ease: "none",
      });

      // SplitText stagger on sub-line
      const split = new SplitText(subline, { type: "words,chars" });
      gsap.set(split.chars, { opacity: 0, y: 20 });

      tl.to(
        split.chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "power3.out",
        },
        "-=0.4"
      ).to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.2"
      );

      // Subtle parallax on overlay as you scroll out of hero
      gsap.to(overlayRef.current, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background video — drop hero.mp4 + hero.webm into /public/video/ */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        aria-hidden="true"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient background — visible on mobile + on desktop until video loads */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0E3D57 0%, #1A7A74 40%, #1E8A7E 70%, #C45E3A 100%)",
        }}
      />

      {/* Soft overlay keeping text readable over the video */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.52) 100%)",
        }}
      />

      {/* Hero content — nudged slightly above center for visual balance */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto -mt-16">
        {/* Status pill */}
        <div
          ref={pillRef}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--pd-turquoise)" }}
          />
          <span
            className="text-xs tracking-widest uppercase text-white/80"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Now building · Puerto Rico
          </span>
        </div>

        {/* Headline — ScrambleText fills this via GSAP */}
        <h1
          ref={headlineRef}
          className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ¿Pa&apos; dónde vamos?
        </h1>

        {/* Sub-line — SplitText char stagger */}
        <p
          ref={sublineRef}
          className="text-2xl md:text-3xl font-light text-white/90 mb-10 italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let the island answer.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col items-center gap-4">
          <WaitlistForm dark />
          <p
            className="text-xs text-white/50 tracking-wide"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Free to join. Be first when we launch.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span
          className="text-xs text-white tracking-widest uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Scroll
        </span>
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
}
