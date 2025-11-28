"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const current = mounted ? resolvedTheme ?? theme : undefined;
    const isDarkMode = current === "dark";

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            aria-label="Alternar tema"
            disabled={!mounted}
        >
            {mounted ? (
                isDarkMode ? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </Button>
    );
}
