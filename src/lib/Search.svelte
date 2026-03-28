<script>
  // The '?raw' suffix tells Vite to import the file content as a string
  import slugData from '$lib/data/slugs.txt?raw';

  // 1. Process the raw string into an array immediately
  const allSlugs = slugData
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // 2. State and Runes (Svelte 5)
  let query = $state('');
  let isFocused = $state(false);

  // 3. Logic Helpers
  function getTitle(slug) {
    return slug
      .replace(/[_-]/g, ' ') 
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // 4. Reactive Search Results
  const searchResults = $derived(
    query.trim().length > 1
      ? allSlugs
          .filter(slug => slug.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 8)
      : []
  );
</script>

<div class="search-box">
  <input
    type="text"
    bind:value={query}
    onfocus={() => isFocused = true}
    onblur={() => setTimeout(() => isFocused = false, 200)}
    placeholder="Search..."
    class="input-field"
  />

  {#if isFocused && searchResults.length > 0}
    <div class="results-overlay">
      {#each searchResults as slug}
        <a href="/watch/{slug}" class="item">
          <img src="/i/{slug}.avif" alt="" />
          <span>{getTitle(slug)}</span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .search-box {
    position: relative;
    width: 240px;
  }

  .input-field {
    width: 100%;
    padding: 6px 12px;
    background: #111;
    border: 1px solid #333;
    border-radius: 4px;
    color: white;
  }

  .results-overlay {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #1a1a1a;
    border: 1px solid #333;
    margin-top: 4px;
    z-index: 100;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    text-decoration: none;
    color: #ccc;
    font-size: 0.8rem;
  }

  .item:hover {
    background: #333;
    color: #fbc500;
  }

  img {
    width: 30px;
    height: 40px;
    object-fit: cover;
  }
</style>