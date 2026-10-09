import React, { useState } from 'react';
import { Calculator, Info, Sliders, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

export default function MathFoundationCard() {
  const [alpha, setAlpha] = useState(1.2);
  const [beta, setBeta] = useState(0.8);
  const [gamma, setGamma] = useState(2.5);
  const [hoveredVar, setHoveredVar] = useState(null);

  // Sample evaluation values for live calculation
  const sampleCarbonIntensity = 420; // gCO2/kWh
  const sampleEnergyKwh = 1.4; // kWh
  const sampleLatencyMs = 48; // ms
  const sampleSlaBoundMs = 50; // ms

  const carbonTerm = alpha * sampleCarbonIntensity * sampleEnergyKwh;
  const latencyTerm = beta * Math.max(0, sampleLatencyMs - 20);
  const slaViolationTerm = gamma * Math.pow(Math.max(0, sampleLatencyMs - sampleSlaBoundMs), 2);
  const totalObjectiveLoss = carbonTerm + latencyTerm + slaViolationTerm;

  const VARIABLE_TOOLTIPS = {
    alpha: {
      name: "α (Alpha) - Carbon Weight Coefficient",
      role: "User-defined priority multiplier balancing environmental carbon reduction against operational cost. Higher values force aggressive workload migration to green renewable regions.",
      default: "1.2"
    },
    carbonIntensity: {
      name: "Carbon_Intensity - Real-Time Grid Telemetry (gCO₂/kWh)",
      role: "Dynamic carbon emission factor of the target regional power grid at timestamp t, forecasted 24 hours ahead by the LSTM-Attention model.",
      default: "420 gCO₂/kWh"
    },
    energy: {
      name: "Energy - Compute Energy Consumption (kWh)",
      role: "Estimated power consumption of the allocated container batch based on GFLOPS demand and server CPU/RAM TDP profile.",
      default: "1.4 kWh"
    },
    beta: {
      name: "β (Beta) - Latency Weight Coefficient",
      role: "Penalty multiplier for multi-hop cross-continent transit network propagation delay.",
      default: "0.8"
    },
    latencyPenalty: {
      name: "Latency_Penalty - Network Propagation Delay (ms)",
      role: "Physical network ping latency between user edge ingress gateway and target execution datacenter node.",
      default: "28 ms"
    },
    gamma: {
      name: "γ (Gamma) - SLA Violation Weight",
      role: "Heavy penalty exponent strictly penalizing tasks that exceed user SLA latency upper bounds.",
      default: "2.5"
    },
    slaViolation: {
      name: "SLA_Violation - Quadratic Boundary Breach (max(0, Latency - SLA)²)",
      role: "Non-linear quadratic penalty term activated only when latency exceeds SLA limits, protecting real-time user workloads.",
      default: "0 (Compliant)"
    }
  };

  return (
    <div id="math" className="glass-card rounded-2xl p-6 border border-gray-800 bg-slate-900/90">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Mathematical Objective Formulation</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Multi-Objective Optimization Loss Function</h3>
        </div>

        <span className="mt-2 sm:mt-0 text-xs font-mono px-3 py-1 rounded-full bg-slate-950 text-cyan-400 border border-cyan-500/30">
          Equation 4.2 in Paper
        </span>
      </div>

      {/* Main Equation Box */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 shadow-inner relative overflow-hidden mb-6 text-center">
        <div className="text-xs font-mono text-gray-400 mb-3">EcoSched DRL Policy Reward Loss Function:</div>

        {/* Rendered Latex / Math Box with Hoverable Terms */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-2xl font-mono font-bold tracking-tight text-white py-4 bg-slate-900/80 rounded-xl border border-gray-800 px-4">
          <span className="text-gray-400">Min Σ (</span>

          <span
            onMouseEnter={() => setHoveredVar('alpha')}
            onMouseLeave={() => setHoveredVar(null)}
            className="text-emerald-400 hover:bg-emerald-500/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors border border-emerald-500/30"
          >
            α
          </span>

          <span className="text-gray-500">•</span>

          <span
            onMouseEnter={() => setHoveredVar('carbonIntensity')}
            onMouseLeave={() => setHoveredVar(null)}
            className="text-emerald-300 hover:bg-emerald-500/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors border border-emerald-500/20"
          >
            Carbon_Intensity
          </span>

          <span className="text-gray-500">•</span>

          <span
            onMouseEnter={() => setHoveredVar('energy')}
            onMouseLeave={() => setHoveredVar(null)}
            className="text-emerald-200 hover:bg-emerald-500/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors border border-emerald-500/20"
          >
            Energy
          </span>

          <span className="text-emerald-400 font-bold mx-1">+</span>

          <span
            onMouseEnter={() => setHoveredVar('beta')}
            onMouseLeave={() => setHoveredVar(null)}
            className="text-cyan-400 hover:bg-cyan-500/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors border border-cyan-500/30"
          >
            β
          </span>

          <span className="text-gray-500">•</span>

          <span
            onMouseEnter={() => setHoveredVar('latencyPenalty')}
            onMouseLeave={() => setHoveredVar(null)}
            className="text-cyan-300 hover:bg-cyan-500/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors border border-cyan-500/20"
          >
            Latency_Penalty
          </span>

          <span className="text-emerald-400 font-bold mx-1">+</span>

          <span
            onMouseEnter={() => setHoveredVar('gamma')}
            onMouseLeave={() => setHoveredVar(null)}
            className="text-amber-400 hover:bg-amber-500/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors border border-amber-500/30"
          >
            γ
          </span>

          <span className="text-gray-500">•</span>

          <span
            onMouseEnter={() => setHoveredVar('slaViolation')}
            onMouseLeave={() => setHoveredVar(null)}
            className="text-amber-300 hover:bg-amber-500/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors border border-amber-500/20"
          >
            SLA_Violation
          </span>

          <span className="text-gray-400">)</span>
        </div>

        <p className="text-[11px] text-gray-400 mt-3 font-mono">
          💡 Hover over any term in the equation above to inspect its exact mathematical role in DRL policy optimization.
        </p>
      </div>

      {/* Active Variable Tooltip Card */}
      {hoveredVar && VARIABLE_TOOLTIPS[hoveredVar] && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 mb-6 transition-all">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400 mb-1">
            <Info className="w-4 h-4" />
            <span>{VARIABLE_TOOLTIPS[hoveredVar].name}</span>
          </div>
          <p className="text-xs text-gray-200 leading-relaxed">{VARIABLE_TOOLTIPS[hoveredVar].role}</p>
        </div>
      )}

      {/* Dynamic Weight Tuning Sliders & Live Calculation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
        
        {/* Sliders (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block font-bold">
            Interactive Multi-Objective Weight Coefficients
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Alpha Slider */}
            <div className="p-3 rounded-xl bg-slate-950 border border-gray-800">
              <div className="flex justify-between items-center text-xs font-mono text-emerald-400 font-bold mb-1">
                <span>Carbon Weight (α)</span>
                <span>{alpha.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Beta Slider */}
            <div className="p-3 rounded-xl bg-slate-950 border border-gray-800">
              <div className="flex justify-between items-center text-xs font-mono text-cyan-400 font-bold mb-1">
                <span>Latency Weight (β)</span>
                <span>{beta.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={beta}
                onChange={(e) => setBeta(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Gamma Slider */}
            <div className="p-3 rounded-xl bg-slate-950 border border-gray-800">
              <div className="flex justify-between items-center text-xs font-mono text-amber-400 font-bold mb-1">
                <span>SLA Weight (γ)</span>
                <span>{gamma.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.5"
                value={gamma}
                onChange={(e) => setGamma(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

          </div>
        </div>

        {/* Live Loss Value Result (4 cols) */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-center font-mono">
          <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
            Computed Objective Loss Score
          </span>
          <div className="text-3xl font-extrabold text-gradient-emerald-cyan my-1">
            {totalObjectiveLoss.toFixed(1)}
          </div>
          <p className="text-[10px] text-gray-500">
            Carbon: {carbonTerm.toFixed(0)} | Latency: {latencyTerm.toFixed(0)} | SLA: {slaViolationTerm.toFixed(0)}
          </p>
        </div>

      </div>

    </div>
  );
}
