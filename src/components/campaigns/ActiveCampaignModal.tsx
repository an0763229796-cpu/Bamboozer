import React, { useEffect } from 'react';
import { 
  X, 
  Trophy, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Users, 
  Gift, 
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Award,
  Medal,
  ShieldCheck,
  Link as LinkIcon,
  Copy,
  Check
} from 'lucide-react';
import { BAMBOOZER_REGISTER_URL } from '../../App';
import { CURRENT_SEASON } from '../../data/mockData';
import { getAbsoluteCampaignUrl } from '../../utils/urlRouter';

interface ActiveCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewChallenge: () => void;
  onOpenRegister: () => void;
  onViewAllCampaigns?: () => void;
}

export const ActiveCampaignModal: React.FC<ActiveCampaignModalProps> = ({
  isOpen,
  onClose,
  onViewChallenge,
  onOpenRegister,
  onViewAllCampaigns,
}) => {
  const [copiedUrl, setCopiedUrl] = React.useState(false);

  const handleCopyUrl = () => {
    const url = getAbsoluteCampaignUrl('bamboozer-7day-sprint');
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="active-campaign-popup-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campaign-modal-title"
    >
      {/* Dark frosted backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Main Modal Card */}
      <div 
        id="active-campaign-popup-card"
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0d1624] via-[#09101c] to-[#070b13] border border-emerald-500/40 rounded-3xl shadow-2xl shadow-emerald-500/10 p-5 sm:p-7 md:p-8 z-10 my-auto overflow-hidden animate-scale-up text-white"
      >
        {/* Decorative lighting glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/15 blur-[100px] pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          id="btn-close-campaign-popup"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer z-20"
          aria-label="Đóng popup chiến dịch"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Top Campaign Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 pr-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wide">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>KHỞI TRANH NGÀY 10/10 • 00:00 (MÙA 01)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>10/10 → 24/10/2026</span>
          </span>
        </div>

        {/* Modal Title & Subtitle */}
        <h2 
          id="campaign-modal-title"
          className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-snug mb-2"
        >
          Bamboozer 14-Day Trading Challenge{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Season 01
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          Cuộc thi giao dịch trong 14 ngày dành cho Trader tự áp dụng <strong className="text-white">Indicator, Strategy</strong> vào Live Trading từ <strong className="text-emerald-400 font-bold">10/10 đến 24/10/2026</strong>. Đánh giá dựa trên lợi nhuận ròng kết hợp quản lý rủi ro với tổng giải thưởng <strong className="text-emerald-400 font-bold">$700 Tiền Mặt + Gói Pro VIP</strong>.
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 mb-5 font-mono">
          <div className="bg-[#0c1626]/90 border border-emerald-500/30 rounded-2xl p-3 text-center sm:text-left">
            <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-sans">TỔNG GIẢI THƯỞNG</div>
            <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-0.5">$700</div>
            <div className="text-[10px] text-slate-400 hidden sm:block font-sans">Tiền Mặt + Pro VIP</div>
          </div>
          <div className="bg-[#0c1626]/90 border border-slate-800 rounded-2xl p-3 text-center sm:text-left">
            <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-sans">THÍ SINH THAM GIA</div>
            <div className="text-lg sm:text-2xl font-black text-cyan-300 mt-0.5">{CURRENT_SEASON.totalParticipants}+</div>
            <div className="text-[10px] text-slate-400 hidden sm:block font-sans">Trader đang thi đấu</div>
          </div>
          <div className="bg-[#0c1626]/90 border border-amber-500/30 rounded-2xl p-3 text-center sm:text-left">
            <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-sans">LỆ PHÍ THAM GIA</div>
            <div className="text-lg sm:text-2xl font-black text-amber-400 mt-0.5">MIỄN PHÍ</div>
            <div className="text-[10px] text-slate-400 hidden sm:block font-sans">100% Quyền lợi bảo trợ</div>
          </div>
        </div>

        {/* Prize Structure Tier Breakdown */}
        <div className="bg-[#080d17]/80 border border-slate-800 rounded-2xl p-3.5 sm:p-4 mb-5">
          <div className="text-xs font-bold text-slate-300 flex items-center justify-between mb-2.5">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>CƠ CẤU GIẢI THƯỞNG 14-DAY CHALLENGE</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Trao thưởng sau 14 ngày</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-[#0d1726] border border-amber-500/30 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
                <Trophy className="w-3.5 h-3.5 fill-amber-400" />
                <span>Giải Nhất</span>
              </div>
              <div className="text-sm font-black text-white mt-1">$300 Cash</div>
              <div className="text-[10px] text-emerald-400">+ 3 Tháng Pro VIP</div>
            </div>

            <div className="bg-[#0d1726] border border-slate-700 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-slate-300 font-bold text-[11px]">
                <Medal className="w-3.5 h-3.5 fill-slate-300" />
                <span>Giải Nhì</span>
              </div>
              <div className="text-sm font-black text-white mt-1">$200 Cash</div>
              <div className="text-[10px] text-emerald-400">+ 1 Tháng Pro VIP</div>
            </div>

            <div className="bg-[#0d1726] border border-amber-700/50 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                <Award className="w-3.5 h-3.5 fill-amber-600" />
                <span>Giải Ba</span>
              </div>
              <div className="text-sm font-black text-white mt-1">$100 Cash</div>
              <div className="text-[10px] text-emerald-400">+ 1 Tháng Pro VIP</div>
            </div>

            <div className="bg-[#0d1726] border border-cyan-500/30 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-cyan-400 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Risk Award</span>
              </div>
              <div className="text-sm font-black text-white mt-1">$100 Cash</div>
              <div className="text-[10px] text-cyan-300">+ 1 Tháng Pro VIP</div>
            </div>
          </div>
        </div>

        {/* Participation Rules Short Checklist */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 bg-[#060a12] border border-slate-800/80 rounded-xl px-3 py-2 mb-6 gap-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Giao dịch tối thiểu 10 lệnh</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Sụt giảm Max DD &le; 10.0%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Đòn bẩy tối đa 20x</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Tự động cập nhật bảng xếp hạng</span>
          </div>
        </div>

        {/* Direct Campaign URL Route Display & Copy */}
        <div className="flex items-center justify-between text-xs font-mono px-3.5 py-2 rounded-xl bg-[#060a12] border border-slate-800 text-slate-400 mb-5">
          <div className="flex items-center gap-2 truncate">
            <LinkIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-500">Đường dẫn:</span>
            <code className="text-emerald-400 font-bold">/campaign/bamboozer-7day-sprint</code>
          </div>
          <button
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold cursor-pointer transition-all shrink-0 ml-2"
          >
            {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedUrl ? 'Đã sao chép link!' : 'Sao chép link'}</span>
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            id="btn-modal-join-campaign"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="flex-1 py-3 px-5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            <span>Đăng Ký Tham Gia Ngay (0đ)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-modal-view-leaderboard"
            onClick={() => {
              onClose();
              onViewChallenge();
            }}
            className="py-3 px-4 rounded-2xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Xem Bảng Xếp Hạng Trực Tiếp</span>
          </button>
        </div>

        {/* Bottom small link */}
        {onViewAllCampaigns && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                onClose();
                onViewAllCampaigns();
              }}
              className="text-xs text-slate-400 hover:text-emerald-300 underline transition-colors cursor-pointer"
            >
              Khám phá danh sách tất cả các chiến dịch khác →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
