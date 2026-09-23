export type MarketTickerCallback = (data: Record<string, { price: number; change24h: number; high24h?: number; low24h?: number; volume24hUsd?: number }>) => void;

export interface MarketAggregateData {
  totalVolume24hUsd: number;
  openPositionsCount: number;
  validTradersCount: number;
  disqualifiedCount: number;
  avgWinRate: number;
  isLiveConnected: boolean;
  lastUpdateTimestamp: string;
}

export type MarketAggregateCallback = (data: MarketAggregateData) => void;

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

const SYMBOLS_MAPPING: Record<string, string> = {
  BTCUSDT: 'BTC',
  ETHUSDT: 'ETH',
  SOLUSDT: 'SOL',
  BNBUSDT: 'BNB',
  XRPUSDT: 'XRP',
  AVAXUSDT: 'AVAX',
  DOGEUSDT: 'DOGE',
};

const SYMBOLS_LIST = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT'];

class TradingWsService {
  private binanceWs: WebSocket | null = null;
  private restPollInterval: any = null;
  private leaderboardInterval: any = null;
  private tickerListeners: MarketTickerCallback[] = [];
  private aggregateListeners: MarketAggregateCallback[] = [];
  private leaderboardListeners: LeaderboardTickCallback[] = [];
  private tradeExecutionListeners: TradeExecutionCallback[] = [];
  private tickSpeedMs: number = 1800;
  private isStreaming: boolean = true;
  private isLiveConnected: boolean = false;

  private prices: Record<string, { price: number; change24h: number; high24h?: number; low24h?: number; volume24hUsd?: number }> = {
    BTC: { price: 86450.0, change24h: 1.35, volume24hUsd: 2450000000 },
    ETH: { price: 2185.5, change24h: 0.95, volume24hUsd: 1120000000 },
    SOL: { price: 135.25, change24h: 3.82, volume24hUsd: 580000000 },
    BNB: { price: 592.4, change24h: 1.12, volume24hUsd: 320000000 },
    XRP: { price: 2.24, change24h: 4.15, volume24hUsd: 410000000 },
    AVAX: { price: 22.8, change24h: -1.15, volume24hUsd: 120000000 },
    DOGE: { price: 0.1685, change24h: 5.40, volume24hUsd: 280000000 },
  };

  private prevBtcPrice: number = 86450.0;

  constructor() {
    this.start();
  }

  public start() {
    // 1. Initial REST fetch for immediate real-world Binance prices
    this.fetchBinanceRest();

    // 2. Connect to live Binance WebSocket stream
    this.connectBinanceWs();

    // 3. Fallback/synchronization REST polling every 4.5 seconds
    if (!this.restPollInterval) {
      this.restPollInterval = setInterval(() => {
        if (this.isStreaming) {
          this.fetchBinanceRest();
        }
      }, 4500);
    }

    // 4. Leaderboard real-time ticks
    this.startLeaderboardInterval();
  }

  private async fetchBinanceRest() {
    try {
      const symbolsJson = JSON.stringify(['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'AVAXUSDT', 'DOGEUSDT']);
      // Try primary Binance API, fallback to data-api.binance.vision
      let res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbolsJson)}`, {
        cache: 'no-store',
      }).catch(() => null);

      if (!res || !res.ok) {
        res = await fetch(`https://data-api.binance.vision/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbolsJson)}`, {
          cache: 'no-store',
        }).catch(() => null);
      }

      if (res && res.ok) {
        const data: Array<{
          symbol: string;
          lastPrice: string;
          priceChangePercent: string;
          highPrice: string;
          lowPrice: string;
          quoteVolume: string;
        }> = await res.json();

        let totalQuoteVol = 0;

        for (const item of data) {
          const symKey = SYMBOLS_MAPPING[item.symbol];
          if (symKey) {
            const price = parseFloat(item.lastPrice);
            const change24h = parseFloat(item.priceChangePercent);
            const high24h = parseFloat(item.highPrice);
            const low24h = parseFloat(item.lowPrice);
            const volume24hUsd = parseFloat(item.quoteVolume);

            totalQuoteVol += volume24hUsd;

            if (symKey === 'BTC') {
              this.prevBtcPrice = this.prices.BTC.price;
            }

            this.prices[symKey] = {
              price,
              change24h,
              high24h,
              low24h,
              volume24hUsd,
            };
          }
        }

        this.isLiveConnected = true;
        this.emitTickerUpdate();
        this.emitAggregateUpdate(totalQuoteVol);
      }
    } catch {
      // In case of network interruption, apply small live micro-ticks
      this.applyFallbackMicroTicks();
    }
  }

  private connectBinanceWs() {
    try {
      // Stream 24hr miniTicker for all market pairs in real time
      const streamUrl = 'wss://stream.binance.com:9443/ws/!miniTicker@arr';
      this.binanceWs = new WebSocket(streamUrl);

      this.binanceWs.onopen = () => {
        this.isLiveConnected = true;
      };

      this.binanceWs.onmessage = (event) => {
        if (!this.isStreaming) return;
        try {
          const raw = JSON.parse(event.data);
          if (Array.isArray(raw)) {
            let hasUpdate = false;
            let totalQuoteVol = 0;

            for (const ticker of raw) {
              const symKey = SYMBOLS_MAPPING[ticker.s];
              if (symKey) {
                const currentPrice = parseFloat(ticker.c);
                const openPrice = parseFloat(ticker.o);
                const change24h = openPrice > 0 ? +(((currentPrice - openPrice) / openPrice) * 100).toFixed(2) : 0;
                const high24h = parseFloat(ticker.h);
                const low24h = parseFloat(ticker.l);
                const volume24hUsd = parseFloat(ticker.q);

                totalQuoteVol += volume24hUsd;

                if (symKey === 'BTC') {
                  this.prevBtcPrice = this.prices.BTC.price;
                }

                this.prices[symKey] = {
                  price: currentPrice,
                  change24h,
                  high24h,
                  low24h,
                  volume24hUsd,
                };
                hasUpdate = true;
              }
            }

            if (hasUpdate) {
              this.emitTickerUpdate();
              if (totalQuoteVol > 0) {
                this.emitAggregateUpdate(totalQuoteVol);
              }
            }
          }
        } catch {
          // ignore parsing error
        }
      };

      this.binanceWs.onerror = () => {
        this.isLiveConnected = false;
      };

      this.binanceWs.onclose = () => {
        this.isLiveConnected = false;
        // Auto-reconnect after 4s
        setTimeout(() => {
          if (this.isStreaming) {
            this.connectBinanceWs();
          }
        }, 4000);
      };
    } catch {
      this.isLiveConnected = false;
    }
  }

  private applyFallbackMicroTicks() {
    for (const sym of Object.keys(this.prices)) {
      const volatility = sym === 'BTC' ? 4.5 : sym === 'ETH' ? 0.8 : sym === 'SOL' ? 0.2 : 0.05;
      const delta = (Math.random() - 0.49) * volatility;
      const current = this.prices[sym];
      const decimals = sym === 'DOGE' ? 4 : sym === 'XRP' || sym === 'SOL' ? 2 : 1;
      this.prices[sym] = {
        ...current,
        price: +(current.price + delta).toFixed(decimals),
      };
    }
    this.emitTickerUpdate();
  }

  private emitTickerUpdate() {
    const copy = { ...this.prices };
    this.tickerListeners.forEach((cb) => cb(copy));
  }

  private emitAggregateUpdate(liveVolumeUsd?: number) {
    const totalVol = liveVolumeUsd && liveVolumeUsd > 1000000
      ? liveVolumeUsd
      : Object.values(this.prices).reduce((acc, curr) => acc + (curr.volume24hUsd || 0), 0);

    const aggData: MarketAggregateData = {
      totalVolume24hUsd: totalVol,
      openPositionsCount: 342 + Math.floor(Math.sin(Date.now() / 10000) * 12),
      validTradersCount: 59,
      disqualifiedCount: 9,
      avgWinRate: 64.2 + +(Math.sin(Date.now() / 25000) * 1.2).toFixed(1),
      isLiveConnected: this.isLiveConnected,
      lastUpdateTimestamp: new Date().toLocaleTimeString(),
    };

    this.aggregateListeners.forEach((cb) => cb(aggData));
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

    if (!pickUser && Math.random() < 0.45) {
      setTimeout(() => {
        if (this.isStreaming) {
          this.emitTraderTick(ACTIVE_TRADERS[0], true);
        }
      }, 450);
    }
  }

  private emitTraderTick(traderObj: { id: string; name: string }, isMicro: boolean = false) {
    // Correlate with real BTC price direction if BTC moved
    const btcDelta = this.prices.BTC.price - this.prevBtcPrice;
    const btcMovedUp = btcDelta >= 0;

    const side: 'LONG' | 'SHORT' = Math.random() > 0.48 ? 'LONG' : 'SHORT';
    const correlatedUp = side === 'LONG' ? btcMovedUp : !btcMovedUp;
    const isUp = Math.random() < 0.7 ? correlatedUp : Math.random() > 0.45;

    const baseRoi = isMicro ? 0.15 : 0.45;
    const deltaRoi = isUp
      ? +(Math.random() * baseRoi + 0.04).toFixed(2)
      : -(Math.random() * (baseRoi * 0.8) + 0.04).toFixed(2);
    const deltaPnl = +(deltaRoi * 10).toFixed(2);
    const sym = SYMBOLS_LIST[Math.floor(Math.random() * SYMBOLS_LIST.length)];

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
        traderName: traderObj.name,
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

  public subscribeMarketAggregate(callback: MarketAggregateCallback): () => void {
    this.aggregateListeners.push(callback);
    this.emitAggregateUpdate();
    return () => {
      this.aggregateListeners = this.aggregateListeners.filter((cb) => cb !== callback);
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

  public getPrices() {
    return { ...this.prices };
  }

  public stop() {
    if (this.binanceWs) {
      try {
        this.binanceWs.close();
      } catch {
        // ignore
      }
      this.binanceWs = null;
    }
    if (this.restPollInterval) clearInterval(this.restPollInterval);
    if (this.leaderboardInterval) clearInterval(this.leaderboardInterval);
    this.restPollInterval = null;
    this.leaderboardInterval = null;
  }
}

export const tradingWs = new TradingWsService();
