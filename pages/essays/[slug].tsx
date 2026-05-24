import Link from "next/link";
import EssayContent from "../../components/Essays/EssayContent";
import SocialHead from "../../components/SEO/SocialHead";
import { getAllEssaySlugs, getEssayBySlug } from "../../lib/essays.server";
import { Essay } from "../../lib/essays";
import { formatVersionDate } from "../../lib/versions";
import { GetStaticPaths, GetStaticProps } from "next";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

type Props = {
  essay: Essay;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

const EssayPage = ({ essay, prev, next }: Props) => {
  const description =
    essay.logline ||
    `${essay.title} — a working essay from Human Systems on ${essay.tag.toLowerCase()}.`;

  return (
    <>
      <SocialHead
        title={essay.title}
        description={description}
        path={`/essays/${essay.slug}`}
        type="article"
      />
      <div className="mt-4 sm:mt-8">
        <Link
          href="/"
          className="text-sm text-neutral-400 hover:text-neutral-100 mb-6 inline-flex items-center gap-1"
        >
          <BsArrowLeft /> all essays
        </Link>
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-500">
          <span style={{ color: essay.dot }}>{essay.num} · {essay.tag}</span>
          {essay.laws.length > 0 && (
            <span>Laws: {essay.laws.join(", ")}</span>
          )}
          <span className="text-neutral-600">·</span>
          <span>
            v{essay.version} · updated {formatVersionDate(essay.updated)}
          </span>
          <Link href="/versions" className="text-neutral-400 hover:text-neutral-100 underline-offset-2 hover:underline">
            version history
          </Link>
        </div>
        <EssayContent content={essay.content} />
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between gap-4 text-sm">
          {prev ? (
            <Link
              href={`/essays/${prev.slug}`}
              className="text-neutral-400 flex items-center gap-2 hover:text-neutral-100"
            >
              <BsArrowLeft className="shrink-0" /> <span className="line-clamp-2">{prev.title.replace(/^Essay [IVXLC]+ — /, "").replace(/^Prelude — /, "").replace(/^Epilogue — /, "")}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/essays/${next.slug}`}
              className="text-neutral-400 flex items-center gap-2 hover:text-neutral-100 sm:text-right sm:justify-end"
            >
              <span className="line-clamp-2">{next.title.replace(/^Essay [IVXLC]+ — /, "").replace(/^Prelude — /, "").replace(/^Epilogue — /, "")}</span> <BsArrowRight className="shrink-0" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </>
  );
};

export default EssayPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllEssaySlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params!.slug as string;
  const essay = getEssayBySlug(slug);
  if (!essay) return { notFound: true };

  const slugs = getAllEssaySlugs();
  const index = slugs.indexOf(slug);
  const prevSlug = index > 0 ? slugs[index - 1] : null;
  const nextSlug = index < slugs.length - 1 ? slugs[index + 1] : null;

  const prev = prevSlug ? getEssayBySlug(prevSlug) : null;
  const next = nextSlug ? getEssayBySlug(nextSlug) : null;

  return {
    props: {
      essay,
      prev: prev ? { slug: prev.slug, title: prev.title } : null,
      next: next ? { slug: next.slug, title: next.title } : null,
    },
  };
};
