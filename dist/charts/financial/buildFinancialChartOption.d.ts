import { EChartsOption } from 'echarts';
import { FinancialChartDto } from '../dto/financial-chart.dto';

type Overrides = EChartsOption | ((base: EChartsOption) => EChartsOption) | undefined;
export declare const applyOptionOverrides: (base: EChartsOption, overrides: Overrides) => EChartsOption;
export declare const buildFinancialChartOption: (config: FinancialChartDto) => EChartsOption;
export {};
