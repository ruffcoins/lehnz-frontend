import { useState, useEffect, useCallback } from "react";

export interface GuideDraft {
  title: string;
  description: string;
  problemOverview: string;
  technicalSolution: string;
  tags: string[];
  visibility: "public" | "draft" | "private";
  lastSaved?: Date;
}

const STORAGE_KEY = "guide-draft";

export function useGuideDraft() {
  const [draft, setDraft] = useState<GuideDraft>({
    title: "",
    description: "",
    problemOverview: "",
    technicalSolution: "",
    tags: [],
    visibility: "draft",
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);
        setDraft(parsedDraft);
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
  }, []);

  // Auto-save to localStorage when draft changes
  useEffect(() => {
    if (draft.title || draft.problemOverview || draft.technicalSolution) {
      const draftToSave = {
        ...draft,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftToSave));
      setHasUnsavedChanges(true);
    }
  }, [draft]);

  const updateDraft = useCallback((updates: Partial<GuideDraft>) => {
    setDraft(prev => ({ ...prev, ...updates }));
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setDraft({
      title: "",
      description: "",
      problemOverview: "",
      technicalSolution: "",
      tags: [],
      visibility: "draft",
    });
    setHasUnsavedChanges(false);
  }, []);

  const saveDraft = useCallback(async () => {
    try {
      // In a real app, this would save to your backend
      const draftToSave = {
        ...draft,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftToSave));
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      console.error("Failed to save draft:", error);
      return false;
    }
  }, [draft]);

  return {
    draft,
    hasUnsavedChanges,
    updateDraft,
    clearDraft,
    saveDraft,
  };
}
