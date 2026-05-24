import Head from "next/head";
import Link from "next/link";
import Essays from "../components/Essays/Essays";
import HypothesisCard from "../components/Home/HypothesisCard/HypothesisCard";
import Profile from "../components/Home/Profile/Profile";
import userData from "../components/userData";
import { EssayMeta } from "../lib/essays";
import { getEssayMeta } from "../lib/essays.server";
import { BsDownload, BsArrowRight } from "react-icons/bs";

export default function Home({ essays }: { essays: EssayMeta[] }) {
  return (
    <>
      <Head>
        <title>Human Systems — Rishabh Singh</title>
      </Head>
      <Profile />
      <div className="mt-8 sm:mt-10 text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed">{userData.quote}</div>
      <HypothesisCard />

      <span id="essays" className="text-sm mb-3 text-neutral-400 mt-12 sm:mt-16">essays</span>
      <p className="text-neutral-400 text-sm mb-6 max-w-md">
        A prelude, twelve essays, and an epilogue — a working draft of systemic principles
        from understanding to existence.
      </p>
      <Essays essays={essays} />

      <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-neutral-800">
        <span className="text-sm mb-3 block text-neutral-400">working draft</span>
        <h2 className="text-lg sm:text-xl font-medium mb-2">Read The Book</h2>
        <p className="text-neutral-400 text-sm leading-relaxed mb-5 sm:mb-6">
          View the full manuscript — <em>Philosophiae Naturalis Principia Systematica</em> —
          in your browser, or read each essay online.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <Link
            href="/#essays"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-md bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition text-sm font-medium"
          >
            read online <BsArrowRight />
          </Link>
          <a
            href="/book/Philosophiae_Naturalis_Principia_Systematica.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-md border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 transition text-sm text-neutral-300"
          >
            <BsDownload /> download the book
          </a>
        </div>
      </div>

      <div className="border-t-2 h-6 w-full sm:w-5/12 mt-20 sm:mt-28 border-neutral-800" />
    </>
  );
}

export async function getStaticProps() {
  return { props: { essays: getEssayMeta() } };
}
