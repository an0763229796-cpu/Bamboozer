import React, { useState, useMemo } from 'react';
import { CampaignSummary } from '../../types';
import { ALL_CAMPAIGNS, CURRENT_SEASON } from '../../data/mockData';
import { trackAndOpenAffiliate } from '../../services/telemetryDb';
import {
  Trophy,
  Flame,
  Calendar,
  Users,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  SlidersHorizontal,
  X,
  TrendingUp,
  Award,
  ChevronRight,
  RotateCcw,
  Zap,
  Link as LinkIcon,
  Copy,
  Check,
} from 'lucide-react';
import { getAbsoluteCampaignUrl } from '../../utils/urlRouter';

interface CampaignsHubViewProps {
  onSelectSprintChallenge: () => void;
  onOpenRegisterModal: () => void;
  onOpenActiveEventPopup?: () => void;
  onBackToLanding?: () => void;
}

type StatusFilterType = 'ALL' | 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
type CategoryFilterType = 'ALL' | 'Futures & Spot Sprint' | 'Automated Bot League' | 'Prop Evaluation' | 'Archive';
type SortOption = 'DEFAULT' | 'PRIZE_DESC' | 'PARTICIPANTS_DESC';

export const CampaignsHubView: React.FC<CampaignsHubViewProps> = ({
  onSelectSprintChallenge,
  onOpenRegisterModal,
  onOpenActiveEventPopup,
  onBackToLanding,
}) => {
  // Filter & Search State
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('DEFAULT');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleCopyLink = (slug: string) => {
    const url = getAbsoluteCampaignUrl(slug);
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // Count calculations
  const counts = useMemo(() => {
    return {
      all: ALL_CAMPAIGNS.length,
      active: ALL_CAMPAIGNS.filter((c) => c.status === 'ACTIVE').length,
      upcoming: ALL_CAMPAIGNS.filter((c) => c.status === 'UPCOMING').length,
      completed: ALL_CAMPAIGNS.filter((c) => c.status === 'COMPLETED').length,
    };
  }, []);

  // Filter and sort logic
  const filteredCampaigns = useMemo(() => {
    let list = ALL_CAMPAIGNS.filter((camp) => {
      // 1. Status Filter
      if (statusFilter !== 'ALL' && camp.status !== statusFilter) {
        return false;
      }
      // 2. Category Filter
      if (categoryFilter !== 'ALL' && camp.category !== categoryFilter) {
        return false;
      }
      // 3. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = camp.title.toLowerCase().includes(q);
        const matchesSubtitle = camp.subtitle.toLowerCase().includes(q);
        const matchesCategory = camp.category.toLowerCase().includes(q);
        const matchesRef = camp.affiliateRef.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesCategory && !matchesRef) {
          return false;
        }
      }
      return true;
    });

    // Sort
    if (sortBy === 'PRIZE_DESC') {
      list = [...list].sort((a, b) => b.prizePoolUsdt - a.prizePoolUsdt);
    } else if (sortBy === 'PARTICIPANTS_DESC') {
      list = [...list].sort((a, b) => b.participantsCount - a.participantsCount);
    } else {
      // DEFAULT: Featured first, then active, then upcoming, then completed
      list = [...list].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }

    return list;
  }, [statusFilter, categoryFilter, searchQuery, sortBy]);

  const totalPrizePool = useMemo(() => ALL_CAMPAIGNS.reduce((acc, c) => acc + c.prizePoolUsdt, 0), []);
  const totalParticipants = useMemo(() => ALL_CAMPAIGNS.reduce((acc, c) => acc + c.participantsCount, 0), []);

  const hasActiveFilters = statusFilter !== 'ALL' || categoryFilter !== 'ALL' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setStatusFilter('ALL');
    setCategoryFilter('ALL');
    setSearchQuery('');
    setSortBy('DEFAULT');
  };

  return (
    <div className="bg-[#070b12] text-white min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Navigation Bar */}
        {onBackToLanding && (
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            >
              <span>← Quay lại Trang Chủ Bamboozer</span>
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>HỆ THỐNG GIẢI ĐẤU MÙA 04</span>
            </div>
          </div>
        )}

        {/* Hub Header & Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a151b] via-[#09111c] to-[#120f26] border border-slate-800/90 p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BAMBOOZER CAMPAIGN DIRECTORY // TRUNG TÂM CHIẾN DỊCH</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                Hệ Thống Giải Đấu &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C076] via-teal-300 to-cyan-400">
                  Chiến Dịch Trading
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                Cổng thông tin tập trung tất cả các giải đấu giao dịch định lượng (Quant Sprint), AI Trading Bot League và các đợt cấp vốn quỹ (Prop Firm Evaluation) của Bamboozer. Minh bạch kết quả thời gian thực với mã bảo trợ độc quyền <strong className="text-emerald-400 font-mono">ref=81</strong>.
              </p>

              {/* Aggregated Highlights */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 font-mono text-xs max-w-xl">
                <div className="bg-[#05080e]/90 border border-slate-800 rounded-xl p-3 sm:p-3.5">
                  <div className="text-slate-400 text-[10px] sm:text-[11px]">TỔNG GIẢI THƯỞNG</div>
                  <div className="text-lg sm:text-2xl font-bold text-[#00C076] mt-0.5">
                    ${totalPrizePool.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500">USDT &amp; Cấp vốn</div>
                </div>

                <div className="bg-[#05080e]/90 border border-slate-800 rounded-xl p-3 sm:p-3.5">
                  <div className="text-slate-400 text-[10px] sm:text-[11px]">THÍ SINH THAM GIA</div>
                  <div className="text-lg sm:text-2xl font-bold text-white mt-0.5">
                    {totalParticipants}+
                  </div>
                  <div className="text-[10px] text-slate-500">Trader toàn cầu</div>
                </div>

                <div className="bg-[#05080e]/90 border border-slate-800 rounded-xl p-3 sm:p-3.5">
                  <div className="text-slate-400 text-[10px] sm:text-[11px]">MÃ BẢO TRỢ</div>
                  <div className="text-lg sm:text-2xl font-bold text-amber-400 mt-0.5">ref=81</div>
                  <div className="text-[10px] text-slate-500">Miễn phí tham dự</div>
                </div>
              </div>
            </div>

            {/* Featured Event Live Callout Card */}
            <div className="w-full lg:w-80 shrink-0 bg-[#070c17]/95 border border-emerald-500/40 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                  SỰ KIỆN HOT ĐANG LIVE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  MÙA 04
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-white leading-snug">
                  7-Day Trading Sprint Challenge
                </h2>
                <div className="text-xl font-mono font-black text-[#00C076] mt-1">
                  $1,140 USDT Pool
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Còn 4 ngày để ghi danh và tranh tài top 10 nhận thưởng tiền mặt.
                </p>
              </div>

              <div className="space-y-2 pt-1 font-mono text-xs">
                <button
                  onClick={onSelectSprintChallenge}
                  className="w-full py-2.5 rounded-xl font-bold text-black bg-[#00C076] hover:bg-[#00d684] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#00C076]/25"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Vào Bảng Đấu Mùa 04</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onOpenActiveEventPopup && (
                  <button
                    onClick={onOpenActiveEventPopup}
                    className="w-full py-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer flex items-center justify-center gap-1 text-[11px]"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Xem Popup Tiêu Điểm</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMPREHENSIVE FILTER BAR (THANH LỌC CHIẾN DỊCH CHUYÊN NGHIỆP) */}
        {/* ======================================================== */}
        <div
          id="campaigns-filter-bar"
          className="bg-[#0b101c] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4"
        >
          {/* Top Row: Main Status Tabs & Search Field */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Status Filter Tabs (Tất cả, Đang hoạt động, Sắp diễn ra, Đã kết thúc) */}
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 bg-[#060a12] p-1.5 rounded-xl border border-slate-800/90 font-mono text-xs">
              {/* ALL */}
              <button
                id="filter-status-all"
                onClick={() => setStatusFilter('ALL')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  statusFilter === 'ALL'
                    ? 'bg-[#00C076] text-black font-bold shadow-md shadow-[#00C076]/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Tất cả</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    statusFilter === 'ALL' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {counts.all}
                </span>
              </button>

              {/* ACTIVE - Đang hoạt động */}
              <button
                id="filter-status-active"
                onClick={() => setStatusFilter('ACTIVE')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  statusFilter === 'ACTIVE'
                    ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Đang hoạt động</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    statusFilter === 'ACTIVE' ? 'bg-black/25 text-black' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}
                >
                  {counts.active}
                </span>
              </button>

              {/* UPCOMING - Sắp diễn ra */}
              <button
                id="filter-status-upcoming"
                onClick={() => setStatusFilter('UPCOMING')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  statusFilter === 'UPCOMING'
                    ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Sắp diễn ra</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    statusFilter === 'UPCOMING' ? 'bg-black/25 text-black' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {counts.upcoming}
                </span>
              </button>

              {/* COMPLETED - Đã kết thúc */}
              <button
                id="filter-status-completed"
                onClick={() => setStatusFilter('COMPLETED')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  statusFilter === 'COMPLETED'
                    ? 'bg-slate-300 text-black font-bold shadow-md shadow-slate-300/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã kết thúc</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    statusFilter === 'COMPLETED' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {counts.completed}
                </span>
              </button>
            </div>

            {/* Live Search Input Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="campaign-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên, thể loại, hoặc mã ref..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#060a12] border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  title="Xóa tìm kiếm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Secondary Filters (Category & Sorting) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
            {/* Category Pills */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-slate-400 text-[11px] flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3 h-3" />
                Thể loại:
              </span>

              {[
                { label: 'Tất cả thể loại', value: 'ALL' },
                { label: 'Futures Sprint', value: 'Futures & Spot Sprint' },
                { label: 'AI Quant Bot', value: 'Automated Bot League' },
                { label: 'Cấp Vốn Prop', value: 'Prop Evaluation' },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value as CategoryFilterType)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${
                    categoryFilter === cat.value
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown & Reset */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span>Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-[#060a12] border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer font-mono"
                >
                  <option value="DEFAULT">Mặc định (Tiêu điểm trước)</option>
                  <option value="PRIZE_DESC">Giải thưởng cao nhất ($)</option>
                  <option value="PARTICIPANTS_DESC">Nhiều thí sinh nhất</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Đặt lại</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Result Counter Header */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <div>
            Đang hiển thị{' '}
            <span className="font-bold text-white">{filteredCampaigns.length}</span> /{' '}
            {ALL_CAMPAIGNS.length} chiến dịch
            {statusFilter !== 'ALL' && (
              <span className="text-emerald-400 font-bold ml-1">
                • [
                {statusFilter === 'ACTIVE'
                  ? 'Đang hoạt động'
                  : statusFilter === 'UPCOMING'
                  ? 'Sắp diễn ra'
                  : 'Đã kết thúc'}
                ]
              </span>
            )}
          </div>

          <div className="hidden sm:block text-[11px] text-slate-500">
            Hệ thống bảo trợ độc quyền mã giới thiệu: <strong>ref=81</strong>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CAMPAIGNS GRID */}
        {/* ======================================================== */}
        {filteredCampaigns.length === 0 ? (
          /* Empty State */
          <div className="bg-[#0b101c] border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Không tìm thấy chiến dịch phù hợp</h3>
            <p className="text-xs text-slate-400 font-sans">
              Không có chiến dịch nào trùng khớp với bộ lọc &amp; từ khóa hiện tại. Vui lòng thay đổi trạng thái hoặc từ khóa tìm kiếm.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl font-mono text-xs font-bold text-black bg-[#00C076] hover:bg-[#00d684] cursor-pointer transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xem Tất Cả Chiến Dịch</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCampaigns.map((camp) => {
              const isFeatured = camp.featured;
              const isSprintS4 = camp.id === 'campaign-sprint-s4';
              const isActive = camp.status === 'ACTIVE';
              const isUpcoming = camp.status === 'UPCOMING';
              const isCompleted = camp.status === 'COMPLETED';

              return (
                <div
                  key={camp.id}
                  className={`group relative rounded-3xl bg-[#0a101d] border ${
                    isFeatured
                      ? 'border-emerald-500/60 shadow-2xl shadow-emerald-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  } p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5`}
                >
                  {/* Top Ambient Glow for Featured */}
                  {isFeatured && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[90px] pointer-events-none" />
                  )}

                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute -top-3 left-6 sm:left-8 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-black font-mono font-black text-[11px] px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 tracking-wider">
                      <Flame className="w-3.5 h-3.5 fill-black" />
                      <span>CHIẾN DỊCH TIÊU ĐIỂM (HOT)</span>
                    </div>
                  )}

                  <div>
                    {/* Status Pill & Category */}
                    <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                          isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : isUpcoming
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                        {camp.badgeText}
                      </span>

                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 bg-[#05080e] px-2.5 py-1 rounded-lg border border-slate-800">
                        <Layers className="w-3 h-3 text-cyan-400" />
                        {camp.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                      {camp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                      {camp.subtitle}
                    </p>

                    {/* Metrics Box */}
                    <div className="bg-[#05080e]/95 rounded-2xl p-4 sm:p-5 border border-slate-800/90 mb-6 font-mono grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-slate-400 text-[10px] tracking-wider uppercase">
                          TỔNG QUỸ THƯỞNG
                        </div>
                        <div className="text-xl font-black text-[#00C076] mt-0.5">
                          {camp.prizePoolFormatted}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {isSprintS4 ? 'Tiền mặt + Pro VIP' : 'Cấp vốn & USDT'}
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-400 text-[10px] tracking-wider uppercase">
                          THÍ SINH THAM GIA
                        </div>
                        <div className="text-xl font-black text-white mt-0.5 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-cyan-400" />
                          {camp.participantsCount} Traders
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Toàn cầu</div>
                      </div>

                      <div className="col-span-2 pt-3 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {camp.startDate} → {camp.endDate}
                        </span>
                        <span>
                          Mã ref bảo trợ:{' '}
                          <strong className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            {camp.affiliateRef}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Direct Canonical Route / URL Badge */}
                    <div className="flex items-center justify-between text-[11px] font-mono px-3 py-2 rounded-xl bg-[#05080e] border border-slate-800/90 text-slate-400 mb-5">
                      <div className="flex items-center gap-1.5 truncate">
                        <LinkIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-500">Đường dẫn:</span>
                        <code className="text-emerald-400 font-bold truncate">/campaign/{camp.slug}</code>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyLink(camp.slug);
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-mono cursor-pointer transition-colors shrink-0 ml-2"
                        title="Sao chép đường dẫn chia sẻ"
                      >
                        {copiedSlug === camp.slug ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="space-y-2 pt-2">
                    {isSprintS4 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          onClick={onSelectSprintChallenge}
                          className="w-full py-3 rounded-xl font-mono font-bold text-xs text-black bg-[#00C076] hover:bg-[#00d684] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#00C076]/25"
                        >
                          <Trophy className="w-4 h-4" />
                          <span>VÀO SPRINT MÙA 04</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={onOpenRegisterModal}
                          className="w-full py-3 rounded-xl font-mono text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Ghi Danh Nhanh</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          onClick={() =>
                            trackAndOpenAffiliate(
                              `Campaign_${camp.id}_Join`,
                              'challenge_join',
                              camp.affiliateRef
                            )
                          }
                          className={`w-full py-3 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isActive
                              ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                              : isUpcoming
                              ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                          }`}
                        >
                          <span>
                            {isActive
                              ? 'Đăng Ký Tham Gia'
                              : isUpcoming
                              ? 'Đặt Chỗ Sớm'
                              : 'Xem Lại Kết Quả'}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (isCompleted) {
                              alert(`Chiến dịch "${camp.title}" đã hoàn tất trao giải $1,140 USDT cho Top 3 và Quán Quân.`);
                            } else {
                              alert(`Chiến dịch "${camp.title}" đang được cấu hình tài liệu kỹ thuật & API riêng.`);
                            }
                          }}
                          className="w-full py-3 rounded-xl font-mono text-xs text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                        >
                          {isCompleted ? 'Lịch Sử Mùa 03' : 'Xem Thể Lệ'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
