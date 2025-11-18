"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/features/shared/ui/card";
import { Badge } from "@/features/shared/ui/badge";
import { Button } from "@/features/shared/ui/button";
import { User, Clock, Eye, Heart, Bookmark } from "lucide-react";
import { Guide } from "../types";
import Link from "next/link";

interface GuideCardProps {
  guide: Guide;
  index?: number;
  onBookmark?: (guideId: string, bookmarked: boolean) => void;
}

export function GuideCard({ guide, index = 0, onBookmark }: GuideCardProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(guide.isBookmarked || false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onBookmark?.(guide.id, newState);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/guide/${guide.slug}`}>
        <Card className="group flex h-full cursor-pointer flex-col p-6 transition-all hover:shadow-lg">
          <div className="flex-1">
            {/* Category Badge */}
            <div className="mb-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {guide.category}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-xl font-semibold transition-colors">
              {guide.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{guide.excerpt}</p>

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
                <Badge key={tag} variant="secondary" className="bg-muted hover:bg-muted/80 text-xs">
                  {tag}
                </Badge>
              ))}
              {guide.tags.length > 3 && (
                <Badge variant="secondary" className="bg-muted text-xs">
                  +{guide.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="border-border flex items-center justify-between border-t pt-4">
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{guide.stats.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{guide.stats.likes}</span>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleBookmark}>
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
