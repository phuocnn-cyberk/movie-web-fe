"use client";

import { queryClient } from "@/configs/query-client.config";
import { QueryClientProvider } from "@tanstack/react-query";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
