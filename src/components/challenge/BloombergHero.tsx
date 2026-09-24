import React from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Timer, ArrowRight, ShieldCheck, Flame, ExternalLink, Activity, Sparkles, Terminal } from 'lucide-react';
import { trackAndOpenAffiliate } from '../../services/telemetryDb';
import { CURRENT_SEASON } from '../../data/mockData';
import { useSeasonCountdown } from '../../utils/seasonCountdown';
import { useCampaignI18n } from '../../i18n/campaignI18n';

interface BloombergHeroProps {
  onJoinClick: () => void;
  onViewLeaderboard: () => void;
}

export const BloombergHero: React.FC<BloombergHeroProps> = ({ onJoinClick, onViewLeaderboard }) => {
  const { t, language } = useCampaignI18n();
  const isEn = language === 'en';
  // Live dynamic countdown to October 10 at 00:00
  const countdown = useSeasonCountdown();

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00C076', '#10B981', '#06B6D4', '#F59E0B'],
    });
  };

  return (
    <div className="relative bg-[#070b12] text-white border-b border-slate-800 pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Terminal grid ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#00C07615,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Terminal Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#00C076]">
            <Terminal className="w-4 h-4" />
            <span className="font-bold tracking-wider">
              {isEn ? 'BAMBOOZER QUANT TERMINAL // SEASON 01' : 'BAMBOOZER QUANT TERMINAL // SEASON 01'}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#00C076]/20 text-[#00C076] font-bold text-[10px] animate-pulse">
              LIVE CHALLENGE
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />{' '}
              {isEn ? '68 Traders Online' : '68 Thí sinh trực tuyến'}
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-400">
              {isEn ? 'Tournament:' : 'Mùa giải chính thức:'}{' '}
              <span className="text-emerald-400 font-bold font-mono">Season 01</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Challenge Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{isEn ? 'INDICATOR & STRATEGY 14-DAY TRADING COMPETITION' : 'CUỘC THI GIAO DỊCH 14 NGÀY • INDICATOR & STRATEGY'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Bamboozer 14-Day{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C076] via-teal-300 to-cyan-400">
                Trading Challenge
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {isEn
                ? 'A 14-day live trading competition for traders applying custom or built-in Indicators and Strategies to Live Trading. Winners are evaluated on Net Profit combined with strict Risk Management discipline.'
                : 'Tổ chức cuộc thi giao dịch trong 14 ngày dành cho Trader. Người tham gia tự xây dựng hoặc sử dụng Indicator, Strategy và áp dụng vào Live Trading. Người chiến thắng được đánh giá dựa trên lợi nhuận ròng kết hợp với mức độ tuân thủ quy định quản lý rủi ro.'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-mono">{t.totalPrizePool}</div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#00C076] mt-0.5">
                  $700
                </div>
                <div className="text-[10px] text-slate-500">
                  {isEn ? 'Cash + Pro VIP' : 'Tiền mặt + Gói Pro'}
                </div>
              </div>

              <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-mono">{isEn ? 'MAX DRAWDOWN' : 'GIỚI HẠN DRAWDOWN'}</div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400 mt-0.5">
                  ≤ 10.0%
                </div>
                <div className="text-[10px] text-slate-500">
                  {isEn ? 'Capital Protection' : 'Chống cháy tài khoản'}
                </div>
              </div>

              <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-mono">{isEn ? 'ENTRY FEE' : 'LỆ PHÍ THAM GIA'}</div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-cyan-400 mt-0.5">
                  {isEn ? 'FREE' : 'MIỄN PHÍ'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isEn ? '100% Free Entry' : 'Miễn phí tham gia'}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => {
                  triggerConfetti();
                  onJoinClick();
                }}
                className="px-7 py-3.5 rounded-xl font-mono font-bold text-sm text-black bg-[#00C076] hover:bg-[#00d684] shadow-xl shadow-[#00C076]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                <span>{isEn ? 'REGISTER & JOIN SPRINT' : 'THAM GIA GIẢI ĐẤU NGAY'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewLeaderboard}
                className="px-6 py-3.5 rounded-xl font-mono font-semibold text-sm text-slate-200 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isEn ? 'VIEW LIVE LEADERBOARD' : 'XEM BẢNG XẾP HẠNG LIVE'}</span>
              </button>

              <button
                onClick={() => trackAndOpenAffiliate('BloombergHero_DirectRef')}
                className="px-4 py-3.5 rounded-xl text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Mở sàn liên kết"
              >
                <span>{isEn ? 'Open Exchange' : 'Mở sàn liên kết'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Countdown Box & Prize Spotlight */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b101c] border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
              {/* Corner decorative accent */}
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="flex h-4 w-4 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C076] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00C076]"></span>
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Timer className="w-4 h-4 text-amber-400" />
                  <span>
                    {isEn
                      ? (countdown.isStarted && !countdown.isEnded ? t.countdownLiveTitle : t.countdownLaunchTitle)
                      : countdown.headerTitle}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  {isEn
                    ? (countdown.isStarted && !countdown.isEnded ? t.countdownLiveBadge : t.countdownLaunchBadge)
                    : countdown.badgeLabel}
                </span>
              </div>

              {/* 4 Block Countdown */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: t.days, val: countdown.days },
                  { label: t.hours, val: countdown.hours },
                  { label: t.mins, val: countdown.minutes },
                  { label: t.secs, val: countdown.seconds },
                ].map((item, i) => (
                  <div key={i} className="bg-[#05080e] border border-slate-800/90 rounded-xl p-3 text-center">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                      {item.val.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1 font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Event Start Date Highlight Notice */}
              <div className="mb-4 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEn ? 'Tournament Launch:' : 'Khai mạc sự kiện:'}</span>
                </span>
                <span className="text-emerald-400 font-bold">10/10/2026 • 00:00:00</span>
              </div>

              {/* Top 1 Champion Prize Card */}
              <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-[#0c121e] border border-amber-500/40 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300">{t.top1RewardTitle}</div>
                      <div className="text-lg font-mono font-black text-white">{t.top1RewardValue}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-amber-400 font-bold">
                    {t.top1RewardBreakdown}
                  </div>
                </div>
              </div>

              {/* Security & Rule Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isEn
                    ? '100% transparent system, real-time order auditing via non-custodial partner API.'
                    : 'Hệ thống minh bạch 100%, kiểm tra lệnh trực tiếp qua API đối tác không lưu ký.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
