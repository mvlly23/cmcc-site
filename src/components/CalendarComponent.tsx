import * as React from "react"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"

export default function CalendarComponent() {
    const selectedDate = new Date();
    const dates = [1, 12, 26, 27, 30];
    var arrayMatcher: Matcher = [];
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
                mode="none"
                disableNavigation="true"
                selected={ selectedDate }
                disabled={ arrayMatcher }
                className="rounded-md border bg-white"
                />
            </div>
            <div className="events">
                <ul class="list-disc list-outside m-2 ml-6">
                    <li>June 1st - Palestine Rally</li>
                    <li>June 12th - Flyering</li>
                    <li>June 26th - Tabeling</li>
                    <li>June 27th - Monthly Meeting</li>
                    <li>June 30th Coffee with Comrades</li>
                </ul>
            </div>
        </div>
    )
  }