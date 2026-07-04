"use client";

import { useState } from "react";
import Link from "next/link";
import { FaMagic, FaSpinner, FaLightbulb } from "react-icons/fa";

// ─────────────────────────────────────────────────────────
//  NLP LAYER: parse messy natural-language text → clean
//  ingredient tokens (no external API needed)
// ─────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
    "i","have","got","get","some","a","an","the","half","bit","of","and",
    "also","few","little","cup","cups","tablespoon","tablespoons","teaspoon",
    "teaspoons","pound","pounds","kg","gram","grams","oz","ounce","ounces",
    "piece","pieces","clove","cloves","bunch","handful","handfuls","can","cans",
    "tin","tins","leftover","leftovers","fresh","dried","frozen","cooked","raw",
    "large","small","medium","or","with","maybe","just","only","about","like",
    "my","in","is","was","are","there","want","need","use","left","over",
    "fridge","pantry","kitchen","home","make","cook","prepare","eat","eating",
    "only","lot","lots","bit","bits","use","using","had","has","got","do",
    "dont","don't","not","no","yes","please","help","me","find","show",
    "what","can","could","should","would","might","may","will","these",
    "those","that","this","they","them","we","it","its","its","here","more"
]);

function parseIngredients(text) {
    // 1. Lowercase + strip non-alpha chars except spaces
    // 2. Split on whitespace + common delimiters
    // 3. Remove stop words + very short tokens
    const tokens = text
        .toLowerCase()
        .replace(/[^a-z\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

    // Deduplicate
    return [...new Set(tokens)];
}

// ─────────────────────────────────────────────────────────
//  SCORING: match parsed ingredients against a recipe
// ─────────────────────────────────────────────────────────
function scoreRecipe(recipe, ingredients) {
    if (!ingredients.length) return { score: 0, matches: [], matchPercent: 0 };

    const ingredientBlob = recipe.ingredients.join(" ").toLowerCase();
    const fullBlob =
        `${recipe.name} ${recipe.cuisine} ${(recipe.tags || []).join(" ")} ${ingredientBlob}`.toLowerCase();

    const matches = [];
    let score = 0;

    for (const token of ingredients) {
        if (ingredientBlob.includes(token)) {
            matches.push(token);
            score += 3; // strong: appears in ingredient list
        } else if (fullBlob.includes(token)) {
            matches.push(token);
            score += 1; // weak: appears in name/cuisine/tags
        }
    }

    const matchPercent = Math.min(
        100,
        Math.round((matches.length / ingredients.length) * 100)
    );

    return { score, matches, matchPercent };
}

// ─────────────────────────────────────────────────────────
//  EXAMPLE PROMPTS
// ─────────────────────────────────────────────────────────
const EXAMPLES = [
    "I have chicken, garlic, lemon and some rice",
    "Half an onion, ground beef and tomatoes",
    "Eggs, cheese, spinach and a bit of butter",
    "Salmon, soy sauce, ginger and sesame oil",
    "Pasta, olive oil, parmesan and cherry tomatoes",
];

// ─────────────────────────────────────────────────────────
//  MATCH BADGE COLOUR
// ─────────────────────────────────────────────────────────
function badgeColor(pct) {
    if (pct >= 60) return "bg-emerald-500/80 text-white";
    if (pct >= 30) return "bg-orange-500/80 text-white";
    return "bg-purple-500/80 text-white";
}

// ─────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export default function PantryChef() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [parsed, setParsed] = useState([]);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyse = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setError(null);
        setResults(null);

        try {
            // ── Step 1: NLP parse ──
            const ingredients = parseIngredients(input);
            setParsed(ingredients);

            if (ingredients.length === 0) {
                setError(
                    "Couldn't detect any ingredients. Try describing what you have more clearly — e.g. \"I have chicken, rice and garlic\"."
                );
                setLoading(false);
                return;
            }

            // ── Step 2: Simulated AI thinking delay (UX) ──
            await new Promise((r) => setTimeout(r, 1800));

            // ── Step 3: Fetch all recipes ──
            const res = await fetch("https://dummyjson.com/recipes?limit=50");
            if (!res.ok) throw new Error("API error");
            const data = await res.json();
            const recipes = data.recipes || [];

            // ── Step 4: Score + rank ──
            const scored = recipes
                .map((r) => ({ ...r, ...scoreRecipe(r, ingredients) }))
                .filter((r) => r.score > 0)
                .sort(
                    (a, b) =>
                        b.score - a.score || b.matchPercent - a.matchPercent
                )
                .slice(0, 6);

            setResults(scored);
        } catch {
            setError("Something went wrong fetching recipes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="pantry-chef" className="py-28 px-6">
            <div className="max-w-5xl mx-auto">

                {/* ── Header ── */}
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-sm font-semibold mb-5">
                        <FaMagic className="w-3 h-3" />
                        AI-Powered Feature
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
                        Meet{" "}
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                            Pantry Chef AI
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Don't know what to cook? Just tell us what's in your fridge —
                        in plain English. Our AI will parse your ingredients and surface
                        the best recipes you can make right now.
                    </p>
                </div>

                {/* ── How it works strip ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {[
                        { icon: "✍️", step: "1", title: "Describe your fridge", desc: "Type anything naturally — no strict format needed." },
                        { icon: "🧠", step: "2", title: "AI parses & understands", desc: "NLP extracts ingredients from your messy sentence." },
                        { icon: "🍽️", step: "3", title: "Get matched recipes", desc: "Scored recipes ranked by how many ingredients you have." },
                    ].map((s) => (
                        <div key={s.step} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm shrink-0">
                                {s.step}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm mb-1">{s.title}</p>
                                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Input card ── */}
                <div className="rounded-3xl bg-gradient-to-br from-purple-900/20 via-[#0f0f0f] to-pink-900/10 border border-purple-500/20 p-8 md:p-10 mb-8 relative overflow-hidden">
                    {/* Glow blobs */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-pink-500/8 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <label className="block text-white font-bold text-lg mb-1">
                            🧅 What's in your fridge right now?
                        </label>
                        <p className="text-gray-600 text-sm mb-5">
                            Just type naturally — no need for a tidy list.
                            Press{" "}
                            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 text-xs font-mono">
                                Ctrl + Enter
                            </kbd>{" "}
                            to analyse.
                        </p>

                        {/* Textarea */}
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && e.ctrlKey && handleAnalyse()
                            }
                            placeholder='e.g. "I have half an onion, some chicken, and rice…"'
                            rows={3}
                            className="w-full px-5 py-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-white placeholder-gray-700 resize-none focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-300 text-base leading-relaxed"
                        />

                        {/* Example prompts */}
                        <div className="flex flex-wrap gap-2 mt-4 mb-7 items-center">
                            <span className="text-gray-600 text-xs flex items-center gap-1">
                                <FaLightbulb className="w-3 h-3 text-yellow-600" /> Try:
                            </span>
                            {EXAMPLES.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(p)}
                                    className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-gray-500 text-xs hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-500/5 transition-all duration-200"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* CTA button */}
                        <button
                            onClick={handleAnalyse}
                            disabled={loading || !input.trim()}
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-base"
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    AI is thinking…
                                </>
                            ) : (
                                <>
                                    <FaMagic />
                                    Find My Recipes
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* ── AI thinking state ── */}
                {loading && (
                    <div className="text-center py-10 animate-fade-in">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
                            <span className="flex gap-1">
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </span>
                            Analysing your ingredients with AI…
                        </div>
                        {parsed.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-center">
                                <span className="text-gray-600 text-sm self-center">Detected:</span>
                                {parsed.map((ing) => (
                                    <span
                                        key={ing}
                                        className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm"
                                    >
                                        {ing}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Error state ── */}
                {error && !loading && (
                    <div className="text-center py-8 animate-fade-in">
                        <p className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4 inline-block">
                            {error}
                        </p>
                    </div>
                )}

                {/* ── Results ── */}
                {results && !loading && (
                    <div className="animate-fade-in-up">
                        {/* Ingredient chips */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <span className="text-gray-600 text-sm">🧠 AI detected:</span>
                            {parsed.map((ing) => (
                                <span
                                    key={ing}
                                    className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm"
                                >
                                    {ing}
                                </span>
                            ))}
                        </div>

                        {results.length === 0 ? (
                            <div className="text-center py-16 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                <p className="text-5xl mb-4">🤷</p>
                                <p className="text-gray-300 text-lg font-semibold mb-2">
                                    No matching recipes found
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Try adding more common ingredients like rice, chicken, eggs, or tomatoes.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-400 text-sm mb-6">
                                    ✨ Found{" "}
                                    <span className="text-white font-bold">{results.length}</span>{" "}
                                    recipes you can make right now:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {results.map((recipe, i) => (
                                        <Link
                                            key={recipe.id}
                                            href={`/recipes/${recipe.id}`}
                                            className="group block"
                                        >
                                            <div className="h-full rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.07] hover:border-purple-500/30 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                                                {/* Image */}
                                                <div className="relative h-44 overflow-hidden">
                                                    <img
                                                        src={recipe.image}
                                                        alt={recipe.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    {/* Dark overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                                    {/* Match % badge */}
                                                    <div className="absolute top-3 right-3">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${badgeColor(recipe.matchPercent)}`}>
                                                            {recipe.matchPercent}% match
                                                        </span>
                                                    </div>

                                                    {/* Best match crown */}
                                                    {i === 0 && (
                                                        <div className="absolute top-3 left-3">
                                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-400/90 text-black backdrop-blur-sm">
                                                                🏆 Best Match
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Card body */}
                                                <div className="p-5">
                                                    <h3 className="font-bold text-white text-base mb-1 line-clamp-1">
                                                        {recipe.name}
                                                    </h3>
                                                    <p className="text-gray-500 text-xs mb-3">
                                                        {recipe.cuisine} · {recipe.difficulty} · {recipe.caloriesPerServing} kcal
                                                    </p>

                                                    {/* Matched ingredient chips */}
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {recipe.matches.slice(0, 4).map((m) => (
                                                            <span
                                                                key={m}
                                                                className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs"
                                                            >
                                                                ✓ {m}
                                                            </span>
                                                        ))}
                                                        {recipe.matches.length > 4 && (
                                                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-600 text-xs">
                                                                +{recipe.matches.length - 4} more
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-600">
                                                        <span>⭐ {recipe.rating} ({recipe.reviewCount})</span>
                                                        <span className="text-purple-400 font-semibold group-hover:underline">
                                                            View Recipe →
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
