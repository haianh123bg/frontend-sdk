import { ECharts, EChartsOption } from 'echarts';
import * as React from 'react';
export interface EChartsBaseProps {
    option: EChartsOption;
    height?: number | string;
    className?: string;
    instanceId?: string;
    notMerge?: boolean;
    lazyUpdate?: boolean;
    extraEvents?: Record<string, (params: any) => void>;
    onChartReadyInstance?: (chart: ECharts) => void;
}
export declare const EChartsBase: React.FC<EChartsBaseProps>;
