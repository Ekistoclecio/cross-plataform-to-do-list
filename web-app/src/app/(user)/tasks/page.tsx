"use client";

import { Flex, Box, Text, Button, useDisclosure } from "@chakra-ui/react";

import TaskBoard from "@/components/TaskBoard";

import CreateTaskModal from "@/components/CreateTaskModal";

export default function Tasks() {
  const {
    isOpen: createTaskModalisOpen,
    onOpen: createTaskModalonOpen,
    onClose: createTaskModalonClose,
  } = useDisclosure();

  return (
    <>
      <Button
        color={"gray.300"}
        backgroundColor={"#4c5ee5"}
        maxWidth={"min-content"}
        _hover={{ backgroundColor: "#374ad0" }}
        onClick={createTaskModalonOpen}
        position="fixed"
      >
        <Text fontSize={"28px"} marginRight={2}>
          +
        </Text>
        Criar nova tarefa
      </Button>
      <Flex flex={1} gap={4} marginTop={14} minWidth={"min-content"}>
        <TaskBoard title="A Fazer" />
        <TaskBoard title="Em Progresso" />
        <TaskBoard title="Concluídas" />
      </Flex>
      <CreateTaskModal
        isOpen={createTaskModalisOpen}
        onClose={createTaskModalonClose}
      />
    </>
  );
}
