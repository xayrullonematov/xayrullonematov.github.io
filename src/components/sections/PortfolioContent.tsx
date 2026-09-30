"use client";

import { useEffect, useRef } from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const projects: WorksWheelItem[] = [
  { title: "Nma Yeymiz", image: "/portfolio/nmayeymiz.webp", href: "https://nmayeymiz.uz", category: "01 · Food, without the queue", description: "A Telegram-first pickup tool for bazaar kitchens. Customers browse, order ahead, and collect when the food is ready. The idea came from watching delivery products solve the wrong problem for places where people are already nearby.", noteLabel: "Honest status", note: "The product works; adoption is the unfinished part. Convincing busy kitchen owners is harder than writing the order flow.", actionLabel: "Open the product" },
  { title: "Hamma", image: "/portfolio/hamma-logo.webp", href: "https://github.com/xayrullonematov/hamma", category: "02 · The difficult build", description: "A cross-platform SSH/SFTP client shaped by zero-trust thinking. I built connection recovery, encrypted credential storage, file transfer, packaging, and CI across Flutter targets.", noteLabel: "What broke", note: "A stale-connection bug exposed the lack of integration tests. An audit also found unsigned builds and weak backup-key derivation. I treated that report as a roadmap, not an insult.", actionLabel: "Read the code" },
  { title: "Autotestlar.uz", image: "/portfolio/autotestlar-logo.webp", href: "https://autotestlar.uz", category: "03 · Learning without signal", description: "Driving-exam practice for Uzbek learners, with an offline-first mobile direction. It began as a website; rebuilding it around local storage and sync forced me to think beyond the happy path.", noteLabel: "Small lesson", note: "“Offline-first” is not a feature badge. It changes how every question, answer, and update is stored.", actionLabel: "Visit Autotestlar" },
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
{section === "story" && <><section className="thread" id="story"><div className="wrap"><div className="section-top"><span className="mono">How it started</span><div><h2>Not a master plan.<br /><span className="highlight">A chain of problems.</span></h2><p>I did not begin with “I want to build a startup.” Each step started with something that bothered me enough to investigate.</p></div></div><div className="timeline"><article className="entry"><span className="pin"></span><div><span className="date mono">2024 · The expensive lesson</span><h3>I lost about $500 in a Telegram crypto scam.</h3><p>I was embarrassed, then curious. I traced wallets, learned OSINT, moved to Linux, studied the OWASP Top 10, and completed <strong className="highlight">more than 25 security labs</strong>. A bad decision became the reason I learned how trust fails online.</p></div></article><article className="entry"><span className="pin"></span><div><span className="date mono">2025 · The first real users</span><h3>A movie bot taught me that shipping changes the questions.</h3><p>Movistan eventually served <strong className="highlight">more than 800 people</strong> and handled around 1,200 daily searches at its busiest. The hard part stopped being “can I code this?” and became reliability, confused users, and fixing the same edge case twice.</p></div></article><article className="entry"><span className="pin"></span><div><span className="date mono">2026 · Closer to home</span><h3>I started choosing problems I could observe myself.</h3><p>That led to pickup ordering for bazaar kitchens, offline driving-test practice, and a private remote-work tool. The projects are different; the instinct is the same: reduce one piece of friction, then listen.</p></div></article></div></div></section>
<section className="admissions" aria-labelledby="admissions-title"><div className="wrap admissions-head"><div><span className="mono">Three yeses I could not take</span><h2 id="admissions-title">Acceptance was not<br /><span className="highlight">the finish line.</span></h2></div><div className="carousel-controls" aria-label="University stories"><button type="button" data-carousel-prev aria-label="Previous university">Previous</button><button type="button" data-carousel-next aria-label="Next university">Next</button></div></div><div className="admission-track" data-admission-track tabIndex={0}>
<article className="admission-card"><div className="admission-letter"><img src="/portfolio/floridatech-acceptance.webp" alt="Florida Tech admission letter for Xayrillo Ne'matov" loading="lazy" /></div><div className="admission-copy"><span className="mono">01 · Florida Tech · January 2026</span><h3>The first letter made the possibility real.</h3><p>Florida Tech admitted me to its BS Computer Science program. Until that email, studying in the United States was mostly an application portal, essays, and waiting. This was the first concrete yes.</p><p className="fact">The offer proved I could compete internationally. It did not solve the cost of attending.</p></div></article>
<article className="admission-card"><div className="admission-letter"><img src="/portfolio/rit-acceptance.webp" alt="RIT admission letter for Xayrillo Ne'matov" loading="lazy" /></div><div className="admission-copy"><span className="mono">02 · RIT · March 2026</span><h3>The strongest offer became the hardest no.</h3><p>RIT admitted me to Cybersecurity and later awarded a renewable $23,000 annual scholarship—up to $92,000 over four years. It was the program closest to the work that first pulled me into technology.</p><p className="fact">Even after the scholarship, the remaining cost was beyond what my family could afford. I was admitted, but I could not enroll.</p></div></article>
<article className="admission-card"><div className="admission-letter"><img src="/portfolio/pennstate-acceptance.webp" alt="Penn State Harrisburg admission letter for Xayrillo Ne'matov" loading="lazy" /></div><div className="admission-copy"><span className="mono">03 · Penn State · March 2026</span><h3>A third yes clarified the real constraint.</h3><p>Penn State Harrisburg offered me a place in Cybersecurity Analytics and Operations. By then, the pattern was clear: the obstacle was not whether a university would admit me.</p><p className="fact">The obstacle was affordability. I stayed in Uzbekistan, took the lesson seriously, and kept building instead of treating an offer letter as the final achievement.</p></div></article>
</div><div className="wrap carousel-hint mono">Swipe or use the controls · 01—03</div></section>
</>}
{section === "work" && <section className="work" id="work"><div className="wrap"><span className="mono">Things I have made</span><h2><span className="highlight">Useful</span> before impressive.</h2><WorksWheel items={projects} label="Selected projects" /></div></section>}
{section === "results" && <section className="receipts" id="results"><div className="wrap"><span className="mono">A few small receipts</span><h2>Results I’m <span className="highlight">quietly proud of.</span></h2><p className="lead">No inflated dashboards. Just outcomes that meant something because a real person, classroom, or decision sat behind them.</p><div className="moments"><article className="moment"><div><span className="big">1 friend</span><p>Two months of daily speaking practice helped him reach <strong className="highlight">IELTS Speaking 7.</strong></p></div><small>I learned to teach confidence before vocabulary.</small></article><article className="moment"><div><span className="big">30+ students</span><p>joined the weekly English speaking club I organized at school.</p></div><small>The format mattered: debates and activities, not another lecture.</small></article><article className="moment"><div><span className="big">Top 50</span><p>among more than 20,000 participants in the IBRAT English and critical-thinking marathon.</p></div><small>A useful signal—not a personality.</small></article></div></div></section>

}
{section === "contact" && <footer className="ending" id="contact"><div className="wrap"><span className="mono">Still learning in public</span><h2>If the problem is <span className="highlight">real,</span><br />I’m interested.</h2><div className="contacts"><a href="mailto:hello@nematov.com">Email me</a><a href="https://t.me/mr_khayrulloh" target="_blank" rel="noreferrer">Telegram</a><a href="https://github.com/xayrullonematov" target="_blank" rel="noreferrer">GitHub</a></div><div className="foot"><span>© 2026 Xayrillo Ne’matov</span><span>Built in Urgut. Continued in Tashkent.</span></div></div></footer>}

  </div>;
}
