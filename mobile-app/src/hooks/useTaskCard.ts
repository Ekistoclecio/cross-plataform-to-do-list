import { useEffect, useState } from "react";
import { useTasksContext } from "../providers/contexts/tasksContext";
import { useUserContext } from "../providers/contexts/userContext";
import getTaskById from "../utils/getTaskById";
import { useNavigation } from "@react-navigation/native";
import deleteTask from "../services/api/deleteTask";
import { Alert } from "react-native";
import archiveTask from "../services/api/archiveTask";

export default function useTaskCard(taskId: string) {
  const { getCurrentDate, userSession, logout } = useUserContext();
  const { activeTasksArray, archivedTasksArray, updateTasks } =
    useTasksContext();
  const [task, setTask] = useState<TaskDataInterface | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (activeTasksArray && archivedTasksArray) {
      setTask(getTaskById(activeTasksArray.concat(archivedTasksArray), taskId));
    }
  }, [activeTasksArray, archivedTasksArray]);

  function redirectEditTask() {
    navigation.navigate("editTask", { taskId, prevScreen: "kanbanList" });
  }

  function generateExclamationIcon() {
    if (task) {
      if (task?.progressStatus === 2) {
        const val =
          new Date(task.deadline).getTime() -
            new Date(task.finishedDate || "").getTime() <
          0
            ? "flex"
            : "none";
        return val;
      } else {
        const val =
          new Date(task.deadline).getTime() -
            new Date(getCurrentDate()).getTime() <
          0
            ? "flex"
            : "none";
        return val;
      }
    } else {
      return "none";
    }
  }

  async function sendDeleteTask() {
    if (userSession?.token) {
      const response = await deleteTask(userSession.token, taskId);
      if (response?.status === 200) {
        updateTasks();
        Alert.alert("Excluido", "Tarefa excluida com sucesso");
      } else if (response?.status === 401) {
        logout();
      }
    }
  }

  function handleDeleteTaskButton() {
    Alert.alert(
      "Excluir Tarefa",
      `Tem certeza que deseja excluir a tarefa "${task?.title}" ?`,
      [
        {
          text: "Sim",
          onPress: sendDeleteTask,
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  async function sendArchiveTask(file?: boolean) {
    if (userSession?.token) {
      const response = await archiveTask(userSession.token, taskId);
      if (response?.status === 200) {
        if (file) {
          Alert.alert("Sucesso", "Tarefa desarquivada com sucesso");
          updateTasks();
        } else {
          Alert.alert("Arquivado", "Tarefa arquivada com sucesso");
          updateTasks();
        }
      } else if (response?.status === 401) {
        logout();
      }
    }
  }

  return {
    redirectEditTask,
    task,
    generateExclamationIcon,
    handleDeleteTaskButton,
    sendArchiveTask,
  };
}
