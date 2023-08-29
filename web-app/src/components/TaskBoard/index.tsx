"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import TaskCard from "../TaskCard";

interface TaskBoardInterface {
  title: string;
}

export default function TaskBoard({ title }: TaskBoardInterface) {
  return (
    <>
      <Flex
        backgroundColor={"#0d112a"}
        color={"#6c7ef5"}
        flex={1}
        flexDirection={"column"}
        borderRadius={"12px"}
        paddingY={4}
        maxHeight={"83vh"}
        maxWidth={{ base: "240px", lg: "32.2vw" }}
      >
        <Heading
          textAlign={"center"}
          borderBottom={"4px"}
          borderColor={"#1d213a"}
          paddingBottom={4}
        >
          {title}
        </Heading>
        <Flex
          flexDirection={"column"}
          flex={1}
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#3d415a",
              borderRadius: "24px",
            },
          }}
        >
          <TaskCard
            title="testando o tamanho maximo da criação do titulo de uma task que podera ter um numero maximo de 128 caracteres exatamente aaaaaaaa"
            isImportant
            deadline="22/03/2023"
            expired={true}
          />
        </Flex>
      </Flex>
    </>
  );
}
