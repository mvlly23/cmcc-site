import * as React from "react"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"

export default function CalendarComponent() {
    const selectedDate = new Date();
    const dates = [11, 22, 28];
    var arrayMatcher = [];
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate();
    for (var i = 0; i < daysInMonth; i++) {
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
        if (!dates.includes(date.getDate()))  {
            arrayMatcher.push(date);
        }
    }

    return (
        <div className="calendar-events grid justify-items-center">
            <div className="calendar-component">
                <Calendar
                mode="default"
                disableNavigation={ true }
                selected={ selectedDate }
                disabled={ arrayMatcher }
                className="rounded-md border bg-white"
                />
            </div>
            <div className="events">
                <ul className="list-disc list-outside m-2 ml-6">
                    <li>July 11th - Flyering</li>
                    <li>July 22nd - Flyering</li>
                    <li>July 28th - Coffee w/ Comrades</li>
                </ul>
            </div>
        </div>
    )
  }