import { Box, FlatList, Heading } from "@gluestack-ui/themed";
import TopBar from "../../components/TopBar";
import TaskCardFile from "../../components/TaskCardFile";
import { useTasksContext } from "../../providers/contexts/tasksContext";
export default function File() {
  const { archivedTasksArray } = useTasksContext();
  return (
    <>
      <Box height={"12%"} minHeight={85}>
        <TopBar />
      </Box>
      <Box padding={12} height={"88%"} backgroundColor="#1d213a">
        <Heading
          color="#6c7ef5"
          size="xl"
          paddingBottom={12}
          borderBottomWidth={0.5}
          borderColor="#E2E8F0"
          marginBottom={12}
        >
          Tarefas Arquivadas
        </Heading>
        <Box flex={1}>
          <FlatList
            data={archivedTasksArray}
            keyExtractor={(item) => (item as unknown as TaskDataInterface).id}
            renderItem={({ item }) => (
              <TaskCardFile
                taskId={(item as unknown as TaskDataInterface).id}
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
}
