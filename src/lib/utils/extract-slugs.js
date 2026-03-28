import fs from 'fs/promises';
import path from 'path';

async function extractSlugs() {
  const inputPath = path.join(import.meta.dirname, '..', '..', 'lib', 'data', 'posts.json');
  const outputPath = path.join(import.meta.dirname, '..', '..', 'lib', 'data', 'slugs.txt');
  const imagesDir = path.join(import.meta.dirname, '..', '..', '..', 'static', 'i');
  const imagesOutputPath = path.join(import.meta.dirname, '..', '..', 'lib', 'data', 'image-paths.json');

  try {
    const [data, imageFiles] = await Promise.all([
      fs.readFile(inputPath, 'utf8'),
      fs.readdir(imagesDir)
    ]);
    const posts = JSON.parse(data);

    const slugs = posts
      .map(post => post.slug)
      .filter(slug => slug);
    const imagePaths = imageFiles
      .filter(file => file.endsWith('.avif'))
      .map(file => `/i/${file}`)
      .sort();

    await Promise.all([
      fs.writeFile(outputPath, slugs.join('\n'), 'utf8'),
      fs.writeFile(imagesOutputPath, JSON.stringify(imagePaths, null, 2), 'utf8')
    ]);

    console.log(`✨ Success! ${slugs.length} slugs saved to ${outputPath}`);
    console.log(`✨ Success! ${imagePaths.length} image paths saved to ${imagesOutputPath}`);
  } catch (error) {
    console.error('❌ Error processing the file:', error.message);
  }
}

extractSlugs();
