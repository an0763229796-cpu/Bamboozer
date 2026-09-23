import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Clock,
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
  ShieldCheck,
  Users,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { CURRENT_SEASON } from '../../data/mockData';
import { trackAndOpenAffiliate } from '../../services/telemetryDb';
import { useSeasonCountdown } from '../../utils/seasonCountdown';

interface ActiveEventPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewSprintChallenge: () => void;
  onOpenRegisterModal: () => void;
}

export const ActiveEventPopupModal: React.FC<ActiveEventPopupModalProps> = ({
  isOpen,
  onClose,
  onViewSprintChallenge,
  onOpenRegisterModal,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const countdown = useSeasonCountdown();

  if (!isOpen) return null;

  const handleDismiss = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('bamboozer_active_event_popup_dismissed', 'true');
      } catch {
        // ignore storage errors
      }
    }
    onClose();
  };

  const handleJoinNow = () => {
    onOpenRegisterModal();
    handleDismiss();
  };

  const handleExploreLeaderboard = () => {
    onViewSprintChallenge();
    handleDismiss();
  };

  return (
    <div
      id="active-event-popup-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      <div
        id="active-event-popup-card"
        className="relative w-full max-w-2xl bg-[#0a0f1d] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden text-white font-mono flex flex-col max-h-[92vh] sm:max-h-[88vh]"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-500/10 blur-[100px] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-10 px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-800/80 bg-[#070b14]/90">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              CHIẾN DỊCH ĐANG DIỄN RA TRÊN HỆ THỐNG
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="w-8 h-8 rounded-full bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="relative z-10 p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Main Title Banner */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GIẢI ĐẤU TIÊU ĐIỂM: MÙA 04 (SEASON 04)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Bamboozer 7-Day Trading Sprint Challenge
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-sans leading-relaxed">
              Giải đấu định lượng cao điểm 7 ngày kiểm tra kỷ luật quản trị vốn và khả năng sinh lời. Cạnh tranh cùng 68+ traders toàn cầu với tổng quỹ thưởng <strong className="text-[#00C076] font-mono font-bold">$1,140 USDT</strong>.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="bg-[#05080e]/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                <Clock className="w-3.5 h-3.5" />
                {!countdown.isStarted ? 'ĐẾM NGƯỢC KHỞI TRANH (10/10 00:00)' : 'THỜI GIAN CÒN LẠI CỦA MÙA GIẢI'}
              </span>
              <span className="text-emerald-400 font-bold">10/10 → 17/10/2026</span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
              <div className="bg-[#0c121e] border border-slate-800/80 rounded-xl py-2.5 px-1">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  {String(countdown.days).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">NGÀY</div>
              </div>

              <div className="bg-[#0c121e] border border-slate-800/80 rounded-xl py-2.5 px-1">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {String(countdown.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">GIỜ</div>
              </div>

              <div className="bg-[#0c121e] border border-slate-800/80 rounded-xl py-2.5 px-1">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {String(countdown.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">PHÚT</div>
              </div>

              <div className="bg-[#0c121e] border border-slate-800/80 rounded-xl py-2.5 px-1">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                  {String(countdown.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">GIÂY</div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#0c121e] border border-slate-800/90 rounded-xl p-3">
              <div className="text-slate-400 text-[10px]">TỔNG GIẢI THƯỞNG</div>
              <div className="text-lg font-bold text-[#00C076] mt-0.5">$1,140 USDT</div>
              <div className="text-[10px] text-slate-500">Tiền mặt + Gói Pro VIP</div>
            </div>

            <div className="bg-[#0c121e] border border-slate-800/90 rounded-xl p-3">
              <div className="text-slate-400 text-[10px]">THÍ SINH ĐANG ĐẤU</div>
              <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-1">
                <Users className="w-4 h-4 text-cyan-400" />
                68 Thí sinh
              </div>
              <div className="text-[10px] text-slate-500">59 tài khoản hợp lệ</div>
            </div>

            <div className="bg-[#0c121e] border border-slate-800/90 rounded-xl p-3">
              <div className="text-slate-400 text-[10px]">ĐIỀU KIỆN THI ĐẤU</div>
              <div className="text-lg font-bold text-amber-400 mt-0.5">Max DD &le; 10%</div>
              <div className="text-[10px] text-slate-500">Miễn phí qua ref=81</div>
            </div>
          </div>

          {/* Prize breakdown quick list */}
          <div className="bg-[#0c121e]/60 border border-slate-800/70 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
              <span>CƠ CẤU GIẢI THƯỞNG HÀNG ĐẦU</span>
              <span className="text-emerald-400">Trả lời kết quả 27/09</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-[#070b14] p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-amber-400 font-bold">🥇 Quán Quân</div>
                <div className="text-white font-bold">$580 Giá Trị</div>
              </div>
              <div className="bg-[#070b14] p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-slate-300 font-bold">🥈 Á Quân</div>
                <div className="text-white font-bold">$290 Giá Trị</div>
              </div>
              <div className="bg-[#070b14] p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-amber-600 font-bold">🥉 Quý Quân</div>
                <div className="text-white font-bold">$135 Giá Trị</div>
              </div>
              <div className="bg-[#070b14] p-2 rounded-lg border border-slate-800 text-center">
                <div className="text-emerald-400 font-bold">🛡️ Risk Award</div>
                <div className="text-white font-bold">$135 Giá Trị</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="relative z-10 px-5 sm:px-7 py-4 bg-[#070b14] border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
            />
            <span>Không hiển thị lại trên trình duyệt này</span>
          </label>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExploreLeaderboard}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-mono text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Xem Bảng Xếp Hạng</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleJoinNow}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-[#00C076] hover:bg-[#00d684] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-[#00C076]/25"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>GHI DANH TRANH GIẢI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
