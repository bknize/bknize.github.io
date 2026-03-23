import { useState, useEffect, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";

const UNSTATIC_ENDPOINT = import.meta.env.VITE_UNSTATIC_ENDPOINT as string | undefined;
const FORM_ACTION = UNSTATIC_ENDPOINT
  ? `https://forms.un-static.com/forms/${UNSTATIC_ENDPOINT}`
  : undefined;

/** URL un-static redirects back to after a successful submission.
 *  Includes ?success=1 so the SPA can detect it, and #/ so HashRouter
 *  renders the home route. */
const REDIRECT_URL = `${window.location.origin}${import.meta.env.BASE_URL}?success=1#/`;

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/bknize", hoverClass: "hover:text-white hover:border-white/30" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/benknize/", hoverClass: "hover:text-cmyk-cyan hover:border-cmyk-cyan/30" },
  { icon: Twitter, label: "I need another link", href: "#", hoverClass: "hover:text-cmyk-magenta hover:border-cmyk-magenta/30" },
  { icon: Mail, label: "Email", href: "mailto:bknize@gmail.com", hoverClass: "hover:text-cmyk-yellow hover:border-cmyk-yellow/30" },
];

function isSuccessRedirect() {
  return new URLSearchParams(window.location.search).has("success");
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(isSuccessRedirect);
  const [copied, setCopied] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (honeypotRef.current?.value) {
      e.preventDefault();
    }
  };

  // When arriving via un-static redirect, scroll into view
  useEffect(() => {
    if (submitted) {
      requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [submitted]);

  const handleSendAnother = () => {
    // Strip ?success=1 from the URL without triggering a navigation
    window.history.replaceState(
      {},
      "",
      window.location.pathname + window.location.hash
    );
    setSubmitted(false);
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
                type="button"
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
              <div className="border border-cmyk-cyan bg-cmyk-cyan/6 p-12 text-center">
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
                  type="button"
                  onClick={handleSendAnother}
                  className="mt-6 text-cmyk-cyan text-[0.8rem] tracking-widest cursor-pointer bg-transparent border-none"
                >
                  SEND ANOTHER →
                </button>
              </div>
            ) : (
              <form
                method="post"
                action={FORM_ACTION}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                {/* Un-static: redirect after successful submission */}
                <input type="hidden" name="_redirect" value={REDIRECT_URL} />
                {/* Un-static: email subject line */}
                <input type="hidden" name="_subject" value="Portfolio Contact Form" />

                {/* Honeypot: invisible to humans, bots fill it → submission blocked */}
                <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] overflow-hidden">
                  <label htmlFor="contact-pot">Leave this empty</label>
                  <input
                    ref={honeypotRef}
                    id="contact-pot"
                    name="_email"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 text-[0.7rem] tracking-[0.15em] block mb-1.5 font-normal">
                      NAME *
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full bg-white/4 border border-white/10 text-white px-4 py-3.5 text-[0.9rem] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-[0.7rem] tracking-[0.15em] block mb-1.5 font-normal">
                      EMAIL *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white/4 border border-white/10 text-white px-4 py-3.5 text-[0.9rem] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-gray-600 text-[0.7rem] tracking-[0.15em] block mb-1.5 font-normal"
                  >
                    SUBJECT
                  </label>
                  {/* name prop causes Radix to emit a hidden <select> for native form submission */}
                  <Select name="subject">
                    <SelectTrigger id="contact-subject" className="w-full">
                      <SelectValue placeholder="Select a topic..." />
                    </SelectTrigger>
                    <SelectContent sideOffset={4}>
                      <SelectItem value="fulltime">
                        Full-time Opportunity
                      </SelectItem>
                      <SelectItem value="contract">
                        Contract / Freelance
                      </SelectItem>
                      <SelectItem value="collab">Collaboration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-gray-600 text-[0.7rem] tracking-[0.15em] block mb-1.5 font-normal">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full bg-white/4 border border-white/10 text-white px-4 py-3.5 text-[0.9rem] outline-none resize-y transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start flex items-center justify-center gap-2 bg-cmyk-magenta text-white font-semibold text-[0.85rem] uppercase tracking-widest px-8 py-4 border-none cursor-pointer hover:opacity-90 transition-opacity"
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
