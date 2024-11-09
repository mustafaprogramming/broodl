'use client'
import { gradients , baseRating , demoData} from "@/utils";
import { Fugaz_One } from "next/font/google";
import { useState } from "react";
const fugaz= Fugaz_One({ subsets: ["latin"], weight: ['400'] })

const months = {
  'January': 'Jan',
  'February': 'Feb',
  'March': 'Mar',
  'April': 'Apr',
  'May': 'May',
  'June': 'Jun',
  'July': 'Jul',
  'August': 'Aug',
  'September': 'Sep',
  'October': 'Oct',
  'November': 'Nov',
  'December': 'Dec'
}; 
const monthArr=Object.keys(months)
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calendar({demo , completeData , handleSetMood}){
  const now=new Date()
  const currentMonth=now.getMonth();
  const [selectedYear,setSelectedYear]=useState(now.getFullYear())
  const [selectedMonth,setSelectedMonth]=useState(monthArr[currentMonth]);
  const numericMonth=monthArr.indexOf(selectedMonth);
  const data=completeData?.[selectedYear]?.[numericMonth] || {}
  function handelIncrementMonth(val){
    if(numericMonth + val < 0){
      console.log(numericMonth+ val)
      setSelectedMonth(monthArr[monthArr.length-1])
      setSelectedYear(curr=>curr-1)
    }else if(numericMonth + val > 11){
      console.log(numericMonth+ val)
      setSelectedMonth(monthArr[0])
      setSelectedYear(curr=>curr+1)
    }else{
      setSelectedMonth(monthArr[numericMonth+val])
    }
  }


  const monthNow=new Date(selectedYear, monthArr.indexOf(selectedMonth), 1);
  //Fri Nov 01 2024 00:00:00 GMT+0500 (Pakistan Standard Time)
  const firstDayOfMonth=monthNow.getDay()
  // 5
  const daysInMonth=new Date(selectedYear, monthArr.indexOf(selectedMonth) +1 , 0).getDate();
  // 30
  const daysToDisplay=firstDayOfMonth + daysInMonth;
  //35
  const numRows=(Math.floor(daysToDisplay/7)) + (daysToDisplay % 7 ? 1 : 0)
  //5

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-4">
        <button onClick={()=>handelIncrementMonth(-1)} className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"><i className="fa-solid fa-circle-chevron-left" aria-hidden={true}/></button>
        <p className={`${fugaz.className} text-center capitalize text-gradient whitespace-nowrap`}>
          {selectedMonth} , {selectedYear}
        </p>
        <button onClick={()=>handelIncrementMonth(1)} className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"><i className="fa-solid fa-circle-chevron-right" aria-hidden={true}/></button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-8 ">
        {/* 0,1,2,3,4 */}
        {[...Array(numRows).keys()].map((row,rowIndex)=>{
          return  <div key={rowIndex} className="grid grid-cols-7 gap-1 ">
                    {dayList.map((dayOfWeek,dayOfWeekIndex)=>{
                      let dayIndex=(rowIndex * 7)+dayOfWeekIndex-(firstDayOfMonth -1);
                      let dayDisplay=dayIndex > daysInMonth ? false:(row===0 && dayOfWeekIndex < firstDayOfMonth) ? false : true;
                      let isToday=dayIndex===now.getDate();
                      // console.log(now.getDate())
                      // 9
                      if(!dayDisplay){
                        return <div className="bg-white" key={dayOfWeekIndex}/>
                      }
                      let color= demo ? gradients.indigo[baseRating[dayIndex]] : dayIndex in data ? gradients.indigo[data[dayIndex]] : 'white';
                      return (
                        <div style={{background:color}} key={dayOfWeekIndex} className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${isToday? 'border-indigo-400' : 'border-indigo-100' } ${color==='white'? 'text-indigo-400' : 'text-white' }`}>
                          <p>{dayIndex}</p>
                        </div>
                      )
                    })}
                  </div>
        })}
      </div>
    </div>
  )
}
