"use client";

import { cn } from "@/lib/utils";

// HammaDev Custom UI Component: Authentic Persistent Agent Memory IDE
function HammaDevUI() {
  return (
    <div className="w-full h-full bg-[#0d1117] text-slate-200 font-mono text-xs flex flex-col justify-between select-none">
      {/* Window Chrome */}
      <div className="h-8 bg-[#161b22] border-b border-slate-800 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] text-slate-400 font-sans font-medium">HammaDev — Local Agent Memory</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-semibold">ZERO TELEMETRY</span>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left File Tree */}
        <div className="col-span-4 border-r border-slate-800/80 bg-[#0d1117] p-2.5 space-y-1.5 hidden sm:block">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Project Files</div>
          <div className="flex items-center gap-1.5 text-slate-300 font-sans text-[11px] bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50">
            <span className="text-amber-400 font-mono text-xs">TS</span> AgentMemory.ts
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-sans text-[11px] px-2 py-1">
            <span className="text-blue-400 font-mono text-xs">PY</span> hamma_engine.py
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-sans text-[11px] px-2 py-1">
            <span className="text-green-400 font-mono text-xs">JSON</span> memory_epochs.json
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Active Handoff</div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-300 bg-emerald-500/10 px-2 py-1 rounded">
                <span>Codex</span> <span className="text-emerald-400">Epoch 11 ✓</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-300 bg-amber-500/10 px-2 py-1 rounded">
                <span>Claude 3.7</span> <span className="text-amber-400">Epoch 12 →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Task & Epoch Inspector */}
        <div className="col-span-12 sm:col-span-8 p-3 flex flex-col justify-between bg-[#11161d]">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] text-slate-400">Memory State: <strong className="text-emerald-400 font-mono">Durable</strong></span>
              <span className="text-[10px] text-slate-500">Hash: 8f9d4b...</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0d1117] border border-slate-800/80 font-mono text-[10px] space-y-1 text-slate-300">
              <div className="text-slate-500">{`// Task Epoch #12 — Agent Handoff Contract`}</div>
              <div><span className="text-purple-400">{`"agent"`}</span>: <span className="text-emerald-300">{`"Claude 3.7 Sonnet"`}</span>,</div>
              <div><span className="text-purple-400">{`"action"`}</span>: <span className="text-emerald-300">{`"Reconcile Git diff & constraints"`}</span>,</div>
              <div><span className="text-purple-400">{`"telemetry"`}</span>: <span className="text-rose-400">false</span>,</div>
              <div><span className="text-purple-400">{`"handOffStatus"`}</span>: <span className="text-emerald-400">{`"SUCCESS"`}</span></div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
            <span className="text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Git reconciliation active
            </span>
            <span className="text-slate-500">No cloud sync needed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hamma Custom UI Component: Authentic Desktop SSH & Local AI Fleet Client
function HammaUI() {
  return (
    <div className="w-full h-full bg-[#090d14] text-slate-200 font-mono text-xs flex flex-col justify-between select-none">
      {/* Window Header */}
      <div className="h-8 bg-[#0f1520] border-b border-slate-800 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] text-slate-400 font-sans font-medium">Hamma — Local AI SSH Fleet</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-semibold">AIR-GAPPED</span>
      </div>

      {/* Fleet Overview & Terminal */}
      <div className="flex-1 p-3 grid grid-cols-12 gap-3 overflow-hidden bg-[#070a0f]">
        {/* Left Server Fleet Cards */}
        <div className="col-span-5 space-y-2 hidden sm:block">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Fleet Nodes</div>
          <div className="p-2 rounded-lg bg-[#0e1420] border border-emerald-500/30 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> alpha.hamma.local
              </span>
              <span className="text-[9px] text-emerald-400">ONLINE</span>
            </div>
            <div className="text-[9px] text-slate-400 flex justify-between">
              <span>CPU 82%</span> <span>RAM 12.4GB</span> <span>Linux</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#0e1420] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> delta.hamma.ai
              </span>
              <span className="text-[9px] text-slate-400">AIR-GAPPED</span>
            </div>
            <div className="text-[9px] text-slate-400 flex justify-between">
              <span>CPU 34%</span> <span>RAM 8.1GB</span> <span>Linux</span>
            </div>
          </div>
        </div>

        {/* Right Embedded Terminal & Local AI Copilot */}
        <div className="col-span-12 sm:col-span-7 flex flex-col justify-between bg-[#0b0f17] p-2.5 rounded-lg border border-slate-800">
          <div className="space-y-1 font-mono text-[10px] text-emerald-400/90">
            <div><span className="text-slate-500">hamma@alpha:~$</span> uptime</div>
            <div className="text-slate-400"> 15:42:01 up 42 days, 3 users, load avg: 0.82</div>
            <div><span className="text-slate-500">hamma@alpha:~$</span> hamma-ai inspect --cpu</div>
            <div className="text-blue-400">[LOCAL LLM] Analyzing process load on alpha...</div>
          </div>

          {/* AI Input Box */}
          <div className="mt-3 p-2 rounded bg-[#101724] border border-blue-500/30 flex items-center justify-between">
            <span className="text-[10px] text-slate-300 font-sans">{`Ask Hamma: "Diagnose CPU spike on node alpha"`}</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[9px]">LOCAL LLM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// RepoScope Custom UI Component: Authentic Multi-Agent Code Review Room
function RepoScopeUI() {
  return (
    <div className="w-full h-full bg-[#0f0e17] text-slate-200 font-mono text-xs flex flex-col justify-between select-none">
      {/* Header */}
      <div className="h-8 bg-[#171523] border-b border-slate-800 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] text-slate-400 font-sans font-medium">RepoScope — Multi-Agent Review #124</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[9px] font-semibold">QWEN HACKATHON</span>
      </div>

      {/* 4 Agent Swarm Grid */}
      <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0c0b13]">
        <div className="p-2 rounded bg-[#151322] border border-purple-500/30 space-y-0.5">
          <div className="text-[10px] font-semibold text-purple-300">Senior Architect</div>
          <div className="text-[9px] text-slate-400">Score: 94%</div>
        </div>
        <div className="p-2 rounded bg-[#151322] border border-emerald-500/30 space-y-0.5">
          <div className="text-[10px] font-semibold text-emerald-300">Security Auditor</div>
          <div className="text-[9px] text-slate-400">Assertions: 12</div>
        </div>
        <div className="p-2 rounded bg-[#151322] border border-blue-500/30 space-y-0.5">
          <div className="text-[10px] font-semibold text-blue-300">Performance</div>
          <div className="text-[9px] text-slate-400">Budget: OK</div>
        </div>
        <div className="p-2 rounded bg-[#151322] border border-amber-500/30 space-y-0.5">
          <div className="text-[10px] font-semibold text-amber-300">Product Lead</div>
          <div className="text-[9px] text-slate-400">DX: Positive</div>
        </div>
      </div>

      {/* Code Review Diff Panel */}
      <div className="flex-1 mx-3 mb-3 p-2.5 rounded-lg bg-[#12101d] border border-slate-800 font-mono text-[10px] space-y-1">
        <div className="text-slate-500 border-b border-slate-800 pb-1">Reviewing Diff: src/agent/context.ts</div>
        <div className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded">+ const memory = await initLocalMemoryEpoch();</div>
        <div className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded">+ const consensus = await swarm.negotiate(codeDiff);</div>
        <div className="text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded">{`- fetch("https://telemetry.cloud/analytics");`}</div>
      </div>
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
