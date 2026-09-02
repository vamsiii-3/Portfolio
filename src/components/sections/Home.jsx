import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Reveal } from "../Reveal";
import { BG, BG_ALT, INK, LINE, MUTED, ORANGE, ORANGE_LIGHT } from "../../theme";

function Timecode() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((current) => current + 1), 42);
    return () => clearInterval(id);
  }, []);

  const ff = frame % 24;
  const ss = Math.floor(frame / 24) % 60;
  const mm = Math.floor(frame / 24 / 60) % 60;
  const hh = Math.floor(frame / 24 / 60 / 60);
  const pad = (value) => String(value).padStart(2, "0");

  return (
    <span className="font-mono text-xs" style={{ color: ORANGE_LIGHT, letterSpacing: "0.1em" }}>
      {pad(hh)}:{pad(mm)}:{pad(ss)}:{pad(ff)}
    </span>
  );
}

function EqBars() {
  return (
    <div className="flex items-end gap-1 h-10 w-full opacity-60">
      {Array.from({ length: 48 }).map((_, index) => (
        <span
          key={index}
          className="flex-1 rounded-sm"
          style={{
            background: `linear-gradient(180deg, ${ORANGE}, transparent)`,
            animation: `eqbar 1.4s ease-in-out ${(index % 12) * 0.09}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home({ scrollTo }) {
  const words = ["I", "EDIT", "STORIES", "THAT", "MOVE"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${BG} 0%, ${BG_ALT} 52%, ${BG} 100%)`,
        scrollMarginTop: "0px",
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          background: `radial-gradient(circle, rgba(17,17,17,0.08) 0%, transparent 65%)`,
          filter: "blur(10px)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 pt-32 pb-20">
        <Reveal delay={0}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{ border: `1px solid ${LINE}`, background: "rgba(17,17,17,0.02)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: ORANGE, animation: "pulseDot 1.8s ease-in-out infinite" }}
            />
            <span className="text-xs tracking-widest uppercase" style={{ color: MUTED }}>
              Now Editing
            </span>
            <Timecode />
          </div>
        </Reveal>

        <h1
          className="font-bold leading-[0.9] text-black select-none"
          style={{
            fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontSize: "clamp(3rem, 11vw, 9rem)",
            letterSpacing: "0.01em",
          }}
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="inline-block mr-4 md:mr-6"
              style={{
                opacity: 0,
                animation: `riseIn 0.9s cubic-bezier(.16,.84,.44,1) ${0.15 + index * 0.09}s forwards`,
                color: word === "MOVE" ? ORANGE : "#111111",
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        <Reveal delay={0.6}>
          <p className="mt-8 text-base md:text-lg max-w-xl" style={{ color: MUTED }}>
            Video Editor <span style={{ color: ORANGE }}>•</span> Motion Graphics{" "}
            <span style={{ color: ORANGE }}>•</span> Visual Storytelling
          </p>
        </Reveal>

        <Reveal delay={0.75}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("work")}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: ORANGE, color: INK }}
            >
              View My Work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-colors duration-300"
              style={{ border: `1px solid ${LINE}`, color: "#111111" }}
            >
              Let&apos;s Work Together
            </button>
          </div>
        </Reveal>
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 mb-16">
        <Reveal delay={0.9}>
          <EqBars />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-mono" style={{ color: MUTED }}>TRACK_01.MOV</span>
            <span className="text-[10px] font-mono" style={{ color: MUTED }}>48kHz</span>
          </div>
        </Reveal>
      </div>

      <button
        onClick={() => scrollTo("work")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest uppercase"
        style={{ color: "#111111", animation: "bounceY 2.2s ease-in-out infinite" }}
      >
        Scroll
        <ChevronDown size={16} style={{ color: ORANGE }} />
      </button>
    </section>
  );
}
