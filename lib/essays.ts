export type EssayMeta = {
  slug: string;
  num: string;
  title: string;
  tag: string;
  dot: string;
  laws: string[];
  logline?: string;
  version: string;
  updated: string;
};

export type Essay = EssayMeta & {
  content: string;
};
