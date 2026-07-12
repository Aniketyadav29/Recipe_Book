"use client";
import RecipeList from "@/components/recipes";
import React, { useState, useEffect } from "react";
import Loader from "../loading";
import { getApprovedRecipes } from "@/lib/recipeStorage";

async function fetchListOfRecipes() {
    try {
        const apiResponse = await fetch("https://dummyjson.com/recipes", {
            cache: "force-cache",
        });
        const data = await apiResponse.json();
        return data.recipes;
    } catch (error) {
        console.error("Failed to fetch recipes:", error);
        return null;
    }
}

const Page = () => {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecipes = async () => {
            const fetchedRecipes = await fetchListOfRecipes();
            // Merge approved community recipes from localStorage
            const communityRecipes = getApprovedRecipes();
            const merged = [
                ...communityRecipes,                    // community first
                ...(fetchedRecipes || []),
            ];
            setRecipes(merged.length > 0 ? merged : fetchedRecipes);
            setLoading(false);
        };
        loadRecipes();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!recipes) {
        return <p>Failed to load recipes. Please try again later.</p>;
    }

    return <RecipeList recipes={recipes} />;
};

export default Page;
