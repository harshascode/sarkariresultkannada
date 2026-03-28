import Groq from "groq-sdk";
import fs from "fs/promises";
import path from "path";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const TRACKER_FILE = "./processed_movies.txt";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getProcessedFiles() {
  try {
    const data = await fs.readFile(TRACKER_FILE, "utf-8");
    return new Set(data.split("\n").map(line => line.trim()).filter(Boolean));
  } catch (error) {
    return new Set();
  }
}

async function markAsProcessed(fileName) {
  await fs.appendFile(TRACKER_FILE, `${fileName}\n`);
}

/**
 * REWRITING LOGIC: 
 * Focuses on transformation, expansion, and unique perspective.
 */
async function rewriteAsArticle(inputFilePath, outputDir) {
  try {
    const fileName = path.basename(inputFilePath);
    const outputPath = path.join(outputDir, fileName);

    console.log(`Processing Article: ${fileName}...`);
    const fileContent = await fs.readFile(inputFilePath, "utf-8");

    const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a professional Indian film journalist. Your task is to rewrite raw movie data into a structured, high-quality review of at least 600 words. 
      
              STRICT STRUCTURE TO FOLLOW:
              1. Catchy Title: (e.g., [Movie Name] Review – [A punchy one-line hook])
              2. Movie Summary & Story: (A deep dive into the plot, themes, and setting. Don't just summarize; explain the stakes.)
              3. Cast & Crew Table: (Markdown table with Role and Name)
              4. Technical Aspects: (Analyze cinematography, music/BGM by [Composer], and pacing/editing.)
              5. Performances & Characters: (Detailed breakdown of the lead and supporting cast.)
              6. Box Office & Collection: (Summarize the financial performance and budget recovery if data is present.)
              7. What Works & What Doesn't: (Use bullet points for pros and cons.)
              8. My Rating & Final Verdict: (Provide a X/5 rating and a concluding recommendation.)
      
              WRITING RULES:
              - HUMAN FLOW: Use conversational but professional language. Avoid "AI-isms" like "In the realm of cinema."
              - EXPANSION: To reach 600 words, don't just state facts. Analyze how the music impacts the mood or how the rural setting adds to the realism.
              - CLEANING: Remove all scraped junk (ads, "click here" links, timestamps).
              - UNIQUE: Rephrase every sentence from the source to avoid copyright issues.
              - FORMAT: Return ONLY clean Markdown.`
          },
          {
            role: "user",
            content: `Transform this raw data into a structured 600-word review following the specific format provided:\n\n${fileContent}`,
          },
        ],
        model: "openai/gpt-oss-120b",
        reasoning_effort: "medium",
        temperature: 0.7, // Lowered slightly for better structural consistency
      });

    const article = chatCompletion.choices[0]?.message?.content || "Generation failed.";

    await fs.writeFile(outputPath, article);
    await markAsProcessed(fileName);
    
    console.log(`✅ Success! Article saved: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${path.basename(inputFilePath)}:`, error.message);
    return false;
  }
}

async function processFolder() {
  const inputDir = "./raw_movies";
  const outputDir = "./posts_articles"; // Changed output folder name
  const delayMs = 10000; // Increased delay slightly for larger token generation

  try {
    await fs.mkdir(outputDir, { recursive: true });
    const processedFiles = await getProcessedFiles();
    const allFiles = await fs.readdir(inputDir);
    const txtFiles = allFiles.filter(file => file.endsWith(".txt"));
    const filesToProcess = txtFiles.filter(file => !processedFiles.has(file));

    if (filesToProcess.length === 0) {
      console.log("Everything is up to date.");
      return;
    }

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      const fullPath = path.join(inputDir, file);
      const success = await rewriteAsArticle(fullPath, outputDir);

      if (success && i < filesToProcess.length - 1) {
        console.log(`Waiting ${delayMs / 1000}s for rate limits...`);
        await sleep(delayMs);
      }
    }
  } catch (error) {
    console.error("Folder processing error:", error.message);
  }
}

processFolder();