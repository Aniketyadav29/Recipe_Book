import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LightDarkMode from "@/components/ui/LightDarkMode";
import Loader from "./loading";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
    title: "RecipeBook — Discover & Cook Amazing Recipes",
    description:
        "Explore hundreds of mouthwatering recipes from cuisines around the world. Find your next favourite dish today.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.className}>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#ffffff" />
                {/* Additional metadata can be added here */}
            </head>
            <body className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Suspense fallback={<Loader />}>
                    <main>{children}</main>
                </Suspense>
                <LightDarkMode />
            </body>
        </html>
    );
}
