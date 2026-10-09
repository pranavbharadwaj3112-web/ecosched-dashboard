import React, { useState } from 'react';
import { Cpu, CloudSun, BrainCircuit, Zap, ArrowRight, CheckCircle2, ChevronRight, Layers, Database, ShieldAlert } from 'lucide-react';
import { PIPELINE_STEPS } from '../../data/paperData';

const STEP_ICONS = {
  Cpu: Cpu,
  CloudSun: CloudSun,
  BrainCircuit: BrainCircuit,
  Zap: Zap
};

export default function ArchitecturePipeline() {
  const [activeStepId, setActiveStepId] = useState(1);
  const activeStep = PIPELINE_STEPS.find(s => s.id === activeStepId) || PIPELINE_STEPS[0];

  return (
    <div className="glass-card rounded-2xl p-6 border border-gray-800 bg-slate-900/90 mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>End-to-End Orchestration Pipeline</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">System Architecture & Pipeline Flow</h3>
        </div>

        <span className="mt-2 sm:mt-0 text-xs font-mono px-3 py-1 rounded-full bg-slate-950 text-emerald-400 border border-emerald-500/30">
          4-Stage Synchronous Pipeline
        </span>
      </div>

      {/* Interactive 4-Step Flow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 relative">
        {PIPELINE_STEPS.map((step) => {
          const Icon = STEP_ICONS[step.icon] || Cpu;
          const isActive = step.id === activeStepId;

          return (
            <div
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                isActive
                  ? 'border-emerald-500 bg-emerald-950/20 glow-emerald scale-[1.02]'
                  : 'border-gray-800 bg-slate-950/60 hover:border-gray-700 hover:bg-slate-950'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  isActive ? 'bg-emerald-500 text-slate-950' : 'bg-gray-800 text-gray-400'
                }`}>
                  0{step.id}
                </span>
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`} />
              </div>

              <h4 className="font-bold text-sm text-white">{step.title}</h4>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{step.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Selected Step Inspector Box */}
      <div className="p-5 rounded-xl bg-slate-950 border border-gray-800/80">
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-semibold mb-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Stage 0{activeStep.id} Telemetry & Payload Inspector</span>
        </div>

        <h4 className="text-lg font-bold text-white">{activeStep.title}</h4>
        <p className="text-xs text-gray-300 mt-2 leading-relaxed">{activeStep.detail}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-800/80">
          
          {/* Inputs */}
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
              Input Vectors & Telemetry Streams
            </span>
            <div className="space-y-1.5">
              {activeStep.inputs.map((inp, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-cyan-300 bg-cyan-950/30 px-3 py-1.5 rounded border border-cyan-500/20">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{inp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outputs */}
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
              Stage Output Artifacts & Control Directives
            </span>
            <div className="space-y-1.5">
              {activeStep.outputs.map((out, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-emerald-300 bg-emerald-950/30 px-3 py-1.5 rounded border border-emerald-500/20">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
