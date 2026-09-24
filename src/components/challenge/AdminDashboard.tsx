import React, { useState } from 'react';
import { Participant } from '../../types';
import { PARTICIPANTS, CURRENT_SEASON } from '../../data/mockData';
import { exportTelemetryAsCsv, exportTelemetryAsJson } from '../../services/telemetryDb';
import {
  ShieldAlert,
  Download,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Search,
  Settings,
  Flame,
  FileSpreadsheet,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [traders, setTraders] = useState<Participant[]>(PARTICIPANTS);
  const [search, setSearch] = useState('');
  const [maxDrawdownLimit, setMaxDrawdownLimit] = useState(10.0);
  const [notification, setNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleStatus = (id: string) => {
    setTraders((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Disqualified' ? 'Active' : 'Disqualified';
          const reason =
            nextStatus === 'Disqualified'
              ? 'Truất quyền thi đấu thủ công bởi Trưởng Ban Giám Sát.'
              : undefined;
          notify(`Đã cập nhật thí sinh ${t.username} -> ${nextStatus}`);
          return {
            ...t,
            status: nextStatus,
            disqualifiedReason: reason,
          };
        }
        return t;
      })
    );
  };

  const handleExportCsv = () => {
    const headers = 'Rank,Username,Country,ROI,PnL,MaxDrawdown,WinRate,Status,KOLRef\n';
    const rows = traders
      .map(
        (t) =>
          `${t.rank},"${t.username}","${t.country}",${t.roi}%,${t.pnl},${t.maxDrawdown}%,${t.winRate}%,${t.status},"${t.kolRef || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bamboozer_sprint_s4_participants_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('Đã tải xuống tệp danh sách thí sinh CSV thành công.');
  };

  const filtered = traders.filter(
    (t) =>
      t.username.toLowerCase().includes(search.toLowerCase()) ||
      t.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-[#070b12] text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>BAN GIÁM SÁT GIẢI ĐẤU (COMPETITION ARBITRAGE)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin &amp; Arbitrage Panel</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Bamboozer Season 01 • Giám sát 68 Thí sinh • Ngưỡng Max Drawdown: {maxDrawdownLimit}%
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Xuất Thí Sinh (CSV)</span>
            </button>

            <button
              onClick={() => {
                exportTelemetryAsCsv();
                notify('Đã xuất toàn bộ log Telemetry chuyển đổi.');
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-mono text-emerald-300 border border-emerald-500/40 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Xuất Telemetry (CSV)</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Global Controls & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">TỔNG THÍ SINH</div>
              <div className="text-2xl font-mono font-bold text-white mt-0.5">{traders.length}</div>
            </div>
            <Users className="w-6 h-6 text-slate-600" />
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">ĐANG THI ĐẤU HỢP LỆ</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-0.5">
                {traders.filter((t) => t.status === 'Active').length}
              </div>
            </div>
            <CheckCircle2 className="w-6 h-6 text-emerald-500/40" />
          </div>

          <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">ĐÃ BỊ LOẠI (DISQUALIFIED)</div>
              <div className="text-2xl font-mono font-bold text-rose-400 mt-0.5">
                {traders.filter((t) => t.status === 'Disqualified').length}
              </div>
            </div>
            <XCircle className="w-6 h-6 text-rose-500/40" />
          </div>
        </div>

        {/* Search & Trader Management Table */}
        <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm thí sinh cần xử lý..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#05080e] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white outline-none"
              />
            </div>

            <div className="text-xs font-mono text-slate-400">
              Nhấn nút thao tác để Truất quyền hoặc Phục hồi quyền thi đấu tức thì.
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px]">
                  <th className="py-3 px-3"># HẠNG</th>
                  <th className="py-3 px-3">TRADER</th>
                  <th className="py-3 px-3">ROI</th>
                  <th className="py-3 px-3">PNL ($)</th>
                  <th className="py-3 px-3">MAX DD</th>
                  <th className="py-3 px-3">MÃ ĐỐI TÁC</th>
                  <th className="py-3 px-3">TRẠNG THÁI</th>
                  <th className="py-3 px-3 text-right">THAO TÁC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-300">#{t.rank}</td>
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-1.5">
                      <span>{t.username}</span>
                      <span>{t.countryFlag}</span>
                    </td>
                    <td className={`py-3 px-3 font-bold ${t.roi >= 0 ? 'text-[#00C076]' : 'text-rose-400'}`}>
                      {t.roi >= 0 ? '+' : ''}{t.roi.toFixed(2)}%
                    </td>
                    <td className="py-3 px-3 text-slate-200">${t.pnl.toFixed(2)}</td>
                    <td
                      className={`py-3 px-3 font-bold ${
                        t.maxDrawdown > 10 ? 'text-rose-400' : t.maxDrawdown > 7 ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {t.maxDrawdown.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-cyan-400 font-semibold">{t.kolRef ? 'Đã liên kết' : 'Mặc định'}</td>
                    <td className="py-3 px-3">
                      {t.status === 'Disqualified' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          Bị loại
                        </span>
                      ) : t.status === 'Warning' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Cảnh báo
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Hợp lệ
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {t.status === 'Disqualified' ? (
                        <button
                          onClick={() => handleToggleStatus(t.id)}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] cursor-pointer"
                        >
                          Phục hồi
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(t.id)}
                          className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] cursor-pointer"
                        >
                          Truất quyền
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
