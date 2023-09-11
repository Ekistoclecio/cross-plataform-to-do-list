"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface PropsNextAuthSessionProviderInterface {
  children: ReactNode;
}

export default function NextAuthSessionProvider({
  children,
}: PropsNextAuthSessionProviderInterface) {
  return <SessionProvider>{children}</SessionProvider>;
}
