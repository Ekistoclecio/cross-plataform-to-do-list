import { Box, Heading, ScrollView, Text } from "@gluestack-ui/themed";
import {
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
} from "victory-native";
import useChartLine from "../../hooks/useChartLine";

export default function ChartLine({
  title,
  priority,
  filterChart,
}: PropsChartLineInterface) {
  const {
    calculateWidthChart,
    maxDomain,
    tasksCompletedOnTime,
    labelsChartCompletedOnTime,
    tasksCompletedLate,
    labelsChartLateCompleted,
  } = useChartLine(priority, filterChart);
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
