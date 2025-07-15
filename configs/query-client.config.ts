import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      throwOnError: (e) => {
        console.error("react-query.query=", e);
        return false;
      },
    },
  },
});
