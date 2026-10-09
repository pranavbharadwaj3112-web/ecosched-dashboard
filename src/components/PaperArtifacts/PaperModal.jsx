import React, { useState } from 'react';
import { X, FileText, Download, Check, Copy, BookOpen, Layers, Award } from 'lucide-react';
import { PAPER_METADATA, BIBTEX_CITATION } from '../../data/paperData';

export default function PaperModal({ isOpen, onClose }) {
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  if (!isOpen) return null;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(BIBTEX_CITATION);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleMockPdfDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `PAPER TITLE: ${PAPER_METADATA.title}\nAUTHORS: ${PAPER_METADATA.authors.join(', ')}\nVENUE: ${PAPER_METADATA.conference}\nDOI: ${PAPER_METADATA.doi}\n\nABSTRACT:\n${PAPER_METADATA.abstract}\n\nBIBTEX:\n${BIBTEX_CITATION}`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "EcoSched_SIGCOMM_2026_Paper.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-card rounded-2xl border border-gray-800 bg-slate-900 w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white font-mono">Research Paper Viewer</h3>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-gray-300 text-sm leading-relaxed font-sans">
          
          <div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {PAPER_METADATA.conference}
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-3">{PAPER_METADATA.title}</h2>
            <p className="text-xs text-gray-400 font-mono mt-2">{PAPER_METADATA.authors.join(' • ')}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-gray-800">
            <h4 className="font-bold text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">Abstract</h4>
            <p className="text-xs text-gray-300 leading-relaxed">{PAPER_METADATA.abstract}</p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-2 font-mono">Key Architectural Innovations</h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300">
              <li><strong className="text-emerald-400">Multi-Horizon Carbon Forecasting:</strong> 24-hour LSTM-Attention spatial carbon intensity predictors for target grids.</li>
              <li><strong className="text-cyan-400">SLA-Bounded Delay Laxity Queueing:</strong> Temporal queueing framework shifting batch compute without exceeding P99 tail SLA limits.</li>
              <li><strong className="text-purple-400">eBPF Fast Kernel Migration:</strong> Zero-downtime container state synchronization via optimized kernel packet tunneling.</li>
            </ul>
          </div>

          {/* BibTeX Citation Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-gray-300">BibTeX Citation</span>
              <button
                onClick={handleCopyBibtex}
                className="px-2.5 py-1 rounded text-[11px] font-mono bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 flex items-center space-x-1"
              >
                {copiedBibtex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedBibtex ? 'Copied!' : 'Copy BibTeX'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-emerald-300/90 bg-slate-900 p-3 rounded border border-gray-800 overflow-x-auto">
              {BIBTEX_CITATION}
            </pre>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-gray-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400">DOI: {PAPER_METADATA.doi}</span>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300"
            >
              Close
            </button>
            <button
              onClick={handleMockPdfDownload}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download Paper PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
