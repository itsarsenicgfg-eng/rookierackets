import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Editable "Upcoming Events". Each file in src/content/events/ is one event.
// These are what the admin panel edits.
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    shortCode: z.string().default(''),          // logo badge text, e.g. "BCR"
    logoFrom: z.string().default('#7568f0'),     // logo gradient start color
    logoTo: z.string().default('#5a4fd8'),       // logo gradient end color
    badge: z.string().default('Upcoming'),       // "Next Up" / "Upcoming"
    badgeHighlight: z.boolean().default(false),  // green highlighted badge
    displayDate: z.string(),                     // shown on the card, e.g. "June 29, 2026"
    time: z.string().default(''),
    location: z.string().default(''),
    pills: z.array(z.string()).default([]),      // small "✓" chips
    ctaText: z.string().default('Get Notified →'),
    ctaAccent: z.boolean().default(false),       // orange button vs purple
    photo: z.string().default('/images/IMG_8788.jpeg'),
    featured: z.boolean().default(false),        // highlighted "next up" tile
    calDates: z.array(z.string()).default([]),   // session dates as "YYYY-MM-DD" (one per session; blank = TBD)
    calLabel: z.string().optional(),             // calendar chip label (defaults to title)
  }),
});

export const collections = { events };
