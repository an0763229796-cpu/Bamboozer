import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CURRENT_SEASON } from '../../data/mockData';

export const RulesAndFaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Làm thế nào để hệ thống tính điểm ROI và PnL của tôi?',
      a: 'Công thức tính ROI = ((Số dư cuối kỳ - Số dư ban đầu) / Số dư ban đầu) * 100%. Tất cả vị thế đóng và mở trước giờ chốt sổ sẽ được quy đổi theo giá Index thị trường tại thời điểm kết thúc giải.',
    },
    {
      q: 'Nếu tài khoản của tôi đạt mức sụt giảm 10.1% thì sao?',
      a: 'Hệ thống tự động phát hiện sụt giảm vốn tức thời so với đỉnh vốn cao nhất (High Water Mark). Nếu Max Drawdown > 10.0%, tài khoản sẽ chuyển sang trạng thái "Disqualified" và không được xét giải thưởng cuối kỳ.',
    },
    {
      q: 'Giải thưởng $1,140 USDT sẽ được trao như thế nào?',
      a: 'Tiền mặt ($100 cho Top 1, $50 cho Top 2, $30 cho Top 3, $30 cho Risk Award) sẽ được chuyển trực tiếp vào ví USDT mạng TRC20/BEP20 của thí sinh trong vòng 48h sau khi công bố kết quả. Gói Bamboozer Pro VIP sẽ được kích hoạt trực tiếp theo UID.',
    },
    {
      q: 'Tôi có cần nạp tiền vào Bamboozer không?',
      a: 'Không. Bamboozer là nền tảng phân tích và quản lý chiến lược phi lưu ký (non-custodial). Tiền và lệnh nằm trực tiếp trên tài khoản sàn của bạn thông qua API chỉ có quyền Trade (tuyệt đối KHÔNG cấp quyền Rút tiền).',
    },
    {
      q: 'Mã giới thiệu ref=81 có bắt buộc không?',
      a: 'Có. Mã ref=81 là định danh liên kết chiến dịch độc quyền để kích hoạt quyền tham gia Mùa 04 miễn phí và nhận gói quà tặng $100 Credits phân tích AI.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#070b12] border-b border-slate-800" id="rules-faq">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Rules Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono mb-3">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ĐIỀU LỆ THI ĐẤU CHÍNH THỨC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Quy Chế &amp; Tiêu Chuẩn Loại
              </h2>
            </div>

            <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-5 space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3 pb-3 border-b border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold">Số Lệnh Tối Thiểu: 10 Lệnh</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Tránh trường hợp vào 1 lệnh may rủi rồi giữ đến hết giải.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold">Cặp Giao Dịch Hợp Lệ</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{CURRENT_SEASON.rules.eligiblePairs.join(', ')}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-slate-800/80">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-rose-300 font-bold">Giới Hạn Max Drawdown: 10.0%</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Bất kỳ tài khoản sụt giảm &gt; 10% sẽ bị loại ngay lập tức.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold">Thời Gian Thi Đấu: 7 Ngày Liên Tục</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Từ 20/09 đến hết 27/09/2026.</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>CÂU HỎI THƯỜNG GẶP (FAQ)</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Giải Đáp Thắc Mắc</h3>

            <div className="space-y-3">
              {faqs.map((f, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#0c121e] border border-slate-800 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-emerald-400 cursor-pointer"
                    >
                      <span>{f.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
