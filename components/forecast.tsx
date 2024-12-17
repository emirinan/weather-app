"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastData } from "@/lib/weather";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ForecastProps {
  data: ForecastData;
}

export function Forecast({ data }: ForecastProps) {
  const dailyForecast = data.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 5);

  return (
    <Card className="w-full bg-card/50">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {dailyForecast.map((day) => (
            <TooltipProvider key={day.dt}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-background/70 border border-border/50 transition-all hover:bg-background/90 hover:border-primary/50 hover:shadow-lg cursor-pointer">
                    <span className="text-sm font-medium">
                      {format(new Date(day.dt * 1000), "EEE")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(day.dt * 1000), "MMM d")}
                    </span>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].main}
                      className="w-16 h-16"
                    />
                    <span className="text-lg font-semibold">
                      {Math.round(day.main.temp)}°C
                    </span>
                    <span className="text-xs capitalize text-muted-foreground">
                      {day.weather[0].main}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{day.weather[0].description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
