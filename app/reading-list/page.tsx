"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/auth/context/UserContext";
import { Card } from "@/features/shared/ui/card";
import { Button } from "@/features/shared/ui/button";
import { Badge } from "@/features/shared/ui/badge";
import { BookOpen, Trash2, User, Clock, Eye, Heart, Filter } from "lucide-react";
import { useSavedGuides, useRemoveFromReadingList } from "@/features/reader/hooks/useSavedGuides";
import Link from "next/link";
import { Guide, TagFilter } from "@/features/reader/types";

const availableTags: TagFilter[] = [
  "All",
  "LLMs",
  "MLOps",
  "NLP",
  "Computer Vision",
  "Data Engineering",
];

export default function ReadingListPage() {
  const { isLoading: userLoading } = useUser();
  const router = useRouter();
  const { data: savedGuides, isLoading } = useSavedGuides();
  const removeMutation = useRemoveFromReadingList();

  const [selectedTag, setSelectedTag] = useState<TagFilter>("All");

  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!userLoading && !user) {
  //     router.push("/onboarding");
  //   }
  // }, [user, userLoading, router]);

  const handleRemove = async (guideId: string) => {
    if (confirm("Remove this guide from your reading list?")) {
      await removeMutation.mutateAsync(guideId);
    }
  };

  const filteredGuides =
    selectedTag === "All"
      ? savedGuides
      : savedGuides?.filter(
          (guide: Guide) => guide.category === selectedTag || guide.tags.includes(selectedTag)
        );

  if (userLoading || isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading your reading list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="from-muted/50 to-background border-border border-b bg-gradient-to-b">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                <BookOpen className="text-primary h-6 w-6" />
              </div>
              <div>
                <h1 className="text-foreground text-4xl font-bold">Reading List</h1>
                <p className="text-muted-foreground">
                  {savedGuides?.length || 0} saved {savedGuides?.length === 1 ? "guide" : "guides"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        {savedGuides && savedGuides.length > 0 ? (
          <>
            {/* Filter by Topic */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <div className="mb-4 flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <h3 className="text-foreground text-sm font-medium">Filter by Topic</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedTag === tag ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Saved Guides Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredGuides?.map((guide: Guide, index: number) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="group relative p-6 transition-all hover:shadow-lg">
                    <Link href={`/guide/${guide.slug}`} className="block">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {guide.category}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-xl font-semibold transition-colors">
                        {guide.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {guide.excerpt}
                      </p>

                      {/* Author & Meta */}
                      <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
                        <User className="h-4 w-4" />
                        <span>{guide.author.name}</span>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>{guide.readTime}</span>
                      </div>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {guide.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-muted text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {guide.tags.length > 3 && (
                          <Badge variant="secondary" className="bg-muted text-xs">
                            +{guide.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="text-muted-foreground border-border flex items-center gap-4 border-t pt-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{guide.stats.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{guide.stats.likes}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={e => {
                        e.preventDefault();
                        handleRemove(guide.id);
                      }}
                      disabled={removeMutation.isPending}
                    >
                      <Trash2 className="text-destructive h-4 w-4" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredGuides?.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="py-12 text-center"
              >
                <p className="text-muted-foreground mb-4 text-lg">
                  No guides found in this category
                </p>
                <Button variant="outline" onClick={() => setSelectedTag("All")}>
                  Show All
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-20 text-center"
          >
            <div className="mx-auto max-w-md">
              <div className="bg-muted mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <BookOpen className="text-muted-foreground h-10 w-10" />
              </div>
              <h2 className="text-foreground mb-3 text-2xl font-bold">
                Your reading list is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Start building your collection of guides to read later. Click the bookmark icon on
                any guide to save it here.
              </p>
              <Button size="lg" onClick={() => router.push("/explore")}>
                Explore Guides
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
