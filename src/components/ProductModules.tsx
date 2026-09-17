import React, { useState } from 'react';
import { PRODUCT_MODULES, BOT_ARCHITECTURES, LIVE_MARKET_SIGNALS } from '../data/content';
import { 
  Sparkles, 
  Code2, 
  Bot, 
  BarChart2, 
  Terminal, 
  Key, 
  ArrowRight, 
  Check, 
  BookOpen, 
  Play, 
  Zap, 
  Sliders, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  SlidersHorizontal,
  RefreshCw,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../i18n';

interface ProductModulesProps {
  onOpenQuickGuide: (moduleId: string) => void;
  onOpenRegister: () => void;
}

export const ProductModules: React.FC<ProductModulesProps> = ({
  onOpenQuickGuide,
  onOpenRegister
}) => {
  const { t, tContent } = useLanguage();
  const [activeModuleId, setActiveModuleId] = useState<string>('ai-analysis');

  // Interactive state for IDE module
  const [promptInput, setPromptInput] = useState<string>('Tạo chỉ báo SuperTrend kết hợp RSI phân kỳ báo mũi tên Buy/Sell');
  const [isGeneratingCode, setIsGeneratingCode] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>(`//@version=5
indicator("Bamboozer SuperTrend + RSI Divergence", overlay=true)

// Inputs
atrPeriod = input.int(10, "ATR Period")
factor = input.float(3.0, "SuperTrend Factor")
rsiPeriod = input.int(14, "RSI Length")

// Calculations
[superTrend, direction] = ta.supertrend(factor, atrPeriod)
rsiVal = ta.rsi(close, rsiPeriod)

// Buy / Sell Signals
buySignal = ta.crossover(close, superTrend) and (rsiVal < 65)
sellSignal = ta.crossunder(close, superTrend) and (rsiVal > 35)

plotshape(buySignal, "AI Buy Signal", shape.triangleup, location.belowbar, color.green, size=size.small)
plotshape(sellSignal, "AI Sell Signal", shape.triangledown, location.abovebar, color.red, size=size.small)`);

  // Interactive state for Grid Bot module
  const [gridUpper, setGridUpper] = useState<number>(98500);
  const [gridLower, setGridLower] = useState<number>(91000);
  const [gridCount, setGridCount] = useState<number>(20);

  const activeModule = PRODUCT_MODULES.find((m) => m.id === activeModuleId) || PRODUCT_MODULES[0];

  const handleGeneratePineScript = () => {
    setIsGeneratingCode(true);
    setTimeout(() => {
      setIsGeneratingCode(false);
      setGeneratedCode(`//@version=5
indicator("Bamboozer Custom AI Strategy: ${promptInput.slice(0, 30)}...", overlay=true)

// AI Optimized Quant Parameters
rsiPeriod = input.int(14, "RSI Length")
emaFast = input.int(21, "EMA Fast")
emaSlow = input.int(55, "EMA Slow")

rsi = ta.rsi(close, rsiPeriod)
fast = ta.ema(close, emaFast)
slow = ta.ema(close, emaSlow)

bullishConsensus = (close > fast) and (fast > slow) and (rsi > 50 and rsi < 70)
bearishConsensus = (close < fast) and (fast < slow) and (rsi < 50 and rsi > 30)

plotshape(bullishConsensus, "Quant AI Long", shape.triangleup, location.belowbar, color=#10b981, size=size.normal)
plotshape(bearishConsensus, "Quant AI Short", shape.triangledown, location.abovebar, color=#ef4444, size=size.normal)
alertcondition(bullishConsensus, "Bamboozer Webhook Trigger: BUY", "Signal detected")`);
    }, 600);
  };

  return (
    <section className="py-24 bg-[#080c14] border-t border-slate-800/80 relative" id="modules">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('ecosystem')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('modulesTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('modulesDescription')}
          </p>

          {/* Module Selector Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {PRODUCT_MODULES.map((mod, idx) => {
              const isSelected = mod.id === activeModuleId;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                  <span>{mod.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Showcase Card */}
        <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 cols: Description, Features & Quick Guide Button */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {activeModule.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {t('interactiveDemo')}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {tContent(`module.${activeModule.id}.title`, activeModule.title)}
                </h3>
                <h4 className="text-sm font-semibold text-emerald-400 mb-4">
                  {tContent(`module.${activeModule.id}.name`, activeModule.vietnameseName || activeModule.title)}
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {tContent(`module.${activeModule.id}.description`, activeModule.description)}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-3 mb-8">
                    {activeModule.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{tContent(`module.${activeModule.id}.highlight.${idx}`, hl)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenQuickGuide(activeModule.id)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>{tContent('product.quickGuide')}</span>
                </button>

                <button
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{tContent('product.tryFeature')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 7 cols: Specialized Live Interactive Mockup */}
            <div className="lg:col-span-7 bg-[#080c14] border border-slate-800 rounded-xl p-5 shadow-inner min-h-[440px] flex flex-col justify-between">
              {/* Module 1: AI Asset Analysis Mockup */}
              {activeModuleId === 'ai-analysis' && (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>{tContent('product.aiScreener')}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {tContent('product.realtimeConsensus')}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-extrabold text-white font-mono">BTC/USDT</span>
                          <span className="text-xs text-slate-400">Bitcoin Perpetual</span>
                        </div>
                        <div className="text-2xl font-mono font-black text-white mt-0.5">
                          $94,820.50
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded text-xs font-black font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-1">
                          BUY (84% CONFIDENCE)
                        </span>
                        <div className="text-[11px] text-slate-400">
                          ATR Độ Biến Động: <strong className="text-white">$1,420</strong>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-4">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-400">{tContent('product.entry')}</div>
                        <div className="text-cyan-300 font-bold">$93,800 - $94,400</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-400">{tContent('product.atrStop')}</div>
                        <div className="text-rose-400 font-bold">$92,100</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-400">{tContent('product.takeProfit')}</div>
                        <div className="text-emerald-400 font-bold">$96,800 / $99,500</div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px] text-slate-300">
                      <strong className="text-emerald-400 block mb-1">{tContent('product.mathMacro')}</strong>
                      RSI 14 khung 4H tạo phân kỳ ẩn tăng giá, giá duy trì trên dải EMA 50/200, dòng tiền Chaikin CMF dương +0.28, chỉ số Fear &amp; Greed 72.
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => onOpenQuickGuide('ai-analysis')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer"
                    >
                      {tContent('product.readGuide')}
                    </button>
                  </div>
                </div>
              )}

              {/* Module 2: Indicator IDE Mockup */}
              {activeModuleId === 'indicator-ide' && (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span>AI Prompt-to-Pine Script IDE v5</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      Instant Compilation
                    </span>
                  </div>

                  {/* Prompt Input Box */}
                  <div className="mb-3">
                    <label className="text-[11px] font-semibold text-slate-300 mb-1.5 block">
                      {tContent('product.promptLabel')}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder="VD: Tạo chỉ báo SuperTrend kết hợp RSI phân kỳ..."
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                      <button
                        onClick={handleGeneratePineScript}
                        disabled={isGeneratingCode}
                        className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{isGeneratingCode ? tContent('product.writing') : tContent('product.generate')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Editor Mockup */}
                  <div className="bg-[#05080f] rounded-lg border border-slate-800/90 p-3 font-mono text-[11px] text-slate-300 h-60 overflow-y-auto relative">
                    <div className="text-slate-500 select-none pb-2 text-[10px] flex items-center justify-between border-b border-slate-800/80 mb-2">
                      <span>script_strategy_bamboozer.pine</span>
                      <span className="text-emerald-400">Syntax OK • Compiled</span>
                    </div>
                    <pre className="text-emerald-400/90 leading-relaxed whitespace-pre-wrap">
                      {generatedCode}
                    </pre>
                  </div>
                </div>
              )}

              {/* Module 3: Trading Bot & Grid Bots Mockup */}
              {activeModuleId === 'trading-bots' && (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                      <Bot className="w-4 h-4 text-amber-400" />
                      <span>{tContent('product.gridConfig')}</span>
                    </div>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {tContent('product.fourArchitectures')}
                    </span>
                  </div>

                  {/* 4 Bot Architecture Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {BOT_ARCHITECTURES.map((b) => (
                      <div key={b.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-400 truncate">{b.name}</div>
                        <div className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded mt-1 inline-block ${b.riskColor}`}>
                          {b.riskLevel}
                        </div>
                        <div className="text-xs font-mono font-bold text-emerald-400 mt-1">
                          {b.backtestedReturn}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Grid Range Visualizer */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-3">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-bold text-white">{tContent('product.gridBounds')}</span>
                      <span className="text-emerald-400 font-mono text-[11px]">
                        {tContent('product.estimatedProfit')}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{tContent('product.upper')}</span>
                        <span className="text-rose-400 font-bold">${gridUpper.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{tContent('product.lower')}</span>
                        <span className="text-emerald-400 font-bold">${gridLower.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{t('gridCount')}</span>
                        <span className="text-cyan-400 font-bold">{gridCount} Lưới</span>
                      </div>
                    </div>

                    {/* Simulated visual grid levels */}
                    <div className="mt-3 h-14 bg-slate-950 rounded-lg border border-slate-800 flex flex-col justify-between p-1.5 overflow-hidden">
                      <div className="h-0.5 bg-rose-500/50 w-full" />
                      <div className="h-0.5 bg-slate-700 w-full" />
                      <div className="h-0.5 bg-emerald-500 w-full animate-pulse" />
                      <div className="h-0.5 bg-slate-700 w-full" />
                      <div className="h-0.5 bg-emerald-500/50 w-full" />
                    </div>
                  </div>
                </div>
              )}

              {/* Module 4: Strategy & Live Dashboard Mockup */}
              {activeModuleId === 'strategy-live' && (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                      <BarChart2 className="w-4 h-4 text-emerald-400" />
                      <span>{t('liveDashboard')}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Non-Custodial Sync
                    </span>
                  </div>

                  {/* 4 Quant Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Total Equity</div>
                      <div className="text-lg font-mono font-bold text-white mt-0.5">$248,520</div>
                      <div className="text-[10px] text-emerald-400 font-mono">{t('monthlyGain')}</div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Win Rate %</div>
                      <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">88.4%</div>
                      <div className="text-[10px] text-slate-400 font-mono">{t('winningTrades')}</div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Profit Factor</div>
                      <div className="text-lg font-mono font-bold text-cyan-400 mt-0.5">2.45</div>
                      <div className="text-[10px] text-slate-400 font-mono">{t('quantStandard')}</div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Max Drawdown</div>
                      <div className="text-lg font-mono font-bold text-teal-400 mt-0.5">-6.2%</div>
                      <div className="text-[10px] text-emerald-400 font-mono">{t('highRiskControl')}</div>
                    </div>
                  </div>

                  {/* Simulated PnL Calendar Heatmap */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-slate-300">{t('pnlCalendar')}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{t('pnlSummary')}</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-[10px]">
                      {['+$840', '+$1,210', '+$950', '- $180', '+$1,450', '+$620', '+$2,100', '+$1,120', '+$890', '+$740', '+$1,680', '+$920', '+$1,340', '+$2,410'].map((pnl, i) => {
                        const isPos = !pnl.includes('-');
                        return (
                          <div
                            key={i}
                            className={`p-1.5 rounded border ${
                              isPos
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            }`}
                          >
                            <div>D{i + 1}</div>
                            <div className="font-bold">{pnl}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Module 5: Trading Terminal & Market Signal Center Mockup */}
              {activeModuleId === 'trading-terminal' && (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span>Market Signal Radar (Scores 0 - 100)</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      WebSocket Scan 15ms
                    </span>
                  </div>

                  <div className="space-y-2">
                    {LIVE_MARKET_SIGNALS.slice(0, 4).map((sig) => (
                      <div
                        key={sig.symbol}
                        className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                              sig.signal === 'LONG'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : sig.signal === 'SHORT'
                                ? 'bg-rose-500/20 text-rose-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {sig.signal === 'LONG' ? 'L' : sig.signal === 'SHORT' ? 'S' : 'H'}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                              <span>{sig.symbol}</span>
                              <span className="text-[10px] text-slate-400 font-normal">({sig.timeframe})</span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              Giá: ${sig.triggerPrice.toLocaleString()} • Vol: {sig.volume24h}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xs font-mono font-bold text-emerald-400">
                              Score: {sig.score}/100
                            </div>
                            <div className="text-[10px] text-slate-400">{sig.timestamp}</div>
                          </div>
                          <button
                            onClick={onOpenRegister}
                            className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                          >
                            Trade
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module 6: Exchange Accounts Mockup */}
              {activeModuleId === 'exchange-accounts' && (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                      <Key className="w-4 h-4 text-emerald-400" />
                      <span>{tContent('product.exchangeConnect')}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {tContent('product.encryption')}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 mb-1 block">
                        {tContent('product.chooseExchange')}
                      </label>
                      <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">
                        <option>Binance (Official Partner API v3)</option>
                        <option>OKX (Unified Account API)</option>
                        <option>Bybit (Unified Margin API)</option>
                        <option>Coinbase Advanced Trade</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 mb-1 block">
                        {tContent('product.apiKey')}
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="vmP8a8z0K*********************************"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-400"
                      />
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2 text-xs text-emerald-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">{tContent('product.securityVerify')}</strong>
                        {tContent('product.withdrawDisabled')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
