import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
    title: string;
    value: string;
    trend?: {
        value: number;
        isPositive: boolean;
        label: string;
    };
    icon: LucideIcon;
    iconColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    className?: string;
}
export declare const StatCard: ({ title, value, trend, icon, iconColor, className, }: StatCardProps) => import("react/jsx-runtime").JSX.Element;
