import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { apiRequest } from "@/features/shared/utils/api";
import { API_ENDPOINTS } from "@/features/shared/utils/consts";

interface ProfileFormData {
  name: string;
  bio: string;
  github: string;
  linkedin: string;
  focusAreas: string[];
}

interface OnboardingData {
  role: "creator" | "reader";
  interests: string[];
  name: string;
  bio: string;
  github: string;
  linkedin: string;
}

async function updateUserOnboarding(userId: string, data: OnboardingData) {
  console.log("data", data);
  const response = await apiRequest("PUT", API_ENDPOINTS.USERS.ONBOARDING(userId), data);
  return response.json();
}

export function useOnboarding() {
  const router = useRouter();
  const { user, completeOnboarding } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"creator" | "reader" | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("onboardingRole") as "creator" | "reader" | null;
    }
    return null;
  });

  useEffect(() => {
    if (selectedRole) {
      sessionStorage.setItem("onboardingRole", selectedRole);
    } else {
      sessionStorage.removeItem("onboardingRole");
    }
  }, [selectedRole]);

  const mutation = useMutation({
    mutationFn: (data: OnboardingData) => {
      if (!user?.id) {
        throw new Error("User not found");
      }
      return updateUserOnboarding(user.id, data);
    },
    onSuccess: data => {
      completeOnboarding(data.user.role, { interests: data.user.interests });
      sessionStorage.removeItem("onboardingRole");
      router.push("/dashboard");
    },
    onError: error => {
      console.error("Onboarding failed:", error);
      // Handle error (e.g., show a toast message)
    },
  });

  const handleRoleSelect = (role: "creator" | "reader") => {
    setSelectedRole(role);
  };

  const handleRoleSubmit = () => {
    if (selectedRole) {
      router.push("/onboarding/profile");
    }
  };

  const handleProfileSubmit = (profileData: ProfileFormData) => {
    if (selectedRole) {
      const onboardingPayload = {
        role: selectedRole,
        interests: profileData.focusAreas || [], // Ensure it's always an array
        name: profileData.name || "",
        bio: profileData.bio || "",
        github: profileData.github || "",
        linkedin: profileData.linkedin || "",
      };
      mutation.mutate(onboardingPayload);
    }
  };

  return {
    selectedRole,
    handleRoleSelect,
    handleRoleSubmit,
    handleProfileSubmit,
    isLoading: mutation.isPending,
  };
}
