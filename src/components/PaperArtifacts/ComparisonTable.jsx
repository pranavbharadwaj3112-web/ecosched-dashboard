import React from 'react';
import { Table, CheckCircle2, Award, Zap, ArrowUpRight, FileText, Code, Download } from 'lucide-react';
import { BENCHMARK_COMPARISON } from '../../data/paperData';

export default function ComparisonTable({ onOpenPaperModal, onOpenCodeModal, onOpenExportModal }) {
  return (
    <section id="results" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Comparative Evaluation & Paper Benchmarks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scheduler Benchmark Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              12-Month Empirical Results across 8 Global Cloud Datacenter Regions
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <button
              onClick={onOpenPaperModal}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700/80 transition-all flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download Paper PDF</span>
            </button>

            <button
              onClick={onOpenCodeModal}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700/80 transition-all flex items-center space-x-1.5"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Source Code</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 transition-all flex items-center space-x-1.5 shadow-md shadow-emerald-950/40"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>Export Simulation Logs</span>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="glass-card rounded-2xl border border-gray-800 bg-slate-900/90 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-gray-800 text-xs font-mono uppercase text-gray-400 tracking-wider">
                  <th className="py-4 px-6 font-semibold">Scheduler System</th>
                  <th className="py-4 px-4 font-semibold text-emerald-400">Carbon Reduction</th>
                  <th className="py-4 px-4 font-semibold text-cyan-400">Avg Latency</th>
                  <th className="py-4 px-4 font-semibold text-amber-400">SLA Breach %</th>
                  <th className="py-4 px-4 font-semibold text-blue-400">Network Cost Delta</th>
                  <th className="py-4 px-4 font-semibold text-purple-400">P99 Latency</th>
                  <th className="py-4 px-4 font-semibold text-gray-300">Energy Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80 text-xs font-mono">
                {BENCHMARK_COMPARISON.map((row, idx) => {
                  const isHighlight = row.highlight;

                  return (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        isHighlight
                          ? 'bg-emerald-950/20 border-emerald-500/40 font-bold text-white'
                          : 'hover:bg-slate-950/50 text-gray-300'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {isHighlight && (
                            <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                              <Zap className="w-3.5 h-3.5 fill-current" />
                            </span>
                          )}
                          <div>
                            <div className="font-bold text-sm text-white">{row.scheduler}</div>
                            <div className="text-[11px] font-normal text-gray-400 mt-0.5">{row.description}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-extrabold text-sm">
                        <span className={isHighlight ? 'text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30' : 'text-gray-300'}>
                          {row.carbonReduction}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-cyan-300">{row.avgLatency}</td>

                      <td className="py-4 px-4">
                        <span className={row.slaBreachRate === '0.04%' ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                          {row.slaBreachRate}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-blue-300">{row.networkOverhead}</td>

                      <td className="py-4 px-4 text-purple-300">{row.p99Latency}</td>

                      <td className="py-4 px-4 text-gray-200">{row.energyEfficiency}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-950 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>* Evaluated on 100,000 synthetic synthetic cloud tasks across Azure, AWS, and GCP grid nodes.</span>
            <span className="text-emerald-400">p &lt; 0.001 Statistically Significant</span>
          </div>
        </div>

      </div>
    </section>
  );
}
