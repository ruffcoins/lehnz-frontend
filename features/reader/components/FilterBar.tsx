"use client";

import React from "react";
import { Badge } from "@/features/shared/ui/badge";
import { Button } from "@/features/shared/ui/button";
import { TrendingUp, Clock } from "lucide-react";
import { TagFilter, SortOption } from "../types";

interface FilterBarProps {
  selectedTags: TagFilter[];
  onTagsChange: (tags: TagFilter[]) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const availableTags: TagFilter[] = [
  "All",
  "LLMs",
  "MLOps",
  "NLP",
  "Computer Vision",
  "Data Engineering",
];

export function FilterBar({ selectedTags, onTagsChange, sortBy, onSortChange }: FilterBarProps) {
  const toggleTag = (tag: TagFilter) => {
    if (tag === "All") {
      onTagsChange(["All"]);
      return;
    }

    let newTags: TagFilter[];
    if (selectedTags.includes(tag)) {
      newTags = selectedTags.filter(t => t !== tag);
      if (newTags.length === 0) {
        newTags = ["All"];
      }
    } else {
      newTags = selectedTags.filter(t => t !== "All");
      newTags.push(tag);
    }
    onTagsChange(newTags);
  };

  return (
    <div className="space-y-4">
      {/* Tags Filter */}
      <div>
        <h3 className="text-foreground mb-3 text-sm font-medium">Topics</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-foreground mb-3 text-sm font-medium">Sort By</h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("newest")}
            className="flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            Newest
          </Button>
          <Button
            variant={sortBy === "most-viewed" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("most-viewed")}
            className="flex items-center gap-1"
          >
            <TrendingUp className="h-3 w-3" />
            Most Viewed
          </Button>
          <Button
            variant={sortBy === "trending" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("trending")}
          >
            Trending
          </Button>
        </div>
      </div>
    </div>
  );
}
