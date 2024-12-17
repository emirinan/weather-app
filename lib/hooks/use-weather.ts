"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRecentSearches } from "./use-recent-searches";
import { getWeather, getForecast, WeatherData, ForecastData, WeatherError } from "@/lib/weather";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { addSearch } = useRecentSearches();

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeather(city),
        getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Add to recent searches
      addSearch(city);
      
      toast({
        title: "Success",
        description: `Weather data loaded for ${city}`,
      });
    } catch (error) {
      const message = error instanceof WeatherError 
        ? error.message 
        : "Failed to fetch weather data. Please try again.";
      
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    forecast,
    loading,
    fetchWeather
  };
}