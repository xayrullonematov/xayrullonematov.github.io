/**
 * FROM STONE TO SYSTEMS — Narrative Data Model
 * 
 * All story content lives here, separate from rendering.
 * The journey is one continuous evolution — nothing resets,
 * everything inherits from what came before.
 */

// ─── Chapter Definitions ─────────────────────────────────────────────

export type ChapterId =
  | "prologue"
  | "curiosity"
  | "survival"
  | "discovery"
  | "building"
  | "opensource"
  | "ai"
  | "future";

export interface Chapter {
  id: ChapterId;
  index: number;
  title: string;
  subtitle: string;
  /** The emotional micro-copy that opens the chapter */
  opening: string;
  /** The deeper narrative paragraph */
  narrative: string;
  /** Visual era description for the canvas system */
  visualEra: string;
  /** The specific personal anchor for this chapter */
  anchor?: {
    object: string;
    meaning: string;
  };
  /** Color palette that evolves into the next chapter */
  palette: {
    primary: string;
    secondary: string;
    bg: string;
    glow: string;
  };
  /** What visual primitive dominates this era */
  primitive: "marks" | "fragments" | "lines" | "modules" | "networks" | "intelligence" | "openEdges";
  /**
   * Bricolage Grotesque variable font weight for this chapter.
   * Increases 200→900 as the journey progresses — Stone to Systems.
   */
  fontWeight: number;
}

export const chapters: Chapter[] = [
  {
    id: "prologue",
    index: 0,
    title: "From Stone to Systems",
    subtitle: "Xayrillo Ne'matov",
    opening: "Every builder begins with a question they cannot yet name.",
    narrative:
      "This is not a portfolio. This is a map of how one person learned to build — from the ground, from nothing, from pure curiosity — and why every tool, every line of code, every system traces back to a single question: \"What if I could make this work?\"",
    visualEra: "Emptiness before the first mark",
    palette: {
      primary: "#c8b89a",
      secondary: "#a89878",
      bg: "#0a0905",
      glow: "rgba(200,184,154,0.15)",
    },
    primitive: "marks",
    fontWeight: 200,
  },
  {
    id: "curiosity",
    index: 1,
    title: "Curiosity",
    subtitle: "Urgut, Samarkand — the beginning",
    opening: "In the countryside, everything was a puzzle without instructions.",
    narrative:
      "Growing up in Urgut District, Samarkand, the world was physical and immediate. Discarded electronics became mysteries to disassemble. Broken radios became laboratories. Every object that stopped working raised the same question: why? And every answer led somewhere unexpected.",
    visualEra: "Scattered marks on empty ground",
    anchor: {
      object: "Discarded materials",
      meaning: "The first instinct to understand by taking apart",
    },
    palette: {
      primary: "#c8a96e",
      secondary: "#a8895e",
      bg: "#0d0a06",
      glow: "rgba(200,169,110,0.15)",
    },
    primitive: "marks",
    fontWeight: 200,
  },
  {
    id: "survival",
    index: 2,
    title: "Survival",
    subtitle: "When curiosity meets constraint",
    opening: "The Samsung Galaxy S3 was not a phone. It was the entire world compressed into a cracked screen.",
    narrative:
      "Without a computer, a battered Samsung Galaxy S3 became the only window to the digital world. Typing code on a phone keyboard, learning from fragmented tutorials on slow connections, building understanding character by character. Constraints didn't stop the learning — they shaped a different kind of discipline.",
    visualEra: "Marks becoming fragments — broken but organized",
    anchor: {
      object: "Samsung Galaxy S3",
      meaning: "Constraint as the first teacher of resourcefulness",
    },
    palette: {
      primary: "#5a8fa8",
      secondary: "#3a6f88",
      bg: "#060a0d",
      glow: "rgba(90,143,168,0.15)",
    },
    primitive: "fragments",
    fontWeight: 300,
  },
  {
    id: "discovery",
    index: 3,
    title: "Discovery",
    subtitle: "A real machine, a real language",
    opening: "The inherited ASUS laptop was slow, heavy, and the most beautiful thing in the world.",
    narrative:
      "An inherited ASUS laptop — slow by any standard — became the first real development machine. Real files. Real terminals. Real debugging. Programming stopped being an abstract idea typed on a phone and became something that compiled, ran, crashed, and taught through every failure.",
    visualEra: "Fragments connecting into lines — the first structure",
    anchor: {
      object: "Inherited ASUS laptop",
      meaning: "The threshold between imagining and building",
    },
    palette: {
      primary: "#6aad72",
      secondary: "#4a8d52",
      bg: "#060d08",
      glow: "rgba(106,173,114,0.15)",
    },
    primitive: "lines",
    fontWeight: 400,
  },
  {
    id: "building",
    index: 4,
    title: "Building",
    subtitle: "From learning to shipping",
    opening: "The first time something you built was used by someone else, building became purpose.",
    narrative:
      "Knowledge became production. Lines of code became products that real people used. Movie Bot taught what it means to ship something into the world. Autotestlar proved that a single builder could create a platform serving over 10,000 users. Building was no longer practice — it was proof.",
    visualEra: "Lines forming into modules — functional structures",
    palette: {
      primary: "#e0622a",
      secondary: "#c0421a",
      bg: "#0d0806",
      glow: "rgba(224,98,42,0.15)",
    },
    primitive: "modules",
    fontWeight: 600,
  },
  {
    id: "opensource",
    index: 5,
    title: "Open Source",
    subtitle: "Building for everyone",
    opening: "The code that matters most is the code you give away.",
    narrative:
      "Hamma emerged as the embodiment of a belief: that powerful tools should not require cloud dependencies, corporate permissions, or surveillance. An AI-powered SSH client, fully local, fully open — built for air-gapped environments where trust is not optional. 746 tests passing. 1,400+ model downloads in 48 hours. Not metrics — proof that open-source conviction meets engineering discipline.",
    visualEra: "Modules connecting into networks — shared systems",
    palette: {
      primary: "#6c4fe0",
      secondary: "#4c2fc0",
      bg: "#08060d",
      glow: "rgba(108,79,224,0.15)",
    },
    primitive: "networks",
    fontWeight: 700,
  },
  {
    id: "ai",
    index: 6,
    title: "Artificial Intelligence",
    subtitle: "Amplifying human capability",
    opening: "AI is not the destination. AI is what makes the next generation of tools possible.",
    narrative:
      "RepoScope puts four AI engineers in adversarial debate over your codebase — not to replace review, but to make review impossible to ignore. HammaDev gives AI coding agents persistent memory that survives handoffs between models. The pattern is consistent: AI that augments human judgment, runs locally, and answers to the builder, not the platform.",
    visualEra: "Networks gaining intelligence — adaptive, responsive",
    palette: {
      primary: "#3d9eff",
      secondary: "#1d7edf",
      bg: "#050810",
      glow: "rgba(61,158,255,0.15)",
    },
    primitive: "intelligence",
    fontWeight: 800,
  },
  {
    id: "future",
    index: 7,
    title: "Future",
    subtitle: "The system is intentionally unfinished",
    opening: "The most honest thing a builder can say is: I am not done yet.",
    narrative:
      "From Stone Age to Cyber Punk is not a tagline — it is a trajectory. The countryside curiosity, the cracked phone screen, the slow laptop, the first shipped product, the open-source conviction, the AI-augmented engineering — they are all one continuous thread. The future is not a destination. The future is the next question that cannot yet be named.",
    visualEra: "Open edges — the system extends beyond the visible",
    palette: {
      primary: "#e8e4dc",
      secondary: "#c8c4bc",
      bg: "#08090f",
      glow: "rgba(232,228,220,0.15)",
    },
    primitive: "openEdges",
    fontWeight: 900,
  },
];

// ─── Capability Milestones (Projects as Discoveries) ─────────────────

export interface Milestone {
  id: string;
  name: string;
  /** Which chapter this milestone appears in */
  chapterId: ChapterId;
  /** Why this exists — the human need, not the tech spec */
  why: string;
  /** What this made possible — the capability it unlocked */
  capability: string;
  /** The proof — concrete evidence */
  proof: string;
  /** Tech stack — secondary to the story */
  stack: string[];
  /** External link */
  link: {
    label: string;
    url: string;
  };
  /** Accent color for this milestone */
  accent: string;
}

export const milestones: Milestone[] = [
  {
    id: "moviebot",
    name: "Movie Bot",
    chapterId: "building",
    why: "Before building for others, you must learn what it means to ship something into the world — to make something that works outside your own machine.",
    capability: "Learning production — understanding deployment, user interaction, and the gap between code that runs and code that serves.",
    proof: "First shipped project. The foundation of everything that followed.",
    stack: ["Python", "Telegram Bot API"],
    link: {
      label: "View on GitHub",
      url: "https://github.com/xayrullonematov",
    },
    accent: "#e0622a",
  },
  {
    id: "autotestlar",
    name: "Autotestlar",
    chapterId: "building",
    why: "In Uzbekistan, preparing for a driving licence test meant outdated materials and no structured practice. The problem was obvious. The solution could serve thousands.",
    capability: "Solving real-world problems — building a product that 10,000+ people rely on, with 1,200+ tests and a sustainable business model.",
    proof: "10,000+ users. 1,200+ tests. 98% success rate. Live at autotestlar.uz with freemium monetization.",
    stack: ["Telegram Mini App", "Web Platform", "Freemium"],
    link: {
      label: "Visit autotestlar.uz",
      url: "https://autotestlar.uz/",
    },
    accent: "#e0622a",
  },
  {
    id: "hamma",
    name: "Hamma",
    chapterId: "opensource",
    why: "Powerful server management tools either require cloud APIs (sending your credentials to someone else's servers) or are too complex for most developers. Neither is acceptable.",
    capability: "Empowering developers — an AI copilot for DevOps that runs entirely on your device with zero telemetry, across every platform.",
    proof: "746/747 tests passing. 1,400+ model downloads in 48 hours. Custom Gemma 4 LoRA model. Cross-platform: Linux, Windows, macOS, Android, iOS.",
    stack: ["Flutter", "Dart FFI", "C++", "Argon2id", "Local LLM"],
    link: {
      label: "View on GitHub",
      url: "https://github.com/xayrullonematov/hamma",
    },
    accent: "#6c4fe0",
  },
  {
    id: "reposcope",
    name: "RepoScope",
    chapterId: "ai",
    why: "Single-prompt AI produces hallucinated consensus. Real engineering review requires adversarial perspectives that challenge assumptions.",
    capability: "Understanding software — four AI engineers that propose, critique, revise, and negotiate structured engineering reviews of your codebase.",
    proof: "Event-sourced multi-agent collaboration. Adversarial critique routing. Built for the Qwen Cloud Global AI Hackathon. Live at reposcope.myrepo.xyz.",
    stack: ["Next.js", "TypeScript", "Prisma", "Zod", "Qwen/DashScope"],
    link: {
      label: "Try RepoScope",
      url: "https://reposcope.myrepo.xyz",
    },
    accent: "#3d9eff",
  },
  {
    id: "hammadev",
    name: "HammaDev",
    chapterId: "ai",
    why: "AI coding agents are powerful but amnesiac. Every new session starts from zero. Repository knowledge, decisions, constraints, and discoveries should persist across agent handoffs.",
    capability: "AI-assisted engineering — persistent memory that turns agent history into evidence-aware execution contracts. Zero cloud. Zero telemetry.",
    proof: "Published on npm. Agent-agnostic handoffs between Codex, Claude Code, and Grok. Immutable task epochs. Git-aware reconciliation.",
    stack: ["TypeScript", "Node.js", "CLI", "Git", "Local-first"],
    link: {
      label: "View on npm",
      url: "https://www.npmjs.com/package/hammadev",
    },
    accent: "#3d9eff",
  },
];

// ─── Site & Contact Info ─────────────────────────────────────────────

export const siteInfo = {
  name: "Xayrillo Ne'matov",
  fullName: "Nematov Xayrillo",
  tagline: "From Stone Age to Cyber Punk",
  location: "Urgut District, Samarkand, Uzbekistan",
  school: "Urgut District Specialized School",
  github: "https://github.com/xayrullonematov",
  githubUser: "xayrullonematov",
  telegram: "https://t.me/xayrullonematov",
  website: "https://xayrullonematov.github.io/",
  ielts: "7.5",
  achievements: [
    "IELTS Academic 7.5",
    "Gemma 4 Good Hackathon entry",
    "1,400+ model downloads in 48 hours",
    "746/747 tests passing",
    "10,000+ users on Autotestlar",
  ],
};

// ─── Future Actions ──────────────────────────────────────────────────

export const futureActions = [
  {
    label: "Explore the work",
    href: "https://github.com/xayrullonematov",
    description: "Browse open-source projects on GitHub",
    icon: "github" as const,
  },
  {
    label: "Use the tools",
    href: "https://www.npmjs.com/package/hammadev",
    description: "Install HammaDev or Hamma",
    icon: "terminal" as const,
  },
  {
    label: "Start building",
    href: "https://github.com/xayrullonematov/hamma",
    description: "Fork, contribute, or extend",
    icon: "code" as const,
  },
  {
    label: "Get in touch",
    href: "https://t.me/xayrullonematov",
    description: "Collaborate on Telegram",
    icon: "message" as const,
  },
];
