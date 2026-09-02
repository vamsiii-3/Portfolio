import { useState } from "react";
import {
  ArrowUpRight,
  Camera,
  Check,
  Film,
  Mail,
  MessageCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Eyebrow, Reveal } from "../Reveal";
import { BG, BG_ALT, LINE, MUTED, ORANGE } from "../../theme";

const SOCIALS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/918985978669",
    primary: true,
  },
  {
    icon: Camera,
    label: "Instagram",
    href: "https://instagram.com/hey.vyshu",
    primary: true,
  },
  {
    icon: Film,
    label: "YouTube",
    href: "https://www.youtube.com/@heyvyshu",
    primary: false,
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:Hey.vyshusocialconnect@gmail.com",
    primary: false,
  },
];

function fieldStyle(focused) {
  return {
    background: "#f8f4f0",
    border: `1px solid ${focused ? ORANGE : LINE}`,
    color: "#111111",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxShadow: focused ? `0 0 0 4px ${ORANGE}18` : "none",
  };
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);
    setError("");
    setSent(false);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your .env file."
        );
      }

      const templateParams = {
        name: form.name,
        email: form.email,
        projectType: form.projectType,
        budget: form.budget,
        message: form.message,
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey,
        }
      );

      setSent(true);

      setForm({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.error("Email sending failed:", err);

      setError(
        "Something went wrong while sending your message. Please try again or contact me directly by email."
      );
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg text-sm outline-none placeholder:text-neutral-500";

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 px-6 md:px-10"
      style={{
        background:
          `linear-gradient(180deg, ${BG} 0%, ${BG_ALT} 50%, ${BG} 100%)`,
        scrollMarginTop: 72,
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "5%",
          width: 500,
          height: 500,
          background: `radial-gradient(circle, rgba(17,17,17,0.06) 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow code="00:04" text="Contact" />

          <h2
            className="text-black font-bold leading-[0.95] mb-6"
            style={{
              fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            }}
          >
            LET&apos;S CREATE
          </h2>

          <p className="max-w-lg mb-16" style={{ color: MUTED }}>
            Have a project in mind? Let&apos;s create something amazing.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <Reveal delay={0.1} className="lg:col-span-3">
            {sent ? (
              <div
                className="rounded-2xl p-10 flex flex-col items-center text-center"
                style={{
                  border: `1px solid ${LINE}`,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: ORANGE }}
                >
                  <Check size={24} color="#0A0A0B" />
                </div>

                <h3 className="text-xl font-semibold text-black mb-2">
                  Message sent
                </h3>

                <p style={{ color: MUTED }}>
                  Thanks — I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    className={inputClass}
                    style={fieldStyle(focusedField === "name")}
                    placeholder="Your name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    required
                  />

                  <input
                    className={inputClass}
                    style={fieldStyle(focusedField === "email")}
                    placeholder="Email address"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <select
                    className={inputClass}
                    style={fieldStyle(focusedField === "projectType")}
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("projectType")}
                    onBlur={() => setFocusedField("")}
                  >
                    <option value="">Project type</option>
                    <option>YouTube Editing</option>
                    <option>Reels & Shorts</option>
                    <option>Motion Graphics</option>
                    <option>Cinematic Editing</option>
                    <option>Advertisement</option>
                    <option>Other</option>
                  </select>

                  <select
                    className={inputClass}
                    style={fieldStyle(focusedField === "budget")}
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("budget")}
                    onBlur={() => setFocusedField("")}
                  >
                    <option value="">Budget range</option>
                    <option>$10</option>
                    <option>$20</option>
                    <option>$40</option>
                    <option>Custom budget</option>
                  </select>
                </div>

                <textarea
                  className={inputClass}
                  style={{
                    ...fieldStyle(focusedField === "message"),
                    resize: "vertical",
                  }}
                  placeholder="Tell me about your project..."
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField("")}
                  required
                />

                {error && (
                  <p
                    className="text-sm"
                    style={{ color: "#ff6b4a" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    background: ORANGE,
                    color: "#0A0A0B",
                  }}
                >
                  {sending ? "Sending..." : "Send Message"}

                  {!sending && <ArrowUpRight size={16} />}
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-2">
            <div
              className="rounded-2xl p-8 h-full flex flex-col justify-between"
              style={{
                border: `1px solid ${LINE}`,
                background: "#f8f8f8",
              }}
            >
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: MUTED }}
                >
                  Direct
                </p>

                <a
                  href="mailto:Hey.vyshusocialconnect@gmail.com"
                  className="text-lg md:text-xl font-medium text-black break-all hover:underline"
                  style={{ textDecorationColor: ORANGE }}
                >
                  Hey.vyshusocialconnect@gmail.com
                </a>
              </div>

              <div className="mt-10">
                <p
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: MUTED }}
                >
                  Primary Contact
                </p>

                <div className="flex flex-col gap-3">
                  {SOCIALS.map(
                    ({ icon: Icon, label, href, primary }) => (
                      <a
                        key={label}
                        href={href}
                        target={
                          label === "WhatsApp" ||
                          label === "Instagram"
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          label === "WhatsApp" ||
                          label === "Instagram"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={`group flex items-center justify-between rounded-xl transition-all duration-300 ${
                          primary
                            ? "px-4 py-3.5"
                            : "py-2.5"
                        }`}
                        style={{
                          border: primary
                            ? `1px solid ${LINE}`
                            : "none",
                          borderBottom: primary
                            ? undefined
                            : `1px solid ${LINE}`,
                          background: primary
                            ? "#f8f8f8"
                            : "transparent",
                        }}
                      >
                        <span
                          className={`flex items-center gap-3 text-sm ${
                            primary
                              ? "font-medium"
                              : "text-black"
                          }`}
                          style={{ color: "#111111" }}
                        >
                          <Icon
                            size={primary ? 18 : 16}
                            style={{ color: ORANGE }}
                          />

                          {label}
                        </span>

                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{
                            color: primary ? ORANGE : MUTED,
                          }}
                        />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}