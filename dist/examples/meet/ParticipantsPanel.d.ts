export interface Participant {
    id: string;
    name: string;
    avatarUrl?: string;
    role?: 'host' | 'cohost' | 'guest';
    isMuted?: boolean;
    isVideoOn?: boolean;
}
export interface ParticipantsPanelProps {
    participants: Participant[];
}
export declare const ParticipantsPanel: ({ participants }: ParticipantsPanelProps) => import("react/jsx-runtime").JSX.Element;
