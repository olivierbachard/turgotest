export interface Slot {
    id: number;
    start: Date;
    duration: number;
}

const defaultDuration = 30;

export const getAvailableSlots = (): Array<Slot> => {

    const now = new Date();
    return [
        {
            id: 1,
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0),
            duration: defaultDuration
        },
        {
            id: 2,
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 30, 0),
            duration: defaultDuration
        },
        {
            id: 3,
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0),
            duration: defaultDuration
        },
        {
            id: 4,
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30, 0),
            duration: defaultDuration
        }
    ];
};