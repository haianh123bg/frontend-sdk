import { ResolvedThemeMode, ThemeDefinition, ThemeMode } from './types';
import * as React from 'react';
export interface ThemeContextValue {
    themeName: string;
    mode: ThemeMode;
    resolvedMode: ResolvedThemeMode;
    theme?: ThemeDefinition;
    themes: ThemeDefinition[];
    setThemeName: (themeName: string) => void;
    setMode: (mode: ThemeMode) => void;
}
export declare const useTheme: () => ThemeContextValue;
export interface ThemeProviderProps {
    children: React.ReactNode;
    themes?: ThemeDefinition[];
    defaultThemeName?: string;
    defaultMode?: ThemeMode;
    storageKey?: string;
    disablePersistence?: boolean;
    root?: 'documentElement' | 'body';
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
