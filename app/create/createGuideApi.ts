import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface GuideContent {
  overview: string;
  implementation: string;
}

interface GuideData {
  title: string;
  description: string;
  tags: string[];
  category: string;
  content: GuideContent;
  isPublished: boolean;
  isPublic: boolean;
  metaTitle: string;
  metaDescription: string;
  authorId: string;
  version: string;
}

interface CreateGuideParams {
  title: string;
  description: string;
  tags: string[];
  category: string;
  overview: string;
  implementation: string;
  isPublished?: boolean;
  isPublic?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  authorId: string;
  version?: string;
}

const createGuideApi = async (params: CreateGuideParams) => {
  const guideData: GuideData = {
    title: params.title,
    description: params.description,
    tags: params.tags,
    category: params.category,
    content: {
      overview: params.overview,
      implementation: params.implementation,
    },
    isPublished: params.isPublished ?? false,
    isPublic: params.isPublic ?? true,
    metaTitle: params.metaTitle ?? params.title,
    metaDescription: params.metaDescription ?? params.description,
    authorId: params.authorId,
    version: params.version ?? "1.0.0",
  };
  console.log("Guide Data", guideData);
  console.log("Base API", baseApi);
  const response = await baseApi.post("/documentation", guideData);
  return response.data;
};
export default createGuideApi;
export type { CreateGuideParams, GuideData, GuideContent };
