export type FinancialTime = string | number | Date;
export interface FinancialCandle {
    time: FinancialTime;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}
export type FinancialIndicator = {
    type: 'MA';
    period: number;
    name?: string;
    color?: string;
} | {
    type: 'EMA';
    period: number;
    name?: string;
    color?: string;
} | {
    type: 'RSI';
    period?: number;
    name?: string;
    color?: string;
} | {
    type: 'MACD';
    fast?: number;
    slow?: number;
    signal?: number;
    name?: string;
    colors?: {
        macdUp?: string;
        macdDown?: string;
        dif?: string;
        dea?: string;
    };
};
export interface FinancialChartDto {
    title?: string;
    candles: FinancialCandle[];
    showVolume?: boolean;
    indicators?: FinancialIndicator[];
    upColor?: string;
    downColor?: string;
}
