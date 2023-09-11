import { useNavigation } from "@react-navigation/native";
import { useTasksContext } from "../providers/contexts/tasksContext";
import { useEffect, useState } from "react";
import getTaskById from "../utils/getTaskById";
import useTaskCard from "./useTaskCard";

export default function useTaskCardFile(taskId: string) {
  const navigation = useNavigation();
  const { archivedTasksArray } = useTasksContext();
  const [task, setTask] = useState(getTaskById(archivedTasksArray, taskId));
  const { handleDeleteTaskButton } = useTaskCard(taskId);

  useEffect(() => {
    setTask(getTaskById(archivedTasksArray, taskId));
  }, [archivedTasksArray]);

  function redirectEditTaskForm() {
    navigation.navigate("editTask", { taskId, prevScreen: "file" });
  }

  function showDelayMessage() {
    if (task?.deadline && task.finishedDate) {
      if (
        new Date(task?.deadline).getTime() -
          new Date(task.finishedDate).getTime() <
        0
      ) {
        return "flex";
      } else {
        return "none";
      }
    }
  }
  return {
    task,
    redirectEditTaskForm,
    showDelayMessage,
    handleDeleteTaskButton,
  };
}
