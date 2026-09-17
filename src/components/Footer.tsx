import React from 'react';
import { COMPANY_INFO } from '../data/content';
import { ShieldCheck, Mail, Globe, AlertOctagon, Heart } from 'lucide-react';
import { useLanguage } from '../i18n';
import bamboozerLogo from '../assets/images/bamboozer_logo_1789533475589.jpg';

export const Footer: React.FC<{ 
  onOpenRegister: () => void; 
  onOpenReferral: () => void;
  onOpenContact?: () => void;
}> = ({
  onOpenRegister,
  onOpenReferral,
  onOpenContact
}) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#060910] text-slate-400 border-t border-slate-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & Operating Entity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 bg-[#0d131f] shrink-0">
                <img
                  src={bamboozerLogo}
                  alt="Bamboozer Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Bamboozer AI Quant Trading
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed mb-4 max-w-sm">
              {t('companyDesc')}
            </p>

            <div className="space-y-1.5 text-[11px] text-slate-400">
              <p><strong className="text-slate-300">{t('operator')}</strong> {COMPANY_INFO.legalEntity}</p>
              <p><strong className="text-slate-300">{t('countryLabel')}</strong> {COMPANY_INFO.country}</p>
              <p><strong className="text-slate-300">{t('uenLabel')}</strong> {COMPANY_INFO.uen}</p>
              <p className="flex items-center gap-2 flex-wrap">
                <strong className="text-slate-300">{t('emailLabel')}</strong>
                <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="text-emerald-400 hover:underline">{COMPANY_INFO.supportEmail}</a>
                {onOpenContact && (
                  <button 
                    onClick={onOpenContact} 
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 cursor-pointer"
                  >
                    <Mail className="w-3 h-3" />
                    <span>{t('sendForm')}</span>
                  </button>
                )}
              </p>
            </div>
          </div>

          {/* Col 3: Product Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              {t('product')}
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#hero-section" className="hover:text-emerald-400 transition-colors">{t('footerProductAsset')}</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">{t('footerProductIndicator')}</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">{t('footerProductGrid')}</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">{t('footerProductMarketplace')}</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">{t('footerProductTerminal')}</a></li>
              <li><a href="#integrations" className="hover:text-emerald-400 transition-colors">{t('footerProductExchange')}</a></li>
            </ul>
          </div>

          {/* Col 4: Resources & Education */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              {t('resources')}
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#tutorials" className="hover:text-emerald-400 transition-colors">{t('footerResourceTutorials')}</a></li>
              <li><a href="#onboarding" className="hover:text-emerald-400 transition-colors">{t('footerResourceOnboarding')}</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">{t('footerResourcePricing')}</a></li>
              <li>
                <button onClick={onOpenReferral} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t('footerResourceReferral')}
                </button>
              </li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">{t('footerResourceFaq')}</a></li>
              {onOpenContact && (
                <li>
                  <button onClick={onOpenContact} className="text-cyan-300 hover:text-cyan-200 transition-colors text-left cursor-pointer flex items-center gap-1 font-medium">
                    <Mail className="w-3 h-3" />
                    <span>{t('footerResourceSupport')}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 5: Safety & Status */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              {t('safetyCommitment')}
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('footerSafetyNonCustodial')}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {t('footerSafetyNote')}
                </p>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-3 rounded-xl font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors text-center cursor-pointer"
              >
                {t('claimCredits')}
              </button>
            </div>
          </div>
        </div>

        {/* Risk Disclosure Box */}
        <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800/90 mb-10 text-[11px] leading-relaxed text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
            <AlertOctagon className="w-4 h-4 shrink-0" />
            <span>{t('riskDisclosure')}</span>
          </div>
          <p className="mb-2">
            {t('footerRiskP1')}
          </p>
          <p>
            {t('footerRiskP2')}
          </p>
        </div>

        {/* Copyright & Meta */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {t('footerCopyright')}
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-200">{t('terms')}</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200">{t('privacy')}</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200">{t('apiSecurity')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
