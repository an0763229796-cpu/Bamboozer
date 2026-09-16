import React, { useState } from 'react';
import { FAQS } from '../data/content';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Mail } from 'lucide-react';

interface FaqSectionProps {
  onOpenContact?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#080c14] border-t border-slate-800/80" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Minh Bạch &amp; Rõ Ràng</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Mọi thắc mắc về tính an toàn, mô hình Non-Custodial và nguyên lý hoạt động của AI Bamboozer.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0c121e] border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-[#080c14]/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support contact nudge */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#0c121e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white mb-1">
              Bạn vẫn còn câu hỏi khác về tính năng hoặc API?
            </h4>
            <p className="text-xs text-slate-400">
              Gửi email trực tiếp đến <span className="text-cyan-300 font-mono">an0763229796@gmail.com</span> hoặc gửi biểu mẫu để được hỗ trợ nhanh.
            </p>
          </div>
          {onOpenContact ? (
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-md shadow-emerald-500/20 cursor-pointer shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Gửi Email Liên Hệ</span>
            </button>
          ) : (
            <a
              href="mailto:an0763229796@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Liên hệ: an0763229796@gmail.com</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
