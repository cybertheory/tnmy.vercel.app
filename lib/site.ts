export const SITE_NAME = "Human Systems";

export const SITE_TAGLINE = "The Latent Structure of Everything";

export const SITE_DESCRIPTION =
  "A working draft on the latent structure of the universe and human existence — a prelude, twelve essays, and an epilogue on systemic principles from understanding to existence.";

export const SITE_AUTHOR = "Rishabh Singh";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://tnmy.vercel.app");

export const DEFAULT_OG_IMAGE = "/images/og.png";

export const GITHUB_REPO = "cybertheory/tnmy.vercel.app";

export function absoluteUrl(path: string) {
  return `${SITE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
