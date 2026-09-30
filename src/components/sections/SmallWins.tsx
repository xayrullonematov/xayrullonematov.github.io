"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Existing, approved outcomes. No invented testimonials or evidence links.
const stories = [
  {
    tab: "One friend", theme: "Helping someone grow", metric: "7", prefix: "",
    result: "A friend’s IELTS Speaking score", context: "Two months of daily speaking practice",
    title: "Confidence, one conversation at a time.",
    contribution: "I helped a friend practise speaking every day for two months. He reached IELTS Speaking 7.",
    lessonLabel: "What I learned", lesson: "Teach confidence before vocabulary.",
    detail: "One person. Consistent practice. A result that mattered to him.",
  },
  {
    tab: "A speaking club", theme: "Making room for others", metric: "30+", prefix: "",
    result: "Students in our school speaking club", context: "A weekly space to practise English",
    title: "A reason to speak. A place to belong.",
    contribution: "I organized a weekly English speaking club at school. More than 30 students joined, with debates and activities at the centre of each session.",
    lessonLabel: "What I learned", lesson: "The format matters. Give people something to take part in.",
    detail: "Debates and activities, rather than another lecture.",
  },
  {
    tab: "A personal challenge", theme: "Putting myself to the test", metric: "50", prefix: "Top",
    result: "A top-50 finish in the IBRAT marathon", context: "Among more than 20,000 participants",
    title: "A small milestone in a much bigger field.",
    contribution: "I took part in the IBRAT English and critical-thinking marathon and finished in the top 50 among more than 20,000 participants.",
    lessonLabel: "What it represents", lesson: "Progress in English and critical thinking.",
    detail: "A milestone I’m proud of as I keep learning.",
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

  return <section className="small-wins" id="results" aria-labelledby={`${id}-title`}>
    <div className="wrap wins-wrap">
      <header className="wins-header">
        <h2 id={`${id}-title`}>Small wins. <span className="highlight">Lasting lessons.</span></h2>
        <span className="wins-count" aria-hidden="true">0{selected + 1}<span> / 03</span></span>
      </header>

      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`} tabIndex={0} className="wins-panel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={selected} className="wins-story"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={{ duration: reduced ? 0 : .32, ease: [.22, 1, .36, 1] }}>
            <div className="wins-outcome">
              <span className="wins-eyebrow">{story.theme}</span>
              <div className="wins-number" aria-hidden="true">
                {story.prefix && <span className="wins-prefix">{story.prefix}</span>}
                <motion.span initial={{ opacity: 0, y: reduced ? 0 : 28 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : .65, ease: [.22, 1, .36, 1] }}>{story.metric}</motion.span>
              </div>
              <p className="wins-result">{story.result}<span className="sr-only">{selected === 0 ? ": 7" : selected === 1 ? ": more than 30" : ""}</span></p>
              <p className="wins-context">{story.context}</p>
            </div>

            <motion.div className="wins-copy" initial={{ opacity: 0, x: reduced ? 0 : 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : .5, delay: reduced ? 0 : .08 }}>
              <h3>{story.title}</h3>
              <p className="wins-contribution">{story.contribution}</p>
              <div className="wins-lesson">
                <span className="wins-eyebrow">{story.lessonLabel}</span>
                <p>{story.lesson}</p>
              </div>
              <p className="wins-detail">{story.detail}</p>
            </motion.div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="wins-tabs" role="tablist" aria-label="Small wins stories">
        {stories.map((item, index) => <button key={item.tab} type="button" role="tab"
          id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === index}
          tabIndex={selected === index ? 0 : -1} ref={node => { tabs.current[index] = node; }}
          onClick={() => setSelected(index)} onKeyDown={event => handleKey(event, index)}>
          <span className="wins-tab-index">0{index + 1}</span><span>{item.tab}</span>
          {selected === index && <motion.span className="wins-tab-line" layoutId={`${id}-indicator`}
            transition={{ duration: reduced ? 0 : .35 }} aria-hidden="true" />}
        </button>)}
      </div>
    </div>
  </section>;
}
