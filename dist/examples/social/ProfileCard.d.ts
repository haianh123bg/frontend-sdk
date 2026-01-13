export interface ProfileCardProps {
    name: string;
    handle: string;
    bio: string;
    avatarUrl: string;
    coverUrl?: string;
    location?: string;
    website?: string;
    stats: {
        followers: number;
        following: number;
        posts: number;
    };
    isFollowing?: boolean;
    onFollow?: () => void;
    className?: string;
}
export declare const ProfileCard: ({ name, handle, bio, avatarUrl, coverUrl, location, website, stats, isFollowing, onFollow, className, }: ProfileCardProps) => import("react/jsx-runtime").JSX.Element;
