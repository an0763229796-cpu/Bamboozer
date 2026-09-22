import React from 'react';
import { Trophy, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { trackAndOpenAffiliate } from '../../services/telemetryDb';

interface FinalCtaSectionProps {
  onJoinClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onJoinClick }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070b12] to-[#04060a] border-b border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00C07612,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono mb-4">
          <Trophy className="w-4 h-4" />
          <span>ĐĂNG KÝ MIỄN PHÍ • GIẢI THƯỞNG $1,140 USDT</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
          Sẵn Sàng Chứng Minh Đẳng Cấp Giao Dịch Của Bạn?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Gia nhập hơn 50+ Quant Traders hàng đầu khu vực, rèn giũa kỷ luật kiểm soát Drawdown 10% và ghi danh trên Bảng vàng vinh danh Bamboozer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onJoinClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono font-bold text-sm text-black bg-[#00C076] hover:bg-[#00d684] shadow-2xl shadow-[#00C076]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>GIA NHẬP SPRINT MÙA 04 NGAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => trackAndOpenAffiliate('FinalCta_DirectAffiliate')}
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-mono text-sm text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Tạo tài khoản ref=81</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Không giữ tài sản
          </span>
          <span>•</span>
          <span>Không phí tham gia</span>
          <span>•</span>
          <span>Giải ngân minh bạch</span>
        </div>
      </div>
    </section>
  );
};
