"use client";

import { LucideIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}

export function MetricCard({ icon: Icon, label, value, detail }: MetricCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-background/70 border border-border/50 transition-all hover:bg-background/90 hover:border-primary/50 hover:shadow-lg cursor-pointer">
          <Icon className="w-6 h-6" />
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>{detail}</p>
      </HoverCardContent>
    </HoverCard>
  );
}