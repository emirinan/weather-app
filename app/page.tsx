"use client";

import { SunMedium } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchSection } from "@/components/search/search-section";
import { WeatherCard } from "@/components/weather-card";
import { Forecast } from "@/components/forecast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWeather } from "@/lib/hooks/use-weather";

export default function Home() {
  const { weather, forecast, loading, fetchWeather } = useWeather();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <SunMedium className="w-12 h-12 text-yellow-500 animate-spin-slow" />
              <h1 className="text-5xl font-bold">Weather Forecast</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get real-time weather updates and forecasts for any city worldwide
            </p>
          </div>

          <SearchSection onSearch={fetchWeather} loading={loading} />

          {weather && forecast && (
            <Tabs defaultValue="current" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border/50 mb-2">
                <TabsTrigger
                  value="current"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-colors hover:bg-background/80"
                >
                  Current Weather
                </TabsTrigger>
                <TabsTrigger
                  value="forecast"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-colors hover:bg-background/80"
                >
                  5-Day Forecast
                </TabsTrigger>
              </TabsList>
              <TabsContent value="current" className="mt-4">
                <WeatherCard data={weather} />
              </TabsContent>
              <TabsContent value="forecast" className="mt-4">
                <Forecast data={forecast} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </main>
  );
}
