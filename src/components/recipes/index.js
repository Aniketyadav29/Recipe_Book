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
        <div className="relative z-10 overflow-hidden px-4 pb-16 pt-4 sm:px-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.18),transparent_32%),radial-gradient(circle_at_78%_10%,rgba(236,72,153,0.14),transparent_30%)]" />

            <div className="mx-auto max-w-7xl">
                {/* Page Header */}
                <div className="relative mb-12 rounded-[2rem] border border-white/[0.08] bg-white/[0.035] px-6 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-10">
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.08] via-transparent to-orange-500/[0.08]" />
                    <div className="relative">
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-300">
                            <span className="h-2 w-2 rounded-full bg-orange-300 shadow-[0_0_18px_rgba(251,146,60,0.9)]" />
                            Recipe Book
                        </span>
                        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-6xl">
                            Pick Your Next{" "}
                            <span className="bg-gradient-to-r from-orange-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                                Delicious Dish
                            </span>
                        </h1>
                        <p className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
                            Browse crisp recipe cards, open full cooking instructions, and enjoy approved community dishes right beside the collection.
                        </p>

                        <AISearchBox onRecipeSaved={handleAISave} />

                        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-5 py-2.5 text-sm font-semibold text-gray-300">
                                <span className="text-orange-300">{totalRecipes}</span>
                                recipes
                                {communityCount > 0 && (
                                    <>
                                        <span className="h-1 w-1 rounded-full bg-gray-600" />
                                        <span className="text-purple-300">
                                            {communityCount} community
                                        </span>
                                    </>
                                )}
                            </div>
                            <Link
                                href="/submit-recipe"
                                className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-orange-500/35"
                            >
                                Share Your Recipe
                            </Link>
                        </div>
                    </div>
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
                                <Card className="recipe-card-3d relative h-full cursor-pointer overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-[#15110f]/85 text-white shadow-2xl shadow-black/30 transition-all duration-500 before:absolute before:inset-0 before:rounded-[1.7rem] before:bg-gradient-to-br before:from-white/[0.13] before:via-transparent before:to-orange-500/[0.1] before:opacity-70 after:absolute after:inset-x-6 after:bottom-0 after:h-12 after:translate-y-8 after:rounded-full after:bg-orange-500/25 after:blur-2xl after:transition-all after:duration-500 hover:border-orange-300/35 hover:shadow-orange-500/15 group-focus-visible:ring-2 group-focus-visible:ring-orange-300">
                                    <CardContent className="relative p-0">
                                        <div className="relative h-52 overflow-hidden">
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
                                                    <span className="rounded-full border border-purple-300/35 bg-purple-500/25 px-3 py-1 text-xs font-bold text-purple-100 backdrop-blur-md">
                                                        Community
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardHeader className="relative p-5 pb-3">
                                        <CardTitle className="line-clamp-2 min-h-12 text-xl font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-orange-200">
                                            {recipe.name}
                                        </CardTitle>
                                        <CardDescription className="mt-2 flex flex-wrap gap-2 text-sm text-gray-300">
                                            <span className="rounded-full bg-white/[0.06] px-2.5 py-1">
                                                {recipe.difficulty || "Easy"}
                                            </span>
                                            <span className="rounded-full bg-white/[0.06] px-2.5 py-1">
                                                {recipe.caloriesPerServing || 0} kcal
                                            </span>
                                        </CardDescription>
                                    </CardHeader>

                                    <CardFooter className="relative flex items-center justify-between gap-3 p-5 pt-0">
                                        <span className="min-w-0 truncate text-sm font-medium text-gray-300">
                                            {recipe.isCommunity
                                                ? `By ${recipe.submittedBy || "Community Chef"}`
                                                : `Rating ${recipe.rating || "New"} (${recipe.reviewCount || 0})`}
                                        </span>
                                        <span className="shrink-0 rounded-full bg-orange-400/15 px-3 py-1 text-sm font-bold text-orange-200">
                                            {recipe.servings || 1} serve{Number(recipe.servings) === 1 ? "" : "s"}
                                        </span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-12 text-center text-gray-400">
                            No recipes found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
