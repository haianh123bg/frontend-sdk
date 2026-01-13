import { EChartsBaseProps } from './EChartsBase';
import { TreeMapDto } from './dto/tree-map.dto';
import * as React from 'react';
export interface TreeMapProps extends Omit<EChartsBaseProps, 'option'> {
    config: TreeMapDto;
}
export declare const TreeMap: React.FC<TreeMapProps>;
