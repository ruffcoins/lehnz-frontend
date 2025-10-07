import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import createGuideApi from "@/features/guides/api/createGuideApi";

interface UseCreateGuideOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

export function useCreateGuide(options?: UseCreateGuideOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGuideApi,
    onSuccess: data => {
      toast.success("Guide created successfully!");
      // Invalidate and refetch any guides queries
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast.error("Failed to create guide. Please try again.");
      console.error("Guide creation error:", error);
      options?.onError?.(error);
    },
  });
}

// Helper hook for auto-saving drafts
export function useAutoSaveGuide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGuideApi,
    onSuccess: data => {
      // Silent success for auto-save
      queryClient.setQueryData(["guide-draft"], data);
    },
    onError: (error: Error) => {
      // Silent error logging for auto-save
      console.warn("Auto-save failed:", error);
    },
  });
}
