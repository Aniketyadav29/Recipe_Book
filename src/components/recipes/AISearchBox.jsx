"use client";
import React, { useState, useEffect } from "react";
import { saveAISearchedRecipe } from "@/lib/recipeStorage";

export default function AISearchBox({ onRecipeSaved, compact = false }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusText, setStatusText] = useState("AI Chef is thinking...");
    const [recipe, setRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [saveMessage, setSaveMessage] = useState("");

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
        setSaveMessage("");

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
        setSaveMessage(`"${saved.name}" was sent to the admin panel for approval.`);
        if (onRecipeSaved) {
            onRecipeSaved(saved);
        }
    };

    return (
        <div className={`relative z-20 w-full ${compact ? "" : "mx-auto mt-8 max-w-3xl"}`}>
            <div className="rounded-2xl border border-white/[0.12] bg-[#12130f]/95 p-4 shadow-2xl shadow-black/30 sm:p-5">
                <div className="mb-3 flex flex-col gap-1 text-left sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-extrabold uppercase tracking-widest text-amber-300">
                            AI Recipe Search
                        </p>
                        <p className="text-sm text-stone-400">
                            Type a recipe name and get matching ingredients.
                        </p>
                    </div>
                    <span className="text-xs font-semibold text-stone-500">
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
                        className="min-h-12 flex-1 rounded-xl border border-white/10 bg-black/35 px-4 text-base text-white placeholder-stone-500 outline-none transition-all duration-200 focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10 disabled:opacity-70"
                    />
                    <button
                        type="submit"
                        disabled={loading || !searchQuery.trim()}
                        className="min-h-12 rounded-xl bg-[#f6c86a] px-6 text-sm font-black text-[#17120d] shadow-lg shadow-amber-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-amber-900/35 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {loading ? "Cooking..." : "Ask AI Chef"}
                    </button>
                </form>

                {error && (
                    <p className="mt-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2 text-left text-sm font-medium text-red-300">
                        {error}
                    </p>
                )}

                {saveMessage && (
                    <p className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-left text-sm font-semibold text-emerald-300">
                        {saveMessage}
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

            {/* Inline Recipe Preview */}
            {showModal && recipe && (
                <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/[0.10] bg-[#14100e] text-white shadow-2xl shadow-black/45 animate-fade-in">
                    <div className="relative w-full px-4 py-5 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-3xl leading-none text-stone-300 shadow-xl backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
                            aria-label="Close recipe preview"
                        >
                            ×
                        </button>
                        
                        {/* Status Note about Key */}
                        {recipe.isSimulated && (
                            <div className="mx-auto mb-6 max-w-7xl rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 pr-14 text-sm text-amber-200 flex items-start gap-2.5 leading-relaxed">
                                <span className="mt-0.5 text-base">💡</span>
                                <div>
                                    <span className="font-bold">Offline AI mode</span>. This recipe was generated locally from the dish name.
                                </div>
                            </div>
                        )}

                        {/* Modal Header */}
                        <div className="mx-auto mb-8 max-w-7xl">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-amber-300/15 border border-amber-300/30 px-3 py-1 text-xs font-bold text-amber-200">
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
                        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 mb-8 sm:grid-cols-3 lg:grid-cols-6">
                            <MetaCard label="Difficulty" value={recipe.difficulty || "Easy"} />
                            <MetaCard label="Calories" value={`${recipe.caloriesPerServing || 0} kcal`} />
                            <MetaCard label="Prep Time" value={`${recipe.prepTimeMinutes || 0} min`} />
                            <MetaCard label="Cook Time" value={`${recipe.cookTimeMinutes || 0} min`} />
                            <MetaCard label="Servings" value={recipe.servings || 1} />
                            <MetaCard label="Rating" value="5.0 ⭐" />
                        </div>

                        {/* Recipe Content Columns */}
                        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.25fr] mb-8">
                            {/* Ingredients */}
                            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-6 shadow-inner md:p-8">
                                <h3 className="text-3xl font-black mb-5 border-b border-white/[0.08] pb-3 text-amber-200">
                                    Ingredients Needed
                                </h3>
                                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    {recipe.ingredients?.map((ing, i) => (
                                        <li key={i} className="flex gap-3 rounded-2xl border border-white/[0.06] bg-black/20 p-4 text-base text-stone-200 leading-relaxed">
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(246,200,106,0.8)]" />
                                            <span>{ing}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Instructions */}
                            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-6 shadow-inner md:p-8">
                                <h3 className="text-3xl font-black mb-5 border-b border-white/[0.08] pb-3 text-amber-200">
                                    Step-by-Step Instructions
                                </h3>
                                <ol className="space-y-4">
                                    {recipe.instructions?.map((inst, i) => (
                                        <li key={i} className="flex gap-4 rounded-2xl border border-white/[0.06] bg-black/20 p-4 text-base text-stone-200 leading-relaxed">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-sm font-black text-amber-200">
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
                            <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-2">Tags:</span>
                                {recipe.tags.map((tag, i) => (
                                    <span key={i} className="rounded-full bg-amber-300/5 border border-amber-300/15 px-3 py-1 text-xs text-amber-200 font-semibold">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Modal Actions */}
                        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row gap-3 justify-end items-center pt-6 border-t border-white/[0.06]">
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-gray-400 font-bold hover:bg-white/5 hover:text-white transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#f6c86a] text-[#17120d] font-extrabold shadow-lg shadow-amber-900/20 hover:scale-105 hover:bg-white transition-all duration-300"
                            >
                                Submit for Admin Approval
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
