import Papa from "papaparse";
import path from "path";
import fs from "fs";

export async function GET() {
  const filePath = path.resolve("public", "custom_daily_purchases_2023.csv");

  const file = fs.readFileSync(filePath, "utf-8");

  const { data } = Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  const processedData = data.map((entry) => ({
    date: entry.date,
    total_cost: entry.total_cost,
    items_bought: entry.items_bought
  }));

  return new Response(JSON.stringify(processedData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
