export type ParticipantRole = 'host' | 'cohost' | 'guest';
export interface ParticipantTileProps {
    name: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isVideoOn?: boolean;
    isSpeaking?: boolean;
    isPinned?: boolean;
    role?: ParticipantRole;
}
export declare const ParticipantTile: ({ name, avatarUrl, isMuted, isVideoOn, isSpeaking, isPinned, role, }: ParticipantTileProps) => import("react/jsx-runtime").JSX.Element;
