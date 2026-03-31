"use client";

import { 
  Rocket, 
  Plus, 
  TrendingUp, 
  Activity, 
  Clock, 
  ChevronRight, 
  BrainCircuit,
  Megaphone,
  Zap,
  LucideIcon
} from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => (
  <div className="group relative p-6 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500">
    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
      <Icon className="h-12 w-12 text-[#5B6EFF]" />
    </div>
    <div className="relative z-10">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-2">{title}</p>
      <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>
      <div className="flex items-center gap-2 text-xs font-bold text-[#5B6EFF]">
        <TrendingUp className="h-3 w-3" />
        <span>{change} this cycle</span>
      </div>
    </div>
  </div>
);

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

const ActionCard = ({ title, description, icon: Icon, color, href }: ActionCardProps) => (
  <Link href={href} className="group relative p-8 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500">
    <div className={`absolute top-0 right-0 h-40 w-40 rounded-full blur-[100px] -mr-20 -mt-20 opacity-0 group-hover:opacity-20 transition-opacity duration-700`} style={{ backgroundColor: color }}></div>
    
    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(240,90,40,0.3)]`} style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}>
        <Icon className="h-8 w-8" style={{ color: color }} />
      </div>
      <div>
        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-[#5B6EFF] transition-colors">{title}</h4>
        <p className="text-white/40 leading-relaxed font-medium">{description}</p>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#5B6EFF] mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
        Initiate Protocol <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  </Link>
);

export default function DashboardOverview() {
  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-white mb-3">Protocol Overview</h1>
          <p className="text-white/40 font-medium text-lg max-w-2xl">
            Welcome to your neural command center. Deploy, monitor and scale your autonomous agents across the Revora cluster.
          </p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#5B6EFF] text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(240,90,40,0.3)] hover:shadow-[0_25px_50px_rgba(240,90,40,0.4)] transition-all hover:translate-y-[-2px] active:scale-95 whitespace-nowrap">
          <Plus className="h-5 w-5" />
          New Campaign
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Agents" value="12" change="+4" icon={BrainCircuit} />
        <StatCard title="Cluster Health" value="99.9%" change="Stable" icon={Activity} />
        <StatCard title="Inference Time" value="42ms" change="-8ms" icon={Clock} />
        <StatCard title="Successful Tasks" value="14.2k" change="+1.2k" icon={Rocket} />
      </div>

      {/* Core Actions */}
      <div>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-8 ml-1">Next Operations</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ActionCard 
            title="Deploy Campaign" 
            description="Start a new autonomous campaign across multiple network nodes and define target intent." 
            icon={Megaphone} 
            color="#5B6EFF"
            href="/dashboard/campaigns/new"
          />
          <ActionCard 
            title="Neural Training" 
            description="Fine-tune your existing agents with new datasets to improve decision accuracy and logic." 
            icon={BrainCircuit} 
            color="#3b82f6"
            href="/dashboard/training"
          />
          <ActionCard 
            title="Scaling Cluster" 
            description="Expand your computational resources to handle high-frequency autonomous requests." 
            icon={Zap} 
            color="#10b981"
            href="/dashboard/scale"
          />
        </div>
      </div>

      {/* Recent Activity Mini-List */}
      <div className="rounded-[40px] border border-white/5 bg-white/[0.01] p-8">
        <h3 className="text-xl font-bold text-white mb-6">Real-time Logs</h3>
        <div className="space-y-4">
          {[
            { log: "Agent 'Delta-7' successfully reached target intent", time: "2 mins ago", type: "success" },
            { log: "Node cluster 'Region-EU-1' automatically scaled (+2 nodes)", time: "15 mins ago", type: "info" },
            { log: "Campaign 'Project Phoenix' data ingestion complete", time: "1 hour ago", type: "success" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group cursor-default">
              <div className="flex items-center gap-4">
                <div className={`h-2 w-2 rounded-full ${item.type === 'success' ? 'bg-[#10b981]' : 'bg-[#3b82f6]'} shadow-[0_0_10px_currentColor]`}></div>
                <span className="text-white/60 font-medium group-hover:text-white transition-colors">{item.log}</span>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white/20">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
