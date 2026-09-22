import React from 'react';
import { BarChart3, TrendingUp, Layers, Activity, Users, Shield } from 'lucide-react';

export const InstitutionalTerminal: React.FC = () => {
  return (
    <div className="bg-[#05080e] border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <Activity className="w-3.5 h-3.5 text-[#00C076]" />
            <span className="font-bold text-white">INSTITUTIONAL METRICS // 24H SPRINT AGGREGATE</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Cập nhật mỗi 5 giây</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>TỔNG VOLUME 24H</span>
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">$14,820,400</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% so với hôm qua
            </div>
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>VỊ THẾ ĐANG MỞ (OI)</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-white">342 Vị Thế</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Long 58.4% • Short 41.6%
            </div>
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>SỐ THÍ SINH ĐANG THI ĐẤU</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-white">59 / 68 Hợp Lệ</div>
            <div className="text-[11px] text-rose-400 mt-1">
              9 thí sinh vi phạm Max DD
            </div>
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>TỶ LỆ THẮNG TRUNG BÌNH</span>
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white">64.2% Winrate</div>
            <div className="text-[11px] text-[#00C076] mt-1">
              Kỷ luật Stop-loss chặt chẽ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
