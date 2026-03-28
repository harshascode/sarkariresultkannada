import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types';
import type { EntryGenerator, PageServerLoad } from './$types';
import allPosts from '$lib/data/posts.json';
import imagePaths from '$lib/data/image-paths.json';
import slugsText from '$lib/data/slugs.txt?raw';

const PLACEHOLDER_IMAGE = '/placeholder.avif';
const availableImages = new Set(imagePaths);
const posts = allPosts as Post[];

export const entries: EntryGenerator = async () => {
    return slugsText
        .split('\n')
        .map((slug) => slug.trim())
        .filter(Boolean)
        .map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug.replace(/\.md$/, '');

    try {
        const post = posts.find((p) => p.slug === slug);

        if (!post) {
            throw error(404, 'No post found');
        }

        return {
            post: {
                ...post,
                image: post.image && availableImages.has(post.image) ? post.image : PLACEHOLDER_IMAGE
            }
        };
    } catch (err) {
        console.error('Error loading posts:', err);
        throw error(500, 'Could not load post data');
    }
};
