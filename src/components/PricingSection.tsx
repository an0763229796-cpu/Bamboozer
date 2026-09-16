import React, { useState } from 'react';
import { PRICING_PLANS, CREDIT_USAGE_RULES } from '../data/content';
import { Check, Zap, Sparkles, HelpCircle, Coins, ArrowRight, Calculator } from 'lucide-react';

export const PricingSection: React.FC<{ onOpenRegister: () => void }> = ({ onOpenRegister }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  
  // Interactive Credit Calculator state
  const [dailyAnalyses, setDailyAnalyses] = useState<number>(3);
  const [activeBotsCount, setActiveBotsCount] = useState<number>(2);

  // Credit calculation
  // Monthly analysis cost = dailyAnalyses * 30 days * 10 credits
  // Monthly bot cost = activeBotsCount * 300 credits
  const calculatedCreditsNeeded = (dailyAnalyses * 30 * 10) + (activeBotsCount * 300);

  // Suggested plan
  const getSuggestedPlan = () => {
    if (calculatedCreditsNeeded <= 100) return 'Free';
    if (calculatedCreditsNeeded <= 200) return 'Basic';
    if (calculatedCreditsNeeded <= 600) return 'Pro (Khuyên dùng)';
    return 'Premium';
  };

  return (
    <section className="py-24 bg-[#090d15] border-t border-slate-800/80 relative" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
            <Coins className="w-3.5 h-3.5" />
            <span>Minh Bạch &amp; Linh Hoạt</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Bảng Giá Dịch Vụ &amp; Cơ Chế Credits
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Lựa chọn gói membership phù hợp với quy mô danh mục của bạn. Nhận ngay 100 Credits miễn phí khi đăng ký lần đầu.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-[#0e1422] p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Thanh toán hàng tháng
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Thanh toán theo năm</span>
              <span className="bg-slate-900 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                Tiết kiệm 30% + 10% Bonus
              </span>
            </button>
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRICING_PLANS.map((plan) => {
            const isAnnual = billingCycle === 'annual';
            const price = isAnnual && plan.priceMonthly > 0 
              ? (plan.priceMonthly * 0.7).toFixed(2) 
              : plan.priceMonthly.toFixed(2);
            const credits = isAnnual && plan.priceMonthly > 0
              ? Math.round(plan.creditsPerMonth * 1.1)
              : plan.creditsPerMonth;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 border transition-all flex flex-col justify-between relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#101b2a] via-[#0d1522] to-[#090e18] border-emerald-500/60 shadow-2xl shadow-emerald-500/15 ring-1 ring-emerald-500/40'
                    : 'bg-[#0c121e] border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold font-mono tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-extrabold text-white">
                      {plan.name}
                    </h3>
                    <div className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {credits} Credits / tháng
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 min-h-[32px]">
                    {plan.highlightFeature}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-800">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400">
                      / tháng
                    </span>
                    {isAnnual && plan.priceMonthly > 0 && (
                      <span className="text-[10px] text-emerald-400 line-through ml-1 font-mono">
                        ${plan.priceMonthly}
                      </span>
                    )}
                  </div>

                  {/* Core Capacity Limits */}
                  <div className="space-y-2 mb-6 text-xs font-mono">
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400">Phân tích AI:</span>
                      <span className="font-bold text-cyan-300">{plan.aiAnalysisLimit}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400">Số lượng Bots:</span>
                      <span className="font-bold text-emerald-400">{plan.aiBotsLimit}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-800">
                      <span className="text-slate-400">Tài khoản API:</span>
                      <span className="font-bold text-white">{plan.apiAccountsLimit}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenRegister}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Credit Rules & Interactive Usage Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Credit Usage Rules (Left 6 cols) */}
          <div className="lg:col-span-6 bg-[#0c121e] border border-slate-800 rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                Quy Tắc Trừ Credits Minh Bạch
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Bạn chỉ tiêu thụ Credits khi sử dụng tài nguyên điện toán thực tế. Không phát sinh chi phí ẩn.
            </p>

            <div className="space-y-3">
              {CREDIT_USAGE_RULES.map((rule, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#080c14] border border-slate-800/90">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>{rule.task}</span>
                    <span className="text-emerald-400 font-mono">{rule.cost}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
              <span>Ưu đãi thanh toán năm:</span>
              <strong className="text-white font-mono">Tiết kiệm 30% + 10% Bonus Credits</strong>
            </div>
          </div>

          {/* Interactive Credit Estimator (Right 6 cols) */}
          <div className="lg:col-span-6 bg-[#0c121e] border border-slate-800 rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">
                Công Cụ Ước Tính Nhu Cầu Credits Hàng Tháng
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-6">
              Kéo thanh trượt để xác định số lượng Credits và gói thành viên tối ưu nhất cho bạn.
            </p>

            <div className="space-y-6">
              {/* Slider 1: Daily AI analyses */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Số lượt phân tích AI mỗi ngày:</span>
                  <span className="font-mono font-bold text-cyan-300 text-sm">{dailyAnalyses} lượt / ngày</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={dailyAnalyses}
                  onChange={(e) => setDailyAnalyses(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 lượt</span>
                  <span>10 lượt</span>
                  <span>20 lượt</span>
                </div>
              </div>

              {/* Slider 2: Number of active bots */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Số lượng Bot muốn chạy đồng thời:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{activeBotsCount} Bots</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={activeBotsCount}
                  onChange={(e) => setActiveBotsCount(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>0 Bot</span>
                  <span>5 Bots</span>
                  <span>10 Bots</span>
                </div>
              </div>

              {/* Result Recommendation Box */}
              <div className="p-4 rounded-xl bg-[#080c14] border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400">Nhu cầu ước tính:</span>
                  <span className="text-lg font-mono font-black text-emerald-400">
                    ~{calculatedCreditsNeeded} Credits / tháng
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                  <span className="text-slate-300 font-semibold">Gói khuyến nghị:</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold font-mono border border-emerald-500/30">
                    {getSuggestedPlan()}
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Đăng ký nhận 100 Credits trải nghiệm ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
