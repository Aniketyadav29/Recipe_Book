import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import PantryChef from "@/components/recipes/PantryChef";
import {
    FaArrowRight,
    FaBookOpen,
    FaCamera,
    FaClock,
    FaGlobeAmericas,
    FaLeaf,
    FaRegBookmark,
    FaStar,
    FaUsers,
    FaUtensils,
} from "react-icons/fa";

export const metadata = {
    title: "RecipeBook - Discover & Cook Amazing Recipes",
    description:
        "A polished recipe discovery experience for home cooks, community recipes, and smart meal inspiration.",
};

const heroStats = [
    { value: "500+", label: "Recipes" },
    { value: "50+", label: "Cuisines" },
    { value: "4.8", label: "Avg Rating" },
];

const features = [
    {
        icon: FaBookOpen,
        title: "Structured Recipes",
        desc: "Ingredients, steps, timing, servings, calories, and tags are arranged for quick decisions while cooking.",
    },
    {
        icon: FaGlobeAmericas,
        title: "Global Inspiration",
        desc: "Move from Indian comfort food to Italian pasta, Asian noodles, bakery favorites, and everyday meals.",
    },
    {
        icon: FaCamera,
        title: "Image-Led Browsing",
        desc: "Large visual recipe cards make the book feel closer to a real food magazine than a data list.",
    },
    {
        icon: FaUsers,
        title: "Community Recipes",
        desc: "Submitted recipes can be reviewed, approved, and presented beside the main recipe collection.",
    },
    {
        icon: FaRegBookmark,
        title: "Save AI Ideas",
        desc: "Generate a recipe by name and save it directly into the recipe book for later use.",
    },
    {
        icon: FaClock,
        title: "Cook Faster",
        desc: "Clear prep and cook times help you choose a realistic dish before you step into the kitchen.",
    },
];

const collections = [
    {
        title: "Indian Classics",
        copy: "Layered biryani, creamy curries, festive sweets, and spice-forward family dishes.",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85",
    },
    {
        title: "Weeknight Plates",
        copy: "Fast rice bowls, skillet meals, noodles, and pantry-friendly dinners with clean instructions.",
        image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=85",
    },
    {
        title: "Bakery & Dessert",
        copy: "Cakes, pancakes, sweets, and special treats presented with practical ingredient lists.",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
    },
];

const steps = [
    "Find a recipe by cuisine, craving, rating, or ingredient.",
    "Open a focused cooking page with ingredients and method.",
    "Submit your own dish and approve it from the admin panel.",
];

export default function Home() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0f1110] text-white">
            <Navbar />

            <section id="home" className="relative min-h-[94vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=2200&q=88"
                    alt="A styled kitchen table with fresh ingredients"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,10,0.94)_0%,rgba(11,12,10,0.76)_44%,rgba(11,12,10,0.34)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0f1110] to-transparent" />

                <div className="relative z-10 mx-auto grid min-h-[94vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-28 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="max-w-2xl">
                        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-stone-100 backdrop-blur-md">
                            <FaUtensils className="text-amber-300" />
                            Curated for everyday cooks
                        </span>

                        <h1 className="text-6xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
                            RecipeBook
                        </h1>
                        <p className="mt-7 max-w-xl text-lg leading-8 text-stone-200 sm:text-xl">
                            A refined cooking workspace for browsing recipes, saving community dishes, and turning a craving into a practical ingredient list.
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/recipes"
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f6c86a] px-7 py-4 text-sm font-black uppercase tracking-wide text-[#17120d] shadow-2xl shadow-amber-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                            >
                                Explore Recipes
                                <FaArrowRight />
                            </Link>
                            <a
                                href="#pantry-chef"
                                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                            >
                                Try Pantry Match
                            </a>
                        </div>

                        <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
                            {heroStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="border-l border-white/15 pl-4"
                                >
                                    <div className="text-3xl font-black text-white">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-xs font-bold uppercase tracking-widest text-stone-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hero-kitchen-stage hidden lg:block">
                        <div className="hero-photo-card hero-photo-card-main">
                            <img
                                src="https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1000&q=86"
                                alt="Colorful prepared food bowls"
                            />
                            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/50 p-5 backdrop-blur-md">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-amber-200">
                                            Featured collection
                                        </p>
                                        <p className="mt-1 text-2xl font-black text-white">
                                            Chef's table picks
                                        </p>
                                    </div>
                                    <div className="rounded-full bg-emerald-400 px-3 py-1 text-sm font-black text-emerald-950">
                                        Live
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-photo-card hero-photo-card-small hero-photo-card-top">
                            <img
                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=650&q=82"
                                alt="Fresh salad ingredients"
                            />
                        </div>
                        <div className="hero-photo-card hero-photo-card-small hero-photo-card-bottom">
                            <img
                                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=650&q=82"
                                alt="Cooked dinner plate"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-white/[0.08] bg-[#151714] py-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-2xl text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">
                        Built like a modern digital cookbook
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {["Search", "Cook", "Save", "Share"].map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-stone-200"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section id="features" className="bg-[#0f1110] px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                        <div>
                            <span className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                                Why it feels better
                            </span>
                            <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                                A practical recipe system with the polish of a food editorial.
                            </h2>
                        </div>
                        <p className="max-w-3xl text-lg leading-8 text-stone-400">
                            The page now uses real photography, measured spacing, realistic content hierarchy, and dimensional UI surfaces. The result feels more like a serious cooking product and less like a generated demo.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="professional-feature-card group"
                                >
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 text-[#16120c] shadow-lg shadow-amber-900/20">
                                        <Icon />
                                    </div>
                                    <h3 className="text-xl font-black text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-stone-400">
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-[#181713] px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
                                Collections
                            </span>
                            <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
                                Browse by mood, not just by list.
                            </h2>
                        </div>
                        <Link
                            href="/recipes"
                            className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-stone-200 transition-colors hover:bg-white/10"
                        >
                            Open Recipe Book
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {collections.map((item) => (
                            <article key={item.title} className="collection-3d-card">
                                <img src={item.image} alt={item.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-black text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-stone-300">
                                        {item.copy}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <PantryChef />

            <section id="about" className="bg-[#0f1110] px-6 py-24">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="about-image-stage">
                        <img
                            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85"
                            alt="Cook preparing fresh food in a kitchen"
                            className="h-[32rem] w-full rounded-[2rem] object-cover"
                        />
                        <div className="about-floating-panel">
                            <FaStar className="text-amber-300" />
                            <div>
                                <p className="text-sm font-black text-white">
                                    Designed for real cooking
                                </p>
                                <p className="text-xs text-stone-400">
                                    Fast scanning, clear steps, polished visuals.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                            About RecipeBook
                        </span>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                            A better place to collect the food you actually want to make.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-stone-400">
                            RecipeBook brings browsing, AI recipe creation, community submissions, and readable cooking detail pages into one cohesive experience. It is built to feel calm, useful, and visually memorable.
                        </p>

                        <div className="mt-8 space-y-4">
                            {steps.map((step, index) => (
                                <div key={step} className="flex gap-4">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-[#111]">
                                        {index + 1}
                                    </span>
                                    <p className="pt-1 text-stone-300">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="community" className="relative overflow-hidden bg-[#1d1812] px-6 py-24">
                <img
                    src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1900&q=85"
                    alt="Professional kitchen counter"
                    className="absolute inset-0 h-full w-full object-cover opacity-28"
                />
                <div className="absolute inset-0 bg-[#15110d]/75" />
                <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                    <div>
                        <span className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
                            Community kitchen
                        </span>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                            Add family recipes without making the site messy.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-stone-300">
                            Recipes can be submitted, reviewed, approved, and displayed with the same polished presentation as the main collection.
                        </p>
                        <Link
                            href="/submit-recipe"
                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-[#15110d] transition-transform duration-300 hover:-translate-y-1"
                        >
                            Submit Recipe
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {["Submit", "Review", "Publish"].map((item, index) => (
                            <div key={item} className="process-tile">
                                <span className="text-5xl font-black text-white/15">
                                    0{index + 1}
                                </span>
                                <h3 className="mt-8 text-xl font-black text-white">
                                    {item}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-stone-400">
                                    {index === 0 && "Add the dish, photo, ingredients, and instructions."}
                                    {index === 1 && "Use the admin screen to check quality and details."}
                                    {index === 2 && "Approved recipes appear in the book instantly."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#0f1110] px-6 py-24 text-center">
                <div className="mx-auto max-w-4xl">
                    <FaLeaf className="mx-auto text-3xl text-emerald-300" />
                    <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
                        Ready to cook something worth saving?
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-400">
                        Open the recipe book, search by craving, or let the pantry tool turn what you already have into dinner.
                    </p>
                    <Link
                        href="/recipes"
                        className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#f6c86a] px-8 py-4 text-sm font-black uppercase tracking-wide text-[#17120d] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                    >
                        Start Browsing
                        <FaArrowRight />
                    </Link>
                </div>
            </section>

            <footer className="border-t border-white/[0.08] bg-[#0a0b0a] px-6 py-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <Link href="/" className="text-xl font-black tracking-tight text-white">
                        Recipe<span className="text-amber-300">Book</span>
                    </Link>
                    <p className="text-sm text-stone-500">
                        RecipeBook. Built for cooks who like useful design.
                    </p>
                    <div className="flex gap-5 text-sm font-semibold text-stone-400">
                        <a href="#features" className="hover:text-white">
                            Features
                        </a>
                        <a href="#pantry-chef" className="hover:text-white">
                            Pantry
                        </a>
                        <Link href="/recipes" className="hover:text-white">
                            Recipes
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
