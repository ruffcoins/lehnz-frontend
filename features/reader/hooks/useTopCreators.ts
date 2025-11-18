import { useQuery } from "@tanstack/react-query";
import { TopCreator } from "../types";
import { apiRequest } from "../../shared/utils/api";

export function useTopCreators(limit: number = 5) {
  return useQuery({
    queryKey: ["top-creators", limit],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/creators/top?limit=${limit}`);
      const data = await response.json();
      return data.creators;
    },
  });
}
