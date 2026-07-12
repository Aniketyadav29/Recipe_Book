"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/#home", label: "Home" },
        { href: "/#features", label: "Features" },
        { href: "/#pantry-chef", label: "Pantry Chef AI" },
        { href: "/#about", label: "About Us" },
        { href: "/submit-recipe", label: "Share Recipe" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-black/80 backdrop-blur-2xl shadow-lg shadow-black/30 border-b border-white/10"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🍴</span>
                    <span className="text-xl font-extrabold text-white tracking-tight">
                        Recipe<span className="text-orange-400">Book</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-gray-300 hover:text-orange-400 font-medium transition-colors duration-200 relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300 rounded-full" />
                        </a>
                    ))}
                    <Link
                        href="/admin"
                        title="Admin Panel"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/10 transition-all duration-300 text-sm"
                    >
                        🛡️
                    </Link>
                    <Link
                        href="/recipes"
                        className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 text-sm"
                    >
                        🍽️ Explore Recipes
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } bg-black/90 backdrop-blur-2xl border-t border-white/10`}
            >
                <div className="px-6 py-5 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-gray-300 hover:text-orange-400 font-medium text-lg transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href="/recipes"
                        className="text-center px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-2"
                        onClick={() => setIsOpen(false)}
                    >
                        🍽️ Explore Recipes
                    </Link>
                </div>
            </div>
        </nav>
    );
}
