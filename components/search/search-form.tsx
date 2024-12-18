"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SearchFormProps {
  onSearch: (city: string) => Promise<void>;
  loading: boolean;
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const t = useTranslations("search");
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder={t("placeholder")}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 bg-background/70"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground hover:bg-primary/80"
      >
        {loading ? (
          <div className="animate-spin">⌛</div>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            {t("button")}
          </>
        )}
      </Button>
    </form>
  );
}
