import React, { useState } from 'react';
import {
    add,
    eachDayOfInterval,
    eachMonthOfInterval,
    endOfMonth,
    endOfYear,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
  } from 'date-fns';
import Calendar from './Calendar';

const Main = () => {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    const months = eachMonthOfInterval({
        start: firstDayCurrentMonth,
        end: add(firstDayCurrentMonth, { months: 4 }),
    })

    return (
        <>
            <div className="calendar_container">
                {months.map((month, index) => (
                    <div key={index} className="calendar_list_item">
                        <Calendar
                         startMonth={month}
                         />
                    </div>
                ))}
              <div className="calendar_list_item">
                <div className="relative">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempore, necessitatibus ab a illum, excepturi magni voluptatum ex alias, soluta voluptates libero minus natus dignissimos vitae! Odio asperiores dolorum maxime?</p>
                </div>
              </div>
            </div>
        </>
    );
}

export default Main;