import { LoginCredentials, User } from "@/types/auth";

/**
 * Utility functions for authentication
 */

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function sanitizeUser(user: User): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    createdAt: new Date(user.createdAt),
    lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt) : undefined,
  };
}

export function generateMockUser(credentials: LoginCredentials): User {
  return {
    id: Math.random().toString(36).substr(2, 9),
    email: credentials.email,
    name: credentials.email.split("@")[0],
    role: credentials.email.includes("creator") ? "creator" : "user",
    createdAt: new Date(),
    lastLoginAt: new Date(),
  };
}

export function isValidSession(token?: string): boolean {
  if (!token) return false;
  
  // In a real app, you would validate the JWT token
  // For demo purposes, we'll just check if it exists
  return token.length > 10;
}

export function getStoredAuth(): { token?: string; user?: User } {
  if (typeof window === "undefined") return {};
  
  try {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");
    const user = userStr ? JSON.parse(userStr) : null;
    
    return { token: token || undefined, user };
  } catch {
    return {};
  }
}

export function storeAuth(token: string, user: User, rememberMe = false): void {
  if (typeof window === "undefined") return;
  
  const storage = rememberMe ? localStorage : sessionStorage;
  
  try {
    storage.setItem("auth_token", token);
    storage.setItem("auth_user", JSON.stringify(user));
  } catch (error) {
    console.error("Error storing auth data:", error);
  }
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
}