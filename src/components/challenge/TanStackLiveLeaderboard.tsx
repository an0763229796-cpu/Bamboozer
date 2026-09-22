import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Participant } from '../../types';
import { PARTICIPANTS } from '../../data/mockData';
import {
  tradingWs,
  LeaderboardTickData,
  LiveTradeExecution,
} from '../../services/tradingWsService';
import {
  Trophy,
  Medal,
  Award,
  Search,
  ArrowUpDown,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Play,
  Pause,
  Zap,
  Radio,
  Clock,
  Flame,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface TanStackLiveLeaderboardProps {
  onSelectTrader?: (trader: Participant) => void;
  onOpenRegister?: () => void;
}

type SortField = 'rank' | 'username' | 'roi' | 'pnl' | 'maxDrawdown' | 'winRate' | 'tradesCount';

interface UpdateFlashInfo {
  direction: 'UP' | 'DOWN';
  deltaRoi: number;
  deltaPnl: number;
  timestamp: number;
}

export const TanStackLiveLeaderboard: React.FC<TanStackLiveLeaderboardProps> = ({ 
  onSelectTrader,
  onOpenRegister,
}) => {
  const [data, setData] = useState<Participant[]>(() => {
    // Clone initial participants
    return JSON.parse(JSON.stringify(PARTICIPANTS));
  });

  const [sortField, setSortField] = useState<SortField>('roi');
  const [sortAsc, setSortAsc] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Active' | 'Warning' | 'Disqualified'>('ALL');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  // Realtime streaming controls & metrics
  const [isStreaming, setIsStreaming] = useState(true);
  const [tickSpeed, setTickSpeed] = useState<1800 | 900 | 500>(1800);
  const [tickCount, setTickCount] = useState(1480);
  const [latency, setLatency] = useState(18);
  const [recentExecutions, setRecentExecutions] = useState<LiveTradeExecution[]>([
    {
      id: 'init-1',
      traderId: 'trader-01',
      traderName: 'NguyenQuant99',
      symbol: 'SOL/USDT',
      side: 'LONG',
      leverage: 20,
      pnl: 48.5,
      pnlPercent: 0.48,
      timestamp: '10:42:15',
    },
    {
      id: 'init-2',
      traderId: 'trader-02',
      traderName: 'AlphaSniper_SG',
      symbol: 'ETH/USDT',
      side: 'SHORT',
      leverage: 15,
      pnl: -12.2,
      pnlPercent: -0.12,
      timestamp: '10:42:10',
    },
  ]);

  // Track cell flash states (traderId -> flash info)
  const [flashMap, setFlashMap] = useState<Record<string, UpdateFlashInfo>>({});

  // Real-time flash & live feedback specifically for "Bảng xếp hạng của tôi" (trader-01)
  const [userFlash, setUserFlash] = useState<{
    direction: 'UP' | 'DOWN';
    deltaRoi: number;
    deltaPnl: number;
    timestamp: number;
    timeStr: string;
  } | null>(null);
  const [isUserPulsing, setIsUserPulsing] = useState<boolean>(false);

  // Subscribe to live leaderboard ticks
  useEffect(() => {
    const unsubTicks = tradingWs.subscribeLeaderboard((tick: LeaderboardTickData) => {
      setData((prev) => {
        const next = prev.map((p) => {
          if (p.id === tick.traderId && p.status === 'Active') {
            const newRoi = +(p.roi + tick.deltaRoi).toFixed(2);
            const newPnl = +(p.pnl + tick.deltaPnl).toFixed(2);
            const newBalance = +(p.initialBalance + newPnl).toFixed(2);
            return {
              ...p,
              roi: newRoi,
              pnl: newPnl,
              currentBalance: newBalance,
              tradesCount: p.tradesCount + (Math.random() > 0.6 ? 1 : 0),
            };
          }
          return p;
        });

        // Recalculate rank order based on ROI descending
        const sorted = [...next].sort((a, b) => b.roi - a.roi);
        return sorted.map((item, idx) => ({
          ...item,
          rank: idx + 1,
        }));
      });

      // Update flash map for table rows
      setFlashMap((prev) => ({
        ...prev,
        [tick.traderId]: {
          direction: tick.direction,
          deltaRoi: tick.deltaRoi,
          deltaPnl: tick.deltaPnl,
          timestamp: Date.now(),
        },
      }));

      // If tick belongs to "trader-01" (Vị thế của tôi), trigger real-time visual pulse
      if (tick.traderId === 'trader-01') {
        setUserFlash({
          direction: tick.direction,
          deltaRoi: tick.deltaRoi,
          deltaPnl: tick.deltaPnl,
          timestamp: Date.now(),
          timeStr: tick.timestamp || new Date().toLocaleTimeString(),
        });
        setIsUserPulsing(true);
      }

      setTickCount((c) => c + 1);
      setLatency(Math.floor(Math.random() * 10 + 14)); // 14ms - 24ms
    });

    const unsubExecs = tradingWs.subscribeTradeExecutions((trade) => {
      setRecentExecutions((prev) => [trade, ...prev.slice(0, 4)]);
    });

    return () => {
      unsubTicks();
      unsubExecs();
    };
  }, []);

  // Periodic cleanup of flash animation decay (1.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFlashMap((prev) => {
        let changed = false;
        const next: Record<string, UpdateFlashInfo> = {};
        for (const [id, info] of Object.entries(prev)) {
          if (now - info.timestamp < 1500) {
            next[id] = info;
          } else {
            changed = true;
          }
        }
        return changed ? next : prev;
      });

      if (userFlash && now - userFlash.timestamp >= 1400) {
        setIsUserPulsing(false);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [userFlash]);

  // Sync streaming state with service
  const handleToggleStreaming = () => {
    const next = !isStreaming;
    setIsStreaming(next);
    tradingWs.setStreaming(next);
  };

  const handleChangeSpeed = (speed: 1800 | 900 | 500) => {
    setTickSpeed(speed);
    tradingWs.setSpeed(speed);
  };

  const handleForceTick = () => {
    tradingWs.emitRandomTick();
  };

  // User simulated order
  const handleSimulateUserTrade = (roiGain: number) => {
    tradingWs.triggerUserSimulation('trader-01', roiGain);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // Default to desc for metrics
    }
  };

  // Pinned "My Account" (trader-01 by default representing current user)
  const myTrader = useMemo(() => {
    return data.find((p) => p.id === 'trader-01') || data[0];
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Status filter
    if (statusFilter !== 'ALL') {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Global text filter
    if (globalFilter.trim()) {
      const q = globalFilter.toLowerCase();
      result = result.filter(
        (p) =>
          p.username.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortAsc
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }

      return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

    return result;
  }, [data, statusFilter, globalFilter, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredAndSortedData.slice(start, start + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  return (
    <div className="bg-[#0c121e] border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* ======================================================== */}
      {/* 1. REAL-TIME TELEMETRY & WEBSOCKET STREAM CONTROLS BAR */}
      {/* ======================================================== */}
      <div className="bg-[#060a14] border border-slate-800/90 rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-mono text-xs">
        {/* Connection status indicator */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
            <span className="flex h-2.5 w-2.5 relative">
              {isStreaming && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isStreaming ? 'bg-emerald-500' : 'bg-slate-500'
                }`}
              />
            </span>
            <span className="font-bold text-emerald-400">
              {isStreaming ? 'LIVE WEBSOCKET STREAMING' : 'STREAM PAUSED'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{latency}ms Latency</span>
          </div>

          <div className="text-slate-400 text-[11px] hidden sm:inline-flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ticks: <strong className="text-white">{tickCount.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Real-time controls (Play/Pause, Speed, Manual Tick) */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Stream Toggle */}
          <button
            onClick={handleToggleStreaming}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isStreaming
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isStreaming ? 'Tạm dừng live' : 'Bật live'}</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-[#090f1d] p-1 rounded-xl border border-slate-800 text-[11px]">
            <span className="text-slate-500 px-1 text-[10px]">Tốc độ:</span>
            {[
              { label: '1x (Chuẩn)', value: 1800 },
              { label: '2x (Nhanh)', value: 900 },
              { label: '3x (Sprint)', value: 500 },
            ].map((sp) => (
              <button
                key={sp.value}
                onClick={() => handleChangeSpeed(sp.value as 1800 | 900 | 500)}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  tickSpeed === sp.value
                    ? 'bg-[#00C076] text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>

          {/* Force Tick */}
          <button
            onClick={handleForceTick}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
            title="Kích hoạt cập nhật tức thì"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Tick ngay</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. PINNED "VỊ THẾ CỦA BẠN" (MY LIVE STANDINGS PINNED CARD) */}
      {/* ======================================================== */}
      <div
        id="my-leaderboard-position-card"
        className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-xl font-mono transition-all duration-300 border ${
          isUserPulsing
            ? userFlash?.direction === 'UP'
              ? 'bg-gradient-to-r from-[#0b291e] via-[#091b2c] to-[#120f26] border-emerald-400 shadow-2xl shadow-emerald-500/30 ring-2 ring-emerald-500/40'
              : 'bg-gradient-to-r from-[#2b0e16] via-[#1d0d22] to-[#120f26] border-rose-500 shadow-2xl shadow-rose-500/30 ring-2 ring-rose-500/40'
            : 'bg-gradient-to-r from-[#0d1e19] via-[#0b1424] to-[#120f26] border-emerald-500/50'
        }`}
      >
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-emerald-500/15 blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shrink-0 font-bold transition-all ${
              isUserPulsing
                ? userFlash?.direction === 'UP'
                  ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 scale-105'
                  : 'bg-rose-500/30 border-rose-400 text-rose-300 scale-105'
                : 'bg-[#00C076]/20 border-[#00C076]/40 text-amber-400'
            }`}>
              <Trophy className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>

            <div>
              <div className="flex items-center flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 uppercase font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>VỊ THẾ CỦA BẠN (REAL-TIME LIVE)</span>
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  Hạng #{myTrader.rank} / {data.length}
                </span>
                {userFlash && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold transition-all animate-pulse ${
                    userFlash.direction === 'UP'
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50'
                      : 'bg-rose-500/30 text-rose-200 border border-rose-400/50'
                  }`}>
                    {userFlash.direction === 'UP' ? '▲ +' : '▼ '}{userFlash.deltaRoi.toFixed(2)}% ROI ({userFlash.timeStr})
                  </span>
                )}
              </div>

              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center gap-2">
                <span>{myTrader.username}</span>
                <span>{myTrader.countryFlag}</span>
                <span className="text-xs text-emerald-400 font-normal">
                  (Đang dẫn đầu Quán Quân)
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-3">
                <span>Số lệnh: <strong className="text-white">{myTrader.tradesCount}</strong></span>
                <span>•</span>
                <span>Vốn: <strong className="text-emerald-300">${myTrader.currentBalance.toLocaleString()}</strong></span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">● WebSocket Live</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar with Real-Time Reactive Highlighting */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto text-xs">
            <div className={`border rounded-xl px-3 py-2 transition-all duration-300 ${
              isUserPulsing
                ? userFlash?.direction === 'UP'
                  ? 'bg-emerald-950/80 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-rose-950/80 border-rose-500 shadow-md shadow-rose-500/20'
                : 'bg-[#05080e]/80 border-slate-800'
            }`}>
              <div className="text-slate-400 text-[10px] flex items-center justify-between">
                <span>ROI REALTIME</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className={`text-base font-bold ${myTrader.roi >= 0 ? 'text-[#00C076]' : 'text-rose-400'}`}>
                  {myTrader.roi >= 0 ? '+' : ''}{myTrader.roi.toFixed(2)}%
                </span>
                {userFlash && (
                  <span className={`text-[11px] font-bold ${userFlash.direction === 'UP' ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {userFlash.direction === 'UP' ? '▲+' : '▼'}{userFlash.deltaRoi.toFixed(2)}%
                  </span>
                )}
              </div>
            </div>

            <div className={`border rounded-xl px-3 py-2 transition-all duration-300 ${
              isUserPulsing
                ? userFlash?.direction === 'UP'
                  ? 'bg-emerald-950/80 border-emerald-400'
                  : 'bg-rose-950/80 border-rose-500'
                : 'bg-[#05080e]/80 border-slate-800'
            }`}>
              <div className="text-slate-400 text-[10px] flex items-center justify-between">
                <span>PNL TÍCH LŨY</span>
                <span className="text-[9px] text-slate-500 font-mono">LIVE</span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className={`text-base font-bold ${myTrader.pnl >= 0 ? 'text-white' : 'text-rose-300'}`}>
                  {myTrader.pnl >= 0 ? '+' : ''}${myTrader.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                {userFlash && (
                  <span className={`text-[10px] font-bold ${userFlash.deltaPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {userFlash.deltaPnl >= 0 ? '+$' : '-$'}{Math.abs(userFlash.deltaPnl).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-[#05080e]/80 border border-slate-800 rounded-xl px-3 py-2">
              <div className="text-slate-400 text-[10px]">MAX DRAWDOWN</div>
              <div className="text-base font-bold text-slate-200 mt-0.5">
                {myTrader.maxDrawdown.toFixed(2)}%
              </div>
            </div>

            {/* Interactive Simulation Trigger */}
            <div className="flex items-center justify-end">
              <button
                onClick={() => handleSimulateUserTrade(+(Math.random() * 1.5 + 0.5).toFixed(2))}
                className="w-full h-full px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer active:scale-95"
                title="Bấm để mô phỏng vào lệnh có lãi và xem số liệu nhảy realtime"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>+Lãi Lệnh Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. LIVE TRADE EXECUTION TICKER STREAM MARQUEE */}
      {/* ======================================================== */}
      <div className="bg-[#070b14] border border-slate-800/80 rounded-xl p-2.5 px-4 font-mono text-xs flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold shrink-0 text-[11px]">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>LỆNH MỚI KHỚP:</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap text-[11px] text-slate-300 divide-x divide-slate-800">
          {recentExecutions.map((ex) => (
            <div key={ex.id} className="pl-4 first:pl-0 flex items-center gap-2">
              <span className="text-slate-500 text-[10px]">{ex.timestamp}</span>
              <strong className="text-white">{ex.traderName}</strong>
              <span className="text-cyan-400">{ex.symbol}</span>
              <span
                className={`px-1 py-0.2 rounded text-[10px] ${
                  ex.side === 'LONG' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                }`}
              >
                {ex.side} {ex.leverage}x
              </span>
              <span className={ex.pnl >= 0 ? 'text-[#00C076] font-bold' : 'text-rose-400 font-bold'}>
                {ex.pnl >= 0 ? '+' : ''}${ex.pnl.toFixed(2)} ({ex.pnlPercent >= 0 ? '+' : ''}
                {ex.pnlPercent.toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. TABLE FILTER & SEARCH CONTROLS */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              setCurrentPage(0);
            }}
            placeholder="Tìm theo tên trader, quốc gia, huy hiệu..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#05080e] border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00C076] transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 font-mono text-xs">
          {(['ALL', 'Active', 'Warning', 'Disqualified'] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(0);
              }}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-700 text-white font-bold border border-slate-600 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {st === 'ALL'
                ? `Tất cả (${data.length})`
                : st === 'Active'
                ? `Hợp lệ (${data.filter((d) => d.status === 'Active').length})`
                : st === 'Warning'
                ? `Cảnh báo (${data.filter((d) => d.status === 'Warning').length})`
                : `Bị loại (${data.filter((d) => d.status === 'Disqualified').length})`}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. MAIN LEADERBOARD TABLE (WITH REAL-TIME FLASH ROWS) */}
      {/* ======================================================== */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase select-none">
              <th
                className="py-3 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('rank')}
              >
                <div className="flex items-center gap-1">
                  <span># HẠNG</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('username')}
              >
                <div className="flex items-center gap-1">
                  <span>TRADER</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('roi')}
              >
                <div className="flex items-center gap-1">
                  <span>ROI % (LIVE)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('pnl')}
              >
                <div className="flex items-center gap-1">
                  <span>PNL (USDT)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('maxDrawdown')}
              >
                <div className="flex items-center gap-1">
                  <span>MAX DRAWDOWN</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('winRate')}
              >
                <div className="flex items-center gap-1">
                  <span>WINRATE</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">TRẠNG THÁI</th>
              <th className="py-3 px-3 text-right">CHI TIẾT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {paginatedData.length > 0 ? (
              paginatedData.map((p) => {
                const flash = flashMap[p.id];
                const isUpdated = Boolean(flash);
                const isPositiveRoi = p.roi >= 0;
                const isPositivePnl = p.pnl >= 0;
                const isMyAccount = p.id === 'trader-01';

                return (
                  <tr
                    key={p.id}
                    className={`transition-all duration-300 text-xs ${
                      isUpdated
                        ? flash.direction === 'UP'
                          ? 'bg-emerald-500/20 ring-1 ring-emerald-500/40'
                          : 'bg-rose-500/20 ring-1 ring-rose-500/40'
                        : isMyAccount
                        ? 'bg-emerald-950/20 hover:bg-emerald-900/30'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        {p.rank === 1 ? (
                          <span className="flex items-center gap-1 font-bold text-amber-400">
                            <Trophy className="w-4 h-4 fill-amber-400" /> 1
                          </span>
                        ) : p.rank === 2 ? (
                          <span className="flex items-center gap-1 font-bold text-slate-300">
                            <Medal className="w-4 h-4 fill-slate-300" /> 2
                          </span>
                        ) : p.rank === 3 ? (
                          <span className="flex items-center gap-1 font-bold text-amber-600">
                            <Award className="w-4 h-4 fill-amber-600" /> 3
                          </span>
                        ) : (
                          <span className="text-slate-400 font-semibold">{p.rank}</span>
                        )}

                        {/* Real-time pulse indicator if updated */}
                        {isUpdated && (
                          <span
                            className={`text-[10px] font-bold ${
                              flash.direction === 'UP' ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {flash.direction === 'UP' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Trader info */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                            isMyAccount
                              ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/20'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {p.username.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                            <span>{p.username}</span>
                            <span title={p.country}>{p.countryFlag}</span>
                            {isMyAccount && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500 text-black font-black">
                                BẠN
                              </span>
                            )}
                            {p.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {p.tradesCount} lệnh • Winrate {p.winRate}%
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ROI (Real-time live flash) */}
                    <td className="py-3.5 px-3 font-bold">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-sm ${
                            isPositiveRoi ? 'text-[#00C076]' : 'text-rose-400'
                          } transition-transform ${isUpdated ? 'scale-110' : ''}`}
                        >
                          {isPositiveRoi ? '+' : ''}
                          {p.roi.toFixed(2)}%
                        </span>

                        {isUpdated && (
                          <span
                            className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                              flash.direction === 'UP'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {flash.deltaRoi >= 0 ? '+' : ''}
                            {flash.deltaRoi.toFixed(2)}%
                          </span>
                        )}
                      </div>
                    </td>

                    {/* PnL */}
                    <td className="py-3.5 px-3">
                      <div className={`font-bold ${isPositivePnl ? 'text-[#00C076]' : 'text-rose-400'}`}>
                        {isPositivePnl ? '+' : ''}${p.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Số dư: ${p.currentBalance.toLocaleString()}
                      </div>
                    </td>

                    {/* Max Drawdown */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold ${
                            p.maxDrawdown > 10
                              ? 'text-rose-400'
                              : p.maxDrawdown > 8
                              ? 'text-amber-400'
                              : 'text-slate-300'
                          }`}
                        >
                          {p.maxDrawdown.toFixed(2)}%
                        </span>
                        {p.maxDrawdown > 10 && (
                          <span title="Vượt ngưỡng 10%">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                          </span>
                        )}
                      </div>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full ${
                            p.maxDrawdown > 10
                              ? 'bg-rose-500'
                              : p.maxDrawdown > 8
                              ? 'bg-amber-400'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, (p.maxDrawdown / 10) * 100)}%` }}
                        />
                      </div>
                    </td>

                    {/* Winrate */}
                    <td className="py-3.5 px-3">
                      <span className="text-slate-200 font-bold">{p.winRate}%</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      {p.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Hợp lệ
                        </span>
                      ) : p.status === 'Warning' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          <AlertTriangle className="w-3 h-3" /> Cảnh báo DD
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          <XCircle className="w-3 h-3" /> Bị loại (&gt;10% DD)
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => {
                          if (onSelectTrader) {
                            onSelectTrader(p);
                          } else if (onOpenRegister) {
                            onOpenRegister();
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors inline-flex items-center gap-1 cursor-pointer text-[11px]"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>Xem lệnh</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 font-mono text-xs">
                  Không tìm thấy thí sinh nào phù hợp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ======================================================== */}
      {/* 6. PAGINATION CONTROLS */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
        <div>
          Hiển thị trang <span className="text-white font-bold">{currentPage + 1}</span> /{' '}
          <span className="text-white font-bold">{Math.max(1, totalPages)}</span> (Tổng số{' '}
          {filteredAndSortedData.length} thí sinh)
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Trước</span>
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Sau</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
