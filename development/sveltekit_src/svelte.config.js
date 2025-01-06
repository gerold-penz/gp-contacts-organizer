import adapter from "svelte-adapter-bun"
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte"


/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({development: true}),
        csrf: {checkOrigin: false}
    }
}

export default config