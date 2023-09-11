import { Box, Button, Heading, ScrollView, Text } from "@gluestack-ui/themed";
import TopBar from "../../components/TopBar";
import TasksBoard from "../../components/TasksBoard";
import { useNavigation } from "@react-navigation/native";
export default function KanbanList() {
  const navigation = useNavigation();

  function handleNewTask() {
    navigation.navigate("createTask");
  }

  return (
    <>
      <Box height={"12%"} minHeight={85}>
        <TopBar />
      </Box>
      <Box height={"88%"} backgroundColor="#1d213a" padding={12}>
        <Heading
          color="#6c7ef5"
          size="xl"
          paddingBottom={12}
          borderBottomWidth={0.5}
          borderColor="#E2E8F0"
          marginBottom={12}
        >
          Tarefas
        </Heading>
        <ScrollView horizontal>
          <Box flex={1} flexDirection="row" gap={12}>
            <TasksBoard title="A fazer" progressStatus={0} />
            <TasksBoard title="Em Progresso" progressStatus={1} />
            <TasksBoard title="Concluidas" progressStatus={2} />
          </Box>
        </ScrollView>
        <Button
          marginTop={12}
          backgroundColor="#4c5ee5"
          onPress={handleNewTask}
          sx={{
            ":active": {
              backgroundColor: "#1c2eb5",
            },
          }}
        >
          <Text color="#CBD5E0" fontWeight="bold" fontSize={"$lg"}>
            Criar nova tarefa
          </Text>
        </Button>
      </Box>
    </>
  );
}
