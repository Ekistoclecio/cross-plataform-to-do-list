import {
  Box,
  Button,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Input,
  Menu,
  MenuItem,
  MenuItemLabel,
  Text,
  Textarea,
} from "@gluestack-ui/themed";
import DatePicker from "../DatePicker";
import { TextInput } from "react-native";
import useEditTaskForm from "../../hooks/useEditTaskForm";

export default function EditTaskForm() {
  const {
    editMode,
    handleMenu,
    editTaskForm,
    setEditTaskForm,
    handleCancelButton,
    handleEditSaveButton,
  } = useEditTaskForm();

  return (
    <Box height={"100%"} justifyContent="space-between">
      <Box>
        <Text
          color={"red"}
          marginTop={-10}
          display={editMode ? "none" : "flex"}
        >
          Clique em "Editar" para permitir alterações.
        </Text>
        <Box flexDirection="row" gap={12} marginTop={8}>
          <Text color="#CBD5E0" marginTop={8} fontWeight="bold" fontSize={20}>
            Estado da tarefa:
          </Text>
          <Menu
            backgroundColor={"#53576f"}
            placement="bottom"
            trigger={({ ...triggerProps }) => {
              return (
                <Button
                  {...handleMenu(triggerProps)}
                  backgroundColor="#4c5ee5"
                  sx={{
                    ":active": {
                      backgroundColor: "#1c2eb5",
                    },
                  }}
                >
                  <Text color="#CBD5E0" fontWeight="bold" size="lg">
                    {editTaskForm.progressStatus == 0
                      ? "A fazer"
                      : editTaskForm.progressStatus == 1
                      ? "Em progresso"
                      : "Concluida"}
                  </Text>
                </Button>
              );
            }}
          >
            <MenuItem
              onTouchEnd={() =>
                setEditTaskForm((prev) => ({ ...prev, progressStatus: 0 }))
              }
              key="todo"
              textValue="todo"
              sx={{
                ":active": {
                  backgroundColor: "#33374f",
                },
              }}
            >
              <MenuItemLabel color="#CBD5E0" fontSize={"$lg"} size="sm">
                A fazer
              </MenuItemLabel>
            </MenuItem>
            <MenuItem
              onTouchEnd={() =>
                setEditTaskForm((prev) => ({ ...prev, progressStatus: 1 }))
              }
              key="inProgress"
              textValue="inProgress"
              sx={{
                ":active": {
                  backgroundColor: "#33374f",
                },
              }}
            >
              <MenuItemLabel color="#CBD5E0" fontSize={"$lg"} size="sm">
                Em progresso
              </MenuItemLabel>
            </MenuItem>
            <MenuItem
              onTouchEnd={() =>
                setEditTaskForm((prev) => ({ ...prev, progressStatus: 2 }))
              }
              key="completed"
              textValue="completed"
              sx={{
                ":active": {
                  backgroundColor: "#33374f",
                },
              }}
            >
              <MenuItemLabel color="#CBD5E0" fontSize={"$lg"} size="sm">
                Concluida
              </MenuItemLabel>
            </MenuItem>
          </Menu>
        </Box>
        <Text color="#CBD5E0" marginTop={16} fontWeight="bold" fontSize={20}>
          Titulo:{" "}
          <Text fontWeight="$normal" color="#718096">
            (Maximo de 128 caracteres)
          </Text>
        </Text>
        <Input
          isReadOnly={editMode ? false : true}
          marginTop={8}
          variant="outline"
          size="lg"
          borderColor="#718096"
        >
          <TextInput
            editable={editMode}
            style={{
              color: "#CBD5E0",
              fontSize: 18,
              padding: 10,
              width: "100%",
            }}
            placeholderTextColor={"#718096"}
            placeholder="Titulo da tarefa"
            value={editTaskForm.title}
            onChangeText={(text) =>
              setEditTaskForm({ ...editTaskForm, title: text })
            }
          />
        </Input>

        <Text marginTop={16} color="#CBD5E0" fontWeight="bold" fontSize={20}>
          Descrição:
        </Text>
        <Textarea
          marginTop={8}
          size="lg"
          w="100%"
          borderColor="#718096"
          height={"40%"}
          aria-label="textarea"
          isReadOnly={editMode ? false : true}
        >
          <TextInput
            editable={editMode}
            style={{
              color: "#CBD5E0",
              fontSize: 18,
              padding: 10,
              height: "100%",
              textAlignVertical: "top",
            }}
            placeholderTextColor={"#718096"}
            placeholder="Descrição da tarefa"
            multiline={true}
            value={editTaskForm.description}
            onChangeText={(text) =>
              setEditTaskForm({ ...editTaskForm, description: text })
            }
          />
        </Textarea>
        <Box flexDirection="row" alignItems="center" gap={12} marginTop={16}>
          <Text color="#CBD5E0" fontWeight="bold" fontSize={20}>
            Prazo final:
          </Text>
          <DatePicker
            isReadOnly={!editMode}
            area-label="datePicker"
            formData={editTaskForm}
            setFormData={setEditTaskForm}
          />
        </Box>

        <Checkbox
          aria-label="checkbox"
          size="md"
          value="priority"
          marginTop={16}
          isDisabled={editMode ? false : true}
          isChecked={editTaskForm.priority}
          onChange={() =>
            setEditTaskForm({
              ...editTaskForm,
              priority: !editTaskForm.priority,
            })
          }
        >
          <CheckboxIndicator mr="$2" width={30} height={30}>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel
            marginBottom={-5}
            color="#CBD5E0"
            fontWeight="bold"
            fontSize={18}
          >
            Definir essa tarefa como prioridade.
          </CheckboxLabel>
        </Checkbox>
      </Box>

      <Box flexDirection="row" gap={20} marginBottom={20}>
        <Button
          onPress={handleCancelButton}
          flex={1}
          backgroundColor="#4A5568"
          sx={{
            ":active": {
              backgroundColor: "#2D3748",
            },
          }}
        >
          <Text color="#CBD5E0" fontWeight="bold" size="lg">
            Cancelar
          </Text>
        </Button>
        <Button
          flex={1}
          onPress={handleEditSaveButton}
          backgroundColor="#4c5ee5"
          sx={{
            ":active": {
              backgroundColor: "#1c2eb5",
            },
          }}
        >
          <Text color="#CBD5E0" fontWeight="bold" size="lg">
            {editMode ? "Salvar" : "Editar"}
          </Text>
        </Button>
      </Box>
    </Box>
  );
}
