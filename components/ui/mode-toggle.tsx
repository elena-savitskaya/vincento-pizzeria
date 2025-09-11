"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Переключити тему"
    >
      {currentTheme === "dark" ? (
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-transform" />
      ) : (
        <Moon className="h-6 w-6 rotate-0 scale-100 transition-transform" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
