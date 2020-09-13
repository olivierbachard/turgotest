import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { SlotRow } from './slot-row.component';
import { getAllSlots, Slot } from '../data/slots.data';
import { createZoomMeeting, getZoomMeeting } from '../services/api.client';

export const App = () => {

    const [availableSlots, setavailableSlots] = useState([] as Slot[]);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const bookSlot = (s: Slot) => {
        createZoomMeeting(s)
            .then(success => {
                setShowSuccessMsg(success);
                setShowErrorMsg(!success);
                refreshSlots();
            });
    };
    
    useEffect(() => {
        refreshSlots();
    }, []);

    const refreshSlots = () => {
        const allSlots = getAllSlots();

        getZoomMeeting()
        .then(rsp => {
            const displayedMeetings = allSlots.filter(s => rsp.find(m => s.start.getTime() == m.start_time.getTime()) == null);
            setavailableSlots(displayedMeetings);
        });
    }
    
    const slots = availableSlots.map(s => {
        return (<SlotRow key={s.id} slot={s} onBookSlot={bookSlot} ></SlotRow>)
    });

    return (
        <div className="App">
            <h2>Available slots</h2>

            { showSuccessMsg && <div className="success-msg">The meeting has been created successfully.</div>}

            { showErrorMsg && <div className="error-msg">An error occured while creating the meeting.</div>}

            <div className="slots">
                <div className="slot-row">
                    <div>Start time</div>
                    <div>Duration</div>
                    <div>Action</div>
                </div>
                {slots}
            </div>
        </div>
    );
}