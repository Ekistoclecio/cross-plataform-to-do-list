import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../providers/contexts/userContext";
import { useTasksContext } from "../providers/contexts/tasksContext";
import { useState } from "react";
import formatDate from "../utils/formatDate";
import { Alert } from "react-native";
import createNewTask from "../services/api/createNewTask";

export default function useCreateTaskForm() {
  const navegation = useNavigation();
  const { userSession, logout } = useUserContext();
  const { updateTasks } = useTasksContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: formatDate(new Date()),
    priority: false,
  });

  function validateFormData() {
    const regexMinCaracters = /[^\s]{1,}/;
    if (!regexMinCaracters.test(formData.title)) {
      Alert.alert("Titulo invalido", "O titulo da tarefa não pode ser vazio");
      return false;
    }
    return true;
  }

  async function handleCreateNewTask() {
    if (validateFormData()) {
      if (userSession?.token) {
        const response = await createNewTask(formData, userSession.token);
        if (response?.status === 201) {
          Alert.alert("Sucesso", "Tarefa criada com sucesso");
          setFormData({
            title: "",
            description: "",
            priority: false,
            deadline: formatDate(new Date()),
          });
          updateTasks();
        } else if (response?.status === 401) {
          logout();
        } else {
          Alert.alert(
            "Erro na criação da tarefa",
            "Ocorreu um erro ou tentar criar a nova tarefa, verifique os dados e tente novamente"
          );
        }
      }
    }
  }

  function handleCancelButton() {
    setFormData({
      title: "",
      description: "",
      priority: false,
      deadline: formatDate(new Date()),
    });
    navegation.navigate("kanbanList");
  }

  return { formData, setFormData, handleCancelButton, handleCreateNewTask };
}
