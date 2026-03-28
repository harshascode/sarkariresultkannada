<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		title?: string;
		description?: string;
		ogImg?: string;
		keywords?: string;
		author?: string;
	}

	let {
		title = '',
		description = '',
		ogImg = '',
		keywords = '',
		author = ''
	}: Props = $props();

	// Ensure canonical URL always uses HTTPS
	const canonicalUrl = $derived(
		page.url ? `https://website.com${page.url.pathname}` : ''
	);

	// const ogImg = '';
	// const ogImg = `${config.siteUrl}/og-image.webp`;
	// const ogImg = 'https://website.com/og-image.webp';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImg} />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="" />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImg} />
</svelte:head>