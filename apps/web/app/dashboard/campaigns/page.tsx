"use client";

import { useState } from "react";
import { 
  Rocket, 
  Target, 
  Users, 
  MessageSquare, 
  Zap, 
  ArrowRight, 
  ChevronRight,
  Plus,
  BarChart3,
  Search,
  Filter
} from "lucide-react";
import Link from "next/link";

const CAMPAIGNS = [
  {
    id: "CP-001",
    name: "Q4 Hyper-Growth Protocol",
    status: "Active",
    reach: "124,000",
    engagement: "18.2%",
    type: "Automation",
    color: "#5B6EFF"
  },
  {
    id: "CP-002",
    name: "Neural Re-targeting Alpha",
    status: "Active",
    reach: "45,200",
    engagement: "12.5%",
    type: "AI Optimization",
    color: "#f05a28"
  },
  {
    id: "CP-003",
    name: "Global Outreach v2",
    status: "Paused",
    reach: "89,000",
    engagement: "5.4%",
    type: "Email",
    color: "#94a3b8"
  }
];

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-syne">Campaigns</h1>
          <p className="text-sm text-gray-400 mt-1">Deploy and monitor your autonomous operation clusters.</p>
        </div>
        <Link 
          href="/dashboard/campaigns/new"
          className="flex items-center justify-center gap-2 bg-[#5B6EFF] hover:bg-[#4a59cc] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(91,110,255,0.4)] active:scale-95"
        >
          <Plus size={18} />
          Launch New Campaign
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Reach", value: "258.4k", icon: Users, color: "#5B6EFF" },
          { label: "Avg. Engagement", value: "14.2%", icon: Zap, color: "#f05a28" },
          { label: "Active Nodes", value: "12 / 15", icon: Rocket, color: "#10b981" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 p-2 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search clusters..."
            className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm text-white focus:ring-0 placeholder:text-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] text-white text-sm font-medium hover:bg-white/[0.1] transition-colors">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {CAMPAIGNS.map((campaign) => (
          <div 
            key={campaign.id}
            className="group relative flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-black/40 border border-white/[0.05] group-hover:border-[#5B6EFF]/30 transition-colors">
                <div 
                  className="absolute inset-0 opacity-20 blur-lg rounded-full" 
                  style={{ backgroundColor: campaign.color }}
                ></div>
                <BarChart3 size={24} style={{ color: campaign.color }} className="relative z-10" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{campaign.name}</h3>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${
                    campaign.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Users size={14} /> {campaign.reach} Reach</span>
                  <span className="flex items-center gap-1"><Zap size={14} /> {campaign.engagement} Eng.</span>
                  <span className="text-[10px] font-mono text-gray-600">ID: {campaign.id}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end mr-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Cluster Type</div>
                <div className="text-sm text-white/70 font-medium">{campaign.type}</div>
              </div>
              <button className="p-3 rounded-xl bg-white/[0.05] text-white/40 hover:text-white hover:bg-[#5B6EFF] transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
