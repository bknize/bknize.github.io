import { useState } from "react";
import {
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Copy,
  Check,
} from "lucide-react";
import { GradientLine } from "./GradientLine.tsx";
import { SectionHeader } from "./SectionHeader.tsx";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/bknize", hoverClass: "hover:text-white hover:border-white/30" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/benknize/", hoverClass: "hover:text-cmyk-cyan hover:border-cmyk-cyan/30" },
  { icon: Twitter, label: "I need another link", href: "#", hoverClass: "hover:text-cmyk-magenta hover:border-cmyk-magenta/30" },
  { icon: Mail, label: "Email", href: "mailto:bknize@gmail.com", hoverClass: "hover:text-cmyk-yellow hover:border-cmyk-yellow/30" },
];

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("bknize@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative bg-cmyk-dark py-28 overflow-hidden"
    >
      <GradientLine className="absolute top-0 left-0 right-0" />

      {/* Large background text */}
      <div className="absolute -bottom-15 -left-5 text-[22vw] font-bold text-transparent leading-none select-none z-0 hidden md:block [letter-spacing:-0.05em] [-webkit-text-stroke:1px_rgba(255,255,255,0.03)]">
        LET'S
      </div>

      <div className="relative z-1 max-w-7xl mx-auto px-6">
        <SectionHeader
          sectionLabel="04 / CONTACT"
          titleColorClass="text-cmyk-yellow"
          heading="Let's Build"
          subheading="Something"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <p className="text-gray-400 leading-relaxed mb-10 text-base max-w-[420px]">
              I'm currently open to new opportunities — whether it's a
              full-time role, a contract engagement, or an interesting side
              project. Let's connect!
            </p>

            {/* Email with copy */}
            <div className="border border-white/10 p-5 mb-8 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-[0.7rem] tracking-[0.15em] mb-1">
                  EMAIL
                </p>
                <p className="text-white font-mono text-[0.9rem]">
                  bknize@gmail.com
                </p>
              </div>
              <button
                onClick={copyEmail}
                className={`p-2 border transition-all duration-200 cursor-pointer ${
                  copied
                    ? "bg-cmyk-cyan/15 border-cmyk-cyan text-cmyk-cyan"
                    : "bg-white/5 border-white/10 text-gray-400"
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-8">
              <MapPin size={14} className="text-cmyk-magenta" />
              <span className="text-gray-500 text-[0.85rem]">
                Peoria, IL — Open to Remote
              </span>
            </div>

            {/* Social links */}
            <div>
              <p className="text-gray-600 text-[0.7rem] tracking-[0.15em] mb-4">
                FIND ME ON
              </p>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className={`flex items-center gap-2 bg-white/4 border border-white/8 px-4 py-2.5 text-gray-400 no-underline text-[0.8rem] transition-all duration-200 ${s.hoverClass}`}
                  >
                    <s.icon size={14} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            {submitted ? (
              <div className="border border-cmyk-cyan bg-cmyk-cyan/[0.06] p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-cmyk-cyan/15 border-2 border-cmyk-cyan flex items-center justify-center mx-auto mb-6">
                  <Check size={22} className="text-cmyk-cyan" />
                </div>
                <p className="text-white font-semibold text-lg mb-2">
                  Message Sent!
                </p>
                <p className="text-gray-400 text-[0.9rem]">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 text-cmyk-cyan text-[0.8rem] tracking-[0.1em] cursor-pointer bg-transparent border-none"
                >
                  SEND ANOTHER →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 text-[0.7rem] tracking-[0.15em] block mb-1.5 font-normal">
                      NAME *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3.5 text-[0.9rem] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-[0.7rem] tracking-[0.15em] block mb-1.5 font-normal">
                      EMAIL *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3.5 text-[0.9rem] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 text-[0.7rem] tracking-[0.15em] block mb-1.5 font-normal">
                    SUBJECT
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3.5 text-[0.9rem] outline-none appearance-none transition-colors"
                  >
                    <option value="" className="bg-cmyk-key">
                      Select a topic...
                    </option>
                    <option value="fulltime" className="bg-cmyk-key">
                      Full-time Opportunity
                    </option>
                    <option value="contract" className="bg-cmyk-key">
                      Contract / Freelance
                    </option>
                    <option value="collab" className="bg-cmyk-key">
                      Collaboration
                    </option>
                    <option value="other" className="bg-cmyk-key">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-600 text-[0.7rem] tracking-[0.15em] block mb-1.5 font-normal">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3.5 text-[0.9rem] outline-none resize-y transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start flex items-center justify-center gap-2 bg-cmyk-magenta text-white font-semibold text-[0.85rem] uppercase tracking-[0.1em] px-8 py-4 border-none cursor-pointer hover:opacity-90 transition-opacity"
                >
                  SEND MESSAGE
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
