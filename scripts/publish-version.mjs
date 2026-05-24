#!/usr/bin/env node
/**
 * Record a new published version of the working draft.
 *
 * Usage:
 *   node scripts/publish-version.mjs 0.2.0 "Summary of this release"
 *   node scripts/publish-version.mjs 0.2.0 "Summary" --changes "Change one" --changes "Change two"
 *
 * Then commit, tag, and push:
 *   git add content/releases.json content/essays/
 *   git commit -m "Publish v0.2.0"
 *   git tag v0.2.0
 *   git push blog main --tags
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const catalogPath = path.join(root, "content", "releases.json");
const essaysDir = path.join(root, "content", "essays");

const ESSAY_SLUGS = [
  "prelude", "understanding", "systems", "harmony", "complexity", "validation",
  "emergence", "intelligence", "consciousness", "reasoning", "manifestation",
  "singularity", "existence", "epilogue",
];

function parseArgs(argv) {
  const positional = [];
  const changes = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--changes") {
      changes.push(argv[++i]);
    } else {
      positional.push(argv[i]);
    }
  }
  return { version: positional[0], summary: positional[1] ?? "", changes };
}

function gitShortSha() {
  try {
    return execSync("git rev-parse --short HEAD", { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function updateEssayFrontmatter(slug, version, updated) {
  const filePath = path.join(essaysDir, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  data.version = version;
  data.updated = updated;
  const lines = ["---"];
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((v) => `"${v}"`).join(", ")}]`);
    } else if (typeof value === "string") {
      lines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push("---", "");
  fs.writeFileSync(filePath, lines.join("\n") + content.trim() + "\n");
}

function main() {
  const { version, summary, changes } = parseArgs(process.argv.slice(2));
  if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
    console.error("Usage: node scripts/publish-version.mjs <semver> [summary] [--changes \"item\"]...");
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const publishedAt = todayIso();
  const commit = gitShortSha();
  const tag = `v${version}`;

  if (catalog.releases.some((r) => r.version === version)) {
    console.error(`Version ${version} already exists in releases.json`);
    process.exit(1);
  }

  catalog.currentVersion = version;
  catalog.releases.push({
    version,
    publishedAt,
    commit,
    tag,
    summary: summary || `Published version ${version}.`,
    changes: changes.length ? changes : undefined,
  });

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n");

  for (const slug of ESSAY_SLUGS) {
    updateEssayFrontmatter(slug, version, publishedAt);
  }

  console.log(`Published v${version} (${commit}) on ${publishedAt}`);
  console.log("\nNext steps:");
  console.log(`  git add content/releases.json content/essays/`);
  console.log(`  git commit -m "Publish v${version}"`);
  console.log(`  git tag v${version}`);
  console.log(`  git push blog main --tags`);
}

main();
