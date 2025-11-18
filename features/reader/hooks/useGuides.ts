// features/reader/hooks/useGuides.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Guide, SortOption, TagFilter } from "../types";
import { apiRequest } from "../../shared/utils/api";

interface UseGuidesParams {
  search?: string;
  tags?: TagFilter[];
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export function useGuides(params: UseGuidesParams = {}) {
  return useQuery({
    queryKey: ["guides", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params.search) searchParams.append("search", params.search);
      if (params.tags?.length) searchParams.append("tags", params.tags.join(","));
      if (params.sort) searchParams.append("sort", params.sort);
      if (params.page) searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());

      const response = await apiRequest("GET", `/api/guides?${searchParams.toString()}`);
      return response.json();
    },
  });
}

export function useGuideBySlug(slug: string) {
  return useQuery({
    queryKey: ["guide", slug],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/guides/${slug}`);
      return response.json();
    },
    enabled: !!slug,
  });
}

export function useBookmarkGuide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guideId, bookmarked }: { guideId: string; bookmarked: boolean }) => {
      const response = await apiRequest("POST", "/api/bookmarks", { guideId, bookmarked });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      queryClient.invalidateQueries({ queryKey: ["saved-guides"] });
    },
  });
}

export function useFollowAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ authorId, following }: { authorId: string; following: boolean }) => {
      const response = await apiRequest("POST", "/api/follow", { authorId, following });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top-creators"] });
    },
  });
}
