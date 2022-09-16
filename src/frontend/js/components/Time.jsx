import React, { Component, Fragment, useState, useEffect } from "react";
import { Menu, Transition, Tab, Popover, } from "@headlessui/react";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, DocumentDuplicateIcon } from "@heroicons/react/solid";
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

    const processNeinAction = () => {
      alert("cancled")
    }

    const processJaAction = () => {
      alert("Submited")
    }

    return (
      <Fragment>
        <div className="hours_container">
          <div className="hours_header_wraper">
            <button
              type="button"
              onClick={previousDay}
              className="go_next_prev_hr"
            >
              <ChevronLeftIcon className="go_next_prev_hr_icon " aria-hidden="true" />
            </button>
            <span className="current_hr_text">
              {format(currentDay, 'd MMMM yyyy')}
            </span>
            <button
              onClick={nextDay}
              type="button"
              className="go_next_prev_hr"
            >
              <ChevronRightIcon className="go_next_prev_hr_icon" aria-hidden="true" />
            </button>
          </div>
        </div>
          <div className="hours_wraper">
              <div className="hr_container">
              {timeTables.map((table, tableIndex) => {
                const doctorSchedule = scheduleJson[table.group];

                return(
                  <div key={table.group} className="hr_card_item">
                    <div className={"hr_card_content"} >
                      <div className="hr_card_body">
                          <div className="relative_card">
                              <div className="hr_card_header">
                                <div className="hr_card_title">
                                  {table.title}
                                </div>
                                <div className="hr_card_save ">
                                <Popover className="relative_card">
                                  {({ open }) => (
                                    <>
                                      <Popover.Button
                                        onClick={processSubmit}
                                        className={`${open ? '' : 'inactive'} hr_card_save_btn `}
                                      >
                                        <DocumentDuplicateIcon className="icon_4 " />
                                      </Popover.Button>
                                      <Transition
                                        as={Fragment}
                                        enter="hr_popup_enter"
                                        enterFrom="hr_popup_enterFrom"
                                        enterTo="hr_popup_enterTo"
                                        leave="hr_popup_leave"
                                        leaveFrom="hr_popup_leaveFrom"
                                        leaveTo="hr_popup_leaveTo"
                                      >
                                        <Popover.Panel className="hr_submit_popup">
                                          <div className="hr_popup_container">
                                            <div className="hr_popup_card">
                                              <div className="hr_popup_content">
                                                <div className="hr_popup_text">
                                                  <span>Tag : {format(today, 'yyyy-MM-dd')}</span>
                                                  <br />
                                                  <span>Tag : {format(today, 'yyyy-MM-dd')}</span>
                                                  <br />
                                                  <span>Tag : {format(today, 'yyyy-MM-dd')}</span>
                                                  <br />
                                                </div>
                                                <select name="" id="" className="hr_popup_select">
                                                  <option value="">Demo 1</option>
                                                  <option value="">Demo 2</option>
                                                </select>
                                              </div>
                                              <div className="hr_popup_footer_container">
                                                <div className="hr_footer_btns">
                                                  <button onClick={processNeinAction} className="hr_popup_cancel_btn">Nein</button>
                                                  <button onClick={processJaAction} className="hr_popup_ok_btn">Ja</button>
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
                              <div className="hr_btns_container">
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
                                        "hr_time_btn", // default class
                                        (selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && table.group == "a") && 'a_selected', // disable previous date to select
                                        (selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && table.group == "b") && 'b_selected', // disable previous date to select
                                        (selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && table.group == "h") && 'h_selected', // disable previous date to select
                                        (haveSchedule && table.group == "a" ) && 'a',
                                        (haveSchedule && table.group == "b" ) && 'b',
                                        (haveSchedule && table.group == "h" ) && 'h',
                                        // !(currentHour > hour) && !isSameHour(currentHour,hour) && 'hover:bg-gray-300', // hover to normal time item
                                        !isSameHour(currentHour,hour) && (currentHour > hour) && 'disabled', // disable previous date to select
                                        ((currentHour <= hour) || isSameHour(currentHour,hour)) && !haveSchedule && !selectedSchedule.includes(`${table.group}-${format(hour,"MM-dd-yyyy")}-${getHours(hour)}`) && 'normal', // hover to normal time item
                                      )}
                                    >
                                      <time dateTime={hour} className="hr_time">
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
              <div className="hr_card_item">
                <div className={"hr_tabs"} >
                  <Tab.Group>
                        <Tab.List className="hr_tab_header">
                          {tabs.map((tab) => (
                            <Tab
                              key={tab.id}
                              className={({ selected }) =>
                                classNames(
                                  'hr_tab_btn',
                                  selected
                                  ? 'selected'
                                  : 'normal'
                                )
                              }
                            >
                              {tab.title}
                            </Tab>
                          ))}
                        </Tab.List>
                        <Tab.Panels className="hr_tab_body">
                          {tabs.map((tab, idx) => (
                            <Tab.Panel
                              key={idx}
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