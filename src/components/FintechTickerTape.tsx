import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ShieldCheck, Activity, Cpu, Wifi } from 'lucide-react';

interface TickerAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isUp: boolean;
  category: 'crypto' | 'stock' | 'forex' | 'commodity';
}

const INITIAL_TICKER_DATA: TickerAsset[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', price: 94820.50, change: 3.42, isUp: true, category: 'crypto' },
  { symbol: 'ETH/USDT', name: 'Ethereum', price: 3412.80, change: 2.15, isUp: true, category: 'crypto' },
  { symbol: 'SOL/USDT', name: 'Solana', price: 218.40, change: 6.84, isUp: true, category: 'crypto' },
  { symbol: 'NVDA', name: 'Nvidia Corp', price: 138.25, change: 4.12, isUp: true, category: 'stock' },
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 582.40, change: 0.68, isUp: true, category: 'stock' },
  { symbol: 'XAU/USD', name: 'Gold Spot', price: 2742.60, change: 0.85, isUp: true, category: 'commodity' },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0824, change: -0.14, isUp: false, category: 'forex' },
  { symbol: 'BNB/USDT', name: 'BNB Chain', price: 648.20, change: 1.95, isUp: true, category: 'crypto' },
  { symbol: 'TSLA', name: 'Tesla Motors', price: 242.10, change: -1.22, isUp: false, category: 'stock' },
  { symbol: 'BRENT', name: 'Crude Oil', price: 74.80, change: -0.45, isUp: false, category: 'commodity' },
];

export const FintechTickerTape: React.FC = () => {
  const [tickerList, setTickerList] = useState<TickerAsset[]>(INITIAL_TICKER_DATA);
  const [latency, setLatency] = useState<number>(12);
  const [blockHeight, setBlockHeight] = useState<number>(942851);

  // Subtle real-time tick pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(9, Math.min(18, prev + (Math.random() > 0.5 ? 1 : -1))));
      setBlockHeight(prev => prev + 1);

      setTickerList(current =>
        current.map(item => {
          if (Math.random() > 0.7) {
            const delta = (Math.random() - 0.48) * (item.price * 0.0006);
            const newPrice = Number((item.price + delta).toFixed(item.category === 'forex' ? 4 : 2));
            return {
              ...item,
              price: newPrice,
              isUp: delta >= 0
            };
          }
          return item;
        })
      );
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#05080e] border-y border-slate-800/80 text-xs select-none overflow-hidden relative font-mono">
      {/* Top micro-bar: Institutional Telemetry */}
      <div className="hidden md:flex items-center justify-between px-4 py-1 bg-[#030508] border-b border-slate-900 text-[10px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>FEED LIVE: BINANCE / OKX / CME / NASDAQ</span>
          </span>

          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>Độ trễ WebSocket: <strong className="text-white tabular-nums">{latency}ms</strong></span>
          </span>

          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>Mã hóa Client Enclave: <strong className="text-emerald-300">AES-256-GCM</strong></span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-300">
            Khối xác thực: <strong className="text-cyan-300 tabular-nums">#{blockHeight.toLocaleString()}</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span>NON-CUSTODIAL ZERO-WITHDRAWAL</span>
          </span>
        </div>
      </div>

      {/* Main Continuous Marquee Ticker */}
      <div className="relative flex overflow-x-hidden py-2 bg-[#060910]">
        <div className="animate-ticker flex items-center gap-6 whitespace-nowrap">
          {/* Double list for smooth infinite scroll */}
          {[...tickerList, ...tickerList].map((asset, idx) => (
            <div
              key={`${asset.symbol}-${idx}`}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight">{asset.symbol}</span>
                <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                  {asset.category}
                </span>
              </div>

              <span className="font-extrabold text-white tabular-nums text-[11px]">
                ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.category === 'forex' ? 4 : 2 })}
              </span>

              <span
                className={`inline-flex items-center gap-0.5 text-[10px] font-bold tabular-nums px-1.5 py-0.2 rounded ${
                  asset.isUp
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-rose-400 bg-rose-500/10'
                }`}
              >
                {asset.isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                {asset.isUp ? '+' : ''}{asset.change}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
