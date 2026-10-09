import React from 'react';
import { Sliders, Zap, ShieldAlert, Clock, Cpu, Flame, Sun, Wind, Database, PlayCircle, Loader2 } from 'lucide-react';

export default function ControlPanel({
  mode,
  setMode,
  workloadDemand,
  setWorkloadDemand,
  slaBound,
  setSlaBound,
  delayTolerance,
  setDelayTolerance,
  workloadSource = 'synthetic',
  setWorkloadSource,
  onReplayTrace,
  isReplayingTrace = false,
  onTriggerSurge,
  onApplyPreset,
  isSurging
}) {
  const isGoogleTrace = workloadSource === 'google_trace';

  return (
    <div className="glass-card rounded-2xl p-5 border border-gray-800 bg-slate-900/90 flex flex-col justify-between h-full">
      <div>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white font-mono">Control Panel</h3>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-800 text-emerald-400 border border-emerald-500/20">
            Sim Engine v2.5
          </span>
        </div>

        {/* Workload Source Selector */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 font-mono flex items-center space-x-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Workload Source</span>
          </label>
          <div className="grid grid-cols-1 gap-2 p-1 bg-slate-950 rounded-xl border border-gray-800">
            <button
              onClick={() => setWorkloadSource('synthetic')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                workloadSource === 'synthetic'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Synthetic Workload</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500">Manual Sliders</span>
            </button>

            <button
              onClick={() => setWorkloadSource('google_trace')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                workloadSource === 'google_trace'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm glow-emerald'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Cluster Workload Trace</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Production Log
              </span>
            </button>
          </div>
        </div>

        {/* Scheduler Algorithm Mode */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 font-mono">
            Scheduler Algorithm Mode
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-gray-800">
            <button
              onClick={() => setMode('baseline')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex flex-col items-center justify-center space-y-1 ${
                mode === 'baseline'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span>Standard (Baseline)</span>
              <span className="text-[10px] font-mono font-normal opacity-70">kube-scheduler</span>
            </button>

            <button
              onClick={() => setMode('ecosched')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex flex-col items-center justify-center space-y-1 ${
                mode === 'ecosched'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm glow-emerald'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>EcoSched</span>
              </div>
              <span className="text-[10px] font-mono font-normal opacity-70">Carbon-Aware Engine</span>
            </button>
          </div>
        </div>

        {/* Google Trace Mode Badge & Replay Trigger */}
        {isGoogleTrace ? (
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 mb-6 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Dataset: Google Production Cluster Log (20 Tasks)</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
              Replaces synthetic sliders with 20 real trace tasks (60% batch, 40% interactive) sampled from Google Cluster Trace logs.
            </p>

            <button
              onClick={onReplayTrace}
              disabled={isReplayingTrace}
              className="w-full py-2.5 px-3 rounded-lg font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-lg glow-emerald disabled:opacity-50"
            >
              {isReplayingTrace ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Replaying Trace Engine...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 text-slate-950" />
                  <span>Replay Google Trace Dataset</span>
                </>
              )}
            </button>
          </div>
        ) : null}

        {/* Sliders Container (Disabled when Google Trace is active) */}
        <div className={`space-y-5 transition-opacity ${isGoogleTrace ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Slider 1: Workload Demand */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-300 mb-1.5 font-mono">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Workload Demand</span>
              </span>
              <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                {workloadDemand} GFLOPS
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              disabled={isGoogleTrace}
              value={workloadDemand}
              onChange={(e) => setWorkloadDemand(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
              <span>10 GFLOPS (Low)</span>
              <span>50 GFLOPS</span>
              <span>100 GFLOPS (Peak)</span>
            </div>
          </div>

          {/* Slider 2: Latency SLA Bound */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-300 mb-1.5 font-mono">
              <span className="flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Latency SLA Bound</span>
              </span>
              <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                {slaBound} ms
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              disabled={isGoogleTrace}
              value={slaBound}
              onChange={(e) => setSlaBound(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
              <span>20ms (Strict Realtime)</span>
              <span>200ms (Relaxed)</span>
            </div>
          </div>

          {/* Slider 3: Delay-Tolerance Ratio */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-300 mb-1.5 font-mono">
              <span className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Delay-Tolerance Ratio</span>
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                {delayTolerance}% Batch
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              disabled={isGoogleTrace}
              value={delayTolerance}
              onChange={(e) => setDelayTolerance(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
              <span>0% (Interactive API)</span>
              <span>100% (Batch AI Training)</span>
            </div>
          </div>

        </div>

        {/* Trigger Workload Surge Button */}
        {!isGoogleTrace && (
          <div className="mt-6">
            <button
              onClick={onTriggerSurge}
              disabled={isSurging}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md ${
                isSurging
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 text-slate-950 hover:brightness-110'
              }`}
            >
              <Flame className={`w-4 h-4 ${isSurging ? 'animate-bounce' : ''}`} />
              <span>{isSurging ? 'Workload Surge Active (+45 GFLOPS)...' : 'Trigger Workload Surge'}</span>
            </button>
          </div>
        )}

      </div>

      {/* Preset Scenarios */}
      {!isGoogleTrace && (
        <div className="mt-6 pt-4 border-t border-gray-800">
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 font-mono">
            Preset Environment Scenarios
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onApplyPreset('solar')}
              className="py-1.5 px-2 rounded-lg text-[11px] font-medium bg-gray-900 hover:bg-gray-800 text-amber-300 border border-amber-500/20 flex items-center space-x-1"
            >
              <Sun className="w-3 h-3 text-amber-400" />
              <span>Solar Surge</span>
            </button>

            <button
              onClick={() => onApplyPreset('wind')}
              className="py-1.5 px-2 rounded-lg text-[11px] font-medium bg-gray-900 hover:bg-gray-800 text-cyan-300 border border-cyan-500/20 flex items-center space-x-1"
            >
              <Wind className="w-3 h-3 text-cyan-400" />
              <span>Nordic Wind</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
