import React, { useState, useEffect } from 'react';
import { TelemetryClickEvent } from '../../types';
import {
  getTelemetryEvents,
  downloadTelemetryCsv,
  clearTelemetryEvents,
  logTelemetryEvent,
} from '../../services/telemetryDb';
import {
  Activity,
  Download,
  Trash2,
  Filter,
  ExternalLink,
  Users,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const TelemetryDatabaseView: React.FC = () => {
  const [events, setEvents] = useState<TelemetryClickEvent[]>([]);

  useEffect(() => {
    // Seed initial event if empty so user has immediate data
    const existing = getTelemetryEvents();
    if (existing.length === 0) {
      logTelemetryEvent('InitialVisit_BloombergHero', 'view_leaderboard', '81');
      logTelemetryEvent('PrizePool_View', 'click_affiliate', '81');
      logTelemetryEvent('Register_Initiate', 'modal_submit', '81');
    }
    setEvents(getTelemetryEvents());
  }, []);

  const handleRefresh = () => {
    setEvents(getTelemetryEvents());
  };

  const handleClear = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử telemetry?')) {
      clearTelemetryEvents();
      setEvents([]);
    }
  };

  // Funnel calculations
  const totalClicks = events.length;
  const ref81Clicks = events.filter((e) => e.refCode === '81').length;
  const conversions = events.filter((e) => e.actionType === 'modal_submit').length;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-[#070b12] text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Activity className="w-4 h-4" />
              <span>HỆ THỐNG GIÁM SÁT TELEMETRY &amp; ĐỐI TÁC LIÊN KẾT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Affiliate &amp; Click Telemetry</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Lưu trữ sự kiện tự động theo dõi lưu lượng và chuyển đổi chiến dịch trực tuyến.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white border border-slate-700 cursor-pointer"
            >
              Làm mới
            </button>
            <button
              onClick={downloadTelemetryCsv}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-mono text-emerald-300 border border-emerald-500/40 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Xuất CSV</span>
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-xs font-mono text-rose-300 border border-rose-500/30 cursor-pointer"
              title="Xóa toàn bộ log"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Funnel Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400">TỔNG SỰ KIỆN GHI NHẬN</div>
            <div className="text-2xl font-bold text-white mt-1">{totalClicks}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Persisted trong LocalStorage</div>
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400">LƯỢT CLICK GẮN MÃ REF=81</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{ref81Clicks}</div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">
              Chiếm {totalClicks > 0 ? ((ref81Clicks / totalClicks) * 100).toFixed(0) : 0}% tổng lưu lượng
            </div>
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400">ĐĂNG KÝ VÉ ĐẤU (CONVERSIONS)</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">{conversions}</div>
            <div className="text-[10px] text-cyan-400/80 mt-0.5">
              Tỷ lệ CR: {totalClicks > 0 ? ((conversions / totalClicks) * 100).toFixed(1) : 0}%
            </div>
          </div>
        </div>

        {/* Telemetry Log Table */}
        <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span>NHẬT KÝ SỰ KIỆN THỜI GIAN THỰC</span>
            <span>Mỗi sự kiện được mã hóa session ID riêng</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px]">
                  <th className="py-2.5 px-3">THỜI GIAN</th>
                  <th className="py-2.5 px-3">NGUỒN (SOURCE)</th>
                  <th className="py-2.5 px-3">HÀNH ĐỘNG</th>
                  <th className="py-2.5 px-3">MÃ REF</th>
                  <th className="py-2.5 px-3">METADATA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {events.length > 0 ? (
                  events.slice(-30).reverse().map((e) => (
                    <tr key={e.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(e.timestamp).toLocaleTimeString('vi-VN')} {new Date(e.timestamp).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-white">{e.sourceComponent}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          {e.actionType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">{e.refCode}</td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px] max-w-xs truncate">
                        {e.metadata ? JSON.stringify(e.metadata) : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-slate-500">
                      Chưa có sự kiện telemetry nào được ghi nhận.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
