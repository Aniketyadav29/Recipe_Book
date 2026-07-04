"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function LightDarkMode() {
    // Initialize state and handle SSR by checking for window availability
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("Theme");
        if (storedTheme) {
            const prefersDark = JSON.parse(storedTheme);
            setIsDarkMode(prefersDark);
            document.documentElement.classList.toggle("dark", prefersDark);
        } else {
            // Optional: Set default theme based on system preference
            const systemPrefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            setIsDarkMode(systemPrefersDark);
            document.documentElement.classList.toggle(
                "dark",
                systemPrefersDark
            );
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("Theme", JSON.stringify(newMode));
            document.documentElement.classList.toggle("dark", newMode);
            return newMode;
        });
    };

    return (
        <div>
            {/* Dark/Light Mode Toggle */}
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={toggleDarkMode}
                    className="ml-4 p-2 rounded-full dark:bg-yellow-500 dark:hover:bg-yellow-600 bg-gray-600 hover:bg-gray-900 transition-colors duration-300"
                    aria-label="Toggle Dark/Light Mode"
                >
                    {isDarkMode ? (
                        <FaSun className="w-7 h-7 text-white" />
                    ) : (
                        <FaMoon className="w-7 h-7 text-white" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default LightDarkMode;
