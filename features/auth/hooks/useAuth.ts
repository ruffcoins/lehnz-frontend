"use client";

import { useState } from "react";
import { useUser, UserProfile } from "../context/UserContext";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const { user, setUser, updateUserRole, updateUserProfile, signOut } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const signIn = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    // This will be called after successful authentication
    // The actual user data should be fetched from your auth provider
    console.log("Authentication successful");
    router.push("/onboarding");
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const completeOnboarding = (role: "creator" | "reader", profile: Partial<UserProfile>) => {
    if (user) {
      updateUserRole(role);
      updateUserProfile(profile);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isAuthModalOpen,
    signIn,
    signOut,
    updateUserRole,
    updateUserProfile,
    completeOnboarding,
    openAuthModal,
    closeAuthModal,
    handleAuthSuccess,
  };
}
