import React, { useState } from 'react';
import { 
  X, 
  Gift, 
  Copy, 
  Check, 
  Coins, 
  Sparkles,
  Send
} from 'lucide-react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimBonus: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  isOpen,
  onClose,
  onClaimBonus
}) => {
  const [refCode, setRefCode] = useState<string>('81');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const referralUrl = `https://www.bamboozer.com/register?ref=${refCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#0c121e] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Chương Trình Giới Thiệu (Referral Program)
            </h3>
            <p className="text-xs text-slate-400">
              Chia sẻ link ref của bạn để nhận ngay Credits miễn phí
            </p>
          </div>
        </div>

        {/* Perks Grid - 100 Credits Only */}
        <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/30 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Thưởng Giới Thiệu Bạn Bè</div>
              <div className="text-sm font-semibold text-slate-200">Nhận 100 Credits nếu giới thiệu bạn bè</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black text-cyan-300 font-mono">
              +100 Credits
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">Cộng trực tiếp</div>
          </div>
        </div>

        {/* Referral Link Box */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Link Giới Thiệu Của Bạn:
          </label>
          <div className="flex items-center gap-2 bg-[#070b13] border border-slate-800 rounded-xl p-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="flex-1 bg-transparent text-xs text-cyan-300 font-mono focus:outline-none px-2 select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã Sao Chép!' : 'Sao Chép'}</span>
            </button>
          </div>
        </div>

        {/* Custom Ref Code Switcher */}
        <div className="mb-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Mã giới thiệu (Ref Code):</span>
            <span className="font-mono font-bold text-white">{refCode}</span>
          </div>
          <button
            onClick={() => {
              const newCode = prompt('Nhập mã giới thiệu bạn muốn đặt:', refCode);
              if (newCode && newCode.trim()) {
                setRefCode(newCode.trim().toUpperCase());
              }
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
          >
            Đổi mã riêng
          </button>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="mb-6">
          <div className="text-[11px] font-semibold text-slate-400 mb-2">
            Chia sẻ nhanh qua mạng xã hội:
          </div>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent('Khám phá Bamboozer AI Quant Trading Platform - Nhận 100 Credits Free!')}`}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Telegram</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent('Giao dịch tự động Non-Custodial với Bamboozer AI Quant Trading! Tặng 100 Credits:')}`}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>X (Twitter)</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              onClaimBonus();
              onClose();
            }}
            className="flex-1 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Kích hoạt mã &amp; Nhận thưởng</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
