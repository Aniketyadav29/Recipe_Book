import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import PantryChef from "@/components/recipes/PantryChef";

export const metadata = {
    title: "RecipeBook — Discover & Cook Amazing Recipes",
    description:
        "Explore hundreds of mouthwatering recipes from cuisines around the world. Find your next favourite dish today.",
};

const features = [
    {
        icon: "🔍",
        title: "Discover Recipes",
        desc: "Browse a rich collection of recipes from every corner of the world, handpicked for every skill level.",
    },
    {
        icon: "🌍",
        title: "Global Cuisines",
        desc: "From Italian pasta to Indian curries — explore 50+ culinary traditions all in one beautifully crafted place.",
    },
    {
        icon: "⚡",
        title: "Instant Details",
        desc: "Full ingredient lists, step-by-step instructions, calories, prep & cook times — all at a glance.",
    },
    {
        icon: "⭐",
        title: "Top Rated",
        desc: "Every recipe includes ratings and review counts so you always pick a crowd-pleasing winner.",
    },
    {
        icon: "🌙",
        title: "Dark & Light Mode",
        desc: "Switch effortlessly between dark and light themes — cook comfortably at any hour of the day.",
    },
    {
        icon: "📱",
        title: "Fully Responsive",
        desc: "Looks stunning on any device — from a 4K desktop to a pocket-sized mobile screen.",
    },
];

const stats = [
    { value: "50+", label: "Cuisines" },
    { value: "500+", label: "Recipes" },
    { value: "100%", label: "Free" },
    { value: "4.8★", label: "Avg Rating" },
];

const categories = [
    { icon: "🥘", label: "Home Cooking", color: "from-orange-500/20" },
    { icon: "🍱", label: "Meal Prep", color: "from-red-500/20" },
    { icon: "🥩", label: "Grilling", color: "from-amber-500/20" },
    { icon: "🍰", label: "Baking", color: "from-pink-500/20" },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
            {/* ───── Navbar ───── */}
            <Navbar />

            {/* ───── HERO ───── */}
            <section
                id="home"
                className="relative min-h-screen flex items-center justify-center pt-24 pb-16"
            >
                {/* Ambient gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/25 via-[#0a0a0a] to-red-900/15 pointer-events-none" />

                {/* Glowing orbs */}
                <div className="absolute top-24 left-8 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <div
                    className="absolute bottom-20 right-8 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"
                    style={{ animationDelay: "1.5s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
                />

                {/* Floating food emoji decorations */}
                <span className="absolute top-36 right-24 text-5xl animate-float opacity-20 hidden lg:block select-none">🍕</span>
                <span
                    className="absolute bottom-40 left-20 text-4xl animate-float opacity-20 hidden lg:block select-none"
                    style={{ animationDelay: "2s" }}
                >🍜</span>
                <span
                    className="absolute top-1/2 right-44 text-3xl animate-float opacity-15 hidden lg:block select-none"
                    style={{ animationDelay: "4s" }}
                >🥗</span>
                <span
                    className="absolute top-40 left-36 text-3xl animate-float opacity-15 hidden lg:block select-none"
                    style={{ animationDelay: "3s" }}
                >🍣</span>

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-8 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        Discover · Cook · Enjoy
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up">
                        Your Ultimate
                        <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                            Recipe Companion
                        </span>
                    </h1>

                    {/* Sub-headline */}
                    <p
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
                        style={{ animationDelay: "0.15s" }}
                    >
                        Explore hundreds of mouthwatering recipes from around the world.
                        Find the perfect dish for any occasion — from quick weeknight dinners
                        to showstopping gourmet feasts.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
                        style={{ animationDelay: "0.3s" }}
                    >
                        <Link
                            href="/recipes"
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300"
                        >
                            🍴 Explore Recipes
                        </Link>
                        <a
                            href="#about"
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white text-lg font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
                        >
                            Learn More ↓
                        </a>
                    </div>

                    {/* Scroll indicator */}
                    <div className="mt-20 flex justify-center animate-bounce">
                        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
                            <div className="w-1.5 h-3 rounded-full bg-orange-400 animate-scroll-dot" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── STATS STRIP ───── */}
            <section className="py-14 border-y border-white/[0.06] bg-white/[0.02]">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center group">
                            <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 mt-2 text-xs uppercase tracking-widest font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───── FEATURES ───── */}
            <section id="features" className="py-28 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section heading */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-4">
                            Why RecipeBook?
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            Everything You Need to
                            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                {" "}Cook Better
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto">
                            Our platform is packed with features designed to make your cooking
                            experience effortless and delightful.
                        </p>
                    </div>

                    {/* Feature cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-orange-500/25 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/5"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───── PANTRY CHEF AI ───── */}
            <PantryChef />

            {/* ───── ABOUT ───── */}
            <section id="about" className="py-28 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-3xl bg-gradient-to-br from-orange-900/20 via-[#0f0f0f] to-red-900/10 border border-white/[0.07] p-10 md:p-16 relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                            {/* Text side */}
                            <div>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-6">
                                    🍳 About Us
                                </span>
                                <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                                    We're Passionate About
                                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                        {" "}Great Food
                                    </span>
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-5">
                                    RecipeBook was born out of a deep love for food and a belief that
                                    great cooking should be accessible to everyone — beginner or
                                    seasoned chef.
                                </p>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    We believe great food brings people together. Our carefully
                                    curated collection spans 50+ cuisines and hundreds of recipes,
                                    from everyday weeknight meals to impressive dinner party showstoppers.
                                </p>
                                <Link
                                    href="/recipes"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
                                >
                                    Browse All Recipes →
                                </Link>
                            </div>

                            {/* Category grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {categories.map((item) => (
                                    <div
                                        key={item.label}
                                        className={`p-7 rounded-2xl bg-gradient-to-br ${item.color} to-transparent border border-white/[0.08] flex flex-col items-center text-center gap-3 hover:scale-105 hover:border-white/20 transition-all duration-300 cursor-default`}
                                    >
                                        <span className="text-4xl">{item.icon}</span>
                                        <span className="font-bold text-white text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── FINAL CTA ───── */}
            <section className="py-28 px-6">
                <div className="max-w-4xl mx-auto text-center relative">
                    {/* Glow behind CTA */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-96 h-40 bg-orange-500/10 blur-3xl rounded-full" />
                    </div>
                    <div className="relative z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-6">
                            Get Started Today
                        </span>
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Ready to Start{" "}
                            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                Cooking?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto">
                            Join thousands of food lovers discovering incredible new recipes every single day.
                        </p>
                        <Link
                            href="/recipes"
                            className="inline-block px-12 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-extrabold rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
                        >
                            🍴 Start Exploring Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* ───── FOOTER ───── */}
            <footer className="border-t border-white/[0.06] py-10 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍴</span>
                        <span className="text-lg font-extrabold">
                            Recipe<span className="text-orange-400">Book</span>
                        </span>
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} RecipeBook. Made with ❤️ for food lovers.
                    </p>

                    {/* Footer Links */}
                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                        <a href="#home" className="hover:text-orange-400 transition-colors">Home</a>
                        <a href="#features" className="hover:text-orange-400 transition-colors">Features</a>
                        <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
                        <Link href="/recipes" className="hover:text-orange-400 transition-colors">Recipes</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
