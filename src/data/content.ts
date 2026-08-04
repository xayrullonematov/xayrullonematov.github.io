export const site = {
  name: "Xayrullo Nematov",
  shortName: "XN",
  title: "Xayrullo Nematov — AI Engineer & Founder",
  description:
    "AI engineer, open-source developer, and founder of Hamma Labs. Building local-first AI software that ships.",
  url: "https://nematov.com",
  email: "hello@nematov.com",
  location: "Samarkand, Uzbekistan",
  tagline: "Building AI software that ships.",
  subtitle: "AI Engineer · Open Source Developer · Founder of Hamma Labs",
  github: "https://github.com/xayrullonematov",
  githubUser: "xayrullonematov",
  bio: "From Stone Age to Cyber Punk",
};

export const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    id: "hammadev",
    number: "01",
    name: "HammaDev",
    tagline: "Persistent memory for AI coding agents",
    description:
      "Local repository memory that lets you switch between Codex, Claude Code, and Grok without losing decisions, constraints, discoveries, or task history.",
    longDescription:
      "HammaDev turns agent history into an evidence-aware execution contract — durable knowledge, immutable task epochs, git reconciliation, and readiness assessment. No cloud. Zero telemetry.",
    stack: ["TypeScript", "Node.js", "CLI", "Git", "Local-first"],
    github: "https://github.com/xayrullonematov/hammadev",
    demo: null as string | null,
    npm: "https://www.npmjs.com/package/hammadev",
    accent: "#F06F52",
    visual: "memory" as const,
    highlights: [
      "Agent-agnostic handoffs",
      "Immutable task epochs",
      "Git-aware reconciliation",
      "Zero telemetry",
    ],
  },
  {
    id: "hamma",
    number: "02",
    name: "Hamma",
    tagline: "AI-powered SSH client, fully local",
    description:
      "Manage server fleets without writing complex commands. SSH, SFTP, Docker, and services with an embedded AI copilot hard-locked to your device loopback.",
    longDescription:
      "Built for air-gapped and high-trust environments. Includes a fine-tuned DevOps model, visual SFTP, fleet dashboard, and zero-trust security across Linux, Windows, macOS, Android, and iOS.",
    stack: ["Dart", "Flutter", "Local LLM", "SSH/SFTP", "Docker"],
    github: "https://github.com/xayrullonematov/hamma",
    demo: null as string | null,
    npm: null as string | null,
    accent: "#7257E8",
    visual: "terminal" as const,
    highlights: [
      "On-device AI copilot",
      "Zero-trust architecture",
      "Cross-platform fleet control",
      "860+ tests",
    ],
  },
  {
    id: "reposcope",
    number: "03",
    name: "RepoScope",
    tagline: "Four AI engineers argue about your code",
    description:
      "A swarm of 4 specialized AI agents — senior, security, performance, and product — propose, critique, revise, and negotiate a structured engineering review.",
    longDescription:
      "Event-sourced multi-agent collaboration with adversarial critique routing, Zod-validated structured outputs, cost governance, and human-in-the-room directives. Built for the Qwen Cloud Global AI Hackathon.",
    stack: ["Next.js", "TypeScript", "Prisma", "Zod", "Qwen / DashScope"],
    github: "https://github.com/xayrullonematov/RepoScope",
    demo: "https://reposcope.myrepo.xyz",
    npm: null as string | null,
    accent: "#F06F52",
    visual: "swarm" as const,
    highlights: [
      "Adversarial multi-agent debate",
      "Event-sourced sessions",
      "Human-in-the-room directives",
      "Cost-governed inference",
    ],
  },
];

// Core Studio Manifesto & Engineering Principles (Replaces Resume Paragraphs)
export const manifesto = [
  {
    number: "01",
    title: "Local-First by Default",
    description:
      "Software should run where cloud APIs cannot. Your code, server keys, and agent memory belong to your device — hard-locked to loopback with zero telemetry.",
  },
  {
    number: "02",
    title: "Agentic Memory as Contract",
    description:
      "AI coding sessions belong to transient agents. Knowledge belongs to the repository. We build evidence-aware state that outlasts model handoffs.",
  },
  {
    number: "03",
    title: "Adversarial Multi-Agent Swarms",
    description:
      "Single-prompt AI produces hallucinated consensus. We orchestrate specialized agent swarms that critique, audit, and negotiate structured engineering outputs.",
  },
];

export const skillGroups = [
  {
    title: "AI Systems",
    skills: [
      "Multi-agent orchestration",
      "Local LLM inference",
      "Agent memory & handoffs",
      "Structured outputs / Zod",
    ],
  },
  {
    title: "Engineering",
    skills: [
      "TypeScript / Node.js",
      "Next.js / React",
      "Dart / Flutter",
      "Python / Event Sourcing",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "Docker / Containers",
      "SSH / SFTP Systems",
      "GitOps Workflows",
      "Zero-Trust Design",
    ],
  },
  {
    title: "Craft",
    skills: [
      "Product Design Sense",
      "Open-Source DX",
      "Hackathon Shipping",
      "Performance Budgets",
    ],
  },
];

export const stats = [
  { value: "3+", label: "Flagship Products" },
  { value: "Local", label: "First by Design" },
  { value: "0", label: "Telemetry Sent" },
  { value: "OSS", label: "Default License" },
];
