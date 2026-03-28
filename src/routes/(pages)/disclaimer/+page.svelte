<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {string} [description]
	 * @property {string} [url]
	 */

	/** @type {Props} */
	let {
		title = 'Mkvcinemas Disclaimer',
        description = 'Disclaimer of the mkvcinemas',
		url = 'https://mkvcinemas1.com/disclaimer'
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta
		name="keywords"
		content="mkvcinemas, mkvcinemas movies, mkvcinemas.com, mkvcinemas i, mkvcinemas app"
	/>
</svelte:head>

<div class="pt-12">
	<h1
		class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
	>
		Disclaimer
	</h1>
	<p class="paragraph">
		At mkvcinemas1.com, we operate as a comprehensive listing, bookmarking, and reviews site
		dedicated to providing movie reviews and information solely for entertainment purposes. Our
		mission is to enhance your viewing experience by offering insights and summaries of films
		available in the market.
	</p>
	<p class="paragraph">
		Content Responsibility: We want to clarify that we do not host, distribute, or promote any
		pirated content. Our platform is designed to guide users toward legally available films, and we
		strongly encourage our visitors to support the film industry by accessing movies through
		legitimate channels, such as official streaming services, theaters, and authorized distributors.
	</p>
	<p class="paragraph">
		Use of Images and Banners: All movie images, banners, and promotional materials displayed on our
		site have been edited for illustrative purposes. We do not claim ownership of these images, and
		all rights belong to their respective copyright holders. We respect the intellectual property
		rights of all creators and strive to adhere to copyright laws.
	</p>
	<p class="paragraph">
		Domain Ownership and Affiliations: Please note that we only own the domain mkvcinemas1.com. We
		are not affiliated with any other domains, including those that may host pirated content. While
		our website aims to be a resource for legitimate film-related information, we advise users to
		exercise caution when navigating external links and ensure they are accessing content through
		authorized platforms.
	</p>
	<p class="paragraph">
		User Responsibility: As a user, it is your responsibility to ensure that you are accessing
		content legally. We cannot be held liable for any content accessed via external links on our
		site. We recommend that users familiarize themselves with their local laws regarding copyright
		and streaming practices.
	</p>
	<p class="paragraph">
		By using mkvcinemas1.com, you acknowledge and agree to this disclaimer. We appreciate your
		understanding and support of the film industry.
	</p>
</div>