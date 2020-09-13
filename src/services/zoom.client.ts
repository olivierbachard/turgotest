import { Slot } from "../data/slots.data"

const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjFZR3JjVV9PUk91U1htQUNENG9oSEEiLCJleHAiOjE2MDA1MTA0NzYsImlhdCI6MTU5OTkwNTY3NX0.0yi1y3u2R9sM0DuMDAc1lykSo9pwKssSBOwllMz6E2I";

interface ZoomMeeting {
    topic: string;
    type: number;
    start_time: string;
    duration: number;
    timezone: string;
    password: string;
    agenda: string;
};

const meetingsType = {
    instant: 1,
    scheduled: 2,
    recurringWithNoFixedTime: 3,
    recurringWithFixedTime: 3,
};

class ZoomMettingsClient {

    private baseUrl = "https://api.zoom.us/v2";
    private parisTimezone = 'Europe/Paris';

    public create = (slot: Slot): Promise<boolean> => {

        const body: ZoomMeeting = {
            topic: 'random topic',
            type: meetingsType.scheduled,
            start_time: slot.start.toISOString().split('.')[0] + "Z",
            duration: slot.duration,
            timezone: this.parisTimezone,
            password: '123456',
            agenda: 'random description'
        };

        return fetch(this.baseUrl + '/users/me/meetings',
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                //mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
                body: JSON.stringify(body) // body data type must match "Content-Type" header
            })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(function (response) {
                return true;
            })
            .catch(function (error) {
                return false;
            });;

    };
}

export const zoomMettingsClient = new ZoomMettingsClient();