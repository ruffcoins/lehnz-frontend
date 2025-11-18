"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/features/shared/ui/card";
import { Badge } from "@/features/shared/ui/badge";
import { Button } from "@/features/shared/ui/button";
import { ArrowLeft, Calendar, Clock, User, Eye, Bookmark, Share2 } from "lucide-react";
import { useGuideBySlug } from "@/features/reader/hooks/useGuides";
import { FloatingActions } from "@/features/reader/components/FloatingActions";
import { CommentsSection } from "@/features/reader/components/CommentsSection";
import { SuggestedGuides } from "@/features/reader/components/SuggestedGuides";

export default function GuidePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: guide, isLoading } = useGuideBySlug(slug);

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading guide...</p>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-foreground mb-2 text-2xl font-bold">Guide not found</h1>
          <p className="text-muted-foreground mb-4">
            The guide you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push("/explore")}>Back to Explore</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-border from-muted/30 to-background border-b bg-gradient-to-b">
        <div className="container mx-auto max-w-6xl px-6 py-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Badge */}
            <Badge className="bg-primary text-primary-foreground mb-4">{guide.category}</Badge>

            {/* Title */}
            <h1 className="text-foreground mb-4 text-4xl leading-tight font-bold md:text-5xl">
              {guide.title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-6 text-xl leading-relaxed">
              {guide.description}
            </p>

            {/* Meta Info */}
            <div className="text-muted-foreground mb-6 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <User className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">{guide.author.name}</p>
                  <p className="text-xs">{guide.author.bio}</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{guide.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{guide.stats.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="bg-background">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="flex gap-8">
          {/* Floating Actions - Desktop */}
          <div className="hidden w-16 flex-shrink-0 lg:block">
            <FloatingActions
              guideId={guide.id}
              authorId={guide.author.id}
              isBookmarked={guide.isBookmarked}
            />
          </div>

          {/* Content */}
          <div className="max-w-4xl flex-1">
            {/* Problem Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <Card className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-foreground mb-6 text-3xl font-bold">Problem & Overview</h2>
                  <div
                    className="text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: guide.content.problemOverview }}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Technical Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <Card className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-foreground mb-6 text-3xl font-bold">Technical Solution</h2>
                  <div
                    className="text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: guide.content.technicalSolution }}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Mobile Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 lg:hidden"
            >
              <Card className="p-4">
                <div className="flex justify-center gap-2">
                  <Button variant="outline" className="flex-1">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <User className="mr-2 h-4 w-4" />
                    Follow
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Comments Section */}
            <div className="mb-12">
              <CommentsSection guideId={guide.id} />
            </div>

            {/* Suggested Guides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SuggestedGuides currentGuideId={guide.id} tags={guide.tags} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Prose */}
      <style jsx global>{`
        .prose h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
        }
        .prose ul,
        .prose ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose pre {
          background-color: hsl(var(--muted));
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .prose code {
          background-color: hsl(var(--muted));
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
