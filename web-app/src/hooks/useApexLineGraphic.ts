import { useTasksContext } from "@/Providers/contexts/tasksContext";
import { useEffect, useState } from "react";

export default function useApexLineGraphic(
  filterType: 0 | 1 | 2,
  priority: boolean
) {
  const { activeTasksArray, archivedTasksArray, currentDate } =
    useTasksContext();
  const [allTasks, setAllTasks] = useState([] as TaskDataInterface[]);
  const [differenceInDays, setDifferenceInDais] = useState(0);
  const [tasksCompletedOnTime, setTasksCompletedOnTime] = useState(
    [] as number[]
  );
  const [tasksCompletedLate, setTasksCompletedLate] = useState([] as number[]);
  const [categories, setCategories] = useState([] as string[]);

  useEffect(() => {
    if (activeTasksArray && archivedTasksArray) {
      if (priority) {
        setAllTasks(() => {
          const array = [...activeTasksArray, ...archivedTasksArray];
          return array.filter(
            (task) => task.progressStatus === 2 && task.priority
          );
        });
      } else {
        setAllTasks(() => {
          const array = [...activeTasksArray, ...archivedTasksArray];
          return array.filter((task) => task.progressStatus === 2);
        });
      }
    }

    if (filterType === 0) {
      setDifferenceInDais(() => 6);
    } else if (filterType === 1) {
      setDifferenceInDais(() => 29);
    } else if (filterType === 2) {
      setDifferenceInDais(() => 89);
    }
  }, [differenceInDays, activeTasksArray, archivedTasksArray, filterType]);

  useEffect(() => {
    if (allTasks) {
      setTasksCompletedOnTime(() => tasksCompletedOnTimedataArray());
      setTasksCompletedLate(() => tasksCompletedLatedataArray());
      setCategories(() => getCategoriesArray());
    }
  }, [allTasks]);

  function getCategoriesArray() {
    let endDate = new Date();
    let startDate = new Date();
    let datesArray = [] as string[];
    startDate.setDate(endDate.getDate() - (differenceInDays + 1));
    while (startDate <= endDate) {
      startDate.setDate(startDate.getDate() + 1);
      const year = startDate.getFullYear();
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
      const day = startDate.getDate().toString().padStart(2, "0");
      datesArray.push(`${year}-${month}-${day}`);
    }
    return datesArray;
  }

  function tasksCompletedOnTimedataArray() {
    const datesArray = getCategoriesArray();
    let valuesArray = [] as number[];
    for (let i = 0; i <= differenceInDays; i++) {
      let auxArray = allTasks.filter((task) => {
        if (
          task.finishedDate &&
          task.finishedDate == datesArray[i] &&
          task.progressStatus === 2
        )
          return task;
      });
      valuesArray.push(auxArray.length);
    }
    return valuesArray;
  }

  function tasksCompletedLatedataArray() {
    const datesArray = getCategoriesArray();
    let valuesArray = [] as number[];
    for (let i = 0; i <= differenceInDays; i++) {
      let auxArray = allTasks.filter((task) => {
        if (
          task.finishedDate &&
          task.finishedDate == datesArray[i] &&
          task.progressStatus === 2 &&
          new Date(task.deadline).getTime() -
            new Date(task.finishedDate).getTime() <
            0
        )
          return task;
      });
      valuesArray.push(auxArray.length);
    }
    return valuesArray;
  }

  function calculateWidthChart() {
    if (filterType === 0) {
      return 151 * getCategoriesArray().length;
      // 7 dias
    } else {
      return 70 * getCategoriesArray().length;
      // 30 dias
    }
  }

  return {
    categories,
    tasksCompletedOnTime,
    tasksCompletedLate,
    calculateWidthChart,
  };
}
