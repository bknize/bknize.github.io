import { use, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { loadMarkdown } from "../lib/utils.ts";

// Module-level cache so the same promise is returned on every re-render,
// which is required for React's `use()` hook to work without infinite loops.
const markdownCache = new Map<string, Promise<string | null>>();

function getCachedMarkdown(filename: string): Promise<string | null> {
  if (!markdownCache.has(filename)) {
    markdownCache.set(filename, loadMarkdown(filename));
  }
  return markdownCache.get(filename)!;
}

function MarkdownContent({ filename }: { filename: string }) {
  const content = use(getCachedMarkdown(filename));
  if (!content) return null;

  return (
    <div
      className={[
        "prose prose-invert max-w-none",
        // Headings
        "prose-h1:text-white prose-h1:font-bold prose-h1:text-2xl prose-h1:mt-12 prose-h1:mb-4 prose-h1:first:mt-0",
        "prose-h2:text-white prose-h2:font-semibold prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-3",
        "prose-h3:text-gray-200 prose-h3:font-semibold prose-h3:text-base prose-h3:mt-8 prose-h3:mb-2",
        // Body copy
        "prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-[0.95rem]",
        // Lists
        "prose-ul:text-gray-300 prose-ul:text-[0.95rem]",
        "prose-ol:text-gray-300 prose-ol:text-[0.95rem]",
        "prose-li:leading-relaxed prose-li:my-1",
        // Strong / em
        "prose-strong:text-white prose-strong:font-semibold",
        "prose-em:text-gray-200",
        // Links
        "prose-a:text-cmyk-cyan prose-a:no-underline hover:prose-a:underline",
        // Horizontal rules
        "prose-hr:border-white/10",
        // Blockquotes
        "prose-blockquote:border-l-cmyk-cyan prose-blockquote:text-gray-400",
        // Remove prose default code styling so our custom `code` component wins
        "prose-code:before:content-none prose-code:after:content-none prose-code:bg-transparent prose-code:p-0",
      ].join(" ")}
    >
      <ReactMarkdown
        components={{
          code: ({ children }) => (
            <code className="font-mono text-[0.82em] bg-white/8 text-cmyk-cyan px-1.5 py-0.5 rounded-sm">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-white/4 border border-white/8 rounded-sm p-5 overflow-x-auto font-mono text-[0.82rem] text-gray-300 my-6">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-label="Loading content">
      <div className="h-6 bg-white/6 rounded w-1/3" />
      <div className="space-y-2.5">
        <div className="h-4 bg-white/4 rounded w-full" />
        <div className="h-4 bg-white/4 rounded w-[92%]" />
        <div className="h-4 bg-white/4 rounded w-[97%]" />
        <div className="h-4 bg-white/4 rounded w-[85%]" />
      </div>
      <div className="h-5 bg-white/6 rounded w-1/4 mt-8" />
      <div className="space-y-2.5">
        <div className="h-4 bg-white/4 rounded w-full" />
        <div className="h-4 bg-white/4 rounded w-[88%]" />
        <div className="h-4 bg-white/4 rounded w-[95%]" />
      </div>
      <div className="h-5 bg-white/6 rounded w-2/5 mt-8" />
      <div className="space-y-2">
        <div className="h-4 bg-white/4 rounded w-[90%]" />
        <div className="h-4 bg-white/4 rounded w-[75%]" />
        <div className="h-4 bg-white/4 rounded w-[82%]" />
        <div className="h-4 bg-white/4 rounded w-[60%]" />
      </div>
    </div>
  );
}

export function MarkdownBody({ filename }: { filename: string }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <MarkdownContent filename={filename} />
    </Suspense>
  );
}
