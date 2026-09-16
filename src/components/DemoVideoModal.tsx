import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  isOpen,
  onClose,
  onOpenRegister
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeSegment, setActiveSegment] = useState<number>(0);

  if (!isOpen) return null;

  const demoSegments = [
    { title: '01. Kết nối API Sàn Non-Custodial', time: '00:00 - 00:45', highlight: 'Xác nhận cấm quyền rút tiền trên Binance' },
    { title: '02. Phân tích AI & Độ Tin Cậy', time: '00:45 - 01:30', highlight: 'Đọc % Confidence 84% BUY & Stop Loss ATR' },
    { title: '03. Tạo chỉ báo Pine Script AI', time: '01:30 - 02:15', highlight: 'Sinh code SuperTrend trong 5 giây' },
    { title: '04. Vận hành Bot & Chốt Lời Realtime', time: '02:15 - 03:00', highlight: 'Grid Bot tự động rải lưới lệnh' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#0c121e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Stage Simulation */}
        <div className="relative aspect-video bg-[#05080f] flex flex-col justify-between p-6 overflow-hidden">
          {/* Top meta */}
          <div className="flex items-center justify-between z-10">
            <span className="px-2.5 py-1 rounded bg-slate-900/90 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              DEMO 3 PHÚT: TOÀN CẢNH NỀN TẢNG BAMBOOZER
            </span>
            <span className="text-xs text-slate-400 font-mono">1080p Ultra HD</span>
          </div>

          {/* Central Animated Scene */}
          <div className="text-center my-auto z-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3 animate-pulse">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              {demoSegments[activeSegment].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-3">
              {demoSegments[activeSegment].highlight}
            </p>
            <div className="inline-block px-3 py-1 rounded-full bg-slate-900 text-cyan-300 border border-slate-800 text-xs font-mono">
              Phân đoạn: {demoSegments[activeSegment].time}
            </div>
          </div>

          {/* Bottom Timeline Controls */}
          <div className="z-10 bg-black/60 backdrop-blur-xs p-3 rounded-xl border border-slate-800/80">
            <div className="grid grid-cols-4 gap-2 mb-2">
              {demoSegments.map((seg, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSegment(i)}
                  className={`p-1.5 rounded text-[10px] font-mono transition-all text-left truncate cursor-pointer ${
                    activeSegment === i
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {seg.title.split('.')[0]}. {seg.title.split('.')[1]}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="text-white hover:text-emerald-400 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px]">01:42 / 03:00</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">Thuyết minh Tiếng Việt</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#090d15] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Xem xong? Bắt đầu thực hành với 100 Credits miễn phí ngay.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Nhận 100 Credits Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
