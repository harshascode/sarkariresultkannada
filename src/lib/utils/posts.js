import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

// Helpers to handle paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// Configuration
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/posts');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src/lib/data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'posts.json');

/**
 * Normalizes dates to timestamps
 */
const toTimestamp = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (value instanceof Date) return value.getTime();
    if (typeof value === 'string') {
        const parsed = Date.parse(value);
        return !Number.isNaN(parsed) ? parsed : 0;
    }
    return 0;
};

/**
 * Recursively find all markdown files
 */
function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.md')) {
            results.push(file);
        }
    });
    return results;
}

const generatePosts = () => {
    const files = getFiles(CONTENT_DIR);
    const posts = files
        .map((filepath) => {
            try {
                const fileContent = fs.readFileSync(filepath, 'utf-8');
                const { data: metadata, content: markdownBody } = matter(fileContent);

                const slug = filepath.replace(/(\/index)?\.md$/, '').split(path.sep).pop() ?? '';
                const htmlContent = marked.parse(markdownBody);

                return {
                    ...metadata,
                    content: htmlContent,
                    slug,
                    date: toTimestamp(metadata.date),
                    tag: typeof metadata.tag === 'string' ? metadata.tag : null,
                    tags: Array.isArray(metadata.tags)
                        ? metadata.tags.filter((tag) => typeof tag === 'string')
                        : []
                };
            } catch (error) {
                console.warn(`Skipping invalid markdown file: ${filepath}`);
                console.warn(error.message);
                return null;
            }
        })
        .filter((post) => post && !post.draft)
        .sort((a, b) => b.date - a.date);

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Write to src/lib/data/posts.json
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`✅ Successfully generated ${posts.length} posts to ${OUTPUT_FILE}`);
};

generatePosts();
