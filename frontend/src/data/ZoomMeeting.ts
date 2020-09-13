export interface ZoomMeeting
{
    id: string;
    topic:  string;
    type: number;
    start_time:  Date;
    duration: number;
    timezone: string;
    agenda: string;
}