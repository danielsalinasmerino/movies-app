"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useMemo, ReactNode } from "react";

import { createQueryClient } from "@/utils/react-query";

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const queryClient = useMemo(() => createQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
