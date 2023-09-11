import { Box, Heading, ScrollView, Text } from "@gluestack-ui/themed";
import {
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
} from "victory-native";
import { useUserContext } from "../../providers/contexts/userContext";
import { useTasksContext } from "../../providers/contexts/tasksContext";
import { useEffect, useState } from "react";

interface PropsChartLineInterface {
  title: string;
  priority: boolean;
  filterChart: 0 | 1 | 2;
}

export default function ChartLine({
  title,
  priority,
  filterChart,
}: PropsChartLineInterface) {
  const { getCurrentDate } = useUserContext();
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
    if (filterChart === 0) {
      return 90 * getDateArray().length;
      // 7 dias
    } else {
      return 90 * getDateArray().length;
      // 30 dias
    }
  }

  return (
    <Box
      alignItems="center"
      backgroundColor="#0d112a"
      borderRadius={"$lg"}
      paddingVertical={12}
    >
      <Heading textAlign="center" color="#CBD5E0">
        {title}
      </Heading>
      <ScrollView horizontal>
        <VictoryChart
          animate={{ duration: 1000, easing: "circle" }}
          width={calculateWidthChart()}
        >
          <VictoryAxis
            crossAxis
            key={1}
            theme={VictoryTheme.material}
            standalone={false}
            style={{
              axis: { stroke: "#CBD5E0" },
              ticks: { stroke: "#CBD5E0", size: 5 },
              tickLabels: {
                fill: "#CBD5E0",
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            key={2}
            standalone={false}
            theme={VictoryTheme.material}
            offsetX={calculateWidthChart() - 50}
            domain={[0, maxDomain]}
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "#4A5568", size: calculateWidthChart() - 100 },
              tickLabels: {
                fill: "#CBD5E0",
                orientation: "right",
              },
            }}
          />
          <VictoryLine
            domainPadding={{
              x: 5,
            }}
            animate={{ duration: 1000, easing: "circle" }}
            style={{
              data: { stroke: "#3182CE", strokeWidth: 5 },
              labels: {
                fill: "#CBD5E0",
                fontSize: 16,
              },
            }}
            data={tasksCompletedOnTime}
            labels={labelsChartCompletedOnTime}
          />

          <VictoryLine
            padding={100}
            domainPadding={{
              x: 5,
            }}
            animate={{ duration: 1000, easing: "circle" }}
            style={{
              data: { stroke: "#805AD5", strokeWidth: 5 },
              labels: {
                fill: "#CBD5E0",
                fontSize: 16,
              },
            }}
            data={tasksCompletedLate}
            labels={labelsChartLateCompleted}
          />
        </VictoryChart>
      </ScrollView>
      <Box width={"100%"} paddingLeft={30} marginTop={-15}>
        <Box flexDirection="row" alignItems="center">
          <Box
            width={10}
            height={10}
            borderRadius={"$full"}
            backgroundColor="#3182CE"
            marginRight={5}
          ></Box>
          <Text color="#CBD5E0">Total de tarefas concluidas</Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Box
            width={10}
            height={10}
            borderRadius={"$full"}
            backgroundColor="#805AD5"
            marginRight={5}
          ></Box>
          <Text color="#CBD5E0">Tarefas concluidas com atraso</Text>
        </Box>
      </Box>
    </Box>
  );
}
