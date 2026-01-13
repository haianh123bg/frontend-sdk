import { EChartsBaseProps } from './EChartsBase';
import { GeographicMapDto } from './dto/geographic-map.dto';
import * as React from 'react';
/**
 * Lưu ý: Cần gọi `echarts.registerMap(mapName, geoJson)` ở phía app trước khi dùng component này.
 */
export interface GeographicMapProps extends Omit<EChartsBaseProps, 'option'> {
    config: GeographicMapDto;
}
export declare const GeographicMap: React.FC<GeographicMapProps>;
