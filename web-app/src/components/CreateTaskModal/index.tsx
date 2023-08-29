"use client";

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
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CreateTaskModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
}: CreateTaskModalInterface) {
  function CreateNewTask() {
    onClose();
    console.log("CRIAR NOVA TAREFA");
  }

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let formatedMonth;
    let formatedDay;

    if (month < 10) {
      formatedMonth = `0${month}`;
    } else {
      formatedMonth = month;
    }
    if (day < 10) {
      formatedDay = `0${day}`;
    } else {
      formatedDay = day;
    }

    setCurrentDate(`${year}-${formatedMonth}-${formatedDay}`);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Checkbox>Definir essa tarefa como prioridade.</Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button
            backgroundColor={"gray.600"}
            _hover={{ backgroundColor: "gray.700" }}
            mr={3}
            color={"gray.300"}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            color={"gray.300"}
            backgroundColor={"#4c5ee5"}
            maxWidth={"min-content"}
            _hover={{ backgroundColor: "#374ad0" }}
            onClick={CreateNewTask}
          >
            Criar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
