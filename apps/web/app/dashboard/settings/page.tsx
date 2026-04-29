'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Copy,
  CreditCard,
  Cpu,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  User,
  Webhook,
} from 'lucide-react';

const TABS = [
  { name: 'My Account', icon: User, code: 'account' },
  { name: 'Security', icon: Shield, code: 'security' },
  { name: 'Billing', icon: CreditCard, code: 'billing' },
  { name: 'Notifications', icon: Bell, code: 'notifications' },
  { name: 'API & Nodes', icon: Cpu, code: 'api' },
];

const inputClass =
  'w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-[#f05a28]/50';

const labelClass = 'text-[10px] font-black uppercase tracking-[0.18em] text-white/35';

function SettingRow({
  icon: Icon,
  title,
  desc,
  enabled,
}: {
  icon: typeof Bell;
  title: string;
  desc: string;
  enabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-[#f05a28]/10 border border-[#f05a28]/20 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-[#f05a28]" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-xs text-white/35 mt-0.5">{desc}</p>
        </div>
      </div>
      <button
        className={`relative h-6 w-11 rounded-full border transition-colors shrink-0 ${
          enabled ? 'bg-[#f05a28] border-[#f05a28]' : 'bg-white/[0.06] border-white/[0.1]'
        }`}
        title={enabled ? 'Enabled' : 'Disabled'}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [user, setUser] = useState<{
    full_name?: string;
    email?: string;
    role?: string;
    company_name?: string | null;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const initials = (user?.full_name || 'Agent')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
          <p className="text-sm text-white/40 mt-0.5">
            Manage your profile, sender preferences, billing, and workspace access.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f05a28] px-5 py-2.5 text-sm font-black text-white shadow-[0_4px_16px_rgba(240,90,40,0.3)] transition-colors hover:bg-[#d44e22]">
          <CheckCircle2 className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
        <div className="rounded-xl bg-[#111] border border-white/[0.06] p-2 h-fit">
          {TABS.map((tab) => (
            <button
              key={tab.code}
              onClick={() => setActiveTab(tab.code)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.code
                  ? 'bg-[#f05a28]/15 text-[#f05a28] border border-[#f05a28]/20'
                  : 'text-white/35 hover:bg-white/[0.04] hover:text-white border border-transparent'
              }`}
            >
              <tab.icon className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{tab.name}</span>
              {activeTab === tab.code && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-[#111] border border-white/[0.06] overflow-hidden">
          {activeTab === 'account' && (
            <section className="p-5 md:p-6 space-y-6">
              <div className="flex items-center gap-4 rounded-xl bg-white/[0.025] border border-white/[0.06] p-4">
                <div className="h-16 w-16 rounded-xl bg-[#f05a28] flex items-center justify-center text-xl font-black text-white shadow-[0_0_20px_rgba(240,90,40,0.25)]">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-black text-white truncate">
                    {user?.full_name || 'Agent'}
                  </p>
                  <p className="text-xs text-white/35 truncate">
                    {user?.role || 'Member'} · {user?.company_name || 'Revora workspace'}
                  </p>
                  <button className="mt-2 text-[10px] font-black uppercase tracking-widest text-[#f05a28] hover:text-white transition-colors">
                    Upload Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Display Name</label>
                  <input
                    className={inputClass}
                    defaultValue={user?.full_name || ''}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Email Address</label>
                  <input
                    className={`${inputClass} text-white/45`}
                    defaultValue={user?.email || ''}
                    type="email"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Company Name</label>
                  <input
                    className={inputClass}
                    defaultValue={user?.company_name || ''}
                    placeholder="Company"
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Role</label>
                  <select className={inputClass} defaultValue={user?.role || 'Founder'}>
                    <option className="bg-[#111]">Founder</option>
                    <option className="bg-[#111]">Sales Head</option>
                    <option className="bg-[#111]">Marketing</option>
                    <option className="bg-[#111]">SDR</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Email Signature</label>
                <textarea
                  rows={4}
                  className={`${inputClass} resize-none`}
                  defaultValue={`Thanks,\n${user?.company_name || 'Revora'} Team`}
                />
              </div>
            </section>
          )}

          {activeTab === 'security' && (
            <section className="p-5 md:p-6 space-y-5">
              <div>
                <p className="text-sm font-black text-white">Security</p>
                <p className="text-xs text-white/35 mt-1">
                  Control login access and sender account authorization.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SettingRow
                  icon={Lock}
                  title="Two-factor authentication"
                  desc="Require a second step for account login."
                />
                <SettingRow
                  icon={Mail}
                  title="Gmail send access"
                  desc="Allow campaign emails from your connected inbox."
                  enabled
                />
                <SettingRow
                  icon={KeyRound}
                  title="Password rotation"
                  desc="Prompt password updates every 90 days."
                />
                <SettingRow
                  icon={Shield}
                  title="Session protection"
                  desc="Sign out inactive devices automatically."
                  enabled
                />
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors">
                <RefreshCw className="h-4 w-4" />
                Reconnect Gmail
              </button>
            </section>
          )}

          {activeTab === 'billing' && (
            <section className="p-5 md:p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-[#f05a28]/20 bg-[#f05a28]/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#f05a28]">
                    Current Plan
                  </p>
                  <p className="text-2xl font-black text-white mt-2">Growth</p>
                  <p className="text-xs text-white/35 mt-1">Campaign automation enabled</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                    Lead Credits
                  </p>
                  <p className="text-2xl font-black text-white mt-2">2,400</p>
                  <p className="text-xs text-white/35 mt-1">available this month</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                    Renewal
                  </p>
                  <p className="text-2xl font-black text-white mt-2">May 29</p>
                  <p className="text-xs text-white/35 mt-1">next billing cycle</p>
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                {[
                  'Payment method: Visa ending 4242',
                  'Invoice email: billing@company.com',
                  'Usage alerts: enabled',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] last:border-b-0"
                  >
                    <span className="text-sm text-white/65">{item}</span>
                    <button className="text-xs font-bold text-[#f05a28] hover:text-white transition-colors">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'notifications' && (
            <section className="p-5 md:p-6 space-y-5">
              <div>
                <p className="text-sm font-black text-white">Notifications</p>
                <p className="text-xs text-white/35 mt-1">
                  Decide which campaign events should reach your inbox.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SettingRow
                  icon={Bell}
                  title="Campaign completed"
                  desc="Notify when lead generation finishes."
                  enabled
                />
                <SettingRow
                  icon={Mail}
                  title="Email send summary"
                  desc="Receive a report after every campaign blast."
                  enabled
                />
                <SettingRow
                  icon={User}
                  title="New lead found"
                  desc="Alert when a fresh lead enters your pipeline."
                />
                <SettingRow
                  icon={Shield}
                  title="Integration warnings"
                  desc="Warn when an API key or Gmail token needs attention."
                  enabled
                />
              </div>
            </section>
          )}

          {activeTab === 'api' && (
            <section className="p-5 md:p-6 space-y-5">
              <div>
                <p className="text-sm font-black text-white">API & Nodes</p>
                <p className="text-xs text-white/35 mt-1">
                  Manage keys and webhook endpoints for Revora workflows.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4 flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/30">
                    Public API Key
                  </p>
                  <p className="text-sm text-white/70 mt-1 font-mono">rv_live_••••••••••••9f2a</p>
                </div>
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3 py-2 text-xs font-bold text-white/70 hover:text-white">
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-[#f05a28] px-3 py-2 text-xs font-bold text-white hover:bg-[#d44e22]">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Rotate
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SettingRow
                  icon={Webhook}
                  title="Lead webhook"
                  desc="Post new leads to your CRM endpoint."
                  enabled
                />
                <SettingRow
                  icon={Cpu}
                  title="Agent execution logs"
                  desc="Expose generation events through API logs."
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
