"use client";

import { useEffect, useRef } from "react";
import { SmallWins } from "./SmallWins";
import { ContactSection } from "./ContactSection";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const projects: WorksWheelItem[] = [
  { title: "Hamma", image: "/portfolio/hamma-transparent.png", logoClassName: "wheel-logo-hamma", href: "https://github.com/xayrullonematov/hamma/releases/tag/v1.2.0", category: "01 · Server tools, on your device", description: "An SSH and SFTP client for connecting to servers, working in a terminal, and moving files. Hamma brings these tasks into one app, with an optional AI assistant for server work.", noteLabel: "Available now", note: "Version 1.2.0 has downloads for Android, Windows, and Linux. The source is public; newer work on the main branch is separate from this release.", actionLabel: "View the release", evidenceHref: "https://github.com/xayrullonematov/hamma", evidenceLabel: "Explore the source" },
  { title: "Autotestlar.uz", image: "/portfolio/autotestlar-logo.webp", logoClassName: "wheel-logo-auto", href: "https://autotestlar.uz/prava-test/demo", category: "02 · Practice before the driving exam", description: "A web platform for practising Uzbekistan’s driving-theory questions. The public demo lets a learner begin with 20 questions and a 20-minute timer, without creating an account.", noteLabel: "Available now", note: "A free browser demo, plus a public library of question tickets. Learners can try the exam before deciding whether to create an account.", actionLabel: "Try the 20-question demo", evidenceHref: "https://autotestlar.uz/prava-test/tickets", evidenceLabel: "Browse the question tickets" },
];

// Approved portfolio content preserved from the previous static release.
export type PortfolioSection = "story" | "work" | "results" | "contact";

export function PortfolioContent({ section }: { section: PortfolioSection }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = root.current?.querySelector<HTMLElement>("[data-admission-track]");
    const previous = root.current?.querySelector<HTMLButtonElement>("[data-carousel-prev]");
    const next = root.current?.querySelector<HTMLButtonElement>("[data-carousel-next]");
    if (!track || !previous || !next) return;
    const scroll = (direction: number) => {
      const first = track.firstElementChild as HTMLElement | null;
      const step = (first?.getBoundingClientRect().width ?? track.clientWidth) + 22;
      track.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    const back = () => scroll(-1);
    const forward = () => scroll(1);
    previous.addEventListener("click", back);
    next.addEventListener("click", forward);
    return () => {
      previous.removeEventListener("click", back);
      next.removeEventListener("click", forward);
    };
  }, [section]);
  return <div ref={root} className="portfolio-content">
{section === "story" && <><section className="thread" id="story"><div className="wrap"><div className="section-top"><span className="mono">How it started</span><div><h2>Not a master plan.<br /><span className="highlight">A chain of problems.</span></h2><p>I did not begin with “I want to build a startup.” Each step started with something that bothered me enough to investigate.</p></div></div><div className="timeline"><article className="entry"><span className="pin"></span><div><span className="date mono">2024 · The expensive lesson</span><h3>I lost about $500 in a Telegram crypto scam.</h3><p>I was embarrassed, then curious. I traced wallets, learned OSINT, moved to Linux, studied the OWASP Top 10, and completed <strong className="highlight">more than 25 security labs</strong>. A bad decision became the reason I learned how trust fails online.</p></div></article><article className="entry"><span className="pin"></span><div><span className="date mono">2025 · The first real users</span><h3>A movie bot taught me that shipping changes the questions.</h3><p>Movistan eventually served <strong className="highlight">more than 800 people</strong> and handled around 1,200 daily searches at its busiest. The hard part stopped being “can I code this?” and became reliability, confused users, and fixing the same edge case twice.</p></div></article><article className="entry"><span className="pin"></span><div><span className="date mono">2026 · Closer to home</span><h3>I started choosing problems I could observe myself.</h3><p>That led to a pickup-ordering project for bazaar kitchens, browser-based driving-test practice, and a server-management app. The projects are different; the instinct is the same: reduce one piece of friction, then listen.</p></div></article></div></div></section>
<section className="admissions" aria-labelledby="admissions-title"><div className="wrap admissions-head"><div><span className="mono">Three yeses I could not take</span><h2 id="admissions-title">Acceptance was not<br /><span className="highlight">the finish line.</span></h2></div><div className="carousel-controls" aria-label="University stories"><button type="button" data-carousel-prev aria-label="Previous university">Previous</button><button type="button" data-carousel-next aria-label="Next university">Next</button></div></div><div className="admission-track" data-admission-track tabIndex={0}>
<article className="admission-card"><div className="admission-letter"><img src="/portfolio/floridatech-acceptance.webp" alt="Florida Tech admission letter for Xayrillo Ne'matov" loading="lazy" /></div><div className="admission-copy"><span className="mono">01 · Florida Tech · January 2026</span><h3>The first letter made the possibility real.</h3><p>Florida Tech admitted me to its BS Computer Science program. Until that email, studying in the United States was mostly an application portal, essays, and waiting. This was the first concrete yes.</p><p className="fact">The offer proved I could compete internationally. It did not solve the cost of attending.</p></div></article>
<article className="admission-card"><div className="admission-letter"><img src="/portfolio/rit-acceptance.webp" alt="RIT admission letter for Xayrillo Ne'matov" loading="lazy" /></div><div className="admission-copy"><span className="mono">02 · RIT · March 2026</span><h3>The strongest offer became the hardest no.</h3><p>RIT admitted me to Cybersecurity and later awarded a renewable $23,000 annual scholarship—up to $92,000 over four years. It was the program closest to the work that first pulled me into technology.</p><p className="fact">Even after the scholarship, the remaining cost was beyond what my family could afford. I was admitted, but I could not enroll.</p></div></article>
<article className="admission-card"><div className="admission-letter"><img src="/portfolio/pennstate-acceptance.webp" alt="Penn State Harrisburg admission letter for Xayrillo Ne'matov" loading="lazy" /></div><div className="admission-copy"><span className="mono">03 · Penn State · March 2026</span><h3>A third yes clarified the real constraint.</h3><p>Penn State Harrisburg offered me a place in Cybersecurity Analytics and Operations. By then, the pattern was clear: the obstacle was not whether a university would admit me.</p><p className="fact">The obstacle was affordability. I stayed in Uzbekistan, took the lesson seriously, and kept building instead of treating an offer letter as the final achievement.</p></div></article>
</div><div className="wrap carousel-hint mono">Swipe or use the controls · 01—03</div></section>
</>}
{section === "work" && <section className="work" id="work"><div className="wrap"><WorksWheel items={projects} label="Selected projects" introduction={<h2><span className="highlight">Useful</span> before impressive.</h2>} /></div></section>}
{section === "results" && <SmallWins />}
{section === "contact" && <ContactSection />}

  </div>;
}
