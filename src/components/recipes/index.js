import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RecipeList({ recipes }) {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                All Recipes
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <Link
                            key={recipe.id}
                            href={`/recipes/${recipe.id}`}
                            passHref
                        >
                            <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                <CardContent className="p-0">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.name}
                                        className="w-full h-48 object-cover rounded-t-md"
                                    />
                                </CardContent>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {recipe.name}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                                        {recipe.cuisine} · {recipe.difficulty} ·{" "}
                                        {recipe.caloriesPerServing} kcal
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="p-4 flex justify-between items-center">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        ⭐ {recipe.rating} ({recipe.reviewCount}
                                        )
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {recipe.servings} servings
                                    </span>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                        No recipes found
                    </p>
                )}
            </div>
        </div>
    );
}
