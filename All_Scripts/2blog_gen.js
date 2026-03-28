import Groq from "groq-sdk";
import fs from "fs/promises";
import path from "path";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Configuration
const inputFolder = "./posts_articles";
const outputFolder = "./movies_markdown_posts"; // New destination
const trackerFile = "./completed_files.txt"; // Log for processed files

// Helper function for the 10s delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * AI logic to generate clean Frontmatter and a URL-friendly filename.
 */
async function getAiMetadata(fileContent) {
  const prompt = `
    Analyze this movie review. 
    1. Generate a URL-friendly slug for the filename (e.g., "8-vasantalu").
    2. Generate exactly this YAML frontmatter:
    ---
    title: [Movie Title]
    date: '[Release Date in YYYY-MM-DD format]'
    draft: false
    summary: '[A 1-sentence engaging summary]'
    image: /i/[slug].webp
    tags:
      - Telugu
      - [Genre]
    author: Mr Amon
    ---

    Return the result in this format:
    FILENAME: [slug]
    METADATA: [The YAML block]

    Review Content:
    ${fileContent.substring(0, 2000)}
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
    reasoning_effort: "medium",
    temperature: 0.1,
  });

  return completion.choices[0]?.message?.content || "";
}

/**
 * Main Processing Logic with Tracking
 */
export async function transformFiles() {
  try {
    // Ensure folders exist
    await fs.mkdir(outputFolder, { recursive: true });
    
    // Load completed files list
    let completedFiles = [];
    try {
      const data = await fs.readFile(trackerFile, "utf-8");
      completedFiles = data.split("\n").map(f => f.trim());
    } catch (e) {
      // File doesn't exist yet, start empty
    }

    const files = await fs.readdir(inputFolder);

    for (const file of files) {
      if (path.extname(file) === ".txt") {
        // SKIP if already in our tracker
        if (completedFiles.includes(file)) {
          console.log(`- Skipping ${file}: Already processed.`);
          continue;
        }

        const filePath = path.join(inputFolder, file);
        let content = await fs.readFile(filePath, "utf-8");

        // 1. CLEANUP: Remove all existing "---" lines from the body
        const cleanedContent = content.replace(/^---$/gm, "").trim();

        console.log(`🚀 Analyzing: ${file}...`);
        const aiResponse = await getAiMetadata(cleanedContent);

        // 2. PARSE AI RESPONSE
        const slugMatch = aiResponse.match(/FILENAME:\s*(.+)/);
        const metadataMatch = aiResponse.match(/---[\s\S]*?---/);

        if (slugMatch && metadataMatch) {
          const slug = slugMatch[1].trim();
          const frontmatter = metadataMatch[0];
          const newFileName = `${slug}.md`;
          const newPath = path.join(outputFolder, newFileName);

          // 3. ASSEMBLE: Frontmatter + Cleaned Content
          const finalMarkdown = `${frontmatter}\n\n${cleanedContent}`;

          // 4. WRITE to new folder
          await fs.writeFile(newPath, finalMarkdown, "utf-8");

          // 5. UPDATE TRACKER: Append the original filename to the log
          await fs.appendFile(trackerFile, `${file}\n`);
          
          console.log(`✅ Success: ${file} -> ${outputFolder}/${newFileName}`);
          
          // 6. DELAY: Wait for 10 seconds before the next iteration
          console.log(`⏳ Waiting 10 seconds...`);
          await delay(10000);
        }
      }
    }
    console.log("\nAll new files have been processed! Check completed_files.txt for the log.");
  } catch (error) {
    console.error("❌ Error during transformation:", error);
  }
}

transformFiles();