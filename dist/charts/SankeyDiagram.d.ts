import { EChartsBaseProps } from './EChartsBase';
import { SankeyDiagramDto } from './dto/sankey-diagram.dto';
import * as React from 'react';
export interface SankeyDiagramProps extends Omit<EChartsBaseProps, 'option'> {
    config: SankeyDiagramDto;
}
export declare const SankeyDiagram: React.FC<SankeyDiagramProps>;
