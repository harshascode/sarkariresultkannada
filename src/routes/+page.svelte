<script lang="ts">
    import Head from '$lib/Head.svelte';
    // import Middlebox from '$lib/Middlebox.svelte';

	let { data } = $props();

	const getYear = () => new Date().getFullYear();

	const createPlaceholder = (title: string) => {
		const safeTitle = title || "Mkvcinemas1.com";
		const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'><rect width='640' height='360' fill='#000000'/><text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' fill='#ffffff' font-size='30' font-family='Arial, sans-serif'>${safeTitle}</text></svg>`;
		return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
	};

	const setPlaceholderOnError = (event: Event, title: string) => {
		const image = event.currentTarget as HTMLImageElement;
		if (!image || image.dataset.placeholderApplied === "true") return;
		image.dataset.placeholderApplied = "true";
		image.src = createPlaceholder(title);
	};

	let title = `Mkvcinemas - Watch mkvcinemas Telugu Movies | mkvcinemas1.com`;
	let description = `mkvCinemas PC and Smartphone Movies. Watch and download the latest mkvcinemas movies in HD - mkvcinemas1.com`;
	let keywords = `mkvcinemas, mkvcinemas movies, mkvcinemas.com, mkv cinemas, mkvcinemas mkv, mkvcinemas app`;
	// let ogImg = '';
	// let author = '';
</script>

<Head {title} {description} {keywords}/>

<!-- <Middlebox /> -->

<section class="bg-[#000000] px-4 py-12 md:px-6 md:py-20">
	<div class="mx-auto max-w-6xl text-center">
		<p
			class="text-sm font-semibold uppercase tracking-[0.2em] text-[#ff7a00]"
		>
			MKVCinemas
		</p>
		<h1 class="mt-4 text-4xl font-extrabold md:text-6xl">
			Watch Mkvcinemas movies online in excellent quality.
		</h1>
		<p class="mx-auto mt-5 max-w-3xl text-base leading-relaxed">
			Mkvcinemas, we provide the most detailed reviews for the latest
			mkvcinemas Telugu movies and trending hits across Netflix, Amazon
			Prime, Zee5, and Aha. Whether you're hunting for a Hollywood
			thriller, a Bollywood romance, or regional masterpieces in Tamil and
			Kannada, mkvcinemas is the only guide you need to decide what’s
			worth your time.
		</p>
	</div>
	<div class="flex justify-center w-full mb-0 mt-7">
		<a
			href="/bookmark-list"
			class="bg-[#ff7a00] hover:bg-[#ff7b00e3] text-white font-bold py-3 px-18 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
		>
			ENTER
		</a>
	</div>
</section>

<section id="movies" class="mx-auto max-w-6xl px-4 py-0 md:py-14 md:px-6">
	<div class="mb-8 flex items-end justify-between gap-4">
		<div>
			<h2 class="text-2xl font-bold md:text-3xl">
				Mkvcinemas Movies {getYear()}
			</h2>
			<!-- <p class="mt-2 text-sm ">Recent updates from our movie desk.</p> -->
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
		{#each data.latestPosts as post}
			<div class="movie-card">
				<a href={`watch/${post.slug}`}>
					<img
						src={`${post.image}`}
						alt={post.title}
						width="640"
						height="360"
						class="mb-4"
						loading="lazy"
						onerror={(event) =>
							setPlaceholderOnError(event, post.title)}
					/>
					<p class="movi-name">{post.title}</p>
					<!-- <p class="year-btn">{getYear(post.date)}</p> -->
					<p class="year-btn">HD</p>
				</a>
			</div>
		{/each}
	</div>

	<div class="mb-8 mt-8 flex items-end justify-between gap-4">
		<div>
			<h2 class="text-2xl font-bold md:text-3xl">
				The Truth About Mkvcinemas Telugu Movies: A {getYear()} Guide to Safe Streaming
			</h2>
			<p class="mt-4 text-base">For fans of South Indian cinema, the name Mkvcinemas has become synonymous with quick access to the latest Telugu releases. However, as the digital landscape evolves in {getYear()}, the risks associated with these unauthorized platforms are higher than ever. Before you search for that next Mkvcinemas Telugu movie, here is everything you need to know about staying safe and supporting the creators you love.</p>
			
			<h3 class="text-2xl mt-10 font-bold md:text-3xl">
				What is Mkvcinemas?
			</h3>
			<p class="mt-4 text-base">
				Mkvcinemas is an unofficial third-party platform that hosts copyrighted Telugu, Tamil, and Malayalam content for free. While its catalog is vast, it operates without legal licensing. Our mission is to provide you with honest movie reviews and guide you toward the safest ways to watch these trending titles without compromising your device.
			</p>
		
			<h3 class="text-2xl mt-10 font-bold md:text-3xl">
				Best Legal Mkvcinemas Alternatives for Fans
			</h3>
			<p class="mt-4 text-base">
				If you want a premium, buffer-free experience with the latest Telugu blockbusters, these are the top-rated platforms for {getYear()}:			
			</p>
			<div class="mt-4">
				<ul>
					<li>※ Aha Video: 100% Local Telugu content and exclusive "Aha" originals.</li>
					<li>※ Amazon Prime	Major theatrical releases and high-budget South Indian hits.</li>
					<li>※ Netflix	High-quality Telugu dubs and international cinema.</li>
					<li>※ Disney+ Hotstar	A mix of Star Maa shows and mainstream Telugu films.</li>
					<li>※ ZEE5	Large library of regional classics and affordable subscription plans.</li>
				</ul>

			</div>
		</div>
	</div>
</section>

<section
	id="about"
	class="border-t border-[#ff7a00] bg-[#000000] px-4 py-14 md:px-6"
>
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="text-2xl font-bold md:text-3xl">About MKVCinemas</h2>
		<p class="mt-4 text-sm leading-relaxed md:text-base">
			MKVCinemas is focused on straightforward movie coverage: release
			updates, performance snapshots, and review breakdowns that help you
			decide what to watch next.
		</p>
		<div>
			<p class="mt-4 text-base">
				Important Note: We love cinema, but we don't support piracy.
				This site serves as a guide for trending Telugu movies and
				reviews. We do not host or distribute illegal files. Using
				piracy sites like Mkvcinemas can lead to legal issues and device
				infections. Protect your data and support the creators always
				watch on authorized legal platforms.
			</p>
		</div>
	</div>
</section>

<style>
	.movie-card {
		background: #000000;
		/* border-radius: 0.45rem; */
		padding-bottom: 0.65rem;
		transition:
			transform 180ms ease,
			box-shadow 180ms ease;
		box-shadow: 0 10px 18px rgba(0, 0, 0, 0.2);
	}

	.movie-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 14px 24px rgba(0, 0, 0, 0.3);
	}

	.movie-card img {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		display: block;
	}

	.movi-name {
		color: #ffffff;
		font-size: 0.98rem;
		font-weight: 700;
		line-height: 1.35;
		margin: 0 0 0.55rem 0;
	}

	.year-btn {
		display: inline-block;
		border: 1px solid #ff7a00;
		color: #ff7a00;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1;
		padding: 0.33rem 0.5rem;
		border-radius: 8px;
		margin: 0;
	}
</style>
