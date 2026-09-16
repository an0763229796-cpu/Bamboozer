import React, { useState } from 'react';
import { TARGET_AUDIENCES } from '../data/content';
import { Zap, ShieldCheck, BookOpen, Check, ArrowRight, UserCheck } from 'lucide-react';

export const AudienceSection: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const [selectedAudience, setSelectedAudience] = useState<string>('parttime');

  const icons = {
    fulltime: <Zap className="w-5 h-5 text-amber-400" />,
    parttime: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    beginner: <BookOpen className="w-5 h-5 text-cyan-400" />
  };

  return (
    <section className="py-20 bg-[#080c14] border-t border-slate-800/80" id="audiences">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Được Thiết Kế Cho Mọi Cấp Độ Nhà Đầu Tư</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Bạn Thuộc Nhóm Nhà Giao Dịch Nào?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Dù bạn là trader toàn thời gian cần tốc độ nano-giây hay người mới bắt đầu muốn tích lũy an toàn, Bamboozer luôn có bộ công cụ tối ưu cho bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TARGET_AUDIENCES.map((aud) => {
            const isSelected = selectedAudience === aud.id;
            return (
              <div
                key={aud.id}
                onClick={() => setSelectedAudience(aud.id)}
                className={`rounded-2xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#111a29] to-[#0d131f] border-emerald-500/50 shadow-xl shadow-emerald-500/10'
                    : 'bg-[#0d121c] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      {icons[aud.id as keyof typeof icons]}
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {aud.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5">
                    {aud.role}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-400 mb-5">
                    {aud.tagline}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {aud.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenRegister();
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span>Bắt đầu với vai trò {aud.role.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
