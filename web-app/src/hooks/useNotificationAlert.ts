import { useTasksContext } from "@/Providers/contexts/tasksContext";
import { useEffect, useState } from "react";

export default function useNotificationAlert() {
  const { tasksArray } = useTasksContext();
  const [newNotification, setNewNotification] = useState(false);

  useEffect(() => {
    const notification = tasksArray.find(
      (task) => !task.notificationVisualization && task.progressStatus != 2
    );
    if (notification != undefined) {
      setNewNotification(true);
    } else {
      setNewNotification(false);
    }
  }, [tasksArray]);

  return { newNotification };
}
