import React from 'react';
import { Leaf, Cpu, GitBranch, BookOpen, ArrowUp, ShieldCheck } from 'lucide-react';
import { PAPER_METADATA } from '../data/paperData';

export default function Footer({ onOpenPaperModal, onOpenCodeModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-800/80 bg-slate-950 text-gray-400 text-xs py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800/80">
          
          {/* Col 1: Brand & Paper Title */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-extrabold text-lg text-white font-mono">EcoSched Research Project</span>
            </div>

            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              {PAPER_METADATA.title}. ACM SIGCOMM 2026 / IEEE Transactions on Sustainable Computing.
            </p>

            <div className="flex items-center space-x-3 text-[11px] font-mono text-emerald-400">
              <span>DOI: {PAPER_METADATA.doi}</span>
              <span>•</span>
              <span>Open Source MIT License</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-3 font-mono">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-emerald-400 transition-colors">Research Overview</a></li>
              <li><a href="#simulator" className="hover:text-emerald-400 transition-colors">Interactive Simulator</a></li>
              <li><a href="#architecture" className="hover:text-emerald-400 transition-colors">System Architecture</a></li>
              <li><a href="#math" className="hover:text-emerald-400 transition-colors">Math Optimization Loss</a></li>
              <li><a href="#results" className="hover:text-emerald-400 transition-colors">Benchmark Matrix</a></li>
            </ul>
          </div>

          {/* Col 3: Artifact Links */}
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-3 font-mono">Artifacts & Resources</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenPaperModal} className="hover:text-emerald-400 transition-colors text-left">
                  ACM SIGCOMM Paper PDF
                </button>
              </li>
              <li>
                <button onClick={onOpenCodeModal} className="hover:text-cyan-400 transition-colors text-left">
                  GitHub DRL Agent Repository
                </button>
              </li>
              <li>
                <a href="#results" className="hover:text-emerald-400 transition-colors">
                  12-Month Telemetry Dataset
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px]">
          <div>
            © 2026 EcoSched Authors. Built with React, Tailwind CSS, Framer Motion & Recharts.
          </div>

          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 p-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 transition-colors flex items-center space-x-1"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
