"use client";

import { useState } from "react";
import { 
  Rocket, 
  Settings, 
  Target, 
  Cpu, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Globe,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = ["Configuration", "Targeting", "Optimization", "Launch"];

export default function NewCampaignPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleLaunch();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard/campaigns");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/campaigns"
          className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-syne">New Campaign</h1>
          <p className="text-sm text-gray-400 mt-0.5">Define your autonomous marketing protocol.</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="relative flex items-center justify-between px-1">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.05] -translate-y-1/2 z-0"></div>
        {STEPS.map((step, i) => (
          <div key={step} className="relative z-10 flex flex-col items-center gap-2">
            <div 
              className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all duration-500 bg-black/90 ${
                i <= currentStep 
                  ? "border-[#5B6EFF] text-white shadow-[0_0_15px_rgba(91,110,255,0.3)]" 
                  : "border-white/[0.05] text-gray-600"
              }`}
            >
              {i < currentStep ? <CheckCircle2 size={18} className="text-[#5B6EFF]" /> : i + 1}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${
              i <= currentStep ? "text-[#5B6EFF]" : "text-gray-600"
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="p-8 pb-12 rounded-[40px] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5B6EFF]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[#5B6EFF]/10 transition-colors duration-1000"></div>

        {currentStep === 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5B6EFF] ml-1">Protocol Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Q4 Viral Growth"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-2xl py-4 px-5 text-white placeholder:text-gray-600 focus:border-[#5B6EFF]/50 focus:ring-0 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5B6EFF] ml-1">Base Budget</label>
                <input 
                  type="number" 
                  placeholder="$ 5,000"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-2xl py-4 px-5 text-white placeholder:text-gray-600 focus:border-[#5B6EFF]/50 focus:ring-0 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5B6EFF] ml-1">Cluster Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'ai', icon: Rocket, label: 'Full Auto', desc: 'AI handles everything' },
                  { id: 'hybrid', icon: Cpu, label: 'Hybrid', desc: 'Managed assets' },
                  { id: 'scheduled', icon: Calendar, label: 'Scheduled', desc: 'Manual timing' },
                ].map((type) => (
                  <button key={type.id} className="p-5 text-left rounded-3xl border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#5B6EFF]/40 transition-all group/btn">
                    <type.icon size={24} className="text-gray-400 group-hover/btn:text-[#5B6EFF] transition-colors mb-3" />
                    <div className="font-bold text-white text-sm">{type.label}</div>
                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-tight">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5B6EFF] ml-1">Region Targeting</label>
                <div className="flex items-center gap-2 p-4 bg-white/[0.04] border border-white/[0.1] rounded-2xl">
                  <Globe size={18} className="text-gray-500" />
                  <span className="text-sm text-white">Global (Default)</span>
                  <ChevronRight size={14} className="ml-auto text-gray-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5B6EFF] ml-1">Ideal Audience</label>
                <input 
                  type="text" 
                  placeholder="e.g. Developers, Founders"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-2xl py-4 px-5 text-white placeholder:text-gray-600 focus:border-[#5B6EFF]/50 focus:ring-0 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5B6EFF] ml-1">Target Keywords</label>
              <div className="flex flex-wrap gap-2 p-2 min-h-[100px] bg-white/[0.02] border border-white/[0.1] rounded-3xl">
                {['SAAS', 'AI', 'AUTOMATION'].map(tag => (
                   <span key={tag} className="px-4 py-2 rounded-xl bg-[#5B6EFF]/10 border border-[#5B6EFF]/20 text-[#5B6EFF] text-[10px] font-black flex items-center gap-2">
                     {tag}
                     <button className="hover:text-white">×</button>
                   </span>
                ))}
                <button className="px-4 py-2 rounded-xl border border-dashed border-white/20 text-gray-500 text-[10px] font-black flex items-center gap-2 hover:border-[#5B6EFF] hover:text-[#5B6EFF] transition-colors">
                  <Plus size={14} /> ADD KEYWORD
                </button>
              </div>
            </div>
          </div>
        )}

        {(currentStep === 2 || currentStep === 3) && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in zoom-in-95 duration-500 text-center">
            <div className="w-20 h-20 rounded-full bg-[#5B6EFF]/10 border border-[#5B6EFF]/20 flex items-center justify-center text-[#5B6EFF] animate-pulse">
               <Target size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-syne">Almost ready for deployment</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">Review your protocol parameters before initializing the autonomous cluster.</p>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/[0.05]">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-2xl transition-all ${
              currentStep === 0 ? "opacity-0 invisible" : "text-gray-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <ChevronLeft size={20} />
            Back
          </button>
          
          <button 
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-[#5B6EFF] hover:bg-[#4a59cc] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                INITIALIZING...
              </span>
            ) : (
              <>
                {currentStep === STEPS.length - 1 ? "Initialize Protocol" : "Next Protocol Step"}
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
