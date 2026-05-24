import Head from "next/head";
import Link from "next/link";
import { BsDownload, BsArrowRight } from "react-icons/bs";

const CONTENTS: [string, string][] = [
  ["prelude", "Prelude — The Journey Is More Valuable Than the Goal"],
  ["understanding", "I — On Understanding"],
  ["systems", "II — On Systems"],
  ["harmony", "III — On Harmony"],
  ["complexity", "IV — On Complexity"],
  ["validation", "V — On Validation"],
  ["emergence", "VI — On Emergent Effects"],
  ["intelligence", "VII — On Intelligence"],
  ["consciousness", "VIII — On Consciousness"],
  ["reasoning", "IX — On Reasoning"],
  ["manifestation", "X — On Manifestation"],
  ["singularity", "XI — On Singularity"],
  ["existence", "XII — On Existence"],
  ["epilogue", "Epilogue — Value to Be Taken"],
];

export default function ReadTheBook() {
  return (
    <>
      <Head>
        <title>Read The Book — Human Systems</title>
      </Head>
      <div className="mt-4 sm:mt-8">
        <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-100 mb-6 inline-block">
          ← back
        </Link>
        <p className="text-sm text-neutral-400 mb-2 tracking-wide">Human Systems · Working Draft</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3 leading-tight">
          Philosophiae Naturalis Principia Systematica
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg mb-1">Systemic Principles of Natural Philosophy</p>
        <p className="text-neutral-500 italic mb-8">The Latent Structure of Everything</p>

        <p className="text-neutral-300 leading-relaxed mb-4 text-[15px]">
          This is the working manuscript behind the Human Systems framework — an attempt to
          articulate the hidden skeleton beneath complex systems, intelligence, consciousness,
          and the universe itself. Twelve essays, bookended by a prelude and epilogue, trace a single arc from
          cognition to cosmos, each introducing formal laws offered as working hypotheses.
        </p>

        <p className="text-neutral-400 leading-relaxed mb-8 text-[15px]">
          The ideas here are not settled conclusions. They are offered in the spirit of the
          series&apos; central principle: that understanding advances through adversarial
          challenge, and that the most useful framework is one that can be wrong in ways
          that are informative.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-10 sm:mb-12">
          <a
            href="/book/Philosophiae_Naturalis_Principia_Systematica.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-md bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition text-sm font-medium"
          >
            <BsDownload /> download the book
          </a>
          <Link
            href="/#essays"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-md border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 transition text-sm text-neutral-300"
          >
            read online <BsArrowRight />
          </Link>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <h2 className="text-lg font-medium mb-4">Contents</h2>
          <ul className="space-y-2 text-sm text-neutral-400">
            {CONTENTS.map(([slug, title]) => (
              <li key={slug}>
                <Link
                  href={`/essays/${slug}`}
                  className="hover:text-neutral-100 underline-offset-2 hover:underline"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-neutral-600 mt-10">
          © 2026 Rishabh Singh. Working draft — subject to revision.
        </p>
      </div>
    </>
  );
}
