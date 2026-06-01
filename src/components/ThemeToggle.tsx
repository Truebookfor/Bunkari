"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Light mode on karein" : "Night mode on karein"}
      title={isDark ? "Din ka mode" : "Raat ka mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-cocoa transition-all duration-300 hover:bg-cocoa/5 active:scale-90"
    >
      <span className={`relative block h-[18px] w-[18px] ${className}`}>
        <Sun
          className={`absolute inset-0 h-[18px] w-[18px] text-mustard-dark transition-all duration-500 ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 h-[18px] w-[18px] text-sage-light transition-all duration-500 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
