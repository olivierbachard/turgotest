import React from "react";
import "./slot-row.component.css";
import { Slot } from "../data/slots.data";
import { bookSlot } from "../services/zoom.client";

export interface SlotRowProps {
    slot: Slot;
} 

export const SlotRow = (props: SlotRowProps) => {
    const { slot } = props;

    const onBookSlot = () => {
        bookSlot(slot);
    };

    return (
        <div className="slot-row">
            <div>{slot.start.toLocaleString()}</div>
            <div>{slot.duration}</div>
            <div><button type="button" onClick={onBookSlot}>book slot</button></div>
        </div>
    );
}