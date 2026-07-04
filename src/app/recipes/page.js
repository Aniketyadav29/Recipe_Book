"use client";
import RecipeList from "@/components/recipes";
import React, { useState, useEffect } from "react";
import Loader from "../loading";

async function fetchListOfRecipes() {
    try {
        const apiResponse = await fetch("https://dummyjson.com/recipes", {
            cache: "force-cache",
        });
        const data = await apiResponse.json();
        return data.recipes;
    } catch (error) {
        console.error("Failed to fetch recipes:", error);
        return null; // Return null in case of error
    }
}

const Page = () => {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecipes = async () => {
            const fetchedRecipes = await fetchListOfRecipes();
            setRecipes(fetchedRecipes);
            setLoading(false);
        };
        loadRecipes();
    }, []);

    if (loading) {
        return <Loader />; // Display loading state
    }

    if (!recipes) {
        return <p>Failed to load recipes. Please try again later.</p>; // Handle null or undefined recipes
    }

    return <RecipeList recipes={recipes} />;
};

export default Page;
