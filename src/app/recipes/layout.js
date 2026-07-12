import Navbar from "@/components/ui/Navbar";
import Link from "next/link";

export default function RecipesLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative flex flex-col justify-between">
            <div>
                {/* ───── Navbar ───── */}
                <Navbar />

                {/* Ambient gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/15 via-[#0a0a0a] to-red-900/10 pointer-events-none z-0" />

                {/* Glowing orbs */}
                <div className="absolute top-24 left-8 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse pointer-events-none z-0" />
                <div
                    className="absolute bottom-20 right-8 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse pointer-events-none z-0"
                    style={{ animationDelay: "1.5s" }}
                />

                {/* Content Area */}
                <div className="relative z-10 pt-28 pb-16">
                    {children}
                </div>
            </div>

            {/* ───── FOOTER ───── */}
            <footer className="border-t border-white/[0.06] py-10 px-6 relative z-10 bg-black/40 backdrop-blur-md">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🍴</span>
                        <span className="text-lg font-extrabold text-white">
                            Recipe<span className="text-orange-400">Book</span>
                        </span>
                    </Link>

                    {/* Copyright */}
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} RecipeBook. Made with ❤️ for food lovers.
                    </p>

                    {/* Footer Links */}
                    <div className="flex items-center gap-6 text-gray-400 text-sm">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                        <Link href="/#features" className="hover:text-orange-400 transition-colors">Features</Link>
                        <Link href="/#about" className="hover:text-orange-400 transition-colors">About</Link>
                        <Link href="/recipes" className="hover:text-orange-400 transition-colors">Recipes</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
