import { useEffect, useState } from "react";
import { useTasksContext } from "../providers/contexts/tasksContext";
import { useUserContext } from "../providers/contexts/userContext";

export default function useChartPie(priority: boolean) {
  const { getCurrentDate } = useUserContext();
  const { activeTasksArray, archivedTasksArray } = useTasksContext();
  const [dataPieGraph, setDatapieGraph] = useState([] as number[]);
  const [allTasks, setAllTasks] = useState([] as TaskDataInterface[]);

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
    if (activeTasksArray) {
      setDatapieGraph([
        allTasks.filter((task) => task.progressStatus === 0).length,
        allTasks.filter((task) => task.progressStatus === 1).length,
        allTasks.filter((task) => task.progressStatus === 2).length,
        allTasks.filter(
          (task) =>
            new Date(getCurrentDate()).getTime() -
              new Date(task.deadline).getTime() >
              0 && task.progressStatus != 2
        ).length,
      ]);
    }
  }, [allTasks]);

  return { dataPieGraph };
}
