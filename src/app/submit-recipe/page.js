"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { submitRecipe } from "@/lib/recipeStorage";

export default function SubmitRecipePage() {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        cuisine: "",
        difficulty: "Easy",
        prepTimeMinutes: "",
        cookTimeMinutes: "",
        caloriesPerServing: "",
        servings: "",
        image: "",
        submittedBy: "",
        ingredients: [""],
        instructions: [""],
        tags: "",
        mealType: "",
    });

    const [errors, setErrors] = useState({});

    // ── Field Helpers ──────────────────────────────────────────────────────────
    const set = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const setListItem = (field, index, value) => {
        setForm((prev) => {
            const arr = [...prev[field]];
            arr[index] = value;
            return { ...prev, [field]: arr };
        });
    };

    const addListItem = (field) =>
        setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));

    const removeListItem = (field, index) =>
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));

    // ── Validation ─────────────────────────────────────────────────────────────
    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Recipe name is required";
        if (!form.cuisine.trim()) errs.cuisine = "Cuisine is required";
        if (!form.submittedBy.trim()) errs.submittedBy = "Your name is required";
        if (!form.image.trim()) errs.image = "Image URL is required";
        if (!form.caloriesPerServing) errs.caloriesPerServing = "Calories required";
        if (!form.servings) errs.servings = "Servings required";
        if (form.ingredients.every((i) => !i.trim()))
            errs.ingredients = "Add at least one ingredient";
        if (form.instructions.every((i) => !i.trim()))
            errs.instructions = "Add at least one instruction";
        return errs;
    };

    // ── Submit ─────────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 800)); // brief loading feel

        submitRecipe({
            ...form,
            prepTimeMinutes: Number(form.prepTimeMinutes) || 0,
            cookTimeMinutes: Number(form.cookTimeMinutes) || 0,
            caloriesPerServing: Number(form.caloriesPerServing) || 0,
            servings: Number(form.servings) || 1,
            ingredients: form.ingredients.filter((i) => i.trim()),
            instructions: form.instructions.filter((i) => i.trim()),
            tags: form.tags
                ? form.tags.split(",").map((t) => t.trim())
                : [],
            mealType: form.mealType
                ? form.mealType.split(",").map((m) => m.trim())
                : [],
        });

        setLoading(false);
        setSubmitted(true);
    };

    // ── Success Screen ─────────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="min-h-screen bg-[#0f1110] text-white flex flex-col items-center justify-center px-6">
                <Navbar />
                <div className="text-center max-w-2xl w-full rounded-[2rem] border border-white/[0.10] bg-white/[0.045] p-8 shadow-2xl shadow-black/30">
                    <h1 className="text-4xl font-black mb-3 text-white">
                        Recipe Submitted!
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Your recipe is now <span className="text-amber-300 font-semibold">waiting for admin approval</span>. Once approved, it will appear in the Recipe Book for everyone to enjoy.
                    </p>

                    {/* Step tracker */}
                    <div className="flex items-center justify-center gap-0 mb-10">
                        {/* Step 1 — done */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-300 font-bold text-lg">✓</div>
                            <span className="text-xs text-emerald-300 font-semibold">Submitted</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-amber-500/50 mx-2 mb-5" style={{minWidth:"40px"}} />
                        {/* Step 2 — current */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-amber-300/20 border-2 border-amber-300 flex items-center justify-center text-amber-200 font-bold animate-pulse">2</div>
                            <span className="text-xs text-amber-200 font-semibold">Admin Review</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-white/10 mx-2 mb-5" style={{minWidth:"40px"}} />
                        {/* Step 3 — pending */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center text-gray-500 font-bold">3</div>
                            <span className="text-xs text-gray-500 font-semibold">Goes Live!</span>
                        </div>
                    </div>

                    {/* Info box */}
                    <div className="mb-8 p-4 rounded-2xl bg-amber-300/10 border border-amber-300/20 text-left">
                        <p className="text-amber-200 text-sm font-semibold mb-1">What happens next?</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The admin will review your recipe at <a href="/admin" className="text-amber-200 hover:underline font-semibold">/admin</a>. After approval, it will automatically appear in the{" "}
                            <a href="/recipes" className="text-amber-200 hover:underline font-semibold">Recipes</a> section with a community badge.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => { setSubmitted(false); setForm({ name: "", cuisine: "", difficulty: "Easy", prepTimeMinutes: "", cookTimeMinutes: "", caloriesPerServing: "", servings: "", image: "", submittedBy: "", ingredients: [""], instructions: [""], tags: "", mealType: "" }); }}
                            className="px-7 py-3 bg-[#f6c86a] text-[#17120d] font-black rounded-xl hover:bg-white transition-all duration-300"
                        >
                            Submit Another Recipe
                        </button>
                        <a
                            href="/admin"
                            className="px-7 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Go to Admin Panel
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // ── Form ──────────────────────────────────────────────────────────────────
    const inputClass = (field) =>
        `w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
            errors[field]
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-amber-300/60"
        } text-white placeholder-gray-500 outline-none transition-all duration-200 focus:bg-white/[0.06] focus:ring-4 focus:ring-amber-300/10`;

    return (
        <div className="min-h-screen bg-[#0f1110] text-white overflow-x-hidden">
            <Navbar />

            <section className="relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1900&q=85"
                    alt="Kitchen prep table"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,10,0.96)_0%,rgba(11,12,10,0.78)_52%,rgba(11,12,10,0.55)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0f1110] to-transparent" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-16">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-stone-100 backdrop-blur-md">
                        Community kitchen
                    </span>
                    <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight text-white">
                        Submit your recipe
                    </h1>
                    <p className="mt-5 text-stone-300 text-lg max-w-2xl leading-8">
                        Add a polished community recipe with ingredients, timing, instructions, and a photo. Once reviewed, it joins the public Recipe Book.
                    </p>
                </div>
            </section>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">

                {/* Error summary */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        ⚠️ Please fix the highlighted fields before submitting.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 rounded-[2rem] border border-white/[0.09] bg-white/[0.04] p-5 shadow-2xl shadow-black/25 md:p-8">
                    {/* ── Personal Info ── */}
                    <FormSection title="👤 About You" icon="👤">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                            <input
                                type="text"
                                placeholder="e.g. Maria Garcia"
                                value={form.submittedBy}
                                onChange={(e) => set("submittedBy", e.target.value)}
                                className={inputClass("submittedBy")}
                            />
                            {errors.submittedBy && <p className="text-red-400 text-xs mt-1">{errors.submittedBy}</p>}
                        </div>
                    </FormSection>

                    {/* ── Basic Info ── */}
                    <FormSection title="📋 Recipe Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Recipe Name *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Grandma's Biryani"
                                    value={form.name}
                                    onChange={(e) => set("name", e.target.value)}
                                    className={inputClass("name")}
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Cuisine *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Indian, Italian, Mexican"
                                    value={form.cuisine}
                                    onChange={(e) => set("cuisine", e.target.value)}
                                    className={inputClass("cuisine")}
                                />
                                {errors.cuisine && <p className="text-red-400 text-xs mt-1">{errors.cuisine}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                                <select
                                    value={form.difficulty}
                                    onChange={(e) => set("difficulty", e.target.value)}
                                    className={inputClass("difficulty") + " cursor-pointer"}
                                >
                                    <option value="Easy" className="bg-[#1a1a1a]">Easy</option>
                                    <option value="Medium" className="bg-[#1a1a1a]">Medium</option>
                                    <option value="Hard" className="bg-[#1a1a1a]">Hard</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Prep Time (mins)</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="15"
                                    value={form.prepTimeMinutes}
                                    onChange={(e) => set("prepTimeMinutes", e.target.value)}
                                    className={inputClass("prepTimeMinutes")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Cook Time (mins)</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="30"
                                    value={form.cookTimeMinutes}
                                    onChange={(e) => set("cookTimeMinutes", e.target.value)}
                                    className={inputClass("cookTimeMinutes")}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Calories per Serving *</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="350"
                                    value={form.caloriesPerServing}
                                    onChange={(e) => set("caloriesPerServing", e.target.value)}
                                    className={inputClass("caloriesPerServing")}
                                />
                                {errors.caloriesPerServing && <p className="text-red-400 text-xs mt-1">{errors.caloriesPerServing}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Servings *</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="4"
                                    value={form.servings}
                                    onChange={(e) => set("servings", e.target.value)}
                                    className={inputClass("servings")}
                                />
                                {errors.servings && <p className="text-red-400 text-xs mt-1">{errors.servings}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Meal Type <span className="text-gray-500">(comma-separated)</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. Lunch, Dinner"
                                    value={form.mealType}
                                    onChange={(e) => set("mealType", e.target.value)}
                                    className={inputClass("mealType")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Tags <span className="text-gray-500">(comma-separated)</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. spicy, vegan, quick"
                                    value={form.tags}
                                    onChange={(e) => set("tags", e.target.value)}
                                    className={inputClass("tags")}
                                />
                            </div>
                        </div>
                    </FormSection>

                    {/* ── Image ── */}
                    <FormSection title="🖼️ Recipe Image">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL *</label>
                            <input
                                type="url"
                                placeholder="https://example.com/my-recipe-photo.jpg"
                                value={form.image}
                                onChange={(e) => set("image", e.target.value)}
                                className={inputClass("image")}
                            />
                            {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
                            <p className="text-gray-600 text-xs mt-2">Tip: Upload your photo to <a href="https://imgbb.com" target="_blank" rel="noopener" className="text-orange-400 hover:underline">imgbb.com</a> and paste the direct link here.</p>
                        </div>
                        {form.image && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
                                <img
                                    src={form.image}
                                    alt="Preview"
                                    className="w-full h-48 object-cover"
                                    onError={(e) => { e.target.style.display = "none"; }}
                                />
                            </div>
                        )}
                    </FormSection>

                    {/* ── Ingredients ── */}
                    <FormSection title="🥕 Ingredients">
                        {errors.ingredients && <p className="text-red-400 text-xs mb-2">{errors.ingredients}</p>}
                        <div className="space-y-3">
                            {form.ingredients.map((ing, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <span className="text-gray-500 text-sm w-6 text-right shrink-0">{i + 1}.</span>
                                    <input
                                        type="text"
                                        placeholder={`e.g. 2 cups basmati rice`}
                                        value={ing}
                                        onChange={(e) => setListItem("ingredients", i, e.target.value)}
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-300/60 focus:ring-4 focus:ring-amber-300/10 text-white placeholder-gray-500 outline-none transition-all duration-200"
                                    />
                                    {form.ingredients.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeListItem("ingredients", i)}
                                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-lg"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => addListItem("ingredients")}
                            className="mt-3 flex items-center gap-2 text-sm text-amber-200 hover:text-white font-medium transition-colors"
                        >
                            <span className="w-6 h-6 rounded-full bg-amber-300/20 flex items-center justify-center text-lg leading-none">+</span>
                            Add Ingredient
                        </button>
                    </FormSection>

                    {/* ── Instructions ── */}
                    <FormSection title="📝 Instructions">
                        {errors.instructions && <p className="text-red-400 text-xs mb-2">{errors.instructions}</p>}
                        <div className="space-y-3">
                            {form.instructions.map((step, i) => (
                                <div key={i} className="flex gap-2 items-start">
                                    <span className="shrink-0 w-7 h-7 rounded-full bg-amber-300/20 text-amber-200 flex items-center justify-center text-xs font-bold mt-2.5">
                                        {i + 1}
                                    </span>
                                    <textarea
                                        rows={2}
                                        placeholder={`Step ${i + 1}: Describe what to do...`}
                                        value={step}
                                        onChange={(e) => setListItem("instructions", i, e.target.value)}
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-300/60 focus:ring-4 focus:ring-amber-300/10 text-white placeholder-gray-500 outline-none resize-none transition-all duration-200"
                                    />
                                    {form.instructions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeListItem("instructions", i)}
                                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-lg mt-2"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => addListItem("instructions")}
                            className="mt-3 flex items-center gap-2 text-sm text-amber-200 hover:text-white font-medium transition-colors"
                        >
                            <span className="w-6 h-6 rounded-full bg-amber-300/20 flex items-center justify-center text-lg leading-none">+</span>
                            Add Step
                        </button>
                    </FormSection>

                    {/* ── Submit Button ── */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#f6c86a] text-[#17120d] text-lg font-black rounded-2xl hover:scale-[1.02] hover:bg-white transition-all duration-300 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Submitting Recipe…
                                </>
                            ) : (
                                "Submit Recipe for Review"
                            )}
                        </button>
                        <p className="text-center text-gray-600 text-sm mt-3">
                            Your recipe will be reviewed by our admin before going live.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── Section wrapper component ──────────────────────────────────────────────────
function FormSection({ title, children }) {
    return (
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-4">
            <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
            {children}
        </div>
    );
}
