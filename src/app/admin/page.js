"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    getPendingRecipes,
    getApprovedRecipes,
    approveRecipe,
    rejectRecipe,
    removeApprovedRecipe,
} from "@/lib/recipeStorage";

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

    const recipes = tab === "pending" ? pending : approved;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🍴</span>
                            <span className="text-xl font-extrabold text-white tracking-tight">
                                Recipe<span className="text-orange-400">Book</span>
                            </span>
                        </Link>
                        <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold">
                            🛡️ Admin Panel
                        </span>
                    </div>
                    <Link
                        href="/recipes"
                        className="text-sm text-gray-400 hover:text-orange-400 transition-colors font-medium"
                    >
                        ← Back to Recipes
                    </Link>
                </div>
            </header>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
                {/* Page Title */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                        Recipe{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                            Approval Dashboard
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        Review community-submitted recipes. Approve them to make them live or reject to remove.
                    </p>
                </div>

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
                    <StatCard label="Pending Review" value={pending.length} color="orange" icon="⏳" />
                    <StatCard label="Approved Live" value={approved.length} color="green" icon="✅" />
                    <StatCard label="Total Received" value={pending.length + approved.length} color="blue" icon="📨" />
                    <StatCard label="Approval Rate" value={pending.length + approved.length > 0 ? `${Math.round((approved.length / (pending.length + approved.length)) * 100)}%` : "—"} color="purple" icon="📊" />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 p-1 bg-white/[0.03] border border-white/[0.07] rounded-xl w-fit">
                    {[
                        { key: "pending", label: "⏳ Pending", count: pending.length },
                        { key: "approved", label: "✅ Approved", count: approved.length },
                    ].map(({ key, label, count }) => (
                        <button
                            key={key}
                            onClick={() => { setTab(key); setPreview(null); }}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                tab === key
                                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {label}
                            {count > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${tab === key ? "bg-white/20" : "bg-orange-500/20 text-orange-400"}`}>
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
function StatCard({ label, value, color, icon }) {
    const colors = {
        orange: "from-orange-500/15 border-orange-500/20 text-orange-400",
        green: "from-green-500/15 border-green-500/20 text-green-400",
        blue: "from-blue-500/15 border-blue-500/20 text-blue-400",
        purple: "from-purple-500/15 border-purple-500/20 text-purple-400",
    };
    return (
        <div className={`p-5 rounded-2xl bg-gradient-to-br ${colors[color]} to-transparent border`}>
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-3xl font-extrabold text-white">{value}</div>
            <div className="text-xs text-gray-400 mt-1 font-medium">{label}</div>
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
            className={`group rounded-2xl bg-white/[0.03] border transition-all duration-300 overflow-hidden ${
                isSelected
                    ? "border-orange-500/50 shadow-xl shadow-orange-500/10"
                    : "border-white/[0.07] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden cursor-pointer" onClick={onPreview}>
                <img
                    src={recipe.image || "/placeholder.jpg"}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Status badge */}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                    tab === "pending"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                }`}>
                    {tab === "pending" ? "⏳ Pending" : "✅ Live"}
                </span>
                {/* Community badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    👥 Community
                </span>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3
                    className="text-base font-bold text-white mb-1 line-clamp-1 cursor-pointer hover:text-orange-400 transition-colors"
                    onClick={onPreview}
                >
                    {recipe.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                    <Badge>{recipe.cuisine}</Badge>
                    <Badge>{recipe.difficulty}</Badge>
                    <Badge>{recipe.caloriesPerServing} kcal</Badge>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                    By <span className="text-gray-300 font-medium">{recipe.submittedBy}</span> · {date}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={onPreview}
                        className="flex-1 py-2 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-200"
                    >
                        👁 Preview
                    </button>
                    {tab === "pending" ? (
                        <>
                            <button
                                onClick={onApprove}
                                className="flex-1 py-2 rounded-xl text-sm font-bold bg-green-500/15 hover:bg-green-500/25 text-green-400 border border-green-500/20 hover:border-green-500/40 transition-all duration-200"
                            >
                                ✅ Approve
                            </button>
                            <button
                                onClick={onReject}
                                className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
                            >
                                ❌ Reject
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onRemove}
                            className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all duration-200"
                        >
                            🗑 Remove
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
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] overflow-hidden">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600"; }}
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

            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
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
                                <span className="text-orange-400 mt-0.5">•</span>
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
                                <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">
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
                                className="flex-1 py-2.5 rounded-xl font-bold bg-green-500/15 hover:bg-green-500/25 text-green-400 border border-green-500/25 hover:border-green-500/50 transition-all duration-200"
                            >
                                ✅ Approve Recipe
                            </button>
                            <button
                                onClick={onReject}
                                className="flex-1 py-2.5 rounded-xl font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/25 hover:border-red-500/50 transition-all duration-200"
                            >
                                ❌ Reject
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onRemove}
                            className="w-full py-2.5 rounded-xl font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/25 hover:border-red-500/50 transition-all duration-200"
                        >
                            🗑 Remove from Live
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
        <div className="text-center py-24 px-6">
            <div className="text-6xl mb-4">{tab === "pending" ? "🎉" : "📭"}</div>
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
                    className="text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors"
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
        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
            {children}
        </span>
    );
}

function MetaStat({ icon, label, value }) {
    return (
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <div className="text-lg">{icon}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            <div className="text-sm font-semibold text-white mt-0.5 line-clamp-1">{value}</div>
        </div>
    );
}
