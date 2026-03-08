"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

interface PerformanceChartProps {
  data: Array<{
    second: number;
    wpm: number;
    errors: number;
  }>;
  themeColor: string;
}

export function PerformanceChart({ data, themeColor }: PerformanceChartProps) {
  const chartConfig = {
    wpm: {
      label: "WPM",
      color: themeColor,
    },
    errors: {
      label: "Errors",
      color: "#ff6b6b",
    },
  } satisfies ChartConfig;

 
  const displayData =
    data.length > 0 ? data : [{ second: 0, wpm: 0, errors: 0 }];

  return (
    <div className="w-full h-full min-h-[140px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          data={displayData}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillWpm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={themeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={themeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis
            dataKey="second"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
          />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
            domain={[0, "auto"]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#ff6b6b", fontSize: 10, opacity: 0.5 }}
            domain={[0, "auto"]}
            hide={data.every((d) => d.errors === 0)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Area
            yAxisId="left"
            dataKey="wpm"
            type="monotone"
            fill="url(#fillWpm)"
            stroke={themeColor}
            strokeWidth={2}
            animationDuration={1500}
          />
          <Line
            yAxisId="right"
            dataKey="errors"
            type="monotone"
            stroke="#ff6b6b"
            strokeWidth={2}
            dot={{ r: 2, fill: "#ff6b6b" }}
            animationDuration={1500}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
