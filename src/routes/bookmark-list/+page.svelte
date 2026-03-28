<script>
	const freeOttLinks = [
		{ href: '/hindi-movies', src: '/img_logos/hindi.svg', alt: 'hindi-movies' },
		{ href: '/telugu-movies', src: '/img_logos/telugu.svg', alt: 'telugu-movies' },
		{ href: '/tamil-movies', src: '/img_logos/tamil.svg', alt: 'tamil-movies' },
		{ href: '/kannada-movies', src: '/img_logos/kannada.svg', alt: 'kannada-movies' },
		{ href: '/bookmarks-list', src: '/img_logos/malayalam.svg', alt: 'malayalam-movies' },
		{ href: 'https://www.youtube.com', src: '/img_logos/youtube.svg', alt: 'YouTube', target: '_blank' }
	];

	const logos = [
		{ src: '/img_logos/netflix.svg', link: 'https://www.netflix.com' },
		{ src: '/img_logos/prime-video.svg', link: 'https://www.primevideo.com' },
		{ src: '/img_logos/disney.svg', link: 'https://www.disneyplus.com' },
		{ src: '/img_logos/appletv.svg', link: 'https://www.apple.com/apple-tv-plus/' },
		{ src: '/img_logos/sunnxt.svg', link: 'https://www.sunnxt.com' },
		{ src: '/img_logos/zee5.svg', link: 'https://www.zee5.com' },
		{ src: '/img_logos/sonyliv.svg', link: 'https://www.sonyliv.com' },
		{ src: '/img_logos/jiocinema.svg', link: 'https://www.jiocinema.com' },
		{ src: '/img_logos/aha.svg', link: 'https://www.aha.video' },
		{ src: '/img_logos/mxplayer.svg', link: 'https://www.mxplayer.in' },
		{ src: '/img_logos/nammaflix.svg', link: 'https://www.nammaflix.com' },
		{ src: '/img_logos/manoramamax.svg', link: 'https://www.manoramamax.com' }
	];

	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {string} [description]
	 * @property {string} [url]
	 */

	/** @type {Props} */
	let { title = 'Mkvcinemas Bookmarks list', description = 'mkvcinemas1.com: Your go-to bookmark site for top free movie streaming platforms, latest Mkvmovies, and must-see reviews and trailers all in one place😎', url = 'https://mkvcinemas1.com/bookmarks-list' } = $props();
</script>

<svelte:head>
	<title>{title} | Mkvcinemas</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta
		name="keywords"
		content="{title}, mkvcinemas, mkvcinemas movies, mkvcinemas.com, mkvcinemas i, mkv cinemas, mkvcinemas movies, mkvcinemas in, mkvcinemas app, mkvcinemas mkv, mkvcinemas mkv 2024"
	/>
</svelte:head>

<div class="w-full h-full px-4 pt-2 pb-2 lg:pt-4 lg:pb-8 flex flex-col items-center justify-center">
	<div class="w-full py-4">
		<!-- Free OTT -->
		<!-- <div class="mb-8">
			<h2 class="text-xl font-semibold mb-4">Free OTT</h2>
			<div class="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4">
				{#each freeOttLinks as { href, src, alt }}
					<a {href} class="h-full">
						<div
							class="flex items-center justify-center p-1 rounded bg-blue-200 cursor-pointer h-fit"
						>
							<img {src} {alt} width="100" height="50" class="h-full w-full" />
						</div>
					</a>
				{/each}
			</div>
		</div> -->
		
		<!-- Paid OTT  -->
		<div>
			<h2 class="text-xl font-semibold mb-4">Paid OTT</h2>
			<div class="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4">
				{#each logos as logo, index}
					<a href={logo.link} target="_blank" rel="noopener noreferrer">
						<div class="flex items-center justify-center p-1 bg-red-300 rounded cursor-pointer">
							<img
								src={logo.src}
								alt={`Logo ${index}`}
								width="100"
								height="50"
								class="h-full w-full"
							/>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
