import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AISearchBox from "./AISearchBox";
import { FaArrowRight, FaStar, FaUsers, FaUtensils } from "react-icons/fa";

export default function RecipeList({ recipes }) {
    const [localRecipes, setLocalRecipes] = useState(recipes);

    useEffect(() => {
        setLocalRecipes(recipes);
    }, [recipes]);

    const handleAISave = (newRecipe) => {
        setLocalRecipes((prev) => [newRecipe, ...prev]);
    };

    const communityCount = localRecipes?.filter((r) => r.isCommunity).length || 0;
    const totalRecipes = localRecipes?.length || 0;

    return (
        <div className="relative z-10 overflow-hidden bg-[#0f1110] pb-20">
            <section className="relative min-h-[72vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=2200&q=88"
                    alt="Prepared food and fresh cooking ingredients"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,10,0.96)_0%,rgba(11,12,10,0.76)_46%,rgba(11,12,10,0.35)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0f1110] to-transparent" />

                <div className="relative z-10 mx-auto grid min-h-[72vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-stone-100 backdrop-blur-md">
                            <FaUtensils className="text-amber-300" />
                            Explore the collection
                        </span>
                        <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl">
                            Recipe Book
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">
                            Browse the same polished food collection from the home page, then open any dish into a focused cooking view with ingredients, timing, and steps.
                        </p>

                        <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                            <StatPill value={totalRecipes} label="Recipes" />
                            <StatPill value={communityCount} label="Community" />
                            <StatPill value="4.8" label="Avg Rating" />
                        </div>
                    </div>

                    <div className="recipes-hero-panel">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                                    AI recipe creator
                                </p>
                                <p className="mt-1 text-sm text-stone-400">
                                    Type a dish name, preview a recipe, and save it to the book.
                                </p>
                            </div>
                            <Link
                                href="/submit-recipe"
                                className="hidden shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-stone-200 transition-colors hover:bg-white/10 sm:inline-flex"
                            >
                                Share Recipe
                                <FaArrowRight />
                            </Link>
                        </div>
                        <AISearchBox onRecipeSaved={handleAISave} compact />
                    </div>
                </div>
            </section>

            <section className="px-4 sm:px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                                All recipes
                            </p>
                            <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
                                Choose what looks good today.
                            </h2>
                        </div>
                        <Link
                            href="/submit-recipe"
                            className="inline-flex w-fit items-center gap-3 rounded-full bg-[#f6c86a] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#17120d] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                        >
                            Submit Recipe
                            <FaArrowRight />
                        </Link>
                    </div>

                <div className="recipe-card-stage grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {localRecipes && localRecipes.length > 0 ? (
                        localRecipes.map((recipe) => (
                            <Link
                                key={recipe.id}
                                href={`/recipes/${encodeURIComponent(recipe.id)}`}
                                passHref
                                className="group block focus:outline-none"
                            >
                                <Card className="recipe-book-card relative h-full cursor-pointer overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-[#151713] text-white shadow-2xl shadow-black/30 transition-all duration-500 group-focus-visible:ring-2 group-focus-visible:ring-amber-300">
                                    <CardContent className="relative p-0">
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={recipe.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600"}
                                                alt={recipe.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                                                <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                                                    {recipe.cuisine || "Global"}
                                                </span>
                                                {recipe.isCommunity && (
                                                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/35 bg-emerald-500/25 px-3 py-1 text-xs font-bold text-emerald-100 backdrop-blur-md">
                                                        <FaUsers className="text-[10px]" />
                                                        Community
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardHeader className="relative p-5 pb-3">
                                        <CardTitle className="line-clamp-2 min-h-12 text-xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-amber-200">
                                            {recipe.name}
                                        </CardTitle>
                                        <CardDescription className="mt-3 flex flex-wrap gap-2 text-sm text-stone-300">
                                            <span className="rounded-full bg-white/[0.06] px-2.5 py-1 font-semibold">
                                                {recipe.difficulty || "Easy"}
                                            </span>
                                            <span className="rounded-full bg-white/[0.06] px-2.5 py-1 font-semibold">
                                                {recipe.caloriesPerServing || 0} kcal
                                            </span>
                                        </CardDescription>
                                    </CardHeader>

                                    <CardFooter className="relative flex items-center justify-between gap-3 p-5 pt-0">
                                        <span className="min-w-0 truncate text-sm font-semibold text-stone-300">
                                            {recipe.isCommunity
                                                ? `By ${recipe.submittedBy || "Community Chef"}`
                                                : (
                                                    <span className="inline-flex items-center gap-1">
                                                        <FaStar className="text-amber-300" />
                                                        {recipe.rating || "New"} ({recipe.reviewCount || 0})
                                                    </span>
                                                )}
                                        </span>
                                        <span className="shrink-0 rounded-full bg-amber-300/15 px-3 py-1 text-sm font-black text-amber-200">
                                            {recipe.servings || 1} serve{Number(recipe.servings) === 1 ? "" : "s"}
                                        </span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-12 text-center text-stone-400">
                            No recipes found
                        </p>
                    )}
                </div>
                </div>
            </section>
        </div>
    );
}

function StatPill({ value, label }) {
    return (
        <div className="border-l border-white/15 pl-4">
            <div className="text-3xl font-black text-white">
                {value}
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-widest text-stone-400">
                {label}
            </div>
        </div>
    );
}
