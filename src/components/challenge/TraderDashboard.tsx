import React, { useState } from 'react';
import { Participant, TradeHistory } from '../../types';
import {
  TrendingUp,
  ShieldCheck,
  Trophy,
  ArrowRight,
  PlusCircle,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const TraderDashboard: React.FC = () => {
  // My current participant state (simulated user logged into Challenge)
  const [myProfile, setMyProfile] = useState<Participant>({
    id: 'my-trader-profile',
    rank: 4,
    username: 'MyQuantAccount',
    fullName: 'Tôi (Trader Khách Hàng)',
    country: 'Vietnam',
    countryFlag: '🇻🇳',
    initialBalance: 1000,
    currentBalance: 1780.0,
    pnl: 780.0,
    roi: 78.0,
    maxDrawdown: 1.8,
    winRate: 80.0,
    tradesCount: 22,
    trades: [],
    status: 'Active',
    badge: 'Risk Master',
    registeredAt: '2026-09-19',
    kolRef: '81',
    equityCurve: [
      { day: 'Day 1', timestamp: '2026-09-20', equity: 1000, pnl: 0, roi: 0 },
      { day: 'Day 2', timestamp: '2026-09-21', equity: 1120, pnl: 120, roi: 12.0 },
      { day: 'Day 3', timestamp: '2026-09-22', equity: 1290, pnl: 290, roi: 29.0 },
      { day: 'Day 4', timestamp: '2026-09-23', equity: 1450, pnl: 450, roi: 45.0 },
      { day: 'Day 5', timestamp: '2026-09-24', equity: 1620, pnl: 620, roi: 62.0 },
      { day: 'Day 6', timestamp: '2026-09-25', equity: 1780, pnl: 780, roi: 78.0 },
    ],
  });

  const [tradeSymbol, setTradeSymbol] = useState<'BTC/USDT' | 'ETH/USDT' | 'SOL/USDT'>('BTC/USDT');
  const [tradeSide, setTradeSide] = useState<'LONG' | 'SHORT'>('LONG');
  const [tradeLeverage, setTradeLeverage] = useState(10);
  const [tradeAmount, setTradeAmount] = useState(100);
  const [simNotification, setSimNotification] = useState<string | null>(null);

  const handleSimulateTrade = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate trade outcome
    const isWin = Math.random() > 0.35;
    const pnlPercent = isWin ? +(Math.random() * 8 + 3).toFixed(2) : -(Math.random() * 4 + 1).toFixed(2);
    const profitUsdt = +((tradeAmount * (pnlPercent / 100)) * (tradeLeverage / 5)).toFixed(2);

    const newBal = +(myProfile.currentBalance + profitUsdt).toFixed(2);
    const newPnl = +(newBal - myProfile.initialBalance).toFixed(2);
    const newRoi = +((newPnl / myProfile.initialBalance) * 100).toFixed(2);
    const newDd = isWin
      ? myProfile.maxDrawdown
      : +(myProfile.maxDrawdown + Math.abs(pnlPercent) * 0.3).toFixed(1);

    const newCurve = [
      ...myProfile.equityCurve,
      {
        day: `Lệnh #${myProfile.tradesCount + 1}`,
        timestamp: new Date().toISOString(),
        equity: newBal,
        pnl: newPnl,
        roi: newRoi,
      },
    ];

    setMyProfile((prev) => ({
      ...prev,
      currentBalance: newBal,
      pnl: newPnl,
      roi: newRoi,
      maxDrawdown: newDd,
      tradesCount: prev.tradesCount + 1,
      status: newDd > 10.0 ? 'Disqualified' : newDd > 7 ? 'Warning' : 'Active',
      equityCurve: newCurve,
    }));

    setSimNotification(
      `Đã khớp lệnh ${tradeSide} ${tradeSymbol} ${tradeLeverage}x: ${isWin ? '+' : ''}$${profitUsdt} USDT (${isWin ? '+' : ''}${pnlPercent}%)`
    );
    setTimeout(() => setSimNotification(null), 4000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-[#070b12] text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner Welcome */}
        <div className="bg-gradient-to-r from-[#0d1624] via-[#09111c] to-[#0c1815] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#00C076]/20 text-[#00C076] font-black text-2xl flex items-center justify-center border border-[#00C076]/40">
              MQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{myProfile.username}</h1>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40">
                  Hạng #{myProfile.rank}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40">
                  Ứng viên Risk Award
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Chiến dịch: Bamboozer 14-Day Trading Challenge Mùa 01 • Trạng thái: <strong className="text-emerald-400">Hợp lệ (Active)</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <div className="text-xs text-slate-400">SỐ DƯ HIỆN TẠI</div>
              <div className="text-2xl font-black text-emerald-400">
                ${myProfile.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400">TỔNG ROI HIỆN TẠI</div>
            <div className="text-2xl font-bold text-[#00C076] mt-1">+{myProfile.roi.toFixed(2)}%</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Vốn gốc: $1,000.00</div>
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400">LỢI NHUẬN PNL</div>
            <div className="text-2xl font-bold text-white mt-1">
              +${myProfile.pnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Chưa chốt: $0.00</div>
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400">MAX DRAWDOWN</div>
            <div className={`text-2xl font-bold mt-1 ${myProfile.maxDrawdown > 7 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {myProfile.maxDrawdown.toFixed(1)}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Giới hạn an toàn: ≤ 10.0%</div>
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400">SỐ LỆNH ĐÃ VÀO</div>
            <div className="text-2xl font-bold text-white mt-1">
              {myProfile.tradesCount} <span className="text-xs text-slate-400 font-normal">/ 10 tối thiểu</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Đã đủ điều kiện xét giải</div>
          </div>
        </div>

        {/* Equity Curve & Live Trade Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chart */}
          <div className="lg:col-span-8 bg-[#0c121e] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold font-mono text-white">BIỂU ĐỒ TĂNG TRƯỞNG VỐN CỦA BẠN</h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">KỶ LUẬT CAO (DD 1.8%)</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={myProfile.equityCurve}>
                  <defs>
                    <linearGradient id="myEquityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C076" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00C076" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 10, fill: '#64748b' }} domain={['dataMin - 100', 'dataMax + 100']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#05080e', borderColor: '#334155', fontSize: '11px', fontFamily: 'monospace' }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Số dư']}
                  />
                  <Area type="monotone" dataKey="equity" stroke="#00C076" strokeWidth={2.5} fill="url(#myEquityGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Simulate Trade Box */}
          <div className="lg:col-span-4 bg-[#0c121e] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00C076] mb-2">
              <PlusCircle className="w-4 h-4" />
              <span>GIAO DỊCH THỬ NGHIỆM TÍNH ĐIỂM</span>
            </div>
            <h3 className="text-base font-bold text-white mb-4">Thực Thi Lệnh Thử</h3>

            {simNotification && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                {simNotification}
              </div>
            )}

            <form onSubmit={handleSimulateTrade} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-400 mb-1">CẶP GIAO DỊCH</label>
                <select
                  value={tradeSymbol}
                  onChange={(e: any) => setTradeSymbol(e.target.value)}
                  className="w-full bg-[#05080e] border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                >
                  <option value="BTC/USDT">BTC/USDT ($91,450)</option>
                  <option value="ETH/USDT">ETH/USDT ($3,392)</option>
                  <option value="SOL/USDT">SOL/USDT ($188.4)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">VỊ THẾ</label>
                  <div className="grid grid-cols-2 gap-1 bg-[#05080e] p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setTradeSide('LONG')}
                      className={`py-1 rounded text-center cursor-pointer ${
                        tradeSide === 'LONG' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400'
                      }`}
                    >
                      LONG
                    </button>
                    <button
                      type="button"
                      onClick={() => setTradeSide('SHORT')}
                      className={`py-1 rounded text-center cursor-pointer ${
                        tradeSide === 'SHORT' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      SHORT
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">ĐÒN BẨY ({tradeLeverage}x)</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={tradeLeverage}
                    onChange={(e) => setTradeLeverage(Number(e.target.value))}
                    className="w-full accent-emerald-500 mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">SỐ VỐN VỊ THẾ ($ USDT)</label>
                <input
                  type="number"
                  min="20"
                  max="500"
                  step="10"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(Number(e.target.value))}
                  className="w-full bg-[#05080e] border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-black bg-[#00C076] hover:bg-[#00d684] shadow-lg shadow-[#00C076]/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>ĐẶT LỆNH TEST &amp; CẬP NHẬT ROI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
