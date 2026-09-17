import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValuePillars } from './components/ValuePillars';
import { AudienceSection } from './components/AudienceSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { ProductModules } from './components/ProductModules';
import { OnboardingSteps } from './components/OnboardingSteps';
import { VideoTutorialCenter } from './components/VideoTutorialCenter';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FintechTickerTape } from './components/FintechTickerTape';
import { BlockchainSecurityVisualizer } from './components/BlockchainSecurityVisualizer';
import { QuickGuideDrawer } from './components/QuickGuideDrawer';
import { ReferralModal } from './components/ReferralModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { ContactModal } from './components/ContactModal';
import { ThreeQuantFabric } from './components/ThreeQuantFabric';
import { Sparkles, Coins, Check, Gift, Mail, X } from 'lucide-react';
import { useLanguage } from './i18n';

export const BAMBOOZER_REGISTER_URL = 'https://www.bamboozer.com/register?ref=81';

export default function App() {
  const { t } = useLanguage();
  const [userCredits, setUserCredits] = useState<number>(100);
  const [quickGuideModuleId, setQuickGuideModuleId] = useState<string | null>(null);
  const [isReferralOpen, setIsReferralOpen] = useState<boolean>(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [showTopBanner, setShowTopBanner] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Direct redirection to official Bamboozer registration page with referral code
  const handleOpenRegister = () => {
    try {
      const opened = window.open(BAMBOOZER_REGISTER_URL, '_blank', 'noopener,noreferrer');
      if (!opened) {
        window.location.href = BAMBOOZER_REGISTER_URL;
      }
    } catch {
      window.location.href = BAMBOOZER_REGISTER_URL;
    }
  };

  const handleReferralBonusClaim = () => {
    setUserCredits((prev) => prev + 100);
    triggerToast('🎁 Đã kích hoạt mã giới thiệu: Nhận thêm +100 Credits thưởng!');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <ThreeQuantFabric className="fixed inset-0" />
      <div className="relative z-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e1726] border border-emerald-500/40 text-white px-4 py-3 rounded-xl shadow-2xl shadow-emerald-500/20 flex items-center gap-3 animate-fade-in">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Coins className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Unified Sticky Header */}
      <header className="sticky top-0 z-50">
        {/* Dismissable Referral Top Bar Notice */}
        {showTopBanner && (
          <div className="bg-gradient-to-r from-emerald-950 via-[#071d1b] to-cyan-950 border-b border-emerald-500/20 py-1.5 px-4 text-center text-[11px] sm:text-xs text-slate-300 relative">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 pr-7">
              <span className="inline-flex items-center gap-1 text-cyan-400 font-bold whitespace-nowrap">
                <Gift className="w-3.5 h-3.5 shrink-0" />
                <span>{t('referralBanner')}</span>
              </span>
              <span className="text-slate-300 truncate">{t('referralBannerText')}</span>
              <button
                onClick={() => setIsReferralOpen(true)}
                className="text-cyan-300 hover:text-cyan-200 font-bold underline ml-1 cursor-pointer whitespace-nowrap shrink-0"
              >
                {t('getLink')}
              </button>
            </div>
            <button
              onClick={() => setShowTopBanner(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              title="Đóng thông báo"
              aria-label="Đóng"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Navbar */}
        <Navbar
          onOpenRegister={handleOpenRegister}
          onOpenReferral={() => setIsReferralOpen(true)}
          onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          userCredits={userCredits}
        />
      </header>

      <main>
        {/* Realtime Live Ticker & Institutional Telemetry */}
        <FintechTickerTape />

        {/* 1. Hero Section */}
        <HeroSection
          onOpenRegister={handleOpenRegister}
          onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
          onOpenQuickGuide={(id) => setQuickGuideModuleId(id)}
        />

        {/* 2. Target Audience Segmentation */}
        <AudienceSection onOpenRegister={handleOpenRegister} />

        {/* 3. 3 Core Value Pillars */}
        <ValuePillars onOpenRegister={handleOpenRegister} />

        {/* 4. Cryptographic Blockchain & Non-Custodial Architecture Proof */}
        <BlockchainSecurityVisualizer onOpenRegister={handleOpenRegister} />

        {/* 5. Supported Integrations (Crypto & Brokers) */}
        <IntegrationsSection onOpenQuickGuide={(id) => setQuickGuideModuleId(id)} />

        {/* 5. 6 Product Modules Showcase & Interactive Demos */}
        <ProductModules
          onOpenQuickGuide={(id) => setQuickGuideModuleId(id)}
          onOpenRegister={handleOpenRegister}
        />

        {/* 6. Step-by-Step Onboarding */}
        <OnboardingSteps onOpenRegister={handleOpenRegister} />

        {/* 7. Video Tutorial Center */}
        <VideoTutorialCenter
          onOpenRegister={handleOpenRegister}
          onOpenQuickGuide={(id) => setQuickGuideModuleId(id)}
        />

        {/* 8. Pricing & Credit System */}
        <PricingSection onOpenRegister={handleOpenRegister} />

        {/* 9. FAQ Section */}
        <FaqSection onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenRegister={handleOpenRegister}
        onOpenReferral={() => setIsReferralOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Drawers and Modals */}
      <QuickGuideDrawer
        isOpen={!!quickGuideModuleId}
        moduleId={quickGuideModuleId}
        onClose={() => setQuickGuideModuleId(null)}
        onOpenRegister={() => {
          setQuickGuideModuleId(null);
          handleOpenRegister();
        }}
      />

      <ReferralModal
        isOpen={isReferralOpen}
        onClose={() => setIsReferralOpen(false)}
        onClaimBonus={handleReferralBonusClaim}
      />

      <DemoVideoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        onOpenRegister={() => {
          setIsVideoDemoOpen(false);
          handleOpenRegister();
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        targetEmail="an0763229796@gmail.com"
      />
      </div>
      <Analytics />
    </div>
  );
}
