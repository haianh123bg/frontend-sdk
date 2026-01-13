export interface TaskCardProps {
    id: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
    tags?: string[];
    assignees?: {
        name: string;
        avatarUrl: string;
    }[];
    attachmentCount?: number;
    onToggle?: () => void;
    className?: string;
}
export declare const TaskCard: ({ title, description, isCompleted, dueDate, priority, tags, assignees, attachmentCount, onToggle, className, }: TaskCardProps) => import("react/jsx-runtime").JSX.Element;
