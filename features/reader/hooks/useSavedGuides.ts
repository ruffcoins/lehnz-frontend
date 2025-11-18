import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Guide } from "../types";
import { apiRequest } from "../../shared/utils/api";

export function useSavedGuides() {
  return useQuery({
    queryKey: ["saved-guides"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/bookmarks");
      return response.json();
    },
  });
}

export function useRemoveFromReadingList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (guideId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return guideId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-guides"] });
    },
  });
}
