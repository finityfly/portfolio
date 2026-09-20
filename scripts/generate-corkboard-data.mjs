// Pre-reads data/corkboard/entries/*.md into a single JSON file so
// lib/corkboard.server.ts can import it statically instead of scanning the
// filesystem at request time. A dynamic fs.readdir isn't traceable by Next's
// bundler, so serverless/edge deploy targets (Cloudflare Workers via
// OpenNext) never actually ship those files — this runs before every build
// and dev server start so the import always has fresh data.
import fs from "node:fs";
import path from "node:path";

const entriesDir = path.join(process.cwd(), "data", "corkboard", "entries");
const outputFile = path.join(process.cwd(), "data", "corkboard", "entries.generated.json");

const entries = fs
  .readdirSync(entriesDir)
  .filter((name) => name.endsWith(".md"))
  .map((filename) => ({
    id: filename.replace(/\.md$/, ""),
    raw: fs.readFileSync(path.join(entriesDir, filename), "utf8"),
  }));

fs.writeFileSync(outputFile, JSON.stringify(entries, null, 2));
console.log(`Generated ${outputFile} (${entries.length} corkboard entries)`);
