import { Play } from "lucide-react";
import { Eyebrow, Reveal } from "../Reveal";
import { BG, BG_ALT, LINE, MUTED, ORANGE, ORANGE_LIGHT } from "../../theme";

const TUTORIAL_TAGS = ["COLOR GRADING", "SOUND DESIGN", "PACING", "TRANSITIONS", "EXPORT SETTINGS", "B-ROLL", "TIMELINE WORKFLOW", "CAPTIONS"];

export default function Tutorials() {
  const loop = [...TUTORIAL_TAGS, ...TUTORIAL_TAGS];

  return (
    <section id="tutorials" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden" style={{ background: `linear-gradient(180deg, ${BG} 0%, ${BG_ALT} 50%, ${BG} 100%)`, scrollMarginTop: 72 }}>
      <div className="absolute pointer-events-none" style={{ top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: `radial-gradient(circle, rgba(17,17,17,0.06) 0%, transparent 70%)` }} />
      <div className="relative max-w-7xl mx-auto">
        <Reveal><Eyebrow code="00:02" text="Learn" /></Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col items-center text-center py-10">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8" style={{ border: `1px solid ${LINE}`, background: "rgba(17,17,17,0.03)", animation: "pulseRing 2.6s ease-in-out infinite" }}>
              <Play size={26} style={{ color: ORANGE }} fill={ORANGE} />
            </div>
            <h2 className="text-black font-bold leading-none" style={{ fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: "clamp(2.75rem, 10vw, 7rem)", letterSpacing: "0.02em" }}>
              COMING <span style={{ color: ORANGE }}>SOON</span>
            </h2>
            <p className="mt-6 max-w-md" style={{ color: MUTED }}>
              Tutorials are coming soon. I&apos;m preparing editing tutorials, workflow breakdowns, tips, and tricks. Stay tuned.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative mt-6 py-5" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
            <div className="flex whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
              {loop.map((tag, index) => (
                <span key={index} className="mx-6 text-sm tracking-widest uppercase font-medium" style={{ color: index % 2 === 0 ? ORANGE_LIGHT : MUTED }}>
                  {tag} <span style={{ color: ORANGE }}>—</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
