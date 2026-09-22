import React from 'react';
import { Trophy, Award, Medal, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { CURRENT_SEASON } from '../../data/mockData';

interface PrizePoolSectionProps {
  onJoinClick: () => void;
}

export const PrizePoolSection: React.FC<PrizePoolSectionProps> = ({ onJoinClick }) => {
  const prizes = CURRENT_SEASON.prizes;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#070b12] border-b border-slate-800" id="prize-pool">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TỔNG GIẢI THƯỞNG MÙA 04 • $1,140 USDT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cơ Cấu Giải Thưởng & Quyền Lợi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Giải thưởng kết hợp giữa <span className="text-emerald-400 font-bold">Tiền mặt giải ngân tức thì</span> và <span className="text-cyan-400 font-bold">Bản quyền phần mềm Bamboozer Pro VIP</span> hỗ trợ sự nghiệp giao dịch dài hạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Champion */}
          <div className="relative bg-gradient-to-b from-[#16201a] via-[#0c131a] to-[#070b12] border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black font-mono font-black text-xs px-3 py-1 rounded-full shadow-lg">
              QUÁN QUÂN • TOP 1
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 mt-2">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Hạng Nhất</h3>
              <div className="text-3xl font-mono font-black text-emerald-400 mb-4">$580 <span className="text-xs font-normal text-slate-400">USDT</span></div>
              
              <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>$100 USDT Tiền Mặt</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 Năm Bamboozer Pro ($480)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Vinh danh Hall of Fame Top 1</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-emerald-400/80 font-mono bg-emerald-500/10 p-2 rounded-lg text-center">
              ROI cao nhất &amp; Drawdown ≤ 10%
            </div>
          </div>

          {/* Runner Up */}
          <div className="bg-[#0c121e] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <Medal className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Hạng Nhì</h3>
              <div className="text-3xl font-mono font-black text-cyan-400 mb-4">$290 <span className="text-xs font-normal text-slate-400">USDT</span></div>

              <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>$50 USDT Tiền Mặt</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>6 Tháng Bamboozer Pro ($240)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Huy hiệu Runner-Up VIP</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-900 p-2 rounded-lg text-center">
              Top 2 ROI mùa giải
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-[#0c121e] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Hạng Ba</h3>
              <div className="text-3xl font-mono font-black text-amber-400 mb-4">$135 <span className="text-xs font-normal text-slate-400">USDT</span></div>

              <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>$30 USDT Tiền Mặt</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>3 Tháng Bamboozer Pro ($105)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Chứng chỉ Top 3 Trader</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-900 p-2 rounded-lg text-center">
              Top 3 ROI mùa giải
            </div>
          </div>

          {/* Risk Award */}
          <div className="relative bg-gradient-to-b from-[#171424] via-[#0e101a] to-[#070b12] border-2 border-indigo-500/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white font-mono font-black text-xs px-3 py-1 rounded-full shadow-lg">
              GIẢI QUẢN TRỊ RỦI RO
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 mt-2">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Risk Award</h3>
              <div className="text-3xl font-mono font-black text-indigo-400 mb-4">$135 <span className="text-xs font-normal text-slate-400">USDT</span></div>

              <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>$30 USDT Tiền Mặt</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>3 Tháng Bamboozer Pro ($105)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Dành cho Trader có DD thấp nhất</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-indigo-300 font-mono bg-indigo-500/10 p-2 rounded-lg text-center">
              Drawdown &lt; 2.5% &amp; ROI dương
            </div>
          </div>
        </div>

        {/* Banner CTA */}
        <div className="bg-[#0b101c] border border-slate-800 rounded-2xl p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-sm font-bold text-white">Bạn tự tin với phương pháp giao dịch của mình?</div>
            <div className="text-xs text-slate-400">Đăng ký hoàn toàn miễn phí chỉ với vài bước đơn giản.</div>
          </div>
          <button
            onClick={onJoinClick}
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-black bg-[#00C076] hover:bg-[#00d684] cursor-pointer shrink-0 transition-all"
          >
            ĐĂNG KÝ TRANH TÀI
          </button>
        </div>
      </div>
    </section>
  );
};
