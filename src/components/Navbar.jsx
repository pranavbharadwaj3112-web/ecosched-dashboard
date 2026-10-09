import React, { useState } from 'react';
import { Leaf, Cpu, FileText, Code, Download, Menu, X, Activity, Globe, Sparkles } from 'lucide-react';
import { PAPER_METADATA } from '../data/paperData';

export default function Navbar({ onOpenPaperModal, onOpenCodeModal, onOpenExportModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-gray-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('overview')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 glow-emerald">
              <Leaf className="w-5 h-5 text-emerald-400 absolute animate-pulse" />
              <Cpu className="w-5 h-5 text-cyan-400 opacity-60" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">EcoSched</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                  Carbon-Aware DRL
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">SIGCOMM 2026 Research Artifact</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
            <button 
              onClick={() => scrollToSection('overview')} 
              className="hover:text-emerald-400 transition-colors flex items-center space-x-1"
            >
              <span>Overview</span>
            </button>

            <button 
              onClick={() => scrollToSection('simulator')} 
              className="hover:text-emerald-400 transition-colors flex items-center space-x-1 font-semibold text-cyan-300"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Live Simulator</span>
            </button>

            <button 
              onClick={() => scrollToSection('architecture')} 
              className="hover:text-emerald-400 transition-colors"
            >
              <span>Pipeline & Math</span>
            </button>

            <button 
              onClick={() => scrollToSection('results')} 
              className="hover:text-emerald-400 transition-colors"
            >
              <span>Benchmarks</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={onOpenPaperModal}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gray-800/80 hover:bg-gray-700 text-gray-200 border border-gray-700/80 transition-all flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Paper PDF</span>
            </button>

            <button
              onClick={onOpenCodeModal}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gray-800/80 hover:bg-gray-700 text-gray-200 border border-gray-700/80 transition-all flex items-center space-x-1.5"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub Repo</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 transition-all shadow-md shadow-emerald-950/40 flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>Export Logs</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white bg-gray-900 border border-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-gray-800 px-4 pt-3 pb-6 space-y-3 bg-slate-950/95">
          <button
            onClick={() => scrollToSection('overview')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-gray-200 hover:bg-gray-800 rounded-lg"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('simulator')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-cyan-400 hover:bg-gray-800 rounded-lg flex items-center justify-between"
          >
            <span>Live Orchestration Simulator</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            onClick={() => scrollToSection('architecture')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-gray-200 hover:bg-gray-800 rounded-lg"
          >
            Architecture & Math
          </button>
          <button
            onClick={() => scrollToSection('results')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-gray-200 hover:bg-gray-800 rounded-lg"
          >
            Benchmark Results
          </button>

          <div className="pt-2 border-t border-gray-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenPaperModal(); }}
              className="py-2 px-3 rounded-lg text-xs font-medium bg-gray-800 text-gray-200 flex items-center justify-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Paper PDF</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCodeModal(); }}
              className="py-2 px-3 rounded-lg text-xs font-medium bg-gray-800 text-gray-200 flex items-center justify-center space-x-1"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>Source Code</span>
            </button>
          </div>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenExportModal(); }}
            className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 flex items-center justify-center space-x-1.5"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Export Simulation Logs (JSON)</span>
          </button>
        </div>
      )}
    </header>
  );
}
