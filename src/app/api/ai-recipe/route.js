import { NextResponse } from "next/server";

// Smart Fallback Recipe Database for common requests
const PRESETS = {
    "gulab jamun": {
        name: "Soft Gulab Jamun",
        ingredients: [
            "1 cup Milk Powder",
            "3 tbsp All-Purpose Flour",
            "1 tbsp Ghee",
            "1/4 tsp Baking Powder",
            "3-4 tbsp Milk, added gradually",
            "Oil or Ghee for deep frying",
            "1 1/2 cups Sugar",
            "1 1/2 cups Water",
            "4 Green Cardamom Pods, lightly crushed",
            "1 tsp Rose Water or a few saffron strands"
        ],
        instructions: [
            "Simmer sugar, water, cardamom, and rose water for 7-8 minutes to make a light syrup. Keep it warm.",
            "Mix milk powder, flour, baking powder, and ghee in a bowl.",
            "Add milk little by little and gently bring the mixture into a soft dough. Do not knead hard.",
            "Rest the dough for 8-10 minutes, then roll into smooth crack-free balls.",
            "Heat oil or ghee on low-medium heat and fry the balls slowly until deep golden brown.",
            "Transfer the hot jamuns into warm syrup and soak for at least 1 hour before serving."
        ],
        difficulty: "Medium",
        caloriesPerServing: 280,
        prepTimeMinutes: 20,
        cookTimeMinutes: 25,
        servings: 6,
        cuisine: "Indian",
        tags: ["Dessert", "Sweet", "Festival", "Indian"]
    },
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

const QUERY_ALIASES = [
    { keys: ["gulabjamun", "gulab jamun", "jamun"], preset: "gulab jamun" },
    { keys: ["carbonara"], preset: "carbonara" },
    { keys: ["margherita", "pizza"], preset: "pizza" },
    { keys: ["biryani"], preset: "biryani" },
    { keys: ["burger"], preset: "burger" },
];

function titleCase(value) {
    return value
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function hasAny(text, words) {
    return words.some((word) => text.includes(word));
}

function createRecipe({
    name,
    cuisine = "Global",
    difficulty = "Easy",
    ingredients,
    instructions,
    tags = [],
    prepTimeMinutes = 15,
    cookTimeMinutes = 20,
    servings = 4,
    caloriesPerServing = 420,
}) {
    return {
        name,
        ingredients,
        instructions,
        difficulty,
        caloriesPerServing,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        cuisine,
        tags: ["AI Generated", ...tags].slice(0, 5),
        isSimulated: true,
    };
}

// Smart Local Fallback Generator for any unspecified food
function generateSimulatedRecipe(query) {
    const cleanQuery = query.trim().toLowerCase();

    for (const alias of QUERY_ALIASES) {
        if (alias.keys.some((key) => cleanQuery.includes(key))) {
            return { ...PRESETS[alias.preset], isSimulated: true };
        }
    }

    const name = titleCase(query);

    if (hasAny(cleanQuery, ["cake", "cupcake", "brownie", "muffin", "cookie"])) {
        return createRecipe({
            name,
            cuisine: "Bakery",
            difficulty: "Medium",
            prepTimeMinutes: 20,
            cookTimeMinutes: 30,
            servings: 8,
            caloriesPerServing: 360,
            tags: ["Dessert", "Baking", "Sweet"],
            ingredients: [
                "1 1/2 cups All-Purpose Flour",
                "3/4 cup Sugar",
                "1/2 cup Unsalted Butter or Oil",
                "2 Large Eggs",
                "1/2 cup Milk",
                "1 1/2 tsp Baking Powder",
                "1 tsp Vanilla Extract",
                "Pinch of Salt"
            ],
            instructions: [
                "Preheat the oven to 180°C / 350°F and grease a baking tin.",
                "Whisk butter or oil with sugar until smooth, then add eggs and vanilla.",
                "Fold in flour, baking powder, salt, and milk until a smooth batter forms.",
                "Pour into the tin and bake until a toothpick inserted in the center comes out clean.",
                "Cool before slicing and serving."
            ]
        });
    }

    if (hasAny(cleanQuery, ["pancake", "waffle", "crepe"])) {
        return createRecipe({
            name,
            cuisine: "Breakfast",
            prepTimeMinutes: 10,
            cookTimeMinutes: 15,
            servings: 3,
            caloriesPerServing: 310,
            tags: ["Breakfast", "Sweet", "Quick"],
            ingredients: [
                "1 cup All-Purpose Flour",
                "1 tbsp Sugar",
                "1 tsp Baking Powder",
                "1 Egg",
                "3/4 cup Milk",
                "2 tbsp Melted Butter",
                "Pinch of Salt",
                "Honey, Maple Syrup, or Fruit for serving"
            ],
            instructions: [
                "Mix flour, sugar, baking powder, and salt in a bowl.",
                "Whisk egg, milk, and melted butter separately, then combine with the dry mixture.",
                "Cook small portions of batter on a lightly buttered pan until bubbles appear.",
                "Flip and cook the other side until golden.",
                "Serve warm with syrup or fresh fruit."
            ]
        });
    }

    if (hasAny(cleanQuery, ["fried rice", "rice", "pulao"])) {
        const protein = cleanQuery.includes("chicken") ? "1 cup Cooked Chicken, shredded" : cleanQuery.includes("egg") ? "2 Eggs, scrambled" : "1 cup Mixed Vegetables";
        return createRecipe({
            name,
            cuisine: hasAny(cleanQuery, ["pulao", "masala"]) ? "Indian" : "Asian",
            prepTimeMinutes: 12,
            cookTimeMinutes: 15,
            servings: 3,
            caloriesPerServing: 430,
            tags: ["Rice", "Quick", "One-Pan"],
            ingredients: [
                "3 cups Cooked Rice, cooled",
                protein,
                "1/2 cup Carrot, finely diced",
                "1/2 cup Capsicum or Bell Pepper, chopped",
                "3 Spring Onions, sliced",
                "2 tbsp Soy Sauce or Light Masala Seasoning",
                "1 tbsp Oil",
                "Salt and Pepper to taste"
            ],
            instructions: [
                "Heat oil in a wide pan or wok over high heat.",
                "Add vegetables and stir-fry for 2-3 minutes until slightly tender.",
                "Add the protein and toss until warmed through.",
                "Add cooked rice, seasoning, salt, and pepper.",
                "Stir-fry until every grain is coated and hot. Finish with spring onions."
            ]
        });
    }

    if (hasAny(cleanQuery, ["noodle", "ramen", "chow mein", "hakka"])) {
        return createRecipe({
            name,
            cuisine: hasAny(cleanQuery, ["ramen"]) ? "Japanese" : "Chinese",
            prepTimeMinutes: 12,
            cookTimeMinutes: 12,
            servings: 2,
            caloriesPerServing: 470,
            tags: ["Noodles", "Quick", "Savory"],
            ingredients: [
                "250g Noodles",
                "1 cup Shredded Cabbage",
                "1/2 cup Carrot, julienned",
                "1/2 cup Capsicum, sliced",
                "2 cloves Garlic, minced",
                "2 tbsp Soy Sauce",
                "1 tsp Vinegar",
                "1 tbsp Sesame or Cooking Oil"
            ],
            instructions: [
                "Boil noodles until just cooked, drain, and rinse with cold water.",
                "Heat oil in a wok and sauté garlic for 20 seconds.",
                "Add vegetables and stir-fry on high heat for 2-3 minutes.",
                "Add noodles, soy sauce, vinegar, and seasoning.",
                "Toss well and serve hot."
            ]
        });
    }

    if (hasAny(cleanQuery, ["curry", "masala", "paneer", "chole", "dal", "sabzi"])) {
        const main = cleanQuery.includes("paneer") ? "300g Paneer Cubes" : cleanQuery.includes("chole") ? "2 cups Boiled Chickpeas" : cleanQuery.includes("dal") ? "1 cup Cooked Lentils" : "2 cups Mixed Vegetables";
        return createRecipe({
            name,
            cuisine: "Indian",
            difficulty: "Medium",
            prepTimeMinutes: 15,
            cookTimeMinutes: 25,
            servings: 4,
            caloriesPerServing: 390,
            tags: ["Indian", "Curry", "Comfort Food"],
            ingredients: [
                main,
                "2 tbsp Oil or Ghee",
                "1 Onion, finely chopped",
                "2 Tomatoes, pureed",
                "1 tbsp Ginger-Garlic Paste",
                "1 tsp Cumin Seeds",
                "1 tsp Turmeric Powder",
                "1 tsp Coriander Powder",
                "1/2 tsp Garam Masala",
                "Salt to taste",
                "Fresh Coriander for garnish"
            ],
            instructions: [
                "Heat oil or ghee and crackle cumin seeds.",
                "Add onion and cook until golden, then add ginger-garlic paste.",
                "Stir in tomato puree, turmeric, coriander powder, and salt.",
                "Cook until the masala thickens and oil begins to separate.",
                "Add the main ingredient and simmer until flavorful.",
                "Finish with garam masala and coriander."
            ]
        });
    }

    if (hasAny(cleanQuery, ["pasta", "spaghetti", "macaroni", "lasagna"])) {
        return createRecipe({
            name,
            cuisine: "Italian",
            prepTimeMinutes: 10,
            cookTimeMinutes: 20,
            servings: 3,
            caloriesPerServing: 520,
            tags: ["Pasta", "Italian", "Dinner"],
            ingredients: [
                "300g Pasta",
                "2 tbsp Olive Oil",
                "3 cloves Garlic, minced",
                "1 cup Tomato Sauce or Cream Sauce",
                "1/2 cup Parmesan or Mozzarella",
                "1 tsp Italian Herbs",
                "Salt and Pepper to taste",
                "Fresh Basil or Parsley"
            ],
            instructions: [
                "Boil pasta in salted water until al dente.",
                "Heat olive oil and sauté garlic until fragrant.",
                "Add sauce, herbs, salt, and pepper, then simmer briefly.",
                "Toss pasta with the sauce and a splash of pasta water.",
                "Finish with cheese and herbs."
            ]
        });
    }

    if (hasAny(cleanQuery, ["smoothie", "shake", "lassi", "juice", "drink"])) {
        return createRecipe({
            name,
            cuisine: "Beverage",
            prepTimeMinutes: 8,
            cookTimeMinutes: 0,
            servings: 2,
            caloriesPerServing: 180,
            tags: ["Drink", "Refreshing", "No Cook"],
            ingredients: [
                "1 1/2 cups Chilled Milk, Yogurt, or Water",
                "1 cup Fresh Fruit or Flavor Base",
                "1-2 tbsp Sugar, Honey, or Jaggery",
                "4-5 Ice Cubes",
                "Pinch of Cardamom, Cinnamon, or Salt, optional"
            ],
            instructions: [
                "Add all ingredients to a blender.",
                "Blend until smooth and creamy.",
                "Taste and adjust sweetness or thickness.",
                "Serve immediately chilled."
            ]
        });
    }

    const protein = cleanQuery.includes("chicken")
        ? "450g Chicken, bite-sized"
        : cleanQuery.includes("beef")
            ? "450g Beef, thinly sliced"
            : cleanQuery.includes("shrimp") || cleanQuery.includes("prawn")
                ? "300g Shrimp, cleaned"
                : cleanQuery.includes("paneer")
                    ? "300g Paneer Cubes"
                    : cleanQuery.includes("tofu")
                        ? "300g Firm Tofu, cubed"
                        : "2 cups Seasonal Vegetables";

    return createRecipe({
        name,
        cuisine: hasAny(cleanQuery, ["taco", "burrito", "salsa"]) ? "Mexican" : "Global",
        difficulty: "Easy",
        prepTimeMinutes: 12,
        cookTimeMinutes: 18,
        servings: 3,
        caloriesPerServing: 410,
        tags: ["Quick", protein.includes("Vegetables") ? "Vegetarian" : "High-Protein"],
        ingredients: [
            protein,
            "1 tbsp Oil or Butter",
            "1 Small Onion or Spring Onion, chopped",
            "2 cloves Garlic, minced",
            "1 cup Chopped Vegetables matching the dish",
            "1 tsp Main Seasoning or Spice Blend",
            "Salt to taste",
            "Fresh Herbs or Lemon for finishing"
        ],
        instructions: [
            "Prepare and cut all ingredients according to the dish style.",
            "Heat oil or butter in a pan over medium-high heat.",
            "Cook the onion and garlic until fragrant.",
            "Add the main ingredient and cook until nearly done.",
            "Add vegetables and seasoning, then toss until everything is coated.",
            "Finish with herbs or lemon and serve hot."
        ]
    });
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
