export interface MusicPlayerProps {
    title: string;
    artist: string;
    coverUrl: string;
    isPlaying?: boolean;
    onPlayPause?: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    className?: string;
}
export declare const MusicPlayer: ({ title, artist, coverUrl, isPlaying, onPlayPause, onNext, onPrev, className, }: MusicPlayerProps) => import("react/jsx-runtime").JSX.Element;
