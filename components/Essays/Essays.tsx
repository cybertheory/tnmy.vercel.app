import Link from "next/link";
import { EssayMeta } from "../../lib/essays";
import styles from "./Essays.module.css";

const Essays = ({ essays }: { essays: EssayMeta[] }) => {
  return <EssayGrid essays={essays} />;
};

export default Essays;

function EssayGrid({ essays }: { essays: EssayMeta[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full">
      {essays.map((essay) => (
        <EssayCard key={essay.slug} essay={essay} />
      ))}
    </div>
  );
}

const EssayCard = ({ essay }: { essay: EssayMeta }) => {
  const label =
    essay.num === "EP" ? "EP" : essay.slug === "prelude" ? "Prelude" : essay.num;
  const shortTitle = essay.title
    .replace(/^Essay [IVXLC]+ — /, "")
    .replace(/^Prelude — /, "")
    .replace(/^Epilogue — /, "");

  return (
    <Link href={`/essays/${essay.slug}`} className="block w-full">
      <div
        style={{
          backgroundColor: `${essay.dot}22`,
          borderColor: `${essay.dot}55`,
          color: essay.dot,
        }}
        className={`${styles.essay} relative cursor-pointer rounded-md flex flex-col items-start justify-between p-3 sm:p-4 border w-full aspect-square text-xs sm:text-sm leading-snug`}
      >
        <span className="text-[10px] sm:text-xs font-semibold opacity-70">{label}</span>
        <span className="font-medium text-neutral-100 leading-snug line-clamp-3 text-[13px] sm:text-sm">
          {shortTitle}
        </span>
        <span className="text-[10px] sm:text-xs opacity-60 line-clamp-1">{essay.tag}</span>
      </div>
    </Link>
  );
};
