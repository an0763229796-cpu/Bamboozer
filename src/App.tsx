import React, { useState, useEffect } from 'react';
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
import { CampaignsHubView } from './components/campaigns/CampaignsHubView';
import { SprintChallengeView } from './components/challenge/SprintChallengeView';
import { TanStackLiveLeaderboard } from './components/challenge/TanStackLiveLeaderboard';
import { ActiveCampaignModal } from './components/campaigns/ActiveCampaignModal';
import { Sparkles, Coins, Check, Gift, Mail, X, Flame } from 'lucide-react';
import { useLanguage } from './i18n';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const BAMBOOZER_REGISTER_URL = 'https://www.bamboozer.com/register?ref=81';

export default function App() {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<'landing' | 'campaigns' | 'sprint_challenge'>('landing');
  const [userCredits, setUserCredits] = useState<number>(100);
  const [quickGuideModuleId, setQuickGuideModuleId] = useState<string | null>(null);
  const [isReferralOpen, setIsReferralOpen] = useState<boolean>(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [showTopBanner, setShowTopBanner] = useState<boolean>(true);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Automatically trigger campaign popup when visitor enters the page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCampaignModalOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

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

  // Dedicated full-page view for Campaigns directory
  if (currentView === 'campaigns') {
    return (
      <div className="min-h-screen bg-[#080c14] text-slate-100">
        <CampaignsHubView
          onSelectSprintChallenge={() => setCurrentView('sprint_challenge')}
          onOpenRegisterModal={handleOpenRegister}
          onOpenActiveEventPopup={() => setIsCampaignModalOpen(true)}
          onBackToLanding={() => setCurrentView('landing')}
        />
        <Analytics />
        <SpeedInsights />
      </div>
    );
  }

  // Dedicated full-page view for Sprint Challenge & Leaderboard
  if (currentView === 'sprint_challenge') {
    return (
      <div className="min-h-screen bg-[#080c14] text-slate-100">
        <SprintChallengeView
          onBackToHub={() => setCurrentView('campaigns')}
          onOpenRegister={handleOpenRegister}
          onBackToLanding={() => setCurrentView('landing')}
        />
        <Analytics />
        <SpeedInsights />
      </div>
    );
  }

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
        {/* Dismissable Campaign & Event Top Bar Notice */}
        {showTopBanner && (
          <div className="bg-gradient-to-r from-emerald-950 via-[#071d1b] to-cyan-950 border-b border-emerald-500/20 py-1.5 px-4 text-center text-[11px] sm:text-xs text-slate-300 relative">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 pr-7">
              <span className="inline-flex items-center gap-1 text-amber-400 font-bold whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse shrink-0" />
                <span>CHIẾN DỊCH HOT:</span>
              </span>
              <span className="text-slate-200 truncate">
                Giải đấu Trading Sprint Mùa 04 ($1,140 USDT) đang diễn ra! Mã bảo trợ <strong className="text-emerald-400 font-mono">ref=81</strong>
              </span>
              <button
                onClick={() => setIsCampaignModalOpen(true)}
                className="text-cyan-300 hover:text-cyan-200 font-bold underline ml-1 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-0.5"
              >
                <span>Xem chi tiết</span>
                <span>→</span>
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
          onOpenCampaigns={() => setCurrentView('campaigns')}
          onOpenSprintChallenge={() => setCurrentView('sprint_challenge')}
          onOpenCampaignModal={() => setIsCampaignModalOpen(true)}
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

        {/* Real-time Live Leaderboard & Tournament Standing */}
        <section id="leaderboard" className="py-16 md:py-24 border-y border-slate-800/80 bg-[#070b12]/90 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>GIẢI ĐẤU MÙA 04 • BẢNG XẾP HẠNG THỜI GIAN THỰC</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Bảng Xếp Hạng &amp; Vị Thế Trực Tiếp
                </h2>
                <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                  Theo dõi thứ hạng, tỷ lệ ROI và PnL tài khoản của bạn được cập nhật trực tiếp theo thời gian thực qua luồng WebSocket tốc độ cao.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('sprint_challenge')}
                  className="px-4 py-2 rounded-xl bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Xem Chi Tiết Mùa 04 ($1,140)</span>
                  <span>→</span>
                </button>
              </div>
            </div>
            <TanStackLiveLeaderboard onOpenRegister={handleOpenRegister} />
          </div>
        </section>

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

      {/* Active Campaign Automatic Popup Modal */}
      <ActiveCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        onViewChallenge={() => {
          setIsCampaignModalOpen(false);
          setCurrentView('sprint_challenge');
        }}
        onOpenRegister={handleOpenRegister}
        onViewAllCampaigns={() => {
          setIsCampaignModalOpen(false);
          setCurrentView('campaigns');
        }}
      />
      <Analytics />
      <SpeedInsights />
      </div>
    </div>
  );
}
