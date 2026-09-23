import React, { useEffect, useState, useRef } from 'react';
import { tradingWs } from '../../services/tradingWsService';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

interface TickerPriceData {
  price: number;
  change24h: number;
  direction?: 'UP' | 'DOWN';
}

export const RunningPriceTicker: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, TickerPriceData>>(() => {
    const initial = tradingWs.getPrices();
    const mapped: Record<string, TickerPriceData> = {};
    for (const [sym, data] of Object.entries(initial)) {
      mapped[sym] = {
        ...data,
        direction: 'UP',
      };
    }
    return mapped;
  });

  const prevPricesRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const unsub = tradingWs.subscribeTicker((newPrices) => {
      setPrices((prev) => {
        const next: Record<string, TickerPriceData> = {};
        for (const [sym, data] of Object.entries(newPrices)) {
          const prevPrice = prevPricesRef.current[sym] || prev[sym]?.price || data.price;
          const direction = data.price >= prevPrice ? 'UP' : 'DOWN';
          next[sym] = {
            ...data,
            direction,
          };
          prevPricesRef.current[sym] = data.price;
        }
        return next;
      });
    });
    return unsub;
  }, []);

  const items = [
    { sym: 'BTC/USDT', p: prices.BTC?.price ?? 92250.5, c: prices.BTC?.change24h ?? 3.42, dir: prices.BTC?.direction, dec: 1 },
    { sym: 'ETH/USDT', p: prices.ETH?.price ?? 3376.1, c: prices.ETH?.change24h ?? 2.15, dir: prices.ETH?.direction, dec: 1 },
    { sym: 'SOL/USDT', p: prices.SOL?.price ?? 188.56, c: prices.SOL?.change24h ?? 5.68, dir: prices.SOL?.direction, dec: 2 },
    { sym: 'BNB/USDT', p: prices.BNB?.price ?? 638.2, c: prices.BNB?.change24h ?? 1.84, dir: prices.BNB?.direction, dec: 1 },
    { sym: 'XRP/USDT', p: prices.XRP?.price ?? 2.45, c: prices.XRP?.change24h ?? 4.12, dir: prices.XRP?.direction, dec: 2 },
    { sym: 'AVAX/USDT', p: prices.AVAX?.price ?? 36.8, c: prices.AVAX?.change24h ?? -1.25, dir: prices.AVAX?.direction, dec: 1 },
    { sym: 'DOGE/USDT', p: prices.DOGE?.price ?? 0.284, c: prices.DOGE?.change24h ?? 6.91, dir: prices.DOGE?.direction, dec: 4 },
  ];

  const renderTickerList = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {items.map((item, idx) => {
        const isUp = (item.c ?? 0) >= 0;
        const isTickingUp = item.dir === 'UP';

        return (
          <div
            key={`${keyPrefix}-${idx}`}
            className="flex items-center gap-2 shrink-0 px-4 py-0.5 rounded-md hover:bg-slate-800/40 transition-colors"
          >
            <span className="text-slate-400 font-bold tracking-wide">{item.sym}</span>
            <span
              className={`font-mono font-bold transition-all duration-300 ${
                isTickingUp ? 'text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'text-white'
              }`}
            >
              ${item.p.toLocaleString('en-US', { minimumFractionDigits: item.dec, maximumFractionDigits: item.dec })}
            </span>
            <span
              className={`flex items-center font-semibold text-[11px] px-1.5 py-0.2 rounded ${
                isUp ? 'text-[#00C076] bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
              }`}
            >
              {isUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {isUp ? '+' : ''}{item.c.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-[#05080e] border-y border-slate-800/90 py-2.5 overflow-hidden select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Left Fixed Badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#00C076] shrink-0 pr-4 mr-4 border-r border-slate-800 z-10 bg-[#05080e]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C076] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C076]" />
          </span>
          <Radio className="w-3.5 h-3.5 text-[#00C076]" />
          <span className="font-bold tracking-wider hidden sm:inline">BAMBOOZER TICKER FEED</span>
          <span className="font-bold tracking-wider sm:hidden">TICKER</span>
        </div>

        {/* Continuous Animated Marquee Track (Smooth Infinite Scrolling, No Scrollbar) */}
        <div className="flex-1 overflow-hidden relative">
          {/* Subtle edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#05080e] to-transparent z-1 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#05080e] to-transparent z-1 pointer-events-none" />

          {/* 2 identical tracks translating to -50% for 100% seamless non-stop loop */}
          <div className="animate-ticker flex items-center py-0.5 text-xs font-mono">
            {renderTickerList('batch-1')}
            {renderTickerList('batch-2')}
          </div>
        </div>

        {/* Right Fixed Prize Badge */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0 pl-4 ml-4 border-l border-slate-800 z-10 bg-[#05080e]">
          <span className="text-slate-500">PRIZE POOL:</span>
          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
            $1,140 USDT
          </span>
        </div>
      </div>
    </div>
  );
};
