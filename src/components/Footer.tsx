import React from 'react';
import { COMPANY_INFO } from '../data/content';
import { ShieldCheck, Mail, Globe, AlertOctagon, Heart } from 'lucide-react';

export const Footer: React.FC<{ 
  onOpenRegister: () => void; 
  onOpenReferral: () => void;
  onOpenContact?: () => void;
}> = ({
  onOpenRegister,
  onOpenReferral,
  onOpenContact
}) => {
  return (
    <footer className="bg-[#060910] text-slate-400 border-t border-slate-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & Operating Entity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 bg-[#0d131f] shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Bamboozer Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Bamboozer AI Quant Trading
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed mb-4 max-w-sm">
              Nền tảng tự động hóa giao dịch định lượng AI đa tài sản theo mô hình Non-Custodial an toàn tuyệt đối. Tiền luôn nằm trên sàn cá nhân của bạn.
            </p>

            <div className="space-y-1.5 text-[11px] text-slate-400">
              <p><strong className="text-slate-300">Đơn vị vận hành:</strong> {COMPANY_INFO.legalEntity}</p>
              <p><strong className="text-slate-300">Quốc gia:</strong> {COMPANY_INFO.country}</p>
              <p><strong className="text-slate-300">Mã doanh nghiệp (UEN):</strong> {COMPANY_INFO.uen}</p>
              <p className="flex items-center gap-2 flex-wrap">
                <strong className="text-slate-300">Email:</strong> 
                <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="text-emerald-400 hover:underline">{COMPANY_INFO.supportEmail}</a>
                {onOpenContact && (
                  <button 
                    onClick={onOpenContact} 
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 cursor-pointer"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Gửi biểu mẫu</span>
                  </button>
                )}
              </p>
            </div>
          </div>

          {/* Col 3: Product Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Sản Phẩm
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#hero-section" className="hover:text-emerald-400 transition-colors">AI Asset Analysis</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Indicator IDE (Pine Script)</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Grid Bots &amp; Smart DCA</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Strategy Marketplace</a></li>
              <li><a href="#modules" className="hover:text-emerald-400 transition-colors">Trading Terminal</a></li>
              <li><a href="#integrations" className="hover:text-emerald-400 transition-colors">Kết Nối API Sàn</a></li>
            </ul>
          </div>

          {/* Col 4: Resources & Education */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Tài Nguyên &amp; Video
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#tutorials" className="hover:text-emerald-400 transition-colors">Video Tutorial Center</a></li>
              <li><a href="#onboarding" className="hover:text-emerald-400 transition-colors">Quy trình Onboarding 3 bước</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Bảng giá &amp; Cơ chế Credits</a></li>
              <li>
                <button onClick={onOpenReferral} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Chương trình Giới Thiệu (Referral)
                </button>
              </li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Câu hỏi thường gặp (FAQ)</a></li>
              {onOpenContact && (
                <li>
                  <button onClick={onOpenContact} className="text-cyan-300 hover:text-cyan-200 transition-colors text-left cursor-pointer flex items-center gap-1 font-medium">
                    <Mail className="w-3 h-3" />
                    <span>Liên hệ hỗ trợ (Gửi Email)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 5: Safety & Status */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Bảo Mật &amp; Cam Kết
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Non-Custodial 100%</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Không lưu ký tài sản. Không yêu cầu quyền rút tiền.
                </p>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-3 rounded-xl font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors text-center cursor-pointer"
              >
                Nhận 100 Credits Free
              </button>
            </div>
          </div>
        </div>

        {/* Risk Disclosure Box */}
        <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800/90 mb-10 text-[11px] leading-relaxed text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
            <AlertOctagon className="w-4 h-4 shrink-0" />
            <span>Tuyên Bố Miễn Trừ Trách Nhiệm &amp; Cảnh Báo Rủi Ro (Risk Disclosure)</span>
          </div>
          <p className="mb-2">
            Giao dịch tài chính, bao gồm tiền mã hóa, cổ phiếu, hàng hóa và ngoại hối có mức độ rủi ro cao và không phù hợp với tất cả các nhà đầu tư. Bạn có thể mất một phần hoặc toàn bộ số vốn đã đầu tư.
          </p>
          <p>
            Các phân tích thị trường, chỉ số độ tin cậy (Confidence Score) và tín hiệu từ Bamboozer AI được xây dựng dựa trên các mô hình toán học và định lượng nhằm mục đích cung cấp thông tin tham khảo kỹ thuật, hoàn toàn không cấu thành lời khuyên đầu tư tài chính hay bảo đảm lợi nhuận trong tương lai. Người dùng chịu trách nhiệm duy nhất cho các quyết định giao dịch của mình.
          </p>
        </div>

        {/* Copyright & Meta */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} VIDI VICI TECHNOLOGY PTE. LTD. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-200">Điều Khoản Dịch Vụ</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200">Chính Sách Bảo Mật</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200">Bảo Mật API</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
