"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

    // Drive Lenis via GSAP ticker so they share the same animation frame
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Keep both signal paths: direct update in ticker + Lenis scroll event bridge
    lenis.on("scroll", () => ScrollTrigger.update());

    // Recalculate trigger positions once Lenis and DOM are ready
    ScrollTrigger.refresh();

    // Recalculate after web fonts load — display fonts can shift layout and invalidate trigger positions
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
