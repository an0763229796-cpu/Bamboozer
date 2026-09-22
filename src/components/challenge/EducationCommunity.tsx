import React from 'react';
import { ShieldCheck, MessageSquare, Send, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';

export const EducationCommunity: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#05080e] border-b border-slate-800" id="education-community">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Risk Management Education */}
          <div className="lg:col-span-7 bg-[#0c121e] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>QUY CHUẨN QUẢN TRỊ RỦI RO CHUYÊN NGHIỆP</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Tại sao Bamboozer áp dụng giới hạn Max Drawdown 10.0%?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Trong thế giới giao dịch phái sinh tiền mã hóa, 90% trader thất bại không phải vì thiếu tín hiệu vào lệnh, mà do thiếu kỷ luật cắt lỗ. Giới hạn 10% Drawdown giúp bạn rèn luyện tư duy của một Quỹ định lượng (Hedge Fund Trader).
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="text-emerald-400 font-bold shrink-0">01</span>
                <div>
                  <div className="font-bold text-white">Quy tắc 2% Mỗi Lệnh (Risk per trade)</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Không bao giờ đặt cược rủi ro quá 2% tổng vốn tài khoản cho một lệnh đơn lẻ.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="text-emerald-400 font-bold shrink-0">02</span>
                <div>
                  <div className="font-bold text-white">Kiểm soát đòn bẩy tối đa 20x</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Hệ thống giám sát tự động sẽ cảnh báo nếu đòn bẩy vượt ngưỡng an toàn.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="text-emerald-400 font-bold shrink-0">03</span>
                <div>
                  <div className="font-bold text-white">Kỷ luật Stop-Loss cứng</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Mọi lệnh vào phải có điểm dừng lỗ định trước, không gồng lỗ hay DCA ngược xu hướng.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Community & Alpha Hub */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0e1626] to-[#070b12] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                <MessageSquare className="w-4 h-4" />
                <span>CỘNG ĐỒNG ALPHA &amp; HỖ TRỢ</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Gia Nhập Cộng Đồng Quant Traders
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Nhận tín hiệu phân tích vĩ mô, thảo luận chiến lược scalping hàng ngày và giải đáp thể lệ cuộc thi trực tiếp cùng Ban Tổ Chức.
              </p>

              <div className="space-y-3">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 transition-all text-xs font-mono text-white"
                >
                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-cyan-400" />
                    <span>Telegram Alpha Group (VIP Traders)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 transition-all text-xs font-mono text-white"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    <span>Discord Community Channel</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                  <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Tài liệu hướng dẫn kết nối API &amp; tính điểm tự động.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Hỗ trợ kỹ thuật 24/7</span>
              <span className="text-emerald-400 font-mono">support@bamboozer.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
