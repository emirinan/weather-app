"use client";

import { SunMedium } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchSection } from "@/components/search/search-section";
import { WeatherCard } from "@/components/weather-card";
import { Forecast } from "@/components/forecast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWeather } from "@/lib/hooks/use-weather";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/language-toggle";

export default function Home() {
  const t = useTranslations("app");
  const { weather, forecast, loading, fetchWeather } = useWeather();

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <LanguageToggle />
      <ThemeToggle />
      <div className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <SunMedium className="w-12 h-12 text-yellow-500 animate-spin-slow" />
              <h1 className="text-5xl font-bold">{t("title")}</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("description")}
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
                  {t("current")}
                </TabsTrigger>
                <TabsTrigger
                  value="forecast"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-colors hover:bg-background/80"
                >
                  {t("forecast")}
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
      <footer className="text-center py-4">
        <p className="text-muted-foreground font-light text-sm">
          Made with <span className="animate-pulse">❤️</span> by{" "}
          <a href="https://github.com/emirinan" className="underline">
            Emir Inan
          </a>
        </p>
      </footer>
    </main>
  );
}
