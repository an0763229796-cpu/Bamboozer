import React from 'react';
import { PRODUCT_MODULES } from '../data/content';
import { X, BookOpen, CheckCircle2, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n';

interface QuickGuideDrawerProps {
  isOpen: boolean;
  moduleId: string | null;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const QuickGuideDrawer: React.FC<QuickGuideDrawerProps> = ({
  isOpen,
  moduleId,
  onClose,
  onOpenRegister
}) => {
  const { t, tContent } = useLanguage();
  if (!isOpen || !moduleId) return null;

  const currentModule = PRODUCT_MODULES.find((m) => m.id === moduleId) || PRODUCT_MODULES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-xl bg-[#0c121e] border-l border-slate-800 shadow-2xl p-4 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                <BookOpen className="w-4 h-4" />
                <span>{t('tutorialLabel')} • {currentModule.badge}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug">
              {tContent(`guide.${currentModule.id}.title`, currentModule.quickGuideTitle)}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              {t('guideDescription')} {currentModule.title}.
            </p>

            {/* Step-by-Step Cards */}
            <div className="space-y-4 mb-8">
              {currentModule.quickGuideContent.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#080c14] border border-slate-800 rounded-xl p-4 sm:p-5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono mb-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{step.step}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {step.action}
                  </p>

                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>{t('expertTip')}</strong> {step.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="flex-1 py-3 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('practiceNow')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
