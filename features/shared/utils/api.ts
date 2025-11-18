/**
 * API utility functions
 */

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : process.env.NEXT_PUBLIC_API_URL || "";

export async function apiRequest(method: string, url: string, data?: unknown): Promise<Response> {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response;
}
