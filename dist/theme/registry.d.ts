import { ThemeDefinition } from './types';

export declare const registerTheme: (theme: ThemeDefinition, options?: {
    replace?: boolean;
}) => void;
export declare const registerThemes: (themes: ThemeDefinition[], options?: {
    replace?: boolean;
}) => void;
export declare const unregisterTheme: (themeName: string) => void;
export declare const getRegisteredTheme: (themeName: string) => ThemeDefinition | undefined;
export declare const listRegisteredThemes: () => ThemeDefinition[];
export declare const clearRegisteredThemes: () => void;
