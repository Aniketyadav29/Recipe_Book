const GENERIC_FOOD_IMAGE =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";

const GENERIC_IMAGE_MARKERS = [
    "/placeholder.jpg",
    "photo-1504674900247-0877df9cc836",
];

const PHOTO_MATCHERS = [
    { keys: ["gulab", "jamun", "rasgulla", "jalebi", "laddu", "kheer"], query: "gulab jamun indian dessert" },
    { keys: ["fried rice", "pulao"], query: "fried rice bowl" },
    { keys: ["biryani"], query: "chicken biryani rice" },
    { keys: ["pizza", "margherita"], query: "margherita pizza" },
    { keys: ["burger"], query: "gourmet burger" },
    { keys: ["carbonara", "spaghetti", "pasta", "macaroni"], query: "creamy pasta plate" },
    { keys: ["noodle", "ramen", "chow mein", "hakka"], query: "asian noodles bowl" },
    { keys: ["paneer", "curry", "masala", "chole", "dal", "sabzi"], query: "indian curry food" },
    { keys: ["cake", "cupcake", "brownie", "muffin", "cookie"], query: "fresh bakery dessert" },
    { keys: ["pancake", "waffle", "crepe"], query: "breakfast pancakes" },
    { keys: ["smoothie", "shake", "lassi", "juice", "drink"], query: "fresh smoothie drink" },
    { keys: ["chicken"], query: "chicken dinner plate" },
    { keys: ["beef"], query: "beef steak plate" },
    { keys: ["shrimp", "prawn"], query: "shrimp dish" },
    { keys: ["salad"], query: "fresh salad bowl" },
];

function hashString(value) {
    return value.split("").reduce((hash, char) => {
        return (hash * 31 + char.charCodeAt(0)) >>> 0;
    }, 7);
}

function cleanText(value) {
    return String(value || "").trim().toLowerCase();
}

function buildFoodPhotoUrl(query, seedText) {
    const encodedQuery = encodeURIComponent(`${query}, food`);
    const signature = hashString(seedText || query) % 1000;
    return `https://source.unsplash.com/900x700/?${encodedQuery}&sig=${signature}`;
}

export function getRecipeImageForName(name = "", cuisine = "") {
    const text = cleanText(`${name} ${cuisine}`);
    const match = PHOTO_MATCHERS.find(({ keys }) =>
        keys.some((key) => text.includes(key))
    );

    const query = match?.query || `${name || cuisine || "restaurant food"} recipe`;
    return buildFoodPhotoUrl(query, text);
}

export function getRecipeDisplayImage(recipe) {
    const currentImage = recipe?.image || "";
    const isGeneric = GENERIC_IMAGE_MARKERS.some((marker) =>
        currentImage.includes(marker)
    );

    if (currentImage && !isGeneric) {
        return currentImage;
    }

    if (recipe?.name || recipe?.cuisine) {
        return getRecipeImageForName(recipe.name, recipe.cuisine);
    }

    return GENERIC_FOOD_IMAGE;
}

export { GENERIC_FOOD_IMAGE };
