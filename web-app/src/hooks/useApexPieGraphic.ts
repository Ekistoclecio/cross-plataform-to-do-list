import { useTasksContext } from "@/Providers/contexts/tasksContext";
import { useEffect, useState } from "react";

export default function useApexPieGraphic(priority: boolean) {
  const { activeTasksArray, archivedTasksArray, currentDate } =
    useTasksContext();
  const [allTasks, setAllTasks] = useState([] as TaskDataInterface[]);
  const [series, setSeries] = useState([] as number[]);
  useEffect(() => {
    if (activeTasksArray && archivedTasksArray && priority) {
      setAllTasks(() =>
        [...activeTasksArray, ...archivedTasksArray].filter(
          (task) => task.priority == true
        )
      );
    } else if (activeTasksArray && archivedTasksArray) {
      setAllTasks(() => [...activeTasksArray, ...archivedTasksArray]);
    }
  }, [activeTasksArray, archivedTasksArray]);

  useEffect(() => {
    setSeries(() => [
      allTasks.filter((task) => task.progressStatus === 0).length,
      allTasks.filter((task) => task.progressStatus === 1).length,
      allTasks.filter((task) => task.progressStatus === 2).length,
      allTasks.filter(
        (task) =>
          new Date(currentDate).getTime() - new Date(task.deadline).getTime() >
            0 && task.progressStatus != 2
      ).length,
    ]);
  }, [allTasks]);

  return {
    series,
  };
}
