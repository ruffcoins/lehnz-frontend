export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: {
    problemOverview: string;
    technicalSolution: string;
  };
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    role?: string;
  };
  tags: string[];
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  stats: {
    views: number;
    likes: number;
    bookmarks: number;
    comments?: number;
  };
  isFeatured?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

export interface TopCreator {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  stats: {
    guides: number;
    followers: number;
  };
  isFollowing?: boolean;
}

export type SortOption = "newest" | "most-viewed" | "trending";

export type TagFilter = "All" | "LLMs" | "MLOps" | "NLP" | "Computer Vision" | "Data Engineering";
