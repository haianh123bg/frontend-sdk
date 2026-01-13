import { ThemeSwitchProps } from '../components/atoms/ThemeSwitch/ThemeSwitch';
import { ThemeMode } from './types';
import * as React from 'react';
export interface ThemeModeSwitchProps extends Omit<ThemeSwitchProps, 'checked' | 'defaultChecked' | 'onCheckedChange'> {
    showSystemButton?: boolean;
    systemLabel?: string;
    onModeChange?: (mode: ThemeMode) => void;
}
export declare const ThemeModeSwitch: React.FC<ThemeModeSwitchProps>;
