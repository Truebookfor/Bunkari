// Halka content renderer: "## " se shuru hone wali line = heading,
// baaki blocks = paragraph. Bina external markdown library ke.

export function ArticleContent({ content }: { content: string }) {
  const blocks = content.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="heading-serif text-2xl sm:text-3xl text-cocoa"
            >
              {trimmed.replace(/^##\s+/, "")}
            </h2>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-cocoa/75">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
