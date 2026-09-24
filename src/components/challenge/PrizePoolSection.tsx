import React from 'react';
import { Trophy, Award, Medal, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { CURRENT_SEASON } from '../../data/mockData';

interface PrizePoolSectionProps {
  onJoinClick: () => void;
}

export const PrizePoolSection: React.FC<PrizePoolSectionProps> = ({ onJoinClick }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#070b12] border-b border-slate-800" id="prize-pool">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CƠ CẤU GIẢI THƯỞNG 14-DAY CHALLENGE • $700 TIỀN MẶT + PRO VIP</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cơ Cấu Giải Thưởng &amp; Phần Thưởng
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Người tham gia tự xây dựng hoặc sử dụng <span className="text-emerald-400 font-bold">Indicator, Strategy</span> và áp dụng vào <span className="text-cyan-400 font-bold">Live Trading</span>. Đánh giá dựa trên <span className="text-white font-semibold">lợi nhuận ròng</span> kết hợp mức độ tuân thủ quy định quản lý rủi ro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Champion - Giải Nhất */}
          <div className="relative bg-gradient-to-b from-[#16201a] via-[#0c131a] to-[#070b12] border-2 border-emerald-500/60 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black font-mono font-black text-xs px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
              QUÁN QUÂN • GIẢI NHẤT
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 mt-2">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Giải Nhất</h3>
              <div className="text-3xl font-mono font-black text-emerald-400 mb-4">
                $300 <span className="text-xs font-normal text-slate-400">+ 3 Tháng Pro</span>
              </div>
              
              <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>$300 Tiền Mặt</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3 Tháng Bamboozer Pro VIP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Vinh danh Quán Quân Mùa 01</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono bg-emerald-500/10 p-2.5 rounded-lg text-center border border-emerald-500/20">
              Lợi nhuận ròng Top 1 &amp; Drawdown ≤ 10%
            </div>
          </div>

          {/* Runner Up - Giải Nhì */}
          <div className="bg-[#0c121e] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <Medal className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Giải Nhì</h3>
              <div className="text-3xl font-mono font-black text-cyan-400 mb-4">
                $200 <span className="text-xs font-normal text-slate-400">+ 1 Tháng Pro</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>$200 Tiền Mặt</span>
                </li>
                <li className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>1 Tháng Bamboozer Pro VIP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Huy hiệu Á Quân Áp Dụng Strategy</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-900 p-2.5 rounded-lg text-center border border-slate-800">
              Lợi nhuận ròng Top 2 giải đấu
            </div>
          </div>

          {/* 3rd Place - Giải Ba */}
          <div className="bg-[#0c121e] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Giải Ba</h3>
              <div className="text-3xl font-mono font-black text-amber-400 mb-4">
                $100 <span className="text-xs font-normal text-slate-400">+ 1 Tháng Pro</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>$100 Tiền Mặt</span>
                </li>
                <li className="flex items-center gap-2 text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>1 Tháng Bamboozer Pro VIP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Chứng nhận Top 3 Nhà Giao Dịch</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-900 p-2.5 rounded-lg text-center border border-slate-800">
              Lợi nhuận ròng Top 3 giải đấu
            </div>
          </div>

          {/* Risk Award - Risk Management Award */}
          <div className="relative bg-gradient-to-b from-[#171424] via-[#0e101a] to-[#070b12] border-2 border-indigo-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white font-mono font-black text-xs px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
              RISK MANAGEMENT AWARD
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 mt-2">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Quản Trị Rủi Ro</h3>
              <div className="text-3xl font-mono font-black text-indigo-400 mb-4">
                $100 <span className="text-xs font-normal text-slate-400">+ 1 Tháng Pro</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>$100 Tiền Mặt</span>
                </li>
                <li className="flex items-center gap-2 text-indigo-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>1 Tháng Bamboozer Pro VIP</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Dành cho Trader DD thấp &amp; ổn định</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-indigo-300 font-mono bg-indigo-500/10 p-2.5 rounded-lg text-center border border-indigo-500/20">
              Drawdown thấp nhất &amp; Giao dịch ổn định (ROI &gt; 0)
            </div>
          </div>
        </div>

        {/* Summary Table of Prize Structure */}
        <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 mb-10 overflow-x-auto">
          <h4 className="text-sm font-mono font-bold text-slate-300 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            BẢNG TỔNG HỢP CƠ CẤU GIẢI THƯỞNG 14-DAY TRADING CHALLENGE
          </h4>
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 pr-4 font-semibold">Giải thưởng</th>
                <th className="pb-3 px-4 font-semibold">Tiền mặt</th>
                <th className="pb-3 px-4 font-semibold">Gói Bamboozer Pro</th>
                <th className="pb-3 pl-4 font-semibold text-right">Tiêu chí xét giải</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr>
                <td className="py-3 pr-4 font-bold text-emerald-400 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  Giải Nhất
                </td>
                <td className="py-3 px-4 font-bold text-white">$300</td>
                <td className="py-3 px-4 text-emerald-300">3 tháng Pro VIP</td>
                <td className="py-3 pl-4 text-right text-slate-400">Lợi nhuận ròng cao nhất, tuân thủ DD ≤ 10%</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-cyan-400 flex items-center gap-2">
                  <Medal className="w-4 h-4 text-cyan-400" />
                  Giải Nhì
                </td>
                <td className="py-3 px-4 font-bold text-white">$200</td>
                <td className="py-3 px-4 text-cyan-300">1 tháng Pro VIP</td>
                <td className="py-3 pl-4 text-right text-slate-400">Lợi nhuận ròng hạng nhì</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Giải Ba
                </td>
                <td className="py-3 px-4 font-bold text-white">$100</td>
                <td className="py-3 px-4 text-amber-300">1 tháng Pro VIP</td>
                <td className="py-3 pl-4 text-right text-slate-400">Lợi nhuận ròng hạng ba</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-indigo-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-indigo-400" />
                  Risk Management Award
                </td>
                <td className="py-3 px-4 font-bold text-white">$100</td>
                <td className="py-3 px-4 text-indigo-300">1 tháng Pro VIP</td>
                <td className="py-3 pl-4 text-right text-slate-400">Drawdown thấp nhất &amp; giao dịch ổn định</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Banner CTA */}
        <div className="bg-[#0b101c] border border-slate-800 rounded-2xl p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-sm font-bold text-white">Áp dụng Indicator &amp; Strategy của bạn vào Live Trading</div>
            <div className="text-xs text-slate-400 mt-0.5">Đăng ký hoàn toàn miễn phí, nhận đầy đủ quyền lợi hỗ trợ chính thức.</div>
          </div>
          <button
            onClick={onJoinClick}
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-black bg-[#00C076] hover:bg-[#00d684] cursor-pointer shrink-0 transition-all shadow-lg shadow-emerald-500/20"
          >
            ĐĂNG KÝ TRANH TÀI
          </button>
        </div>
      </div>
    </section>
  );
};
