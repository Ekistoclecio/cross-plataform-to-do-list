import { useTasksContext } from "@/Providers/contexts/tasksContext";
import { useEffect, useState } from "react";

export default function useDashboardPage() {
  const [dateFilter, setDateFilter] = useState<0 | 1 | 2>(0);
  const { tasksArray, archivedTasksArray, currentDate } = useTasksContext();
  const [allTasks, setAllTasks] = useState([] as TaskDataInterface[]);
  const [tasksStatistics, setTasksStatistics] = useState({
    total: {
      total: 0,
      priority: 0,
    },
    late: {
      total: 0,
      priority: 0,
    },
    to_do: {
      total: 0,
      priority: 0,
    },
    progress: {
      total: 0,
      priority: 0,
    },
    completed: {
      total: 0,
      priority: 0,
    },
  });

  useEffect(() => {
    if (tasksArray && archivedTasksArray) {
      setAllTasks(() => [...tasksArray, ...archivedTasksArray]);
    }
  }, [tasksArray, archivedTasksArray]);

  useEffect(() => {
    if (allTasks) {
      setTasksStatistics(() => ({
        total: {
          total: allTasks.length,
          priority: allTasks.filter((task) => task.priority).length,
        },
        late: {
          total: allTasks.filter(
            (task) =>
              new Date(task.deadline).getTime() -
                new Date(currentDate).getTime() <
                0 && task.progressStatus != 2
          ).length,
          priority: allTasks.filter(
            (task) =>
              new Date(task.deadline).getTime() -
                new Date(currentDate).getTime() <
                0 &&
              task.priority &&
              task.progressStatus != 2
          ).length,
        },
        to_do: {
          total: allTasks.filter((task) => task.progressStatus == 0).length,
          priority: allTasks.filter(
            (task) => task.progressStatus == 0 && task.priority
          ).length,
        },
        progress: {
          total: allTasks.filter((task) => task.progressStatus == 1).length,
          priority: allTasks.filter(
            (task) => task.progressStatus == 1 && task.priority
          ).length,
        },
        completed: {
          total: allTasks.filter((task) => task.progressStatus == 2).length,
          priority: allTasks.filter(
            (task) => task.progressStatus == 2 && task.priority
          ).length,
        },
      }));
    }
  }, [allTasks]);

  return {
    dateFilter,
    setDateFilter,
    tasksStatistics,
  };
}
