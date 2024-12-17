"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PopularCitiesProps {
  onCitySelect: (city: string) => Promise<void>;
}

const POPULAR_CITIES = [
  { name: "Istanbul", country: "Turkey" },
  { name: "Samsun", country: "Turkey" },
  { name: "Kocaeli", country: "Turkey" },
  { name: "London", country: "UK" },
  { name: "New York", country: "USA" },
  { name: "Tokyo", country: "Japan" },
  { name: "Paris", country: "France" },
  { name: "Rome", country: "Italy" },
];

export function PopularCities({ onCitySelect }: PopularCitiesProps) {
  return (
    <ScrollArea className="h-12">
      <div className="flex gap-2">
        {POPULAR_CITIES.map((city) => (
          <HoverCard key={city.name}>
            <HoverCardTrigger>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCitySelect(city.name)}
                className="text-foreground hover:text-foreground/80 hover:bg-muted"
              >
                {city.name}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p>
                View weather in {city.name}, {city.country}
              </p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </ScrollArea>
  );
}
