import { useTasksContext } from "@/Providers/contexts/tasksContext";
import useEditTaskModal from "@/hooks/useEditTaskModal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";

export default function EditTaskModal({
  isOpen,
  onClose,
  taskId,
}: PropsEditTaskModalInterface) {
  const { currentDate } = useTasksContext();
  const {
    closeEditModal,
    editMode,
    editTaskForm,
    task,
    handleStatusSelect,
    onChangeInputs,
    handleSaveButton,
    handleEditButton,
  } = useEditTaskModal(taskId, onClose);

  return (
    <Modal isOpen={isOpen} onClose={closeEditModal}>
      <ModalOverlay backgroundColor={"rgba(0,0,0,0.6)"} />
      <ModalContent
        minWidth={"min-content"}
        backgroundColor={"#1d213a"}
        color={"gray.300"}
      >
        <ModalHeader color={"gray.300"}>Editar Tarefa</ModalHeader>
        <ModalCloseButton color={"gray.300"} />
        <ModalBody>
          <Text
            color={"red"}
            marginTop={-5}
            display={editMode ? "none" : "flex"}
            fontSize={"14px"}
          >
            Clique em "Editar" para permitir alterações.
          </Text>
          <Flex alignItems={"center"} marginBottom={4} marginTop={2}>
            <Text marginRight={2}>Estado da tarefa:</Text>
            <Menu>
              <MenuButton
                isDisabled={!editMode}
                _disabled={{ color: "gray.300", cursor: "auto" }}
                as={Button}
                width={"min-contente"}
                padding={2}
                rightIcon={<ChevronDownIcon />}
                backgroundColor={"transparent"}
                color={"gray.300"}
                border={"1px"}
                borderColor={"gray.600"}
                _hover={{ backgroundColor: "none" }}
                _active={{ backgroundColor: "none" }}
              >
                {editMode
                  ? editTaskForm.progressStatus === 0
                    ? "A fazer"
                    : editTaskForm.progressStatus === 1
                    ? "Em progresso"
                    : "Concluida"
                  : task?.progressStatus === 0
                  ? "A fazer"
                  : task?.progressStatus === 1
                  ? "Em progresso"
                  : "Concluida"}
              </MenuButton>
              <MenuList
                minWidth={"80px"}
                backgroundColor={"#33374f"}
                borderColor={"gray.600"}
              >
                <MenuItem
                  backgroundColor={"#33374f"}
                  _hover={{ background: "#40455c" }}
                  onClick={() => handleStatusSelect(0)}
                >
                  A fazer
                </MenuItem>
                <MenuItem
                  backgroundColor={"#33374f"}
                  _hover={{ background: "#40455c" }}
                  onClick={() => handleStatusSelect(1)}
                >
                  Em progresso
                </MenuItem>
                <MenuItem
                  backgroundColor={"#33374f"}
                  _hover={{ background: "#40455c" }}
                  onClick={() => handleStatusSelect(2)}
                >
                  Concluída
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Box marginBottom={6}>
            <Flex alignItems={"center"} marginBottom={2}>
              <Text>Titulo:</Text>
              <Text fontSize={12} color={"gray.500"} marginLeft={1}>
                (Maximo de 128 caracteres)
              </Text>
            </Flex>
            <Input
              isDisabled={!editMode}
              _disabled={{ color: "gray.300" }}
              size="sm"
              maxLength={128}
              borderColor={"gray.600"}
              borderRadius={"md"}
              _hover={{ borderColor: "none" }}
              placeholder="Dê um titulo para sua tarefa"
              value={editMode ? editTaskForm.title : task?.title}
              onChange={onChangeInputs}
              name="title"
            />
          </Box>
          <Box marginBottom={6}>
            <Text marginBottom={2}>Descrição:</Text>
            <Textarea
              isDisabled={!editMode}
              _disabled={{ color: "gray.300" }}
              borderColor={"gray.600"}
              borderRadius={"md"}
              placeholder="Uma breve descrição da terefa"
              size={"sm"}
              height={"120px"}
              _hover={{ borderColor: "none" }}
              value={
                editMode ? editTaskForm.description : task?.description || ""
              }
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
              isDisabled={!editMode}
              _disabled={{ color: "gray.300" }}
              color={"gray.300"}
              maxWidth={"min-content"}
              type="date"
              borderColor={"gray.600"}
              size="sm"
              borderRadius={"md"}
              _hover={{ borderColor: "none" }}
              value={editMode ? editTaskForm.deadline : task?.deadline}
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
            isDisabled={!editMode}
            _disabled={{ cursor: "auto" }}
            isChecked={editMode ? editTaskForm.priority : task?.priority}
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
            onClick={closeEditModal}
          >
            Cancelar
          </Button>
          <Button
            color={"gray.300"}
            backgroundColor={"#4c5ee5"}
            maxWidth={"min-content"}
            _hover={{ backgroundColor: "#374ad0" }}
            onClick={editMode ? handleSaveButton : handleEditButton}
          >
            {editMode ? "Salvar" : "Editar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
