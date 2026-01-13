export interface StorageWidgetProps {
    used: number;
    total: number;
    breakdown?: {
        documents: number;
        media: number;
        other: number;
    };
    className?: string;
}
export declare const StorageWidget: ({ used, total, breakdown, className, }: StorageWidgetProps) => import("react/jsx-runtime").JSX.Element;
