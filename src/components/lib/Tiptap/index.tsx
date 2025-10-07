"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "@components/ui/button"
import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Highlighter,
    LinkIcon,
} from "lucide-react"
import { cn } from "@components/lib/utils"

interface TiptapProps {
    content?: string
    onChange?: (content: string) => void
    placeholder?: string
    className?: string
}

const Tiptap = ({
    content = "",
    onChange,
    placeholder = "Write something amazing...",
    className,
}: TiptapProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline cursor-pointer",
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    const addLink = () => {
        const url = window.prompt("Enter URL:")
        if (url) {
            editor.chain().focus().setLink({ href: url }).run()
        }
    }

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-muted/50 p-2">
                {/* Text Formatting */}
                <div className="flex items-center gap-1 border-r border-border pr-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("bold") && "bg-accent")}
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("italic") && "bg-accent")}
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("underline") && "bg-accent")}
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("strike") && "bg-accent")}
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("code") && "bg-accent")}
                    >
                        <Code className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("highlight") && "bg-accent")}
                    >
                        <Highlighter className="h-4 w-4" />
                    </Button>
                </div>

                {/* Headings */}
                <div className="flex items-center gap-1 border-r border-border pr-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 1 }) && "bg-accent")}
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 2 }) && "bg-accent")}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 3 }) && "bg-accent")}
                    >
                        <Heading3 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Lists */}
                <div className="flex items-center gap-1 border-r border-border pr-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("bulletList") && "bg-accent")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("orderedList") && "bg-accent")}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("blockquote") && "bg-accent")}
                    >
                        <Quote className="h-4 w-4" />
                    </Button>
                </div>

                {/* Alignment */}
                <div className="flex items-center gap-1 border-r border-border pr-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: "left" }) && "bg-accent")}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: "center" }) && "bg-accent")}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: "right" }) && "bg-accent")}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Link */}
                <div className="flex items-center gap-1 border-r border-border pr-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addLink}
                        className={cn("h-8 w-8 p-0", editor.isActive("link") && "bg-accent")}
                    >
                        <LinkIcon className="h-4 w-4" />
                    </Button>
                </div>

                {/* Undo/Redo */}
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="h-8 w-8 p-0"
                    >
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="h-8 w-8 p-0"
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Editor */}
            <div className="rounded-lg border border-border bg-background">
                <div className="max-h-[200px] overflow-auto rounded-lg">
                    <EditorContent
                        editor={editor}
                        className="prose prose-sm max-w-none p-4 focus:outline-none dark:prose-invert
      [&_.ProseMirror]:min-h-[100px]
      [&_.ProseMirror]:outline-none
      [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground
      [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
      [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
      [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
      [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
                    />
                </div>
            </div>

        </div>
    )
}

export default Tiptap
