# Rookie Rackets Website

Personal website built with [Astro](https://astro.build) v5.

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later — download the LTS version from nodejs.org and run the installer.

### Setup

Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Your site will be available at `http://localhost:4321`. Changes to files are reflected instantly.

### Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Deploying to GitHub Pages

These instructions assume you have a [GitHub](https://github.com) account. If not, create one at github.com — it's free.

### Step 1 — Install Git

If you don't have Git installed, download it from [git-scm.com](https://git-scm.com) and run the installer. Accept all defaults.

Verify the install by opening a terminal and running:

```bash
git --version
```

### Step 2 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. Give the repository a name (e.g. `rookie-rackets-site`).
3. Set it to **Public**.
4. Do **not** check "Add a README file" — the repo should start empty.
5. Click **Create repository**.

GitHub will show you a page with setup commands. Keep this page open.

### Step 3 — Initialize Git and push the code

In your terminal, inside this project folder:

```bash
# Tell Git who you are (only needed once per machine)
git config --global user.email "you@example.com"
git config --global user.name "Your Name"

# Initialize a new Git repository
git init

# Stage all files
git add .

# Create the first commit
git commit -m "Initial commit"

# Connect to your GitHub repository
# Replace YOUR_USERNAME and YOUR_REPO_NAME with the values from Step 2
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push the code to GitHub
git branch -M main
git push -u origin main
```

If prompted, sign in with your GitHub credentials.

### Step 4 — Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** (top tab bar).
3. In the left sidebar click **Pages**.
4. Under **Source**, select **GitHub Actions**.
5. That's it — no other changes needed.

### Step 5 — Trigger the first deploy

Every push to the `main` branch automatically builds and deploys the site. The first deploy starts as soon as you pushed in Step 3.

To watch it:

1. Go to your repository on GitHub.
2. Click the **Actions** tab.
3. You'll see a workflow run called "Deploy to GitHub Pages". Click it to watch progress.

Once it finishes (usually 1–2 minutes), your site will be live at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

### Using a custom domain (e.g. rookierackets.org)

If you own a domain and want to use it instead of the `github.io` URL:

1. In `astro.config.mjs`, update the `site` value to your domain:
   ```js
   site: 'https://rookierackets.org',
   ```
2. In your repository **Settings → Pages**, enter your domain in the **Custom domain** field and save.
3. At your domain registrar (wherever you bought the domain), add DNS records pointing to GitHub's servers. GitHub's documentation at [docs.github.com/pages/configuring-a-custom-domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) has exact steps for every registrar.

### Making future updates

Whenever you make changes to the site:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

The site will automatically rebuild and redeploy.

---

## Project Structure

```
/
├── public/            Static assets (images, favicon, etc.)
├── src/
│   ├── layouts/       Shared page wrapper (Layout.astro)
│   └── pages/         One file per page — file name = URL path
│       ├── index.astro   → /
│       ├── about.astro   → /about
│       ├── events.astro  → /events
│       ├── faq.astro     → /faq
│       └── contact.astro → /contact
├── astro.config.mjs   Astro configuration
└── package.json
```
