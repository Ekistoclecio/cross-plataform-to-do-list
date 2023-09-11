"use client";

import { useTasksContext } from "@/Providers/contexts/tasksContext";
import {
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import FileTaskCard from "../FileTaskCard";

export default function FileModal({
  isOpen,
  onClose,
}: PropsArchiveModalInterface) {
  const { archivedTasksArray } = useTasksContext();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backgroundColor={"rgba(0,0,0,0.6)"} />
      <ModalContent
        minWidth={"min-content"}
        backgroundColor={"#1d213a"}
        color={"gray.300"}
      >
        <ModalHeader
          color={"gray.300"}
          borderBottom={"1px"}
          borderColor={"gray.700"}
        >
          Tarefas Arquivadas
        </ModalHeader>
        <ModalCloseButton color={"gray.300"} />
        <ModalBody paddingX={0} paddingTop={0}>
          <List>
            {archivedTasksArray.map((task) => (
              <ListItem key={task.id}>
                <FileTaskCard taskId={task.id} />
              </ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
