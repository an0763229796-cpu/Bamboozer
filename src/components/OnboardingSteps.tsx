import React from 'react';
import { ONBOARDING_STEPS } from '../data/content';
import { KeyRound, Sliders, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

export const OnboardingSteps: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const iconMap = {
    KeyRound: <KeyRound className="w-6 h-6 text-emerald-400" />,
    Sliders: <Sliders className="w-6 h-6 text-cyan-400" />,
    Activity: <Activity className="w-6 h-6 text-teal-400" />
  };

  return (
    <section className="py-20 bg-[#090d15] border-t border-slate-800/80" id="onboarding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Đơn Giản &amp; Nhanh Chóng</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Khởi Động Giao Dịch AI Chỉ Trong 3 Bước Đơn Giản
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Không cần thủ tục rườm rà, không cần nộp tiền vào ví trung gian. Bạn chỉ mất 5 phút để đưa hệ thống vào vận hành tự động.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {ONBOARDING_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {iconMap[step.icon as keyof typeof iconMap]}
                  </div>
                  <span className="text-2xl font-mono font-black text-slate-700 group-hover:text-emerald-500/40 transition-colors">
                    {step.step}
                  </span>
                </div>

                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 inline-block">
                  {step.statusTag}
                </span>

                <h3 className="text-lg font-bold text-white mb-1">
                  {step.title}
                </h3>
                <h4 className="text-xs font-semibold text-slate-400 mb-3">
                  {step.subtitle}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Thời gian: <strong className="text-white font-mono">{step.duration}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  Bước {idx + 1}/3
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenRegister}
            className="px-7 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Bắt đầu Bước 01 ngay (Nhận 100 Credits)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
