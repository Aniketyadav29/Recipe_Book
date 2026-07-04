"use client";
import React, { useState, useEffect } from "react";
import Loader from "../../loading";

const Recipe = ({ params }) => {
    const { recipe } = params;
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching recipe details
    const fetchRecipeDetail = async () => {
        try {
            const response = await fetch(
                `https://dummyjson.com/recipes/${recipe}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch recipe details.");
            }
            const data = await response.json();
            setDetail(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipeDetail();
    }, [recipe]);

    if (loading) return <Loader />;
    if (error)
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-red-600 dark:text-red-400">
                <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Error
                    </h2>
                    <p>{error}</p>
                </div>
            </div>
        );

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <img
                    src={detail.image}
                    alt={detail.name}
                    className="w-full h-72 object-cover"
                />

                <div className="p-6 dark:text-gray-100 dark:bg-gray-900">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                        {detail.name}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <strong>Cuisine:</strong> {detail.cuisine}
                            </p>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <strong>Difficulty:</strong> {detail.difficulty}
                            </p>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <strong>Calories per Serving:</strong>{" "}
                                {detail.caloriesPerServing} kcal
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <strong>Prep Time:</strong>{" "}
                                {detail.prepTimeMinutes} minutes
                            </p>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <strong>Cook Time:</strong>{" "}
                                {detail.cookTimeMinutes} minutes
                            </p>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <strong>Servings:</strong> {detail.servings}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Ingredients
                        </h2>
                        <ul className="list-disc list-inside pl-5">
                            {detail.ingredients.map((ingredient, index) => (
                                <li
                                    key={index}
                                    className="text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Instructions
                        </h2>
                        <ol className="list-decimal list-inside pl-5 space-y-2">
                            {detail.instructions.map((instruction, index) => (
                                <li
                                    key={index}
                                    className="text-gray-700 dark:text-gray-300"
                                >
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {detail.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Rating:{" "}
                            <span className="font-bold text-gray-900 dark:text-gray-100">
                                {detail.rating}
                            </span>{" "}
                            ({detail.reviewCount} reviews)
                        </div>
                        <button
                            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
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

export default Recipe;
