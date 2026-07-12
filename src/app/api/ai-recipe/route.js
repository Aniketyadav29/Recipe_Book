import { NextResponse } from "next/server";

// Smart Fallback Recipe Database for common requests
const PRESETS = {
    carbonara: {
        name: "Classic Spaghetti Carbonara",
        ingredients: [
            "350g Spaghetti",
            "150g Pancetta or Guanciale, cubed",
            "4 Large Egg Yolks",
            "1 Whole Large Egg",
            "75g Pecorino Romano or Parmesan, grated",
            "2 cloves Garlic, peeled (optional)",
            "1 tbsp Extra Virgin Olive Oil",
            "Salt and Freshly Cracked Black Pepper"
        ],
        instructions: [
            "Cook spaghetti in a large pot of boiling salted water until al dente.",
            "Meanwhile, heat olive oil in a pan and sauté the pancetta/guanciale with the garlic cloves until crispy. Remove garlic cloves once browned.",
            "In a bowl, whisk together the egg yolks, whole egg, grated cheese, and plenty of cracked black pepper to form a thick paste.",
            "Drain the pasta, reserving 1 cup of pasta water.",
            "Immediately toss the hot pasta in the pan with the pancetta/guanciale to coat in the fat.",
            "Remove the pan from the heat. Pour the egg and cheese mixture over the pasta, tossing rapidly. Add 2-4 tbsp of reserved pasta water to emulsify into a creamy sauce. (Do not scramble the eggs!)",
            "Serve immediately garnished with extra grated cheese and black pepper."
        ],
        difficulty: "Medium",
        caloriesPerServing: 620,
        prepTimeMinutes: 10,
        cookTimeMinutes: 15,
        servings: 4,
        cuisine: "Italian",
        tags: ["Pasta", "Dinner", "Classic", "Creamy"]
    },
    pizza: {
        name: "Classic Margherita Pizza",
        ingredients: [
            "250g Pizza Dough (store-bought or homemade)",
            "100ml Tomato Passata or Crushed Tomatoes",
            "125g Fresh Mozzarella, sliced or torn",
            "4-5 Fresh Basil Leaves",
            "1 tbsp Extra Virgin Olive Oil",
            "Pinch of Salt"
        ],
        instructions: [
            "Preheat your oven to its highest setting (usually 250°C / 480°F). If using a pizza stone, place it in the oven to preheat.",
            "Roll or stretch the pizza dough on a floured surface into a 10-12 inch round.",
            "Spread the tomato passata evenly over the dough, leaving a 1-inch border around the edge.",
            "Sprinkle a pinch of salt and arrange the fresh mozzarella cheese slices over the sauce.",
            "Carefully transfer to the hot oven/pizza stone and bake for 8-12 minutes until the crust is golden-brown and the cheese is bubbly.",
            "Remove from the oven, scatter fresh basil leaves over the top, drizzle with olive oil, slice, and serve."
        ],
        difficulty: "Easy",
        caloriesPerServing: 550,
        prepTimeMinutes: 15,
        cookTimeMinutes: 10,
        servings: 2,
        cuisine: "Italian",
        tags: ["Pizza", "Vegetarian", "Baking", "Classic"]
    },
    biryani: {
        name: "Fragrant Chicken Biryani",
        ingredients: [
            "500g Basmati Rice",
            "600g Chicken thighs, bone-in, cut into pieces",
            "200g Yogurt (dahi)",
            "3 Medium Onions, thinly sliced",
            "2 tbsp Ginger-Garlic Paste",
            "2 tsp Biryani Masala powder",
            "1 tsp Turmeric, Chili Powder, and Coriander Powder",
            "A few saffron threads dissolved in 2 tbsp warm milk",
            "Fresh Cilantro and Mint leaves, chopped",
            "4 tbsp Ghee or Vegetable Oil",
            "Whole spices (cardamom, cloves, cinnamon, bay leaf)"
        ],
        instructions: [
            "Marinate the chicken in yogurt, ginger-garlic paste, biryani masala, turmeric, chili powder, and salt for at least 30 minutes.",
            "Wash and soak basmati rice for 30 minutes. Boil rice with whole spices and salt until 70% cooked. Drain and set aside.",
            "Heat ghee/oil in a heavy-bottomed pot. Fry sliced onions until deep golden brown. Set half aside for garnish.",
            "In the same pot, add the marinated chicken and cook over medium-high heat until the chicken is cooked through and the gravy is thick (about 15 mins).",
            "Layer the cooked rice over the chicken. Sprinkle the saffron milk, chopped mint, cilantro, and reserved fried onions on top.",
            "Cover the pot with a tight-fitting lid (seal with dough or foil). Cook on low heat (dum) for 15-20 minutes.",
            "Gently fluff and mix the layers before serving warm with raita."
        ],
        difficulty: "Hard",
        caloriesPerServing: 750,
        prepTimeMinutes: 30,
        cookTimeMinutes: 40,
        servings: 6,
        cuisine: "Indian",
        tags: ["Rice", "Chicken", "Spicy", "Feast"]
    },
    burger: {
        name: "Gourmet Beef Burger",
        ingredients: [
            "400g Ground Beef (80/20 lean-to-fat ratio)",
            "2 Brioche Burger Buns",
            "2 slices Cheddar Cheese",
            "1 Ripe Tomato, sliced",
            "4 Lettuce Leaves",
            "1/2 Red Onion, sliced",
            "2 tbsp Butter",
            "Salt, Black Pepper, and Garlic Powder"
        ],
        instructions: [
            "Divide the ground beef into two equal portions and gently shape them into patties slightly wider than the buns. Season both sides generously with salt, pepper, and garlic powder.",
            "Heat a skillet or grill pan over high heat.",
            "Toast the buttered brioche bun halves in the skillet until golden, then set aside.",
            "Place the patties in the hot skillet. Sear for 3-4 minutes on the first side without pressing down.",
            "Flip the patties, immediately place a slice of cheddar cheese on each, and cook for another 3 minutes (for medium-well).",
            "Assemble the burger: bottom bun, burger sauce (optional), lettuce, tomato, beef patty with melted cheese, red onion, and top bun. Serve hot with fries."
        ],
        difficulty: "Easy",
        caloriesPerServing: 680,
        prepTimeMinutes: 10,
        cookTimeMinutes: 8,
        servings: 2,
        cuisine: "American",
        tags: ["Burger", "Beef", "Grill", "Quick"]
    }
};

// Smart Local Fallback Generator for any unspecified food
function generateSimulatedRecipe(query) {
    const cleanQuery = query.trim().toLowerCase();
    
    // Check if we have a preset
    for (const key in PRESETS) {
        if (cleanQuery.includes(key)) {
            return { ...PRESETS[key], isSimulated: true };
        }
    }

    // Capitalize words
    const capitalizedName = query
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

    // Determine cuisine type based on keywords
    let cuisine = "Global";
    if (cleanQuery.includes("taco") || cleanQuery.includes("quesadilla") || cleanQuery.includes("fajita") || cleanQuery.includes("burrito") || cleanQuery.includes("salsa")) {
        cuisine = "Mexican";
    } else if (cleanQuery.includes("pasta") || cleanQuery.includes("pizza") || cleanQuery.includes("risotto") || cleanQuery.includes("lasagna") || cleanQuery.includes("gnocchi")) {
        cuisine = "Italian";
    } else if (cleanQuery.includes("curry") || cleanQuery.includes("tikka") || cleanQuery.includes("masala") || cleanQuery.includes("paneer") || cleanQuery.includes("naan") || cleanQuery.includes("samosa")) {
        cuisine = "Indian";
    } else if (cleanQuery.includes("sushi") || cleanQuery.includes("ramen") || cleanQuery.includes("teriyaki") || cleanQuery.includes("tempura") || cleanQuery.includes("miso")) {
        cuisine = "Japanese";
    } else if (cleanQuery.includes("stir fry") || cleanQuery.includes("noodles") || cleanQuery.includes("fried rice") || cleanQuery.includes("dumpling") || cleanQuery.includes("wonton")) {
        cuisine = "Chinese";
    } else if (cleanQuery.includes("croissant") || cleanQuery.includes("crepe") || cleanQuery.includes("souffle") || cleanQuery.includes("quiche")) {
        cuisine = "French";
    } else if (cleanQuery.includes("burger") || cleanQuery.includes("steak") || cleanQuery.includes("fries") || cleanQuery.includes("bbq")) {
        cuisine = "American";
    }

    // Determine difficulty
    const difficulty = cleanQuery.includes("bake") || cleanQuery.includes("stew") || cleanQuery.includes("roasted") || cleanQuery.includes("sauce") ? "Medium" : "Easy";

    // Set core ingredients
    const ingredients = [];
    const instructions = [];
    const tags = ["AI Generated"];

    // Detect primary items
    let hasMeat = false;
    let mainProtein = "";
    
    if (cleanQuery.includes("chicken")) {
        ingredients.push("450g Chicken Breasts or Thighs, bite-sized");
        hasMeat = true;
        mainProtein = "chicken";
        tags.push("Chicken", "High-Protein");
    } else if (cleanQuery.includes("beef") || cleanQuery.includes("steak")) {
        ingredients.push("500g Beef Sirloin or Ground Beef");
        hasMeat = true;
        mainProtein = "beef";
        tags.push("Beef", "High-Protein");
    } else if (cleanQuery.includes("shrimp") || cleanQuery.includes("prawn")) {
        ingredients.push("300g Fresh Shrimp, peeled and deveined");
        hasMeat = true;
        mainProtein = "Seafood";
        tags.push("Seafood");
    } else if (cleanQuery.includes("paneer") || cleanQuery.includes("tofu")) {
        ingredients.push(cleanQuery.includes("paneer") ? "300g Paneer cubes" : "300g Firm Tofu, pressed and cubed");
        tags.push("Vegetarian", "Tofu/Paneer");
    } else {
        tags.push("Vegetarian");
    }

    // Add secondary ingredients based on keywords
    if (cleanQuery.includes("garlic")) {
        ingredients.push("4 cloves Garlic, minced");
    } else {
        ingredients.push("2 cloves Garlic, minced");
    }
    
    if (cleanQuery.includes("ginger")) {
        ingredients.push("1-inch piece Fresh Ginger, grated");
    }

    if (cleanQuery.includes("spicy") || cleanQuery.includes("chili") || cleanQuery.includes("hot")) {
        ingredients.push("1 tsp Red Chili Flakes or 1 Fresh Green Chili, sliced");
        tags.push("Spicy");
    }

    if (cleanQuery.includes("cheese")) {
        ingredients.push("1 cup Grated Cheese (Mozzarella, Cheddar or Parmesan)");
        tags.push("Cheesy");
    }

    if (cleanQuery.includes("tomato") || cleanQuery.includes("sauce")) {
        ingredients.push("1 can (400g) Crushed Tomatoes or Tomato Sauce");
    }

    if (cleanQuery.includes("lemon") || cleanQuery.includes("lime")) {
        ingredients.push(cleanQuery.includes("lemon") ? "1 Lemon, zested and juiced" : "1 Lime, zested and juiced");
    }

    if (cleanQuery.includes("butter")) {
        ingredients.push("3 tbsp Unsalted Butter");
    } else {
        ingredients.push("2 tbsp Olive Oil or Cooking Oil");
    }

    // Add standard staples
    ingredients.push("1 Medium Onion, finely chopped");
    ingredients.push("Salt and Freshly Cracked Black Pepper to taste");
    ingredients.push("Fresh cilantro or parsley leaves for garnish");

    // Construct Instructions dynamically
    instructions.push(`Prepare all ingredients: chop the vegetables, mince the garlic, and prep your primary ingredients.`);
    
    if (hasMeat) {
        instructions.push(`Season the ${mainProtein} with a pinch of salt, black pepper, and any desired spices.`);
    }

    instructions.push(`Heat the oil or melt the butter in a large skillet or pan over medium-high heat.`);
    instructions.push(`Sauté the chopped onions, garlic, and ginger (if using) for 3-4 minutes until soft and fragrant.`);
    
    if (hasMeat) {
        instructions.push(`Add the seasoned ${mainProtein} to the skillet. Cook for 6-8 minutes, stirring frequently, until browned and cooked through.`);
    } else if (cleanQuery.includes("tofu") || cleanQuery.includes("paneer")) {
        instructions.push(`Add the tofu/paneer cubes to the skillet. Sauté gently for 5 minutes until lightly golden on all sides.`);
    }

    if (cleanQuery.includes("tomato") || cleanQuery.includes("sauce") || cleanQuery.includes("curry")) {
        instructions.push(`Pour in the crushed tomatoes or sauce base. Reduce heat to medium-low, stir well, and let it simmer for 10 minutes to develop the rich flavor profile.`);
    } else {
        instructions.push(`Add any remaining seasoning and toss the ingredients well to combine. Sauté for another 2-3 minutes.`);
    }

    instructions.push(`Remove from heat. Garnish with fresh herbs and serve immediately while hot.`);

    // Randomize metadata parameters logically
    const prepTimeMinutes = Math.floor(Math.random() * 11) + 10; // 10-20 mins
    const cookTimeMinutes = Math.floor(Math.random() * 16) + 15; // 15-30 mins
    const servings = Math.random() > 0.5 ? 4 : 2;
    const caloriesPerServing = Math.floor(Math.random() * 250) + 300; // 300-550 kcal

    return {
        name: capitalizedName,
        ingredients,
        instructions,
        difficulty,
        caloriesPerServing,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        cuisine,
        tags: tags.slice(0, 4), // Cap at 4 tags
        isSimulated: true
    };
}

export async function POST(req) {
    try {
        const { query } = await req.json();

        if (!query || typeof query !== "string" || query.trim().length === 0) {
            return NextResponse.json(
                { error: "Query is required." },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        // If API key is available, query Gemini
        if (apiKey && apiKey !== "undefined" && apiKey.length > 5) {
            try {
                const systemPrompt = `You are a professional chef. Create a highly detailed, realistic, and delicious recipe for the dish requested: "${query}".
                You must return the recipe as a valid JSON object matching this TypeScript structure:
                {
                    "name": string, // The exact name of the dish
                    "ingredients": string[], // List of ingredients with quantities (e.g., "2 chicken breasts, diced")
                    "instructions": string[], // Step-by-step cooking instructions
                    "difficulty": "Easy" | "Medium" | "Hard", // Difficulty level
                    "caloriesPerServing": number, // Approximate calorie count per serving (numeric only)
                    "prepTimeMinutes": number, // Prep time in minutes (numeric only)
                    "cookTimeMinutes": number, // Cook time in minutes (numeric only)
                    "servings": number, // Number of servings (numeric only)
                    "cuisine": string, // Cuisine type (e.g., "Italian", "Mexican", "Indian")
                    "tags": string[] // Tags like "Dinner", "Chicken", "Gluten-Free" (max 4 tags)
                }
                Do not return any markdown formatting (like \`\`\`json), HTML, comments, or extra text. Return ONLY the raw JSON string.`;

                const geminiResponse = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [
                                        {
                                            text: systemPrompt,
                                        },
                                    ],
                                },
                            ],
                            generationConfig: {
                                responseMimeType: "application/json",
                            },
                        }),
                    }
                );

                if (geminiResponse.ok) {
                    const data = await geminiResponse.json();
                    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        const parsedRecipe = JSON.parse(text.trim());
                        return NextResponse.json({
                            ...parsedRecipe,
                            isSimulated: false
                        });
                    }
                }
            } catch (err) {
                console.error("Gemini API call failed, falling back to simulator:", err);
            }
        }

        // Run smart fallback generator if key is missing or API failed
        const simulatedRecipe = generateSimulatedRecipe(query);
        return NextResponse.json(simulatedRecipe);

    } catch (error) {
        console.error("Error in AI Recipe Route:", error);
        return NextResponse.json(
            { error: "Internal server error occurred while generating recipe." },
            { status: 500 }
        );
    }
}
