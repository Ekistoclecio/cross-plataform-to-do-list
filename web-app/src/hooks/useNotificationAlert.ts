import { useTasksContext } from "@/Providers/contexts/tasksContext";
import { useEffect, useState } from "react";

export default function useNotificationAlert() {
  const { activeTasksArray } = useTasksContext();
  const [newNotification, setNewNotification] = useState(false);

  useEffect(() => {
    const notification = activeTasksArray.find(
      (task) => !task.notificationVisualization && task.progressStatus != 2
    );
    if (notification != undefined) {
      setNewNotification(true);
    } else {
      setNewNotification(false);
    }
  }, [activeTasksArray]);

  return { newNotification };
}
