"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger, SplitText);

const faqs = [
  {
    q: "When does it launch?",
    a: "We're building now. Everyone on the waitlist gets early access before we open to the public.",
  },
  {
    q: "Is it free?",
    a: "The core app is free. Some advanced features will have an optional subscription — but waitlist members get priority access to everything.",
  },
  {
    q: "Is it only for tourists?",
    a: "Not at all. Locals use it too — for weekend plans, staycations, and discovering places they've never been.",
  },
  {
    q: "Does it work in Spanish?",
    a: "Yes — PaDonde is fully bilingual. Use it in English or Spanish, whichever feels natural to you.",
  },
  {
    q: "How does the beach feature work?",
    a: "Tap any beach to see hourly rain forecast, wave conditions, water temperature, and the best time to go that day.",
  },
  {
    q: "Can local businesses be listed?",
    a: "Yes. If you own a restaurant, tour operation, or local spot in Puerto Rico, reach out — we'd love to feature you when we launch.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

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
          y: 36,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
          },
        });
      }

      gsap.from(accordionRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: accordionRef.current,
          start: "top 82%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-white" id="faq">
      <div className="max-w-3xl mx-auto">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-6"
          style={{ color: "var(--pd-turquoise)", fontFamily: "var(--font-sans)" }}
        >
          Questions
        </p>

        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight text-[#1C1C1E] mb-16"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Everything you want to know.
        </h2>

        <div ref={accordionRef}>
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={i}
                className={`border border-[#EDE8E0] rounded-xl px-6 data-[panel-open]:border-[#2BBCB4]/50 transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-[#F8F5F0]"
                }`}
              >
                <AccordionTrigger
                  className="text-left text-base font-medium text-[#1C1C1E] py-5 hover:no-underline"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm leading-relaxed text-[#6B6B70] pb-5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
