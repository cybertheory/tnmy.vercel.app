import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pdf from "pdf-parse/lib/pdf-parse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pdfPath = path.join(
  root,
  "Philosophiae_Naturalis_Principia_Systematica (1).pdf"
);
const outDir = path.join(root, "content", "essays");

const SLUGS = [
  "prelude",
  "understanding",
  "systems",
  "harmony",
  "complexity",
  "validation",
  "emergence",
  "intelligence",
  "consciousness",
  "reasoning",
  "manifestation",
  "singularity",
  "existence",
  "epilogue",
];

function cleanText(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/Philosophiae Naturalis Principia Systematica\s+Human Systems/g, "")
    .replace(/Working Draft — 2025\d*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitEssays(text) {
  const marker =
    /(?:^|\n)(P R E L U D E|E S S A Y\s+[IVXLC ]+|E P I L O G U E)(?=\n)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = marker.exec(text)) !== null) {
    if (parts.length) {
      parts[parts.length - 1].body = text.slice(lastIndex, match.index).trim();
    }
    parts.push({ marker: match[1], body: "" });
    lastIndex = match.index + match[0].length;
  }

  if (parts.length) {
    parts[parts.length - 1].body = text.slice(lastIndex).trim();
  }

  return parts;
}

function toMarkdown(raw) {
  const lines = raw.split("\n");
  const output = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    if (
      /^P R E L U D E$|^E S S A Y|^E P I L O G U E$/.test(line) ||
      /^On (Understanding|Systems|Harmony|Complexity|Validation|Emergent Effects|Intelligence|Consciousness|Reasoning|Manifestation|Singularity|Existence)$/.test(
        line
      ) ||
      /^The Journey Is More Valuable|^Value to Be Taken$/.test(line) ||
      /^[A-Z]( [A-Z]){2,}( · [A-Z]( [A-Z]){2,})*$/.test(line)
    ) {
      i++;
      continue;
    }

    if (/^— /.test(line)) {
      output.push(line);
      i++;
      continue;
    }

    if (/^(U|SY|H|CX|V|E|I|C|R|M|SI|EX)\d/.test(line)) {
      const code = line.match(/^(U|SY|H|CX|V|E|I|C|R|M|SI|EX)\d+/)?.[0] || "";
      output.push(`> **${code}** ${line.slice(code.length).trim()}`);
      i++;
      continue;
    }

    const looksLikeHeader =
      /^[A-Z][A-Za-z0-9 ,;:'()\-—–]+$/.test(line) &&
      line.length < 90 &&
      !line.endsWith(".") &&
      !/^(U|SY|H|CX|V|E|I|C|R|M|SI|EX)\d/.test(line) &&
      /^[a-z(]/.test(lines[i + 1]?.trim() || "");

    if (looksLikeHeader) {
      output.push(`## ${line}`);
      i++;
      continue;
    }

    const para = [];
    while (i < lines.length) {
      const current = lines[i].trim();
      if (!current) break;
      const nextHeader =
        /^[A-Z][A-Za-z0-9 ,;:'()\-—–]+$/.test(current) &&
        current.length < 90 &&
        !current.endsWith(".") &&
        !/^(U|SY|H|CX|V|E|I|C|R|M|SI|EX)\d/.test(current) &&
        /^[a-z(]/.test(lines[i + 1]?.trim() || "");
      if (nextHeader && para.length > 0) break;
      para.push(current.replace(/\s{2,}/g, " "));
      i++;
    }

    if (para.length) {
      output.push(para.join(" "));
      output.push("");
    }
  }

  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

async function main() {
  const buffer = fs.readFileSync(pdfPath);
  const { text } = await pdf(buffer);
  const cleaned = cleanText(text);
  const parts = splitEssays(cleaned);

  if (parts.length !== SLUGS.length) {
    console.warn(`Expected ${SLUGS.length} essays, found ${parts.length}`);
  }

  fs.mkdirSync(outDir, { recursive: true });

  SLUGS.forEach((slug, index) => {
    const part = parts[index];
    if (!part) {
      console.warn(`Missing essay: ${slug}`);
      return;
    }
    const markdown = toMarkdown(part.body);
    fs.writeFileSync(path.join(outDir, `${slug}.md`), markdown);
    console.log(`${slug}: ${markdown.length} chars`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
