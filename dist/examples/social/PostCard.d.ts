export interface PostCardProps {
    id: string;
    author: {
        name: string;
        handle: string;
        avatarUrl: string;
    };
    content: string;
    mediaUrl?: string;
    timestamp: string;
    stats: {
        likes: number;
        comments: number;
        shares: number;
    };
    isLiked?: boolean;
    isBookmarked?: boolean;
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onBookmark?: () => void;
    className?: string;
}
export declare const PostCard: ({ author, content, mediaUrl, timestamp, stats, isLiked, isBookmarked, onLike, onComment, onShare, onBookmark, className, }: PostCardProps) => import("react/jsx-runtime").JSX.Element;
