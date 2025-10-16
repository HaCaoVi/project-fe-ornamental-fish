interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article
      className="prose prose-lg prose-slate dark:prose-invert max-w-none
      prose-headings:text-foreground prose-headings:font-semibold
      prose-p:text-foreground prose-p:leading-relaxed
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-foreground prose-strong:font-semibold
      prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-muted prose-pre:border prose-pre:border-border
      prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
      prose-img:rounded-xl prose-img:shadow-lg
      prose-ul:text-foreground prose-ol:text-foreground
      prose-li:text-foreground prose-li:leading-relaxed
    "
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
