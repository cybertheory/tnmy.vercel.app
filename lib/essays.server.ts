import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Essay, EssayMeta } from "./essays";

const ESSAY_ORDER = [
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

const essaysDir = path.join(process.cwd(), "content", "essays");

function readEssay(slug: string): Essay {
  const filePath = path.join(essaysDir, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as EssayMeta), content: content.trim() };
}

export function getAllEssays(): Essay[] {
  return ESSAY_ORDER.map(readEssay);
}

export function getAllEssaySlugs(): string[] {
  return ESSAY_ORDER;
}

export function getEssayBySlug(slug: string): Essay | null {
  if (!ESSAY_ORDER.includes(slug)) return null;
  return readEssay(slug);
}

export function getEssayMeta(): EssayMeta[] {
  return getAllEssays().map(({ content, ...meta }) => meta);
}
