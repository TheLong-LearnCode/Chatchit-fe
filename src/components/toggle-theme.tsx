"use client";
import * as React from "react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setIsTransitioning(false);
    }, 100);
  };

  return (
    <div
      className={`switch-toggle ${
        theme === "light" ? "lightMode" : "darkMode"
      } ${isTransitioning ? "transitioning" : ""}`}
      onClick={toggleTheme}
    >
      <div className="toggle-circle"></div>
    </div>
  );
}
