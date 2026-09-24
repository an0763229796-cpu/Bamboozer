import React from 'react';
import { KeyRound, ShieldCheck, ArrowRight, UserPlus, LineChart, Trophy } from 'lucide-react';
import { trackAndOpenAffiliate } from '../../services/telemetryDb';

interface HowToParticipateSectionProps {
  onJoinClick: () => void;
}

export const HowToParticipateSection: React.FC<HowToParticipateSectionProps> = ({ onJoinClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Đăng Ký Tài Khoản Giao Dịch',
      desc: 'Tạo tài khoản giao dịch chính thức qua cổng đối tác bảo trợ độc quyền.',
      icon: UserPlus,
    },
    {
      num: '02',
      title: 'Nạp Vốn Hoặc Kết Nối API',
      desc: 'Chuẩn bị số dư tối thiểu $100 hoặc kết nối API sàn Binance/Bybit của bạn an toàn.',
      icon: KeyRound,
    },
    {
      num: '03',
      title: 'Xác Nhận Tham Gia Mùa 01',
      desc: 'Điền form ghi danh để hệ thống khởi tạo UID và kết nối đường truyền telemetry chấm điểm tự động.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Giao Dịch Trong 14 Ngày',
      desc: 'Thực hiện tối thiểu 10 lệnh trên các cặp giao dịch hợp lệ: BTC, ETH, SOL, BNB, XRP.',
      icon: LineChart,
    },
    {
      num: '05',
      title: 'Kiểm Soát Drawdown & Nhận Thưởng',
      desc: 'Duy trì Max Drawdown ≤ 10%. Top ROI và Risk Management Award sẽ được giải ngân tiền mặt tức thì.',
      icon: Trophy,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#070b12] border-b border-slate-800" id="how-to-participate">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            5 Bước Tham Gia Cuộc Thi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Quy trình minh bạch, không lưu ký tài sản và đối soát tự động qua hệ thống chuẩn hóa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#0c121e] border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-black text-slate-600 group-hover:text-emerald-400 transition-colors">
                      {s.num}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onJoinClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono font-bold text-sm text-black bg-[#00C076] hover:bg-[#00d684] shadow-lg shadow-[#00C076]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>BẮT ĐẦU ĐĂNG KÝ NGAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => trackAndOpenAffiliate('HowToParticipate_RefButton')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-mono text-sm text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer text-center"
          >
            Mở Sàn Giao Dịch Trực Tiếp
          </button>
        </div>
      </div>
    </section>
  );
};
