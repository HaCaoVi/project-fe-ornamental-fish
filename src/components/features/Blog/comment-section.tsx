"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Textarea } from "@components/ui/textarea"
import { Input } from "@components/ui/input"
import { Card } from "@components/ui/card"
import { MessageCircle } from "lucide-react"

interface CommentSectionProps {
  postSlug: string
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle comment submission
    console.log("Comment submitted:", { postSlug, name, comment })
    setName("")
    setComment("")
  }

  return (
    <Card className="p-6 md:p-8 border-border">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Leave a Comment</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="bg-background border-border"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-2">
            Comment
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={5}
            required
            className="bg-background border-border resize-none"
          />
        </div>

        <Button type="submit" size="lg" className="w-full md:w-auto">
          Post Comment
        </Button>
      </form>
    </Card>
  )
}
