import { EChartsBaseProps } from './EChartsBase';
import { CohortAnalysisDto } from './dto/cohort-analysis.dto';
import * as React from 'react';
export interface CohortAnalysisProps extends Omit<EChartsBaseProps, 'option'> {
    config: CohortAnalysisDto;
}
export declare const CohortAnalysis: React.FC<CohortAnalysisProps>;
