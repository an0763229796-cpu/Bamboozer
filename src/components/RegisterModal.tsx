import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Coins, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useLanguage } from '../i18n';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessClaim: (creditsToAdd: number) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccessClaim
}) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [refCode, setRefCode] = useState('BAMBOO_QUANT888');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccessClaim(100);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#0c121e] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-2">
              Kích Hoạt Thành Công!
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Đã cộng <strong className="text-emerald-400 font-mono">+100 Free Credits</strong> vào ví của bạn.
            </p>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
              Đang chuyển tiếp vào không gian làm việc...
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mb-4">
              <Coins className="w-3.5 h-3.5" />
              <span>Nhận Ngay 100 Credits Trải Nghiệm</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              Bắt Đầu Giao Dịch Cùng AI
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Mô hình Non-Custodial an toàn: Tiền luôn nằm trên sàn cá nhân của bạn. Không cần nhập thẻ ngân hàng.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Email cá nhân:
                </label>
                <input
                  type="email"
                  required
                  placeholder="trader@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#080c14] border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block flex items-center justify-between">
                  <span>Mã giới thiệu (Referral Code):</span>
                  <span className="text-[10px] text-emerald-400 font-mono">+100 Credits Bonus</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập mã ref nếu có"
                  value={refCode}
                  onChange={(e) => setRefCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#080c14] border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-cyan-300 font-mono focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Bằng cách tiếp tục, bạn đồng ý với Điều Khoản Dịch Vụ và xác nhận rằng Bamboozer không lưu ký tiền của bạn.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>{t('registerLoading')}</span>
                ) : (
                  <>
                    <span>{t('registerCta')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
