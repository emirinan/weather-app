"use client";

import { Card } from "@/components/ui/card";
import { SearchForm } from "./search-form";
import { PopularCities } from "./popular-cities";
import { RecentSearches } from "./recent-searches";

interface SearchSectionProps {
  onSearch: (city: string) => Promise<void>;
  loading: boolean;
}

export function SearchSection({ onSearch, loading }: SearchSectionProps) {
  return (
    <Card className="p-4 max-w-2xl mx-auto bg-card/50">
      <SearchForm onSearch={onSearch} loading={loading} />
      <div className="mt-4 space-y-4">
        <PopularCities onCitySelect={onSearch} />
        <RecentSearches onCitySelect={onSearch} />
      </div>
    </Card>
  );
}