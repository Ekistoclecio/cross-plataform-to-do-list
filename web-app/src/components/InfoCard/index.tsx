"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

interface InfoCardInterface {
  title: string;
  description: string;
  totalTasks: number;
  priorityTasks: number;
}

export default function InfoCard({
  title,
  totalTasks,
  description,
  priorityTasks,
}: InfoCardInterface) {
  return (
    <Flex
      backgroundColor={"#0d112a"}
      width={{ base: "93vw", md: "22vw" }}
      borderRadius={"12px"}
      padding={4}
      justifyContent={"space-between"}
      flexDirection={"column"}
    >
      <Text fontSize={18}>{title}</Text>
      <Flex
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        fontSize={48}
      >
        <Text>{totalTasks}</Text>
      </Flex>
      <Box fontSize={14} color={"gray.500"}>
        <Text id="testando">{description}</Text>
        <Flex alignItems={"center"}>
          <Text marginRight={1} fontSize={16}>
            *
          </Text>
          <Text>Quantidade de tarefas prioritarias: {priorityTasks}</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
