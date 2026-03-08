"use client";

import React from "react";
import { KeyboardThemeName } from "@/components/ui/keyboard";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  currentTheme: KeyboardThemeName;
  onThemeChange: (theme: KeyboardThemeName) => void;
  className?: string;
}

const THEMES: { name: KeyboardThemeName; label: string; color: string }[] = [
  { name: "classic", label: "Classic", color: "#F57644" },
  { name: "mint", label: "Mint", color: "#86C8AC" },
  { name: "royal", label: "Royal", color: "#E4D440" },
  { name: "dolch", label: "Dolch", color: "#D73E42" },
  { name: "sand", label: "Sand", color: "#C94E41" },
  { name: "scarlet", label: "Scarlet", color: "#8F4246" },
];

export function ThemeSwitcher({
  currentTheme,
  onThemeChange,
  className,
}: ThemeSwitcherProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-1.5 md:gap-2 p-2 md:p-3 bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10",
        className,
      )}
    >
      {THEMES.map((theme) => (
        <button
          key={theme.name}
          onClick={() => onThemeChange(theme.name)}
          className={cn(
            "group relative flex flex-col items-center gap-1 p-1 md:p-1.5 rounded-lg md:rounded-xl transition-all duration-300",
            currentTheme === theme.name
              ? "bg-white/10 md:bg-white/20 scale-105 shadow-lg"
              : "hover:bg-white/5 md:hover:bg-white/10",
          )}
        >
          <div
            className="w-5 h-5 md:w-7 md:h-7 rounded-full border border-white/20 transition-transform group-hover:scale-110"
            style={{ backgroundColor: theme.color }}
          />
          <span className="hidden sm:block text-[8px] md:text-[9px] font-bold text-white/50 group-hover:text-white/80 uppercase tracking-tighter sm:tracking-widest">
            {theme.name.slice(0, 3)}
          </span>
          {currentTheme === theme.name && (
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          )}
        </button>
      ))}
    </div>
  );
}
