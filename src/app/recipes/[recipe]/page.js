"use client";
import React, { useState, useEffect } from "react";
import Loader from "../../loading";
import { getApprovedRecipeById } from "@/lib/recipeStorage";
import { GENERIC_FOOD_IMAGE, getRecipeDisplayImage } from "@/lib/recipeImages";

const Recipe = ({ params }) => {
    const { recipe } = params;
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                const decodedRecipeId = decodeURIComponent(recipe);
                const approvedRecipe = getApprovedRecipeById(decodedRecipeId);

                if (approvedRecipe) {
                    setDetail(approvedRecipe);
                    return;
                }

                const response = await fetch(
                    `https://dummyjson.com/recipes/${decodedRecipeId}`
                );
                if (!response.ok) {
                    throw new Error("This recipe could not be opened. If it is a community recipe, please approve it from the admin panel first.");
                }
                const data = await response.json();
                setDetail(data);
            } catch (error) {
                setError(error.message);
                setDetail(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetail();
    }, [recipe]);

    const ingredients = Array.isArray(detail?.ingredients) ? detail.ingredients : [];
    const instructions = Array.isArray(detail?.instructions) ? detail.instructions : [];
    const tags = Array.isArray(detail?.tags) ? detail.tags : [];
    const heroImage = getRecipeDisplayImage(detail);
    const submittedBy = detail?.submittedBy || "RecipeBook";

    if (loading) return <Loader />;
    if (error)
        return (
            <div className="flex justify-center items-center min-h-[60vh] text-red-400 relative z-10 px-6">
                <div className="p-8 bg-white/[0.04] border border-red-500/20 backdrop-blur-md rounded-2xl text-center max-w-md shadow-2xl shadow-red-500/10">
                    <h2 className="text-xl font-bold text-white mb-2">
                        Recipe not available
                    </h2>
                    <p className="text-red-400 font-medium">{error}</p>
                    <button
                        className="mt-6 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                        onClick={() => window.history.back()}
                    >
                        Back to Recipes
                    </button>
                </div>
            </div>
        );

    return (
        <div className="container mx-auto p-6 max-w-5xl relative z-10">
            <div className="recipe-detail-3d overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#130f0d]/90 shadow-2xl shadow-black/40">
                <div className="relative h-80 overflow-hidden sm:h-[28rem]">
                    <img
                        src={heroImage}
                        alt={detail.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = GENERIC_FOOD_IMAGE;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130f0d] via-black/35 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            {detail.isCommunity && (
                                <span className="rounded-full border border-purple-300/30 bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-100 backdrop-blur-md">
                                    Community Recipe
                                </span>
                            )}
                            <span className="rounded-full border border-orange-300/30 bg-orange-500/20 px-3 py-1 text-xs font-bold text-orange-100 backdrop-blur-md">
                                {detail.cuisine || "Global"}
                            </span>
                            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                                By {submittedBy}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-orange-100 to-orange-300 bg-clip-text text-transparent">
                            {detail.name}
                        </h1>
                    </div>
                </div>

                <div className="p-6 md:p-10 text-white">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                        <MetaTile
                            label="Difficulty"
                            value={detail.difficulty || "Easy"}
                        />
                        <MetaTile
                            label="Calories"
                            value={`${detail.caloriesPerServing || 0} kcal`}
                        />
                        <MetaTile
                            label="Prep"
                            value={`${detail.prepTimeMinutes || 0} min`}
                        />
                        <MetaTile
                            label="Cook"
                            value={`${detail.cookTimeMinutes || 0} min`}
                        />
                        <MetaTile label="Servings" value={detail.servings || 1} />
                        <MetaTile
                            label="Rating"
                            value={detail.rating ? `${detail.rating}` : "New"}
                        />
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        <section className="rounded-3xl border border-white/[0.07] bg-white/[0.035] p-6 shadow-xl shadow-black/20">
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/[0.06] pb-3">
                                Ingredients
                            </h2>
                            <ul className="space-y-3">
                                {ingredients.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-3 text-gray-300 font-medium"
                                    >
                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-300 shadow-[0_0_12px_rgba(251,146,60,0.8)]" />
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-3xl border border-white/[0.07] bg-white/[0.035] p-6 shadow-xl shadow-black/20">
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/[0.06] pb-3">
                                Instructions
                            </h2>
                            <ol className="space-y-4">
                                {instructions.map((instruction, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-4 text-gray-300 font-medium leading-relaxed"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-300/25 bg-orange-500/15 text-sm font-extrabold text-orange-200">
                                            {index + 1}
                                        </span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>

                    {tags.length > 0 && (
                        <div className="my-8">
                            <h3 className="text-xl font-bold text-white mb-3">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-sm font-semibold"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 mt-8 border-t border-white/[0.06]">
                        <div className="text-base text-gray-300 font-medium">
                            {detail.isCommunity
                                ? "Approved community recipe"
                                : (
                                    <>
                                        Rating:{" "}
                                        <span className="font-extrabold text-orange-400">
                                            {detail.rating || "New"}
                                        </span>{" "}
                                        ({detail.reviewCount || 0} reviews)
                                    </>
                                )}
                        </div>
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function MetaTile({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 text-center shadow-lg shadow-black/15">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
                {label}
            </div>
            <div className="mt-1 text-lg font-extrabold text-white">
                {value}
            </div>
        </div>
    );
}

export default Recipe;
