import { Box, Heading, Text } from "@gluestack-ui/themed";
import { VictoryPie } from "victory-native";
import useChartPie from "../../hooks/useChartPie";

export default function ChartPie({ priority, title }: PropsChartPieInterface) {
  const { dataPieGraph } = useChartPie(priority);
  return (
    <Box
      backgroundColor="#0d112a"
      borderRadius={"$lg"}
      paddingVertical={12}
      alignItems="center"
    >
      <Heading textAlign="center" color="#CBD5E0">
        {title}
      </Heading>
      <Box height={320} marginTop={-70} alignItems="center">
        <VictoryPie
          data={dataPieGraph}
          labels={dataPieGraph.map((val) => `${val}`)}
          colorScale={["#00D8D0", "#0072bb", "#004da8", "#002f5e"]}
          radius={85}
          animate={{
            duration: 1000,
            easing: "circle",
          }}
          style={{
            labels: {
              fill: "#CBD5E0",
              fontSize: 16,
            },
          }}
        />
      </Box>
      <Box flexDirection="column" width={"100%"} alignItems="center">
        <Box flexDirection="row" paddingLeft={90} width={"100%"} gap={50}>
          <Box flexDirection="row" alignItems="center">
            <Box
              width={10}
              height={10}
              borderRadius={"$full"}
              backgroundColor="#00D8D0"
              marginRight={5}
            ></Box>
            <Text color="#CBD5E0">A fazer</Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Box
              width={10}
              height={10}
              borderRadius={"$full"}
              backgroundColor="#0072bb"
              marginRight={5}
            ></Box>
            <Text color="#CBD5E0">Em progresso</Text>
          </Box>
        </Box>
        <Box flexDirection="row" paddingLeft={90} gap={21} width={"100%"}>
          <Box flexDirection="row" alignItems="center">
            <Box
              width={10}
              height={10}
              borderRadius={"$full"}
              backgroundColor="#004da8"
              marginRight={5}
            ></Box>
            <Text color="#CBD5E0">Concluidas</Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Box
              width={10}
              height={10}
              borderRadius={"$full"}
              backgroundColor="#002f5e"
              marginRight={5}
            ></Box>
            <Text color="#CBD5E0">Em atraso</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
