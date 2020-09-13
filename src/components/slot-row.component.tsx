import React from "react";
import "./slot-row.component.css";
import { Slot } from "../data/slots.data";

export interface SlotRowProps {
    slot: Slot;
    onBookSlot: (s: Slot) => void;
} 

export const SlotRow = (props: SlotRowProps) => {
    const { slot, onBookSlot } = props;

    return (
        <div className="slot-row">
            <div>{slot.start.toLocaleString()}</div>
            <div>{slot.duration}</div>
            <div><button type="button" onClick={() => onBookSlot(slot)}>book slot</button></div>
        </div>
    );
}