const API_KEY = "e5934bfffb91e19bbfae6147dcf7c262";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      icon: string;
      description: string;
    }>;
  }>;
}

export class WeatherError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "WeatherError";
  }
}

export async function getWeather(city: string): Promise<WeatherData> {
  if (!city) {
    throw new WeatherError("City name is required");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new WeatherError(
        errorData.message || `Failed to fetch weather data for ${city}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherError) {
      throw error;
    }
    throw new WeatherError(
      error instanceof Error ? error.message : "Failed to fetch weather data"
    );
  }
}

export async function getForecast(city: string): Promise<ForecastData> {
  if (!city) {
    throw new WeatherError("City name is required");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new WeatherError(
        errorData.message || `Failed to fetch forecast data for ${city}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherError) {
      throw error;
    }
    throw new WeatherError(
      error instanceof Error ? error.message : "Failed to fetch forecast data"
    );
  }
}
