"use client";
import React, { useState, useEffect } from "react";
import { saveAISearchedRecipe } from "@/lib/recipeStorage";

export default function AISearchBox({ onRecipeSaved }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusText, setStatusText] = useState("AI Chef is thinking...");
    const [recipe, setRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    // Dynamic loading status messages
    useEffect(() => {
        if (!loading) return;
        
        const messages = [
            "AI Chef is thinking...",
            "Gathering fresh ingredients...",
            "Measuring spices & condiments...",
            "Formulating cooking temperatures...",
            "Writing down the recipe guidelines..."
        ];

        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setStatusText(messages[index]);
        }, 1500);

        return () => clearInterval(interval);
    }, [loading]);

    const handleAISearch = async (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;

        setLoading(true);
        setRecipe(null);
        setError("");

        try {
            const res = await fetch("/api/ai-recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: trimmedQuery }),
            });

            if (res.ok) {
                const data = await res.json();
                setRecipe(data);
                setShowModal(true);
            } else {
                const data = await res.json().catch(() => null);
                setError(data?.error || "Failed to generate recipe. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Error connecting to the AI Chef.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!recipe) return;
        const saved = saveAISearchedRecipe(recipe);
        setShowModal(false);
        setSearchQuery("");
        setRecipe(null);
        if (onRecipeSaved) {
            onRecipeSaved(saved);
        }
    };

    return (
        <div className="relative z-20 mx-auto mt-8 w-full max-w-3xl">
            <div className="rounded-2xl border border-orange-300/20 bg-[#17120f]/95 p-4 shadow-2xl shadow-black/30 sm:p-5">
                <div className="mb-3 flex flex-col gap-1 text-left sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-extrabold uppercase tracking-widest text-orange-300">
                            AI Recipe Search
                        </p>
                        <p className="text-sm text-gray-400">
                            Type a recipe name and get matching ingredients.
                        </p>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                        Example: Gulab Jamun, Pasta, Fried Rice
                    </span>
                </div>

                <form onSubmit={handleAISearch} className="flex flex-col gap-3 sm:flex-row">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (error) setError("");
                        }}
                        placeholder="Enter recipe name..."
                        disabled={loading}
                        className="min-h-12 flex-1 rounded-xl border border-white/10 bg-black/35 px-4 text-base text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-orange-300/60 focus:ring-4 focus:ring-orange-500/10 disabled:opacity-70"
                    />
                    <button
                        type="submit"
                        disabled={loading || !searchQuery.trim()}
                        className="min-h-12 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orange-500/35 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {loading ? "Cooking..." : "Ask AI Chef"}
                    </button>
                </form>

                {error && (
                    <p className="mt-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2 text-left text-sm font-medium text-red-300">
                        {error}
                    </p>
                )}
            </div>

            {/* Sizzling Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm animate-fade-in">
                    <div className="relative mb-6">
                        {/* Bubbling Pot SVG Animation */}
                        <svg className="h-24 w-24 text-orange-400 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                            <path strokeLinecap="round" d="M9 12a3 3 0 006 0" />
                        </svg>
                        <span className="absolute -top-3 -right-2 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
                        </span>
                    </div>
                    <p className="text-xl font-bold text-white tracking-wide animate-pulse">
                        {statusText}
                    </p>
                </div>
            )}

            {/* Recipe Modal */}
            {showModal && recipe && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-6 overflow-y-auto">
                    <div className="relative w-full max-w-4xl rounded-[2rem] border border-white/[0.08] bg-[#14100e]/95 p-6 md:p-10 text-white shadow-2xl shadow-black/80 backdrop-blur-xl animate-scale-up max-h-[90vh] overflow-y-auto">
                        
                        {/* Status Note about Key */}
                        {recipe.isSimulated && (
                            <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-xs md:text-sm text-yellow-300 flex items-start gap-2.5 leading-relaxed">
                                <span className="mt-0.5 text-base">💡</span>
                                <div>
                                    <span className="font-bold">Offline AI mode</span>. This recipe was generated locally from the dish name.
                                </div>
                            </div>
                        )}

                        {/* Modal Header */}
                        <div className="mb-8">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-orange-500/20 border border-orange-500/35 px-3 py-1 text-xs font-bold text-orange-300">
                                    AI Chef Choice
                                </span>
                                <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-gray-300">
                                    {recipe.cuisine || "Global"} Cuisine
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
                                {recipe.name}
                            </h2>
                        </div>

                        {/* Meta Parameters Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                            <MetaCard label="Difficulty" value={recipe.difficulty || "Easy"} />
                            <MetaCard label="Calories" value={`${recipe.caloriesPerServing || 0} kcal`} />
                            <MetaCard label="Prep Time" value={`${recipe.prepTimeMinutes || 0} min`} />
                            <MetaCard label="Cook Time" value={`${recipe.cookTimeMinutes || 0} min`} />
                            <MetaCard label="Servings" value={recipe.servings || 1} />
                            <MetaCard label="Rating" value="5.0 ⭐" />
                        </div>

                        {/* Recipe Content Columns */}
                        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] mb-8">
                            {/* Ingredients */}
                            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 shadow-inner">
                                <h3 className="text-xl font-bold mb-4 border-b border-white/[0.06] pb-2 text-orange-300">
                                    Ingredients Needed
                                </h3>
                                <ul className="space-y-3">
                                    {recipe.ingredients?.map((ing, i) => (
                                        <li key={i} className="flex gap-2.5 text-sm text-gray-300 leading-normal">
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                                            <span>{ing}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Instructions */}
                            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 shadow-inner">
                                <h3 className="text-xl font-bold mb-4 border-b border-white/[0.06] pb-2 text-orange-300">
                                    Step-by-Step Instructions
                                </h3>
                                <ol className="space-y-4">
                                    {recipe.instructions?.map((inst, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 text-xs font-bold text-orange-300">
                                                {i + 1}
                                            </span>
                                            <span>{inst}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Tags */}
                        {recipe.tags && recipe.tags.length > 0 && (
                            <div className="mb-8 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-2">Tags:</span>
                                {recipe.tags.map((tag, i) => (
                                    <span key={i} className="rounded-full bg-orange-500/5 border border-orange-500/15 px-3 py-1 text-xs text-orange-400 font-semibold">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Modal Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-end items-center pt-6 border-t border-white/[0.06]">
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-gray-400 font-bold hover:bg-white/5 hover:text-white transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-extrabold shadow-lg shadow-orange-500/20 hover:scale-105 hover:shadow-orange-500/35 transition-all duration-300"
                            >
                                Save to Recipe Book
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MetaCard({ label, value }) {
    return (
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-center shadow-md">
            <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
            <span className="mt-0.5 block text-sm font-extrabold text-white">{value}</span>
        </div>
    );
}
