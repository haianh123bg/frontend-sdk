export type MeetingStatus = 'scheduled' | 'live' | 'ended';
export interface MeetingItem {
    id: string;
    title: string;
    startTime: string;
    durationMin: number;
    host: string;
    status: MeetingStatus;
}
export declare const UpcomingMeetingsTable: () => import("react/jsx-runtime").JSX.Element;
