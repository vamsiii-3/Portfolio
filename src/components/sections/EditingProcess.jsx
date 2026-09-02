import {
  ChartNoAxesCombined,
  Clapperboard,
  FileText,
  LineChart,
  Music2,
  Palette,
  Scissors,
  Sparkles,
} from "lucide-react";
import { Eyebrow, Reveal } from "../Reveal";
import { BG, BG_ALT, INK, LINE, MUTED, ORANGE, ORANGE_LIGHT } from "../../theme";

const PROCESS_STEPS = [
  {
    title: "Script Analysis",
    description: "Understanding story & audience",
    icon: FileText,
  },
  {
    title: "Storyboarding",
    description: "Planning flow & key moments",
    icon: Clapperboard,
  },
  {
    title: "Cinematic Editing",
    description: "Pacing, cuts & structure",
    icon: Scissors,
  },
  {
    title: "Motion Graphics",
    description: "Visuals that explain & engage",
    icon: Palette,
  },
  {
    title: "Sound Design",
    description: "Music, SFX & audio polish",
    icon: Music2,
  },
  {
    title: "Retention Optimization",
    description: "Hooks & attention resets",
    icon: LineChart,
  },
  {
    title: "Final Polish",
    description: "Color, transitions & export",
    icon: Sparkles,
  },
];

function ProcessStep({ step, index }) {
  const Icon = step.icon;

  return (
    <Reveal delay={index * 0.08} className="relative z-10 flex-1">
      <div className="flex h-full flex-col items-center text-center">
        <div className="relative mb-6">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "rgba(255,255,255,0.9)",
              border: `1px solid ${ORANGE}66`,
              boxShadow: `0 0 0 8px rgba(17,17,17,0.03)`,
            }}
          >
            <Icon size={30} strokeWidth={1.5} style={{ color: ORANGE_LIGHT }} />
          </div>
          <span
            className="absolute -right-1 -top-2 flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-semibold"
            style={{ background: ORANGE, color: INK }}
          >
            {index + 1}
          </span>
        </div>

        <h3 className="mb-2 text-base font-semibold text-black md:text-lg">
          {step.title}
        </h3>
        <p className="max-w-[150px] text-sm leading-relaxed" style={{ color: MUTED }}>
          {step.description}
        </p>
      </div>
    </Reveal>
  );
}

export default function EditingProcess() {
  return (
    <section
      id="editing-process"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36"
      style={{
        background: `linear-gradient(180deg, ${BG} 0%, ${BG_ALT} 50%, ${BG} 100%)`,
        scrollMarginTop: 72,
      }}
    >
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow code="00:04" text="My Editing Process" />
          <h2
            className="mb-16 text-black font-bold leading-none"
            style={{
              fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            }}
          >
            MY 7-STEP EDITING PROCESS
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:flex lg:items-start lg:gap-0">
          <div
            className="absolute left-[7%] right-[7%] top-10 hidden h-px lg:block"
            style={{ background: `repeating-linear-gradient(90deg, ${ORANGE}55 0 5px, transparent 5px 9px)` }}
            aria-hidden="true"
          />
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} />
          ))}
        </div>

        <div className="mt-16 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${LINE})` }} />
          <ChartNoAxesCombined size={16} style={{ color: ORANGE }} />
          <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${LINE}, transparent)` }} />
        </div>
      </div>
    </section>
  );
}
