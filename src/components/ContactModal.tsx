import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageSquare, 
  User, 
  Phone, 
  HelpCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetEmail?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  targetEmail = 'an0763229796@gmail.com'
}) => {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Tư vấn bot & thuật toán AI');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleCopyAll = () => {
    const fullText = `Họ tên: ${name}\nEmail người gửi: ${senderEmail}\nSĐT/Telegram: ${phone || 'Không cung cấp'}\nChủ đề: ${topic}\nNội dung: ${message}`;
    navigator.clipboard.writeText(fullText);
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !senderEmail.trim() || !message.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ Họ tên, Email và Nội dung tin nhắn.');
      return;
    }

    setErrorMessage('');
    
    // Construct mailto link
    const subject = encodeURIComponent(`[Bamboozer AI] ${topic} - Từ ${name}`);
    const bodyContent = `Xin chào đội ngũ Bamboozer,%0D%0A%0D%0AThông tin liên hệ:%0D%0A- Họ và tên: ${encodeURIComponent(name)}%0D%0A- Email người gửi: ${encodeURIComponent(senderEmail)}%0D%0A- SĐT/Telegram: ${encodeURIComponent(phone || 'Chưa cung cấp')}%0D%0A- Chủ đề: ${encodeURIComponent(topic)}%0D%0A%0D%0ANội dung tin nhắn:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A---%0D%0AGửi từ biểu mẫu liên hệ Bamboozer AI Quant Platform`;
    
    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${bodyContent}`;
    
    // Open email client
    window.location.href = mailtoUrl;

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#0e1626] to-[#0a0f1a] border border-slate-700/60 p-5 sm:p-6 shadow-2xl shadow-cyan-950/50 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Liên Hệ Trực Tiếp Với Tôi
            </h3>
            <p className="text-xs text-slate-400">
              Gửi email thắc mắc, tư vấn thuật toán hoặc hợp tác kỹ thuật
            </p>
          </div>
        </div>

        {isSubmitted ? (
          /* Submission Success View */
          <div className="py-4 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Ứng dụng email đã được kích hoạt!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Nội dung thư của bạn đã được đóng gói sẵn để gửi đến <span className="text-cyan-300 font-mono font-semibold">{targetEmail}</span>. Nếu ứng dụng email chưa tự mở, bạn có thể bấm nút bên dưới để sao chép nội dung hoặc mở lại.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleCopyAll}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedContent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Đã sao chép tin nhắn</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300" />
                    <span>Sao chép nội dung thư</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const subject = encodeURIComponent(`[Bamboozer AI] ${topic} - Từ ${name}`);
                  const bodyContent = `Xin chào đội ngũ Bamboozer,%0D%0A%0D%0A- Họ và tên: ${encodeURIComponent(name)}%0D%0A- Email: ${encodeURIComponent(senderEmail)}%0D%0A- SĐT: ${encodeURIComponent(phone || 'Chưa cung cấp')}%0D%0A- Chủ đề: ${encodeURIComponent(topic)}%0D%0A%0D%0ANội dung:%0D%0A${encodeURIComponent(message)}`;
                  window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${bodyContent}`;
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Mở lại ứng dụng Email</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Soạn tin nhắn khác
              </button>
            </div>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Họ và tên *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email của bạn *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>
            </div>

            {/* Phone & Topic Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SĐT hoặc Telegram (Tùy chọn)</span>
                </label>
                <input
                  type="text"
                  placeholder="@telegram_handle hoặc SĐT"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Chủ đề hỗ trợ</span>
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer"
                >
                  <option value="Tư vấn bot & thuật toán AI">Tư vấn bot &amp; thuật toán AI</option>
                  <option value="Hỗ trợ kết nối API sàn">Hỗ trợ kết nối API sàn giao dịch</option>
                  <option value="Đăng ký tài khoản VIP / Doanh nghiệp">Đăng ký tài khoản VIP / Doanh nghiệp</option>
                  <option value="Tích hợp chỉ báo Pine Script">Tích hợp chỉ báo Pine Script</option>
                  <option value="Hợp tác kinh doanh / Affiliate">Hợp tác kinh doanh / Affiliate</option>
                  <option value="Vấn đề khác">Vấn đề kỹ thuật khác</option>
                </select>
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nội dung tin nhắn *</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Mô tả câu hỏi, nhu cầu kết nối sàn hoặc yêu cầu hỗ trợ cụ thể..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
              />
            </div>

            {/* Security Guarantee & Submit Button */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Phản hồi nhanh trong 2-4h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Bảo mật thông tin</span>
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-contact"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Gửi Email Trực Tiếp Cho Tôi</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
