export type AssetType = 'crypto' | 'stock' | 'forex' | 'commodity';

export interface AssetAnalysisData {
  symbol: string;
  name: string;
  type: AssetType;
  price: number;
  change24h: number;
  recommendation: 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG SELL';
  confidenceScore: number;
  multiTimeframeConsensus: {
    tf15m: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    tf1h: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    tf4h: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    tf1d: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  };
  entryZone: [number, number];
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  atrValue: number;
  macroFactors: {
    fearGreedIndex: number;
    fearGreedLabel: string;
    dxyIndex: number;
    vixIndex: number;
    marketSentiment: string;
  };
  technicalReasons: string[];
}

export interface BotArchitecture {
  id: string;
  name: string;
  vietnameseName: string;
  riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
  riskColor: string;
  description: string;
  bestMarketCondition: string;
  winRate: string;
  backtestedReturn: string;
  activeUsers: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  priceMonthly: number;
  creditsPerMonth: number;
  aiAnalysisLimit: string;
  aiBotsLimit: string;
  apiAccountsLimit: string;
  highlightFeature: string;
  features: string[];
  buttonText: string;
}

export interface VideoTutorial {
  id: number;
  title: string;
  vietnameseTitle: string;
  duration: string;
  category: string;
  description: string;
  chapters: { time: string; title: string }[];
  keyTakeaways: string[];
}

export interface ModuleShowcase {
  id: string;
  badge: string;
  title: string;
  vietnameseTitle?: string;
  vietnameseName?: string;
  summary: string;
  description: string;
  highlights: string[];
  quickGuideTitle: string;
  quickGuideContent: {
    step: string;
    action: string;
    tip: string;
  }[];
}

export interface MarketSignalItem {
  symbol: string;
  assetClass: string;
  timeframe: string;
  signal: 'LONG' | 'SHORT' | 'NEUTRAL';
  score: number; // 0 - 100
  triggerPrice: number;
  changePercent: number;
  timestamp: string;
  volume24h: string;
}

// ==========================================
// CAMPAIGN & TRADING SPRINT CHALLENGE TYPES
// ==========================================

export type ParticipantStatus = 'Active' | 'Disqualified' | 'Warning' | 'Winner';

export interface EquityPoint {
  day: string;
  timestamp: string;
  equity: number;
  pnl: number;
  roi: number;
}

export interface TradeHistory {
  id: string;
  participantId: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  leverage: number;
  entryPrice: number;
  closePrice: number;
  pnl: number;
  pnlPercent: number;
  openedAt: string;
  closedAt: string;
  status: 'OPEN' | 'CLOSED';
}

export interface Participant {
  id: string;
  rank: number;
  username: string;
  fullName?: string;
  avatar?: string;
  country: string;
  countryFlag: string;
  initialBalance: number;
  currentBalance: number;
  pnl: number;
  roi: number; // in percentage e.g. +142.8%
  maxDrawdown: number; // in percentage e.g. 4.2%
  winRate: number; // in percentage e.g. 74%
  tradesCount: number;
  status: ParticipantStatus;
  disqualifiedReason?: string;
  badge?: 'Top 1' | 'Top 2' | 'Top 3' | 'VIP' | 'Risk Master' | 'Sniper' | 'Rising Star';
  equityCurve: EquityPoint[];
  trades: TradeHistory[];
  registeredAt: string;
  kolRef?: string;
}

export interface ChallengeSeason {
  id: string;
  name: string;
  seasonNumber: number;
  totalPrizeUsdt: number; // $1,140
  cashPrizeUsdt: number; // $210
  proSubscriptionUsdt: number; // $930
  startDate: string;
  endDate: string;
  status: 'live' | 'upcoming' | 'completed';
  totalParticipants: number;
  activeParticipants: number;
  rules: {
    minTrades: number;
    maxDrawdownPercent: number; // 10%
    leverageLimit: number;
    eligiblePairs: string[];
    disqualificationRule: string;
  };
  prizes: {
    rank: string;
    title: string;
    cashUsdt: number;
    proValueUsdt: number;
    proMonths: string;
    totalValueUsdt: number;
    icon: string;
  }[];
}

export interface CampaignSummary {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
  type: 'TRADING_SPRINT' | 'AI_BOT_LEAGUE' | 'QUANT_HACKATHON' | 'COMMUNITY_AIRDROP';
  prizePoolFormatted: string;
  prizePoolUsdt: number;
  startDate: string;
  endDate: string;
  participantsCount: number;
  category: string;
  bannerGradient: string;
  featured?: boolean;
  affiliateRef: string;
  badgeText: string;
}

export interface TelemetryClickEvent {
  id: string;
  timestamp: string;
  refCode: string;
  targetUrl: string;
  sourceComponent: string;
  actionType: 'click_affiliate' | 'modal_submit' | 'challenge_join' | 'view_leaderboard' | 'export_data';
  userAgent?: string;
  metadata?: Record<string, any>;
}

export interface KOLPartner {
  id: string;
  code: string;
  name: string;
  channel: string;
  clicksCount: number;
  signupsCount: number;
  activeTraders: number;
  conversionRate: number;
}

