import { Slot } from "../data/slots.data";

export const createZoomMeeting = (slot: Slot) : Promise<boolean> => {
    return fetch('/api/zoom/meetings/create',
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(slot)
    })
    .then(rsp => {
        if(!rsp.ok)
            return false;

       return rsp.json();
    })
    .then(rsp => rsp.success);
};