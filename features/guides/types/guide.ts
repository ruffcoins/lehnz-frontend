export interface Guide {
  id: string;
  title: string;
  description: string;
  problemOverview: string;
  technicalSolution: string;
  slug: string;
  tags: string[];
  visibility: "public" | "draft" | "private";
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  stats: {
    views: number;
    likes: number;
    bookmarks: number;
  };
}

export interface CreateGuideRequest {
  title: string;
  description: string;
  problemOverview: string;
  technicalSolution: string;
  tags: string[];
  visibility: "public" | "draft" | "private";
}

export interface UpdateGuideRequest extends Partial<CreateGuideRequest> {
  id: string;
}

export interface GuideFilters {
  tags?: string[];
  author?: string;
  visibility?: "public" | "draft" | "private";
  sortBy?: "publishedAt" | "views" | "likes" | "title";
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface GuideStats {
  totalGuides: number;
  publishedGuides: number;
  draftGuides: number;
  totalViews: number;
  totalLikes: number;
  totalBookmarks: number;
}
