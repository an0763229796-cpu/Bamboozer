import React from 'react';
import { Participant } from '../../types';
import {
  X,
  Trophy,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  XCircle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface TraderDetailModalProps {
  trader: Participant | null;
  onClose: () => void;
}

export const TraderDetailModal: React.FC<TraderDetailModalProps> = ({ trader, onClose }) => {
  if (!trader) return null;

  const isDq = trader.status === 'Disqualified';
  const isWarn = trader.status === 'Warning';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0c121e] border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black text-xl flex items-center justify-center border border-emerald-500/40">
                {trader.username.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{trader.username}</h3>
                  <span className="text-lg">{trader.countryFlag}</span>
                  {trader.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                      {trader.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  UID: <span className="text-slate-300">{trader.id}</span> • Quốc gia: {trader.country}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isDq ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                  <XCircle className="w-3.5 h-3.5" /> BỊ LOẠI (DISQUALIFIED)
                </span>
              ) : isWarn ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" /> CẢNH BÁO DRAWDOWN
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ĐANG THI ĐẤU HỢP LỆ
                </span>
              )}
            </div>
          </div>

          {/* Disqualification warning note */}
          {isDq && trader.disqualifiedReason && (
            <div className="my-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>LÝ DO TRUẤT QUYỀN THI ĐẤU:</strong> {trader.disqualifiedReason}
              </div>
            </div>
          )}

          {/* 4 Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 font-mono">
            <div className="bg-[#05080e] p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">TỔNG ROI %</div>
              <div className={`text-xl font-bold mt-1 ${trader.roi >= 0 ? 'text-[#00C076]' : 'text-rose-400'}`}>
                {trader.roi >= 0 ? '+' : ''}{trader.roi.toFixed(2)}%
              </div>
            </div>

            <div className="bg-[#05080e] p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">LỢI NHUẬN PNL</div>
              <div className="text-xl font-bold text-white mt-1">
                ${trader.pnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-[#05080e] p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">MAX DRAWDOWN</div>
              <div className={`text-xl font-bold mt-1 ${isDq ? 'text-rose-400' : trader.maxDrawdown > 7 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {trader.maxDrawdown.toFixed(1)}%
              </div>
            </div>

            <div className="bg-[#05080e] p-3.5 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400">WINRATE &amp; SỐ LỆNH</div>
              <div className="text-xl font-bold text-white mt-1">
                {trader.winRate}% <span className="text-xs font-normal text-slate-400">({trader.tradesCount} lệnh)</span>
              </div>
            </div>
          </div>

          {/* Mini Equity Curve Chart */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>ĐƯỜNG CONG VỐN CÁ NHÂN (EQUITY CURVE)</span>
              <span>Vốn khởi điểm: $1,000.00</span>
            </div>
            <div className="h-44 w-full bg-[#05080e] border border-slate-800 rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trader.equityCurve} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad-${trader.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isDq ? '#f43f5e' : '#10b981'} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={isDq ? '#f43f5e' : '#10b981'} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#05080e',
                      borderColor: '#334155',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Số dư']}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    stroke={isDq ? '#f43f5e' : '#10b981'}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#grad-${trader.id})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trade History Table */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>LỊCH SỬ LỆNH GẦN NHẤT</span>
              <span>Tổng {trader.trades?.length || 0} lệnh đã ghi nhận</span>
            </div>

            <div className="bg-[#05080e] border border-slate-800 rounded-xl overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-[10px]">
                    <th className="py-2.5 px-3">CẶP GD</th>
                    <th className="py-2.5 px-3">VỊ THẾ</th>
                    <th className="py-2.5 px-3">ĐÒN BẨY</th>
                    <th className="py-2.5 px-3">GIÁ VÀO</th>
                    <th className="py-2.5 px-3">GIÁ ĐÓNG</th>
                    <th className="py-2.5 px-3">LỢI NHUẬN (PNL)</th>
                    <th className="py-2.5 px-3">THỜI GIAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {trader.trades && trader.trades.length > 0 ? (
                    trader.trades.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 font-bold text-white">{t.symbol}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              t.side === 'LONG' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {t.side}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">{t.leverage}x</td>
                        <td className="py-2.5 px-3 text-slate-300">${t.entryPrice.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-slate-300">${t.closePrice.toLocaleString()}</td>
                        <td
                          className={`py-2.5 px-3 font-bold ${
                            t.pnl >= 0 ? 'text-[#00C076]' : 'text-rose-400'
                          }`}
                        >
                          {t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)} ({t.pnlPercent}%)
                        </td>
                        <td className="py-2.5 px-3 text-[10px] text-slate-500">{t.closedAt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-500">
                        Chưa có dữ liệu lệnh gần đây.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
