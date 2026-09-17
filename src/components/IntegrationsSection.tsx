import React from 'react';
import { CRYPTO_EXCHANGES, BROKERS_AND_PLATFORMS } from '../data/content';
import { ShieldCheck, CheckCircle2, Lock, ArrowUpRight, KeyRound } from 'lucide-react';
import { useLanguage } from '../i18n';
import bitfinexLogo from '../assets/images/Bitfinex.jpg';
import bitgetLogo from '../assets/images/bitget.jpg';
import bybitLogo from '../assets/images/bybit.webp';
import deepcoinLogo from '../assets/images/Gate.io.png';
import gateLogo from '../assets/images/Deepcoin.png';
import htxLogo from '../assets/images/HTX.jpg';
import krakenLogo from '../assets/images/Kraken-Logo.png';

const localExchangeLogos: Record<string, string> = {
  Bitget: bitgetLogo,
  Bybit: bybitLogo,
  Bitfinex: bitfinexLogo,
  Deepcoin: deepcoinLogo,
  'Gate.io': gateLogo,
  HTX: htxLogo,
  Kraken: krakenLogo,
};

export const IntegrationsSection: React.FC<{ onOpenQuickGuide: (id: string) => void }> = ({ onOpenQuickGuide }) => {
  const { t, tContent } = useLanguage();
  return (
    <section className="py-20 bg-[#0a0f19] border-t border-slate-800/80 relative overflow-hidden" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
            <KeyRound className="w-3.5 h-3.5" />
            <span>{t('integrationsBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('integrationsTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('integrationsDescription')}
          </p>
        </div>

        {/* Crypto Exchanges Grid / Slider */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {t('exchangesTitle')}
            </h3>
            <button
              onClick={() => onOpenQuickGuide('exchange-accounts')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{t('apiGuide')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CRYPTO_EXCHANGES.map((exch) => (
              <div
                key={exch.name}
                className="bg-[#0e1422] border border-slate-800/90 hover:border-emerald-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg bg-slate-950/80 border border-slate-700/80 flex items-center justify-center overflow-hidden">
                      <img
                        src={localExchangeLogos[exch.name] || exch.logoUrl}
                        alt={`${exch.name} logo`}
                        className="w-6 h-6 object-contain"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                          event.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <span className="hidden text-[10px] font-extrabold text-slate-200" aria-hidden="true">
                        {exch.logo}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      API v3
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {exch.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {exch.type}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{exch.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stocks & Forex Brokers Integration */}
        <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2 inline-block">
                Stocks &amp; Forex Connectivity
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
                {t('stocksForexTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {t('stocksForexDescription')}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t('marketRealtime')}
                </span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t('webhookLatency')}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BROKERS_AND_PLATFORMS.map((broker, index) => (
                <div key={broker.name} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-bold text-white mb-0.5">
                    {broker.name}
                  </div>
                  <div className="text-[11px] text-cyan-400 font-medium mb-1.5">
                    {tContent(`broker.${index}.category`, broker.category)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800/80">
                    {tContent(`broker.${index}.protocol`, broker.protocol)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Commitment Banner */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-cyan-950/40 border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">
                {t('apiSecurityCommitment')}
              </div>
              <p className="text-xs text-slate-300">
                {t('apiSecurityDescription')}
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenQuickGuide('exchange-accounts')}
            className="px-4 py-2 rounded-lg text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all shrink-0 cursor-pointer"
          >
            {t('twoStepConnection')}
          </button>
        </div>
      </div>
    </section>
  );
};
