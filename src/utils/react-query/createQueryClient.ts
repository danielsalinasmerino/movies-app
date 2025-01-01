import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

const createQueryClient = (config?: QueryClientConfig) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3, // Retry failed queries up to 3 times
        refetchOnWindowFocus: false, // Disable refetching on window focus
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      },
      mutations: {
        retry: 3, // Retry mutations if they fail
      },
      ...config, // Optionally merge any custom config passed into the function
    },
  });
};

export default createQueryClient;
