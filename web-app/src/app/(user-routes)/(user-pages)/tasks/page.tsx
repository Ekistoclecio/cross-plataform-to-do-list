"use client";

import { Flex, Text, Button } from "@chakra-ui/react";

import TaskBoard from "@/components/TaskBoard";
import { DragDropContext } from "react-beautiful-dnd";
import CreateTaskModal from "@/components/CreateTaskModal";
import useTasksPage from "@/hooks/useTasksPage";

export default function Tasks() {
  const {
    createTaskModalisOpen,
    createTaskModalonClose,
    createTaskModalonOpen,
    handleOnDragEnd,
  } = useTasksPage();
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <TaskBoard title="A Fazer" progressStatus={0} />
          <TaskBoard title="Em Progresso" progressStatus={1} />
          <TaskBoard title="Concluídas" progressStatus={2} />
        </DragDropContext>
      </Flex>
      <CreateTaskModal
        isOpen={createTaskModalisOpen}
        onClose={createTaskModalonClose}
      />
    </>
  );
}
