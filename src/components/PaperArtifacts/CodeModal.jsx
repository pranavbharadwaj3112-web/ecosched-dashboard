import React, { useState } from 'react';
import { X, Code, Copy, Check, ExternalLink, GitBranch, Terminal, FolderTree } from 'lucide-react';
import { CODE_SNIPPET } from '../../data/paperData';

export default function CodeModal({ isOpen, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-card rounded-2xl border border-gray-800 bg-slate-900 w-full max-w-4xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base text-white font-mono">Source Code Repository Artifacts</h3>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Repo Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950 border border-gray-800">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold">
                <Terminal className="w-4 h-4" />
                <span>github.com/ecosched-org/ecosched-core</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">PyTorch 2.4 + Ray Tune + eBPF Kernel Traffic Dispatcher</p>
            </div>

            <button
              onClick={handleCopyCode}
              className="mt-3 sm:mt-0 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center space-x-1.5"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code Snippet'}</span>
            </button>
          </div>

          {/* Code Viewer Box */}
          <div className="rounded-xl bg-slate-950 border border-gray-800 overflow-hidden">
            <div className="px-4 py-2 bg-slate-900 border-b border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>src/agents/ecosched_drl_agent.py</span>
              <span className="text-emerald-400 font-semibold">Python 3.11 / PyTorch</span>
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto max-h-96">
              <code>{CODE_SNIPPET}</code>
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400">License: MIT Open Source</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
