import React, { Component, Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    startOfWeek,
    endOfWeek,
  } from 'date-fns';
import axios from "axios";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const colStartClasses = [
    '',
    'start-2',
    'start-3',
    'start-4',
    'start-5',
    'start-6',
    'start-7',
];

const Calendar = ({className, startMonth}) => {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today)
    const [currentMonth, setCurrentMonth] =  useState(
      startMonth ? format(startMonth, 'MMM-yyyy') : format(today, 'MMM-yyyy')
    )
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    const days = eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    })
    // const days = eachDayOfInterval({
    //   start: firstDayCurrentMonth,
    //   end: endOfMonth(firstDayCurrentMonth),
    // })
    function previousMonth() {
      const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    function nextMonth() {
      const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    const [workerSchedule, setWorkerSchedule] = useState([]);

    function setSchedule(day) {
        const tdy = format(day, 'yyyy-MM-dd');
        console.log(tdy);

        if(workerSchedule.includes(tdy)){
            // console.log("today have schedule");
            workerSchedule.splice(workerSchedule.indexOf(tdy), 1);  //deleting
            setWorkerSchedule(workerSchedule);
        }else{
        //    console.log("today don't  have schedule");
           workerSchedule.push(tdy);
           setWorkerSchedule(workerSchedule)
        }
        console.log(workerSchedule);
    }

    return (
        <div className={classNames("calendar_card",className)} >
          <div className="calendar_inner">
              <div className="calendar_relative">
                  <div className="calendar_header">
                    <span className="calendar_h2">
                      {format(firstDayCurrentMonth, 'MMMM yyyy')}
                    </span>
                    {/* <button
                      type="button"
                      onClick={previousMonth}
                      className="calendar_next_prev_btn"
                    >
                      <span className="sr-only">Previous month</span>
                      <ChevronLeftIcon className="next_prev_icon" aria-hidden="true" />
                    </button>
                    <button
                      onClick={nextMonth}
                      type="button"
                      className="calendar_next_prev_btn"
                    >
                      <span className="sr-only">Next month</span>
                      <ChevronRightIcon className="next_prev_icon" aria-hidden="true" />
                    </button> */}
                  </div>
                  <div className="calendar_week_names">
                    <div>S</div>
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                  </div>
                  <div className="calendar_date_list">
                    {days.map((day, dayIdx) => (
                              <div
                                key={day.toString()}
                                className={classNames(
                                  dayIdx === 0 && colStartClasses[getDay(day)],
                                  'padding_y'
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    // setSelectedDay(day);
                                    // setSchedule(day);
                                    const dy = format(day, 'd-MM-yyyy');
                                    const redirect = `${window.location.origin}${window.location.pathname}?start=${dy}`;
                                    window.location = redirect;
                                  }}
                                  className={classNames(
                                    "calender_default_btn", // default class
                                    ((workerSchedule.includes(format(day, 'yyyy-MM-dd')) && today < day ) && 'selected_date_btn'), // disable previous date to select
                                    isEqual(day, today) && isToday(day) && 'current_date_btn', // set current date color
                                    (today > day) && 'previous_next_month_btn', // disable previous date to select
                                    !isSameMonth(day, firstDayCurrentMonth) && 'previous_next_month_btn', // set different month date color
                                   )}
                                >
                                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                                    {format(day, 'd')}
                                  </time>
                                </button>
                              </div>
                    ))}
                  </div>
              </div>
          </div>
        </div>
    );
}

export default Calendar;