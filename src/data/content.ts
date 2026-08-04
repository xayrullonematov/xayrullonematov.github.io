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
  { label: "Open Source", href: "#open-source" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    id: "hammadev",
    number: "01",
    name: "HammaDev",
    tagline: "Persistent memory for AI coding agents",
    description:
      "Local repository memory that lets you switch between Codex, Claude Code, and Grok without losing decisions, constraints, discoveries, or task history. Sessions belong to agents. Memory belongs to the project.",
    longDescription:
      "HammaDev turns agent history into an evidence-aware execution contract — durable knowledge, immutable task epochs, git reconciliation, and readiness assessment. No cloud. No telemetry. Trust the repository when handoffs conflict with live state.",
    stack: ["TypeScript", "Node.js", "CLI", "Git", "Local-first"],
    github: "https://github.com/xayrullonematov/hammadev",
    demo: null as string | null,
    npm: "https://www.npmjs.com/package/hammadev",
    accent: "#6C63FF",
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
      "Manage servers without writing a single command. SSH, SFTP, Docker, processes, and services — with an embedded AI copilot that runs entirely on your device. Your fleet, your keys, your AI.",
    longDescription:
      "Built for air-gapped and high-trust environments. AI traffic is hard-locked to loopback. Includes a fine-tuned DevOps model, visual SFTP, fleet dashboard, and zero-trust security across Linux, Windows, macOS, Android, and iOS.",
    stack: ["Dart", "Flutter", "Local LLM", "SSH/SFTP", "Docker"],
    github: "https://github.com/xayrullonematov/hamma",
    demo: null as string | null,
    npm: null as string | null,
    accent: "#00D4AA",
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
      "Point it at a GitHub repository and a swarm of specialized agents — senior, security, performance, and product — propose, critique, revise, and negotiate a structured engineering review. Not a chatbot. A design room.",
    longDescription:
      "Event-sourced multi-agent collaboration with adversarial critique routing, Zod-validated structured outputs, cost governance, and human-in-the-room directives. Built for the Qwen Cloud Global AI Hackathon — Agent Society track.",
    stack: ["Next.js", "TypeScript", "Prisma", "Zod", "Qwen / DashScope"],
    github: "https://github.com/xayrullonematov/RepoScope",
    demo: "https://reposcope.myrepo.xyz",
    npm: null as string | null,
    accent: "#A78BFA",
    visual: "swarm" as const,
    highlights: [
      "Adversarial multi-agent debate",
      "Event-sourced sessions",
      "Human-in-the-room directives",
      "Cost-governed inference",
    ],
  },
];

export const repositories = [
  {
    name: "hammadev",
    description:
      "Persistent, local repository memory for AI coding agents across Codex, Claude, and Grok.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 3,
    url: "https://github.com/xayrullonematov/hammadev",
  },
  {
    name: "RepoScope",
    description:
      "Multi-agent engineering room where four AI specialists negotiate structured code reviews.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 3,
    url: "https://github.com/xayrullonematov/RepoScope",
  },
  {
    name: "hamma",
    description:
      "Local-first AI SSH client for fleet management with zero telemetry.",
    language: "Dart",
    languageColor: "#00B4AB",
    stars: 2,
    url: "https://github.com/xayrullonematov/hamma",
  },
  {
    name: "OverTheWire",
    description: "Hands-on security and systems practice through OverTheWire challenges.",
    language: "Shell",
    languageColor: "#89e051",
    stars: 3,
    url: "https://github.com/xayrullonematov/OverTheWire",
  },
  {
    name: "bunker",
    description: "Python-based systems tooling and infrastructure experiments.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1,
    url: "https://github.com/xayrullonematov/bunker",
  },
  {
    name: "xayrullonematov",
    description: "Profile README — From Stone Age to Cyber Punk.",
    language: "Markdown",
    languageColor: "#083fa1",
    stars: 2,
    url: "https://github.com/xayrullonematov/xayrullonematov",
  },
];

export const about = {
  paragraphs: [
    "I build AI products that stay useful after the demo ends — local-first tools, multi-agent systems, and developer infrastructure designed for real constraints: privacy, offline environments, and shipping software that engineers actually trust.",
    "Through Hamma Labs I ship open-source systems that treat agents as collaborators with memory, evidence, and boundaries. HammaDev preserves project state across tools. Hamma keeps server operations on-device. RepoScope turns code review into structured multi-agent negotiation.",
    "I learn in public: hackathons, security labs, and continuous shipping. The through-line is craft — software that feels deliberate, private by default, and ready to run where cloud APIs cannot.",
  ],
  facts: [
    { label: "Focus", value: "Local-first AI systems" },
    { label: "Studio", value: "Hamma Labs" },
    { label: "Based in", value: "Samarkand, UZ" },
    { label: "Mode", value: "Open source + products" },
  ],
};

export const skillGroups = [
  {
    title: "AI Systems",
    skills: [
      "Multi-agent orchestration",
      "Local LLM inference",
      "Agent memory & handoffs",
      "Structured outputs / Zod",
      "Prompt & context engineering",
      "RAG & evidence pipelines",
    ],
  },
  {
    title: "Engineering",
    skills: [
      "TypeScript / Node.js",
      "Next.js / React",
      "Dart / Flutter",
      "Python",
      "Event sourcing",
      "CLI tooling",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "Git & GitOps workflows",
      "Docker / containers",
      "SSH / SFTP systems",
      "Prisma / Postgres",
      "Cloud deployment (ECS)",
      "Security & zero-trust design",
    ],
  },
  {
    title: "Craft",
    skills: [
      "Product design sense",
      "Technical writing",
      "Open-source DX",
      "Hackathon shipping",
      "Test-driven rigor",
      "Performance budgets",
    ],
  },
];

export const experience = [
  {
    year: "2026",
    title: "Founder — Hamma Labs",
    description:
      "Building local-first AI developer tools: HammaDev for agent memory, Hamma for private server operations, and a growing open-source surface for agentic workflows.",
    tags: ["Founder", "Open Source", "AI"],
  },
  {
    year: "2026",
    title: "Qwen Cloud Global AI Hackathon",
    description:
      "RepoScope — multi-agent engineering room for Track 3: Agent Society. Four specialized agents negotiate structured reviews with adversarial critique routing and event-sourced sessions.",
    tags: ["Hackathon", "Multi-Agent", "Qwen"],
  },
  {
    year: "2026",
    title: "Kiro Birthday Challenge",
    description:
      "Shipped Human-in-the-Room Directives for RepoScope — making the human a first-class fifth engineer in the shared agent context with auditable directive flow.",
    tags: ["Challenge", "DX", "Agents"],
  },
  {
    year: "2025–26",
    title: "Open Source & Systems Practice",
    description:
      "Continuous shipping across TypeScript, Dart, and Python. Security labs via OverTheWire, infrastructure experiments, and public product development from Samarkand.",
    tags: ["Learning", "Security", "Build"],
  },
];

export const stats = [
  { value: "3+", label: "Flagship products" },
  { value: "9", label: "Public repositories" },
  { value: "Local", label: "First by design" },
  { value: "OSS", label: "Default license" },
];
