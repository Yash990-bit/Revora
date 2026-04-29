'use client';

import {
  Plus,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Send,
  CheckCircle2,
  KeyRound,
  UserRoundCheck,
} from 'lucide-react';

const APP_CONNECT = [
  {
    name: 'Mail Protocol',
    category: 'Email',
    icon: Mail,
    status: 'Active',
    desc: 'Connect your sender inbox and launch personalized lead emails.',
    color: '#f05a28',
  },
];

const EMAIL_SETUP_STEPS = [
  {
    title: 'Choose sender account',
    desc: 'Use the inbox you want leads to see when your campaign lands.',
    icon: UserRoundCheck,
    status: 'Your login account',
  },
  {
    title: 'Authorize Gmail',
    desc: 'Grant secure send-only access so Revora can dispatch campaign emails.',
    icon: ShieldCheck,
    status: 'OAuth required',
  },
  {
    title: 'Generate outreach',
    desc: 'Create the AI email draft from campaign, ICP, and lead context.',
    icon: Sparkles,
    status: 'Outreach page',
  },
  {
    title: 'Send to leads',
    desc: 'Confirm the campaign and send one personalized email per lead.',
    icon: Send,
    status: 'Ready after connect',
  },
];

export default function IntegrationsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-syne text-glow">
            Integrations
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Connect your sender account and external tools for campaign execution.
          </p>
        </div>
      </div>

      {/* Sender Setup Flow */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111]">
        <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.4fr]">
          <div className="p-6 border-b xl:border-b-0 xl:border-r border-white/[0.06] bg-white/[0.01]">
            <div className="h-11 w-11 rounded-xl bg-[#f05a28]/15 border border-[#f05a28]/20 flex items-center justify-center mb-5">
              <Mail className="h-5 w-5 text-[#f05a28]" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f05a28]">
              Sender Setup
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
              Send emails from your inbox
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45 max-w-md">
              Connect Gmail once, then Revora can send campaign emails from the logged-in sender
              account to every lead in the selected campaign.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`${API_URL}/gmail/auth`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f05a28] text-white text-xs font-black uppercase tracking-widest hover:bg-[#d44e22] transition-all shadow-[0_4px_16px_rgba(240,90,40,0.3)]"
              >
                <KeyRound className="h-4 w-4" />
                Connect Gmail
              </a>
              <a
                href="/dashboard/outreach"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 text-xs font-black uppercase tracking-widest hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                Open Outreach
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {EMAIL_SETUP_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="p-5 border-b md:border-r border-white/[0.06] last:border-b-0 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="h-10 w-10 rounded-xl bg-black/30 border border-white/[0.08] flex items-center justify-center">
                      <step.icon className="h-4 w-4 text-[#f05a28]" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-[#f05a28] text-white text-[10px] font-black flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-black text-white">{step.title}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[9px] font-black uppercase tracking-widest text-white/30">
                        {step.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-white/35">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Toolbar */}

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {APP_CONNECT.map((app) => (
          <div
            key={app.name}
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-[#f05a28]/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/[0.05] flex items-center justify-center p-3.5 relative overflow-hidden group-hover:border-[#f05a28]/40 transition-colors">
                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: app.color }}
                  ></div>
                  <app.icon
                    size={24}
                    className="text-white group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-none">{app.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#f05a28] mt-2 opacity-60">
                    {app.category}
                  </p>
                </div>
              </div>
              <div
                className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                  app.status === 'Active' || app.status === 'Connected'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                }`}
              >
                {app.status}
              </div>
            </div>

            <p className="mt-6 font-medium text-sm text-gray-500 leading-relaxed max-w-[85%]">
              {app.desc}
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-white/[0.03] pt-6 relative z-10">
              <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors group/link">
                Learn Protocol
                <ArrowUpRight
                  size={14}
                  className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"
                />
              </button>
              {app.status === 'Not Connected' ? (
                <button className="bg-[#f05a28] hover:bg-[#d44e22] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_4px_10px_rgba(240,90,40,0.2)]">
                  Link Cluster
                </button>
              ) : app.name === 'Mail Protocol' ? (
                <a
                  href={`${API_URL}/gmail/auth`}
                  className="inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#d44e22] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_4px_10px_rgba(240,90,40,0.2)]"
                >
                  Setup Sender
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </a>
              ) : (
                <button className="bg-white/[0.03] border border-white/[0.05] text-gray-500 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Manage
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Custom API Card */}
        <div className="p-6 rounded-2xl border-2 border-dashed border-white/[0.05] bg-transparent flex flex-col items-center justify-center text-center space-y-4 hover:border-[#f05a28]/30 hover:bg-white/[0.01] transition-all group cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-500 group-hover:text-[#f05a28] transition-colors">
            <Plus size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold">Custom Webhook</h3>
            <p className="text-xs text-gray-500 uppercase tracking-tight mt-1">
              Direct API cluster connection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
