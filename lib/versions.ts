export type Release = {
  version: string;
  publishedAt: string;
  commit: string;
  tag?: string;
  summary: string;
  changes?: string[];
};

export type ReleaseCatalog = {
  currentVersion: string;
  githubRepo: string;
  releases: Release[];
};

export function formatVersionDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function githubCommitUrl(repo: string, commit: string) {
  return `https://github.com/${repo}/commit/${commit}`;
}

export function githubTagUrl(repo: string, tag: string) {
  return `https://github.com/${repo}/releases/tag/${tag}`;
}

export function githubTreeUrl(repo: string, ref: string, treePath: string) {
  return `https://github.com/${repo}/tree/${ref}/${treePath}`;
}

export function githubBlobUrl(repo: string, ref: string, filePath: string) {
  return `https://github.com/${repo}/blob/${ref}/${filePath}`;
}
