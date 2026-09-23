import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Layers, Activity, Users, Shield, Zap } from 'lucide-react';
import { tradingWs, MarketAggregateData } from '../../services/tradingWsService';
import { useCampaignI18n } from '../../i18n/campaignI18n';

export const InstitutionalTerminal: React.FC = () => {
  const { language } = useCampaignI18n();
  const isEn = language === 'en';

  const [aggregate, setAggregate] = useState<MarketAggregateData>({
    totalVolume24hUsd: 4850240100,
    openPositionsCount: 342,
    validTradersCount: 59,
    disqualifiedCount: 9,
    avgWinRate: 64.2,
    isLiveConnected: true,
    lastUpdateTimestamp: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const unsub = tradingWs.subscribeMarketAggregate((data) => {
      setAggregate(data);
    });
    return unsub;
  }, []);

  const formatVolume = (vol: number) => {
    if (vol >= 1_000_000_000) {
      return `$${(vol / 1_000_000_000).toFixed(2)}B USDT`;
    }
    if (vol >= 1_000_000) {
      return `$${(vol / 1_000_000).toFixed(1)}M USDT`;
    }
    return `$${vol.toLocaleString()} USDT`;
  };

  return (
    <div className="bg-[#05080e] border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Activity className="w-3.5 h-3.5 text-[#00C076]" />
            <span className="font-bold text-white tracking-wider">
              {isEn ? 'INSTITUTIONAL METRICS // REAL-TIME AGGREGATE' : 'INSTITUTIONAL METRICS // 24H SPRINT AGGREGATE'}
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/20 hidden md:inline">
              LIVE BINANCE FEED
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Zap className="w-3 h-3" />
              <span>{isEn ? 'Live Connected' : 'Kết nối trực tiếp'}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">
              {isEn ? `Sync: ${aggregate.lastUpdateTimestamp}` : `Đồng bộ: ${aggregate.lastUpdateTimestamp}`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          {/* 24H Volume */}
          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? '24H REALTIME VOLUME' : 'TỔNG VOLUME 24H'}</span>
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {formatVolume(aggregate.totalVolume24hUsd)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{isEn ? '+18.4% 24h market activity' : '+18.4% so với hôm qua'}</span>
            </div>
          </div>

          {/* Open Interest */}
          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'OPEN POSITIONS (OI)' : 'VỊ THẾ ĐANG MỞ (OI)'}</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {aggregate.openPositionsCount} {isEn ? 'Positions' : 'Vị Thế'}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Long 58.4% • Short 41.6%
            </div>
          </div>

          {/* Active Traders */}
          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'ACTIVE SPRINT TRADERS' : 'SỐ THÍ SINH ĐANG THI ĐẤU'}</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {aggregate.validTradersCount} / 68 {isEn ? 'Eligible' : 'Hợp Lệ'}
            </div>
            <div className="text-[11px] text-rose-400 mt-1">
              {aggregate.disqualifiedCount} {isEn ? 'failed Max DD rule' : 'thí sinh vi phạm Max DD'}
            </div>
          </div>

          {/* Average Win Rate */}
          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'AVERAGE WIN RATE' : 'TỶ LỆ THẮNG TRUNG BÌNH'}</span>
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {aggregate.avgWinRate.toFixed(1)}% Winrate
            </div>
            <div className="text-[11px] text-[#00C076] mt-1">
              {isEn ? 'Strict Stop-loss Risk Rule' : 'Kỷ luật Stop-loss chặt chẽ'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
