import Link from "next/link";
import SocialHead from "../components/SEO/SocialHead";
import {
  Release,
  ReleaseCatalog,
  formatVersionDate,
  githubBlobUrl,
  githubCommitUrl,
  githubTagUrl,
  githubTreeUrl,
} from "../lib/versions";
import { getReleaseCatalog } from "../lib/versions.server";

type Props = {
  catalog: ReleaseCatalog;
};

export default function VersionsPage({ catalog }: Props) {
  const releases = [...catalog.releases].reverse();

  return (
    <>
      <SocialHead
        title="Version History"
        description="Published versions of the Human Systems working draft, with links to archived source on GitHub."
        path="/versions"
      />
      <div className="mt-4 sm:mt-8">
        <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-100 mb-6 inline-block">
          ← back
        </Link>

        <p className="text-sm text-neutral-400 mb-2 tracking-wide">Human Systems · Working Draft</p>
        <h1 className="text-2xl sm:text-3xl font-medium mb-3">Version History</h1>
        <p className="text-neutral-400 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xl">
          Each published version is archived on GitHub. Current draft:{" "}
          <span className="text-neutral-200 font-medium">v{catalog.currentVersion}</span>.
        </p>

        <div className="space-y-4">
          {releases.map((release) => (
            <ReleaseCard key={release.version} release={release} repo={catalog.githubRepo} />
          ))}
        </div>

        <p className="text-xs text-neutral-600 mt-10">
          To publish a new version:{" "}
          <code className="text-neutral-500">node scripts/publish-version.mjs x.y.z &quot;summary&quot;</code>
        </p>
      </div>
    </>
  );
}

function ReleaseCard({ release, repo }: { release: Release; repo: string }) {
  const ref = release.tag ?? release.commit;

  return (
    <article className="rounded-md border border-neutral-800 bg-neutral-900/40 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium text-neutral-100">v{release.version}</h2>
          <p className="text-xs text-neutral-500 mt-1">{formatVersionDate(release.publishedAt)}</p>
        </div>
        <span className="text-xs font-mono text-neutral-600">{release.commit}</span>
      </div>

      <p className="text-sm text-neutral-300 leading-relaxed mt-4">{release.summary}</p>

      {release.changes && release.changes.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-neutral-400 list-disc pl-5">
          {release.changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-2.5 text-xs sm:text-sm">
        <GithubLink href={githubCommitUrl(repo, release.commit)} label="commit" />
        {release.tag && <GithubLink href={githubTagUrl(repo, release.tag)} label="release tag" />}
        <GithubLink href={githubTreeUrl(repo, ref, "content/essays")} label="essays snapshot" />
        <GithubLink
          href={githubBlobUrl(repo, ref, "Philosophiae_Naturalis_Principia_Systematica.md")}
          label="manuscript"
        />
        <GithubLink
          href={githubBlobUrl(repo, ref, "public/book/Philosophiae_Naturalis_Principia_Systematica.pdf")}
          label="PDF"
        />
      </div>
    </article>
  );
}

function GithubLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-3 py-1.5 rounded-md border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-neutral-100 transition"
    >
      {label} ↗
    </a>
  );
}

export async function getStaticProps() {
  return { props: { catalog: getReleaseCatalog() } };
}
