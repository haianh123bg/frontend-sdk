export interface CallControlsProps {
    isMuted: boolean;
    isVideoOn: boolean;
    isSharing: boolean;
    onToggleMuted: () => void;
    onToggleVideo: () => void;
    onToggleShare: () => void;
    onEndCall?: () => void;
}
export declare const CallControls: ({ isMuted, isVideoOn, isSharing, onToggleMuted, onToggleVideo, onToggleShare, onEndCall, }: CallControlsProps) => import("react/jsx-runtime").JSX.Element;
