import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "Philosophiae_Naturalis_Principia_Systematica.md");
const outDir = path.join(root, "content", "essays");
const catalogPath = path.join(root, "content", "releases.json");

const ESSAYS = [
  { slug: "prelude", num: "00", header: "# Prelude — The Journey Is More Valuable Than the Goal", tag: "Prologue", dot: "#7F77DD", laws: ["U2", "SY3"] },
  { slug: "understanding", num: "01", header: "# Essay I — On Understanding", tag: "Philosophy", dot: "#5E8CC2", laws: ["U1", "U2", "U3"] },
  { slug: "systems", num: "02", header: "# Essay II — On Systems", tag: "Systems Theory", dot: "#1D9E75", laws: ["SY1", "SY2", "SY3"] },
  { slug: "harmony", num: "03", header: "# Essay III — On Harmony", tag: "Interoperability", dot: "#BA7517", laws: ["H1", "H2", "H3"] },
  { slug: "complexity", num: "04", header: "# Essay IV — On Complexity", tag: "Complexity", dot: "#D4537E", laws: ["CX1", "CX2", "CX3"] },
  { slug: "validation", num: "05", header: "# Essay V — On Validation", tag: "Epistemics", dot: "#639922", laws: ["V1", "V2", "V3"] },
  { slug: "emergence", num: "06", header: "# Essay VI — On Emergent Effects", tag: "Emergence", dot: "#7F77DD", laws: ["E1", "E2", "E3"] },
  { slug: "intelligence", num: "07", header: "# Essay VII — On Intelligence", tag: "Intelligence", dot: "#2E9E8A", laws: ["I1", "I2", "I3"] },
  { slug: "consciousness", num: "08", header: "# Essay VIII — On Consciousness", tag: "Consciousness", dot: "#D85A30", laws: ["C1", "C2", "C3"] },
  { slug: "reasoning", num: "09", header: "# Essay IX — On Reasoning", tag: "Inference", dot: "#378ADD", laws: ["R1", "R2", "R3"] },
  { slug: "manifestation", num: "10", header: "# Essay X — On Manifestation", tag: "Causation", dot: "#1D9E75", laws: ["M1", "M2", "M3"] },
  { slug: "singularity", num: "11", header: "# Essay XI — On Singularity", tag: "Singularity", dot: "#C25A8A", laws: ["SI1", "SI2", "SI3"] },
  { slug: "existence", num: "12", header: "# Essay XII — On Existence", tag: "Cosmology", dot: "#888780", laws: ["EX1", "EX2", "EX3"] },
  { slug: "epilogue", num: "EP", header: "# Epilogue — Value to Be Taken", tag: "Epilogue", dot: "#5E8CC2", laws: [] },
];

function loadCatalogDefaults() {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const latest = catalog.releases[catalog.releases.length - 1];
  return {
    version: catalog.currentVersion,
    updated: latest?.publishedAt ?? new Date().toISOString().slice(0, 10),
  };
}

function readExistingVersionMeta(slug) {
  const file = path.join(outDir, `${slug}.md`);
  if (!fs.existsSync(file)) return {};
  const { data } = matter(fs.readFileSync(file, "utf8"));
  return {
    version: data.version,
    updated: data.updated,
  };
}

function extractTitle(header) {
  return header.replace(/^#\s+/, "").trim();
}

function extractLogline(body) {
  const match = body.match(/^>\s*(.+)$/m);
  return match ? match[1].trim() : "";
}

function frontmatter(essay, body, versionMeta) {
  const title = extractTitle(essay.header);
  const logline = extractLogline(body);
  const lines = [
    "---",
    `slug: ${essay.slug}`,
    `num: "${essay.num}"`,
    `title: "${title.replace(/"/g, '\\"')}"`,
    `tag: "${essay.tag}"`,
    `dot: "${essay.dot}"`,
    `laws: [${essay.laws.map((l) => `"${l}"`).join(", ")}]`,
    `version: "${versionMeta.version}"`,
    `updated: "${versionMeta.updated}"`,
  ];
  if (logline) {
    lines.push(`logline: "${logline.replace(/"/g, '\\"')}"`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

function main() {
  const defaults = loadCatalogDefaults();
  const text = fs.readFileSync(source, "utf8");
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < ESSAYS.length; i++) {
    const essay = ESSAYS[i];
    const start = text.indexOf(essay.header);
    if (start === -1) {
      console.error(`Could not find: ${essay.header}`);
      process.exit(1);
    }

    const nextHeader = ESSAYS[i + 1]?.header;
    const end = nextHeader ? text.indexOf(nextHeader) : text.length;
    let body = text.slice(start, end).trim();
    body = body.replace(/\n---\s*$/, "").trim();

    const existing = readExistingVersionMeta(essay.slug);
    const versionMeta = {
      version: existing.version ?? defaults.version,
      updated: existing.updated ?? defaults.updated,
    };

    const output = frontmatter(essay, body, versionMeta) + body + "\n";
    fs.writeFileSync(path.join(outDir, `${essay.slug}.md`), output);
    console.log(`${essay.slug}: v${versionMeta.version} · ${versionMeta.updated}`);
  }
}

main();
