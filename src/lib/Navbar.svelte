<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
    import Search from './Search.svelte';

	let isOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/#movies', label: 'Movies' },
		{ href: '/#about', label: 'About' }
	];

	const toggleMenu = () => (isOpen = !isOpen);
	const closeMenu = () => (isOpen = false);

	const isActive = (href: string) => {
		const [pathname, hash] = href.split('#');
		const currentPath = page.url.pathname;
		const currentHash = page.url.hash;

		if (!hash) return currentPath === pathname;
		return currentPath === pathname && currentHash === `#${hash}`;
	};

	$effect(() => {
		page.url.pathname;
		page.url.hash;
		closeMenu();
	});

	$effect(() => {
		if (!browser) return;

		const handleResize = () => {
			if (window.innerWidth >= 768 && isOpen) closeMenu();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 z-40 bg-black/70 md:hidden"
		onclick={closeMenu}
		aria-label="Close menu overlay"
	></button>
{/if}

<nav class="sticky top-0 z-30 bg-[#000000] shadow-[0_8px_20px_rgba(0,0,0,0.35)]" aria-label="Main">
	<div class="mx-auto max-w-6xl px-4">
		<div class="flex h-16 items-center justify-between">
			<a
				href="/"
				class="rounded-md text-2xl font-bold  focus:ring-2 focus:ring-[#ff7a00] focus:outline-none"
				onclick={closeMenu}
			>
				MKVCinemas
			</a>

			<div class="hidden items-center space-x-6 md:flex">
				{#each navLinks as link}
					<a
						href={link.href}
						class="rounded-md px-2 py-1 font-medium transition"
						class:text-[#ff7a00]={isActive(link.href)}
						class:text-[#fffff]={!isActive(link.href)}
						class:hover:text-[#ff7a00]={!isActive(link.href)}
					>
						{link.label}
					</a>
				{/each}
				<div class="hidden md:flex items-center gap-4">
					<Search />
				  </div>
			</div>

			<button
				onclick={toggleMenu}
				type="button"
				class="rounded-lg p-2  transition hover:bg-[#ff7a00] hover:text-[#000000] focus:ring-2 focus:ring-[#ff7a00] focus:outline-none md:hidden"
				aria-expanded={isOpen}
				aria-controls="mobile-menu"
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	</div>
</nav>

<div
	id="mobile-menu"
	class="fixed top-0 right-0 z-50 h-full w-72 transform border-l border-[#ff7a00] bg-[#000000] shadow-xl transition-transform duration-300 ease-in-out md:hidden"
	class:translate-x-0={isOpen}
	class:translate-x-full={!isOpen}
>
	<div class="flex h-16 items-center justify-end border-b border-[#ff7a00] px-4">
		<button
			onclick={closeMenu}
			class="rounded-lg p-2  transition hover:bg-[#ff7a00] hover:text-[#000000] focus:ring-2 focus:ring-[#ff7a00] focus:outline-none"
			aria-label="Close menu"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<div class="space-y-2 px-4 py-4">
		{#each navLinks as link}
			<a
				href={link.href}
				onclick={closeMenu}
				class="block rounded-md px-3 py-2 text-base font-medium transition"
				class:bg-[#ff7a00]={isActive(link.href)}
				class:text-[#000000]={isActive(link.href)}
				class:text-[#fffff]={!isActive(link.href)}
				class:hover:bg-[#ff7a00]={!isActive(link.href)}
				class:hover:text-[#000000]={!isActive(link.href)}
			>
				{link.label}
			</a>
		{/each}

		<div class="md:flex items-center gap-4">
			<Search />
		  </div>
	</div>
</div>
