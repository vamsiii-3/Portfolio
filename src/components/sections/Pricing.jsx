import { Check } from "lucide-react";
import { Eyebrow, Reveal } from "../Reveal";
import { BG, BG_ALT, INK, LINE, MUTED, ORANGE, PANEL } from "../../theme";

const PLANS = [
  {
    name: "Basic",
    price: "$10",
    period: "",
    tagline: "Short-form video editing",
    features: [
      "Clean cuts, zooms, subtitles & transitions",
      "Audio syncing & sound design",
      "9:16 / 16:9 formatting",
      "Up to 1-minute final video",
      "24-hour turnaround",
      "Unlimited revisions",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Standard",
    price: "$20",
    period: "",
    tagline: "Enhanced short-form video editing",
    features: [
      "Everything in Basic",
      "Motion graphics & text animations",
      "Color correction & grading",
      "Advanced transitions & effects",
      "B-roll & visual overlays",
      "9:16 / 16:9 formatting",
      "Up to 5-minute final video",
      "24-hour turnaround",
      "Unlimited revisions",
    ],
    highlighted: true,
    cta: "Start a Project",
  },
  {
    name: "Premium",
    price: "$40",
    period: "",
    tagline: "Professional long-form video editing",
    features: [
      "Advanced cuts, pacing & storytelling",
      "Motion graphics & animated elements",
      "Dynamic subtitles & text animations",
      "Professional color grading",
      "Audio cleanup & sound design",
      "Background music & sound effects",
      "B-roll & visual overlays",
      "Smooth zooms & camera movements",
      "YouTube-ready 16:9 formatting",
      "10–15 minute final video",
      "48-hour turnaround",
      "Unlimited revisions",
    ],
    highlighted: false,
    cta: "Go Premium",
  },
];

function PricingCard({ plan, index, scrollTo }) {
  return (
    <Reveal delay={index * 0.1}>
      <div
        className="relative rounded-2xl p-8 flex flex-col h-full transition-transform duration-400 hover:-translate-y-1.5"
        style={{
          background: plan.highlighted
            ? "linear-gradient(160deg, #111111, #1a1a1a)"
            : "#ffffff",
          border: plan.highlighted
            ? `1px solid ${ORANGE}`
            : `1px solid ${LINE}`,
          boxShadow: plan.highlighted
            ? `0 0 60px -15px rgba(17,17,17,0.18)`
            : "none",
        }}
      >
        {plan.highlighted && (
          <span
            className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase"
            style={{
              background: ORANGE,
              color: INK,
            }}
          >
            Most Popular
          </span>
        )}

        <h3
          className="text-xl font-semibold mb-1"
          style={{ color: plan.highlighted ? "#f5f5f5" : "#111111" }}
        >
          {plan.name}
        </h3>

        <p
          className="text-sm mb-6"
          style={{ color: plan.highlighted ? "#d8d3ce" : MUTED }}
        >
          {plan.tagline}
        </p>

        <div className="flex items-end gap-1 mb-8">
          <span
            className="text-4xl font-bold"
            style={{
              fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontSize: "3rem",
              color: plan.highlighted ? "#f5f5f5" : "#111111",
            }}
          >
            {plan.price}
          </span>

          {plan.period && (
            <span
              className="text-sm mb-1"
              style={{ color: plan.highlighted ? "#d8d3ce" : MUTED }}
            >
              {plan.period}
            </span>
          )}
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm"
            >
              <Check
                size={16}
                style={{
                  color: ORANGE,
                  marginTop: 2,
                  flexShrink: 0,
                }}
              />

              <span style={{ color: plan.highlighted ? "#f3f1ee" : "#222222" }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollTo("contact")}
          className="w-full py-3 rounded-full font-medium transition-all duration-300"
          style={
            plan.highlighted
              ? {
                  background: ORANGE,
                  color: INK,
                }
              : {
                  border: `1px solid ${LINE}`,
                  color: "#111111",
                }
          }
        >
          {plan.cta}
        </button>
      </div>
    </Reveal>
  );
}

export default function Pricing({ scrollTo }) {
  return (
    <section
      id="pricing"
      className="relative py-28 md:py-36 px-6 md:px-10"
      style={{
        background:
          `linear-gradient(180deg, ${BG} 0%, ${BG_ALT} 50%, ${BG} 100%)`,
        scrollMarginTop: 72,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow code="00:03" text="Pricing" />

          <h2
            className="text-black font-bold leading-none mb-4"
            style={{
              fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            }}
          >
            PRICING
          </h2>

          <p
            className="max-w-xl mb-16"
            style={{ color: MUTED }}
          >
            Simple, transparent packages. Every project starts with a
            conversation — pricing flexes with scope.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              scrollTo={scrollTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}