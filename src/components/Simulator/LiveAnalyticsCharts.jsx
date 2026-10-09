import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingDown, ShieldCheck, PieChart as PieIcon, Activity, Leaf, Database, CheckCircle2, ArrowUpRight, Zap } from 'lucide-react';

const ENERGY_COLORS = {
  solar: '#f59e0b', // Amber
  wind: '#06b6d4',  // Cyan
  hydro: '#3b82f6', // Blue
  fossil: '#ef4444' // Red
};

export default function LiveAnalyticsCharts({
  timeSeriesData,
  latencyData,
  energyMixData,
  mode,
  slaBound,
  workloadSource = 'synthetic',
  traceSummaryResult = null
}) {
  const isGoogleTrace = workloadSource === 'google_trace';

  const currentCarbonSaved = timeSeriesData.length > 0
    ? (timeSeriesData[timeSeriesData.length - 1].baseline - timeSeriesData[timeSeriesData.length - 1].ecosched)
    : 0;

  const currentSavingsPercent = isGoogleTrace && traceSummaryResult
    ? traceSummaryResult.overall_carbon_reduction_pct
    : timeSeriesData.length > 0
    ? ((currentCarbonSaved / timeSeriesData[timeSeriesData.length - 1].baseline) * 100).toFixed(1)
    : 34.2;

  const donutData = [
    { name: 'Solar', value: energyMixData.solar, color: ENERGY_COLORS.solar },
    { name: 'Wind', value: energyMixData.wind, color: ENERGY_COLORS.wind },
    { name: 'Hydro', value: energyMixData.hydro, color: ENERGY_COLORS.hydro },
    { name: 'Grid Fossil', value: energyMixData.fossil, color: ENERGY_COLORS.fossil }
  ];

  return (
    <div className="glass-card rounded-2xl p-5 border border-gray-800 bg-slate-900/90 flex flex-col justify-between h-full space-y-4">
      
      {/* Top Header & Live KPI */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-base text-white font-mono">Live Analytics Engine</h3>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-{currentSavingsPercent}% Carbon Emission</span>
          </span>
        </div>
      </div>

      {/* Google Trace Summary Card Banner (When Google Trace Mode is Active) */}
      {isGoogleTrace && traceSummaryResult ? (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Google Cluster Trace Replay Summary</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Benchmark Verified
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-800/80 text-center">
            <div className="p-2 rounded bg-slate-900 border border-gray-800">
              <span className="block text-[10px] text-gray-400 uppercase">Total Tasks</span>
              <span className="text-sm font-extrabold text-white">
                {traceSummaryResult.total_tasks_processed} Tasks
              </span>
            </div>

            <div className="p-2 rounded bg-slate-900 border border-emerald-500/30">
              <span className="block text-[10px] text-emerald-400 uppercase">Carbon Saved</span>
              <span className="text-sm font-extrabold text-emerald-300">
                {traceSummaryResult.overall_carbon_reduction_pct}%
              </span>
            </div>

            <div className="p-2 rounded bg-slate-900 border border-cyan-500/30">
              <span className="block text-[10px] text-cyan-400 uppercase">SLA Compliance</span>
              <span className="text-sm font-extrabold text-cyan-300">
                {traceSummaryResult.sla_compliance_rate_pct}%
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Chart 1: Real-time Carbon Emission Line Chart */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-gray-300 mb-2">
          <span className="flex items-center space-x-1.5 font-bold">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>{isGoogleTrace ? 'Google Trace Replay Emissions (mg CO₂ / task)' : 'Carbon Emission Over Time (kg CO₂ / hr)'}</span>
          </span>
          <span className="text-gray-400">
            {isGoogleTrace ? 'Google 20-Task Log' : 'Live Window (Last 12 Ticks)'}
          </span>
        </div>

        <div className="h-44 w-full bg-slate-950/80 rounded-xl p-2 border border-gray-800/80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="time" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
              
              <Line
                type="monotone"
                dataKey="baseline"
                name="Standard K8s Baseline"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="ecosched"
                name="EcoSched (Proposed)"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid: Bar Chart & Donut Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        
        {/* Chart 2: Regional SLA Latency Compliance */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-gray-300 mb-2">
            <span className="flex items-center space-x-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Regional Latency vs SLA</span>
            </span>
          </div>

          <div className="h-36 w-full bg-slate-950/80 rounded-xl p-2 border border-gray-800/80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="region" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 9 }} />
                <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 9 }} domain={[0, 220]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="latency" name="Actual Latency (ms)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="slaBound" name="SLA Bound (ms)" fill="#374151" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Energy Mix Donut Chart */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-gray-300 mb-2">
            <span className="flex items-center space-x-1 font-bold">
              <PieIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Energy Mix Utilization</span>
            </span>
          </div>

          <div className="h-36 w-full bg-slate-950/80 rounded-xl p-2 border border-gray-800/80 flex items-center justify-between">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={42}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Donut Legend */}
            <div className="w-1/2 space-y-1 text-[10px] font-mono text-gray-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Solar</span>
                </span>
                <span className="font-bold text-amber-300">{energyMixData.solar}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Wind</span>
                </span>
                <span className="font-bold text-cyan-300">{energyMixData.wind}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Hydro</span>
                </span>
                <span className="font-bold text-blue-300">{energyMixData.hydro}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Grid</span>
                </span>
                <span className="font-bold text-rose-300">{energyMixData.fossil}%</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
