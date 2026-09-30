"use client";

import { motion, useReducedMotion } from "framer-motion";

const channels = [
  { name: "Email", detail: "hello@nematov.com", href: "mailto:hello@nematov.com", label: "Email Xayrillo at hello@nematov.com" },
  { name: "Telegram", detail: "@mr_khayrulloh", href: "https://t.me/mr_khayrulloh", label: "Contact Xayrillo on Telegram (opens in a new tab)" },
  { name: "GitHub", detail: "@xayrullonematov", href: "https://github.com/xayrullonematov", label: "View Xayrillo’s GitHub (opens in a new tab)" },
];

export function ContactSection() {
  const reduced = useReducedMotion();

  return <section id="contact" className="contact-section" aria-labelledby="contact-heading">
    <div className="wrap contact-wrap">
      <header className="contact-intro">
        <h2 id="contact-heading">Let’s <span className="highlight">talk.</span></h2>
        <p>For projects, collaborations, or a good question.</p>
      </header>

      <nav className="contact-channels" aria-label="Contact Xayrillo">
        {channels.map((channel, index) => <motion.a key={channel.name} href={channel.href}
          target={channel.href.startsWith("https:") ? "_blank" : undefined}
          rel={channel.href.startsWith("https:") ? "noopener noreferrer" : undefined}
          aria-label={channel.label} className="contact-channel"
          initial={{ opacity: 0, y: reduced ? 0 : 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : .6, delay: reduced ? 0 : index * .08, ease: [.22, 1, .36, 1] }}>
          <span className="contact-channel-word" aria-hidden="true">
            <span className="contact-word-front">{channel.name}</span>
            <span className="contact-word-back">{channel.name}</span>
          </span>
          <span className="contact-channel-detail" aria-hidden="true">{channel.detail}</span>
        </motion.a>)}
      </nav>

      <footer className="contact-signoff">
        <span>© 2026 Xayrillo Ne’matov</span>
        <span>Urgut <span aria-hidden="true">·</span> Tashkent, Uzbekistan</span>
      </footer>
    </div>
  </section>;
}
