import Navbar from "@/components/ui/Navbar";
import Link from "next/link";

export default function RecipesLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0f1110] text-white overflow-x-hidden relative flex flex-col justify-between">
            <div>
                <Navbar />

                <div className="relative z-10">
                    {children}
                </div>
            </div>

            <footer className="border-t border-white/[0.08] bg-[#0a0b0a] px-6 py-10 relative z-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <Link href="/" className="text-xl font-black tracking-tight text-white">
                        Recipe<span className="text-amber-300">Book</span>
                    </Link>

                    <p className="text-sm text-stone-500">
                        RecipeBook. Built for cooks who like useful design.
                    </p>

                    <div className="flex items-center gap-6 text-sm font-semibold text-stone-400">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
                        <Link href="/#about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/recipes" className="hover:text-white transition-colors">Recipes</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
