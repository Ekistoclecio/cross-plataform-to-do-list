"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Circle,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

interface TaskCardInterface {
  title: string;
  deadline: string;
  isImportant: boolean;
  expired: boolean;
}

export default function TaskCard({
  title,
  deadline,
  isImportant,
  expired,
}: TaskCardInterface) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  function openTask() {
    console.log("VOCE CLICOU NA TASK");
  }
  function deleteTask() {
    onClose();
    console.log("VOCE DELETOU UMA TASK");
  }

  function handleDeleteTaskButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    console.log("VOCE CLICOU EM DELETAR UMA TASK");
    onOpen();
  }
  return (
    <>
      <Flex
        color="black"
        paddingX={3}
        paddingY={1}
        justifyContent={"space-between"}
        backgroundColor={"gray.300"}
        margin={3}
        marginBottom={0}
        borderRadius={5}
        onClick={openTask}
        _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
        minWidth={"216px"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex
          overflow={"hidden"}
          justifyContent={"center"}
          flexDirection={"column"}
          height={"min-content"}
        >
          <Text noOfLines={{ base: 4, md: 2 }}>{title}</Text>
          <Flex justifyContent={"space-between"}>
            <Flex>
              <Circle
                marginRight={1}
                fontWeight={"bold"}
                size={5}
                color={"gray.200"}
                backgroundColor={"rgb(180,0,0)"}
                display={expired ? { base: "none", lg: "flex" } : "none"}
              >
                !
              </Circle>
              <Text marginRight={3} fontWeight={14}>
                Prazo: {deadline}
              </Text>
            </Flex>
            <Text
              alignSelf={"center"}
              backgroundColor={"rgb(180,0,0)"}
              borderRadius={5}
              paddingX={2}
              color={"gray.200"}
              fontWeight={"bold"}
              display={isImportant ? { base: "none", lg: "flex" } : "none"}
            >
              Prioridade
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text
            alignSelf={"center"}
            backgroundColor={"rgb(180,0,0)"}
            borderRadius={5}
            paddingX={2}
            color={"gray.200"}
            fontWeight={"bold"}
            display={isImportant ? { base: "flex", lg: "none" } : "none"}
          >
            Prioridade
          </Text>
          <Button
            backgroundColor={"transparent"}
            _hover={{ backgroundColor: "gray.400" }}
            padding={0}
            zIndex={1}
            marginLeft={3}
            onClick={handleDeleteTaskButton}
          >
            <Icon
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </Icon>
          </Button>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay backgroundColor={"rgba(0,0,0,0.6)"}>
          <AlertDialogContent
            backgroundColor={"#1d213a"}
            textColor={"gray.300"}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Tarefa
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja deletar a tarefa &quot;{title}&quot; ?
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
                onClick={deleteTask}
                ml={3}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
