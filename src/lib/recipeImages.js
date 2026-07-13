const GENERIC_FOOD_IMAGE =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";

const GENERIC_IMAGE_MARKERS = [
    "/placeholder.jpg",
    "photo-1504674900247-0877df9cc836",
    "source.unsplash.com",
];

const FOOD_PHOTOS = {
    gulabJamun: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    friedRice: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
    butterChicken: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
    biryani: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80",
    pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
    noodles: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
    curry: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80",
    paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
    cake: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80",
    pancake: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
    smoothie: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80",
    chicken: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80",
    beef: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
    shrimp: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80",
    salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
    breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80",
    indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
    asian: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=900&q=80",
    italian: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=900&q=80",
    mexican: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
    global: GENERIC_FOOD_IMAGE,
};

const PHOTO_MATCHERS = [
    { keys: ["gulab", "jamun", "rasgulla", "jalebi", "laddu", "kheer"], photo: FOOD_PHOTOS.gulabJamun },
    { keys: ["fried rice"], photo: FOOD_PHOTOS.friedRice },
    { keys: ["butter chicken", "murgh makhani"], photo: FOOD_PHOTOS.butterChicken },
    { keys: ["biryani"], photo: FOOD_PHOTOS.biryani },
    { keys: ["pizza", "margherita"], photo: FOOD_PHOTOS.pizza },
    { keys: ["burger"], photo: FOOD_PHOTOS.burger },
    { keys: ["carbonara", "spaghetti", "pasta", "macaroni"], photo: FOOD_PHOTOS.pasta },
    { keys: ["noodle", "ramen", "chow mein", "hakka"], photo: FOOD_PHOTOS.noodles },
    { keys: ["paneer"], photo: FOOD_PHOTOS.paneer },
    { keys: ["curry", "masala", "chole", "dal", "sabzi", "pulao"], photo: FOOD_PHOTOS.curry },
    { keys: ["cake", "cupcake", "brownie", "muffin", "cookie"], photo: FOOD_PHOTOS.cake },
    { keys: ["pancake", "waffle", "crepe"], photo: FOOD_PHOTOS.pancake },
    { keys: ["smoothie", "shake", "lassi", "juice", "drink"], photo: FOOD_PHOTOS.smoothie },
    { keys: ["chicken"], photo: FOOD_PHOTOS.chicken },
    { keys: ["beef", "steak"], photo: FOOD_PHOTOS.beef },
    { keys: ["shrimp", "prawn"], photo: FOOD_PHOTOS.shrimp },
    { keys: ["salad"], photo: FOOD_PHOTOS.salad },
    { keys: ["dessert", "sweet"], photo: FOOD_PHOTOS.dessert },
    { keys: ["breakfast"], photo: FOOD_PHOTOS.breakfast },
];

const CUISINE_PHOTOS = [
    { keys: ["indian"], photo: FOOD_PHOTOS.indian },
    { keys: ["asian", "chinese", "japanese", "thai", "korean"], photo: FOOD_PHOTOS.asian },
    { keys: ["italian"], photo: FOOD_PHOTOS.italian },
    { keys: ["mexican"], photo: FOOD_PHOTOS.mexican },
];

const FALLBACK_PHOTOS = [
    FOOD_PHOTOS.indian,
    FOOD_PHOTOS.asian,
    FOOD_PHOTOS.italian,
    FOOD_PHOTOS.mexican,
    FOOD_PHOTOS.salad,
    FOOD_PHOTOS.breakfast,
    FOOD_PHOTOS.dessert,
    FOOD_PHOTOS.global,
];

function hashString(value) {
    return value.split("").reduce((hash, char) => {
        return (hash * 31 + char.charCodeAt(0)) >>> 0;
    }, 7);
}

function cleanText(value) {
    return String(value || "").trim().toLowerCase();
}

export function getRecipeImageForName(name = "", cuisine = "") {
    const text = cleanText(`${name} ${cuisine}`);
    const match = PHOTO_MATCHERS.find(({ keys }) =>
        keys.some((key) => text.includes(key))
    );

    if (match) return match.photo;

    const cuisineMatch = CUISINE_PHOTOS.find(({ keys }) =>
        keys.some((key) => text.includes(key))
    );

    if (cuisineMatch) return cuisineMatch.photo;

    return FALLBACK_PHOTOS[hashString(text || "recipe") % FALLBACK_PHOTOS.length];
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
