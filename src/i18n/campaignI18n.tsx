import React from 'react';
import { useLanguage, Language } from '../i18n';
import { Globe } from 'lucide-react';

export const CAMPAIGN_TRANSLATIONS = {
  vi: {
    // Nav & Common
    home: 'Trang Chủ',
    backToCampaigns: 'Quay lại Chiến Dịch',
    backToHome: 'Quay lại Trang Chủ Bamboozer',
    season04LaunchNotice: 'MÙA 01 • KHỞI TRANH 10/10 (00:00)',
    campaignUrlLabel: 'Đường dẫn chiến dịch (URL):',
    copyShareLink: 'Sao chép link chia sẻ',
    copiedLink: 'Đã sao chép link chiến dịch!',
    directUrl: 'Đường dẫn:',
    copy: 'Sao chép',
    copied: 'Đã chép',
    close: 'Đóng',

    // Hub Header
    hubDirectoryTag: 'BAMBOOZER CAMPAIGN DIRECTORY // TRUNG TÂM CHIẾN DỊCH',
    hubTitleMain: 'Hệ Thống Giải Đấu &',
    hubTitleAccent: 'Chiến Dịch Trading',
    hubSubtitle: 'Cổng thông tin tập trung tất cả các giải đấu giao dịch định lượng (Quant Sprint), AI Trading Bot League và các đợt cấp vốn quỹ (Prop Firm Evaluation) của Bamboozer. Minh bạch kết quả thời gian thực với đầy đủ quyền lợi bảo trợ.',
    totalPrizePool: 'TỔNG GIẢI THƯỞNG',
    totalPrizePoolSub: 'USDT & Cấp vốn',
    participants: 'THÍ SINH THAM GIA',
    participantsSub: 'Trader toàn cầu',
    sponsorRef: 'LỆ PHÍ THAM GIA',
    sponsorRefSub: '100% Quyền lợi bảo trợ',

    // Featured Callout
    featuredLiveTag: 'SỰ KIỆN HOT ĐANG LIVE',
    season04Badge: 'MÙA 01 (14 NGÀY)',
    sprint04Name: '14-Day Trading Challenge',
    sprint04Pool: '$700 + Gói Pro VIP',
    sprint04Desc: 'Khởi tranh 10/10 lúc 00:00. Cuộc thi giao dịch trong 14 ngày dành cho Trader áp dụng Indicator & Strategy vào Live Trading.',
    enterSprint04: 'Vào Bảng Đấu Mùa 01',
    viewSpotlightPopup: 'Xem Popup Tiêu Điểm',

    // Filters
    filterAll: 'Tất cả',
    filterActive: 'Đang hoạt động',
    filterUpcoming: 'Sắp diễn ra',
    filterCompleted: 'Đã kết thúc',
    categoryLabel: 'Thể loại:',
    catAll: 'Tất cả thể loại',
    catFutures: 'Futures Sprint',
    catAiBot: 'AI Quant Bot',
    catProp: 'Cấp Vốn Prop',
    sortLabel: 'Sắp xếp:',
    sortDefault: 'Mặc định (Tiêu điểm trước)',
    sortPrizeDesc: 'Giải thưởng cao nhất ($)',
    sortParticipantsDesc: 'Nhiều thí sinh nhất',
    resetFilters: 'Đặt lại',
    searchPlaceholder: 'Tìm theo tên chiến dịch, cặp giao dịch...',
    showingCount: 'Đang hiển thị',
    campaignsWord: 'chiến dịch',
    noCampaignFound: 'Không tìm thấy chiến dịch phù hợp',
    noCampaignFoundDesc: 'Không có chiến dịch nào trùng khớp với bộ lọc & từ khóa hiện tại. Vui lòng thay đổi trạng thái hoặc từ khóa tìm kiếm.',
    viewAllCampaigns: 'Xem Tất Cả Chiến Dịch',
    featuredBadge: 'CHIẾN DỊCH TIÊU ĐIỂM (HOT)',
    quickRegister: 'Ghi Danh Nhanh',
    joinCampaign: 'Tham Gia Chiến Dịch',
    viewDetails: 'Xem Chi Tiết',
    refCodeNotice: 'Hệ thống bảo trợ độc quyền chính thức từ Bamboozer',

    // Sprint Challenge View & Bloomberg Hero
    bloombergSubtitle: 'CUỘC THI GIAO DỊCH 14 NGÀY • INDICATOR & STRATEGY',
    sprintMainTitle: 'Bamboozer 14-Day Trading Challenge',
    sprintDesc: 'Cuộc thi giao dịch trong 14 ngày dành cho Trader. Người tham gia tự xây dựng hoặc sử dụng Indicator, Strategy và áp dụng vào Live Trading. Đánh giá dựa trên lợi nhuận ròng kết hợp quản trị rủi ro.',
    countdownLaunchTitle: 'ĐẾM NGƯỢC KHỞI TRANH (10/10 - 00:00)',
    countdownLiveTitle: 'THỜI GIAN CÒN LẠI CỦA MÙA 01 (14 NGÀY)',
    countdownLiveBadge: 'COUNTDOWN LIVE',
    countdownLaunchBadge: 'KHỞI TRANH 10/10',
    days: 'NGÀY',
    hours: 'GIỜ',
    mins: 'PHÚT',
    secs: 'GIÂY',
    top1RewardTitle: 'PHẦN THƯỞNG GIẢI NHẤT (QUÁN QUÂN)',
    top1RewardValue: '$300 CASH + 3 THÁNG PRO',
    top1RewardBreakdown: '$300 Tiền Mặt + 3 Tháng Bamboozer Pro VIP',
    transparencyNotice: 'Hệ thống minh bạch 100%, kiểm tra lệnh trực tiếp qua API đối tác chính thức',
    registerNowBtn: 'GHI DANH THI ĐẤU NGAY',
    viewLeaderboardBtn: 'XEM BẢNG XẾP HẠNG',

    // Bamboozer Strategy Live Component
    telemetryTag: 'LIVE API TELEMETRY',
    telemetryTitle: 'Bảng Thông Số Chiến Lược Định Lượng Bamboozer',
    telemetryDesc: 'Dữ liệu hiệu suất thuật toán giao dịch thời gian thực: Win Rate, Profit Factor, Drawdown, Lịch lãi & Phân bổ chiến lược.',
    modeActive: 'Mùa 01 Live (Mẫu)',
    modeClean: 'Khởi Tạo ($1,000 Zero)',
    refreshTooltip: 'Làm mới số liệu API',
    connectApiBtn: 'Đấu Nối API Live',
    totalEquity: 'Total Equity',
    winRate: 'Win Rate',
    profitFactor: 'Profit Factor',
    maxDrawdown: 'Max Drawdown',
    totalTrades: 'Total Trades',
    runningStrategies: 'Running Strategies',
    winRateLabel: 'Tỉ lệ thắng',
    safeStatus: 'An Toàn (<10%)',
    noTradesYet: 'Chưa có lệnh',
    tabDrawdown: 'Drawdown Curve',
    tabCalendar: 'Profit Calendar',
    tabHourly: 'Hourly Distribution',
    tabAllocation: 'Strategy Allocation',
    tabRanking: 'Strategy Ranking',
    equityProgressionTitle: 'ĐƯỜNG CONG TĂNG TRƯỞNG VỐN & DRAWDOWN THỜI GIAN THỰC',
    maxAllowedDdNotice: '| Max allowed drawdown: 10.0%',
    equityLegend: 'Equity (Vốn $)',
    drawdownLegend: 'Drawdown %',
    calendarTitle: 'LỊCH LỢI NHUẬN THEO NGÀY (PROFIT CALENDAR)',
    calendarSub: 'Tháng 10/2026 • 14-Day Challenge Season 01',
    noDataCalendar: 'Chưa có dữ liệu giao dịch',
    hourlyTitle: 'PHÂN BỐ TẦN SUẤT GIAO DỊCH THEO 24 KHUNG GIỜ (UTC+7)',
    hourlySub: 'Giờ hoạt động hiệu quả nhất: 14:00 - 20:00',
    allocationTitle: 'TỶ TRỌNG QUẢN LÝ DANH MỤC THUẬT TOÁN',
    rankingTitle: 'BẢNG XẾP HẠNG THUẬT TOÁN ĐANG CHẠY (STRATEGY RANKING)',
    onChainVerified: '100% On-Chain & Exchange API',
    noStrategyData: 'Chưa có bot chiến lược nào được kích hoạt',
    partnerVerifiedFooter: 'Hệ thống bảo trợ đối tác Bamboozer. Cổng dữ liệu chuẩn hóa qua WebSocket Stream.',
    checkBamboozerLiveLink: 'Kiểm tra trên Bamboozer Live',

    // Leaderboard Section
    leaderboardTag: 'LIVE SCORING ARBITRAGE // BẢNG XẾP HẠNG THỜI GIAN THỰC',
    leaderboardTitle: 'Bảng Xếp Hạng Thí Sinh Mùa 01',
    leaderboardDesc: 'Dữ liệu được cập nhật tự động từ kết nối sàn. Thí sinh vi phạm Max Drawdown > 10% sẽ bị đánh dấu loại. Nhấp vào "Xem lệnh" để kiểm tra lịch sử chi tiết.',
    thRank: 'Hạng',
    thTrader: 'Thí sinh',
    thStartCapital: 'Vốn khởi điểm',
    thCurrentEquity: 'Vốn hiện tại',
    thPnl: 'Lợi nhuận (P&L)',
    thRoi: 'Tỷ suất ROI',
    thMaxDd: 'Max Drawdown',
    thWinRate: 'Tỉ lệ thắng',
    thTrades: 'Số lệnh',
    thAction: 'Thao tác',
    btnViewTrades: 'Xem lệnh',
    btnJoinLeaderboard: 'Đăng Ký Thi Đấu (Miễn Phí)',

    // Active Campaign Modal
    modalTitleSeason04: 'Bamboozer 14-Day Trading Challenge Season 01',
    modalDescSeason04: 'Cuộc thi giao dịch trong 14 ngày dành cho Trader áp dụng Indicator & Strategy vào Live Trading từ 10/10 đến 24/10/2026. Tổng quỹ thưởng $700 Tiền Mặt + Bản quyền Pro VIP.',
    prizeStructureTitle: 'CƠ CẤU GIẢI THƯỞNG 14-DAY CHALLENGE',
    rule1: 'Giao dịch tối thiểu 10 lệnh',
    rule2: 'Sụt giảm Max DD ≤ 10.0%',
    rule3: 'Đòn bẩy tối đa 20x',
    rule4: 'Tự động cập nhật bảng xếp hạng',
    btnRegisterJoin: 'Đăng Ký Tham Gia Ngay (0đ)',
    btnViewBoardModal: 'Xem Bảng Xếp Hạng Live',
  },

  en: {
    // Nav & Common
    home: 'Home',
    backToCampaigns: 'Back to Campaigns',
    backToHome: 'Back to Bamboozer Home',
    season04LaunchNotice: 'SEASON 01 • LAUNCHES OCT 10 (00:00)',
    campaignUrlLabel: 'Campaign Route (URL):',
    copyShareLink: 'Copy Share Link',
    copiedLink: 'Campaign Link Copied!',
    directUrl: 'Direct URL:',
    copy: 'Copy',
    copied: 'Copied',
    close: 'Close',

    // Hub Header
    hubDirectoryTag: 'BAMBOOZER CAMPAIGN DIRECTORY // QUANT & SPRINT HUB',
    hubTitleMain: 'Trading Tournaments &',
    hubTitleAccent: 'Sprint Campaigns',
    hubSubtitle: 'The central hub for all Bamboozer quantitative trading sprints, AI trading bot leagues, and prop firm capital evaluations. 100% transparent real-time verified results.',
    totalPrizePool: 'TOTAL PRIZE POOL',
    totalPrizePoolSub: 'USDT & Funded Capital',
    participants: 'PARTICIPANTS',
    participantsSub: 'Global Traders',
    sponsorRef: 'ENTRY FEE',
    sponsorRefSub: '100% Free Entry & Benefits',

    // Featured Callout
    featuredLiveTag: 'FEATURED LIVE CHALLENGE',
    season04Badge: 'SEASON 01 (14-DAY)',
    sprint04Name: '14-Day Trading Challenge',
    sprint04Pool: '$700 + Pro VIP Licenses',
    sprint04Desc: 'Launches Oct 10 at 00:00. 14-day competition for traders applying Indicators & Strategies to Live Trading.',
    enterSprint04: 'Enter Season 01 Challenge',
    viewSpotlightPopup: 'View Spotlight Popup',

    // Filters
    filterAll: 'All',
    filterActive: 'Active',
    filterUpcoming: 'Upcoming',
    filterCompleted: 'Completed',
    categoryLabel: 'Category:',
    catAll: 'All Categories',
    catFutures: 'Futures Sprint',
    catAiBot: 'AI Bot League',
    catProp: 'Prop Evaluation',
    sortLabel: 'Sort by:',
    sortDefault: 'Default (Featured First)',
    sortPrizeDesc: 'Highest Prize Pool ($)',
    sortParticipantsDesc: 'Most Participants',
    resetFilters: 'Reset',
    searchPlaceholder: 'Search campaign title or category...',
    showingCount: 'Showing',
    campaignsWord: 'campaigns',
    noCampaignFound: 'No Matching Campaigns Found',
    noCampaignFoundDesc: 'No campaigns match the current filter and search query. Please adjust your filters or search terms.',
    viewAllCampaigns: 'View All Campaigns',
    featuredBadge: 'FEATURED CAMPAIGN (HOT)',
    quickRegister: 'Quick Register',
    joinCampaign: 'Join Campaign',
    viewDetails: 'View Details',
    refCodeNotice: 'Official verified partner benefits included',

    // Sprint Challenge View & Bloomberg Hero
    bloombergSubtitle: '14-DAY TRADING CHALLENGE • INDICATOR & STRATEGY',
    sprintMainTitle: 'Bamboozer 14-Day Trading Challenge',
    sprintDesc: 'A 14-day live trading competition for traders applying custom or built-in Indicators and Strategies to Live Trading. Evaluated on Net Profit & Risk Management.',
    countdownLaunchTitle: 'LAUNCH COUNTDOWN (OCT 10 - 00:00)',
    countdownLiveTitle: 'SEASON 01 TIME REMAINING (14 DAYS)',
    countdownLiveBadge: 'COUNTDOWN LIVE',
    countdownLaunchBadge: 'LAUNCHES OCT 10',
    days: 'DAYS',
    hours: 'HOURS',
    mins: 'MINS',
    secs: 'SECS',
    top1RewardTitle: 'TOP 1 CHAMPION PRIZE',
    top1RewardValue: '$300 CASH + 3-MO PRO VIP',
    top1RewardBreakdown: '$300 Cash + 3 Months Bamboozer Pro VIP',
    transparencyNotice: '100% transparent system, live trade verification via partner API',
    registerNowBtn: 'REGISTER & JOIN CHALLENGE',
    viewLeaderboardBtn: 'VIEW LIVE LEADERBOARD',

    // Bamboozer Strategy Live Component
    telemetryTag: 'LIVE API TELEMETRY',
    telemetryTitle: 'Bamboozer Quantitative Strategy Live Metrics',
    telemetryDesc: 'Real-time algorithmic trading performance metrics: Win Rate, Profit Factor, Drawdown, Profit Calendar & Strategy Allocation.',
    modeActive: 'Season 01 Live (Demo)',
    modeClean: 'Initial State ($1,000 Zero)',
    refreshTooltip: 'Refresh API Metrics',
    connectApiBtn: 'Connect Live API',
    totalEquity: 'Total Equity',
    winRate: 'Win Rate',
    profitFactor: 'Profit Factor',
    maxDrawdown: 'Max Drawdown',
    totalTrades: 'Total Trades',
    runningStrategies: 'Running Strategies',
    winRateLabel: 'Win Rate',
    safeStatus: 'Safe (<10%)',
    noTradesYet: 'No Trades Yet',
    tabDrawdown: 'Drawdown Curve',
    tabCalendar: 'Profit Calendar',
    tabHourly: 'Hourly Distribution',
    tabAllocation: 'Strategy Allocation',
    tabRanking: 'Strategy Ranking',
    equityProgressionTitle: 'REAL-TIME EQUITY PROGRESSION & DRAWDOWN CURVE',
    maxAllowedDdNotice: '| Max allowed drawdown: 10.0%',
    equityLegend: 'Equity ($ USD)',
    drawdownLegend: 'Drawdown %',
    calendarTitle: 'DAILY PROFIT CALENDAR (HEATMAP)',
    calendarSub: 'October 2026 • 14-Day Challenge Season 01',
    noDataCalendar: 'No trade data available yet',
    hourlyTitle: '24-HOUR TRADE FREQUENCY & WIN-RATE DISTRIBUTION (UTC+7)',
    hourlySub: 'Peak performance window: 14:00 - 20:00',
    allocationTitle: 'ALGORITHMIC PORTFOLIO ALLOCATION',
    rankingTitle: 'RUNNING STRATEGY RANKING (SUB-BOTS)',
    onChainVerified: '100% On-Chain & Exchange API',
    noStrategyData: 'No strategy bots active yet',
    partnerVerifiedFooter: 'Official Bamboozer partner system. Standardized via WebSocket Telemetry Feed.',
    checkBamboozerLiveLink: 'Verify on Bamboozer Live',

    // Leaderboard Section
    leaderboardTag: 'LIVE SCORING ARBITRAGE // REAL-TIME LEADERBOARD',
    leaderboardTitle: 'Season 01 Participant Leaderboard',
    leaderboardDesc: 'Live data synced automatically from personal exchange connections. Traders breaching Max Drawdown > 10% are disqualified. Click "View Trades" to audit execution history.',
    thRank: 'Rank',
    thTrader: 'Trader',
    thStartCapital: 'Start Capital',
    thCurrentEquity: 'Current Equity',
    thPnl: 'Net P&L',
    thRoi: 'ROI (%)',
    thMaxDd: 'Max DD',
    thWinRate: 'Win Rate',
    thTrades: 'Trades',
    thAction: 'Action',
    btnViewTrades: 'View Trades',
    btnJoinLeaderboard: 'Join Challenge (Free Entry)',

    // Active Campaign Modal
    modalTitleSeason04: 'Bamboozer 14-Day Trading Challenge Season 01',
    modalDescSeason04: 'The 14-day indicator & strategy trading competition officially commences at 00:00 on October 10, 2026. Real-time verified results via WebSocket feed with a total prize pool of $700 Cash and Pro VIP licenses.',
    prizeStructureTitle: '14-DAY CHALLENGE PRIZE STRUCTURE',
    rule1: 'Minimum 10 trades required',
    rule2: 'Max Drawdown limit ≤ 10.0%',
    rule3: 'Max leverage 20x',
    rule4: 'Automated leaderboard sync',
    btnRegisterJoin: 'Register to Participate (Free)',
    btnViewBoardModal: 'View Live Leaderboard',
  },

  zh: {
    // Nav & Common
    home: '首页',
    backToCampaigns: '返回活动中心',
    backToHome: '返回 Bamboozer 首页',
    season04LaunchNotice: '第01赛季 • 10月10日 (00:00) 正式开赛',
    campaignUrlLabel: '活动直达链接 (URL):',
    copyShareLink: '复制分享链接',
    copiedLink: '已复制活动链接！',
    directUrl: '链接:',
    copy: '复制',
    copied: '已复制',
    close: '关闭',

    // Hub Header
    hubDirectoryTag: 'BAMBOOZER 活动中心 // 量化冲刺锦标赛',
    hubTitleMain: '量化交易锦标赛 &',
    hubTitleAccent: '竞技活动中心',
    hubSubtitle: '汇聚 Bamboozer 所有量化冲刺赛 (Quant Sprint)、AI 交易机器人联赛及自营交易员评估 (Prop Firm Evaluation)。实时数据透明公开，官方保障。',
    totalPrizePool: '总奖金池',
    totalPrizePoolSub: 'USDT 及资助账户',
    participants: '参赛交易员',
    participantsSub: '全球量化选手',
    sponsorRef: '参赛费用',
    sponsorRefSub: '100% 免费参赛',

    // Featured Callout
    featuredLiveTag: '焦点活动热赛中',
    season04Badge: '第 01 赛季 (14天)',
    sprint04Name: '14天量化交易挑战赛',
    sprint04Pool: '$700 + Pro VIP 奖池',
    sprint04Desc: '10月10日 00:00 准时开赛。为期14天的实盘交易挑战，参赛者自主构建或运用指标与策略。',
    enterSprint04: '进入第01赛季战局',
    viewSpotlightPopup: '查看焦点弹窗',

    // Filters
    filterAll: '全部',
    filterActive: '进行中',
    filterUpcoming: '即将开始',
    filterCompleted: '已结束',
    categoryLabel: '分类:',
    catAll: '全部分类',
    catFutures: '合约冲刺',
    catAiBot: 'AI 机器人联赛',
    catProp: '资金评估考核',
    sortLabel: '排序:',
    sortDefault: '默认 (推荐优先)',
    sortPrizeDesc: '奖金最高 ($)',
    sortParticipantsDesc: '参赛人数最多',
    resetFilters: '重置',
    searchPlaceholder: '搜索活动名称或分类...',
    showingCount: '正在展示',
    campaignsWord: '个活动',
    noCampaignFound: '未找到符合条件的活动',
    noCampaignFoundDesc: '暂无与当前筛选器匹配的活动。请调整筛选条件或搜索关键词。',
    viewAllCampaigns: '查看所有活动',
    featuredBadge: '焦点推荐 (HOT)',
    quickRegister: '快速报名',
    joinCampaign: '参加活动',
    viewDetails: '查看详情',
    refCodeNotice: '官方合作保荐专享权益已包含',

    // Sprint Challenge View & Bloomberg Hero
    bloombergSubtitle: '14天实盘交易挑战赛 • 指标与策略',
    sprintMainTitle: 'Bamboozer 14天交易挑战赛',
    sprintDesc: '为期 14 天的实盘交易竞技赛。参赛者运用指标与策略进行实盘交易，综合净收益率与风控表现评定优胜者。',
    countdownLaunchTitle: '开赛倒计时 (10月10日 - 00:00)',
    countdownLiveTitle: '第01赛季剩余时间 (14天)',
    countdownLiveBadge: '实时倒计时',
    countdownLaunchBadge: '10月10日开赛',
    days: '天',
    hours: '时',
    mins: '分',
    secs: '秒',
    top1RewardTitle: '第 1 名冠军奖项',
    top1RewardValue: '$300 现金 + 3个月 Pro VIP',
    top1RewardBreakdown: '$300 现金 + 3个月 Bamboozer Pro VIP',
    transparencyNotice: '100% 透明数据，通过官方合作 API 实时核验',
    registerNowBtn: '立即报名参赛',
    viewLeaderboardBtn: '查看实时排行榜',

    // Strategy Live Component
    telemetryTag: 'LIVE API TELEMETRY',
    telemetryTitle: 'Bamboozer 量化策略实时遥测数据',
    telemetryDesc: '实时交易算法表现指标：胜率、盈亏比、最大回撤、盈利日历及资产配置分布。',
    modeActive: '第01赛季实时 (演示)',
    modeClean: '初始账户 ($1,000 Zero)',
    refreshTooltip: '刷新数据',
    connectApiBtn: '连接实时 API',
    totalEquity: '账户总资产',
    winRate: '胜率 (Win Rate)',
    profitFactor: '获利因子 (Profit Factor)',
    maxDrawdown: '最大回撤 (Max DD)',
    totalTrades: '总交易笔数',
    runningStrategies: '运行中策略',
    winRateLabel: '胜率',
    safeStatus: '安全 (<10%)',
    noTradesYet: '暂无订单',
    tabDrawdown: '回撤曲线 (Drawdown)',
    tabCalendar: '盈利日历 (Calendar)',
    tabHourly: '时段分布 (Hourly)',
    tabAllocation: '策略配置 (Allocation)',
    tabRanking: '策略排行 (Ranking)',
    equityProgressionTitle: '资金净值增长与实时回撤曲线',
    maxAllowedDdNotice: '| 最大允许回撤: 10.0%',
    equityLegend: '净值 (USD)',
    drawdownLegend: '回撤 %',
    calendarTitle: '每日盈利日历 (热力图)',
    calendarSub: '2026年10月 • 第01赛季冲刺',
    noDataCalendar: '暂无交易数据',
    hourlyTitle: '24小时交易频率与胜率分布 (UTC+7)',
    hourlySub: '最佳收益交易时段: 14:00 - 20:00',
    allocationTitle: '量化策略资产配置比例',
    rankingTitle: '当前运行策略排行',
    onChainVerified: '100% 链上与交易所 API 验证',
    noStrategyData: '尚未激活策略机器人',
    partnerVerifiedFooter: 'Bamboozer 官方合作保障体系。通过 WebSocket 数据流标准化。',
    checkBamboozerLiveLink: '在 Bamboozer Live 上核验',

    // Leaderboard Section
    leaderboardTag: 'LIVE SCORING ARBITRAGE // 实时竞技榜',
    leaderboardTitle: '第01赛季选手排行榜',
    leaderboardDesc: '数据自动从交易所同步。最大回撤超过 10% 的选手将被判定出局。点击“查看订单”核对历史操作。',
    thRank: '排名',
    thTrader: '参赛选手',
    thStartCapital: '初始资金',
    thCurrentEquity: '当前净值',
    thPnl: '总盈亏 (P&L)',
    thRoi: '收益率 (ROI)',
    thMaxDd: '最大回撤',
    thWinRate: '胜率',
    thTrades: '交易笔数',
    thAction: '操作',
    btnViewTrades: '查看订单',
    btnJoinLeaderboard: '报名冲刺 (免费参赛)',

    // Active Campaign Modal
    modalTitleSeason04: 'Bamboozer 14天交易挑战赛 第01赛季',
    modalDescSeason04: '为期14天的指标与策略实盘交易挑战赛将于2026年10月10日 00:00 正式打响。实时 WebSocket 数据呈现，总奖金 $700 现金及 Pro VIP 会员。',
    prizeStructureTitle: '14天挑战赛奖池配置',
    rule1: '最少完成 10 笔订单',
    rule2: '最大回撤控制 ≤ 10.0%',
    rule3: '最高允许杠杆 20x',
    rule4: '排行榜全自动实时同步',
    btnRegisterJoin: '立即报名参赛 (免费)',
    btnViewBoardModal: '查看实时排行榜',
  }
};

/**
 * Hook to access campaign translations effortlessly
 */
export function useCampaignI18n() {
  const { language, setLanguage } = useLanguage();
  const t = CAMPAIGN_TRANSLATIONS[language] || CAMPAIGN_TRANSLATIONS.en;
  return { t, language, setLanguage };
}

/**
 * Reusable sleek Language Switcher component for Campaign header bars
 */
export const CampaignLanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-1 bg-[#0b1220] border border-slate-800 rounded-xl p-1 text-xs font-mono ${className}`}>
      <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0" />
      {(['en', 'vi', 'zh'] as Language[]).map((lang) => {
        const isActive = language === lang;
        const labels: Record<Language, string> = {
          en: 'EN',
          vi: 'VI',
          zh: '中文',
        };

        return (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isActive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {labels[lang]}
          </button>
        );
      })}
    </div>
  );
};
