import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../providers/contexts/userContext";
import { useTasksContext } from "../providers/contexts/tasksContext";
import { useEffect, useState } from "react";
import getTaskById from "../utils/getTaskById";
import notificationPatch from "../services/api/notificationPatch";

export default function useTaskCardNotification(taskId: string) {
  const navigation = useNavigation();
  const { userSession, logout } = useUserContext();
  const { activeTasksArray, updateTasks } = useTasksContext();
  const [task, setTask] = useState(getTaskById(activeTasksArray, taskId));
  const [newNotification, setNewNotification] = useState(
    task?.notificationVisualization
  );

  useEffect(() => {
    if (task) {
      setNewNotification(task.notificationVisualization);
    }
  }, [task]);

  useEffect(() => {
    setTask(getTaskById(activeTasksArray, taskId));
  }, [activeTasksArray]);

  async function sendPatchNotificationVisualization() {
    if (userSession?.token) {
      const response = await notificationPatch(userSession.token, taskId);
      if (response?.status === 200) {
        updateTasks();
      } else if (response?.status === 401) {
        logout();
      }
    }
  }

  function redirectEditTaskForm() {
    sendPatchNotificationVisualization();
    navigation.navigate("editTask", { taskId, prevScreen: "notification" });
  }

  return { redirectEditTaskForm, newNotification, task };
}
