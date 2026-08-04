"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// HammaDev Custom Interactive Desktop UI Component
function HammaDevUI() {
  const [activeTab, setActiveTab] = useState<"handoff" | "git" | "epoch">("handoff");

  return (
    <div className="w-full h-full bg-[#0b0e14] text-slate-200 font-mono text-xs flex flex-col justify-between select-none relative overflow-hidden">
      {/* Realistic macOS Window Chrome & Interactive Tab Bar */}
      <div className="h-9 bg-[#121620] border-b border-slate-800/80 flex items-center justify-between px-3 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
          </div>

          {/* Interactive Feature View Switcher */}
          <div className="flex items-center gap-1 bg-[#090b10] p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("handoff")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "handoff" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Handoff Timeline
            </button>
            <button
              onClick={() => setActiveTab("git")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "git" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Git Tree
            </button>
            <button
              onClick={() => setActiveTab("epoch")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "epoch" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Epoch Contract
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-mono border border-emerald-500/20">
            LOCAL ENGINE
          </span>
        </div>
      </div>

      {/* Main Screen Content Area */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden bg-[#080b10]">
        
        {/* Sidebar */}
        <div className="col-span-4 border-r border-slate-800/80 bg-[#0c0f17] p-3 space-y-3 hidden sm:block">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Active Repository</div>
          <div className="p-2 rounded bg-[#101420] border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
            <span className="font-sans font-medium">hammadev / main</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>

          <div className="pt-2 border-t border-slate-800/60 space-y-1 text-[11px]">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Supported Agents</div>
            <div className="flex justify-between items-center text-slate-400 px-2 py-1 bg-slate-800/30 rounded">
              <span>Codex CLI</span> <span className="text-emerald-400 text-[9px]">Synced</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 px-2 py-1 bg-slate-800/30 rounded">
              <span>Claude 3.7</span> <span className="text-amber-400 text-[9px]">Active</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 px-2 py-1 bg-slate-800/30 rounded">
              <span>Grok 3</span> <span className="text-blue-400 text-[9px]">Ready</span>
            </div>
          </div>
        </div>

        {/* Dynamic Inner Tab Screen View */}
        <div className="col-span-12 sm:col-span-8 p-4 flex flex-col justify-between bg-[#0b0e14]">
          {activeTab === "handoff" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-2">
                <span>Agent Handoff Chain</span>
                <span className="text-emerald-400 font-mono text-[10px]">Zero Telemetry</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-[#111520] border border-emerald-500/30 text-[11px] flex items-center justify-between">
                  <span className="text-slate-300 font-medium">1. Codex → Local Memory Draft</span>
                  <span className="text-emerald-400 text-[10px]">Epoch #11</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#111520] border border-amber-500/40 text-[11px] flex items-center justify-between">
                  <span className="text-slate-200 font-medium">2. Claude 3.7 → Reconcile & Verify</span>
                  <span className="text-amber-400 text-[10px]">Epoch #12 (Active)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "git" && (
            <div className="space-y-2 font-mono text-[10px] text-slate-300">
              <div className="text-slate-500 border-b border-slate-800 pb-1">{`// Git Reconciliation Tree`}</div>
              <div className="text-emerald-400">+ commit a8f9d4b (main) — Reconcile agent task memory</div>
              <div className="text-slate-400">  └─ epoch_12.json: 4 discoveries, 0 telemetry calls</div>
              <div className="text-slate-400">  └─ local_state.db: verified by git tree diff</div>
            </div>
          )}

          {activeTab === "epoch" && (
            <div className="p-3 rounded-lg bg-[#07090e] border border-slate-800 font-mono text-[10px] space-y-1 text-slate-300">
              <div className="text-slate-500">{`// Immutable Execution Contract`}</div>
              <div><span className="text-purple-400">{`"agent"`}</span>: <span className="text-emerald-300">{`"Claude 3.7 Sonnet"`}</span>,</div>
              <div><span className="text-purple-400">{`"telemetry"`}</span>: <span className="text-rose-400">false</span>,</div>
              <div><span className="text-purple-400">{`"gitTree"`}</span>: <span className="text-emerald-400">{`"CLEAN_RECONCILED"`}</span></div>
            </div>
          )}

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span>HammaDev v1.2.0</span>
            <span className="text-accent">Local-first by design</span>
          </div>
        </div>
      </div>

      {/* Glass Glare Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}

// Hamma Custom Interactive Desktop UI Component
function HammaUI() {
  const [activeTab, setActiveTab] = useState<"fleet" | "terminal" | "security">("fleet");

  return (
    <div className="w-full h-full bg-[#080b10] text-slate-200 font-mono text-xs flex flex-col justify-between select-none relative overflow-hidden">
      {/* macOS Window Chrome & Tab Bar */}
      <div className="h-9 bg-[#0e1219] border-b border-slate-800/80 flex items-center justify-between px-3 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
          </div>

          <div className="flex items-center gap-1 bg-[#06080d] p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("fleet")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "fleet" ? "bg-purple-500/20 text-purple-300 font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Fleet Manager
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "terminal" ? "bg-purple-500/20 text-purple-300 font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              AI Terminal
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "security" ? "bg-purple-500/20 text-purple-300 font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Zero-Trust
            </button>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[9px] font-mono border border-purple-500/20">
          AIR-GAPPED
        </span>
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-3.5 bg-[#05070c] overflow-hidden flex flex-col justify-between">
        {activeTab === "fleet" && (
          <div className="grid grid-cols-12 gap-3 h-full">
            <div className="col-span-12 sm:col-span-6 space-y-2">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Active Fleet Nodes</div>
              <div className="p-2.5 rounded-lg bg-[#0b0f17] border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> alpha.hamma.local
                  </span>
                  <span className="text-[9px] text-emerald-400">ONLINE</span>
                </div>
                <div className="text-[9px] text-slate-400 flex justify-between pt-1 border-t border-slate-800/50">
                  <span>CPU 82%</span> <span>RAM 12.4GB</span> <span>Linux x86_64</span>
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 space-y-2">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">SFTP File Tree</div>
              <div className="p-2.5 rounded-lg bg-[#0b0f17] border border-slate-800 text-[10px] text-slate-300 space-y-1">
                <div className="text-emerald-400 font-semibold">/var/www/hamma-fleet/</div>
                <div className="pl-2 text-slate-400">├─ config.yaml</div>
                <div className="pl-2 text-slate-400">└─ server_log.txt</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="space-y-1.5 font-mono text-[10px] text-emerald-400/90 bg-[#090d14] p-3 rounded-lg border border-slate-800 h-full flex flex-col justify-between">
            <div className="space-y-1">
              <div><span className="text-slate-500">hamma@alpha:~$</span> uptime</div>
              <div className="text-slate-400"> 16:08:00 up 42 days, load avg: 0.82</div>
              <div><span className="text-slate-500">hamma@alpha:~$</span> hamma-copilot --inspect</div>
              <div className="text-purple-400">[ON-DEVICE LLM] Loopback port 127.0.0.1:8080 locked. Zero cloud traffic.</div>
            </div>

            <div className="p-2 rounded bg-[#101622] border border-purple-500/30 flex items-center justify-between">
              <span className="text-[10px] text-slate-300 font-sans">{`Ask Copilot: "Diagnose CPU spike on node alpha"`}</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px]">LOCAL LLM</span>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-2 p-3 bg-[#090d14] rounded-lg border border-slate-800 text-[10px] text-slate-300">
            <div className="text-purple-300 font-semibold border-b border-slate-800 pb-1">Zero-Trust Security Matrix</div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Loopback Hard-Lock</span> <span className="text-emerald-400">ACTIVE (127.0.0.1)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Telemetry Collection</span> <span className="text-rose-400">BLOCKED (0 bytes)</span>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
          <span>Hamma AI SSH Client</span>
          <span className="text-purple-400 font-semibold">Flutter / Dart + Local LLM</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}

// RepoScope Custom Interactive Desktop UI Component
function RepoScopeUI() {
  const [activeTab, setActiveTab] = useState<"agents" | "diff" | "consensus">("agents");

  return (
    <div className="w-full h-full bg-[#0a0812] text-slate-200 font-mono text-xs flex flex-col justify-between select-none relative overflow-hidden">
      {/* macOS Window Chrome & Tab Bar */}
      <div className="h-9 bg-[#120f1f] border-b border-slate-800/80 flex items-center justify-between px-3 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
          </div>

          <div className="flex items-center gap-1 bg-[#07050d] p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("agents")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "agents" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              4-Agent Swarm
            </button>
            <button
              onClick={() => setActiveTab("diff")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "diff" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Adversarial Diff
            </button>
            <button
              onClick={() => setActiveTab("consensus")}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-colors",
                activeTab === "consensus" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Consensus Room
            </button>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[9px] font-mono border border-purple-500/20">
          QWEN HACKATHON
        </span>
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-3.5 bg-[#07050d] overflow-hidden flex flex-col justify-between">
        {activeTab === "agents" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-lg bg-[#130f21] border border-purple-500/30 space-y-1">
              <div className="text-[10px] font-semibold text-purple-300">Senior Architect</div>
              <div className="text-[9px] text-slate-400">Confidence: 94%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#130f21] border border-emerald-500/30 space-y-1">
              <div className="text-[10px] font-semibold text-emerald-300">Security Auditor</div>
              <div className="text-[9px] text-slate-400">Assertions: 12 Pass</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#130f21] border border-blue-500/30 space-y-1">
              <div className="text-[10px] font-semibold text-blue-300">Performance</div>
              <div className="text-[9px] text-slate-400">Memory: Budget OK</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#130f21] border border-amber-500/30 space-y-1">
              <div className="text-[10px] font-semibold text-amber-300">Product Lead</div>
              <div className="text-[9px] text-slate-400">DX: High Impact</div>
            </div>
          </div>
        )}

        {activeTab === "diff" && (
          <div className="p-3 rounded-lg bg-[#0e0b17] border border-slate-800 font-mono text-[10px] space-y-1">
            <div className="text-slate-500 border-b border-slate-800 pb-1">Reviewing Diff: src/swarm/negotiation.ts</div>
            <div className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded">+ const consensus = await swarm.critique(agentDiff);</div>
            <div className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded">+ const directive = await humanInTheRoom.sign();</div>
            <div className="text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded">{`- fetch("https://unverified-telemetry.com");`}</div>
          </div>
        )}

        {activeTab === "consensus" && (
          <div className="p-3 bg-[#0e0b17] rounded-lg border border-slate-800 text-[10px] text-slate-300 space-y-1.5">
            <div className="text-accent font-semibold border-b border-slate-800 pb-1">Review Consensus Status</div>
            <div className="flex justify-between items-center">
              <span>Human Directive Status</span> <span className="text-emerald-400">APPROVED (1st Class)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Negotiation Rounds</span> <span className="text-slate-400">3 Rounds</span>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
          <span>RepoScope Swarm Review</span>
          <span className="text-accent font-semibold">Qwen DashScope Agent Society</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}

export function ProjectVisual({
  type,
  className,
}: {
  type: "memory" | "terminal" | "swarm" | string;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 glass-panel shadow-2xl transition-all duration-500 hover:border-accent/40",
        className
      )}
      data-cursor="hover"
    >
      {type === "memory" && <HammaDevUI />}
      {type === "terminal" && <HammaUI />}
      {type === "swarm" && <RepoScopeUI />}
    </div>
  );
}
