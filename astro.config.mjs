// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
// Para GitHub Pages: base debe coincidir con el nombre del repo.
// Repo "blog" → https://markospy.github.io/blog/
export default defineConfig({
  site: "https://markospy.github.io",
  base: "/blog/",
  integrations: [mdx(), sitemap()],
});
