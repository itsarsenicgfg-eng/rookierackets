import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://rookierackets.org',
  integrations: [react()],
});