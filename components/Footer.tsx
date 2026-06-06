export default function Footer() {
  return (
    <footer
      className="px-6 py-10 border-t"
      style={{
        backgroundColor: "#1C1C1E",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span
          className="text-lg font-medium text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          PaDonde
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/padonde.pr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com/@PaDondePR"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            TikTok
          </a>
          <a
            href="mailto:christian@padonde.co"
            className="text-sm text-white/50 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Contact
          </a>
        </div>

        <p
          className="text-xs text-white/30"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          © 2025 PaDonde · Made in Puerto Rico
        </p>
      </div>
    </footer>
  );
}
