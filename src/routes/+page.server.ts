// import type { PageServerLoad } from './$types';
// import type { Post } from '$lib/types';
// import fs from 'node:fs/promises';
// import path from 'node:path';

// // Define path once at the top level to avoid re-calculating on every request
// const POSTS_PATH = path.resolve('src/lib/data/posts.json');

// export const load: PageServerLoad = async () => {
//     // 1. Direct File Read
//     const fileContent = await fs.readFile(POSTS_PATH, 'utf-8');
//     const allPosts: Post[] = JSON.parse(fileContent);

//     // 2. High-Efficiency Processing Pipeline
//     // We filter FIRST to reduce the number of items we have to sort and map.
//     const latestPosts = allPosts
//         .filter(post => post.slug && !post.draft)
//         .sort((a, b) => b.date - a.date)
//         .slice(0, 100)
//         .map(post => ({
//             title: post.title ?? 'Untitled Review',
//             slug: post.slug as string,
//             image: post.image,
//             summary: post.summary ?? 'Read the full movie review.',
//             date: post.date,
//             tag: post.tag ?? 'Review'
//         }));

//     return { latestPosts };
// };

import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types';
import allPosts from '$lib/data/posts.json';
import imagePaths from '$lib/data/image-paths.json';

const availableImages = new Set(imagePaths);

export const load: PageServerLoad = async () => {
    const latestPosts = (allPosts as Post[])
        .filter(post => 
            post.slug && 
            !post.draft &&
            typeof post.image === 'string' &&
            availableImages.has(post.image)
        )
        .sort((a, b) => b.date - a.date)
        .slice(0, 100)
        .map(post => ({
            title: post.title ?? 'Untitled Review',
            slug: post.slug as string,
            image: post.image as string,
            summary: post.summary ?? 'Read the full movie review.',
            date: post.date,
            tag: post.tag ?? 'Review'
        }));

    return { latestPosts };
};
