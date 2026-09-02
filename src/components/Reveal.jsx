import { useEffect, useRef, useState } from "react";
import { LINE, MUTED, ORANGE } from "../theme";

function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(.16,.84,.44,1) ${delay}s, transform 0.8s cubic-bezier(.16,.84,.44,1) ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ code, text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="text-xs tracking-widest font-mono"
        style={{ color: ORANGE, letterSpacing: "0.15em" }}
      >
        {code}
      </span>
      <span style={{ width: 28, height: 1, background: LINE }} />
      <span
        className="text-xs tracking-widest uppercase"
        style={{ color: MUTED, letterSpacing: "0.2em" }}
      >
        {text}
      </span>
    </div>
  );
}
