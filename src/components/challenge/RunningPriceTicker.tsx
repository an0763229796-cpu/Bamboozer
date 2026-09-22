import React, { useEffect, useState } from 'react';
import { tradingWs } from '../../services/tradingWsService';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

export const RunningPriceTicker: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, { price: number; change24h: number }>>({
    BTC: { price: 91450, change24h: 3.42 },
    ETH: { price: 3392, change24h: 2.15 },
    SOL: { price: 188.4, change24h: 5.68 },
    BNB: { price: 642.1, change24h: 1.84 },
  });

  useEffect(() => {
    const unsub = tradingWs.subscribeTicker((newPrices) => {
      setPrices(newPrices);
    });
    return unsub;
  }, []);

  const items = [
    { sym: 'BTC/USDT', p: prices.BTC.price, c: prices.BTC.change24h },
    { sym: 'ETH/USDT', p: prices.ETH.price, c: prices.ETH.change24h },
    { sym: 'SOL/USDT', p: prices.SOL.price, c: prices.SOL.change24h },
    { sym: 'BNB/USDT', p: prices.BNB.price, c: prices.BNB.change24h },
  ];

  return (
    <div className="bg-[#05080e] border-y border-slate-800/80 py-2 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00C076] shrink-0 pr-4 border-r border-slate-800">
          <span className="w-2 h-2 rounded-full bg-[#00C076] animate-ping" />
          <Radio className="w-3.5 h-3.5 text-[#00C076]" />
          <span className="font-bold">BAMBOOZER TICKER FEED</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5 px-2 text-xs font-mono">
          {items.concat(items).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="text-slate-400 font-bold">{item.sym}</span>
              <span className="text-white font-bold">${item.p.toLocaleString('en-US', { minimumFractionDigits: 1 })}</span>
              <span className={`flex items-center font-semibold text-[11px] ${item.c >= 0 ? 'text-[#00C076]' : 'text-rose-400'}`}>
                {item.c >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {item.c >= 0 ? '+' : ''}{item.c.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0 pl-4 border-l border-slate-800">
          <span>PRIZE POOL:</span>
          <span className="text-emerald-400 font-bold">$1,140 USDT</span>
        </div>
      </div>
    </div>
  );
};
