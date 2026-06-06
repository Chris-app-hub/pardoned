import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "PaDonde — Puerto Rico's First AI Travel App",
  description:
    "Tell PaDonde your vibe, time, and budget — it builds your perfect Puerto Rico trip in seconds. Join the waitlist.",
  openGraph: {
    title: "PaDonde — Puerto Rico's First AI Travel App",
    description: "The island guide, made by someone who actually knows it.",
    siteName: "PaDonde",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} antialiased`}
    >
      <body className="bg-[#FAF8F3] text-[#1C1C1E]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
