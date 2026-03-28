import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter({
			config: 'wrangler.jsonc'
		})
	},
	preprocess: [mdsvex(mdsvexOptions)],
};

export default config;
