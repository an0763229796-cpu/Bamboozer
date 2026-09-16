import { AssetAnalysisData, BotArchitecture, ModuleShowcase, PricingPlan, VideoTutorial, MarketSignalItem } from '../types';

export const COMPANY_INFO = {
  name: 'Bamboozer AI Quant Trading',
  legalEntity: 'VIDI VICI TECHNOLOGY PTE. LTD.',
  country: 'Singapore',
  uen: '202202779W',
  supportEmail: 'an0763229796@gmail.com',
  address: '68 Circular Road, #02-01, Singapore 049422',
};

export const TARGET_AUDIENCES = [
  {
    id: 'fulltime',
    role: 'Fulltime Trader',
    tagline: 'Tốc độ thực thi & Tùy biến chiến lược sâu',
    features: [
      'Độ trễ tín hiệu dưới 15ms với WebSocket chuyên dụng',
      'Indicator IDE hỗ trợ Pine Script AI & backtest 5 năm dữ liệu tick',
      'API webhook kết nối trực tiếp chiến lược cá nhân vào terminal',
      'Multi-timeframe consensus quét đồng thời 4 khung giờ'
    ],
    badge: 'Pro & Scalper'
  },
  {
    id: 'parttime',
    role: 'Parttime Trader',
    tagline: 'Bảo toàn vốn & Tự động sinh lời 24/7',
    features: [
      'Bot Grid & DCA tự động quét biên độ sideway không cần ngồi canh nến',
      'Non-custodial 100% – Tiền luôn nằm trên ví Binance/OKX cá nhân',
      'Thông báo biến động và trạng thái chốt lời qua Telegram/Email realtime',
      'Chế độ AI Smart Setup cấu hình bot chỉ với 2 click chuột'
    ],
    badge: 'Bán chủ động'
  },
  {
    id: 'beginner',
    role: 'Beginner (Người mới)',
    tagline: 'Phân tích AI minh bạch & Hướng dẫn từng bước',
    features: [
      'Thẻ khuyến nghị BUY/SELL/HOLD kèm % Confidence Score và lý do rõ ràng',
      'Điểm Entry, Stop Loss, Take Profit chuẩn ATR bảo vệ rủi ro tối đa',
      'Hệ thống 5 Video Tutorial ngắn hướng dẫn từ A-Z trong 15 phút',
      'Tặng ngay 100 Credits Free trải nghiệm thực tế không cần nạp tiền'
    ],
    badge: 'Dễ tiếp cận'
  }
];

export const SAFETY_BADGES = [
  {
    id: 'non-custodial',
    icon: 'ShieldCheck',
    titleEn: 'Non-custodial platform',
    titleVi: 'Nền tảng không lưu ký',
    desc: 'Bamboozer không bao giờ giữ tiền hay quản lý ví của bạn.'
  },
  {
    id: 'funds-stay',
    icon: 'WalletCards',
    titleEn: 'Your funds stay in your account',
    titleVi: 'Tiền nằm an toàn trên tài khoản sàn cá nhân',
    desc: 'Tài sản được bảo vệ bởi bảo mật cấp tổ chức của sàn giao dịch.'
  },
  {
    id: 'no-withdrawal',
    icon: 'KeyRound',
    titleEn: 'Withdrawal permission not required',
    titleVi: 'Không yêu cầu quyền rút tiền',
    desc: 'API chỉ cần quyền đọc & đặt lệnh. Tuyệt đối cấm quyền rút tiền.'
  },
  {
    id: 'no-code',
    icon: 'Sparkles',
    titleEn: 'No programming required',
    titleVi: 'Không cần kỹ năng lập trình',
    desc: 'Chỉ cần nhập ngôn ngữ tự nhiên, AI tự viết code và vận hành bot.'
  }
];

export const API_PERMISSIONS_COMPARISON = [
  {
    action: 'Đọc dữ liệu số dư & lịch sử lệnh (Read Data)',
    status: 'allowed',
    note: 'Cần thiết để hiển thị PnL và danh mục tài sản'
  },
  {
    action: 'Đặt lệnh Mua / Bán tự động (Place Orders)',
    status: 'allowed',
    note: 'Cần thiết để thực thi bot và lệnh từ Signal Center'
  },
  {
    action: 'Quản lý & Hủy lệnh chờ (Manage / Cancel Orders)',
    status: 'allowed',
    note: 'Cần thiết cho cơ chế Stop Loss và Take Profit động'
  },
  {
    action: 'Rút tiền ra khỏi sàn (Withdraw Funds)',
    status: 'forbidden',
    note: 'BỊ CẤM HOÀN TOÀN - Bamboozer từ chối nhận API Key có quyền này'
  },
  {
    action: 'Chuyển tiền nội bộ giữa các ví sàn (Internal Transfer)',
    status: 'forbidden',
    note: 'BỊ CẤM HOÀN TOÀN - Người dùng giữ quyền kiểm soát 100%'
  }
];

export const SAMPLE_ASSETS: Record<string, AssetAnalysisData> = {
  'BTC/USDT': {
    symbol: 'BTC/USDT',
    name: 'Bitcoin',
    type: 'crypto',
    price: 94820.50,
    change24h: 3.42,
    recommendation: 'BUY',
    confidenceScore: 84,
    multiTimeframeConsensus: {
      tf15m: 'BULLISH',
      tf1h: 'BULLISH',
      tf4h: 'BULLISH',
      tf1d: 'NEUTRAL'
    },
    entryZone: [93800, 94400],
    stopLoss: 92100,
    takeProfit1: 96800,
    takeProfit2: 99500,
    atrValue: 1420,
    macroFactors: {
      fearGreedIndex: 72,
      fearGreedLabel: 'Greed (Tham lam)',
      dxyIndex: 103.2,
      vixIndex: 14.8,
      marketSentiment: 'Dòng vốn tổ chức tiếp tục gia tăng vào Spot ETF, funding rate duy trì mức ổn định dương.'
    },
    technicalReasons: [
      'RSI 14 trên khung 4H ở mức 62.4, tạo phân kỳ ẩn tăng giá (Hidden Bullish Divergence)',
      'Giá breakout dải trên Bollinger Bands với khối lượng tích lũy tăng 38%',
      'Cấu trúc đỉnh đáy cao dần (Higher Highs & Higher Lows) duy trì trên EMA 50 & EMA 200',
      'Độ biến động ATR (14) = $1,420 hỗ trợ biên Stop Loss tối ưu 1.8x ATR'
    ]
  },
  'ETH/USDT': {
    symbol: 'ETH/USDT',
    name: 'Ethereum',
    type: 'crypto',
    price: 3412.80,
    change24h: 2.15,
    recommendation: 'BUY',
    confidenceScore: 78,
    multiTimeframeConsensus: {
      tf15m: 'BULLISH',
      tf1h: 'BULLISH',
      tf4h: 'NEUTRAL',
      tf1d: 'BULLISH'
    },
    entryZone: [3350, 3390],
    stopLoss: 3260,
    takeProfit1: 3580,
    takeProfit2: 3750,
    atrValue: 74,
    macroFactors: {
      fearGreedIndex: 68,
      fearGreedLabel: 'Greed',
      dxyIndex: 103.2,
      vixIndex: 14.8,
      marketSentiment: 'Phí gas L2 giảm mạnh, lượng ETH staking trên Beacon chain đạt kỷ lục mới.'
    },
    technicalReasons: [
      'Test lại thành công đường neckline mô hình đảo chiều hai đáy khung 1H',
      'MACD Histogram chuyển sang vùng dương, đường tín hiệu cắt lên',
      'Khối lượng gom ròng của Top 100 Whales tăng 4.2% trong 48 giờ qua'
    ]
  },
  'NVDA': {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    type: 'stock',
    price: 138.45,
    change24h: 4.82,
    recommendation: 'STRONG BUY',
    confidenceScore: 91,
    multiTimeframeConsensus: {
      tf15m: 'BULLISH',
      tf1h: 'BULLISH',
      tf4h: 'BULLISH',
      tf1d: 'BULLISH'
    },
    entryZone: [135.5, 137.2],
    stopLoss: 131.0,
    takeProfit1: 146.0,
    takeProfit2: 154.0,
    atrValue: 3.8,
    macroFactors: {
      fearGreedIndex: 65,
      fearGreedLabel: 'Greed',
      dxyIndex: 102.8,
      vixIndex: 13.9,
      marketSentiment: 'Nhu cầu chip trung tâm dữ liệu AI thế hệ Blackwell vượt nguồn cung đến hết 2026.'
    },
    technicalReasons: [
      'Breakout nền tích lũy 6 tuần với khối lượng cao hơn 62% trung bình 20 ngày',
      'Đường MA 20 ngày dốc lên 45 độ, hỗ trợ động cực kỳ vững chắc',
      'Chỉ số dòng tiền Chaikin Money Flow (CMF) đạt mức +0.28 xác nhận dòng tiền lớn'
    ]
  },
  'XAU/USD': {
    symbol: 'XAU/USD',
    name: 'Vàng Giao Ngay (Gold)',
    type: 'commodity',
    price: 2742.60,
    change24h: -0.35,
    recommendation: 'HOLD',
    confidenceScore: 68,
    multiTimeframeConsensus: {
      tf15m: 'BEARISH',
      tf1h: 'NEUTRAL',
      tf4h: 'BULLISH',
      tf1d: 'BULLISH'
    },
    entryZone: [2715, 2725],
    stopLoss: 2685,
    takeProfit1: 2780,
    takeProfit2: 2820,
    atrValue: 26.4,
    macroFactors: {
      fearGreedIndex: 54,
      fearGreedLabel: 'Neutral',
      dxyIndex: 103.5,
      vixIndex: 15.2,
      marketSentiment: 'Lợi suất trái phiếu chính phủ Mỹ kỳ hạn 10 năm hồi phục nhẹ gây áp lực ngắn hạn.'
    },
    technicalReasons: [
      'Giá đang dao động tích lũy trong tam giác thu hẹp khung H4',
      'Cần chờ đợi tín hiệu nến phá vỡ ngưỡng 2,755 USD để xác nhận tiếp diễn xu hướng'
    ]
  },
  'EUR/USD': {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    type: 'forex',
    price: 1.0824,
    change24h: -0.18,
    recommendation: 'SELL',
    confidenceScore: 75,
    multiTimeframeConsensus: {
      tf15m: 'BEARISH',
      tf1h: 'BEARISH',
      tf4h: 'BEARISH',
      tf1d: 'NEUTRAL'
    },
    entryZone: [1.0840, 1.0855],
    stopLoss: 1.0890,
    takeProfit1: 1.0760,
    takeProfit2: 1.0710,
    atrValue: 0.0058,
    macroFactors: {
      fearGreedIndex: 50,
      fearGreedLabel: 'Neutral',
      dxyIndex: 104.1,
      vixIndex: 14.5,
      marketSentiment: 'Ngân hàng Trung ương Châu Âu (ECB) có xu hướng nới lỏng lãi suất nhanh hơn Fed.'
    },
    technicalReasons: [
      'Từ chối kháng cự EMA 100 khung H4 với mô hình nến Shooting Star',
      'Stochastic RSI đi vào vùng quá mua và xuất hiện giao cắt tử thần (Death Cross)'
    ]
  }
};

export const CRYPTO_EXCHANGES = [
  { name: 'Binance', logo: '🟡', logoUrl: 'https://cdn.simpleicons.org/binance/F0B90B', type: 'Spot & Futures', status: 'Official Partner API' },
  { name: 'OKX', logo: '⚪', logoUrl: 'https://cdn.simpleicons.org/okx/FFFFFF', type: 'Multi-Assets', status: 'Fast Webhook' },
  { name: 'Bybit', logo: '🟠', logoUrl: 'https://cdn.simpleicons.org/bybit/F7A600', type: 'Derivatives & Spot', status: 'Unified Margin' },
  { name: 'Bitget', logo: '🔵', logoUrl: 'https://cdn.simpleicons.org/bitget/00F0FF', type: 'Copy Trading & Spot', status: 'Ultra-low Latency' },
  { name: 'Coinbase', logo: '🔷', logoUrl: 'https://cdn.simpleicons.org/coinbase/0052FF', type: 'Advanced Trade', status: 'US Compliant' },
  { name: 'Kraken', logo: '🟣', logoUrl: 'https://cdn.simpleicons.org/kraken/5741D9', type: 'Spot & Margin', status: 'High Security' },
  { name: 'KuCoin', logo: '🟢', logoUrl: 'https://cdn.simpleicons.org/kucoin/23AF91', type: 'Spot & Futures', status: 'API Key Verified' },
  { name: 'Gate.io', logo: '🔴', logoUrl: 'https://cdn.simpleicons.org/gate/FFFFFF', type: 'Multi-Tokens', status: 'Active' },
  { name: 'Bitfinex', logo: '🟢', logoUrl: 'https://cdn.simpleicons.org/bitfinex/16B157', type: 'Institutional', status: 'Active' },
  { name: 'Deepcoin', logo: '🔵', logoUrl: 'https://cdn.simpleicons.org/deepcoin/FFFFFF', type: 'Derivatives', status: 'Fast Execution' },
  { name: 'HTX', logo: '🟦', logoUrl: 'https://cdn.simpleicons.org/htx/2B71FF', type: 'Global Spot', status: 'Active' }
];

export const BROKERS_AND_PLATFORMS = [
  { name: 'Interactive Brokers (IBKR)', category: 'US & Global Stocks', protocol: 'TWS API / Client Portal' },
  { name: 'Alpaca Finance API', category: 'Algorithmic Stock Trading', protocol: 'Commission-free REST/WS' },
  { name: 'MetaTrader 4 / 5 Bridge', category: 'Forex & CFD Brokerage', protocol: 'Bridge DLL & WebSocket' },
  { name: 'TradingView Webhook', category: 'Custom Pine Alerts', protocol: 'Sub-millisecond Webhook' },
  { name: 'OANDA / Forex.com', category: 'FX Currency Pairs', protocol: 'v20 REST API' }
];

export const BOT_ARCHITECTURES: BotArchitecture[] = [
  {
    id: 'grid-bot',
    name: 'Grid Trading Bot',
    vietnameseName: 'Bot Lưới Kháng Cự / Hỗ Trợ',
    riskLevel: 'Medium Risk',
    riskColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    description: 'Tự động rải lưới lệnh Mua/Bán theo biên độ giá định sẵn. Chốt lời liên tục khi thị trường đi ngang (Sideway) mà không cần đoán xu hướng.',
    bestMarketCondition: 'Thị trường dao động ngang (Sideway) hoặc đi trong kênh tích lũy',
    winRate: '88.4%',
    backtestedReturn: '+34.2% / quý',
    activeUsers: 4820
  },
  {
    id: 'dca-bot',
    name: 'Smart DCA Bot',
    vietnameseName: 'Bot Trung Bình Giá Thông Minh',
    riskLevel: 'Low Risk',
    riskColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    description: 'Tự động tích lũy tài sản khi giá điều chỉnh mạnh dựa trên chỉ báo RSI & Bollinger Bands. Tối ưu điểm hoàn vốn và giảm thiểu rủi ro biến động.',
    bestMarketCondition: 'Thị trường xu hướng tăng dài hạn có những đợt rung lắc ngắn',
    winRate: '94.1%',
    backtestedReturn: '+26.8% / năm',
    activeUsers: 6150
  },
  {
    id: 'trend-following',
    name: 'Trend Following Bot',
    vietnameseName: 'Bot Bám Theo Xu Hướng Động',
    riskLevel: 'Medium Risk',
    riskColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    description: 'Kết hợp SuperTrend và Đường trung bình EMA động để bắt trọn con sóng lớn. Tự động dời Stop Loss (Trailing Stop) để khóa lợi nhuận tối đa.',
    bestMarketCondition: 'Thị trường có sóng lớn (Bull run hoặc Bear run rõ rệt)',
    winRate: '68.2%',
    backtestedReturn: '+62.7% / chu kỳ',
    activeUsers: 3340
  },
  {
    id: 'martingale-pro',
    name: 'Dynamic Martingale Bot',
    vietnameseName: 'Bot Martingale Thích Ứng',
    riskLevel: 'High Risk',
    riskColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    description: 'Gia tăng khối lượng theo tỷ lệ Fibonacci có kiểm soát mức sụt giảm tối đa (Hard Stop Loss). Cần quản trị vốn nghiêm ngặt cho nhà giao dịch kinh nghiệm.',
    bestMarketCondition: 'Biến động mạnh có sóng hồi ngắn hạn',
    winRate: '79.6%',
    backtestedReturn: '+84.1% / năm',
    activeUsers: 1420
  }
];

export const PRODUCT_MODULES: ModuleShowcase[] = [
  {
    id: 'ai-analysis',
    badge: 'Module 01',
    title: 'AI Asset Analysis',
    vietnameseName: 'Bộ Não Phân Tích Thị Trường Đa Tài Sản',
    summary: 'Phân tích đa tài sản (Crypto, US Stocks, HK Stocks, Forex, Commodities) đưa ra khuyến nghị chuẩn xác.',
    description: 'Hệ thống AI xử lý hàng triệu dữ liệu nến, chỉ số vĩ mô (DXY, VIX, NFP, Fear & Greed) và mô hình giá để đưa ra tín hiệu BUY/SELL/HOLD, độ tin cậy % Confidence, vùng Entry, Stop Loss và Take Profit chuẩn biên độ ATR.',
    highlights: [
      'Bao phủ hơn 1,500+ cặp Crypto, cổ phiếu Mỹ S&P 500, Hàng hóa (Vàng, Dầu) và Forex',
      'Độ tin cậy Confidence Score (0-100%) minh bạch lý do phân tích chi tiết',
      'Multi-timeframe consensus: Đồng thuận 4 khung thời gian (15m, 1h, 4h, 1D)',
      'Tự động tính toán mốc Stop Loss & Take Profit chuẩn toán học ATR'
    ],
    quickGuideTitle: 'Cách đọc thẻ tín hiệu AI và áp dụng điểm Stop Loss / Take Profit chuẩn ATR',
    quickGuideContent: [
      {
        step: 'Bước 1: Chọn mã tài sản & kiểm tra Confidence Score',
        action: 'Tìm mã (VD: BTC, ETH, NVDA). Chỉ vào lệnh khi Confidence Score đạt từ 70% trở lên và Multi-Timeframe có ít nhất 3 khung đồng thuận (Consensus).',
        tip: 'Khuyến nghị dưới 65% cho thấy thị trường đang phân vân, nên ưu tiên giữ vị thế HOLD.'
      },
      {
        step: 'Bước 2: Xác định vùng Entry Zone',
        action: 'Đặt lệnh Limit trong phạm vi dải giá Entry được khuyến nghị thay vì mua đuổi giá thị trường.',
        tip: 'Chia vốn 50% ở cạnh trên và 50% ở cạnh dưới Entry Zone để có giá bình quân tối ưu.'
      },
      {
        step: 'Bước 3: Thiết lập Stop Loss và Take Profit chuẩn ATR',
        action: 'Sao chép chính xác mốc Stop Loss từ thẻ AI. Chia tỷ lệ chốt lời: 60% ở Take Profit 1 và 40% còn lại gồng đến Take Profit 2.',
        tip: 'Mốc ATR giúp tránh bị quét râu nến ảo trong các phiên biến động mạnh.'
      }
    ]
  },
  {
    id: 'indicator-ide',
    badge: 'Module 02',
    title: 'Indicator IDE',
    vietnameseName: 'Môi Trường Lập Trình Chỉ Báo Cùng AI',
    summary: 'Viết chỉ báo kỹ thuật tùy chỉnh dạng Pine Script bằng ngôn ngữ tự nhiên, không cần biết code.',
    description: 'Chỉ cần gõ ý tưởng giao dịch bằng tiếng Việt hoặc tiếng Anh: "Tạo chỉ báo SuperTrend kết hợp RSI phân kỳ báo mũi tên", AI sẽ tự động sinh code Pine Script chuẩn xác, render biểu đồ tức thì và sẵn sàng đưa vào backtest.',
    highlights: [
      'Công cụ AI Prompt-to-Code chuyên biệt cho định dạng TradingView Pine Script v5',
      'Trình biên dịch tức thì trên trình duyệt, phát hiện lỗi syntax tự động',
      'Kho thư viện Indicator Marketplace với hàng trăm chỉ báo cộng đồng chia sẻ',
      'Chuyển đổi chỉ báo thành bộ kích hoạt tín hiệu (Signal Alert) cho Bot chỉ với 1 click'
    ],
    quickGuideTitle: 'Cách tạo chỉ báo giao dịch tùy chỉnh trong 60 giây không cần biết lập trình',
    quickGuideContent: [
      {
        step: 'Bước 1: Mở trình soạn thảo AI Prompt',
        action: 'Tại thanh AI Generator, nhập mô tả điều kiện Mua/Bán theo ý bạn (VD: "Khi nến đóng trên EMA 21 và RSI < 35 thì vẽ mũi tên xanh").',
        tip: 'Bạn có thể gõ tiếng Việt có dấu hoàn toàn tự nhiên, AI Bamboozer hiểu rất tốt thuật ngữ trading.'
      },
      {
        step: 'Bước 2: Bấm Generate & Kiểm tra Code Preview',
        action: 'AI sẽ viết toàn bộ code Pine Script trong 5 giây. Bấm "Compile & Apply" để hiển thị chỉ báo trực tiếp lên biểu đồ nến.',
        tip: 'Bạn có thể yêu cầu AI tinh chỉnh thông số (VD: đổi chu kỳ RSI từ 14 sang 9) ngay trong chat.'
      },
      {
        step: 'Bước 3: Lưu và Chuyển thành Tín Hiệu Bot',
        action: 'Lưu chỉ báo vào thư viện cá nhân và chọn "Export as Webhook Alert" để tự động kích hoạt bot.',
        tip: 'Có thể đăng bán chỉ báo lên Indicator Marketplace để nhận hoa hồng Credits.'
      }
    ]
  },
  {
    id: 'trading-bots',
    badge: 'Module 03',
    title: 'Trading Bot & Grid Bots',
    vietnameseName: 'Hệ Thống Tự Động Hóa Giao Dịch Đa Chiến Lược',
    summary: 'AI Smart Create cùng 4 kiến trúc bot phân loại theo nhãn rủi ro rõ ràng.',
    description: 'Tận hưởng sức mạnh của tự động hóa với Grid Bot, Smart DCA, Trend Following và Dynamic Martingale. Hỗ trợ Strategy Marketplace cho phép Copy Trading những chiến lược có tỷ lệ thắng cao nhất từ các quant trader hàng đầu.',
    highlights: [
      '4 Kiến trúc bot chuẩn hóa với nhãn rủi ro minh bạch (Low - Medium - High Risk)',
      'AI Smart Create: Tự động phân tích lịch sử biến động để đề xuất biên độ lưới tối ưu',
      'Strategy Marketplace: Sao chép chiến lược chỉ với 1 cú nhấp chuột',
      'Cơ chế bảo vệ vốn: Hard Stop Loss, Trailing Take Profit và Circuit Breaker tự ngắt'
    ],
    quickGuideTitle: 'Cách thiết lập Grid Bot cho thị trường Sideway và Sao chép chiến lược từ Marketplace',
    quickGuideContent: [
      {
        step: 'Bước 1: Chọn cặp giao dịch & chế độ AI Auto Fill',
        action: 'Chọn cặp tiền (VD: BTC/USDT hoặc ETH/USDT). Nhấp vào "AI Auto Parameter" để hệ thống tự quét biên dưới và biên trên trong 30 ngày.',
        tip: 'AI sẽ tự tính số lượng lưới (Grid Count) phù hợp để phí giao dịch không ăn mòn lợi nhuận.'
      },
      {
        step: 'Bước 2: Cài đặt mức bảo vệ vốn (Stop Trigger)',
        action: 'Điền mức giá dừng lỗ dưới đáy hỗ trợ cứng (Stop Loss) và chọn phân bổ số vốn mong muốn.',
        tip: 'Luôn duy trì tỷ lệ Stop Loss tối đa 5-8% tổng số vốn phân bổ cho mỗi bot.'
      },
      {
        step: 'Bước 3: Bấm Start Bot và Quản trị lệnh',
        action: 'Xác nhận khởi động. Bot sẽ lập tức rải lưới lệnh lên sàn Binance/OKX của bạn và bắt đầu chốt lời theo chu kỳ.',
        tip: 'Bạn có thể theo dõi biểu đồ PnL thời gian thực và tạm dừng bot bất kỳ lúc nào.'
      }
    ]
  },
  {
    id: 'strategy-live',
    badge: 'Module 04',
    title: 'Strategy & Live Dashboard',
    vietnameseName: 'Quản Lý Chiến Lược Giao Dịch Trực Tuyến & PnL',
    summary: 'Theo dõi Total Equity, Win Rate %, Profit Factor, Max Drawdown % và Lịch PnL chi tiết.',
    description: 'Trung tâm kiểm soát tài chính toàn diện. Đánh giá hiệu quả chiến lược qua biểu đồ tăng trưởng vốn, hệ số Sharpe, tỷ lệ thắng thua và bản đồ nhiệt PnL từng ngày.',
    highlights: [
      'Cập nhật Total Equity và số dư đa sàn theo thời gian thực (Realtime Balance Sync)',
      'Bộ chỉ số Quant chuyên nghiệp: Win Rate, Profit Factor, Max Drawdown (MDD)',
      'Lịch trực quan PnL theo ngày/tuần/tháng (Heatmap Calendar)',
      'Nhật ký giao dịch tự động lưu trữ lý do vào lệnh, phí sàn và tỷ lệ R:R'
    ],
    quickGuideTitle: 'Quy trình 3 bước đưa chiến lược từ Backtest vào chạy Live Trading',
    quickGuideContent: [
      {
        step: 'Bước 1: Chạy Backtest giả lập tối thiểu 180 ngày',
        action: 'Kiểm tra tỷ lệ Max Drawdown dưới 15% và Profit Factor lớn hơn 1.6 để đảm bảo chiến lược sống sót qua nhiều chu kỳ thị trường.',
        tip: 'Tránh tối đa hiện tượng Overfitting (quá khớp dữ liệu quá khứ).'
      },
      {
        step: 'Bước 2: Kích hoạt chế độ Paper Trading (Giao dịch thử nghiệm)',
        action: 'Cho chiến lược chạy thử với tiền ảo trong 7 ngày để kiểm tra độ trễ mạng và khớp lệnh thực tế.',
        tip: 'Paper Trading giúp bạn kiểm chứng tâm lý mà không mất một đồng vốn nào.'
      },
      {
        step: 'Bước 3: Chuyển đổi sang Live API với 20% vốn khởi đầu',
        action: 'Chuyển trạng thái sang Live. Khởi đầu với volume nhỏ trong 2 tuần đầu trước khi scale quy mô vốn.',
        tip: 'Bật tính năng Auto Emergency Stop để tự động đóng toàn bộ vị thế nếu tài khoản giảm quá 5% trong ngày.'
      }
    ]
  },
  {
    id: 'trading-terminal',
    badge: 'Module 05',
    title: 'Trading Terminal & Market Signal Center',
    vietnameseName: 'Trạm Giao Dịch Trực Tiếp & Radar Quét Tín Hiệu',
    summary: 'Quét tín hiệu thời gian thực với Signal Score (0-100) cho hàng trăm mã, đặt lệnh trực tiếp đa sàn.',
    description: 'Radar quét sóng cực mạnh bắt các tín hiệu bùng nổ khối lượng, giao cắt vàng, phân kỳ nến. Tích hợp bảng đặt lệnh siêu tốc hỗ trợ Leverage, Limit, Market, OCO và kéo thả Stop Loss trực quan.',
    highlights: [
      'Bộ lọc tín hiệu Signal Score (0-100) cập nhật từng giây với mã màu Xanh (Long) / Đỏ (Short)',
      'Giao diện Trading Terminal đa khung giờ với bộ công cụ vẽ kỹ thuật mượt mà',
      'Đặt lệnh 1-Click tích hợp sẵn đòn bẩy và tính toán tỷ lệ ký quỹ tự động',
      'Cảnh báo bằng âm thanh và thông báo đẩy ngay khi có tín hiệu đạt điểm số 85+'
    ],
    quickGuideTitle: 'Cách săn cơ hội giao dịch cực nhanh với Market Signal Center',
    quickGuideContent: [
      {
        step: 'Bước 1: Lọc danh sách theo điểm số Signal Score > 80',
        action: 'Vào tab Signal Center, chọn bộ lọc Score từ 80-100 để chỉ giữ lại những tín hiệu có xác suất cao nhất.',
        tip: 'Các tín hiệu màu xanh lá đậm đại diện cho điểm mua Long mạnh, màu đỏ cam cho tín hiệu Short.'
      },
      {
        step: 'Bước 2: Xem xét cấu trúc Volume & Khung thời gian',
        action: 'Ưu tiên các cặp có Volume 24h trên 10 triệu USD để đảm bảo tính thanh khoản không bị trượt giá (slippage).',
        tip: 'Tín hiệu xuất hiện đồng thời trên cả khung 15m và 1h có xác suất thắng cao hơn 28%.'
      },
      {
        step: 'Bước 3: Bấm Execute Order ngay trên Terminal',
        action: 'Bấm nút "Quick Trade" kế bên tín hiệu, kiểm tra khối lượng lệnh và nhấn Confirm để gửi lệnh trực tiếp lên sàn.',
        tip: 'Terminal sẽ tự động gán sẵn Stop Loss tại đáy nến tín hiệu gần nhất.'
      }
    ]
  },
  {
    id: 'exchange-accounts',
    badge: 'Module 06',
    title: 'Exchange Accounts',
    vietnameseName: 'Quản Lý Kết Nối API Đa Sàn An Toàn Tuyệt Đối',
    summary: 'Kết nối tài khoản sàn và nhà môi giới nhanh chóng với tiêu chuẩn bảo mật ngân hàng.',
    description: 'Quản lý tập trung mọi tài khoản Binance, OKX, Bybit, KuCoin trong một nơi duy nhất. Toàn bộ API Key được mã hóa chuẩn quân đội AES-256 trên client và tuyệt đối KHÔNG cấp quyền rút tiền.',
    highlights: [
      'Mã hóa đầu cuối Client-Side Encryption, không ai có thể giải mã khóa bí mật',
      'Cơ chế IP Whitelisting giúp bảo vệ tài khoản khỏi truy cập trái phép',
      'Tự động quét và cảnh báo nếu người dùng vô tình bật quyền rút tiền (Withdrawal)',
      'Ngắt kết nối hoặc xóa API Key khỏi hệ thống chỉ trong 1 thao tác'
    ],
    quickGuideTitle: 'Hướng dẫn lấy API Key trên Binance/OKX và kết nối an toàn vào Bamboozer',
    quickGuideContent: [
      {
        step: 'Bước 1: Đăng nhập vào sàn và vào mục Quản lý API (API Management)',
        action: 'Trên Binance hoặc OKX, chọn Cài đặt tài khoản → Quản lý API → Tạo API Key mới.',
        tip: 'Đặt tên gợi nhớ cho API Key, ví dụ: "Bamboozer_Quant_2025".'
      },
      {
        step: 'Bước 2: Cấu hình phân quyền CHÍNH XÁC (Bắt buộc kiểm tra)',
        action: 'Tích chọn: "Enable Reading" (Đọc) và "Enable Spot & Margin Trading" / "Enable Futures". TUYỆT ĐỐI KHÔNG TÍCH "Enable Withdrawals".',
        tip: 'Thêm dải IP tĩnh của Bamboozer vào ô IP Access Restriction để tăng cường bảo mật tối đa.'
      },
      {
        step: 'Bước 3: Dán API Key & Secret Key vào Bamboozer',
        action: 'Sao chép API Key và Secret Key, dán vào form kết nối trên Bamboozer và bấm "Verify & Connect".',
        tip: 'Hệ thống sẽ chạy kiểm tra bảo mật trong 3 giây để xác nhận quyền rút tiền đã bị vô hiệu hóa an toàn.'
      }
    ]
  }
];

export const ONBOARDING_STEPS = [
  {
    step: '01',
    title: 'Kết nối sàn qua API',
    subtitle: 'Quyền rút tiền bị vô hiệu hóa',
    desc: 'Tạo API Key trên sàn giao dịch cá nhân (Binance, OKX, Bybit...) chỉ với quyền Đọc và Đặt lệnh. Bamboozer không bao giờ giữ tài sản của bạn.',
    icon: 'KeyRound',
    duration: '2 phút',
    statusTag: 'Bảo mật Non-Custodial'
  },
  {
    step: '02',
    title: 'Chọn & Cấu hình công cụ',
    subtitle: 'AI Analysis, Grid Bot hoặc Indicator',
    desc: 'Sử dụng AI phân tích thị trường, chọn 1 trong 4 kiến trúc bot có sẵn, hoặc tự sinh chỉ báo Pine Script bằng ngôn ngữ tự nhiên.',
    icon: 'Sliders',
    duration: '3 phút',
    statusTag: 'Không cần biết code'
  },
  {
    step: '03',
    title: 'Giám sát & Luôn kiểm soát',
    subtitle: 'Toàn quyền dừng / rút tiền 24/7',
    desc: 'Theo dõi danh mục và PnL trực tiếp trên Dashboard. Bạn có toàn quyền tạm dừng bot, đóng vị thế hay ngắt kết nối API bất cứ lúc nào.',
    icon: 'Activity',
    duration: 'Thời gian thực',
    statusTag: 'Kiểm soát 100%'
  }
];

export const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 1,
    title: 'Bamboozer Overview in 3 Minutes',
    vietnameseTitle: 'Bamboozer là gì? Hướng dẫn tổng quan giao diện trong 3 phút',
    duration: '03:15',
    category: 'Tổng quan nền tảng',
    description: 'Video giới thiệu nhanh toàn cảnh không gian làm việc của Bamboozer, nguyên lý Non-Custodial và cách điều hướng giữa các module cốt lõi.',
    chapters: [
      { time: '00:00', title: 'Giới thiệu Bamboozer & Triết lý Non-Custodial' },
      { time: '00:45', title: 'Tổng quan thanh điều hướng & Wallet Credits' },
      { time: '01:30', title: 'Khám phá 6 module giao dịch chính' },
      { time: '02:40', title: 'Cách kích hoạt 100 Credits trải nghiệm miễn phí' }
    ],
    keyTakeaways: [
      'Hiểu rõ tại sao tiền của bạn luôn an toàn 100% trên sàn cá nhân',
      'Nắm vững luồng làm việc: Phân tích → Cài đặt bot → Theo dõi PnL',
      'Biết cách quản lý ví Credits hiệu quả nhất'
    ]
  },
  {
    id: 2,
    title: 'Market Trend Analysis & Confidence Score',
    vietnameseTitle: 'Hướng dẫn phân tích xu hướng thị trường và đọc chỉ số Confidence Score',
    duration: '04:42',
    category: 'AI Asset Analysis',
    description: 'Tìm hiểu cách đọc thẻ phân tích AI, giải mã chỉ số độ tin cậy Confidence Score, điểm đồng thuận 4 khung giờ và các mốc ATR.',
    chapters: [
      { time: '00:00', title: 'Ý nghĩa chỉ số Confidence Score (0 - 100%)' },
      { time: '01:10', title: 'Đọc lý do kỹ thuật: RSI, Bollinger Bands & MACD' },
      { time: '02:30', title: 'Phân tích các chỉ số vĩ mô: DXY, VIX, Fear & Greed' },
      { time: '03:45', title: 'Chiến thuật chia vốn theo Entry Zone & chốt lời 2 mốc' }
    ],
    keyTakeaways: [
      'Biết cách lọc những kèo giao dịch có xác suất thắng trên 75%',
      'Hiểu bản chất White-Box AI không phải là hộp đen tiên tri',
      'Ứng dụng mốc ATR để không bao giờ bị dính râu nến quét dừng lỗ'
    ]
  },
  {
    id: 3,
    title: 'Setting up Grid & DCA Bots for Beginners',
    vietnameseTitle: 'Hướng dẫn cài đặt Grid Bot & DCA Bot cho người mới',
    duration: '05:18',
    category: 'Bot Automation',
    description: 'Hướng dẫn chi tiết từng bước thiết lập Grid Bot để kiếm lợi nhuận từ thị trường đi ngang và DCA Bot để gom tài sản giá tốt.',
    chapters: [
      { time: '00:00', title: 'Nguyên lý hoạt động của Grid Bot trong vùng Sideway' },
      { time: '01:25', title: 'Sử dụng AI Auto-Fill để lấy thông số tối ưu' },
      { time: '02:50', title: 'Cài đặt DCA Bot kết hợp kích hoạt chỉ báo RSI' },
      { time: '04:15', title: 'Thiết lập Stop Loss bảo vệ vốn và theo dõi lệnh chạy' }
    ],
    keyTakeaways: [
      'Tự tin thiết lập bot đầu tiên trong 3 phút mà không sợ cháy tài khoản',
      'Biết cách sao chép chiến lược hàng đầu từ Strategy Marketplace',
      'Quản trị rủi ro thông minh với nhãn phân loại Low / Medium / High Risk'
    ]
  },
  {
    id: 4,
    title: 'Writing Trading Indicators with AI Prompts',
    vietnameseTitle: 'Hướng dẫn viết chỉ báo bằng lời thoại AI trong Indicator IDE',
    duration: '03:55',
    category: 'Indicator IDE',
    description: 'Khám phá sức mạnh của AI Prompt-to-Code: biến bất kỳ ý tưởng trading nào thành code Pine Script hoàn chỉnh chỉ bằng một câu văn.',
    chapters: [
      { time: '00:00', title: 'Giao diện soạn thảo Indicator IDE' },
      { time: '01:05', title: 'Viết câu lệnh mẫu: SuperTrend kết hợp RSI phân kỳ' },
      { time: '02:15', title: 'Biên dịch code và hiển thị chỉ báo lên biểu đồ' },
      { time: '03:10', title: 'Cài đặt cảnh báo Webhook để bot tự động mua bán' }
    ],
    keyTakeaways: [
      'Không cần học lập trình phức tạp, chỉ cần nói ra chiến lược bạn muốn',
      'Trực quan hóa mũi tên Mua/Bán ngay trên biểu đồ nến',
      'Đóng gói chỉ báo và chia sẻ lên Marketplace'
    ]
  },
  {
    id: 5,
    title: 'Creating Safe API Keys without Withdrawal',
    vietnameseTitle: 'Hướng dẫn tạo và kết nối API Key không cấp quyền rút tiền',
    duration: '04:10',
    category: 'Exchange Connection',
    description: 'Video thao tác thực tế từng bước trên Binance và OKX để tạo API Key an toàn, bật giới hạn IP và xác minh trên Bamboozer.',
    chapters: [
      { time: '00:00', title: 'Các lớp bảo mật của API sàn giao dịch' },
      { time: '01:00', title: 'Thao tác tạo API Key trên Binance (Từng bước)' },
      { time: '02:20', title: 'Tại sao phải TẮT quyền "Enable Withdrawals"' },
      { time: '03:15', title: 'Kiểm tra trạng thái kết nối an toàn trên Bamboozer' }
    ],
    keyTakeaways: [
      'Hiểu rõ cơ chế bảo vệ vốn tuyệt đối qua phân quyền API',
      'Tránh các sai lầm phổ biến khi thiết lập khóa bí mật Secret Key',
      'Tự tin quản lý và thu hồi API Key bất kỳ thời điểm nào'
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    creditsPerMonth: 100,
    aiAnalysisLimit: '10 lượt / ngày',
    aiBotsLimit: '1 Bot hoạt động',
    apiAccountsLimit: '1 Tài khoản sàn',
    highlightFeature: 'Trải nghiệm AI & Xem Marketplace',
    buttonText: 'Bắt đầu miễn phí',
    features: [
      '100 Credits tặng sẵn khi đăng ký tài khoản',
      'Phân tích tài sản AI cơ bản (Crypto & Stocks)',
      '1 Bot chạy tự động (Grid hoặc DCA)',
      'Kết nối 1 tài khoản sàn (Binance / OKX / Bybit)',
      'Theo dõi Dashboard PnL cơ bản',
      'Hỗ trợ qua cộng đồng Telegram'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    priceMonthly: 19.90,
    creditsPerMonth: 200,
    aiAnalysisLimit: '30 lượt / ngày',
    aiBotsLimit: '5 Bots hoạt động',
    apiAccountsLimit: '3 Tài khoản sàn',
    highlightFeature: 'Phù hợp nhà đầu tư bán chủ động',
    buttonText: 'Chọn gói Basic',
    features: [
      '200 Credits cấp mới mỗi tháng',
      'Phân tích toàn diện kèm ATR và Macro Factors',
      '5 Bots giao dịch tự động đồng thời',
      'Kết nối tối đa 3 tài khoản sàn / môi giới',
      'Sử dụng Indicator IDE sinh code AI',
      'Thông báo biến động qua Telegram realtime',
      'Hỗ trợ kỹ thuật qua Email trong 24h'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Khuyên Dùng (Recommended)',
    popular: true,
    priceMonthly: 49.90,
    creditsPerMonth: 600,
    aiAnalysisLimit: 'Không giới hạn (Unlimited)',
    aiBotsLimit: '20 Bots hoạt động',
    apiAccountsLimit: '10 Tài khoản sàn',
    highlightFeature: 'Copy-Trading & Hàng chờ ưu tiên',
    buttonText: 'Nâng cấp gói Pro',
    features: [
      '600 Credits cấp mới mỗi tháng',
      'Phân tích AI không giới hạn số lượt quét',
      '20 Bots giao dịch với đầy đủ 4 kiến trúc',
      'Kết nối 10 tài khoản sàn đa nền tảng',
      'Sao chép chiến lược (Copy-Trading) từ Marketplace',
      'Độ trễ tín hiệu ưu tiên (Priority Queue < 15ms)',
      'Webhooks nâng cao kết nối TradingView',
      'Hỗ trợ ưu tiên 1-on-1 từ chuyên gia Quant'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    badge: 'Flagship Doanh Nghiệp',
    priceMonthly: 99.90,
    creditsPerMonth: 1200,
    aiAnalysisLimit: 'Không giới hạn (Unlimited)',
    aiBotsLimit: 'Không giới hạn (Unlimited)',
    apiAccountsLimit: '25 Tài khoản sàn',
    highlightFeature: 'Được phép Bán chiến lược trên Marketplace',
    buttonText: 'Trở thành VIP Premium',
    features: [
      '1,200 Credits cấp mới mỗi tháng',
      'Toàn quyền tạo bot không giới hạn số lượng',
      'Quản lý danh mục lên đến 25 tài khoản sàn',
      'Được phép xuất bản & BÁN chiến lược kiếm hoa hồng',
      'Truy cập API WebSocket chuyên dụng cho quỹ / Pro Trader',
      'Tùy chỉnh mô hình Quant AI theo yêu cầu riêng',
      'Quản lý tài khoản riêng (Dedicated VIP Manager)'
    ]
  }
];

export const CREDIT_USAGE_RULES = [
  {
    task: 'Phân tích tài sản AI (AI Asset Analysis)',
    cost: '10 Credits / lượt',
    desc: 'Bao gồm tính toán % Confidence, Entry/SL/TP, phân tích ATR và các yếu tố vĩ mô.'
  },
  {
    task: 'Kích hoạt Chiến lược / Copy-Trading',
    cost: 'Từ 300 Credits / chiến lược / tháng',
    desc: 'Sao chép tự động mọi vị thế từ các chiến lược top 1% trên Marketplace.'
  },
  {
    task: 'Khởi tạo Bot AI (AI Smart Bot Launch)',
    cost: 'Từ 300 Credits / bot / tháng',
    desc: 'Bao gồm chi phí vận hành máy chủ tính toán, quét lưới và quản lý lệnh 24/7.'
  }
];

export const FAQS = [
  {
    question: 'Bamboozer có giữ tiền của tôi hay có thể lừa đảo không?',
    answer: 'Hoàn toàn KHÔNG. Bamboozer hoạt động theo mô hình Non-Custodial 100%. Tiền và tài sản của bạn nằm trực tiếp và an toàn trên tài khoản sàn cá nhân (Binance, OKX, Bybit...). Kết nối thông qua API Key của sàn chỉ cấp quyền Đọc và Đặt lệnh, tuyệt đối KHÔNG cấp quyền Rút tiền (Withdrawal). Bạn có thể xóa hoặc vô hiệu hóa API Key trên sàn bất kỳ giây phút nào.'
  },
  {
    question: 'AI của Bamboozer có cam kết lợi nhuận 100% không?',
    answer: 'KHÔNG. Không một hệ thống tài chính uy tín nào có thể cam kết lợi nhuận 100%. Bamboozer xây dựng theo triết lý White-Box Explainable AI (AI hộp trắng minh bạch). Chúng tôi không đưa ra tín hiệu vu vơ mà cung cấp % Confidence Score dựa trên các chỉ số kỹ thuật (RSI, Bollinger Bands, ATR) và vĩ mô (DXY, VIX, NFP), kèm theo các mốc Stop Loss khoa học để bạn quản trị rủi ro nghiêm ngặt.'
  },
  {
    question: 'Tôi có thể tạm dừng hoặc tắt Bot bất kỳ lúc nào không?',
    answer: 'CÓ. Bạn nắm toàn quyền kiểm soát 24/7/365. Ngay trên giao diện quản lý Live Dashboard, bạn có thể bấm Tạm dừng (Pause), Hủy toàn bộ lệnh chờ (Cancel All Orders) hoặc Đóng ngay vị thế theo giá thị trường (Close Position at Market) chỉ với 1 cú nhấp chuột.'
  },
  {
    question: 'Tôi là người mới chưa biết gì về kỹ thuật hoặc lập trình có dùng được không?',
    answer: 'Rất dễ dàng! Hơn 60% người dùng Bamboozer là người mới hoặc nhà đầu tư bán thời gian. Bạn chỉ cần chọn tính năng AI Smart Create, hệ thống sẽ tự tính toán mọi thông số an toàn. Ngoài ra, trung tâm Video Tutorial 5 bài học sẽ hướng dẫn bạn từ lúc kết nối sàn đến khi bot chốt lời đầu tiên chỉ trong 15 phút.'
  },
  {
    question: 'Cơ chế sử dụng Credits hoạt động như thế nào và có hết hạn không?',
    answer: 'Mỗi tháng tài khoản của bạn sẽ được cấp số Credits theo gói thành viên. Bạn dùng Credits để chạy phân tích AI (10 credits) hoặc duy trì bot tự động (từ 300 credits/tháng). Bạn có thể nhận thêm Credits miễn phí thông qua chương trình giới thiệu bạn bè (Referral) hoặc tham gia các sự kiện cộng đồng.'
  },
  {
    question: 'Bamboozer hỗ trợ những loại tài sản và thị trường nào?',
    answer: 'Bamboozer là nền tảng đa tài sản bao gồm: Tiền mã hóa (Crypto hơn 1,500 cặp), Cổ phiếu Mỹ (S&P 500, Nasdaq như NVDA, TSLA, AAPL), Hàng hóa (Vàng XAU/USD, Dầu WTI) và các cặp Ngoại hối Forex chính (EUR/USD, GBP/USD, USD/JPY).'
  }
];

export const LIVE_MARKET_SIGNALS: MarketSignalItem[] = [
  {
    symbol: 'BTC/USDT',
    assetClass: 'Crypto',
    timeframe: '15m',
    signal: 'LONG',
    score: 89,
    triggerPrice: 94820.5,
    changePercent: +3.42,
    timestamp: 'Vừa xong',
    volume24h: '$42.8B'
  },
  {
    symbol: 'ETH/USDT',
    assetClass: 'Crypto',
    timeframe: '1h',
    signal: 'LONG',
    score: 82,
    triggerPrice: 3412.8,
    changePercent: +2.15,
    timestamp: '2 phút trước',
    volume24h: '$18.4B'
  },
  {
    symbol: 'NVDA',
    assetClass: 'US Stocks',
    timeframe: '4h',
    signal: 'LONG',
    score: 94,
    triggerPrice: 138.45,
    changePercent: +4.82,
    timestamp: '5 phút trước',
    volume24h: '$12.1B'
  },
  {
    symbol: 'EUR/USD',
    assetClass: 'Forex',
    timeframe: '1h',
    signal: 'SHORT',
    score: 76,
    triggerPrice: 1.0824,
    changePercent: -0.18,
    timestamp: '8 phút trước',
    volume24h: '$95.3B'
  },
  {
    symbol: 'SOL/USDT',
    assetClass: 'Crypto',
    timeframe: '15m',
    signal: 'LONG',
    score: 87,
    triggerPrice: 188.6,
    changePercent: +5.64,
    timestamp: '11 phút trước',
    volume24h: '$6.2B'
  },
  {
    symbol: 'XAU/USD',
    assetClass: 'Commodity',
    timeframe: '4h',
    signal: 'NEUTRAL',
    score: 64,
    triggerPrice: 2742.6,
    changePercent: -0.35,
    timestamp: '15 phút trước',
    volume24h: '$34.0B'
  }
];
