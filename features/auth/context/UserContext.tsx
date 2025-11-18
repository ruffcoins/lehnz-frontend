"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "creator" | "reader";

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
  github?: string;
  linkedin?: string;
  focusAreas: string[];
  following?: number[];
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  interests?: string[];
}

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;
  updateUserRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        const savedRole = localStorage.getItem("userRole");
        const savedProfile = localStorage.getItem("userProfile");

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          let profileData = {};

          if (savedProfile) {
            profileData = JSON.parse(savedProfile);
          }

          setUserState({
            ...userData,
            role: (savedRole as UserRole) || userData.role || "reader",
            ...profileData,
          });
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const setUser = (newUser: UserProfile | null) => {
    setUserState(newUser);

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("userRole", newUser.role);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userProfile");
    }
  };

  const updateUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("userRole", role);
    }
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);

      // Save profile data separately
      localStorage.setItem("userProfile", JSON.stringify(profile));
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const value: UserContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    setUser,
    updateUserRole,
    updateUserProfile,
    signOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
