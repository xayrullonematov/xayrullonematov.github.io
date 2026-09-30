"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const stories = [
  {
    tab: "A local model", theme: "AI for a specific job", word: "local.",
    artifact: "HAMMA DevOps model", format: "GGUF · Q4_K_M · 5.34 GB",
    title: "Server troubleshooting, in a downloadable model.",
    contribution: "I published a DevOps-focused model for HAMMA on Hugging Face. Its model card describes the fine-tuning approach, Linux troubleshooting use cases, and limitations. The model file is available for local use.",
    lessonLabel: "The boundary", lesson: "The model suggests. A person checks.",
    detail: "The published limitations acknowledge that commands can be wrong or destructive. Local execution does not remove the need for human judgment.",
    href: "https://huggingface.co/xayrullonematov/hamma-gemma-4-devops-GGUF", link: "Inspect the model and its limitations", kind: "model",
  },
  {
    tab: "A shipped release", theme: "Beyond the repository", word: "shipped.",
    artifact: "Hamma v1.2.0", format: "Published 18 June 2026",
    title: "Something someone else can install.",
    contribution: "Hamma’s public release includes an Android APK, a Windows installer, and a Linux AppImage. The release gives people a specific version to try, alongside the source and a record of what changed.",
    lessonLabel: "The concrete result", lesson: "Three platforms. One published release.",
    detail: "The release notes also link to a merged API-key redaction fix and its tests. That is a specific improvement in the shipped history, rather than a blanket security promise.",
    href: "https://github.com/xayrullonematov/hamma/releases/tag/v1.2.0", link: "Inspect the release and changelog", kind: "release",
  },
  {
    tab: "An open exam", theme: "A useful first visit", word: "open.",
    artifact: "Autotestlar · public demo", format: "20 questions · 20 minutes",
    title: "The first question comes before the sign-up.",
    contribution: "Autotestlar lets visitors start a driving-theory practice exam directly in the browser. The public demo loads questions and starts a timer without asking them to register first.",
    lessonLabel: "The product choice", lesson: "Let a learner try the work first.",
    detail: "The result is visible in the experience itself: open the demo, start the exam, and answer a question. No download or account is needed for that first session.",
    href: "https://autotestlar.uz/prava-test/demo", link: "Try the public exam", kind: "exam",
  },
];

export function SmallWins() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const story = stories[selected];
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % stories.length;
    else if (event.key === "ArrowLeft") next = (index + stories.length - 1) % stories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stories.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  };

  return <section className="small-wins practice" id="results" aria-labelledby={`${id}-title`}>
    <div className="wrap wins-wrap">
      <header className="wins-header">
        <h2 id={`${id}-title`}>In practice. <span className="highlight">Work you can inspect.</span></h2>
        <span className="wins-count" aria-hidden="true">0{selected + 1}<span> / 03</span></span>
      </header>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`} tabIndex={0} className="wins-panel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={selected} className="wins-story"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }} transition={{ duration: reduced ? 0 : .3 }}>
            <div className="wins-outcome">
              <span className="wins-eyebrow">{story.theme}</span>
              <div className="practice-word" aria-hidden="true">{story.word}</div>
              <p className="wins-result">{story.artifact}</p>
              <p className="wins-context">{story.format}</p>
              <div className="artifact-detail" aria-hidden="true">
                {story.kind === "model" && <><span>MODEL FILE</span><div className="artifact-file">.gguf <span>↗</span></div><small>Run locally · inspect the model card</small></>}
                {story.kind === "release" && <><span>RELEASE ASSETS</span><div className="artifact-platforms"><b>Android<small>.apk</small></b><b>Windows<small>.exe</small></b><b>Linux<small>.AppImage</small></b></div></>}
                {story.kind === "exam" && <><span>DEMO FORMAT</span><div className="artifact-questions">{Array.from({length:20},(_,i)=><span key={i}>{String(i+1).padStart(2,"0")}</span>)}</div><small>20 questions · no account required</small></>}
              </div>
            </div>
            <div className="wins-copy">
              <h3>{story.title}</h3><p className="wins-contribution">{story.contribution}</p>
              <div className="wins-lesson"><span className="wins-eyebrow">{story.lessonLabel}</span><p>{story.lesson}</p></div>
              <p className="wins-detail">{story.detail}</p>
              <a className="project-link evidence-link" href={story.href} target="_blank" rel="noopener noreferrer">{story.link}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
      <div className="wins-tabs" role="tablist" aria-label="In practice stories">
        {stories.map((item, index) => <button key={item.tab} type="button" role="tab"
          id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === index}
          tabIndex={selected === index ? 0 : -1} ref={node => { tabs.current[index] = node; }}
          onClick={() => setSelected(index)} onKeyDown={event => handleKey(event, index)}>
          <span className="wins-tab-index">0{index + 1}</span><span>{item.tab}</span>
          {selected === index && <motion.span className="wins-tab-line" layoutId={`${id}-indicator`} transition={{duration:reduced?0:.3}} aria-hidden="true" />}
        </button>)}
      </div>
    </div>
  </section>;
}
