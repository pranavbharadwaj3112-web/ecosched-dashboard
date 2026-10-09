import React from 'react';
import ControlPanel from './ControlPanel';
import DatacenterMap from './DatacenterMap';
import LiveAnalyticsCharts from './LiveAnalyticsCharts';

export default function SimulatorPlayground({
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
  traceSummaryResult = null,
  traceAssignedCounts = {},
  regions,
  selectedRegion,
  setSelectedRegion,
  onTriggerSurge,
  onApplyPreset,
  isSurging,
  timeSeriesData,
  latencyData,
  energyMixData
}) {
  return (
    <section id="simulator" className="py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Interactive Orchestration Playground</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Real-Time Dynamic Carbon Simulation
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust workload parameters, delay laxity, or replay Google Cluster Workload Trace logs to observe live spatial routing & carbon reductions.
            </p>
          </div>
        </div>

        {/* 3 Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Control Panel (3 cols) */}
          <div className="lg:col-span-3">
            <ControlPanel
              mode={mode}
              setMode={setMode}
              workloadDemand={workloadDemand}
              setWorkloadDemand={setWorkloadDemand}
              slaBound={slaBound}
              setSlaBound={setSlaBound}
              delayTolerance={delayTolerance}
              setDelayTolerance={setDelayTolerance}
              workloadSource={workloadSource}
              setWorkloadSource={setWorkloadSource}
              onReplayTrace={onReplayTrace}
              isReplayingTrace={isReplayingTrace}
              onTriggerSurge={onTriggerSurge}
              onApplyPreset={onApplyPreset}
              isSurging={isSurging}
            />
          </div>

          {/* Center Column: Datacenter Routing Map (5 cols) */}
          <div className="lg:col-span-5">
            <DatacenterMap
              regions={regions}
              mode={mode}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              isSurging={isSurging}
              workloadSource={workloadSource}
              traceAssignedCounts={traceAssignedCounts}
            />
          </div>

          {/* Right Column: Live Recharts Analytics (4 cols) */}
          <div className="lg:col-span-4">
            <LiveAnalyticsCharts
              timeSeriesData={timeSeriesData}
              latencyData={latencyData}
              energyMixData={energyMixData}
              mode={mode}
              slaBound={slaBound}
              workloadSource={workloadSource}
              traceSummaryResult={traceSummaryResult}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
