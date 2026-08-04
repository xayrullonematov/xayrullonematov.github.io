"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MemoryVisual = () => {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-8">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <motion.path
          d="M100,100 L200,150 M300,100 L200,150 M100,250 L200,150 M300,250 L200,150"
          stroke="var(--accent-glow)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle cx="200" cy="150" r="40" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: "spring" }} />
        <motion.circle cx="100" cy="100" r="20" fill="var(--surface-elevated)" stroke="rgba(255,255,255,0.1)" strokeWidth="2"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} />
        <motion.circle cx="300" cy="100" r="20" fill="var(--surface-elevated)" stroke="rgba(255,255,255,0.1)" strokeWidth="2"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} />
        <motion.circle cx="100" cy="250" r="20" fill="var(--surface-elevated)" stroke="rgba(255,255,255,0.1)" strokeWidth="2"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} />
        <motion.circle cx="300" cy="250" r="20" fill="var(--surface-elevated)" stroke="rgba(255,255,255,0.1)" strokeWidth="2"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} />
      </svg>
      <div className="absolute text-[10px] mono text-white/50 top-[70px] left-[85px]">Codex</div>
      <div className="absolute text-[10px] mono text-white/50 top-[70px] right-[85px]">Claude</div>
      <div className="absolute text-[10px] mono text-[var(--accent)] top-[143px] font-bold">Memory</div>
      <div className="absolute text-[10px] mono text-white/50 bottom-[70px] left-[90px]">Grok</div>
      <div className="absolute text-[10px] mono text-white/50 bottom-[70px] right-[85px]">Epoch</div>
    </div>
  );
};

const TerminalVisual = () => {
  const lines = [
    "[INFO] Initializing secure host...",
    "[OK] Key exchange complete",
    "[SYS] Starting Hamma background daemon",
    "> Forwarding local ports [8080:443]",
    "> Tunnel active. Agent listening."
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col justify-center relative">
      <div className="w-full max-w-sm mx-auto bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
        <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <div className="ml-2 text-[10px] mono text-white/30">hamma-server ~ bash</div>
        </div>
        <div className="p-4 font-mono text-xs sm:text-sm text-green-400/80 space-y-2">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 }}
            >
              {line}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: lines.length * 0.3 }}
            className="flex items-center gap-2"
          >
            <span className="text-white/50">$</span>
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-white/70"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SwarmVisual = () => {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-8">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <motion.path
          d="M150,120 Q200,80 250,120 T200,200 T150,120"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
        <motion.circle cx="200" cy="150" r="60" fill="var(--accent-soft)" className="opacity-20 blur-xl" />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="absolute -top-4 -left-4 bg-surface-elevated border border-white/10 rounded-md p-3 shadow-lg flex items-center gap-3"
          initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        >
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <span className="text-xs font-mono text-white/80">Agent: Architect</span>
        </motion.div>
        
        <motion.div 
          className="absolute top-12 -right-8 bg-surface-elevated border border-white/10 rounded-md p-3 shadow-lg flex items-center gap-3"
          initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        >
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
          <span className="text-xs font-mono text-white/80">Agent: Critic</span>
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-8 bg-surface-elevated border border-white/10 rounded-md p-3 shadow-lg flex items-center gap-3"
          initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-xs font-mono text-white/80">Agent: Coder</span>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[var(--accent)]"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }}
      >
        consensus · round 3
      </motion.div>
    </div>
  );
};

export const ProjectVisual = ({ type, className }: { type: string, accent?: string, className?: string }) => {
  return (
    <div 
      className={cn(
        "w-full h-full rounded-2xl border border-white/5 bg-gradient-to-b from-[#111] to-[#050505] relative overflow-hidden group",
        className
      )}
      data-cursor="hover"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Dynamic accent glow based on type */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[var(--accent)]/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {type === 'memory' && <MemoryVisual />}
      {type === 'terminal' && <TerminalVisual />}
      {type === 'swarm' && <SwarmVisual />}
      
      {/* Bottom shadow gradient */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
    </div>
  );
};
