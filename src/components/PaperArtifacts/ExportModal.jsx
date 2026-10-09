import React, { useState } from 'react';
import { X, Download, Check, FileJson, Database } from 'lucide-react';

export default function ExportModal({
  isOpen,
  onClose,
  timeSeriesData,
  mode,
  workloadDemand,
  slaBound,
  delayTolerance
}) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const exportPayload = {
    metadata: {
      generator: "EcoSched Carbon-Aware Orchestration Simulator v2.4",
      paperTitle: "EcoSched: Carbon-Aware Dynamic Workload Orchestration in Cloud Computing",
      timestamp: new Date().toISOString(),
      activeSchedulerMode: mode,
      config: {
        workloadDemandGflops: workloadDemand,
        slaBoundMs: slaBound,
        delayTolerancePercent: delayTolerance
      }
    },
    telemetryHistory: timeSeriesData
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([jsonString], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `ecosched_telemetry_log_${Date.now()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-card rounded-2xl border border-gray-800 bg-slate-900 w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <FileJson className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white font-mono">Export Simulation Telemetry Logs</h3>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-gray-300">
            Export structured JSON log dataset containing timestamped regional grid telemetry, carbon emission curves, and SLA compliance metrics.
          </p>

          <div className="rounded-xl bg-slate-950 border border-gray-800 p-4">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
              <span>Telemetry Preview ({timeSeriesData.length} records)</span>
              <span className="text-emerald-400">application/json</span>
            </div>
            <pre className="text-[11px] font-mono text-cyan-300/90 bg-slate-900 p-3 rounded border border-gray-800 overflow-x-auto max-h-64">
              {jsonString}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400">Format: Standard JSON</span>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 flex items-center space-x-1.5 shadow-md shadow-emerald-950/40"
            >
              {downloaded ? <Check className="w-4 h-4 text-slate-950" /> : <Download className="w-4 h-4 text-slate-950" />}
              <span>{downloaded ? 'Downloaded JSON!' : 'Download Log File'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
