
import fetch from 'node-fetch';

const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlF1emV0NnJTUUJLeFVhQVQ2RDRRZ0EiLCJleHAiOjE2MDAwMjU5MzUsImlhdCI6MTYwMDAyMDUzNH0.wPKc2SmunysC82tUkQjbbTFA0Ra34d980PqfaYPFieo";

interface Slot {
    id: number;
    start: string;
    duration: number;
}

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
            start_time: slot.start,
            duration: slot.duration,
            timezone: this.parisTimezone,
            password: '123456',
            agenda: 'random description'
        };

        return fetch(this.baseUrl + '/users/me/meetings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
                body: JSON.stringify(body) 
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
            });

    };

    public getAll = () => {
        return fetch(this.baseUrl + '/users/me/meetings', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        })
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(rsp => rsp.meetings);
    };
}

export const zoomMettingsClient = new ZoomMettingsClient();