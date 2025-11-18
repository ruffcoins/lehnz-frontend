// Common tech options
export const AI_ML_TECHNOLOGIES = [
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Keras",
  "Hugging Face",
  "OpenAI API",
  "LangChain",
  "Pandas",
  "NumPy",
  "Jupyter",
  "MLflow",
  "Weights & Biases",
  "Docker",
  "Kubernetes",
  "AWS SageMaker",
  "Google Colab",
];

export const GENERAL_TECHNOLOGIES = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Next.js",
  "Vue.js",
  "Angular",
  "Django",
  "Flask",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "AWS",
  "Azure",
  "GCP",
  "Git",
  "Linux",
];

export const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Education",
  "Manufacturing",
  "Media & Entertainment",
  "Automotive",
  "Real Estate",
  "Consulting",
  "Government",
  "Non-profit",
  "Research",
  "Startup",
  "Other",
];

export enum ROLES {
  CREATOR = "creator",
  USER = "user",
}

export const ONBOARDING_INTERESTS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Web Development",
  "Mobile Apps",
  "Data Science",
  "Cybersecurity",
  "Blockchain",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Game Development",
  "Open Source",
  "Programming Languages",
];

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
    SEND_VERIFICATION_EMAIL: "/api/auth/send-email-verification-link",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },
  GUIDES: {
    GET_ALL: "/api/guides",
    CREATE: "/api/guides",
    GET_BY_SLUG: (slug: string) => `/api/guides/${slug}`,
    UPDATE: (guideId: string) => `/api/guides/${guideId}`,
    DELETE: (guideId: string) => `/api/guides/${guideId}`,
    GET_COMMENTS: (guideId: string) => `/api/guides/${guideId}/comments`,
  },
  USERS: {
    GET_PROFILE: "/api/users/profile",
    UPDATE_PROFILE: "/api/users/profile",
    ONBOARDING: (userId: string) => `/api/users/${userId}/onboarding`,
    GET_FOLLOWING: "/api/users/me/following",
  },
  CREATORS: {
    GET_TOP: "/api/creators/top",
    GET_MY_GUIDES: "/api/creators/me/guides",
    GET_BY_ID: (creatorId: string) => `/api/creators/${creatorId}`,
    TOGGLE_FOLLOW: "/api/follow",
  },
  BOOKMARKS: {
    GET_ALL: "/api/bookmarks",
    TOGGLE: "/api/bookmarks",
  },
  COMMENTS: {
    CREATE: "/api/comments",
  },
  TAGS: {
    GET_ALL: "/api/tags",
    GET_GUIDES_BY_SLUG: (slug: string) => `/api/tags/${slug}/guides`,
  },
  FEED: "/api/feed",
  SEARCH: "/api/search",
  HEALTH: "/api/health",
};

// export const ONBOARDING_CREATORS = [
//     "John Doe", "Jane Smith", "Jim Beam", "Jill Johnson", "Jack Daniels", "Jameson"
// ]
