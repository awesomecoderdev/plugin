import React, { Component, Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
    add,
    startOfDay,
    endOfDay,
    getHours,
    isSameHour,
    eachDayOfInterval,
    eachHourOfInterval,
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
import { scheduleJson } from "./Data";

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

const Time = () => {
    // start old
    // const today = startOfToday();
    // const [selectedDay, setSelectedDay] = useState(today)
    // const [currentMonth, setCurrentMonth] =  useState( format(today, 'MMM-yyyy'))
    // const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    // const days = eachDayOfInterval({
    //   start: startOfWeek(firstDayCurrentMonth),
    //   end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    // })

    // function previousMonth() {
    //   const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    //   setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    // }

    // function nextMonth() {
    //   const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    //   setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    // }
    // const [workerSchedule, setWorkerSchedule] = useState([]);

    // function setSchedule(day) {
    //     const tdy = format(day, 'yyyy-MM-dd');
    //     console.log(tdy);

    //     if(workerSchedule.includes(tdy)){
    //         // console.log("today have schedule");
    //         workerSchedule.splice(workerSchedule.indexOf(tdy), 1);  //deleting
    //         setWorkerSchedule(workerSchedule);
    //     }else{
    //     //    console.log("today don't  have schedule");
    //        workerSchedule.push(tdy);
    //        setWorkerSchedule(workerSchedule)
    //     }
    //     console.log(workerSchedule);
    // }
    // end old

    const startFromNow = startFrom ? parse(startFrom, 'd-M-yyyy', new Date()) : startOfToday();
    const today = startFromNow > startOfToday() ? startFromNow : startOfToday();
    const [selectedHour, setSelectedHour] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState([]);
    const [currentHour, setCurrentHour] =  useState(new Date());
    const [currentDay, setCurrentDay] =  useState(today);
    const firstCurrentHour = parse(currentHour, 'MMM-yyyy', new Date())

    const hours = eachHourOfInterval({
      start: startOfDay(currentDay),
      end: endOfDay(currentDay),
    })

    // process got to prev day ->done
    const previousDay = () => {
      const goToPrivDay = add(currentDay, { days: -1 });
      setCurrentDay(goToPrivDay);
    }
    // process got to next day ->done
    const nextDay = () => {
      const goToNextDay = add(currentDay, { days: 1 });
      setCurrentDay(goToNextDay);
    }

    function setSchedule(schedule) {
        if(selectedSchedule.includes(schedule)){
          selectedSchedule.splice(selectedSchedule.indexOf(schedule), 1);  //deleting
          setSelectedSchedule(selectedSchedule);
        }else{
          selectedSchedule.push(schedule);
          setSelectedSchedule(selectedSchedule)
        }
    }

    useEffect(() => {
      console.log('====================================');
      console.log("selectedSchedule",selectedSchedule);
      console.log('====================================');
    }, [selectedSchedule,setSchedule]);

    const processSubmit = () =>{
      console.log('====================================');
      console.log(selectedSchedule);
      console.log('====================================');
    }

    const timeTables = [
      {
        title: "Bereitschaftszeit A-Dienst",
        group: "a",
      },
      {
        title: "Bereitschaftszeit B-Dienst",
        group: "b",
      },
      {
        title: "Bereitschaftszeit H-Dienst",
        group: "h",
      },
    ]

    const tabs = [
      {
        id: "menu",
        title: "Menu",
        component: "Menu",
      },
      {
        id: "urlaub",
        title: "Urlaub/Auszeit",
        component: "Urlaub/Auszeit",
      },
      {
        id: "pinnwand",
        title: "Pinnwand",
        component: "Pinnwand",
      }
    ]
    const [currentTab, setCurrentTab] = useState("menu");

    return (
      <Fragment>
        <div className="w-full relative flex justify-center items-center text-center">
          <div className="max-w-sm w-full py-4 flex justify-between items-center">
            <button
              type="button"
              onClick={previousDay}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 hover:bg-gray-200 bg-gray-300/50 rounded-full text-gray-500 hover:text-gray-600"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <span className="text-2xl mb-0 text-slate-500 font-poppins font-semibold">
              {format(currentDay, 'd MMMM yyyy')}
            </span>
            <button
              onClick={nextDay}
              type="button"
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 hover:bg-gray-200 bg-gray-300/50 rounded-full text-gray-500 hover:text-gray-600"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>


        <div className="relative flex justify-between">
          <div className="relative flex w-full justify-center items-center">
              <div className="relative w-full max-w-5xl grid lg:grid-cols-3 md:gird-col-2 grid-cols-1 md:gap-5 gap-3">
              {timeTables.map((table, tableIndex) => {
                const doctorSchedule = scheduleJson[table.group];
                return(
                  <div key={table.group} className="rounded-lg relative w-full bg-white shadow-md border border-gray-400/20 max-w-xs">
                    <div className={"w-full px-3 py-4 m-0"} >
                      <div className="md:divide-x md:divide-transparent">
                          <div className="relative">
                              <div className="flex items-center">
                                <div className="my-2 font-semibold font-poppins text-lg w-full text-center leading-4 text-gray-500">
                                  {table.title}
                                </div>
                              </div>
                              <div className="grid grid-flow-col grid-rows-6 gap-1.5 mt-2 text-sm text-white ">
                                {hours.map((hour, hrIndex) => (
                                    <button
                                      key={hrIndex}
                                      type="button"
                                      onClick={(e) => {
                                        const scheduleKey = `${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`;
                                        setSelectedHour(scheduleKey);
                                        setSchedule(scheduleKey);
                                      }}
                                      className={classNames(
                                        "mx-auto flex h-12 w-12 items-center justify-center rounded-full font-normal font-poppins", // default class
                                        (selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && table.group == "a") && 'bg-yellow-600 text-white', // disable previous date to select
                                        (selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && table.group == "b") && 'bg-yellow-500 text-white', // disable previous date to select
                                        (selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && table.group == "h") && 'bg-slate-400 text-white', // disable previous date to select
                                        !(currentHour > hour) && !isSameHour(currentHour,hour) && 'hover:bg-gray-300', // hover to normal time item
                                        !isSameHour(currentHour,hour) && (currentHour > hour) && 'bg-slate-500/50 text-white opacity-70 pointer-events-none', // disable previous date to select
                                        ((currentHour <= hour) || isSameHour(currentHour,hour)) && !selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && 'bg-red-400 hover:bg-red-500', // hover to normal time item
                                      )}
                                    >
                                      <time dateTime={hour} className="pointer-events-none">
                                        {getHours(hour) <10 ? "0"+getHours(hour)+":00" : getHours(hour)+":00"}
                                      </time>
                                    </button>
                                ))}
                              </div>
                          </div>
                          <div className="relative pt-4 w-full flex justify-end">
                            <button
                            onClick={processSubmit}
                            className="mr-4 px-3 py-2 font-poppins font-semibold text-sm text-white rounded bg-primary-400">Submit</button>
                          </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="relative max-w-xs p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis eum culpa vel quod magnam aspernatur beatae sint fugit ipsum, quas necessitatibus earum libero similique illum quae consequuntur repudiandae velit voluptatibus!
          </div>
        </div>
      </Fragment>
    );
}

export default Time;