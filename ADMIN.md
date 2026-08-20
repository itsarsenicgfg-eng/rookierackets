# Editing the site (Admin panel)

The site's **Upcoming Events** are stored as simple files in `src/content/events/`
(one file per event). You can edit them without touching code using a free,
hosted admin panel called **Pages CMS**.

## One-time setup (about 3 minutes)

1. Go to **https://app.pagescms.org** and click **Sign in with GitHub**.
2. Authorize Pages CMS and give it access to the **`rookierackets`** repository.
3. Open the repo in Pages CMS — it reads `.pages.yml` and shows an
   **"Upcoming Events"** collection with friendly forms.

## Everyday use

- **Add an event:** Upcoming Events → *New entry*, fill in the form, **Save**.
- **Edit / remove an event:** open it, change fields (or delete), **Save**.
- Saving commits to GitHub, and **Vercel auto-rebuilds the live site in ~1–2 minutes**.

## Field notes

- **Sort order** controls tile order (1 = first).
- **Calendar month/day** put a dot on the calendar. Leave blank if the date isn't set.
- **Photo** can be uploaded right in the form (saved to `public/images`).
- **Feature this event** gives one tile the highlighted "next up" treatment.

> Want the admin on your own domain (e.g. `rookierackets.org/admin`) instead of
> app.pagescms.org? That's possible with Decap/Sveltia CMS but needs a GitHub
> OAuth app + a small auth function — ask and it can be added.
