"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaBookOpen, FaShieldAlt, FaTimes, FaUtensils } from "react-icons/fa";

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
        { href: "/#pantry-chef", label: "Pantry" },
        { href: "/#about", label: "About" },
        { href: "/submit-recipe", label: "Share Recipe" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[#0b0c0a]/88 backdrop-blur-2xl shadow-lg shadow-black/30 border-b border-white/10"
                    : "bg-gradient-to-b from-black/45 to-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-amber-300 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5">
                        <FaUtensils />
                    </span>
                    <span className="text-xl font-black text-white tracking-tight">
                        Recipe<span className="text-amber-300">Book</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-bold uppercase tracking-wide text-stone-300 hover:text-white transition-colors duration-200 relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300 rounded-full" />
                        </a>
                    ))}
                    <Link
                        href="/admin"
                        title="Admin Panel"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-stone-300 hover:text-white hover:border-amber-300/40 hover:bg-white/10 transition-all duration-300 text-sm"
                    >
                        <FaShieldAlt />
                    </Link>
                    <Link
                        href="/recipes"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f6c86a] text-[#17120d] font-black rounded-full hover:-translate-y-0.5 hover:bg-white transition-all duration-300 text-sm"
                    >
                        <FaBookOpen />
                        Recipes
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
                } bg-[#0b0c0a]/95 backdrop-blur-2xl border-t border-white/10`}
            >
                <div className="px-6 py-5 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-stone-300 hover:text-white font-bold text-lg transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href="/recipes"
                        className="text-center px-5 py-3 bg-[#f6c86a] text-[#17120d] font-black rounded-xl hover:opacity-90 transition-opacity mt-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Explore Recipes
                    </Link>
                </div>
            </div>
        </nav>
    );
}
