"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/features/shared/ui/card";
import { Badge } from "@/features/shared/ui/badge";
import { User, Clock, TrendingUp } from "lucide-react";
import { Guide } from "../types";
import Link from "next/link";

interface FeaturedGuideCardProps {
  guide: Guide;
  index?: number;
}

export function FeaturedGuideCard({ guide, index = 0 }: FeaturedGuideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/guide/${guide.slug}`}>
        <Card className="group from-background to-muted/30 flex h-full cursor-pointer flex-col bg-gradient-to-br p-8 transition-all hover:shadow-2xl">
          <div className="flex-1">
            {/* Featured Badge */}
            <div className="mb-4 flex items-center gap-2">
              <Badge className="bg-primary text-primary-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                Featured
              </Badge>
              <Badge variant="outline" className="bg-background">
                {guide.category}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-foreground group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
              {guide.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-6 line-clamp-3">{guide.description}</p>

            {/* Author & Meta */}
            <div className="text-muted-foreground mb-4 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{guide.author.name}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{guide.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {guide.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-background hover:bg-muted transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="border-border mt-6 flex items-center gap-6 border-t pt-6 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <span className="text-foreground font-semibold">
                {guide.stats.views.toLocaleString()}
              </span>
              <span>views</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <span className="text-foreground font-semibold">{guide.stats.likes}</span>
              <span>likes</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <span className="text-foreground font-semibold">{guide.stats.bookmarks}</span>
              <span>saved</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
