"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export default function ConfirmeDeleteTaskAlert({
  isOpen,
  cancelRef,
  onClose,
  taskTitle,
  sendDeleteTask,
}: PropsConfirmDeleteTaskAlertInterface) {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay backgroundColor={"rgba(0,0,0,0.6)"}>
        <AlertDialogContent backgroundColor={"#1d213a"} textColor={"gray.300"}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Tarefa
          </AlertDialogHeader>

          <AlertDialogBody>
            Você tem certeza que deseja deletar a tarefa &quot;{taskTitle}
            &quot; ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              backgroundColor={"gray.300"}
              _hover={{ backgroundColor: "gray.400" }}
              ref={cancelRef}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              backgroundColor={"rgb(180,0,0)"}
              colorScheme="red"
              onClick={sendDeleteTask}
              ml={3}
            >
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
