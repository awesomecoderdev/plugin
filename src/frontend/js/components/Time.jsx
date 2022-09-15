import React, { Component, Fragment, useState, useEffect } from "react";
import { Menu, Transition, Tab, Popover, } from "@headlessui/react";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
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
    ];
    const [currentTab, setCurrentTab] = useState("menu");
    const solutions = [
      {
        name: 'Insights',
        description: 'Measure actions your users take',
        href: '##',
        icon: IconOne,
      },
      {
        name: 'Automations',
        description: 'Create your own targeted content',
        href: '##',
        icon: IconTwo,
      },
      {
        name: 'Reports',
        description: 'Keep track of your growth',
        href: '##',
        icon: IconThree,
      },
    ]

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
          <div className="relative flex w-full justify-center items-center">
              <div className="relative w-full max-w-7xl grid lg:grid-cols-4 md:gird-col-2 sm:grid-cols-2 lg:gap-5 md:gap-3 gap-3">
              {timeTables.map((table, tableIndex) => {
                const doctorSchedule = scheduleJson[table.group];

                return(
                  <div key={table.group} className="rounded-lg relative w-full bg-white shadow-md border border-gray-400/20 lg:max-w-xs max-w-full">
                    <div className={"w-full px-3 py-4 m-0"} >
                      <div className="md:divide-x md:divide-transparent">
                          <div className="relative">
                              <div className="flex items-center">
                                <div className="my-2 font-semibold font-poppins text-sm w-full text-start leading-4 text-gray-500">
                                  {table.title}
                                </div>
                                <div className="relative w-auto ">
                                <Popover className="relative">
                                  {({ open }) => (
                                    <>
                                      <Popover.Button
                                        onClick={processSubmit}
                                        className={`${open ? '' : 'text-opacity-90'} mr-4 px-3 py-2 font-poppins font-semibold text-sm text-white rounded bg-primary-400`}
                                      >
                                      <PlusCircleIcon className="h-5 w-5" />
                                      </Popover.Button>
                                      <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                      >
                                        <Popover.Panel className="absolute left-1/2 top-0 z-10 mt-3 bg-white w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-md">
                                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-3">
                                            <div className="grid">
                                              <div className="relative w-full">
                                                <div className="relative">
                                                  <span>Tag : {format(today, 'yyyy-MM-dd')}</span>
                                                  <br />
                                                  <span>Tag : {format(today, 'yyyy-MM-dd')}</span>
                                                  <br />
                                                  <span>Tag : {format(today, 'yyyy-MM-dd')}</span>
                                                  <br />
                                                </div>
                                                <select name="" id="">
                                                  <option value="">Demo 1</option>
                                                  <option value="">Demo 2</option>
                                                </select>
                                              </div>
                                              <div className="relative w-full">
                                                <div className="flex justify-end">
                                                  <button className="text-sm font-semibold font-poppins text-gray-500 px-2 py-1 mx-1 bg-red-400">Ja</button>
                                                  <button className="text-sm font-semibold font-poppins text-gray-500 px-2 py-1 mx-1 bg-primary-400">Nein</button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Popover.Panel>
                                      </Transition>
                                    </>
                                  )}
                                </Popover>
                          </div>
                              </div>
                              <div className="grid grid-flow-col grid-rows-6 gap-1.5 mt-2 text-sm text-white ">
                                {hours.map((hour, hrIndex) =>{
                                  var haveSchedule = false;
                                  doctorSchedule.filter(hr => {
                                    if(isSameHour(hr,hour)){
                                      // console.log(hour);
                                      haveSchedule = true;
                                      return true;
                                    }
                                    return false;
                                  });

                                  return (
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
                                        (haveSchedule && table.group == "a" ) && 'bg-yellow-600 text-white',
                                        (haveSchedule && table.group == "b" ) && 'bg-yellow-500 text-white',
                                        (haveSchedule && table.group == "h" ) && 'bg-slate-400 text-white',
                                        !(currentHour > hour) && !isSameHour(currentHour,hour) && 'hover:bg-gray-300', // hover to normal time item
                                        !isSameHour(currentHour,hour) && (currentHour > hour) && 'bg-slate-500/50 text-white opacity-70 pointer-events-none', // disable previous date to select
                                        ((currentHour <= hour) || isSameHour(currentHour,hour)) && !haveSchedule && !selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && 'bg-red-400 hover:bg-red-500', // hover to normal time item
                                      )}
                                    >
                                      <time dateTime={hour} className="pointer-events-none">
                                        {getHours(hour) <10 ? "0"+getHours(hour)+":00" : getHours(hour)+":00"}
                                      </time>
                                    </button>
                                )
                                })}
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="rounded-lg relative w-full bg-white shadow-md border border-gray-400/20  lg:max-w-xs max-w-full">
                <div className={"w-full px-3 py-4 m-0"} >
                  <Tab.Group>
                        <Tab.List className="flex justify-between bg-white overflow-x-auto overflow-y-hidden">
                          {tabs.map((tab) => (
                            <Tab
                              key={tab.id}
                              className={({ selected }) =>
                                classNames(
                                  'text-sm font-poppins bg-slate-50  px-2 py-1 hover:bg-white',
                                  // 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                  selected
                                    ? 'bg-gray-300/50 border shadow-lg text-gray-500  hover:text-gray-600 border-slate-500/10'
                                    : 'text-gray-500 hover:text-gray-600 border border-gray-500/10'
                                )
                              }
                            >
                              {tab.title}
                            </Tab>
                          ))}
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                          {tabs.map((tab, idx) => (
                            <Tab.Panel
                              key={idx}
                              className={"p-2"}
                            >
                              {tab.component}
                            </Tab.Panel>
                          ))}
                        </Tab.Panels>
                      </Tab.Group>
                  </div>
              </div>
            </div>
        </div>
      </Fragment>
    );
}

export default Time;

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}