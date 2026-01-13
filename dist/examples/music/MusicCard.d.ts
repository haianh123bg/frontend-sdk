export interface MusicCardProps {
    id: string;
    title: string;
    artist: string;
    albumCover: string;
    rating?: number;
    duration?: string;
    genre?: string;
    isLiked?: boolean;
    onPlay?: () => void;
    onLike?: () => void;
    onMenu?: () => void;
    className?: string;
}
export declare const MusicCard: ({ title, artist, albumCover, rating, duration, genre, isLiked, onPlay, onLike, onMenu, className, }: MusicCardProps) => import("react/jsx-runtime").JSX.Element;
