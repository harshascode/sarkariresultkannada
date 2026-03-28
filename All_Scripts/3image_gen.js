const axios = require('axios');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// CONFIGURATION
const API_KEY = '61eb6a9222af515ea9dc3bb91650d558';
const INPUT_FILE = 'completed_files.txt';
const SUCCESS_LOG = 'success.txt';
const FAILED_LOG = 'failed.txt'; // Tracking movies not found
const POSTER_DIR = path.join(__dirname, 'posters');
const BACKDROP_DIR = path.join(__dirname, 'backdrops');

/**
 * Downloads a single file from a URL to a specific path
 */
async function downloadFile(url, savePath) {
    const writer = fs.createWriteStream(savePath);
    const response = await axios({ url, method: 'GET', responseType: 'stream' });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

/**
 * Main Logic: Processes each movie title
 */
async function processMovies() {
    // 1. Create folders
    [POSTER_DIR, BACKDROP_DIR].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    });

    if (!fs.existsSync(INPUT_FILE)) {
        return console.error(`❌ Error: ${INPUT_FILE} not found!`);
    }

    // 2. Load Success and Failed lists into a combined "Skip Set"
    const skipSet = new Set();
    [SUCCESS_LOG, FAILED_LOG].forEach(logFile => {
        if (fs.existsSync(logFile)) {
            const content = fs.readFileSync(logFile, 'utf8');
            content.split('\n').forEach(line => {
                const trimmed = line.trim();
                if (trimmed) skipSet.add(trimmed);
            });
        }
    });

    // 3. Read the INPUT_FILE line by line
    const fileStream = fs.createReadStream(INPUT_FILE);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    console.log('🚀 Starting movie processor...\n');

    for await (const movieTitle of rl) {
        const cleanTitle = movieTitle.trim();
        if (!cleanTitle) continue; 

        // 4. CHECK: Skip if already succeeded OR previously failed
        if (skipSet.has(cleanTitle)) {
            console.log(`⏩ Skipping: "${cleanTitle}" (Already in logs)`);
            continue;
        }

        const querySlug = cleanTitle.toLowerCase().replace(/\s+/g, '_');

        try {
            // 5. Search for Movie ID
            const searchRes = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: { api_key: API_KEY, query: cleanTitle }
            });

            // 6. Handle Case: Movie NOT FOUND
            if (searchRes.data.results.length === 0) {
                console.log(`⚠️  Not Found: "${cleanTitle}" -> Added to failed.txt`);
                fs.appendFileSync(FAILED_LOG, `${cleanTitle}\n`);
                continue;
            }

            const movieId = searchRes.data.results[0].id;

            // 7. Get Images
            const imageRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
                params: { api_key: API_KEY }
            });

            const backdrop = imageRes.data.backdrops[0];
            const poster = imageRes.data.posters[0];

            // 8. Download Backdrop (Landscape)
            if (backdrop) {
                const bPath = path.join(BACKDROP_DIR, `${querySlug}.jpg`);
                await downloadFile(`https://image.tmdb.org/t/p/original${backdrop.file_path}`, bPath);
            }

            // 9. Download Poster (Vertical)
            if (poster) {
                const pPath = path.join(POSTER_DIR, `${querySlug}_poster.jpg`);
                await downloadFile(`https://image.tmdb.org/t/p/original${poster.file_path}`, pPath);
            }

            // 10. Success Track
            console.log(`✅ Processed: ${cleanTitle}`);
            fs.appendFileSync(SUCCESS_LOG, `${cleanTitle}\n`);

        } catch (error) {
            // General errors (network, API limits) - we DON'T log these to failed.txt 
            // so you can try again later.
            console.error(`❌ Error processing "${cleanTitle}":`, error.message);
        }
    }

    console.log(`\n✨ Finished! Check logs: ${SUCCESS_LOG} and ${FAILED_LOG}`);
}

processMovies();