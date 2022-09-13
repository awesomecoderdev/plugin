import React, { useEffect, useState, } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
    add,
    format,
    startOfToday,
    eachHourOfInterval,
    startOfDay,
    endOfDay,
    getHours,
    isSameHour,
  } from 'date-fns';
import axios from "axios";
import { scheduleJson } from "./Data";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Time = ({startFrom,title,list}) => {
    // new functions
    const today = startFrom ? startFrom : startOfToday();
     // const currentHour = new Date(2022, 8, 9, 6, 0);
    // console.log("currentHour",currentHour);
    const currentHour = new Date();
    const [selectedSchedule, setSelectedSchedule] = useState([]);
    const [currentDay, setCurrentDay] =  useState(today);
    const group = list ? list : "a";
    // const [doctorSchedule, setDoctorSchedule] = useState(scheduleJson[group]);

    // console.log("doctorSchedule",doctorSchedule);

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


    useEffect(() => {
      setInterval(() => {
        selectedSchedule.map( schedule => {
          const el = document.getElementById(`${group+format(schedule,"byyyyMMddh")}`);
          if(el){
            if(selectedSchedule.includes(schedule) && !el.classList.contains("selected_hour")){
              el.classList.add("selected_hour");
            }
          }
        })
      });
    }, [previousDay,nextDay]);

    const setSchedule = (e,schedule) => {
      const el = e.target;
      if(selectedSchedule.includes(schedule)){
        // console.log("today have schedule");
        selectedSchedule.splice(selectedSchedule.indexOf(schedule), 1);  //deleting
        setSelectedSchedule(selectedSchedule);
        el.classList.remove("selected_hour");
      }else{
        // console.log("today do not  have schedule");
        selectedSchedule.push(schedule);
        setSelectedSchedule(selectedSchedule)
        el.classList.add("selected_hour");
      }
      console.log(selectedSchedule);
    }

    // hours
    const hours = eachHourOfInterval({
      start: startOfDay(currentDay),
      end: endOfDay(currentDay),
    })

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

    return (
      <div className="relative flex w-full  justify-center items-center">
          <div className="relative w-full max-w-5xl grid lg:grid-cols-3 md:gird-col-2 grid-cols-1 md:gap-5 gap-3">
            {timeTables.map((table, tableIndex) => {
              const doctorSchedule = scheduleJson[table.group];

              return(
                <div className="rounded-lg relative w-full bg-white shadow-md border border-gray-400/20 max-w-xs">
                  <div className={"w-full px-3 py-4 m-0"} >
                    <div className="md:divide-x md:divide-transparent">
                        <div className="relative">
                            <div className="flex items-center">
                              <div className="my-2 font-semibold font-poppins text-lg w-full text-center leading-4 text-gray-500">
                                {table.title}
                              </div>
                            </div>

                            <div className="grid grid-cols-4 mt-2 text-sm text-slate-500">
                              {hours.map((hour, index) => {
                                  var haveSchedule = false;
                                  doctorSchedule.filter(hr => {
                                    if(isSameHour(hr,hour)){
                                      // console.log(hour);
                                      haveSchedule = true;
                                      return true;
                                    }
                                    return false;
                                  });

                                  console.log("selectedSchedule",selectedSchedule);

                                  return (
                                      <div key={hour.toString()} className={'py-1.5'}>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              setSchedule(e,hour);
                                            }}
                                            id={`${group+format(hour,"byyyyMMddh")}`}
                                            className={classNames(
                                              "mx-auto flex h-12 w-12 items-center justify-center rounded-full font-normal font-poppins", // default class
                                              (haveSchedule && (currentHour < hour)) && 'bg-red-500/50 text-white pointer-events-none', // disable previous date to select
                                              // isSameHour(currentHour,hour) && 'bg-yellow-500 text-white pointer-events-none', // set current date color
                                              !(currentHour > hour) && !isSameHour(currentHour,hour) && 'hover:bg-gray-300', // hover to normal time item
                                              !isSameHour(currentHour,hour) && (currentHour > hour) && 'bg-slate-500/50 text-white opacity-70 pointer-events-none', // disable previous date to select
                                              ((currentHour < hour) && !haveSchedule || isSameHour(currentHour,hour)) && 'bg-gray-100 hover:bg-gray-300', // hover to normal time item
                                            )}
                                          >
                                            <time dateTime={hour} className="pointer-events-none">
                                              {getHours(hour) <10 ? "0"+getHours(hour)+":00" : getHours(hour)+":00"}
                                            </time>
                                          </button>
                                      </div>
                                  )
                              })}
                            </div>
                        </div>
                        <div className="relative pt-4 w-full flex justify-end">
                          <button
                          onClick={processSubmit}
                          className="mr-4 px-3 py-1 font-poppins font-semibold text-sm text-white rounded bg-primary-400">Submit</button>
                        </div>
                    </div>
                  </div>
                </div>
              )
            })}

        </div>
      </div>
    );
}

export default Time;
