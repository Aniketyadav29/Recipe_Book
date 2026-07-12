"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FaArrowRight,
    FaCheck,
    FaLightbulb,
    FaRobot,
    FaSearch,
    FaSpinner,
} from "react-icons/fa";

const STOP_WORDS = new Set([
    "i", "have", "got", "get", "some", "a", "an", "the", "half", "bit", "of", "and",
    "also", "few", "little", "cup", "cups", "tablespoon", "tablespoons", "teaspoon",
    "teaspoons", "pound", "pounds", "kg", "gram", "grams", "oz", "ounce", "ounces",
    "piece", "pieces", "clove", "cloves", "bunch", "handful", "handfuls", "can", "cans",
    "tin", "tins", "leftover", "leftovers", "fresh", "dried", "frozen", "cooked", "raw",
    "large", "small", "medium", "or", "with", "maybe", "just", "only", "about", "like",
    "my", "in", "is", "was", "are", "there", "want", "need", "use", "left", "over",
    "fridge", "pantry", "kitchen", "home", "make", "cook", "prepare", "eat", "eating",
    "lot", "lots", "bits", "using", "had", "has", "do", "dont", "don't", "not",
    "no", "yes", "please", "help", "me", "find", "show", "what", "can", "could",
    "should", "would", "might", "may", "will", "these", "those", "that", "this",
    "they", "them", "we", "it", "its", "here", "more",
]);

function parseIngredients(text) {
    const tokens = text
        .toLowerCase()
        .replace(/[^a-z\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

    return [...new Set(tokens)];
}

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
            score += 3;
        } else if (fullBlob.includes(token)) {
            matches.push(token);
            score += 1;
        }
    }

    const matchPercent = Math.min(
        100,
        Math.round((matches.length / ingredients.length) * 100)
    );

    return { score, matches, matchPercent };
}

const EXAMPLES = [
    "chicken, garlic, lemon, rice",
    "eggs, spinach, cheese, butter",
    "salmon, ginger, soy sauce",
    "pasta, tomatoes, parmesan",
];

function badgeColor(pct) {
    if (pct >= 60) return "bg-emerald-400 text-emerald-950";
    if (pct >= 30) return "bg-amber-300 text-stone-950";
    return "bg-stone-200 text-stone-950";
}

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
            const ingredients = parseIngredients(input);
            setParsed(ingredients);

            if (ingredients.length === 0) {
                setError("Add a few ingredients, for example: chicken, rice, garlic.");
                setLoading(false);
                return;
            }

            await new Promise((resolve) => setTimeout(resolve, 800));

            const res = await fetch("https://dummyjson.com/recipes?limit=50");
            if (!res.ok) throw new Error("API error");
            const data = await res.json();
            const recipes = data.recipes || [];

            const scored = recipes
                .map((recipe) => ({ ...recipe, ...scoreRecipe(recipe, ingredients) }))
                .filter((recipe) => recipe.score > 0)
                .sort(
                    (a, b) =>
                        b.score - a.score || b.matchPercent - a.matchPercent
                )
                .slice(0, 6);

            setResults(scored);
        } catch {
            setError("Recipe matching is unavailable right now. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="pantry-chef" className="bg-[#f4efe5] px-6 py-24 text-[#15120f]">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <div className="pantry-visual-stage">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85"
                        alt="Fresh vegetables and pantry ingredients"
                        className="h-[34rem] w-full rounded-[2rem] object-cover shadow-2xl shadow-stone-900/20"
                    />
                    <div className="pantry-visual-panel">
                        <FaRobot className="text-amber-500" />
                        <div>
                            <p className="text-sm font-black text-stone-950">
                                Pantry Match
                            </p>
                            <p className="text-xs leading-5 text-stone-600">
                                Finds recipes from ingredients you already have.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-stone-500">
                        <FaSearch />
                        Smart ingredient search
                    </span>
                    <h2 className="mt-5 text-4xl font-black leading-tight text-stone-950 md:text-5xl">
                        Turn your pantry into a realistic dinner plan.
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
                        Type the ingredients you have. The matcher reads the list, compares it against real recipe ingredients, and ranks the closest recipes.
                    </p>

                    <div className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-2xl shadow-stone-900/10">
                        <label className="text-sm font-black uppercase tracking-widest text-stone-500">
                            Ingredients on hand
                        </label>
                        <textarea
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={(event) =>
                                event.key === "Enter" && event.ctrlKey && handleAnalyse()
                            }
                            placeholder="Example: chicken, garlic, lemon and rice"
                            rows={4}
                            className="mt-3 w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-base leading-7 text-stone-900 outline-none transition-all duration-200 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-200"
                        />

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400">
                                <FaLightbulb />
                                Try
                            </span>
                            {EXAMPLES.map((example) => (
                                <button
                                    key={example}
                                    onClick={() => setInput(example)}
                                    className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-600 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-stone-950"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleAnalyse}
                            disabled={loading || !input.trim()}
                            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-stone-950 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 disabled:pointer-events-none disabled:opacity-45 sm:w-auto"
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Matching Recipes
                                </>
                            ) : (
                                <>
                                    Find Matches
                                    <FaArrowRight />
                                </>
                            )}
                        </button>
                    </div>

                    {error && !loading && (
                        <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700">
                            {error}
                        </p>
                    )}
                </div>
            </div>

            {loading && (
                <div className="mx-auto mt-12 max-w-7xl rounded-3xl border border-stone-200 bg-white px-6 py-7 text-stone-700 shadow-xl shadow-stone-900/10">
                    <div className="flex flex-wrap items-center gap-3">
                        <FaSpinner className="animate-spin text-amber-500" />
                        <span className="font-bold">Analysing ingredients</span>
                        {parsed.map((ingredient) => (
                            <span
                                key={ingredient}
                                className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-600"
                            >
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {results && !loading && (
                <div className="mx-auto mt-14 max-w-7xl">
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.22em] text-stone-500">
                                Matched recipes
                            </p>
                            <h3 className="mt-2 text-3xl font-black text-stone-950">
                                Best options from your pantry
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {parsed.map((ingredient) => (
                                <span
                                    key={ingredient}
                                    className="rounded-full bg-white px-3 py-1 text-sm font-bold text-stone-600 shadow-sm"
                                >
                                    {ingredient}
                                </span>
                            ))}
                        </div>
                    </div>

                    {results.length === 0 ? (
                        <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center shadow-xl shadow-stone-900/10">
                            <p className="text-xl font-black text-stone-950">
                                No strong match found
                            </p>
                            <p className="mt-2 text-stone-500">
                                Add one or two common ingredients such as rice, eggs, tomato, chicken, or cheese.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {results.map((recipe, index) => (
                                <Link
                                    key={recipe.id}
                                    href={`/recipes/${recipe.id}`}
                                    className="pantry-result-card group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-black ${badgeColor(recipe.matchPercent)}`}>
                                            {recipe.matchPercent}% match
                                        </span>
                                        {index === 0 && (
                                            <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-stone-950">
                                                Best match
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <h4 className="line-clamp-1 text-lg font-black text-stone-950">
                                            {recipe.name}
                                        </h4>
                                        <p className="mt-1 text-sm font-semibold text-stone-500">
                                            {recipe.cuisine} / {recipe.difficulty} / {recipe.caloriesPerServing} kcal
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {recipe.matches.slice(0, 4).map((match) => (
                                                <span
                                                    key={match}
                                                    className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
                                                >
                                                    <FaCheck className="text-[10px]" />
                                                    {match}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
