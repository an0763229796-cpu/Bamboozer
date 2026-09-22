import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Trophy, CheckCircle2, ArrowRight, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { logTelemetryEvent, trackAndOpenAffiliate } from '../../services/telemetryDb';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [exchangeUid, setExchangeUid] = useState('');
  const [refCode, setRefCode] = useState('81');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email) return;

    // Log telemetry conversion event
    logTelemetryEvent('RegisterModal_Submit', 'modal_submit', refCode, {
      username,
      email,
      exchangeUid,
    });

    // Fire fireworks celebration
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#00C076', '#10b981', '#06b6d4', '#f59e0b'],
    });

    setStep('success');
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0c121e] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00C076] mb-2">
              <Trophy className="w-4 h-4" />
              <span>GHI DANH THAM GIA MÙA 04</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Bamboozer 7-Day Sprint Challenge
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Đăng ký miễn phí để tranh giải <strong className="text-emerald-400">$1,140 USDT</strong>. Mã giới thiệu mặc định <strong className="text-white font-mono">ref=81</strong>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">TÊN HIỂN THỊ (TRADER USERNAME) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: QuantMaster99"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#05080e] border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL NHẬN KẾT QUẢ *</label>
                <input
                  type="email"
                  required
                  placeholder="trader@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#05080e] border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">UID TÀI KHOẢN SÀN</label>
                  <input
                    type="text"
                    placeholder="UID 8-10 số"
                    value={exchangeUid}
                    onChange={(e) => setExchangeUid(e.target.value)}
                    className="w-full bg-[#05080e] border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">MÃ CHIẾN DỊCH (REF)</label>
                  <input
                    type="text"
                    value={refCode}
                    readOnly
                    className="w-full bg-[#05080e] border border-emerald-500/50 text-emerald-400 font-bold rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 accent-emerald-500"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-400 leading-snug cursor-pointer">
                  Tôi đồng ý tuân thủ luật thi đấu Max Drawdown ≤ 10.0% và điều khoản giải thưởng phi lưu ký của Bamboozer.
                </label>
              </div>

              <button
                type="submit"
                disabled={!acceptedTerms}
                className="w-full py-3 rounded-xl font-mono font-bold text-xs sm:text-sm text-black bg-[#00C076] hover:bg-[#00d684] shadow-lg shadow-[#00C076]/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <span>XÁC NHẬN GHI DANH &amp; NHẬN VÉ ĐẤU</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Ghi Danh Thành Công!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Hệ thống đã ghi nhận thí sinh <strong className="text-emerald-400 font-mono">{username}</strong> vào bảng đấu Mùa 04 với mã <code className="text-cyan-400 font-mono">ref=81</code>.
              </p>
            </div>

            <div className="bg-[#05080e] p-4 rounded-xl border border-slate-800 text-left font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Trạng thái:</span>
                <span className="text-emerald-400 font-bold">Đã kích hoạt vé đấu</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Chiến dịch:</span>
                <span className="text-white">Bamboozer 7-Day Sprint Mùa 04</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Quyền lợi:</span>
                <span className="text-amber-400">Tặng 100 Credits phân tích AI</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  trackAndOpenAffiliate('RegisterModal_SuccessRedirect', 'challenge_join');
                  onClose();
                }}
                className="w-full py-3 rounded-xl font-mono font-bold text-xs sm:text-sm text-black bg-[#00C076] hover:bg-[#00d684] cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <span>MỞ SÀN GIAO DỊCH CHÍNH THỨC (REF=81)</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl font-mono text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Quay lại theo dõi bảng xếp hạng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
