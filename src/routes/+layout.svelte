<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.ico";
	import Footer from "$lib/Footer.svelte";
	import Navbar from "$lib/Navbar.svelte";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar />
{@render children()}
<Footer />
