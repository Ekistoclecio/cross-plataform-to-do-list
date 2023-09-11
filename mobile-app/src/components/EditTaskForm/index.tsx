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
import { useEffect, useState } from "react";
import getTaskById from "../../utils/getTaskById";
import { useTasksContext } from "../../providers/contexts/tasksContext";
import { Alert, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUserContext } from "../../providers/contexts/userContext";
import updateTask from "../../services/api/updateTask";
import { regexMinCaracters } from "../AuthForm";

type RouteParams = {
  taskId: string;
  prevScreen: string;
};

export default function EditTaskForm() {
  const route = useRoute();
  const { userSession, logout } = useUserContext();
  const { taskId, prevScreen } = route.params as RouteParams;
  const [editMode, setEditMode] = useState(false);
  const { activeTasksArray, archivedTasksArray } = useTasksContext();
  const [editTaskForm, setEditTaskForm] = useState({
    progressStatus: 0,
    title: "",
    description: "",
    priority: false,
    deadline: "",
  });
  const { updateTasks } = useTasksContext();
  const [task, setTask] = useState(
    getTaskById(activeTasksArray.concat(archivedTasksArray), taskId)
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (taskId) {
      setTask(getTaskById(activeTasksArray.concat(archivedTasksArray), taskId));
    }
  }, [taskId]);

  useEffect(() => {
    if (task) {
      setEditTaskForm({
        progressStatus: task.progressStatus,
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        deadline: task.deadline,
      });
    }
  }, [task]);

  function handleMenu(triggerProps: any) {
    if (editMode) {
      return { ...triggerProps };
    } else {
      return null;
    }
  }

  function validateEditTaskForm() {
    if (!regexMinCaracters.test(editTaskForm.title)) {
      Alert.alert(
        "Titulo invalido",
        "O titulo da tarefa deve conter pelo menos 6 caracteres"
      );
      return false;
    }
    return true;
  }

  async function sendEditForm() {
    if (validateEditTaskForm()) {
      if (userSession?.token) {
        const response = await updateTask(
          userSession.token,
          taskId,
          editTaskForm
        );
        if (response?.status === 200) {
          Alert.alert("Sucesso", "Tarefa atualizada com sucesso.");
          if (prevScreen === "kanbanList") {
            navigation.navigate("kanbanList");
          } else if (prevScreen === "notification") {
            navigation.navigate("notification");
          } else {
            navigation.navigate("file");
          }
          updateTasks();
        } else if (response?.status === 401) {
          logout();
        } else {
          Alert.alert(
            "Falha",
            "Ocorreu uma falha atualização da tarefa, verifique os dados e tente novamente"
          );
        }
      }
    }
  }

  function handleEditSaveButton() {
    if (editMode) {
      console.log(editTaskForm);
      sendEditForm();
    } else {
      setEditMode(true);
    }
  }

  function handleCancelButton() {
    setEditMode(false);
    if (prevScreen === "kanbanList") {
      navigation.navigate("kanbanList");
    } else if (prevScreen === "notification") {
      navigation.navigate("notification");
    } else {
      navigation.navigate("file");
    }
  }

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
