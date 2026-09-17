import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Check, 
  X, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight,
  Cpu,
  LineChart,
  Bot,
  Terminal,
  FileCode2,
  CheckCircle2,
  Lock,
  Unlock,
  KeyRound
} from 'lucide-react';
import { API_PERMISSIONS_COMPARISON } from '../data/content';
import { useLanguage } from '../i18n';

export const ValuePillars: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const { t, tContent } = useLanguage();
  const [activeTab, setActiveTab] = useState<'non-custodial' | 'white-box' | 'lifecycle'>('non-custodial');

  return (
    <section className="py-20 md:py-28 relative bg-[#090d15] border-t border-slate-800/80" id="pillars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('pillarsBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('pillarsTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('pillarsDescription')}
          </p>

          {/* Tab navigation between 3 pillars */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 max-w-xl mx-auto">
            <button
              onClick={() => setActiveTab('non-custodial')}
              className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'non-custodial'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>1. {t('nonCustodial')}</span>
            </button>
            <button
              onClick={() => setActiveTab('white-box')}
              className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'white-box'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>2. {t('pillar2Name')}</span>
            </button>
            <button
              onClick={() => setActiveTab('lifecycle')}
              className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'lifecycle'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3. {t('livePnl')}</span>
            </button>
          </div>
        </div>

        {/* Pillar 1: Non-Custodial by Design */}
        {activeTab === 'non-custodial' && (
          <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                  {t('pillar01')}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Non-Custodial by Design <br />
                  <span className="text-emerald-400">{t('pillar1Title')}</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {t('pillar1Description')}
                </p>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">{t('assetOnExchange')}</strong>
                      {tContent('pillar.assetSafety', 'Hưởng trọn bảo hiểm quỹ SAFU của Binance và bảo mật 2FA cá nhân.')}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">{t('revokeAccess')}</strong>
                      {tContent('pillar.revoke', 'Người dùng có thể xóa hoặc vô hiệu hóa API Key trên app sàn bất kỳ lúc nào.')}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-rose-300 block mb-0.5">{t('rejectWithdraw')}</strong>
                      {tContent('pillar.reject', 'Hệ thống tự động từ chối và cảnh báo nếu phát hiện API bật quyền Withdrawals.')}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={onOpenRegister}
                    className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t('safeExperience')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Interactive API Permission Matrix */}
              <div className="lg:col-span-7 bg-[#080c14] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      {t('apiPermissions')}
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {t('financialSecurity')}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {API_PERMISSIONS_COMPARISON.map((perm, idx) => {
                    const isAllowed = perm.status === 'allowed';
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                          isAllowed
                            ? 'bg-slate-900/50 border-slate-800 hover:border-emerald-500/30'
                            : 'bg-rose-950/20 border-rose-800/40 hover:border-rose-600/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                              isAllowed
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400 font-bold'
                            }`}
                          >
                            {isAllowed ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-snug">
                              {tContent(`permission.${idx}.action`, perm.action)}
                            </div>
                            <div
                              className={`text-[11px] mt-0.5 ${
                                isAllowed ? 'text-slate-400' : 'text-rose-400 font-semibold'
                              }`}
                            >
                              {tContent(`permission.${idx}.note`, perm.note)}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] uppercase font-mono font-bold px-2 py-1 rounded shrink-0 ${
                            isAllowed
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {isAllowed ? t('allowed') : t('forbidden')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-200/90 leading-snug">
                    <strong>{t('goldenRule')}</strong> {tContent('pillar.goldenRule', 'Bạn không bao giờ phải cung cấp quyền rút tiền cho bất kỳ dịch vụ bên thứ ba nào. Khi tạo API Key, hãy luôn bỏ chọn “Enable Withdrawals”.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 2: White-Box Explainable AI */}
        {activeTab === 'white-box' && (
          <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
                  {t('pillar02')}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  White-Box Explainable AI <br />
                  <span className="text-cyan-400">{t('pillar2Name')}</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {t('pillar2Description')}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 mb-1">{t('technicalIndicators')}</div>
                    <div className="text-xs font-bold text-white">RSI, MACD, ATR, Bollinger Bands</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 mb-1">{t('macroData')}</div>
                    <div className="text-xs font-bold text-white">Fear & Greed, DXY, VIX, NFP</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 mb-1">{t('trendConsensus')}</div>
                    <div className="text-xs font-bold text-white">Multi-Timeframe 15m/1h/4h/1D</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 mb-1">{t('riskManagement')}</div>
                    <div className="text-xs font-bold text-white">{t('mathematicalAtr')}</div>
                  </div>
                </div>

                <button
                  onClick={onOpenRegister}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('discoverWhiteBox')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Comparison: Black Box vs Bamboozer White Box */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Black Box bot */}
                <div className="bg-slate-950/60 border border-rose-900/30 rounded-xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-rose-900/20 mb-3">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                      <X className="w-4 h-4" />
                      <span>{t('traditionalBlackBox')}</span>
                    </div>
                    <span className="text-[10px] text-rose-400/80 bg-rose-500/10 px-2 py-0.5 rounded">
                      {t('highRisk')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-4">
                    {tContent('whitebox.blackDescription', 'Unexplained buy/sell signals with limited user control.')}
                  </p>

                  <div className="space-y-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-2 text-rose-300/80">
                      <X className="w-3.5 h-3.5 shrink-0" /> {tContent('whitebox.black.0')}
                    </div>
                    <div className="flex items-center gap-2 text-rose-300/80">
                      <X className="w-3.5 h-3.5 shrink-0" /> {tContent('whitebox.black.1')}
                    </div>
                    <div className="flex items-center gap-2 text-rose-300/80">
                      <X className="w-3.5 h-3.5 shrink-0" /> {tContent('whitebox.black.2')}
                    </div>
                  </div>
                </div>

                {/* Bamboozer White Box */}
                <div className="bg-gradient-to-b from-[#111c2e] to-[#0c1422] border border-emerald-500/40 rounded-xl p-5 shadow-lg shadow-emerald-500/5 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>Bamboozer White-Box AI</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">
                      {t('transparent100')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4">
                    {tContent('whitebox.greenDescription')}
                  </p>

                  <div className="space-y-2 text-[11px] text-slate-300">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {tContent('whitebox.green.0')}
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {tContent('whitebox.green.1')}
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {tContent('whitebox.green.2')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 3: All-in-One Trading Lifecycle */}
        {activeTab === 'lifecycle' && (
          <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 transition-all">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
                {t('pillar03')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                All-in-One Trading Lifecycle
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                {t('pillar3Description')}
              </p>
            </div>

            {/* 5-Step Lifecycle Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
              <div className="bg-[#090d15] border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 font-mono font-bold text-xs">
                    01
                  </div>
                  <div className="text-xs font-bold text-white mb-1">
                    {t('analyzeAi')}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {tContent('life.1.description')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <LineChart className="w-3 h-3" />
                  <span>AI Asset Analysis</span>
                </div>
              </div>

              <div className="bg-[#090d15] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 font-mono font-bold text-xs">
                    02
                  </div>
                  <div className="text-xs font-bold text-white mb-1">
                    {t('generateIndicator')}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {tContent('life.2.description')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                  <FileCode2 className="w-3 h-3" />
                  <span>Indicator IDE</span>
                </div>
              </div>

              <div className="bg-[#090d15] border border-slate-800 hover:border-teal-500/40 rounded-xl p-4 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 font-mono font-bold text-xs">
                    03
                  </div>
                  <div className="text-xs font-bold text-white mb-1">
                    {t('backtest')}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {tContent('life.3.description')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-teal-400 font-semibold flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  <span>Backtest Engine</span>
                </div>
              </div>

              <div className="bg-[#090d15] border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 font-mono font-bold text-xs">
                    04
                  </div>
                  <div className="text-xs font-bold text-white mb-1">
                    {t('runBot')}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {tContent('life.4.description')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  <span>Automated Bots</span>
                </div>
              </div>

              <div className="bg-[#090d15] border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 font-mono font-bold text-xs">
                    05
                  </div>
                  <div className="text-xs font-bold text-white mb-1">
                    {t('livePnl')}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {tContent('life.5.description')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Terminal className="w-3 h-3" />
                  <span>Trading Terminal</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
