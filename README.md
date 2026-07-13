# RecipeBook - Next.js Recipe App

[![Live Demo](https://img.shields.io/badge/Live_Demo-Recipe_Book-success?style=for-the-badge&logo=vercel)](https://recipe-book-psi-sage.vercel.app/)

RecipeBook is a modern recipe discovery and submission web app built with Next.js. It includes a polished public recipe book, AI Chef recipe generation, community recipe submission, admin approval, dish-specific recipe images, and a secure admin login system.

The project is designed as a realistic food website with a professional dark kitchen theme, responsive layouts, 3D-style recipe cards, and a structured admin workflow for approving recipes before they appear publicly.

## Table of Contents

- [Project Overview](#project-overview)
- [Main Features](#main-features)
- [Technology Stack](#technology-stack)
- [Pages and Routes](#pages-and-routes)
- [Admin Login System](#admin-login-system)
- [Recipe Approval Workflow](#recipe-approval-workflow)
- [AI Chef System](#ai-chef-system)
- [Recipe Image System](#recipe-image-system)
- [Local Storage Data](#local-storage-data)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Run Locally](#run-locally)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Important Files](#important-files)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## Project Overview

RecipeBook allows users to browse recipes, generate new recipes with AI Chef, submit their own recipes, and view detailed cooking instructions. Admin users can securely log in to review pending recipes and approve or reject them.

The app has two main user roles:

- Public user: Can browse recipes, open recipe details, use AI Chef, and submit recipes for review.
- Admin user: Can log in to the admin dashboard and approve, reject, or remove recipes.

## Main Features

- Modern home page with realistic food website styling.
- Explore Recipes page with recipe cards and 3D card effects.
- AI Chef recipe search and generation.
- Inline AI recipe preview on the Explore Recipes page.
- Recipe-specific image selection instead of one repeated image.
- Community recipe submission form.
- Admin approval dashboard.
- Secure admin login with username and password.
- HTTP-only admin session cookie.
- Admin logout button.
- Pending and approved recipe queues.
- Recipe detail page with ingredients, steps, timing, cuisine, tags, and servings.
- Responsive layout for desktop and mobile.
- Dark professional visual theme.
- Local fallback recipe generator when Gemini API is not configured.

## Technology Stack

- Next.js 14.2.7
- React 18
- Tailwind CSS
- JavaScript
- Next.js App Router
- Next.js Middleware
- Browser localStorage
- DummyJSON Recipes API
- Optional Gemini API integration
- React Icons
- Lucide React

## Pages and Routes

| Route | Type | Purpose |
| --- | --- | --- |
| `/` | Page | Home page of the website |
| `/recipes` | Page | Explore recipe book and use AI Chef |
| `/recipes/[recipe]` | Dynamic page | View full recipe details |
| `/submit-recipe` | Page | Submit a community recipe for admin review |
| `/admin-login` | Page | Secure admin login page |
| `/admin` | Protected page | Admin recipe approval dashboard |
| `/api/ai-recipe` | API route | Generates recipes from AI Chef |
| `/api/admin-login` | API route | Verifies admin credentials and creates a session |
| `/api/admin-logout` | API route | Clears the admin session |

## Admin Login System

The admin panel is protected by a username and password login system.

When a user opens `/admin`, middleware checks for a valid admin session cookie. If the user is not logged in, they are redirected to `/admin-login`.

Default local login:

```txt
Username: admin
Password: recipebook123
```

For real deployment, change these values using environment variables. Do not use the default password on a public website.

### How Admin Authentication Works

1. Admin enters username and password on `/admin-login`.
2. The login form sends credentials to `/api/admin-login`.
3. The server checks the credentials.
4. If valid, the server creates a signed session token.
5. The token is stored in an HTTP-only cookie.
6. Middleware checks this cookie before allowing access to `/admin`.
7. Clicking Logout calls `/api/admin-logout` and clears the cookie.

### Security Terms

- Username: The admin account name.
- Password: Secret text required to log in.
- Session cookie: A browser cookie used to remember admin login.
- HTTP-only cookie: A cookie that JavaScript cannot read directly, which improves security.
- Middleware: Code that runs before protected pages load.
- Session secret: A private string used to sign and verify the admin session.

## Recipe Approval Workflow

The project includes a review system so recipes do not go live immediately.

### AI Chef Recipe Flow

1. User searches a recipe name in AI Chef.
2. AI Chef generates recipe details.
3. The result opens inline on the Explore Recipes page.
4. User clicks `Submit for Admin Approval`.
5. The recipe is stored in the pending queue.
6. Admin opens `/admin`.
7. Admin previews the recipe.
8. Admin approves or rejects it.
9. Approved recipes appear in the public Recipe Book.

### Community Recipe Flow

1. User opens `/submit-recipe`.
2. User fills in recipe details.
3. User submits the form.
4. Recipe is stored in the pending queue.
5. Admin reviews it in `/admin`.
6. Approved recipes appear in `/recipes`.

## AI Chef System

AI Chef allows users to type a recipe name and get a generated recipe with:

- Recipe name
- Ingredients
- Step-by-step instructions
- Difficulty
- Calories per serving
- Prep time
- Cook time
- Servings
- Cuisine
- Tags
- Recipe image

The app supports two AI modes:

- Gemini API mode: If `GEMINI_API_KEY` is configured, the app asks Gemini to generate the recipe.
- Offline fallback mode: If no Gemini key exists, the app uses a built-in smart recipe generator.

The fallback generator includes presets for common recipes like Gulab Jamun, Carbonara, Pizza, Biryani, Burger, Fried Rice, Noodles, Pasta, Curry, Cakes, Pancakes, Smoothies, and more.

## Recipe Image System

The app avoids showing the same repeated photo for all recipes.

The image helper checks:

- Whether a recipe already has a real image URL.
- Whether the image is a generic placeholder.
- The recipe name and cuisine.
- Matching keywords like `gulab jamun`, `fried rice`, `biryani`, `pizza`, `pasta`, `burger`, `curry`, and more.

If needed, it creates a dish-specific image URL using food search keywords. This makes recipe cards look more realistic and better matched to the recipe name.

## Local Storage Data

This project currently stores community and AI-submitted recipes in browser localStorage.

Local storage keys:

| Key | Purpose |
| --- | --- |
| `recipebook_pending` | Stores recipes waiting for admin approval |
| `recipebook_approved` | Stores recipes approved by admin |

Important note: localStorage is browser-specific. Recipes saved in one browser may not appear in another browser or device. For production, a database should be added.

## Environment Variables

Create a `.env.local` file in the project root for local development.

Example:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_strong_password
ADMIN_SESSION_SECRET=your_long_random_session_secret
GEMINI_API_KEY=your_gemini_api_key_optional
```

Variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_USERNAME` | Recommended | Admin login username |
| `ADMIN_PASSWORD` | Recommended | Admin login password |
| `ADMIN_SESSION_SECRET` | Recommended | Secret used to sign admin sessions |
| `GEMINI_API_KEY` | Optional | Enables Gemini-powered AI recipe generation |

If admin variables are missing, the app uses local defaults:

```txt
ADMIN_USERNAME=admin
ADMIN_PASSWORD=recipebook123
```

Change the defaults before deploying.

## Installation

Make sure Node.js is installed.

Recommended:

- Node.js 18 or newer
- npm 9 or newer

Install dependencies:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

If port `3000` is busy, run:

```bash
npm run dev -- -p 3001
```

Then open:

```txt
http://localhost:3001
```

## Available Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| Development | `npm run dev` | Starts Next.js development server |
| Build | `npm run build` | Creates production build |
| Start | `npm run start` | Starts production server after build |
| Lint | `npm run lint` | Runs linting command |

## Folder Structure

```txt
Recipes-App-Using-NextJs-master/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── admin-login/
│   │   ├── api/
│   │   │   ├── admin-login/
│   │   │   ├── admin-logout/
│   │   │   └── ai-recipe/
│   │   ├── recipes/
│   │   │   └── [recipe]/
│   │   ├── submit-recipe/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.js
│   │   ├── not-found.js
│   │   └── page.js
│   ├── components/
│   │   ├── recipes/
│   │   └── ui/
│   ├── lib/
│   │   ├── adminAuth.js
│   │   ├── recipeImages.js
│   │   ├── recipeStorage.js
│   │   └── utils.js
│   └── middleware.js
├── .env.example
├── package.json
├── next.config.mjs
├── tailwind.config.js
└── README.md
```

## Important Files

| File | Purpose |
| --- | --- |
| `src/app/page.js` | Home page |
| `src/components/recipes/index.js` | Main Explore Recipes list |
| `src/components/recipes/AISearchBox.jsx` | AI Chef search and inline recipe preview |
| `src/app/api/ai-recipe/route.js` | AI recipe API and fallback generator |
| `src/app/submit-recipe/page.js` | Community recipe submission page |
| `src/app/admin/page.js` | Admin dashboard |
| `src/app/admin-login/page.js` | Admin login page |
| `src/app/api/admin-login/route.js` | Admin login API |
| `src/app/api/admin-logout/route.js` | Admin logout API |
| `src/middleware.js` | Protects `/admin` route |
| `src/lib/adminAuth.js` | Session signing and credential validation |
| `src/lib/recipeStorage.js` | Pending and approved recipe storage |
| `src/lib/recipeImages.js` | Recipe-specific image selection |
| `src/app/globals.css` | Global styles, 3D effects, animations |

## UI and Design Terms

- Home page: Main landing page of the website.
- Explore Recipes: Recipe book page where recipes are displayed.
- Recipe card: A visual card showing recipe image, name, cuisine, difficulty, calories, and servings.
- 3D effect: CSS transform, shadow, perspective, and depth styling used to make cards feel more realistic.
- AI Chef: The recipe generator section.
- Inline preview: The generated AI recipe opens inside the Explore page instead of a separate full-screen page.
- Admin dashboard: Private page where recipe submissions are reviewed.
- Pending recipes: Recipes waiting for approval.
- Approved recipes: Recipes visible in the public Recipe Book.
- Rejected recipes: Recipes removed from the pending queue.

## Deployment

The app can be deployed to Vercel or any platform that supports Next.js.

Before deployment:

1. Set `ADMIN_USERNAME`.
2. Set a strong `ADMIN_PASSWORD`.
3. Set a long random `ADMIN_SESSION_SECRET`.
4. Optionally set `GEMINI_API_KEY`.
5. Run `npm run build` locally to verify the project.

Vercel build command:

```bash
npm run build
```

Vercel output:

Next.js handles the build output automatically.

## Troubleshooting

### Port already in use

If `localhost:3000` is busy:

```bash
npm run dev -- -p 3001
```

### Admin login does not work

Check:

- `.env.local` has the correct username and password.
- The dev server was restarted after changing `.env.local`.
- Cookies are enabled in the browser.
- You are visiting the correct local port.

### Recipes do not appear after approval

Because the project uses localStorage, approved recipes appear in the same browser where they were approved.

### AI does not call Gemini

Check:

- `GEMINI_API_KEY` exists in `.env.local`.
- The dev server was restarted after adding the key.
- If Gemini fails, the app will use the local fallback generator.

### Same image appears for old recipes

The app now replaces known generic placeholders with recipe-specific images. If an old recipe has a custom generic image URL, edit or resubmit it with a better image URL.

## Future Improvements

- Add a real database such as MongoDB, PostgreSQL, Supabase, or Firebase.
- Add multiple admin accounts.
- Add password hashing with persistent user records.
- Add image upload instead of image URL input.
- Add recipe search and filters.
- Add user accounts for community contributors.
- Add likes, comments, and ratings.
- Add server-side recipe approval storage.
- Add email notification after approval.

## License

This project is currently private and intended for learning, portfolio, and project demonstration use. Add a license file if you want to publish it as open source.
