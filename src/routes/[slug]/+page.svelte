<script lang="ts">
    import type { Post } from '$lib/types';
    import Head from '$lib/Head.svelte';

    let { data } = $props();
    const post: Post = $derived(data.post);

    // 1. Define your placeholder URL here
    const PLACEHOLDER_IMAGE = '/placeholder.avif';

    let title = $derived(post.title + '' || '');
    let description = $derived(post.summary.slice(0, 138) + '' || '');
    let keywords = $derived(post.keywords);
    
    // 2. Fallback for OpenGraph image
    let ogImg = $derived(post.image || PLACEHOLDER_IMAGE);
    
    let author = $derived(post.author || 'Mr Amon');
</script>

<Head {title} {description} {keywords} {ogImg} {author} />

<main class="min-h-full bg-[#000000] ">
    <div class="">
        <section class=" bg-[#000000]">
            <div class="container mx-auto px-4 py-12">
                <div class="flex flex-col items-center space-y-8">
                    <h1 class="text-center text-4xl font-bold tracking-wider  md:text-6xl">
                        {post.title || ''}
                    </h1>
                    {#if post.summary}
                        <p class="max-w-3xl text-center text-base leading-relaxed ">
                            {post.summary}
                        </p>
                    {/if}
                </div>
            </div>
        </section>
    </div>

    <article class="container mx-auto px-4 py-12">
        <div class="prose prose-invert mx-auto max-w-3xl">
            <img 
                src={ogImg} 
                alt={post.title} 
                class="mb-6 w-full rounded-sm object-cover" 
            />
            
            {@html post.content}
        </div>
    </article>
</main>