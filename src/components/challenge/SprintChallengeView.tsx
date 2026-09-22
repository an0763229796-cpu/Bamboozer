import React, { useState } from 'react';
import { Participant } from '../../types';
import { RunningPriceTicker } from './RunningPriceTicker';
import { BloombergHero } from './BloombergHero';
import { InstitutionalTerminal } from './InstitutionalTerminal';
import { PrizePoolSection } from './PrizePoolSection';
import { TanStackLiveLeaderboard } from './TanStackLiveLeaderboard';
import { TradingPerformanceSection } from './TradingPerformanceSection';
import { HowToParticipateSection } from './HowToParticipateSection';
import { EducationCommunity } from './EducationCommunity';
import { RulesAndFaqSection } from './RulesAndFaqSection';
import { FinalCtaSection } from './FinalCtaSection';
import { TraderDetailModal } from './TraderDetailModal';
import { ArrowLeft, Trophy, Sparkles } from 'lucide-react';

interface SprintChallengeViewProps {
  onBackToHub: () => void;
  onOpenRegister: () => void;
  onBackToLanding?: () => void;
}

export const SprintChallengeView: React.FC<SprintChallengeViewProps> = ({
  onBackToHub,
  onOpenRegister,
  onBackToLanding,
}) => {
  const [selectedTrader, setSelectedTrader] = useState<Participant | null>(null);

  const scrollToLeaderboard = () => {
    const el = document.getElementById('leaderboard-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#070b12] text-white min-h-screen">
      {/* Top Hub Navigation Bar */}
      <div className="bg-[#0c121e] border-b border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer transition-colors bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-xs"
              >
                <span>Trang Chủ</span>
              </button>
            )}
            <button
              onClick={onBackToHub}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Chiến Dịch</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">MÙA 04 ĐANG LIVE</span>
          </div>
        </div>
      </div>

      {/* Live Running Price Ticker */}
      <RunningPriceTicker />

      {/* Bloomberg Terminal Hero */}
      <BloombergHero
        onJoinClick={onOpenRegister}
        onViewLeaderboard={scrollToLeaderboard}
      />

      {/* Institutional 24H Metrics Terminal */}
      <InstitutionalTerminal />

      {/* Prize Pool Breakdown ($1,140 USDT) */}
      <PrizePoolSection onJoinClick={onOpenRegister} />

      {/* Live TanStack Leaderboard Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#070b12] border-b border-slate-800" id="leaderboard-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>LIVE SCORING ARBITRAGE // BẢNG XẾP HẠNG THỜI GIAN THỰC</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bảng Xếp Hạng Thí Sinh Mùa 04
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Dữ liệu được cập nhật tự động từ kết nối sàn. Thí sinh vi phạm Max Drawdown &gt; 10% sẽ bị đánh dấu loại. Nhấp vào "Xem lệnh" để kiểm tra lịch sử chi tiết.
            </p>
          </div>

          <TanStackLiveLeaderboard onSelectTrader={(t) => setSelectedTrader(t)} />
        </div>
      </section>

      {/* Recharts Equity Curves Section */}
      <TradingPerformanceSection />

      {/* 5-Step How to Participate */}
      <HowToParticipateSection onJoinClick={onOpenRegister} />

      {/* Education & Alpha Community */}
      <EducationCommunity />

      {/* Competition Rules & FAQ */}
      <RulesAndFaqSection />

      {/* Bottom Final CTA */}
      <FinalCtaSection onJoinClick={onOpenRegister} />

      {/* Bottom return to hub footer */}
      <div className="bg-[#05080e] py-8 text-center border-t border-slate-800">
        <button
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Khám phá thêm các Chiến dịch &amp; AI Bot League khác</span>
        </button>
      </div>

      {/* Modal Profile of selected trader */}
      <TraderDetailModal
        trader={selectedTrader}
        onClose={() => setSelectedTrader(null)}
      />
    </div>
  );
};
