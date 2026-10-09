import React, { useState, useEffect } from 'react';
import { Leaf, Award, ArrowUpRight, Cpu, ShieldCheck, Globe, Zap, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { PAPER_METADATA, AGGREGATE_BENCHMARKS } from '../data/paperData';

export default function HeroSection({ onOpenPaperModal, onOpenCodeModal, cumulativeCo2SavedKg }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className="relative pt-10 pb-12 overflow-hidden bg-grid-pattern">
      {/* Radial ambient background light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>ACM SIGCOMM 2026 Peer-Reviewed Paper</span>
          </span>

          {PAPER_METADATA.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-900/90 text-gray-300 border border-gray-800">
              {tag}
            </span>
          ))}
        </div>

        {/* Paper Title */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            EcoSched: <span className="text-gradient-emerald-cyan">Carbon-Aware</span> Dynamic Workload Orchestration
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-3xl mx-auto">
            {PAPER_METADATA.abstract}
          </p>

          {/* Authors */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-400 font-mono">
            {PAPER_METADATA.authors.map((author, i) => (
              <span key={i} className="hover:text-emerald-400 transition-colors cursor-default">
                {author} {i < PAPER_METADATA.authors.length - 1 ? '•' : ''}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#simulator"
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-emerald-950/50 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-current" />
              <span>Launch Live Simulator</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>

            <button
              onClick={onOpenPaperModal}
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-gray-900/90 hover:bg-gray-800 text-gray-200 border border-gray-700/80 transition-all flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Read Full Paper</span>
            </button>

            <button
              onClick={onOpenCodeModal}
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-gray-900/90 hover:bg-gray-800 text-gray-200 border border-gray-700/80 transition-all flex items-center space-x-2"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>View DRL Architecture</span>
            </button>
          </div>
        </div>

        {/* Live Aggregate Benchmarks Ticker Bar */}
        <div className="mt-12 glass-card rounded-2xl p-4 sm:p-6 border border-emerald-500/20 bg-slate-900/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/10 border-b border-l border-emerald-500/30 text-[10px] font-mono text-emerald-400 rounded-bl-lg flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>REAL-TIME AGGREGATE TELEMETRY</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-800/80">
            
            {AGGREGATE_BENCHMARKS.map((item, idx) => (
              <div key={idx} className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}>
                <div className="text-2xl sm:text-4xl font-extrabold font-mono tracking-tight text-white flex items-center justify-center space-x-1">
                  <span className={item.highlight ? 'text-gradient-emerald-cyan' : 'text-cyan-400'}>
                    {item.value}
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-300 mt-1">{item.label}</div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5">{item.unit}</div>
              </div>
            ))}

          </div>

          {/* Live Cumulative Counter Strip */}
          <div className="mt-6 pt-4 border-t border-gray-800/80 flex flex-wrap items-center justify-between text-xs text-gray-400 font-mono px-2">
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Cumulative Simulated CO₂ Avoided:</span>
              <span className="text-emerald-400 font-bold text-sm bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                {cumulativeCo2SavedKg.toFixed(2)} kg CO₂
              </span>
            </div>

            <div className="flex items-center space-x-3 mt-2 sm:mt-0">
              <span className="flex items-center space-x-1 text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero SLA Breaches</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-gray-400">
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>4 Active Grid Feeds</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
