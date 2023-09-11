"use client";

import useCreateTaskModal from "@/hooks/useCreateTaskModal";
import {
  Text,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  Box,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";

export default function CreateTaskModal({
  isOpen,
  onClose,
}: PropsCreateTaskModalInterface) {
  const {
    currentDate,
    handleCreateNewTask,
    onChangeInputs,
    createTaskForm,
    closeModal,
  } = useCreateTaskModal({
    isOpen,
    onClose,
  });

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay backgroundColor={"rgba(0,0,0,0.6)"} />
      <ModalContent
        minWidth={"min-content"}
        backgroundColor={"#1d213a"}
        color={"gray.300"}
      >
        <ModalHeader color={"gray.300"}>Criar Nova Tarefa</ModalHeader>
        <ModalCloseButton color={"gray.300"} />
        <ModalBody>
          <Box marginBottom={6}>
            <Flex alignItems={"center"} marginBottom={2}>
              <Text>Titulo:</Text>
              <Text fontSize={12} color={"gray.500"} marginLeft={1}>
                (Maximo de 128 caracteres)
              </Text>
            </Flex>
            <Input
              size="sm"
              maxLength={128}
              borderColor={"gray.600"}
              borderRadius={"md"}
              _hover={{ borderColor: "none" }}
              placeholder="Dê um titulo para sua tarefa"
              value={createTaskForm.title}
              onChange={onChangeInputs}
              name="title"
            />
          </Box>
          <Box marginBottom={6}>
            <Text marginBottom={2}>Descrição:</Text>
            <Textarea
              borderColor={"gray.600"}
              borderRadius={"md"}
              placeholder="Uma breve descrição da terefa"
              size={"sm"}
              height={"120px"}
              _hover={{ borderColor: "none" }}
              value={createTaskForm.description}
              onChange={onChangeInputs}
              name="description"
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#3d415a",
                  borderRadius: "24px",
                },
              }}
            ></Textarea>
          </Box>
          <Flex marginBottom={6} alignItems={"center"}>
            <Text marginRight={2}>Prazo final:</Text>
            <Input
              color={"gray.300"}
              maxWidth={"min-content"}
              type="date"
              borderColor={"gray.600"}
              size="sm"
              borderRadius={"md"}
              _hover={{ borderColor: "none" }}
              value={createTaskForm.deadline}
              onChange={onChangeInputs}
              name="deadline"
              min={currentDate}
              css={{
                "&::-webkit-calendar-picker-indicator": {
                  cursor: "pointer",
                  filter:
                    "invert(0.8) brightness(50%) sepia(100%) saturate(10000%) hue-rotate(210deg)",
                },
              }}
            ></Input>
          </Flex>
          <Checkbox
            checked={createTaskForm.priority}
            onChange={onChangeInputs}
            name="priority"
          >
            Definir essa tarefa como prioridade.
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button
            backgroundColor={"gray.600"}
            _hover={{ backgroundColor: "gray.700" }}
            mr={3}
            color={"gray.300"}
            onClick={closeModal}
          >
            Cancelar
          </Button>
          <Button
            color={"gray.300"}
            backgroundColor={"#4c5ee5"}
            maxWidth={"min-content"}
            _hover={{ backgroundColor: "#374ad0" }}
            onClick={handleCreateNewTask}
          >
            Criar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
