"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/features/shared/ui/card";
import { Button } from "@/features/shared/ui/button";
import { Textarea } from "@/features/shared/ui/textarea";
import { User, Send, MessageCircle } from "lucide-react";
import { useUser } from "@/features/auth/context/UserContext";
import { Comment } from "../types";

interface CommentsSectionProps {
  guideId: string;
  comments?: Comment[];
}

// Mock comments
const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "Excellent guide! The production architecture examples were particularly helpful. We implemented a similar RAG system at my company and this would have saved us weeks of trial and error.",
    author: {
      id: "c1",
      name: "David Kim",
      avatar: "/avatars/david.jpg",
    },
    createdAt: "2024-01-16T08:30:00Z",
    updatedAt: "2024-01-16T08:30:00Z",
  },
  {
    id: "2",
    content:
      "Quick question: How do you handle vector database scaling when you have millions of documents? Any recommendations for specific vector databases?",
    author: {
      id: "c2",
      name: "Emma Thompson",
      avatar: "/avatars/emma.jpg",
    },
    createdAt: "2024-01-16T10:15:00Z",
    updatedAt: "2024-01-16T10:15:00Z",
  },
  {
    id: "3",
    content:
      "Great write-up. Would love to see a follow-up on monitoring and observability for RAG systems in production. That's been a challenge for our team.",
    author: {
      id: "c3",
      name: "Michael Rodriguez",
      avatar: "/avatars/michael.jpg",
    },
    createdAt: "2024-01-16T14:45:00Z",
    updatedAt: "2024-01-16T14:45:00Z",
  },
];

export function CommentsSection({ guideId, comments = mockComments }: CommentsSectionProps) {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNewComment("");
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8">
        <div className="mb-6 flex items-center gap-2">
          <MessageCircle className="text-primary h-5 w-5" />
          <h2 className="text-foreground text-2xl font-bold">Discussion ({comments.length})</h2>
        </div>

        {/* Comment Form */}
        {user ? (
          <div className="mb-8">
            <form onSubmit={handleSubmit}>
              <Textarea
                placeholder="Share your thoughts or ask a question..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="mb-3 min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <Card className="bg-muted/30 mb-8 border-dashed p-6">
            <p className="text-muted-foreground text-center">
              Please sign in to join the discussion
            </p>
          </Card>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-border flex gap-4 border-b pb-6 last:border-0 last:pb-0"
            >
              <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                <User className="text-primary h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-foreground font-semibold">{comment.author.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-foreground leading-relaxed">{comment.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {comments.length === 0 && !user && (
          <div className="py-12 text-center">
            <MessageCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12 opacity-50" />
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
