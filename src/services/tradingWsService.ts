export type MarketTickerCallback = (data: Record<string, { price: number; change24h: number }>) => void;

export interface LeaderboardTickData {
  traderId: string;
  traderName?: string;
  deltaRoi: number;
  deltaPnl: number;
  direction: 'UP' | 'DOWN';
  timestamp: string;
  symbol?: string;
  side?: 'LONG' | 'SHORT';
}

export type LeaderboardTickCallback = (update: LeaderboardTickData) => void;

export interface LiveTradeExecution {
  id: string;
  traderId: string;
  traderName: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  leverage: number;
  pnl: number;
  pnlPercent: number;
  timestamp: string;
}

export type TradeExecutionCallback = (trade: LiveTradeExecution) => void;

const ACTIVE_TRADERS = [
  { id: 'trader-01', name: 'NguyenQuant99' },
  { id: 'trader-02', name: 'AlphaSniper_SG' },
  { id: 'trader-03', name: 'CryptoDragon_DN' },
  { id: 'trader-04', name: 'QuantSamurai' },
  { id: 'trader-05', name: 'PhamPropMaster' },
  { id: 'trader-06', name: 'VolatilityBeast' },
  { id: 'trader-07', name: 'SiamQuantScalper' },
  { id: 'trader-08', name: 'GridMaster_AI' },
  { id: 'trader-09', name: 'RiskHedger_99' },
];

const SYMBOLS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT'];

class TradingWsService {
  private tickerInterval: any = null;
  private leaderboardInterval: any = null;
  private tickerListeners: MarketTickerCallback[] = [];
  private leaderboardListeners: LeaderboardTickCallback[] = [];
  private tradeExecutionListeners: TradeExecutionCallback[] = [];
  private tickSpeedMs: number = 1800; // Real-time tick every 1.8s
  private isStreaming: boolean = true;

  private prices = {
    BTC: { price: 91450, change24h: 3.42 },
    ETH: { price: 3392, change24h: 2.15 },
    SOL: { price: 188.4, change24h: 5.68 },
    BNB: { price: 642.1, change24h: 1.84 },
  };

  constructor() {
    this.start();
  }

  public start() {
    if (this.tickerInterval) return;

    // Market Ticker Interval (2.5s)
    this.tickerInterval = setInterval(() => {
      if (!this.isStreaming) return;
      for (const sym of Object.keys(this.prices) as (keyof typeof this.prices)[]) {
        const delta = (Math.random() - 0.49) * (this.prices[sym].price * 0.0012);
        this.prices[sym].price = +(this.prices[sym].price + delta).toFixed(sym === 'SOL' ? 2 : 1);
      }
      this.tickerListeners.forEach((cb) => cb({ ...this.prices }));
    }, 2500);

    // Leaderboard Live Ticks
    this.startLeaderboardInterval();
  }

  private startLeaderboardInterval() {
    if (this.leaderboardInterval) clearInterval(this.leaderboardInterval);

    this.leaderboardInterval = setInterval(() => {
      if (!this.isStreaming) return;
      this.emitRandomTick();
    }, this.tickSpeedMs);
  }

  public emitRandomTick() {
    // Prioritize user trader (trader-01) so "Bảng xếp hạng tôi" is actively updated real-time
    const pickUser = Math.random() < 0.45;
    const traderObj = pickUser ? ACTIVE_TRADERS[0] : ACTIVE_TRADERS[Math.floor(Math.random() * ACTIVE_TRADERS.length)];
    this.emitTraderTick(traderObj);

    // If another trader was picked, 40% chance to also emit a micro-tick for trader-01 so user's standing is constantly live
    if (!pickUser && Math.random() < 0.45) {
      setTimeout(() => {
        if (this.isStreaming) {
          this.emitTraderTick(ACTIVE_TRADERS[0], true);
        }
      }, 450);
    }
  }

  private emitTraderTick(traderObj: { id: string; name: string }, isMicro: boolean = false) {
    const isUp = Math.random() > 0.44;
    const baseRoi = isMicro ? 0.15 : 0.45;
    const deltaRoi = isUp
      ? +(Math.random() * baseRoi + 0.04).toFixed(2)
      : -(Math.random() * (baseRoi * 0.8) + 0.04).toFixed(2);
    const deltaPnl = +(deltaRoi * 10).toFixed(2);
    const sym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const side: 'LONG' | 'SHORT' = Math.random() > 0.5 ? 'LONG' : 'SHORT';

    const tickData: LeaderboardTickData = {
      traderId: traderObj.id,
      traderName: traderObj.name,
      deltaRoi,
      deltaPnl,
      direction: deltaRoi >= 0 ? 'UP' : 'DOWN',
      timestamp: new Date().toLocaleTimeString(),
      symbol: sym,
      side,
    };

    this.leaderboardListeners.forEach((cb) => cb(tickData));

    // Also emit a trade execution toast if significant move
    if (Math.abs(deltaRoi) > 0.12) {
      const execTrade: LiveTradeExecution = {
        id: `exec-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        traderId: traderObj.id,
        traderName: traderObj.id === 'trader-01' ? 'Bạn (NguyenQuant99)' : traderObj.name,
        symbol: sym,
        side,
        leverage: Math.floor(Math.random() * 10) + 10,
        pnl: deltaPnl,
        pnlPercent: deltaRoi,
        timestamp: new Date().toLocaleTimeString(),
      };
      this.tradeExecutionListeners.forEach((cb) => cb(execTrade));
    }
  }

  public setStreaming(streaming: boolean) {
    this.isStreaming = streaming;
  }

  public setSpeed(speedMs: number) {
    this.tickSpeedMs = speedMs;
    this.startLeaderboardInterval();
  }

  public triggerUserSimulation(traderId: string, roiGain: number) {
    const pnlGain = +(roiGain * 10).toFixed(2);
    const tickData: LeaderboardTickData = {
      traderId,
      traderName: 'Bạn (NguyenQuant99)',
      deltaRoi: roiGain,
      deltaPnl: pnlGain,
      direction: roiGain >= 0 ? 'UP' : 'DOWN',
      timestamp: new Date().toLocaleTimeString(),
      symbol: 'BTC/USDT',
      side: roiGain >= 0 ? 'LONG' : 'SHORT',
    };
    this.leaderboardListeners.forEach((cb) => cb(tickData));

    const execTrade: LiveTradeExecution = {
      id: `exec-user-${Date.now()}`,
      traderId,
      traderName: 'Bạn (NguyenQuant99)',
      symbol: 'BTC/USDT',
      side: roiGain >= 0 ? 'LONG' : 'SHORT',
      leverage: 20,
      pnl: pnlGain,
      pnlPercent: roiGain,
      timestamp: new Date().toLocaleTimeString(),
    };
    this.tradeExecutionListeners.forEach((cb) => cb(execTrade));
  }

  public subscribeTicker(callback: MarketTickerCallback): () => void {
    this.tickerListeners.push(callback);
    callback({ ...this.prices });
    return () => {
      this.tickerListeners = this.tickerListeners.filter((cb) => cb !== callback);
    };
  }

  public subscribeLeaderboard(callback: LeaderboardTickCallback): () => void {
    this.leaderboardListeners.push(callback);
    return () => {
      this.leaderboardListeners = this.leaderboardListeners.filter((cb) => cb !== callback);
    };
  }

  public subscribeTradeExecutions(callback: TradeExecutionCallback): () => void {
    this.tradeExecutionListeners.push(callback);
    return () => {
      this.tradeExecutionListeners = this.tradeExecutionListeners.filter((cb) => cb !== callback);
    };
  }

  public stop() {
    if (this.tickerInterval) clearInterval(this.tickerInterval);
    if (this.leaderboardInterval) clearInterval(this.leaderboardInterval);
    this.tickerInterval = null;
    this.leaderboardInterval = null;
  }
}

export const tradingWs = new TradingWsService();
