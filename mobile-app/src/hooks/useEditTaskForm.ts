import { useNavigation, useRoute } from "@react-navigation/native";
import { useUserContext } from "../providers/contexts/userContext";
import { useEffect, useState } from "react";
import { useTasksContext } from "../providers/contexts/tasksContext";
import getTaskById from "../utils/getTaskById";
import { Alert } from "react-native";
import updateTask from "../services/api/updateTask";

export default function useEditTaskForm() {
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
    if (taskId && activeTasksArray && archivedTasksArray) {
      setTask(getTaskById(activeTasksArray.concat(archivedTasksArray), taskId));
    }
  }, [taskId, activeTasksArray, archivedTasksArray]);

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
    const regexMinCaracters = /[^\s]{1,}/;
    if (!regexMinCaracters.test(editTaskForm.title)) {
      Alert.alert("Titulo invalido", "O titulo da tarefa não pode ser vazio");
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

  return {
    editMode,
    handleMenu,
    editTaskForm,
    setEditTaskForm,
    handleCancelButton,
    handleEditSaveButton,
  };
}
