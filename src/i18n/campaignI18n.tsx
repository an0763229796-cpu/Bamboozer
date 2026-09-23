import React from 'react';
import { useLanguage, Language } from '../i18n';
import { Globe } from 'lucide-react';

export const CAMPAIGN_TRANSLATIONS = {
  vi: {
    // Nav & Common
    home: 'Trang Chủ',
    backToCampaigns: 'Quay lại Chiến Dịch',
    backToHome: 'Quay lại Trang Chủ Bamboozer',
    season04LaunchNotice: 'MÙA 04 • KHỞI TRANH 10/10 (00:00)',
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
    hubSubtitle: 'Cổng thông tin tập trung tất cả các giải đấu giao dịch định lượng (Quant Sprint), AI Trading Bot League và các đợt cấp vốn quỹ (Prop Firm Evaluation) của Bamboozer. Minh bạch kết quả thời gian thực với mã bảo trợ độc quyền ref=81.',
    totalPrizePool: 'TỔNG GIẢI THƯỞNG',
    totalPrizePoolSub: 'USDT & Cấp vốn',
    participants: 'THÍ SINH THAM GIA',
    participantsSub: 'Trader toàn cầu',
    sponsorRef: 'MÃ BẢO TRỢ ĐỘC QUYỀN',
    sponsorRefSub: 'Hưởng 100% quyền lợi',

    // Featured Callout
    featuredLiveTag: 'SỰ KIỆN HOT ĐANG LIVE',
    season04Badge: 'MÙA 04',
    sprint04Name: '7-Day Trading Sprint Challenge',
    sprint04Pool: '$1,140 USDT Pool',
    sprint04Desc: 'Khởi tranh 10/10 lúc 00:00. Tranh tài top 10 nhận thưởng tiền mặt và bản quyền Pro VIP.',
    enterSprint04: 'Vào Bảng Đấu Mùa 04',
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
    searchPlaceholder: 'Tìm theo tên chiến dịch, cặp giao dịch hoặc mã ref...',
    showingCount: 'Đang hiển thị',
    campaignsWord: 'chiến dịch',
    noCampaignFound: 'Không tìm thấy chiến dịch phù hợp',
    noCampaignFoundDesc: 'Không có chiến dịch nào trùng khớp với bộ lọc & từ khóa hiện tại. Vui lòng thay đổi trạng thái hoặc từ khóa tìm kiếm.',
    viewAllCampaigns: 'Xem Tất Cả Chiến Dịch',
    featuredBadge: 'CHIẾN DỊCH TIÊU ĐIỂM (HOT)',
    quickRegister: 'Ghi Danh Nhanh',
    joinCampaign: 'Tham Gia Chiến Dịch',
    viewDetails: 'Xem Chi Tiết',
    refCodeNotice: 'Hệ thống bảo trợ độc quyền mã giới thiệu: ref=81',

    // Sprint Challenge View & Bloomberg Hero
    bloombergSubtitle: 'BẢNG ĐẤU GIAO DỊCH ĐỊNH LƯỢNG MÙA 04 // REF=81',
    sprintMainTitle: 'Bamboozer 7-Day Trading Sprint Challenge',
    sprintDesc: 'Sự kiện thi đấu thuật toán định lượng 7 ngày trên sàn cá nhân thông qua API Read-Only. Minh bạch 100% lịch sử vào lệnh và sụt giảm vốn qua luồng WebSocket real-time.',
    countdownLaunchTitle: 'ĐẾM NGƯỢC KHỞI TRANH (10/10 - 00:00)',
    countdownLiveTitle: 'THỜI GIAN CÒN LẠI CỦA MÙA 04',
    countdownLiveBadge: 'COUNTDOWN LIVE',
    countdownLaunchBadge: 'KHỞI TRANH 10/10',
    days: 'NGÀY',
    hours: 'GIỜ',
    mins: 'PHÚT',
    secs: 'GIÂY',
    top1RewardTitle: 'PHẦN THƯỞNG QUÁN QUÂN TOP 1',
    top1RewardValue: '$580 USDT TỔNG GIÁ TRỊ',
    top1RewardBreakdown: '$100 Tiền Mặt + 1 Năm Pro',
    transparencyNotice: 'Hệ thống minh bạch 100%, kiểm tra lệnh trực tiếp qua API đối tác (ref=81)',
    registerNowBtn: 'GHI DANH THI ĐẤU NGAY',
    viewLeaderboardBtn: 'XEM BẢNG XẾP HẠNG',

    // Bamboozer Strategy Live Component
    telemetryTag: 'LIVE API TELEMETRY',
    telemetryTitle: 'Bảng Thông Số Chiến Lược Định Lượng Bamboozer',
    telemetryDesc: 'Dữ liệu hiệu suất thuật toán giao dịch thời gian thực: Win Rate, Profit Factor, Drawdown, Lịch lãi & Phân bổ chiến lược.',
    modeActive: 'Mùa 04 Live (Mẫu)',
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
    calendarSub: 'Tháng 10/2026 • 7-Day Sprint Season 04',
    noDataCalendar: 'Chưa có dữ liệu giao dịch',
    hourlyTitle: 'PHÂN BỐ TẦN SUẤT GIAO DỊCH THEO 24 KHUNG GIỜ (UTC+7)',
    hourlySub: 'Giờ hoạt động hiệu quả nhất: 14:00 - 20:00',
    allocationTitle: 'TỶ TRỌNG QUẢN LÝ DANH MỤC THUẬT TOÁN',
    rankingTitle: 'BẢNG XẾP HẠNG THUẬT TOÁN ĐANG CHẠY (STRATEGY RANKING)',
    onChainVerified: '100% On-Chain & Exchange API',
    noStrategyData: 'Chưa có bot chiến lược nào được kích hoạt',
    partnerVerifiedFooter: 'Hệ thống bảo trợ đối tác Bamboozer (Mã ref: 81). Cổng dữ liệu chuẩn hóa qua WebSocket Stream.',
    checkBamboozerLiveLink: 'Kiểm tra trên Bamboozer Live',

    // Leaderboard Section
    leaderboardTag: 'LIVE SCORING ARBITRAGE // BẢNG XẾP HẠNG THỜI GIAN THỰC',
    leaderboardTitle: 'Bảng Xếp Hạng Thí Sinh Mùa 04',
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
    btnJoinLeaderboard: 'Đăng Ký Thi Đấu (Ref=81)',

    // Active Campaign Modal
    modalTitleSeason04: 'Bamboozer 7-Day Trading Sprint Season 04',
    modalDescSeason04: 'Giải đấu giao dịch định lượng & scalping tự động 7 ngày chính thức khai mạc vào 00:00 ngày 10/10/2026. Minh bạch kết quả qua luồng WebSocket real-time với tổng giải thưởng $1,140 USDT và bản quyền Pro VIP.',
    prizeStructureTitle: 'CƠ CẤU GIẢI THƯỞNG HẤP DẪN',
    rule1: 'Giao dịch tối thiểu 10 lệnh',
    rule2: 'Sụt giảm Max DD ≤ 10.0%',
    rule3: 'Đòn bẩy tối đa 20x',
    rule4: 'Tự động cập nhật bảng xếp hạng',
    btnRegisterJoin: 'Đăng Ký Tham Gia Ngay (Mã ref=81)',
    btnViewBoardModal: 'Xem Bảng Xếp Hạng Live',
  },

  en: {
    // Nav & Common
    home: 'Home',
    backToCampaigns: 'Back to Campaigns',
    backToHome: 'Back to Bamboozer Home',
    season04LaunchNotice: 'SEASON 04 • LAUNCHES OCT 10 (00:00)',
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
    hubSubtitle: 'The central hub for all Bamboozer quantitative trading sprints, AI trading bot leagues, and prop firm capital evaluations. 100% transparent real-time verified results with official sponsor code ref=81.',
    totalPrizePool: 'TOTAL PRIZE POOL',
    totalPrizePoolSub: 'USDT & Funded Capital',
    participants: 'PARTICIPANTS',
    participantsSub: 'Global Traders',
    sponsorRef: 'OFFICIAL SPONSOR CODE',
    sponsorRefSub: '100% Free Entry & Benefits',

    // Featured Callout
    featuredLiveTag: 'FEATURED LIVE SPRINT',
    season04Badge: 'SEASON 04',
    sprint04Name: '7-Day Trading Sprint Challenge',
    sprint04Pool: '$1,140 USDT Pool',
    sprint04Desc: 'Launches Oct 10 at 00:00. Compete for Top 10 rankings to claim cash rewards and Pro VIP licenses.',
    enterSprint04: 'Enter Season 04 Sprint',
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
    searchPlaceholder: 'Search campaign title, category, or ref code...',
    showingCount: 'Showing',
    campaignsWord: 'campaigns',
    noCampaignFound: 'No Matching Campaigns Found',
    noCampaignFoundDesc: 'No campaigns match the current filter and search query. Please adjust your filters or search terms.',
    viewAllCampaigns: 'View All Campaigns',
    featuredBadge: 'FEATURED CAMPAIGN (HOT)',
    quickRegister: 'Quick Register',
    joinCampaign: 'Join Campaign',
    viewDetails: 'View Details',
    refCodeNotice: 'Exclusive sponsor partner ref code: ref=81',

    // Sprint Challenge View & Bloomberg Hero
    bloombergSubtitle: 'SEASON 04 QUANTITATIVE SPRINT ARENA // REF=81',
    sprintMainTitle: 'Bamboozer 7-Day Trading Sprint Challenge',
    sprintDesc: 'A 7-day algorithmic trading tournament executed on personal exchange accounts via Read-Only API. 100% transparent order history and equity drawdowns verified via real-time WebSocket stream.',
    countdownLaunchTitle: 'LAUNCH COUNTDOWN (OCT 10 - 00:00)',
    countdownLiveTitle: 'SEASON 04 TIME REMAINING',
    countdownLiveBadge: 'COUNTDOWN LIVE',
    countdownLaunchBadge: 'LAUNCHES OCT 10',
    days: 'DAYS',
    hours: 'HOURS',
    mins: 'MINS',
    secs: 'SECS',
    top1RewardTitle: 'TOP 1 CHAMPION PRIZE',
    top1RewardValue: '$580 USDT TOTAL VALUE',
    top1RewardBreakdown: '$100 Cash + 1 Year Pro License',
    transparencyNotice: '100% transparent system, live trade verification via partner API (ref=81)',
    registerNowBtn: 'REGISTER & JOIN SPRINT',
    viewLeaderboardBtn: 'VIEW LIVE LEADERBOARD',

    // Bamboozer Strategy Live Component
    telemetryTag: 'LIVE API TELEMETRY',
    telemetryTitle: 'Bamboozer Quantitative Strategy Live Metrics',
    telemetryDesc: 'Real-time algorithmic trading performance metrics: Win Rate, Profit Factor, Drawdown, Profit Calendar & Strategy Allocation.',
    modeActive: 'Season 04 Live (Demo)',
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
    calendarSub: 'October 2026 • 7-Day Sprint Season 04',
    noDataCalendar: 'No trade data available yet',
    hourlyTitle: '24-HOUR TRADE FREQUENCY & WIN-RATE DISTRIBUTION (UTC+7)',
    hourlySub: 'Peak performance window: 14:00 - 20:00',
    allocationTitle: 'ALGORITHMIC PORTFOLIO ALLOCATION',
    rankingTitle: 'RUNNING STRATEGY RANKING (SUB-BOTS)',
    onChainVerified: '100% On-Chain & Exchange API',
    noStrategyData: 'No strategy bots active yet',
    partnerVerifiedFooter: 'Official Bamboozer partner system (Ref: 81). Standardized via WebSocket Telemetry Feed.',
    checkBamboozerLiveLink: 'Verify on Bamboozer Live',

    // Leaderboard Section
    leaderboardTag: 'LIVE SCORING ARBITRAGE // REAL-TIME LEADERBOARD',
    leaderboardTitle: 'Season 04 Participant Leaderboard',
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
    btnJoinLeaderboard: 'Join Sprint (Ref=81)',

    // Active Campaign Modal
    modalTitleSeason04: 'Bamboozer 7-Day Trading Sprint Season 04',
    modalDescSeason04: 'The 7-day algorithmic scalping & quantitative trading challenge officially commences at 00:00 on October 10, 2026. Real-time verified results via WebSocket feed with a total prize pool of $1,140 USDT and Pro VIP licenses.',
    prizeStructureTitle: 'PREMIUM PRIZE POOL STRUCTURE',
    rule1: 'Minimum 10 trades required',
    rule2: 'Max Drawdown limit ≤ 10.0%',
    rule3: 'Max leverage 20x',
    rule4: 'Automated leaderboard sync',
    btnRegisterJoin: 'Register to Participate (Code ref=81)',
    btnViewBoardModal: 'View Live Leaderboard',
  },

  zh: {
    // Nav & Common
    home: '首页',
    backToCampaigns: '返回活动中心',
    backToHome: '返回 Bamboozer 首页',
    season04LaunchNotice: '第04赛季 • 10月10日 (00:00) 正式开赛',
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
    hubSubtitle: '汇聚 Bamboozer 所有量化冲刺赛 (Quant Sprint)、AI 交易机器人联赛及自营交易员评估 (Prop Firm Evaluation)。实时数据透明公开，专属推荐码 ref=81。',
    totalPrizePool: '总奖金池',
    totalPrizePoolSub: 'USDT 及资助账户',
    participants: '参赛交易员',
    participantsSub: '全球量化选手',
    sponsorRef: '官方专属邀请码',
    sponsorRefSub: '100% 免费参赛',

    // Featured Callout
    featuredLiveTag: '焦点活动热赛中',
    season04Badge: '第 04 赛季',
    sprint04Name: '7天量化冲刺锦标赛',
    sprint04Pool: '$1,140 USDT 奖池',
    sprint04Desc: '10月10日 00:00 准时开赛。角逐前10强争夺现金奖励及 Pro VIP 年费会员。',
    enterSprint04: '进入第04赛季战局',
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
    searchPlaceholder: '搜索活动名称、交易对或推荐码...',
    showingCount: '正在展示',
    campaignsWord: '个活动',
    noCampaignFound: '未找到符合条件的活动',
    noCampaignFoundDesc: '暂无与当前筛选器匹配的活动。请调整筛选条件或搜索关键词。',
    viewAllCampaigns: '查看所有活动',
    featuredBadge: '焦点推荐 (HOT)',
    quickRegister: '快速报名',
    joinCampaign: '参加活动',
    viewDetails: '查看详情',
    refCodeNotice: '官方合作保荐邀请码: ref=81',

    // Sprint Challenge View & Bloomberg Hero
    bloombergSubtitle: '第 04 赛季量化冲刺竞技场 // REF=81',
    sprintMainTitle: 'Bamboozer 7天量化冲刺挑战赛',
    sprintDesc: '为期 7 天的个人交易所账户量化算法竞技赛，仅需 Read-Only 只读 API。通过实时 WebSocket 流 100% 透明呈现订单历史与回撤。',
    countdownLaunchTitle: '开赛倒计时 (10月10日 - 00:00)',
    countdownLiveTitle: '第04赛季剩余时间',
    countdownLiveBadge: '实时倒计时',
    countdownLaunchBadge: '10月10日开赛',
    days: '天',
    hours: '时',
    mins: '分',
    secs: '秒',
    top1RewardTitle: '第 1 名冠军奖项',
    top1RewardValue: '$580 USDT 总价值',
    top1RewardBreakdown: '$100 现金 + 1年 Pro VIP 会员',
    transparencyNotice: '100% 透明数据，通过官方合作 API (ref=81) 实时核验',
    registerNowBtn: '立即报名参赛',
    viewLeaderboardBtn: '查看实时排行榜',

    // Strategy Live Component
    telemetryTag: 'LIVE API TELEMETRY',
    telemetryTitle: 'Bamboozer 量化策略实时遥测数据',
    telemetryDesc: '实时交易算法表现指标：胜率、盈亏比、最大回撤、盈利日历及资产配置分布。',
    modeActive: '第04赛季实时 (演示)',
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
    calendarSub: '2026年10月 • 第04赛季冲刺',
    noDataCalendar: '暂无交易数据',
    hourlyTitle: '24小时交易频率与胜率分布 (UTC+7)',
    hourlySub: '最佳收益交易时段: 14:00 - 20:00',
    allocationTitle: '量化策略资产配置比例',
    rankingTitle: '当前运行策略排行',
    onChainVerified: '100% 链上与交易所 API 验证',
    noStrategyData: '尚未激活策略机器人',
    partnerVerifiedFooter: 'Bamboozer 官方合作保障体系 (推荐码: 81)。通过 WebSocket 数据流标准化。',
    checkBamboozerLiveLink: '在 Bamboozer Live 上核验',

    // Leaderboard Section
    leaderboardTag: 'LIVE SCORING ARBITRAGE // 实时竞技榜',
    leaderboardTitle: '第04赛季选手排行榜',
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
    btnJoinLeaderboard: '报名冲刺 (Ref=81)',

    // Active Campaign Modal
    modalTitleSeason04: 'Bamboozer 7天量化冲刺赛 第04赛季',
    modalDescSeason04: '为期7天的量化高频与剥头皮自动化挑战赛将于2026年10月10日 00:00 正式打响。实时 WebSocket 数据呈现，总奖池 $1,140 USDT 及 Pro VIP 会员。',
    prizeStructureTitle: '丰厚阶梯奖池配置',
    rule1: '最少完成 10 笔订单',
    rule2: '最大回撤控制 ≤ 10.0%',
    rule3: '最高允许杠杆 20x',
    rule4: '排行榜全自动实时同步',
    btnRegisterJoin: '立即报名参赛 (邀请码 ref=81)',
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
