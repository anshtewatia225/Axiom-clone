// Real-time token data service - uses multiple API calls for diverse tokens

export interface TokenData {
    id: string;
    name: string;
    symbol: string;
    price: number;
    priceUsd: string;
    marketCap: string;
    volume: string;
    change1h: number;
    change24h?: number;
    transactions: number;
    liquidity: string;
    timeAgo: string;
    icon?: string;
    pairAddress?: string;
    dexId?: string;
}

interface DexScreenerPair {
    chainId: string;
    dexId: string;
    pairAddress: string;
    baseToken: { address: string; name: string; symbol: string };
    quoteToken: { address: string; name: string; symbol: string };
    priceNative: string;
    priceUsd: string;
    txns: { h1: { buys: number; sells: number }; h24: { buys: number; sells: number } };
    volume: { h1: number; h24: number };
    priceChange: { h1: number; h24: number };
    liquidity: { usd: number };
    fdv: number;
    marketCap?: number;
    pairCreatedAt: number;
    info?: { imageUrl?: string };
}

type Listener = (data: TokenData[]) => void;

// Popular Solana token addresses for diverse data
const POPULAR_TOKENS = [
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK
    'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',  // JUP
    '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', // RAY
    'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',  // ORCA
    'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey',  // MNDE
    'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',  // JTO
    'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk',  // WEN
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
];

class DexScreenerService {
    private listeners: Listener[] = [];
    private fetchIntervalId: NodeJS.Timeout | null = null;
    private tickIntervalId: NodeJS.Timeout | null = null;
    private tokens: TokenData[] = [];
    private isConnected = false;

    async fetchTokens(): Promise<TokenData[]> {
        try {
            // Fetch multiple popular Solana tokens
            const tokenAddresses = POPULAR_TOKENS.join(',');
            const response = await fetch(
                `https://api.dexscreener.com/latest/dex/tokens/${tokenAddresses}`,
                { headers: { 'Accept': 'application/json' }, cache: 'no-store' }
            );

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const data = await response.json();
            const pairs: DexScreenerPair[] = data.pairs || [];

            // Get unique tokens (one pair per base token)
            const seenTokens = new Set<string>();
            const uniquePairs = pairs.filter(p => {
                if (seenTokens.has(p.baseToken.symbol)) return false;
                seenTokens.add(p.baseToken.symbol);
                return true;
            }).slice(0, 24);

            if (uniquePairs.length === 0) {
                return this.getFallbackData();
            }

            return uniquePairs.map(pair => this.transformPair(pair));
        } catch (error) {
            console.error('API Error:', error);
            return this.getFallbackData();
        }
    }

    private transformPair(pair: DexScreenerPair): TokenData {
        const ageMs = Date.now() - (pair.pairCreatedAt || Date.now());
        const priceNum = parseFloat(pair.priceUsd) || 0;

        return {
            id: pair.pairAddress,
            name: pair.baseToken.name || 'Unknown',
            symbol: pair.baseToken.symbol || '???',
            price: priceNum,
            priceUsd: this.formatPrice(priceNum),
            marketCap: this.formatCurrency(pair.marketCap || pair.fdv || 0),
            volume: this.formatCurrency(pair.volume?.h1 || 0),
            change1h: pair.priceChange?.h1 || 0,
            change24h: pair.priceChange?.h24 || 0,
            transactions: (pair.txns?.h1?.buys || 0) + (pair.txns?.h1?.sells || 0),
            liquidity: this.formatCurrency(pair.liquidity?.usd || 0),
            timeAgo: this.formatTimeAgo(ageMs),
            icon: pair.info?.imageUrl,
            pairAddress: pair.pairAddress,
            dexId: pair.dexId,
        };
    }

    private simulateTick() {
        this.tokens = this.tokens.map(token => {
            const change = (Math.random() - 0.5) * 0.04;
            const newPrice = Math.max(0.00000001, token.price * (1 + change));
            const newChange1h = token.change1h + (Math.random() - 0.5) * 0.3;
            const newTxns = token.transactions + (Math.random() > 0.7 ? 1 : 0);

            return {
                ...token,
                price: newPrice,
                priceUsd: this.formatPrice(newPrice),
                change1h: parseFloat(newChange1h.toFixed(2)),
                transactions: newTxns,
            };
        });
        this.notifyListeners();
    }

    private formatPrice(v: number): string {
        if (v < 0.0001) return `$${v.toFixed(10)}`;
        if (v < 0.01) return `$${v.toFixed(6)}`;
        if (v < 1) return `$${v.toFixed(4)}`;
        return `$${v.toFixed(2)}`;
    }

    private formatCurrency(v: number): string {
        if (!v) return '$0';
        if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
        if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
        if (v >= 1e3) return `$${(v / 1e3).toFixed(2)}K`;
        return `$${v.toFixed(2)}`;
    }

    private formatTimeAgo(ms: number): string {
        const s = Math.floor(ms / 1000), m = Math.floor(s / 60), h = Math.floor(m / 60), d = Math.floor(h / 24);
        if (d > 0) return `${d}d`;
        if (h > 0) return `${h}h`;
        if (m > 0) return `${m}m`;
        return `${s}s`;
    }

    private getFallbackData(): TokenData[] {
        return [
            { id: '1', name: 'Bonk', symbol: 'BONK', price: 0.00002145, priceUsd: '$0.00002145', marketCap: '$1.4B', volume: '$89M', change1h: -1.2, transactions: 8234, liquidity: '$45M', timeAgo: '1y' },
            { id: '2', name: 'Jupiter', symbol: 'JUP', price: 0.89, priceUsd: '$0.89', marketCap: '$1.2B', volume: '$45M', change1h: 0.8, transactions: 3421, liquidity: '$32M', timeAgo: '6m' },
            { id: '3', name: 'Raydium', symbol: 'RAY', price: 4.56, priceUsd: '$4.56', marketCap: '$1.1B', volume: '$34M', change1h: 3.1, transactions: 2156, liquidity: '$28M', timeAgo: '2y' },
            { id: '4', name: 'Orca', symbol: 'ORCA', price: 3.21, priceUsd: '$3.21', marketCap: '$320M', volume: '$12M', change1h: 1.5, transactions: 1234, liquidity: '$18M', timeAgo: '1y' },
            { id: '5', name: 'Marinade', symbol: 'MNDE', price: 0.12, priceUsd: '$0.12', marketCap: '$98M', volume: '$4M', change1h: -0.5, transactions: 567, liquidity: '$8M', timeAgo: '1y' },
            { id: '6', name: 'Jito', symbol: 'JTO', price: 2.34, priceUsd: '$2.34', marketCap: '$780M', volume: '$28M', change1h: 4.2, transactions: 2890, liquidity: '$22M', timeAgo: '3m' },
            { id: '7', name: 'WEN', symbol: 'WEN', price: 0.00008, priceUsd: '$0.00008', marketCap: '$56M', volume: '$8M', change1h: -2.1, transactions: 1567, liquidity: '$5M', timeAgo: '2m' },
            { id: '8', name: 'USD Coin', symbol: 'USDC', price: 1.00, priceUsd: '$1.00', marketCap: '$32B', volume: '$1.2B', change1h: 0.0, transactions: 45000, liquidity: '$500M', timeAgo: '3y' },
        ];
    }

    connect(callback: Listener) {
        this.listeners.push(callback);
        if (!this.isConnected) {
            this.startPolling();
            this.isConnected = true;
        }
        this.fetchAndNotify();
    }

    disconnect(callback: Listener) {
        this.listeners = this.listeners.filter(l => l !== callback);
        if (this.listeners.length === 0) {
            this.stopPolling();
            this.isConnected = false;
        }
    }

    private startPolling() {
        // Fetch fresh data every 15s
        this.fetchIntervalId = setInterval(() => this.fetchAndNotify(), 15000);
        // Simulate ticks every 800ms
        this.tickIntervalId = setInterval(() => this.simulateTick(), 800);
    }

    private stopPolling() {
        if (this.fetchIntervalId) clearInterval(this.fetchIntervalId);
        if (this.tickIntervalId) clearInterval(this.tickIntervalId);
        this.fetchIntervalId = null;
        this.tickIntervalId = null;
    }

    private async fetchAndNotify() {
        this.tokens = await this.fetchTokens();
        this.notifyListeners();
    }

    private notifyListeners() {
        this.listeners.forEach(l => l(this.tokens));
    }
}

export const dexScreenerService = new DexScreenerService();
export const wsMock = dexScreenerService;
