"use client";

import { Flex } from "@chakra-ui/react";

import TopBar from "@/components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex flexDirection={"column"} height={"100vh"} maxWidth={"100vw"}>
      <TopBar />
      <Flex
        flex={1}
        flexDirection={"column"}
        backgroundColor={"#1d213a"}
        padding={4}
        width={"100vw"}
        id="children"
        maxWidth={"100vw"}
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#3d415a",
            borderRadius: "24px",
          },
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
