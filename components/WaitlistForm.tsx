"use client";

import { useState } from "react";

interface WaitlistFormProps {
  dark?: boolean;
}

export default function WaitlistForm({ dark = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-2">
        <p
          className={`text-base font-medium ${dark ? "text-white" : "text-[#1C1C1E]"}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          You&apos;re on the list.{" "}
          <span style={{ color: "var(--pd-turquoise)" }}>We&apos;ll be in touch.</span>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className={`flex-1 px-4 py-3 rounded-full text-sm outline-none border transition-all ${
          dark
            ? "bg-white/10 border-white/40 text-white placeholder:text-white/50 focus:border-white/70 focus:bg-white/15"
            : "bg-white border-[#D8D2C8] text-[#1C1C1E] placeholder:text-[#9B9B9B] focus:border-[#2BBCB4]"
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-full text-sm font-medium text-white cursor-pointer transition-all hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
        style={{
          backgroundColor: "var(--pd-turquoise)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {status === "loading" ? "Joining…" : "Join the waitlist"}
      </button>
    </form>
  );
}
