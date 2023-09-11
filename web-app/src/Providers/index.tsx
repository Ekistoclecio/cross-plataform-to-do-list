"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import NextAuthSessionProvider from "./sessionProvider";
import { TasksProvider } from "./contexts/tasksContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <CacheProvider>
        <ChakraProvider>
          <TasksProvider>{children}</TasksProvider>
        </ChakraProvider>
      </CacheProvider>
    </NextAuthSessionProvider>
  );
}
