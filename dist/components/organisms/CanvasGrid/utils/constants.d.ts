/**
 * Canvas Grid Constants
 * Based on NocoDB Grid Constants
 */
export declare const COLUMN_HEADER_HEIGHT_IN_PX = 32;
export declare const ROW_HEIGHT_IN_PX: Record<number, number>;
export declare const ROW_META_COLUMN_WIDTH = 48;
export declare const ADD_NEW_COLUMN_WIDTH = 150;
export declare const AGGREGATION_HEIGHT = 32;
export declare const GROUP_HEADER_HEIGHT = 40;
export declare const GROUP_PADDING = 16;
export declare const CELL_PADDING = 8;
export declare const CELL_BOTTOM_BORDER_IN_PX = 1;
export declare const ROW_COLOR_BORDER_WIDTH = 3;
export declare const DEFAULT_FONT_FAMILY = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
export declare const DEFAULT_FONT_SIZE = 13;
export declare const HEADER_FONT_SIZE = 12;
export declare const FONT_WEIGHT: {
    NORMAL: "normal";
    BOLD: "bold";
};
export declare const GRID_COLORS: {
    BORDER: string;
    BORDER_DARK: string;
    HEADER_BG: string;
    HEADER_TEXT: string;
    CELL_BG: string;
    CELL_BG_HOVER: string;
    CELL_BG_SELECTED: string;
    CELL_BG_EDITING: string;
    TEXT: string;
    TEXT_DISABLED: string;
    PLACEHOLDER: string;
    ERROR: string;
    WARNING: string;
    SUCCESS: string;
    GROUP_HEADER_BG: string;
    GROUP_HEADER_BORDER: string;
    NEW_ROW_INDICATOR: string;
};
export declare const SELECTION_COLORS: {
    PRIMARY: string;
    PRIMARY_LIGHT: string;
    BORDER: string;
};
export declare const SCROLL_THRESHOLD = 100;
export declare const VIRTUAL_ROW_OVERSCAN = 5;
export declare const VIRTUAL_COL_OVERSCAN = 3;
export declare const MAX_CACHED_ROWS = 1000;
export declare const MAX_CACHED_CELLS = 5000;
export declare const DEBOUNCE_SCROLL_MS = 16;
export declare const THROTTLE_RESIZE_MS = 100;
export declare const EDIT_INTERACTABLE = true;
export declare const NO_EDITABLE_CELL: string[];
export declare const FILL_HANDLE_SIZE = 8;
export declare const FILL_HANDLE_CORNER_SIZE = 6;
export declare const COPY_PASTE_DELIMITER = "\t";
export declare const COPY_PASTE_NEWLINE = "\n";
export declare const MAX_SELECTED_ROWS = 1000;
export declare const MAX_SELECTED_CELLS = 10000;
export declare const ANIMATION_DURATION_MS = 200;
export declare const HOVER_DELAY_MS = 150;
export declare const DEFAULT_COLUMN_WIDTHS: Record<string, number>;
export declare const CELL_TYPE_ICONS: Record<string, string>;
