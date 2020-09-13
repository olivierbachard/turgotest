import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SlotRow } from './slot-row.component';
import { getAvailableSlots } from '../data/slots.data';

export const App = () => {

    const slots = getAvailableSlots().map(s => {
        return (<SlotRow slot={s} key={s.id} ></SlotRow>)
    });
    return (
        <div className="App">
            <h2>Available slots</h2>
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