"use client";

import { Button } from "@/components/ui/button";
import { Clock, X, Trash2 } from "lucide-react";
import { useRecentSearches } from "@/lib/hooks/use-recent-searches";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RecentSearchesProps {
  onCitySelect: (city: string) => Promise<void>;
}

export function RecentSearches({ onCitySelect }: RecentSearchesProps) {
  const { recentSearches, removeSearch, clearSearches } = useRecentSearches();

  if (recentSearches.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
        <Clock className="w-4 h-4" /> Recent Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((city) => (
          <div key={city} className="flex items-center gap-1 group">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCitySelect(city)}
              className="text-sm group-hover:border-primary/50"
            >
              {city}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSearch(city)}
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove from recent searches</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearches}
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all recent searches</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}