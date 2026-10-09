export const PAPER_METADATA = {
  title: "EcoSched: Carbon-Aware Dynamic Workload Orchestration in Cloud Computing",
  authors: [
    "Dr. Elena Vance (Stanford)",
    "Marcus Sterling (Google Cloud Research)",
    "Prof. Hiroshi Tanaka (UTokyo)",
    "Aria Chen (MIT CSAIL)"
  ],
  conference: "ACM SIGCOMM 2026 / IEEE Transactions on Sustainable Computing",
  doi: "10.1145/3698742.3701290",
  tags: ["Green Computing", "Distributed Systems", "SLA Optimization", "Deep Reinforcement Learning", "Grid Carbon Forecaster"],
  abstract: "Modern cloud datacenters account for over 2% of global electricity consumption, generating substantial carbon footprints. Traditional Kubernetes schedulers optimize primarily for bin-packing, network locality, or raw latency, ignoring transient carbon intensity variations across electrical grids. EcoSched introduces a multi-objective Deep Reinforcement Learning (DRL) framework for spatial-temporal workload orchestration. By coupling real-time grid carbon forecasting with delay-tolerant queueing models, EcoSched dynamically shifts batch compute workloads to regions powered by renewable energy without breaching strict SLA latency bounds. Across 8 global cloud regions over 12 months, EcoSched achieved a 34.2% reduction in carbon emissions while maintaining 99.8% SLA compliance with under 3% cross-region network overhead."
};

export const AGGREGATE_BENCHMARKS = [
  { label: "Carbon Emission Reduction", value: "34.2%", unit: "vs. Standard K8s", trend: "+12.4% over static", highlight: true, color: "emerald" },
  { label: "SLA Latency Compliance", value: "99.8%", unit: "<150ms bound", trend: "0.02% violation", highlight: false, color: "cyan" },
  { label: "Network Cost Delta", value: "< 2.8%", unit: "Egress overhead", trend: "Optimized multi-hop", highlight: false, color: "blue" },
  { label: "Active Global Regions", value: "8 Regions", unit: "4 Deep Simulated", trend: "100% telemetry", highlight: false, color: "purple" }
];

export const REGIONS_DATA = [
  {
    id: "us-east",
    name: "US East (N. Virginia)",
    code: "US-EST",
    flag: "🇺🇸",
    coordinates: { x: 28, y: 38 },
    carbonIntensity: 420, // gCO2/kWh
    gridStatus: "High Carbon (Fossil/Coal)",
    statusColor: "red",
    latencyBaseline: 24, // ms
    energyMix: { solar: 12, wind: 18, hydro: 10, fossil: 60 },
    temperature: "28°C",
    activeLoadGflops: 78,
    maxCapacityGflops: 120
  },
  {
    id: "nordic-south",
    name: "Nordic South (Stockholm)",
    code: "EU-NOD",
    flag: "🇸🇪",
    coordinates: { x: 54, y: 22 },
    carbonIntensity: 18, // gCO2/kWh
    gridStatus: "Ultra Clean (Hydro/Solar)",
    statusColor: "emerald",
    latencyBaseline: 82, // ms
    energyMix: { solar: 35, wind: 25, hydro: 38, fossil: 2 },
    temperature: "14°C",
    activeLoadGflops: 34,
    maxCapacityGflops: 100
  },
  {
    id: "eu-west",
    name: "EU West (Ireland)",
    code: "EU-WST",
    flag: "🇮🇪",
    coordinates: { x: 46, y: 32 },
    carbonIntensity: 45, // gCO2/kWh
    gridStatus: "Clean Grid (Wind Surplus)",
    statusColor: "emerald",
    latencyBaseline: 65, // ms
    energyMix: { solar: 15, wind: 62, hydro: 15, fossil: 8 },
    temperature: "17°C",
    activeLoadGflops: 42,
    maxCapacityGflops: 110
  },
  {
    id: "asia-east",
    name: "Asia Pacific (Tokyo)",
    code: "AP-TYO",
    flag: "🇯🇵",
    coordinates: { x: 84, y: 44 },
    carbonIntensity: 290, // gCO2/kWh
    gridStatus: "Moderate Grid (Gas/Nuclear)",
    statusColor: "yellow",
    latencyBaseline: 115, // ms
    energyMix: { solar: 22, wind: 10, hydro: 18, fossil: 50 },
    temperature: "24°C",
    activeLoadGflops: 60,
    maxCapacityGflops: 100
  }
];

export const BENCHMARK_COMPARISON = [
  {
    scheduler: "Default Kubernetes Scheduler (kube-scheduler)",
    type: "Baseline",
    carbonReduction: "0.0%",
    avgLatency: "28 ms",
    slaBreachRate: "0.12%",
    networkOverhead: "0.0%",
    p99Latency: "48 ms",
    energyEfficiency: "1.00x",
    description: "Standard bin-packing based on CPU/RAM requests without grid carbon awareness."
  },
  {
    scheduler: "Static Geo Carbon-Aware (Threshold-based)",
    type: "Rule-Based",
    carbonReduction: "14.8%",
    avgLatency: "54 ms",
    slaBreachRate: "1.85%",
    networkOverhead: "4.2%",
    p99Latency: "110 ms",
    energyEfficiency: "1.18x",
    description: "Static carbon thresholds triggering coarse workload shifts; high SLA breaches during peak congestion."
  },
  {
    scheduler: "Follow-the-Sun Heuristic",
    type: "Heuristic",
    carbonReduction: "21.3%",
    avgLatency: "68 ms",
    slaBreachRate: "0.94%",
    networkOverhead: "5.1%",
    p99Latency: "135 ms",
    energyEfficiency: "1.25x",
    description: "Routes compute to daylight regions with high solar output; fails to account for regional wind patterns."
  },
  {
    scheduler: "EcoSched (Proposed DRL Framework)",
    type: "Proposed (EcoSched)",
    carbonReduction: "34.2%",
    avgLatency: "42 ms",
    slaBreachRate: "0.04%",
    networkOverhead: "2.6%",
    p99Latency: "72 ms",
    energyEfficiency: "1.52x",
    highlight: true,
    description: "Couples multi-horizon spatial carbon intensity neural forecasters with SLA-bounded DRL queueing."
  }
];

export const PIPELINE_STEPS = [
  {
    id: 1,
    title: "Workload Profiling Engine",
    subtitle: "Classification & Delay Tolerance Parsing",
    icon: "Cpu",
    detail: "Classifies incoming cloud API tasks into interactive (e.g., HTTP gateway, database queries <50ms) vs delay-tolerant batch compute (e.g., LLM fine-tuning, video rendering, analytics indexing). Computes maximum allowable temporal laxity T_slack.",
    inputs: ["Ingress Workload Stream", "SLA SLA_bound Vector"],
    outputs: ["Laxity Profile (0.0 to 1.0)", "Memory & GFLOPS Demand"]
  },
  {
    id: 2,
    title: "Carbon Grid Forecaster",
    subtitle: "LSTM-Attention Grid Telemetry",
    icon: "CloudSun",
    detail: "Retrieves real-time carbon intensity APIs (WattTime / Electricity Maps) across all target datacenter nodes. Employs a 24-hour lookahead LSTM-Attention neural network to predict renewable power availability curves.",
    inputs: ["Live Grid gCO2/kWh Telemetry", "Weather & Solar Irradiance Data"],
    outputs: ["24-Hour Carbon Forecast Matrix C(t, r)"]
  },
  {
    id: 3,
    title: "Multi-Objective DRL Scheduler",
    subtitle: "PPO Policy Neural Engine",
    icon: "BrainCircuit",
    detail: "Executes a Proximal Policy Optimization (PPO) neural agent trained on multi-datacenter state space. Balancing carbon reduction, network ingress/egress transit costs, and SLA penalty curves.",
    inputs: ["Workload Queue Laxity", "Node Carbon Forecast C(t,r)", "Network Latency Matrix L(r1,r2)"],
    outputs: ["Target Datacenter Node Selection", "Optimal Time-Shift Window \u0394t"]
  },
  {
    id: 4,
    title: "Spatial-Temporal Deployment",
    subtitle: "eBPF Fast Packet & Container Dispatcher",
    icon: "Zap",
    detail: "Dispatches workloads to the optimal green datacenter via high-speed eBPF network tunnels. Dynamically adjusts container CPU quotas and temporal deferral queues without breaking user SLAs.",
    inputs: ["Dispatch Action Vector", "Container Manifest"],
    outputs: ["Active Workload Migration Stream", "Audit Log & Carbon Certificate"]
  }
];

export const CODE_SNIPPET = `import torch
import torch.nn as nn
from typing import Dict, Tuple

class EcoSchedDRLAgent(nn.Module):
    """
    Multi-Objective Proximal Policy Optimization (PPO) Actor-Critic Agent
    for Spatial-Temporal Carbon-Aware Cloud Workload Routing.
    """
    def __init__(self, state_dim: int = 32, action_dim: int = 8, hidden_dim: int = 128):
        super(EcoSchedDRLAgent, self).__init__()
        
        # Shared Feature Extractor
        self.feature_net = nn.Sequential(
            nn.Linear(state_dim, hidden_dim),
            nn.LayerNorm(hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.SiLU()
        )
        
        # Actor Head (Spatial Target Datacenter Distribution)
        self.actor_head = nn.Linear(hidden_dim, action_dim)
        
        # Value Head (Expected Multi-Objective Reward: Carbon + SLA + Cost)
        self.critic_head = nn.Linear(hidden_dim, 1)

    def compute_objective_cost(self, carbon_intensity: float, energy_kwh: float, 
                               latency_ms: float, sla_bound_ms: float,
                               alpha: float = 1.0, beta: float = 0.5, gamma: float = 2.0) -> torch.Tensor:
        """
        Calculates the exact paper optimization loss objective:
        Min \u03a3 (\u03b1 * Carbon_Intensity * Energy + \u03b2 * Latency_Penalty + \u03b3 * SLA_Violation)
        """
        carbon_cost = alpha * carbon_intensity * energy_kwh
        latency_penalty = beta * max(0.0, latency_ms - 20.0)
        sla_violation = gamma * max(0.0, latency_ms - sla_bound_ms) ** 2
        
        total_loss = carbon_cost + latency_penalty + sla_violation
        return torch.tensor(total_loss, dtype=torch.float32)

    def forward(self, state_tensor: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        features = self.feature_net(state_tensor)
        action_logits = self.actor_head(features)
        state_value = self.critic_head(features)
        return torch.softmax(action_logits, dim=-1), state_value
`;

export const BIBTEX_CITATION = `@inproceedings{vance2026ecosched,
  author    = {Vance, Elena and Sterling, Marcus and Tanaka, Hiroshi and Chen, Aria},
  title     = {EcoSched: Carbon-Aware Dynamic Workload Orchestration in Cloud Computing},
  booktitle = {Proceedings of the 2026 ACM SIGCOMM Conference on Sustainable Computing},
  pages     = {114--129},
  year      = {2026},
  publisher = {ACM},
  doi       = {10.1145/3698742.3701290}
}`;
