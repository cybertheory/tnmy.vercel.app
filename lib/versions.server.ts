import fs from "fs";
import path from "path";
import { ReleaseCatalog } from "./versions";

const catalogPath = path.join(process.cwd(), "content", "releases.json");

export function getReleaseCatalog(): ReleaseCatalog {
  const raw = fs.readFileSync(catalogPath, "utf8");
  return JSON.parse(raw) as ReleaseCatalog;
}

export function getCurrentVersion() {
  return getReleaseCatalog().currentVersion;
}
