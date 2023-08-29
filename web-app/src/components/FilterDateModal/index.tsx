"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

interface FilterDateModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterDateModal({
  isOpen,
  onClose,
}: FilterDateModalInterface) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backgroundColor={"rgba(0,0,0,0.6)"} />
      <ModalContent
        width={"min-content"}
        backgroundColor={"#1d213a"}
        color={"gray.300"}
      >
        <ModalHeader color={"gray.300"}>Definir Intervalo</ModalHeader>
        <ModalCloseButton color={"gray.300"} />
        <ModalBody>
          <Flex
            marginBottom={6}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={3}
          >
            <Text>Inicio:</Text>
            <Input
              color={"gray.300"}
              maxWidth={"min-content"}
              type="date"
              borderColor={"gray.600"}
              size="sm"
              borderRadius={"md"}
              _hover={{ borderColor: "none" }}
              css={{
                "&::-webkit-calendar-picker-indicator": {
                  cursor: "pointer",
                  filter:
                    "invert(0.8) brightness(50%) sepia(100%) saturate(10000%) hue-rotate(210deg)",
                },
              }}
            ></Input>
          </Flex>
          <Flex
            marginBottom={6}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text>Fim:</Text>
            <Input
              color={"gray.300"}
              maxWidth={"min-content"}
              type="date"
              borderColor={"gray.600"}
              size="sm"
              borderRadius={"md"}
              _hover={{ borderColor: "none" }}
              css={{
                "&::-webkit-calendar-picker-indicator": {
                  cursor: "pointer",
                  filter:
                    "invert(0.8) brightness(50%) sepia(100%) saturate(10000%) hue-rotate(210deg)",
                },
              }}
            ></Input>
          </Flex>
          <Flex alignItems={"center"}>
            <Text marginRight={2}>Intervalo de amostragem:</Text>
            <Menu>
              <MenuButton
                as={Button}
                width={"100px"}
                padding={2}
                rightIcon={<ChevronDownIcon />}
                backgroundColor={"transparent"}
                color={"gray.300"}
                border={"1px"}
                borderColor={"gray.600"}
                _hover={{ backgroundColor: "none" }}
                _active={{ backgroundColor: "none" }}
              >
                Dia
              </MenuButton>
              <MenuList
                minWidth={"80px"}
                backgroundColor={"#33374f"}
                borderColor={"gray.600"}
              >
                <MenuItem
                  backgroundColor={"#33374f"}
                  _hover={{ background: "#40455c" }}
                >
                  Dia
                </MenuItem>
                <MenuItem
                  backgroundColor={"#33374f"}
                  _hover={{ background: "#40455c" }}
                >
                  Mês
                </MenuItem>
                <MenuItem
                  backgroundColor={"#33374f"}
                  _hover={{ background: "#40455c" }}
                >
                  Ano
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </ModalBody>
        <ModalFooter alignItems={"center"} justifyContent={"space-around"}>
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
          >
            Filtrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
