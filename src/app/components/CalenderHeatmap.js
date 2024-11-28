"use client";

import React, { useState } from "react";

const CalendarHeatmap = ({ data }) => {
  const [hoveredIntensity, setHoveredIntensity] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);

  const maxSpent = Math.max(...data.map((d) => d.total_cost));

  const colorScale = [
    "rgb(212, 245, 212)", 
    "rgb(150, 230, 150)", 
    "rgb(100, 200, 100)", 
    "rgb(50, 150, 50)",   
    "rgb(0, 100, 0)"      
  ];

  const getIntensity = (amount) => {
    const ratio = amount / maxSpent;
    return Math.ceil(ratio * 5); 
  };

  const getColor = (intensity) => colorScale[intensity - 1]; 

  const daysByMonth = data.reduce((acc, day) => {
    acc[day.month] = acc[day.month] || [];
    acc[day.month].push(day);
    return acc;
  }, {});

  return (
    <>
        <div className="flex flex-wrap justify-center">
        {Object.entries(daysByMonth).map(([month, days]) => (
            <div key={month} className="flex flex-col items-center m-2">
            <div className="text-center font-bold mb-2">{getMonthName(month)}</div>
            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                const intensity = getIntensity(day.total_cost);
                const color = getColor(intensity);

                return (
                    <div
                    key={day.date}
                    className={`w-5 h-5 rounded ${
                        hoveredIntensity !== null && hoveredIntensity !== intensity
                        ? "opacity-10"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onMouseEnter={() => {
                        setHoveredIntensity(intensity); 
                        setHoveredDay(day);
                    }}
                    onMouseLeave={() => {
                        setHoveredIntensity(null); 
                        setHoveredDay(null);
                    }}
                    ></div>
                );
                })}
            </div>
            </div>
        ))}

        

        
        </div>
        {hoveredDay && (
            <div className="flex justify-center mt-4">
                <div className="p-4 bg-gray-100 rounded-md shadow-md text-black inline-block">
                    <h2 className="text-xl font-bold">Details for {hoveredDay.date}</h2>
                    <p><strong>Spent:</strong> ${hoveredDay.total_cost.toFixed(2)}</p>
                    <p><strong>Items Bought:</strong> {hoveredDay.items_bought}</p>
                </div>
            </div>
        )}
    </>
  );
};

const getMonthName = (month) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month - 1] || "Unknown Month";
};

export default CalendarHeatmap;
