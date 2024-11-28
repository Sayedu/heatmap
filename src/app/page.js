"use client";

import { useEffect, useState } from "react";
import CalendarHeatmap from "./components/CalenderHeatmap";

export default function Home() {
  const [data, setData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
  
    setIsMounted(true);

    const fetchData = async () => {
      const response = await fetch("/api/parse-csv");
      const result = await response.json();

     
      const dailyData = result.map(({ date, total_cost, items_bought }) => {
        const dateObj = new Date(date); 
        return {
          date,
          total_cost,
          items_bought,
          month: dateObj.getMonth() + 1,
          day: dateObj.getDate(),
        };
      });

      setData(dailyData);
    };

    fetchData();
  }, []);

  if (!isMounted) {
  
    return null; 
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">2023 Spending Heatmap</h1>
      {data.length > 0 ? (
        <CalendarHeatmap data={data} />
      ) : (
        <p>Loading data...</p>
      )}
    </main>
  );
}
