import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

const EQUITY_CURVE_COMPARISON = [
  { day: 'Day 1 (20/09)', Top1_Nguyen: 1000, Top2_Alpha: 1000, Risk_Vo: 1000, DQ_Rekt: 1000 },
  { day: 'Day 2 (21/09)', Top1_Nguyen: 1240, Top2_Alpha: 1190, Risk_Vo: 1120, DQ_Rekt: 1250 },
  { day: 'Day 3 (22/09)', Top1_Nguyen: 1510, Top2_Alpha: 1430, Risk_Vo: 1290, DQ_Rekt: 1420 },
  { day: 'Day 4 (23/09)', Top1_Nguyen: 1890, Top2_Alpha: 1720, Risk_Vo: 1450, DQ_Rekt: 1100 }, // Rekt DD
  { day: 'Day 5 (24/09)', Top1_Nguyen: 2150, Top2_Alpha: 1980, Risk_Vo: 1620, DQ_Rekt: 1210 },
  { day: 'Day 6 (25/09)', Top1_Nguyen: 2428, Top2_Alpha: 2185, Risk_Vo: 1780, DQ_Rekt: 1350 },
];

export const TradingPerformanceSection: React.FC = () => {
  const [activeCurves, setActiveCurves] = useState({
    Top1_Nguyen: true,
    Top2_Alpha: true,
    Risk_Vo: true,
    DQ_Rekt: true,
  });

  const toggleCurve = (key: keyof typeof activeCurves) => {
    setActiveCurves((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#05080e] border-b border-slate-800" id="performance">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RECHARTS EQUITY CURVE DYNAMICS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              So Sánh Đường Cong Tăng Trưởng Vốn (Equity Curve)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Phân tích đối sánh giữa phong cách Tăng trưởng cao (Top 1), Quản trị rủi ro thấp (Risk Master) và Bài học sụt giảm quá đà (Disqualified).
            </p>
          </div>

          {/* Legend Toggles */}
          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <button
              onClick={() => toggleCurve('Top1_Nguyen')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCurves.Top1_Nguyen
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'text-slate-500 border-slate-800'
              }`}
            >
              • Top 1: NguyenQuant (+142.8%)
            </button>
            <button
              onClick={() => toggleCurve('Top2_Alpha')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCurves.Top2_Alpha
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'text-slate-500 border-slate-800'
              }`}
            >
              • Top 2: AlphaSniper (+118.5%)
            </button>
            <button
              onClick={() => toggleCurve('Risk_Vo')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCurves.Risk_Vo
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                  : 'text-slate-500 border-slate-800'
              }`}
            >
              • Risk Master: Vo (DD 1.8%)
            </button>
            <button
              onClick={() => toggleCurve('DQ_Rekt')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCurves.DQ_Rekt
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                  : 'text-slate-500 border-slate-800'
              }`}
            >
              • Bị loại: OverLeverage (DD 14.8%)
            </button>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="h-80 sm:h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={EQUITY_CURVE_COMPARISON} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  domain={[800, 2600]}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#05080e',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Vốn hiện tại']}
                />
                <Legend />
                {activeCurves.Top1_Nguyen && (
                  <Line
                    type="monotone"
                    dataKey="Top1_Nguyen"
                    name="Top 1: NguyenQuant99"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#10b981' }}
                    activeDot={{ r: 7 }}
                  />
                )}
                {activeCurves.Top2_Alpha && (
                  <Line
                    type="monotone"
                    dataKey="Top2_Alpha"
                    name="Top 2: AlphaSniper_SG"
                    stroke="#06b6d4"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#06b6d4' }}
                  />
                )}
                {activeCurves.Risk_Vo && (
                  <Line
                    type="monotone"
                    dataKey="Risk_Vo"
                    name="Risk Master: Vo (DD 1.8%)"
                    stroke="#818cf8"
                    strokeWidth={2.5}
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: '#818cf8' }}
                  />
                )}
                {activeCurves.DQ_Rekt && (
                  <Line
                    type="monotone"
                    dataKey="DQ_Rekt"
                    name="Bị Loại: OverLeverage (DD 14.8%)"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#f43f5e' }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-start gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Chiến thuật Quán Quân:</strong> Chia nhỏ vị thế (position sizing 2-3% tài khoản), đòn bẩy tối đa 10x và chốt lời theo các mốc Fibonacci mở rộng.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Cảnh báo rủi ro:</strong> Thí sinh OverLeverage đã tăng vốn lên $1,420 ở Ngày 3 nhưng dính cú sụt giảm mạnh về $1,100 ở Ngày 4 (Drawdown 14.8%), dẫn đến bị hệ thống tự động loại.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
