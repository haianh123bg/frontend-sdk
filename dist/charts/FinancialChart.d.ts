import { EChartsOption } from 'echarts';
import { EChartsBaseProps } from './EChartsBase';
import { FinancialChartDto } from './dto/financial-chart.dto';
import * as React from 'react';
export interface FinancialChartProps extends Omit<EChartsBaseProps, 'option'> {
    config: FinancialChartDto;
    optionOverrides?: EChartsOption | ((base: EChartsOption) => EChartsOption);
}
export declare const FinancialChart: React.FC<FinancialChartProps>;
