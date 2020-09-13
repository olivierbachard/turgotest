import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SlotRow } from './slot-row.component';
import { getAvailableSlots, Slot } from '../data/slots.data';
import { zoomMettingsClient } from '../services/zoom.client';

export const App = () => {

    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const bookSlot = (s: Slot) => {
        zoomMettingsClient
            .create(s)
            .then(success => {
                setShowSuccessMsg(success);
                setShowErrorMsg(!success);
            });
    };
    
    const slots = getAvailableSlots().map(s => {
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