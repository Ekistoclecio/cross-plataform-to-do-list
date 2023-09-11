import { useEffect, useState } from "react";
import { useTasksContext } from "../providers/contexts/tasksContext";

export default function useChartLine(
  priority: boolean,
  filterChart: 0 | 1 | 2
) {
  const [maxDomain, setMaxDomain] = useState(1);
  const { activeTasksArray, archivedTasksArray } = useTasksContext();
  const [allTasks, setAllTasks] = useState([] as TaskDataInterface[]);
  const [differenceInDays, setDifferenceInDais] = useState(0);
  const [labelsChartCompletedOnTime, setLabelsChartCompletedOnTime] = useState(
    [] as string[]
  );
  const [labelsChartLateCompleted, setLabelsChartLateCompleted] = useState(
    [] as string[]
  );
  const [tasksCompletedOnTime, setTasksCompletedOnTime] = useState<
    { x: string; y: number }[]
  >([]);
  const [tasksCompletedLate, setTasksCompletedLate] = useState<
    { x: string; y: number }[]
  >([]);

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

    if (filterChart === 0) {
      setDifferenceInDais(() => 6);
    } else if (filterChart === 1) {
      setDifferenceInDais(() => 29);
    } else if (filterChart === 2) {
      setDifferenceInDais(() => 59);
    }
  }, [differenceInDays, activeTasksArray, archivedTasksArray, filterChart]);

  useEffect(() => {
    if (allTasks) {
      setLabelsChartCompletedOnTime(() => getLabelsCompletedOnTime());
      setLabelsChartLateCompleted(() => getLabelsCompletedLate());
      setTasksCompletedOnTime(() => tasksCompletedOnTimeData());
      setTasksCompletedLate(() => tasksCompletedLateDataArray());
      setMaxDomain(() => getMaxDomain() + 5);
    }
  }, [allTasks]);

  function getDateArray() {
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

  function getMaxDomain() {
    const valuesArray = [
      ...getLabelsCompletedOnTime().map((item) => Number(item)),
      ...getLabelsCompletedLate().map((item) => Number(item)),
    ];

    return Math.max(...valuesArray);
  }

  function getLabelsCompletedOnTime() {
    const datesArray = getDateArray();
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
    return valuesArray.map((item) => item.toString());
  }

  function getLabelsCompletedLate() {
    const datesArray = getDateArray();
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
    return valuesArray.map((item) => item.toString());
  }

  function tasksCompletedOnTimeData() {
    const datesArray = getDateArray();
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

    const dataObj = valuesArray.map((item, index) => {
      return { x: datesArray[index], y: item };
    });

    return dataObj;
  }

  function tasksCompletedLateDataArray() {
    const datesArray = getDateArray();
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

    const dataObj = valuesArray.map((item, index) => {
      return { x: datesArray[index], y: item };
    });

    return dataObj;
  }

  function calculateWidthChart() {
    return 90 * getDateArray().length;
  }

  return {
    calculateWidthChart,
    maxDomain,
    tasksCompletedOnTime,
    labelsChartCompletedOnTime,
    tasksCompletedLate,
    labelsChartLateCompleted,
  };
}
