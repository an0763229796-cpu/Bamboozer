import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  WalletCards, 
  KeyRound, 
  Sparkles, 
  Play, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  CheckCircle2, 
  Zap, 
  SlidersHorizontal,
  ChevronRight,
  BarChart3,
  Flame,
  Globe2
} from 'lucide-react';
import { SAMPLE_ASSETS } from '../data/content';
import { AssetAnalysisData } from '../types';
import { ThreeQuantFabric } from './ThreeQuantFabric';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onOpenVideoDemo: () => void;
  onOpenQuickGuide: (moduleId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRegister,
  onOpenVideoDemo,
  onOpenQuickGuide
}) => {
  const assetKeys = Object.keys(SAMPLE_ASSETS);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTC/USDT');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeTabTimeframe, setActiveTabTimeframe] = useState<'15m' | '1h' | '4h' | '1d'>('4h');
  const [pulseTick, setPulseTick] = useState<number>(0);

  const currentAsset: AssetAnalysisData = SAMPLE_ASSETS[selectedSymbol];

  // Periodic subtle price pulse simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleAssetChange = (sym: string) => {
    setIsAnalyzing(true);
    setSelectedSymbol(sym);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden" id="hero-section">
      {/* Background 3D WebGL Fluid Fabric (Three.js Lusion style) */}
      <ThreeQuantFabric />

      {/* Background Decorative Gradients & Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-teal-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-cyan-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tagline / Regulation Badge & 3D Interactive Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Nền tảng AI Quant Trading Thế Hệ Mới</span>
            <span className="text-emerald-500/50">•</span>
            <span className="text-slate-300">Singapore UEN: 202202779W</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>3D WebGL Fluid Fabric • Di chuột để tương tác sóng</span>
          </div>
        </div>

        {/* Hero Headline & Sub-headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
            Tự động hóa bằng AI cho{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Tiền mã hóa, Cổ phiếu
            </span>{' '}
            và Ngoại hối
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Kết nối API sàn/nhà môi giới, phân tích thị trường bằng AI và quản lý mọi chiến lược giao dịch trong một không gian làm việc duy nhất.
          </p>
        </div>

        {/* 4 Core Safety Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto mb-10">
          <div className="bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all flex items-start gap-3 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-snug">
                Non-custodial platform
              </div>
              <div className="text-[11px] text-emerald-400/90 font-medium mt-0.5">
                Nền tảng không lưu ký
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all flex items-start gap-3 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
              <WalletCards className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-snug">
                Your funds stay in account
              </div>
              <div className="text-[11px] text-teal-400/90 font-medium mt-0.5">
                Tiền nằm trên sàn cá nhân
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all flex items-start gap-3 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-snug">
                No withdrawal permission
              </div>
              <div className="text-[11px] text-cyan-400/90 font-medium mt-0.5">
                Không quyền rút tiền
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all flex items-start gap-3 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-snug">
                No coding required
              </div>
              <div className="text-[11px] text-amber-400/90 font-medium mt-0.5">
                Không cần biết lập trình
              </div>
            </div>
          </div>
        </div>

        {/* Slogan & Action CTAs */}
        <div className="text-center mb-12">
          <p className="text-sm sm:text-base font-semibold text-slate-300 italic mb-6">
            &ldquo;Tài khoản của bạn. Chiến lược của bạn. Quyền kiểm soát của bạn.&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="btn-hero-start-free"
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Bắt đầu ngay - Nhận 100 Credits Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="btn-hero-watch-demo"
              onClick={onOpenVideoDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Play className="w-3 h-3 fill-emerald-400 ml-0.5" />
              </div>
              <span>Xem Video Demo 3 Phút</span>
            </button>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Không cần thẻ tín dụng
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Kích hoạt trong 60 giây
            </span>
          </div>
        </div>

        {/* Interactive Media Asset: AI Asset Analysis Visual Mockup */}
        <div className="relative max-w-5xl mx-auto">
          {/* Outer glow frame */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-cyan-500/30 rounded-2xl blur-lg opacity-70" />

          <div className="relative rounded-2xl bg-[#0d131f] border border-slate-800 shadow-2xl overflow-hidden">
            {/* Top Bar of App Mockup */}
            <div className="px-4 py-3 bg-[#0a0e17] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-slate-800" />
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-mono">BAMBOOZER</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">AI Asset Analysis</span>
                </div>
              </div>

              {/* Asset Selectors */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {assetKeys.map((sym) => {
                  const asset = SAMPLE_ASSETS[sym];
                  const isSelected = selectedSymbol === sym;
                  return (
                    <button
                      key={sym}
                      onClick={() => handleAssetChange(sym)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                          : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <span>{sym}</span>
                      <span className={`text-[10px] font-mono ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  FEED: 12ms
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">
                  AES-256 ENCLAVE
                </span>
                <button
                  onClick={() => onOpenQuickGuide('ai-analysis')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                >
                  Xem hướng dẫn đọc tín hiệu
                </button>
              </div>
            </div>

            {/* Main Interactive Analysis Panel */}
            <div className="p-4 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 Columns: Chart Simulation & Macro Indices */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Symbol Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">
                          {currentAsset.symbol}
                        </h3>
                        <span className="text-xs text-slate-400">
                          {currentAsset.name}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {currentAsset.type}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-3xl font-mono font-black text-white tracking-tight">
                          ${currentAsset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <span className={`flex items-center text-sm font-semibold font-mono ${currentAsset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {currentAsset.change24h >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                          {currentAsset.change24h >= 0 ? '+' : ''}{currentAsset.change24h}%
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          ATR (14): ${currentAsset.atrValue}
                        </span>
                      </div>
                    </div>

                    {/* Timeframe selector */}
                    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
                      {(['15m', '1h', '4h', '1d'] as const).map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setActiveTabTimeframe(tf)}
                          className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                            activeTabTimeframe === tf
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulated SVG Candlestick & Indicator Chart */}
                  <div className="relative h-56 sm:h-64 w-full bg-[#080c14] rounded-xl border border-slate-800/80 p-3 overflow-hidden">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-20">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="border-r border-b border-slate-700" />
                      ))}
                    </div>

                    {/* SVG Candlesticks & Technical Lines */}
                    <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Moving Average Line 1 (EMA 20) */}
                      <path
                        d="M 10 140 Q 90 120 180 110 T 350 85 T 500 55 T 590 40"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeOpacity="0.7"
                      />

                      {/* Moving Average Line 2 (EMA 50) */}
                      <path
                        d="M 10 160 Q 110 140 220 130 T 400 105 T 590 75"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="1.5"
                        strokeOpacity="0.6"
                      />

                      {/* Area Fill */}
                      <path
                        d="M 10 150 Q 70 130 140 140 T 260 100 T 380 90 T 480 60 T 590 45 L 590 190 L 10 190 Z"
                        fill="url(#areaGradient)"
                      />

                      {/* Simulated Candlesticks */}
                      {/* Bar 1 */}
                      <line x1="40" y1="130" x2="40" y2="165" stroke="#ef4444" strokeWidth="1" />
                      <rect x="36" y="135" width="8" height="20" fill="#ef4444" rx="1" />
                      {/* Bar 2 */}
                      <line x1="80" y1="120" x2="80" y2="155" stroke="#10b981" strokeWidth="1" />
                      <rect x="76" y="125" width="8" height="22" fill="#10b981" rx="1" />
                      {/* Bar 3 */}
                      <line x1="120" y1="125" x2="120" y2="150" stroke="#10b981" strokeWidth="1" />
                      <rect x="116" y="128" width="8" height="15" fill="#10b981" rx="1" />
                      {/* Bar 4 */}
                      <line x1="160" y1="105" x2="160" y2="140" stroke="#10b981" strokeWidth="1" />
                      <rect x="156" y="110" width="8" height="24" fill="#10b981" rx="1" />
                      {/* Bar 5 */}
                      <line x1="200" y1="110" x2="200" y2="135" stroke="#ef4444" strokeWidth="1" />
                      <rect x="196" y="115" width="8" height="14" fill="#ef4444" rx="1" />
                      {/* Bar 6 */}
                      <line x1="240" y1="85" x2="240" y2="125" stroke="#10b981" strokeWidth="1" />
                      <rect x="236" y="92" width="8" height="26" fill="#10b981" rx="1" />
                      {/* Bar 7 */}
                      <line x1="280" y1="80" x2="280" y2="110" stroke="#10b981" strokeWidth="1" />
                      <rect x="276" y="85" width="8" height="20" fill="#10b981" rx="1" />
                      {/* Bar 8 */}
                      <line x1="320" y1="75" x2="320" y2="105" stroke="#ef4444" strokeWidth="1" />
                      <rect x="316" y="80" width="8" height="18" fill="#ef4444" rx="1" />
                      {/* Bar 9 */}
                      <line x1="360" y1="70" x2="360" y2="100" stroke="#10b981" strokeWidth="1" />
                      <rect x="356" y="74" width="8" height="20" fill="#10b981" rx="1" />
                      {/* Bar 10 */}
                      <line x1="400" y1="60" x2="400" y2="92" stroke="#10b981" strokeWidth="1" />
                      <rect x="396" y="65" width="8" height="22" fill="#10b981" rx="1" />
                      {/* Bar 11 */}
                      <line x1="440" y1="50" x2="440" y2="85" stroke="#10b981" strokeWidth="1" />
                      <rect x="436" y="55" width="8" height="24" fill="#10b981" rx="1" />
                      {/* Bar 12 */}
                      <line x1="480" y1="45" x2="480" y2="78" stroke="#10b981" strokeWidth="1" />
                      <rect x="476" y="50" width="8" height="22" fill="#10b981" rx="1" />
                      {/* Bar 13 - Current pulsing bar */}
                      <line x1="520" y1="35" x2="520" y2="70" stroke="#10b981" strokeWidth="1.5" />
                      <rect x="515" y="40" width="10" height="25" fill="#10b981" rx="1" className="animate-pulse" />

                      {/* Entry line indicator */}
                      <line x1="0" y1="70" x2="600" y2="70" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.8" />
                      {/* Stop Loss line indicator */}
                      <line x1="0" y1="130" x2="600" y2="130" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.8" />
                      {/* Take Profit line indicator */}
                      <line x1="0" y1="25" x2="600" y2="25" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.8" />
                    </svg>

                    {/* Chart Overlay Annotations */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        TP: ${currentAsset.takeProfit1}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        ENTRY: ${currentAsset.entryZone[0]}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        SL (ATR): ${currentAsset.stopLoss}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live WebSocket Tick ({pulseTick * 2}ms)</span>
                    </div>
                  </div>

                  {/* Micro Depth-of-Market (Order Book) Telemetry Bar */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-slate-400 mb-1.5 pb-1 border-b border-slate-800/80">
                      <span className="flex items-center gap-1.5 text-white font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        ORDER BOOK DEPTH (DOM)
                      </span>
                      <span className="text-cyan-400">Spread: $1.50 (0.0016%)</span>
                      <span className="text-slate-400 hidden sm:inline">Slip: &lt; 0.01%</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Bids side */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-500">
                          <span>BID (BUY)</span>
                          <span>QTY</span>
                        </div>
                        <div className="relative flex justify-between text-emerald-400 px-1 py-0.5 rounded overflow-hidden">
                          <div className="absolute inset-0 bg-emerald-500/10 w-[78%]" />
                          <span className="relative font-bold">${(currentAsset.price - 0.75).toFixed(2)}</span>
                          <span className="relative tabular-nums">2.45 BTC</span>
                        </div>
                        <div className="relative flex justify-between text-emerald-400/80 px-1 py-0.5 rounded overflow-hidden">
                          <div className="absolute inset-0 bg-emerald-500/10 w-[54%]" />
                          <span className="relative font-bold">${(currentAsset.price - 2.50).toFixed(2)}</span>
                          <span className="relative tabular-nums">1.82 BTC</span>
                        </div>
                      </div>

                      {/* Asks side */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-500">
                          <span>ASK (SELL)</span>
                          <span>QTY</span>
                        </div>
                        <div className="relative flex justify-between text-rose-400 px-1 py-0.5 rounded overflow-hidden">
                          <div className="absolute inset-0 bg-rose-500/10 w-[65%]" />
                          <span className="relative font-bold">${(currentAsset.price + 0.75).toFixed(2)}</span>
                          <span className="relative tabular-nums">1.94 BTC</span>
                        </div>
                        <div className="relative flex justify-between text-rose-400/80 px-1 py-0.5 rounded overflow-hidden">
                          <div className="absolute inset-0 bg-rose-500/10 w-[42%]" />
                          <span className="relative font-bold">${(currentAsset.price + 2.50).toFixed(2)}</span>
                          <span className="relative tabular-nums">1.15 BTC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Macro Indicators Row */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Fear & Greed</span>
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-sm font-bold text-white font-mono flex items-baseline gap-1.5">
                      <span>{currentAsset.macroFactors.fearGreedIndex}</span>
                      <span className="text-[10px] text-amber-400 font-normal">
                        {currentAsset.macroFactors.fearGreedLabel}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Chỉ số DXY</span>
                      <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-sm font-bold text-white font-mono flex items-baseline gap-1.5">
                      <span>{currentAsset.macroFactors.dxyIndex}</span>
                      <span className="text-[10px] text-slate-400 font-normal">USD Index</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Biến động VIX</span>
                      <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="text-sm font-bold text-white font-mono flex items-baseline gap-1.5">
                      <span>{currentAsset.macroFactors.vixIndex}</span>
                      <span className="text-[10px] text-emerald-400 font-normal">Ổn định</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: AI Recommendation & Confidence Score Card */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#111827] to-[#0c101a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between relative">
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-[#0d131f]/90 backdrop-blur-xs flex flex-col items-center justify-center rounded-xl z-20">
                    <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                    <span className="text-xs font-semibold text-emerald-300">
                      AI đang phân tích đa khung thời gian & chỉ báo...
                    </span>
                  </div>
                )}

                <div>
                  {/* AI Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      White-Box AI Signal
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Cập nhật: 12 giây trước
                    </span>
                  </div>

                  {/* Recommendation & Confidence Bar */}
                  <div className="bg-[#080c14] border border-slate-800 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">Khuyến nghị hành động:</span>
                      <span className={`text-sm font-extrabold px-2.5 py-0.5 rounded font-mono ${
                        currentAsset.recommendation.includes('BUY') 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                          : currentAsset.recommendation.includes('SELL')
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        {currentAsset.recommendation}
                      </span>
                    </div>

                    {/* Confidence Score Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1 font-mono">
                        <span className="text-slate-300">Độ tin cậy (Confidence):</span>
                        <span className="font-bold text-emerald-400 text-sm">
                          {currentAsset.confidenceScore}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 rounded-full transition-all duration-700"
                          style={{ width: `${currentAsset.confidenceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multi-Timeframe Consensus */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                      <span>Đồng thuận đa khung giờ (Consensus):</span>
                      <span className="text-[10px] text-emerald-400">3/4 Khung Bullish</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono font-bold">
                      <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        15m: {currentAsset.multiTimeframeConsensus.tf15m}
                      </div>
                      <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        1h: {currentAsset.multiTimeframeConsensus.tf1h}
                      </div>
                      <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        4h: {currentAsset.multiTimeframeConsensus.tf4h}
                      </div>
                      <div className="p-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        1D: {currentAsset.multiTimeframeConsensus.tf1d}
                      </div>
                    </div>
                  </div>

                  {/* Entry, Stop Loss, Take Profit */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400">Vùng Entry Zone:</span>
                      <span className="font-mono font-bold text-cyan-300">
                        ${currentAsset.entryZone[0].toLocaleString()} - ${currentAsset.entryZone[1].toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400">Stop Loss chuẩn ATR:</span>
                      <span className="font-mono font-bold text-rose-400">
                        ${currentAsset.stopLoss.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400">Take Profit 1 / 2:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        ${currentAsset.takeProfit1.toLocaleString()} / ${currentAsset.takeProfit2.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Technical Reasons (White-Box Proof) */}
                  <div>
                    <div className="text-xs font-semibold text-slate-300 mb-1.5">
                      Lý do kỹ thuật chi tiết:
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-400">
                      {currentAsset.technicalReasons.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action inside card */}
                <div className="pt-4 border-t border-slate-800 mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleAssetChange(selectedSymbol)}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                    <span>Quét lại tín hiệu AI</span>
                  </button>
                  <button
                    onClick={onOpenRegister}
                    className="py-2 px-3 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Tự động hóa Bot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
