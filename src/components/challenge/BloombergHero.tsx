import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Timer, ArrowRight, ShieldCheck, Flame, ExternalLink, Activity, Sparkles, Terminal } from 'lucide-react';
import { trackAndOpenAffiliate } from '../../services/telemetryDb';
import { CURRENT_SEASON } from '../../data/mockData';

interface BloombergHeroProps {
  onJoinClick: () => void;
  onViewLeaderboard: () => void;
}

export const BloombergHero: React.FC<BloombergHeroProps> = ({ onJoinClick, onViewLeaderboard }) => {
  // Countdown to season end
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
            <span className="font-bold tracking-wider">BAMBOOZER QUANT TERMINAL // SEASON 04</span>
            <span className="px-2 py-0.5 rounded bg-[#00C076]/20 text-[#00C076] font-bold text-[10px] animate-pulse">
              LIVE CHALLENGE
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> 68 Thí sinh trực tuyến
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-400">Mã giới thiệu chính thức: <code className="text-emerald-400 font-bold">ref=81</code></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Challenge Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>GIẢI ĐẤU GIAO DỊCH ĐỊNH LƯỢNG 7 NGÀY CHÍNH THỨC</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Bamboozer 7-Day{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C076] via-teal-300 to-cyan-400">
                Trading Sprint
              </span>{' '}
              Challenge
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Tranh tài hiệu suất PnL & ROI đỉnh cao cùng hơn 50+ Quant Traders. Trải nghiệm hệ thống chấm điểm thời gian thực, kỷ luật quản trị rủi ro <strong className="text-white">Max Drawdown 10%</strong> và rinh thưởng <strong className="text-emerald-400">$1,140 USDT</strong>.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-mono">TỔNG GIẢI THƯỞNG</div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#00C076] mt-0.5">
                  ${CURRENT_SEASON.totalPrizeUsdt.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Tiền mặt + Pro 1 Năm</div>
              </div>

              <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-mono">GIỚI HẠN DRAWDOWN</div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400 mt-0.5">
                  ≤ 10.0%
                </div>
                <div className="text-[10px] text-slate-500">Chống cháy tài khoản</div>
              </div>

              <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-mono">LỆ PHÍ THAM GIA</div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-cyan-400 mt-0.5">
                  MIỄN PHÍ
                </div>
                <div className="text-[10px] text-slate-500">Nhập mã ref=81</div>
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
                <span>THAM GIA GIẢI ĐẤU NGAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewLeaderboard}
                className="px-6 py-3.5 rounded-xl font-mono font-semibold text-sm text-slate-200 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>XEM BẢNG XẾP HẠNG LIVE</span>
              </button>

              <button
                onClick={() => trackAndOpenAffiliate('BloombergHero_DirectRef')}
                className="px-4 py-3.5 rounded-xl text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Mở link đăng ký chính thức với mã ref=81"
              >
                <span>Đăng ký qua ref=81</span>
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
                  <span>THỜI GIAN CÒN LẠI CỦA MÙA 04</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                  COUNTDOWN
                </span>
              </div>

              {/* 4 Block Countdown */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[
                  { label: 'NGÀY', val: timeLeft.days },
                  { label: 'GIỜ', val: timeLeft.hours },
                  { label: 'PHÚT', val: timeLeft.minutes },
                  { label: 'GIÂY', val: timeLeft.seconds },
                ].map((item, i) => (
                  <div key={i} className="bg-[#05080e] border border-slate-800/90 rounded-xl p-3 text-center">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                      {item.val.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1 font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Top 1 Champion Prize Card */}
              <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-[#0c121e] border border-amber-500/40 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300">PHẦN THƯỞNG QUÁN QUÂN TOP 1</div>
                      <div className="text-lg font-mono font-black text-white">$580 USDT TỔNG GIÁ TRỊ</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-amber-400 font-bold">
                    $100 Tiền Mặt + 1 Năm Pro
                  </div>
                </div>
              </div>

              {/* Security & Rule Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hệ thống minh bạch 100%, kiểm tra lệnh trực tiếp qua API đối tác không lưu ký.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
