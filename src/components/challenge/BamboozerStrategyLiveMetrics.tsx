import React, { useState, useEffect } from 'react';
import {
  Activity,
  TrendingUp,
  Percent,
  ShieldAlert,
  Flame,
  Bot,
  Calendar,
  BarChart3,
  PieChart as PieIcon,
  RefreshCw,
  ExternalLink,
  Key,
  CheckCircle2,
  Copy,
  Zap,
  Sliders,
  ChevronRight,
  Clock,
  Layers,
  Info,
  Server
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export interface StrategyLiveMetricsProps {
  onOpenConnectApi?: () => void;
}

export const BamboozerStrategyLiveMetrics: React.FC<StrategyLiveMetricsProps> = () => {
  // Mode: 'clean' (exact default zero-state like new account) vs 'active' (active telemetry stream)
  const [dataMode, setDataMode] = useState<'clean' | 'active'>('active');
  const [activeTab, setActiveTab] = useState<'drawdown' | 'calendar' | 'hourly' | 'allocation' | 'ranking'>('drawdown');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>('Vừa xong');
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiConnected, setApiConnected] = useState(false);
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);

  // Sync animation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSynced(new Date().toLocaleTimeString('vi-VN'));
    }, 600);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  // Metrics Data Definition
  const metrics = dataMode === 'clean' ? {
    totalEquity: '$1,000.00',
    totalPnl: '+$0.00',
    totalPnlPct: '0.00%',
    pnlPositive: true,
    winRate: '0.0%',
    winLossDetail: '0W / 0L',
    profitFactor: '0.00 : 1',
    avgProfit: '$0.00',
    maxDrawdown: '0.0%',
    maxDrawdownUsdt: '$0.00',
    drawdownStatus: 'Chưa có lệnh',
    totalTrades: '0',
    avgDailyTrades: 'Avg Daily 0.0',
    runningStrategies: '0 Bot',
    indicatorDetail: '0 Indicator',
  } : {
    totalEquity: '$1,284.50',
    totalPnl: '+$284.50',
    totalPnlPct: '+28.45%',
    pnlPositive: true,
    winRate: '68.8%',
    winLossDetail: '44W / 20L',
    profitFactor: '2.34 : 1',
    avgProfit: 'Avg Profit $38.20',
    maxDrawdown: '3.4%',
    maxDrawdownUsdt: '$34.00',
    drawdownStatus: 'An Toàn (<10%)',
    totalTrades: '64',
    avgDailyTrades: 'Avg Daily 9.1',
    runningStrategies: '3 Bot Active',
    indicatorDetail: '6 Indicator Live',
  };

  // Drawdown & Equity Curve Data
  const drawdownCurveData = dataMode === 'clean' ? [
    { time: '10/10 00:00', equity: 1000, drawdown: 0, highWatermark: 1000 },
    { time: '10/10 06:00', equity: 1000, drawdown: 0, highWatermark: 1000 },
    { time: '10/10 12:00', equity: 1000, drawdown: 0, highWatermark: 1000 },
    { time: '10/10 18:00', equity: 1000, drawdown: 0, highWatermark: 1000 },
    { time: '11/10 00:00', equity: 1000, drawdown: 0, highWatermark: 1000 },
  ] : [
    { time: '10/10 00:00', equity: 1000, drawdown: 0, highWatermark: 1000 },
    { time: '10/10 12:00', equity: 1045, drawdown: -0.8, highWatermark: 1045 },
    { time: '11/10 00:00', equity: 1032, drawdown: -1.2, highWatermark: 1045 },
    { time: '11/10 12:00', equity: 1098, drawdown: -0.5, highWatermark: 1098 },
    { time: '12/10 00:00', equity: 1140, drawdown: -1.8, highWatermark: 1140 },
    { time: '12/10 12:00', equity: 1120, drawdown: -3.4, highWatermark: 1140 },
    { time: '13/10 00:00', equity: 1195, drawdown: -0.9, highWatermark: 1195 },
    { time: '13/10 12:00', equity: 1240, drawdown: -0.4, highWatermark: 1240 },
    { time: '14/10 00:00', equity: 1284, drawdown: -0.7, highWatermark: 1284 },
  ];

  // Hourly Distribution Data (24 hours)
  const hourlyData = [
    { hour: '00h', trades: dataMode === 'clean' ? 0 : 3, winRate: dataMode === 'clean' ? 0 : 67 },
    { hour: '02h', trades: dataMode === 'clean' ? 0 : 1, winRate: dataMode === 'clean' ? 0 : 100 },
    { hour: '04h', trades: dataMode === 'clean' ? 0 : 2, winRate: dataMode === 'clean' ? 0 : 50 },
    { hour: '06h', trades: dataMode === 'clean' ? 0 : 4, winRate: dataMode === 'clean' ? 0 : 75 },
    { hour: '08h', trades: dataMode === 'clean' ? 0 : 6, winRate: dataMode === 'clean' ? 0 : 83 },
    { hour: '10h', trades: dataMode === 'clean' ? 0 : 7, winRate: dataMode === 'clean' ? 0 : 71 },
    { hour: '12h', trades: dataMode === 'clean' ? 0 : 5, winRate: dataMode === 'clean' ? 0 : 60 },
    { hour: '14h', trades: dataMode === 'clean' ? 0 : 8, winRate: dataMode === 'clean' ? 0 : 75 },
    { hour: '16h', trades: dataMode === 'clean' ? 0 : 9, winRate: dataMode === 'clean' ? 0 : 67 },
    { hour: '18h', trades: dataMode === 'clean' ? 0 : 7, winRate: dataMode === 'clean' ? 0 : 86 },
    { hour: '20h', trades: dataMode === 'clean' ? 0 : 8, winRate: dataMode === 'clean' ? 0 : 62 },
    { hour: '22h', trades: dataMode === 'clean' ? 0 : 4, winRate: dataMode === 'clean' ? 0 : 75 },
  ];

  // Strategy Allocation Data
  const allocationData = dataMode === 'clean' ? [
    { name: 'USDT Free Capital (Chưa phân bổ)', value: 1000, color: '#38bdf8' }
  ] : [
    { name: 'BTC AI Trend Scalper', value: 550, color: '#10b981' },
    { name: 'ETH Multi-Indicator Grid', value: 350, color: '#06b6d4' },
    { name: 'SOL High-Freq Arbitrage', value: 250, color: '#8b5cf6' },
    { name: 'USDT Reserve Margin', value: 134.5, color: '#f59e0b' },
  ];

  // Strategy Ranking List
  const strategyRanking = dataMode === 'clean' ? [] : [
    {
      rank: 1,
      name: 'BTC Quant Scalper Pro',
      symbol: 'BTC/USDT',
      status: 'RUNNING',
      pnl: '+$142.30',
      pnlPct: '+14.23%',
      winRate: '72.4%',
      trades: 29,
      maxDd: '2.1%',
      indicators: ['EMA_200', 'RSI_14', 'ATR_Trailing'],
    },
    {
      rank: 2,
      name: 'ETH Dynamic Momentum',
      symbol: 'ETH/USDT',
      status: 'RUNNING',
      pnl: '+$89.60',
      pnlPct: '+8.96%',
      winRate: '68.0%',
      trades: 22,
      maxDd: '2.8%',
      indicators: ['MACD', 'Bollinger_Bands'],
    },
    {
      rank: 3,
      name: 'SOL Volatility Surge',
      symbol: 'SOL/USDT',
      status: 'RUNNING',
      pnl: '+$52.60',
      pnlPct: '+5.26%',
      winRate: '61.5%',
      trades: 13,
      maxDd: '3.4%',
      indicators: ['Volume_Delta', 'SuperTrend'],
    }
  ];

  return (
    <div className="w-full bg-[#080d17] border border-slate-800 rounded-2xl p-4 sm:p-6 mb-12 shadow-2xl relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-1/4 w-96 h-40 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-40 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE API TELEMETRY</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              https://www.bamboozer.com/strategy-live
            </span>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              (Đồng bộ: {lastSynced})
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            <span>Bảng Thông Số Chiến Lược Định Lượng Bamboozer</span>
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dữ liệu hiệu suất thuật toán giao dịch thời gian thực: Win Rate, Profit Factor, Drawdown, Lịch lãi &amp; Phân bổ chiến lược.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle Data Mode: Clean / Active */}
          <div className="flex items-center bg-[#0d1322] border border-slate-800 rounded-xl p-1 text-xs font-mono">
            <button
              onClick={() => setDataMode('active')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                dataMode === 'active'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mùa 04 Live (Mẫu)
            </button>
            <button
              onClick={() => setDataMode('clean')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                dataMode === 'clean'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Khởi Tạo ($1,000 Zero)
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Làm mới số liệu API"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          {/* Connect API Button */}
          <button
            onClick={() => setShowApiModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer shadow-sm shadow-emerald-500/10"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Đấu Nối API Live</span>
          </button>
        </div>
      </div>

      {/* 6 Primary Key Metric Cards from bamboozer.com/strategy-live */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-6">
        {/* Metric 1: Total Equity */}
        <div className="bg-[#0c121f] border border-slate-800/90 hover:border-emerald-500/40 transition-all rounded-xl p-3.5 sm:p-4 group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>Total Equity</span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight group-hover:text-emerald-300 transition-colors">
            {metrics.totalEquity}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono mt-1 text-emerald-400 font-bold">
            <TrendingUp className="w-3 h-3 shrink-0" />
            <span>{metrics.totalPnl}</span>
            <span className="text-slate-400 font-normal">({metrics.totalPnlPct})</span>
          </div>
        </div>

        {/* Metric 2: Win Rate */}
        <div className="bg-[#0c121f] border border-slate-800/90 hover:border-emerald-500/40 transition-all rounded-xl p-3.5 sm:p-4 group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>Win Rate</span>
            <Percent className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono tracking-tight">
            {metrics.winRate}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center justify-between">
            <span>{metrics.winLossDetail}</span>
            <span className="text-[10px] text-emerald-400 font-bold">Tỉ lệ thắng</span>
          </div>
        </div>

        {/* Metric 3: Profit Factor */}
        <div className="bg-[#0c121f] border border-slate-800/90 hover:border-emerald-500/40 transition-all rounded-xl p-3.5 sm:p-4 group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>Profit Factor</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono tracking-tight">
            {metrics.profitFactor}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1 truncate" title={metrics.avgProfit}>
            {metrics.avgProfit}
          </div>
        </div>

        {/* Metric 4: Max Drawdown */}
        <div className="bg-[#0c121f] border border-slate-800/90 hover:border-emerald-500/40 transition-all rounded-xl p-3.5 sm:p-4 group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>Max Drawdown</span>
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
            {metrics.maxDrawdown}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center justify-between">
            <span>{metrics.maxDrawdownUsdt}</span>
            <span className="text-[10px] px-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold">
              {metrics.drawdownStatus}
            </span>
          </div>
        </div>

        {/* Metric 5: Total Trades */}
        <div className="bg-[#0c121f] border border-slate-800/90 hover:border-emerald-500/40 transition-all rounded-xl p-3.5 sm:p-4 group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>Total Trades</span>
            <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
            {metrics.totalTrades}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            {metrics.avgDailyTrades}
          </div>
        </div>

        {/* Metric 6: Running Strategies */}
        <div className="bg-[#0c121f] border border-slate-800/90 hover:border-emerald-500/40 transition-all rounded-xl p-3.5 sm:p-4 group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>Running Strategies</span>
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-300 font-mono tracking-tight">
            {metrics.runningStrategies}
          </div>
          <div className="text-[11px] font-mono text-indigo-400/90 mt-1">
            {metrics.indicatorDetail}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs matching Bamboozer Strategy Live layout */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none mb-5 text-xs font-mono">
        {[
          { id: 'drawdown', label: 'Drawdown Curve', icon: TrendingUp },
          { id: 'calendar', label: 'Profit Calendar', icon: Calendar },
          { id: 'hourly', label: 'Hourly Distribution', icon: Clock },
          { id: 'allocation', label: 'Strategy Allocation', icon: PieIcon },
          { id: 'ranking', label: 'Strategy Ranking', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[260px] bg-[#050912]/80 border border-slate-800/80 rounded-xl p-4 sm:p-5">
        {/* Tab 1: Drawdown Curve & Equity Progression */}
        {activeTab === 'drawdown' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-bold text-white">ĐƯỜNG CONG TĂNG TRƯỞNG VỐN &amp; DRAWDOWN THỜI GIAN THỰC</span>
                <span className="text-slate-500 hidden md:inline">| Max allowed drawdown: 10.0%</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                  <span className="text-slate-300">Equity (Vốn $)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" />
                  <span className="text-slate-300">Drawdown %</span>
                </div>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={drawdownCurveData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    stroke="#475569"
                    fontSize={10}
                    fontFamily="monospace"
                    tickLine={false}
                  />
                  <YAxis
                    domain={dataMode === 'clean' ? [950, 1050] : [980, 1350]}
                    stroke="#475569"
                    fontSize={10}
                    fontFamily="monospace"
                    tickLine={false}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c121e',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any) => [
                      name === 'equity' ? `$${val}` : `${val}%`,
                      name === 'equity' ? 'Equity' : 'Drawdown',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fill="url(#equityGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 2: Profit Calendar */}
        {activeTab === 'calendar' && (
          <div>
            <div className="flex items-center justify-between mb-4 text-xs font-mono">
              <span className="font-bold text-white">LỊCH LỢI NHUẬN THEO NGÀY (PROFIT CALENDAR)</span>
              <span className="text-slate-400">Tháng 10/2026 • 7-Day Sprint Season 04</span>
            </div>

            {dataMode === 'clean' ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500 font-mono text-xs">
                <Calendar className="w-8 h-8 text-slate-600 mb-2" />
                <p className="font-bold">No Data Available</p>
                <p className="text-[11px] text-slate-600">Sự kiện chưa bắt đầu hoặc chưa phát sinh lệnh giao dịch</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { day: 'Thứ 7 (10/10)', pnl: '+$45.20', pnlPct: '+4.52%', trades: 8, status: 'profit' },
                  { day: 'CN (11/10)', pnl: '+$52.80', pnlPct: '+5.05%', trades: 11, status: 'profit' },
                  { day: 'Thứ 2 (12/10)', pnl: '-$14.50', pnlPct: '-1.32%', trades: 9, status: 'loss' },
                  { day: 'Thứ 3 (13/10)', pnl: '+$75.40', pnlPct: '+6.98%', trades: 14, status: 'profit' },
                  { day: 'Thứ 4 (14/10)', pnl: '+$89.10', pnlPct: '+7.71%', trades: 12, status: 'profit' },
                  { day: 'Thứ 5 (15/10)', pnl: '+$36.50', pnlPct: '+2.92%', trades: 10, status: 'profit' },
                  { day: 'Thứ 6 (16/10)', pnl: 'Chờ giao dịch', pnlPct: '0.00%', trades: 0, status: 'pending' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-3 border font-mono ${
                      item.status === 'profit'
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : item.status === 'loss'
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : 'bg-slate-900/40 border-slate-800'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 mb-1">{item.day}</div>
                    <div
                      className={`text-base font-black ${
                        item.status === 'profit'
                          ? 'text-emerald-400'
                          : item.status === 'loss'
                          ? 'text-rose-400'
                          : 'text-slate-400 text-xs'
                      }`}
                    >
                      {item.pnl}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                      <span>{item.pnlPct}</span>
                      <span>{item.trades} Lệnh</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Hourly Distribution */}
        {activeTab === 'hourly' && (
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-bold text-white">PHÂN BỐ TẦN SUẤT GIAO DỊCH THEO 24 KHUNG GIỜ (UTC+7)</span>
              <span className="text-slate-400">Giờ hoạt động hiệu quả nhất: 14:00 - 20:00</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="hour" stroke="#475569" fontSize={10} fontFamily="monospace" />
                  <YAxis stroke="#475569" fontSize={10} fontFamily="monospace" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c121e',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any) => [
                      name === 'trades' ? `${val} Lệnh` : `${val}%`,
                      name === 'trades' ? 'Số lệnh' : 'Tỉ lệ thắng',
                    ]}
                  />
                  <Bar dataKey="trades" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 4: Strategy Allocation */}
        {activeTab === 'allocation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c121e',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                    }}
                    formatter={(val: any) => [`$${val}`, 'Số vốn phân bổ']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="text-slate-300 font-bold mb-2">TỶ TRỌNG QUẢN LÝ DANH MỤC THUẬT TOÁN</div>
              {allocationData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-200">{item.name}</span>
                  </div>
                  <span className="font-bold text-white font-mono">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Strategy Ranking */}
        {activeTab === 'ranking' && (
          <div>
            <div className="flex items-center justify-between mb-4 text-xs font-mono">
              <span className="font-bold text-white">BẢNG XẾP HẠNG THUẬT TOÁN ĐANG CHẠY (STRATEGY RANKING)</span>
              <span className="text-emerald-400 font-bold">100% On-Chain &amp; Exchange API</span>
            </div>

            {strategyRanking.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500 font-mono text-xs">
                <Bot className="w-8 h-8 text-slate-600 mb-2" />
                <p className="font-bold">No strategy data</p>
                <p className="text-[11px] text-slate-600">Chưa có bot chiến lược nào được kích hoạt</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Chiến lược</th>
                      <th className="py-2.5 px-3">Cặp</th>
                      <th className="py-2.5 px-3">PnL ($)</th>
                      <th className="py-2.5 px-3">Win Rate</th>
                      <th className="py-2.5 px-3">Max DD</th>
                      <th className="py-2.5 px-3">Lệnh</th>
                      <th className="py-2.5 px-3">Chỉ báo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {strategyRanking.map((strat) => (
                      <tr key={strat.rank} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-3 font-bold text-amber-400">#{strat.rank}</td>
                        <td className="py-3 px-3 font-bold text-white">{strat.name}</td>
                        <td className="py-3 px-3 text-cyan-400">{strat.symbol}</td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">{strat.pnl} ({strat.pnlPct})</td>
                        <td className="py-3 px-3 text-white font-bold">{strat.winRate}</td>
                        <td className="py-3 px-3 text-slate-300">{strat.maxDd}</td>
                        <td className="py-3 px-3 text-slate-300">{strat.trades}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1 flex-wrap">
                            {strat.indicators.map((ind, i) => (
                              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {ind}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info & Verification Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Hệ thống bảo trợ đối tác Bamboozer (Mã ref: <strong>81</strong>). Cổng dữ liệu chuẩn hóa qua WebSocket Stream.</span>
        </div>
        <a
          href="https://www.bamboozer.com/strategy-live"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
        >
          <span>Kiểm tra trên Bamboozer Live</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* API Connect Modal Dialog */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b111e] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <h4 className="text-base font-bold text-white">Đấu Nối Bamboozer Live Telemetry API</h4>
              </div>
              <button
                onClick={() => setShowApiModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 font-mono text-xs">
              <p className="text-slate-300 font-sans leading-relaxed">
                Nhập API Key được cấp quyền từ trang <strong>Bamboozer Strategy Live</strong> để liên kết và hiển thị trực tiếp dữ liệu cá nhân hóa của tài khoản giao dịch:
              </p>

              <div>
                <label className="text-slate-400 block mb-1">Target Endpoint (REST):</label>
                <div className="flex items-center gap-2 bg-[#05080f] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 truncate flex-1">https://api.bamboozer.com/v1/strategy-live/summary</span>
                  <button
                    onClick={() => copyToClipboard('https://api.bamboozer.com/v1/strategy-live/summary')}
                    className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                    title="Sao chép Endpoint"
                  >
                    {copiedEndpoint ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">WebSocket Telemetry URL:</label>
                <div className="bg-[#05080f] p-2.5 rounded-xl border border-slate-800 text-cyan-400">
                  wss://api.bamboozer.com/ws/v1/live-telemetry
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nhập Bamboozer Read-Only API Key:</label>
                <input
                  type="password"
                  placeholder="bbz_live_api_key_xxxxxxxxxxxxx"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-[#05080f] p-2.5 rounded-xl border border-slate-700 text-white placeholder-slate-600 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] leading-relaxed">
                ⚠️ <strong>Lưu ý bảo mật:</strong> Chỉ sử dụng API Key có quyền <strong>Read-Only</strong> (Chỉ đọc dữ liệu giao dịch &amp; hiệu suất). Không sử dụng Key có quyền rút tiền hay can thiệp lệnh.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowApiModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setApiConnected(true);
                  setShowApiModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs font-bold hover:brightness-110 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                Lưu &amp; Xác Thực Kết Nối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
