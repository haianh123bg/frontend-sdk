export type NullableNumber = number | null;
export declare const calcMA: (values: number[], period: number) => NullableNumber[];
export declare const calcEMA: (values: number[], period: number) => NullableNumber[];
export declare const calcRSI: (closes: number[], period: number) => NullableNumber[];
export interface MACDResult {
    dif: NullableNumber[];
    dea: NullableNumber[];
    hist: NullableNumber[];
}
export declare const calcMACD: (closes: number[], fastPeriod: number, slowPeriod: number, signalPeriod: number) => MACDResult;
