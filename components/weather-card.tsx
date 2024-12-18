"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/lib/weather";
import {
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  Compass,
  Gauge,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTranslations } from "next-intl";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const t = useTranslations("weather.metrics");
  const weatherMetrics = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: t("temperature"),
      value: `${Math.round(data.main.temp)}°C`,
      detail: t("feelsLike", { temp: Math.round(data.main.feels_like) }),
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      label: t("condition"),
      value: data.weather[0].main,
      detail: data.weather[0].description,
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: t("humidity"),
      value: `${data.main.humidity}%`,
      detail: t("humidityDetail"),
    },
    {
      icon: <Wind className="w-6 h-6" />,
      label: t("windSpeed"),
      value: `${data.wind.speed} m/s`,
      detail: t("windSpeedDetail"),
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      label: t("pressure"),
      value: `${data.main.pressure} hPa`,
      detail: t("pressureDetail"),
    },
  ];

  return (
    <Card className="w-full bg-card/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].description}
              className="w-24 h-24"
            />
            <div>
              <h2 className="text-3xl font-bold">{data.name}</h2>
              <p className="text-xl text-muted-foreground capitalize">
                {data.weather[0].description}
              </p>
            </div>
          </div>
          <span className="text-4xl font-bold">
            {Math.round(data.main.temp)}°C
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {weatherMetrics.map((metric) => (
            <HoverCard key={metric.label}>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background/70 border border-border/50 transition-all hover:bg-background/90 hover:border-primary/50 hover:shadow-lg cursor-pointer">
                  {metric.icon}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="font-semibold">{metric.value}</p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>{metric.detail}</HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
