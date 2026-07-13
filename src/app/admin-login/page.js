"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<LoginShell />}>
            <AdminLoginForm />
        </Suspense>
    );
}

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nextPath = searchParams.get("next") || "/admin";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginHint, setLoginHint] = useState(null);

    useEffect(() => {
        fetch("/api/admin-login")
            .then((res) => res.json())
            .then(setLoginHint)
            .catch(() => setLoginHint(null));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data.error || "Invalid admin login.");
                return;
            }

            router.replace(nextPath);
            router.refresh();
        } catch {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen overflow-hidden bg-[#0f1110] text-white">
            <Navbar />

            <section className="relative min-h-screen overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1900&q=85"
                    alt="Restaurant kitchen"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,10,0.97)_0%,rgba(11,12,10,0.84)_48%,rgba(11,12,10,0.58)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f1110] to-transparent" />

                <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-stone-100 backdrop-blur-md">
                            Secure admin access
                        </span>
                        <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight text-white md:text-7xl">
                            Sign in to approve recipes.
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
                            The recipe approval dashboard is private. Only an authenticated admin can review AI Chef and community submissions.
                        </p>
                    </div>

                    <div className="relative rounded-[2rem] border border-white/[0.12] bg-[#151713]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8">
                        <div className="absolute inset-4 -z-10 rounded-[2rem] bg-amber-300/20 blur-3xl" />

                        <div className="mb-7">
                            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                                Admin Login
                            </p>
                            <h2 className="mt-2 text-3xl font-black text-white">
                                Enter credentials
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-stone-400">
                                Your session is stored in a secure HTTP-only cookie.
                            </p>
                        </div>

                        {loginHint?.usesDefaultPassword && (
                            <div className="mb-5 rounded-2xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
                                Default local login: username <span className="font-black">{loginHint.username}</span>, password <span className="font-black">recipebook123</span>. Change these with environment variables before deploying.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-stone-300">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                    className="min-h-12 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-base text-white outline-none transition-all duration-200 placeholder:text-stone-500 focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10"
                                    placeholder="Enter admin username"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-stone-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="min-h-12 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-base text-white outline-none transition-all duration-200 placeholder:text-stone-500 focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10"
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>

                            {error && (
                                <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="min-h-12 w-full rounded-xl bg-[#f6c86a] px-6 text-sm font-black uppercase tracking-wide text-[#17120d] shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white disabled:pointer-events-none disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <Link
                            href="/recipes"
                            className="mt-5 inline-flex text-sm font-bold text-stone-400 transition-colors hover:text-amber-200"
                        >
                            Back to Recipe Book
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

function LoginShell() {
    return (
        <div className="min-h-screen bg-[#0f1110] text-white">
            <Navbar />
            <div className="flex min-h-screen items-center justify-center px-6">
                <div className="rounded-[2rem] border border-white/[0.12] bg-[#151713] p-8 text-center shadow-2xl shadow-black/35">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                        Admin Login
                    </p>
                    <p className="mt-3 text-stone-300">Loading secure login...</p>
                </div>
            </div>
        </div>
    );
}
