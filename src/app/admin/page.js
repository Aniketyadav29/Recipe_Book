"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import {
    getPendingRecipes,
    getApprovedRecipes,
    approveRecipe,
    rejectRecipe,
    removeApprovedRecipe,
} from "@/lib/recipeStorage";
import { GENERIC_FOOD_IMAGE, getRecipeDisplayImage } from "@/lib/recipeImages";

export default function AdminPage() {
    const [tab, setTab] = useState("pending");
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [actionMsg, setActionMsg] = useState(null);
    const [preview, setPreview] = useState(null);

    const refresh = useCallback(() => {
        setPending(getPendingRecipes());
        setApproved(getApprovedRecipes());
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const showMsg = (msg, type = "success") => {
        setActionMsg({ msg, type });
        setTimeout(() => setActionMsg(null), 3000);
    };

    const handleApprove = (id, name) => {
        approveRecipe(id);
        refresh();
        if (preview?.id === id) setPreview(null);
        showMsg(`✅ "${name}" approved and is now live!`, "success");
    };

    const handleReject = (id, name) => {
        rejectRecipe(id);
        refresh();
        if (preview?.id === id) setPreview(null);
        showMsg(`🗑️ "${name}" has been rejected.`, "error");
    };

    const handleRemoveApproved = (id, name) => {
        removeApprovedRecipe(id);
        refresh();
        if (preview?.id === id) setPreview(null);
        showMsg(`🗑️ "${name}" removed from approved list.`, "error");
    };

    const handleLogout = async () => {
        await fetch("/api/admin-logout", { method: "POST" });
        window.location.href = "/admin-login";
    };

    const recipes = tab === "pending" ? pending : approved;

    return (
        <div className="min-h-screen bg-[#0f1110] text-white">
            <Navbar />

            <section className="relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1900&q=85"
                    alt="Professional kitchen workspace"
                    className="absolute inset-0 h-full w-full object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,10,0.96)_0%,rgba(11,12,10,0.78)_52%,rgba(11,12,10,0.55)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0f1110] to-transparent" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-32">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-stone-100 backdrop-blur-md">
                        Admin workspace
                    </span>
                    <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
                        Recipe approval dashboard
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
                        Review community submissions, approve polished recipes, and keep the public recipe book consistent with the rest of the site.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/recipes"
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f6c86a] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#17120d] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                        >
                            Back to Recipes
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </section>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">

                {/* Toast Notification */}
                {actionMsg && (
                    <div
                        className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl border font-semibold text-sm shadow-2xl transition-all duration-300 ${
                            actionMsg.type === "success"
                                ? "bg-green-500/15 border-green-500/30 text-green-400"
                                : "bg-red-500/15 border-red-500/30 text-red-400"
                        }`}
                    >
                        {actionMsg.msg}
                    </div>
                )}

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Pending Review" value={pending.length} />
                    <StatCard label="Approved Live" value={approved.length} />
                    <StatCard label="Total Received" value={pending.length + approved.length} />
                    <StatCard label="Approval Rate" value={pending.length + approved.length > 0 ? `${Math.round((approved.length / (pending.length + approved.length)) * 100)}%` : "—"} />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 p-1 bg-white/[0.04] border border-white/[0.09] rounded-2xl w-fit shadow-xl shadow-black/20">
                    {[
                        { key: "pending", label: "Pending", count: pending.length },
                        { key: "approved", label: "Approved", count: approved.length },
                    ].map(({ key, label, count }) => (
                        <button
                            key={key}
                            onClick={() => { setTab(key); setPreview(null); }}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                tab === key
                                    ? "bg-[#f6c86a] text-[#17120d] shadow-lg"
                                    : "text-stone-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {label}
                            {count > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${tab === key ? "bg-black/10" : "bg-white/10 text-amber-200"}`}>
                                    {count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {recipes.length === 0 ? (
                    <EmptyState tab={tab} />
                ) : (
                    <div className={`grid gap-6 ${preview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"}`}>
                        {/* Recipe Cards */}
                        <div className={`space-y-4 ${preview ? "" : "col-span-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"}`}>
                            {recipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    tab={tab}
                                    isSelected={preview?.id === recipe.id}
                                    onPreview={() => setPreview(preview?.id === recipe.id ? null : recipe)}
                                    onApprove={() => handleApprove(recipe.id, recipe.name)}
                                    onReject={() => handleReject(recipe.id, recipe.name)}
                                    onRemove={() => handleRemoveApproved(recipe.id, recipe.name)}
                                />
                            ))}
                        </div>

                        {/* Preview Panel */}
                        {preview && (
                            <div className="sticky top-24 h-fit">
                                <PreviewPanel
                                    recipe={preview}
                                    tab={tab}
                                    onClose={() => setPreview(null)}
                                    onApprove={() => handleApprove(preview.id, preview.name)}
                                    onReject={() => handleReject(preview.id, preview.name)}
                                    onRemove={() => handleRemoveApproved(preview.id, preview.name)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value }) {
    return (
        <div className="p-5 rounded-[1.5rem] bg-white/[0.045] border border-white/[0.09] shadow-2xl shadow-black/20">
            <div className="text-3xl font-extrabold text-white">{value}</div>
            <div className="text-xs text-stone-400 mt-2 font-black uppercase tracking-widest">{label}</div>
        </div>
    );
}

// ── Recipe Card ───────────────────────────────────────────────────────────────
function RecipeCard({ recipe, tab, isSelected, onPreview, onApprove, onReject, onRemove }) {
    const date = new Date(recipe.submittedAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });

    return (
        <div
            className={`group rounded-[1.5rem] bg-[#151713] border transition-all duration-300 overflow-hidden shadow-2xl shadow-black/20 ${
                isSelected
                    ? "border-amber-300/50 shadow-xl shadow-amber-900/10"
                    : "border-white/[0.09] hover:border-amber-300/30 hover:bg-white/[0.05]"
            }`}
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden cursor-pointer" onClick={onPreview}>
                <img
                    src={getRecipeDisplayImage(recipe)}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = GENERIC_FOOD_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Status badge */}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                    tab === "pending"
                        ? "bg-amber-300/20 text-amber-200 border border-amber-300/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                }`}>
                    {tab === "pending" ? "Pending" : "Live"}
                </span>
                {/* Community badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
                    Community
                </span>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3
                    className="text-base font-black text-white mb-1 line-clamp-1 cursor-pointer hover:text-amber-200 transition-colors"
                    onClick={onPreview}
                >
                    {recipe.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                    <Badge>{recipe.cuisine}</Badge>
                    <Badge>{recipe.difficulty}</Badge>
                    <Badge>{recipe.caloriesPerServing} kcal</Badge>
                </div>
                <p className="text-xs text-stone-500 mb-4">
                    By <span className="text-stone-300 font-medium">{recipe.submittedBy}</span> · {date}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={onPreview}
                        className="flex-1 py-2 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-all duration-200"
                    >
                        Preview
                    </button>
                    {tab === "pending" ? (
                        <>
                            <button
                                onClick={onApprove}
                                className="flex-1 py-2 rounded-xl text-sm font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200"
                            >
                                Approve
                            </button>
                            <button
                                onClick={onReject}
                                className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
                            >
                                Reject
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onRemove}
                            className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Preview Panel ─────────────────────────────────────────────────────────────
function PreviewPanel({ recipe, tab, onClose, onApprove, onReject, onRemove }) {
    return (
        <div className="rounded-[1.75rem] bg-[#151713] border border-white/[0.09] overflow-hidden shadow-2xl shadow-black/25">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={getRecipeDisplayImage(recipe)}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = GENERIC_FOOD_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-lg"
                >
                    ×
                </button>
                <div className="absolute bottom-4 left-4">
                    <h2 className="text-xl font-extrabold text-white">{recipe.name}</h2>
                    <p className="text-gray-300 text-sm">By {recipe.submittedBy}</p>
                </div>
            </div>

            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Meta */}
                <div className="grid grid-cols-3 gap-3">
                    <MetaStat icon="🍽️" label="Cuisine" value={recipe.cuisine} />
                    <MetaStat icon="⚡" label="Difficulty" value={recipe.difficulty} />
                    <MetaStat icon="🔥" label="Calories" value={`${recipe.caloriesPerServing} kcal`} />
                    <MetaStat icon="⏱️" label="Prep" value={`${recipe.prepTimeMinutes}m`} />
                    <MetaStat icon="🍳" label="Cook" value={`${recipe.cookTimeMinutes}m`} />
                    <MetaStat icon="👥" label="Servings" value={recipe.servings} />
                </div>

                {/* Tags */}
                {recipe.tags?.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                            {recipe.tags.map((t) => (
                                <span key={t} className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs border border-orange-500/20">
                                    #{t}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ingredients */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ingredients ({recipe.ingredients?.length})</p>
                    <ul className="space-y-1">
                        {recipe.ingredients?.map((ing, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="text-amber-300 mt-0.5">•</span>
                                {ing}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Instructions ({recipe.instructions?.length} steps)</p>
                    <ol className="space-y-2">
                        {recipe.instructions?.map((step, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                <span className="shrink-0 w-6 h-6 rounded-full bg-amber-300/15 text-amber-200 flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </span>
                                <span className="leading-relaxed">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Submitted info */}
                <div className="pt-2 border-t border-white/[0.06] text-xs text-gray-500">
                    Submitted {new Date(recipe.submittedAt).toLocaleString()} · ID: {recipe.id}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                    {tab === "pending" ? (
                        <>
                            <button
                                onClick={onApprove}
                                className="flex-1 py-2.5 rounded-xl font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/25 hover:border-emerald-500/50 transition-all duration-200"
                            >
                                Approve Recipe
                            </button>
                            <button
                                onClick={onReject}
                                className="flex-1 py-2.5 rounded-xl font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/25 hover:border-red-500/50 transition-all duration-200"
                            >
                                Reject
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onRemove}
                            className="w-full py-2.5 rounded-xl font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/25 hover:border-red-500/50 transition-all duration-200"
                        >
                            Remove from Live
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Empty State ────────────────────────────────────────────────────────────────
function EmptyState({ tab }) {
    return (
        <div className="text-center py-24 px-6 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.035]">
            <h3 className="text-xl font-bold text-white mb-2">
                {tab === "pending" ? "All caught up!" : "No approved recipes yet"}
            </h3>
            <p className="text-gray-500 mb-6">
                {tab === "pending"
                    ? "There are no recipes waiting for review right now."
                    : "Approve some pending recipes and they'll appear here."}
            </p>
            {tab === "approved" && (
                <button
                    onClick={() => {}}
                    className="text-amber-300 hover:text-white font-medium text-sm transition-colors"
                >
                    Check Pending tab →
                </button>
            )}
        </div>
    );
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function Badge({ children }) {
    return (
        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-stone-400 text-xs">
            {children}
        </span>
    );
}

function MetaStat({ icon, label, value }) {
    return (
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] text-center">
            <div className="text-lg">{icon}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            <div className="text-sm font-semibold text-white mt-0.5 line-clamp-1">{value}</div>
        </div>
    );
}
