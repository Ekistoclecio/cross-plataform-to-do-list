"use client";

import useTaskCard from "@/hooks/useTaskCard";
import { Button, Circle, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import EditTaskModal from "../EditTaskModal";
import ConfirmeDeleteTaskAlert from "../ConfirmDeleteTaskAlert";

export default function TaskCard({
  taskId,
  archivable,
}: PropsTaskCardInterface) {
  const {
    handleDeleteTaskButton,
    cancelRef,
    sendDeleteTask,
    isOpenConfirmDelete,
    onCloseConfirmDelete,
    isOpenEditTaskModal,
    onCloseEditTaskModal,
    onOpenEditTaskModal,
    task,
    sendArchiveTask,
    generateExclamationIcon,
  } = useTaskCard(taskId);

  return (
    <>
      <Flex
        color="black"
        paddingY={1}
        paddingX={2}
        justifyContent={"space-between"}
        backgroundColor={"gray.300"}
        margin={3}
        marginBottom={0}
        borderRadius={5}
        onClick={onOpenEditTaskModal}
        _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
        minWidth={"216px"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex
          overflow={"hidden"}
          justifyContent={"center"}
          flexDirection={"column"}
          minHeight={"72px"}
          height={"min-content"}
          width={"100%"}
        >
          <Flex flex={1} alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={"bold"} noOfLines={{ base: 4, md: 2 }}>
              {task?.title}
            </Text>
            <Flex gap={1} display={{ base: "none", lg: "flex" }}>
              <Tooltip
                label="Arquivar Tarefa"
                placement="right"
                backgroundColor={"gray.800"}
              >
                <Button
                  backgroundColor={"transparent"}
                  _hover={{ backgroundColor: "gray.400" }}
                  padding={0}
                  onClick={sendArchiveTask}
                  minWidth={0}
                  width={"30px"}
                  height={"30px"}
                  display={archivable ? "inline-block" : "none"}
                >
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    margin={1}
                  >
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  </Icon>
                </Button>
              </Tooltip>
              <Tooltip
                label="Excluir Tarefa"
                placement="right"
                backgroundColor={"gray.800"}
              >
                <Button
                  backgroundColor={"transparent"}
                  _hover={{ backgroundColor: "gray.400" }}
                  padding={0}
                  onClick={handleDeleteTaskButton}
                  minWidth={0}
                  width={"30px"}
                  height={"30px"}
                >
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    margin={0}
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </Icon>
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex
              justifyContent={"space-between"}
              marginBottom={1}
              width={{ lg: "100%" }}
              flexDirection={{ base: "column", lg: "row" }}
            >
              <Flex>
                <Circle
                  marginTop={"1px"}
                  marginRight={1}
                  fontWeight={"bold"}
                  size={5}
                  color={"gray.200"}
                  backgroundColor={"rgb(180,0,0)"}
                  display={generateExclamationIcon()}
                >
                  !
                </Circle>
                <Text marginRight={3} fontWeight={14}>
                  {task?.progressStatus === 2
                    ? new Date(task.deadline).getTime() -
                        new Date(task.finishedDate || "").getTime() <
                      0
                      ? "Tarefa concluida com atraso"
                      : ""
                    : `Prazo: ${task?.deadline}`}
                </Text>
              </Flex>
              <Text
                alignSelf={{ base: "start", lg: "center" }}
                backgroundColor={"rgb(180,0,0)"}
                borderRadius={5}
                paddingX={2}
                color={"gray.200"}
                fontWeight={"bold"}
                display={task?.priority ? "flex" : "none"}
              >
                Prioridade
              </Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              gap={1}
              display={{ base: "flex", lg: "none" }}
            >
              <Tooltip
                label="Arquivar Tarefa"
                placement="right"
                backgroundColor={"gray.800"}
              >
                <Button
                  backgroundColor={"transparent"}
                  _hover={{ backgroundColor: "gray.400" }}
                  padding={0}
                  onClick={() =>
                    console.log("VC CLICOU PARA ARQUIVAR UMA TASK")
                  }
                  minWidth={0}
                  width={"30px"}
                  height={"30px"}
                  marginBottom={1}
                  display={archivable ? "inline-block" : "none"}
                >
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    margin={0}
                  >
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  </Icon>
                </Button>
              </Tooltip>
              <Tooltip
                label="Excluir Tarefa"
                placement="right"
                backgroundColor={"gray.800"}
              >
                <Button
                  backgroundColor={"transparent"}
                  _hover={{ backgroundColor: "gray.400" }}
                  padding={0}
                  onClick={handleDeleteTaskButton}
                  minWidth={0}
                  width={"30px"}
                  height={"30px"}
                  marginBottom={1}
                >
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    margin={0}
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </Icon>
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ConfirmeDeleteTaskAlert
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        cancelRef={cancelRef}
        taskTitle={task?.title || ""}
        sendDeleteTask={sendDeleteTask}
      />
      <EditTaskModal
        isOpen={isOpenEditTaskModal}
        onClose={onCloseEditTaskModal}
        taskId={taskId}
      />
    </>
  );
}
