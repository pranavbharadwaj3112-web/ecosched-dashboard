import React from 'react';
import { Globe, Server, Leaf, Flame, Activity, Zap, ShieldCheck, Thermometer, Wind, Sun, Waves, Layers } from 'lucide-react';

export default function DatacenterMap({
  regions,
  mode,
  selectedRegion,
  setSelectedRegion,
  isSurging,
  workloadSource = 'synthetic',
  traceAssignedCounts = {}
}) {
  const isGoogleTrace = workloadSource === 'google_trace';

  return (
    <div className="glass-card rounded-2xl p-5 border border-gray-800 bg-slate-900/90 flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Background Map Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-800 relative z-10">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-bold text-base text-white font-mono">Global Routing & Grid Map</h3>
            <p className="text-[11px] text-gray-400">Live Grid Carbon Telemetry & Spatial Routing Paths</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-950 border border-gray-800">
            <span className={`w-2 h-2 rounded-full ${mode === 'ecosched' ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
            <span className={mode === 'ecosched' ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
              {mode === 'ecosched' ? 'EcoSched Active (Spatial Shift)' : 'Baseline Pinning'}
            </span>
          </div>
        </div>
      </div>

      {/* Animated SVG Connections Overlay */}
      <div className="relative w-full h-[320px] sm:h-[360px] bg-slate-950/70 rounded-xl border border-gray-800/80 p-4 overflow-hidden mb-4">
        
        {/* Simplified World Map SVG background grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Connection Lines US East -> Nordic & EU West */}
          {mode === 'ecosched' ? (
            <>
              {/* US East -> Nordic South Curve */}
              <path
                d="M 120 120 Q 250 40 380 90"
                fill="none"
                stroke="url(#emeraldGradient)"
                strokeWidth="3"
                className="animate-particle-flow"
              />
              {/* US East -> EU West Curve */}
              <path
                d="M 120 120 Q 200 160 300 160"
                fill="none"
                stroke="url(#emeraldGradient)"
                strokeWidth="2.5"
                className="animate-particle-flow"
              />
              {/* EU West -> Nordic */}
              <path
                d="M 300 160 Q 340 110 380 90"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </>
          ) : (
            <>
              {/* Static congestion loops at US East */}
              <circle cx="120" cy="120" r="35" fill="none" stroke="url(#roseGradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" />
              <line x1="120" y1="120" x2="480" y2="200" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />
            </>
          )}
        </svg>

        {/* Datacenter Visual Cards Grid */}
        <div className="grid grid-cols-2 gap-3 relative z-10 h-full">
          
          {regions.map((region) => {
            const isClean = region.carbonIntensity < 100;
            const isHigh = region.carbonIntensity > 300;
            const isSelected = selectedRegion?.id === region.id;
            const assignedCount = traceAssignedCounts[region.id] ?? traceAssignedCounts[region.name] ?? 0;

            return (
              <div
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/20 glow-cyan'
                    : isClean
                    ? 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50'
                    : isHigh
                    ? 'border-rose-500/30 bg-rose-950/10 hover:border-rose-500/50'
                    : 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50'
                }`}
              >
                {/* Node Top Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-base">{region.flag}</span>
                    <span className="font-bold text-xs text-white font-mono">{region.name}</span>
                  </div>
                  
                  {/* Grid Carbon Intensity Badge */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold font-mono border ${
                    isClean
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : isHigh
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {region.carbonIntensity} gCO₂/kWh
                  </span>
                </div>

                {/* Node Status Indicator */}
                <div className="my-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-1">
                    <span>Active Compute Load</span>
                    <span className="text-white font-bold">{region.activeLoadGflops} GFLOPS</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-gray-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isClean
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                          : isHigh
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${Math.min(100, (region.activeLoadGflops / region.maxCapacityGflops) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Google Trace Live Task Assigned Badge */}
                {isGoogleTrace ? (
                  <div className="flex items-center justify-between px-2 py-1 rounded bg-slate-950 border border-emerald-500/30 text-[10px] font-mono mb-1">
                    <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                      <Layers className="w-3 h-3 text-emerald-400" />
                      <span>{assignedCount} Tasks Assigned</span>
                    </span>
                    <span className="text-gray-400 font-normal">
                      {((assignedCount / 20) * 100).toFixed(0)}% Total
                    </span>
                  </div>
                ) : null}

                {/* Energy Source Mix Miniature */}
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono pt-1 border-t border-gray-800/60">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-0.5 text-amber-300">
                      <Sun className="w-3 h-3 text-amber-400" />
                      <span>{region.energyMix.solar}%</span>
                    </span>
                    <span className="flex items-center space-x-0.5 text-cyan-300">
                      <Wind className="w-3 h-3 text-cyan-400" />
                      <span>{region.energyMix.wind}%</span>
                    </span>
                    <span className="flex items-center space-x-0.5 text-blue-300">
                      <Waves className="w-3 h-3 text-blue-400" />
                      <span>{region.energyMix.hydro}%</span>
                    </span>
                  </div>

                  <span className="text-gray-400 font-semibold">{region.temperature}</span>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Simulator Spatial Routing Note */}
      <div className="p-3 rounded-xl bg-slate-950 border border-gray-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-gray-300">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>
            {isGoogleTrace
              ? 'Google Cluster Trace Replay: 12 Batch Tasks shifted to Nordic, 3 Interactive to EU West, 3 to US East.'
              : mode === 'ecosched'
              ? 'EcoSched is dynamically routing ~65% batch load to Nordic South (18 gCO2/kWh).'
              : 'Baseline scheduler is maintaining static placement in US East (420 gCO2/kWh).'}
          </span>
        </div>
        
        {isSurging && (
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] animate-pulse">
            SURGE RE-BALANCING
          </span>
        )}
      </div>

    </div>
  );
}
