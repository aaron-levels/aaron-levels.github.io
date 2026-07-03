"use client";

import { useEffect, useState } from "react";

// Birth date from the user's snippet: 2000-10-26T00:00:00Z
const BIRTH_DATE = new Date("2000-10-26T00:00:00Z");
const MILLIS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Live "current age" readout.
 * Recreates the provided widget: computes age in years (leap-year aware)
 * and updates every 100ms, formatted to 9 decimal places.
 * Styled as a live monitoring metric to fit the cloud/network vibe.
 */
export function AgeDisplay() {
  const [age, setAge] = useState<string>("—");

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const ageInYears = (now - BIRTH_DATE.getTime()) / MILLIS_PER_YEAR;
      setAge(ageInYears.toFixed(9));
    };
    update();
    const id = setInterval(update, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-3 sm:gap-4 bg-card border border-border rounded-2xl pl-4 pr-5 py-3 backdrop-blur-sm"
      aria-label={`Current age: ${age} years`}
    >
      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Live
      </span>
      <span className="h-7 w-px bg-border" aria-hidden="true" />
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground leading-none mb-1.5">
          current age
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono tabular-nums text-foreground text-base sm:text-lg leading-none">
            {age}
          </span>
          <span className="text-xs text-muted-foreground">years</span>
        </div>
      </div>
    </div>
  );
}
