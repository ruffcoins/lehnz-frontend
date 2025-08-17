import axios from 'axios';

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createGuideApi = async (guide: any) => {
    const guideData = {
        content: guide, 
        isPublished: false,
        isPublic: true,
        metaTitle: "React Documentation Editor - Complete Implementation Guide",
        metaDescription: "Learn how to build a professional documentation editor with React, TypeScript, and modern web technologies.",
        slug: "react-documentation-editor-implementation",
        authorId: "user-123",
        version: "1.0.0",
        title: "React Documentation Editor Implementation",
        description: "A comprehensive guide to building a block-based documentation editor with React and TypeScript",
        tags: ["react", "typescript", "documentation", "editor"],
        category: "frontend",
    }
  const response = await baseApi.post('/documentation', guideData);
  return response.data;
};
export default createGuideApi;
