import * as React from 'react';
export interface UseChartAiControlOptions {
    instanceId: string;
    chartRef: React.RefObject<any>;
}
export declare const useChartAiControl: (options: UseChartAiControlOptions) => void;
