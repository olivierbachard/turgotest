import { Slot } from "../data/slots.data";
import { ZoomMeeting } from "../data/ZoomMeeting";
import moment from "moment";

export const createZoomMeeting = (slot: Slot) : Promise<boolean> => {
    return fetch('/api/zoom/meetings/create',
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            start: moment(slot.start).format('yyyy-MM-DDTHH:mm:ss'),
            duration: slot.duration
        })
    })
    .then(rsp => {
        if(!rsp.ok)
            return false;

       return rsp.json();
    })
    .then(rsp => rsp.success);
};

export const getZoomMeeting = () : Promise<ZoomMeeting[]> => {
    return fetch('/api/zoom/meetings/get')
    .then((rsp: any) => {
        return rsp.json();
    })
    .then(meetings => {
        console.log(meetings);
        return meetings.map((m: any) => {
            const meeting: ZoomMeeting = {
                id: m.id,
                agenda: m.agenda,
                duration: m.duration,
                timezone: m.timezone,
                topic: m.topic,
                type: m.type,
                start_time: new Date(Date.parse(m.start_time)),
            };
            return meeting
        });
    });
};