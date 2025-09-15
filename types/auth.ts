export interface User {
  id: string;
  email: string;
  name: string;
  role: "creator" | "user";
  avatar?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: "creator" | "user";
  currentIndustry: string;
  notableProjects?: string;
  // Role-specific fields
  aiMlStack?: string[];
  roleTitle?: string;
  techStack?: string[];
}
