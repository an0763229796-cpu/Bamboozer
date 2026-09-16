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
