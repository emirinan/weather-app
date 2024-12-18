"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

const locales = {
  en: "English 🇬🇧",
  tr: "Turkish 🇹🇷",
} as const;

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed border top-4 right-16 bg-background/50 hover:bg-background/70"
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {Object.entries(locales).map(([key, label], index) => (
          <>
            <DropdownMenuItem
              key={key}
              onClick={() => handleLocaleChange(key)}
              className={`px-4 py-2.5 ${
                locale === key ? "bg-muted" : ""
              } cursor-pointer hover:bg-muted transition-colors`}
            >
              <span className="flex items-center gap-2">
                {label}
                {locale === key && (
                  <span className="text-xs text-muted-foreground">✓</span>
                )}
              </span>
            </DropdownMenuItem>
            {index < Object.entries(locales).length - 1 && (
              <DropdownMenuSeparator className="my-1" />
            )}
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
