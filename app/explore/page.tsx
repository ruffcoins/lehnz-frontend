"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/features/auth/context/UserContext";
import { Button } from "@/features/shared/ui/button";
import { Search, Loader2 } from "lucide-react";
import { GuideCard } from "@/features/reader/components/GuideCard";
import { GuideCardSkeleton } from "@/features/reader/components/GuideCardSkeleton";
import { FilterBar } from "@/features/reader/components/FilterBar";
import { TopCreatorsSidebar } from "@/features/reader/components/TopCreatorsSidebar";
import { RecentlyPublishedSidebar } from "@/features/reader/components/RecentlyPublishedSidebar";
import { useGuides, useBookmarkGuide } from "@/features/reader/hooks/useGuides";
import { TagFilter, SortOption, Guide } from "@/features/reader/types";

export default function ExplorePage() {
  const { isLoading: userLoading } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagFilter[]>(["All"]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  const { data: guidesData, isLoading: guidesLoading } = useGuides({
    search: searchQuery,
    tags: selectedTags,
    sort: sortBy,
    page,
    limit: 12,
  });

  const bookmarkMutation = useBookmarkGuide();

  const handleBookmark = (guideId: string, bookmarked: boolean) => {
    bookmarkMutation.mutate({ guideId, bookmarked });
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedTags, sortBy]);

  if (userLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="from-muted/50 to-background border-border border-b bg-gradient-to-b">
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Explore AI/ML Engineering Guides
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Production-ready guides from experienced engineers. Learn, build, and ship real AI/ML
              systems.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-2xl"
          >
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
              <input
                type="text"
                placeholder="Search guides by title, topic, or keyword..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border-2 py-4 pr-4 pl-12 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Feed */}
          <div>
            {/* Featured Guides */}
            {!searchQuery && selectedTags.includes("All") && (
              <div className="mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-foreground mb-6 text-3xl font-bold"
                >
                  Featured Guides
                </motion.h2>

                {guidesLoading ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map(i => (
                      <GuideCardSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {guidesData?.guides.slice(0, 3).map((guide: Guide, index: number) => (
                      <GuideCard
                        key={guide.id}
                        guide={guide}
                        index={index + 1}
                        onBookmark={handleBookmark}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-8"
            >
              <FilterBar
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </motion.div>

            {/* All Guides */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-6 flex items-center justify-between"
              >
                <h2 className="text-foreground text-2xl font-bold">
                  {searchQuery ? `Search Results` : `All Guides`}
                </h2>
                {guidesData && (
                  <span className="text-muted-foreground text-sm">
                    {guidesData.total} {guidesData.total === 1 ? "guide" : "guides"}
                  </span>
                )}
              </motion.div>

              {guidesLoading && page === 1 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <GuideCardSkeleton key={i} />
                  ))}
                </div>
              ) : guidesData?.guides.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="py-12 text-center"
                >
                  <p className="text-muted-foreground mb-4 text-lg">
                    No guides found matching your criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTags(["All"]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8 grid gap-6 md:grid-cols-2">
                    {guidesData?.guides.map((guide: Guide, index: number) => (
                      <GuideCard
                        key={guide.id}
                        guide={guide}
                        index={index}
                        onBookmark={handleBookmark}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {guidesData?.hasMore && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex justify-center"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleLoadMore}
                        disabled={guidesLoading}
                        className="min-w-[200px]"
                      >
                        {guidesLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Load More Guides"
                        )}
                      </Button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TopCreatorsSidebar />
            <RecentlyPublishedSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
