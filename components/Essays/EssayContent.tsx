import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

const EssayContent = ({ content }: { content: string }) => {
  const html = marked.parse(content) as string;

  return (
    <article
      className="essay-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default EssayContent;
