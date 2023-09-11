"use client";

import { Flex, Text, Box, Icon } from "@chakra-ui/react";
import EditTaskModal from "../EditTaskModal";
import useNotificationTaskCard from "@/hooks/useNotificationTaskCard";

export default function NotificationTaskCard({
  newNotification,
  taskId,
}: PropsNotificationTaskCardInterface) {
  const {
    task,
    handleClickTaskCard,
    isOpenEditModalByNotification,
    onCloseEditModalByNotification,
  } = useNotificationTaskCard(taskId);
  return (
    <>
      <Box
        padding={2}
        borderBottom={"1px"}
        borderColor={"gray.600"}
        _hover={{ backgroundColor: "#40455c", cursor: "pointer" }}
        onClick={handleClickTaskCard}
      >
        <Text fontSize={14}>
          <Icon
            xmlns="http://www.w3.org/2000/svg"
            boxSize={4}
            fill="red"
            viewBox="0 0 16 16"
            marginRight={1}
            display={newNotification ? "inline-block" : "none"}
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </Icon>
          {task?.notificationStatus === 1
            ? `O prazo para a conclusão da tarefa "${task?.title}" ira
              acabar em breve.`
            : `O prazo para a conclusão da tarefa "${task?.title}" terminou.`}
        </Text>
        <Flex>
          <Text fontSize={12}>Prazo final: {task?.deadline}</Text>
        </Flex>
      </Box>
      <EditTaskModal
        isOpen={isOpenEditModalByNotification}
        onClose={onCloseEditModalByNotification}
        taskId={taskId}
      />
    </>
  );
}
