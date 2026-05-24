const HYPOTHESIS_EXTENSION_URL =
  "https://chromewebstore.google.com/detail/hypothesis-web-pdf-annota/bjfhmglciegochdpefhhlphglcehbmek";

const HypothesisCard = () => {
  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
      <a
        href={HYPOTHESIS_EXTENSION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded bg-neutral-100 px-3 py-2 mb-4"
        aria-label="Hypothesis — get the Chrome extension"
      >
        <img
          src="/idkAwE6xZ9_1779582411764.svg"
          alt="Hypothesis"
          className="h-5 sm:h-6 w-auto"
        />
      </a>
      <p className="text-sm sm:text-[15px] text-neutral-300 leading-relaxed mb-4">
        Add the{" "}
        <a
          href={HYPOTHESIS_EXTENSION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-100 hover:underline underline-offset-2"
        >
          Hypothesis Chrome extension
        </a>{" "}
        to highlight, annotate, and provide public feedback to the community.
      </p>
      <p className="text-sm text-neutral-400 leading-relaxed">
        This is a working draft, and I would appreciate input on these complex topics.
        As updates are made to the working drafts, more opportunities to comment will appear.
      </p>
    </div>
  );
};

export default HypothesisCard;
