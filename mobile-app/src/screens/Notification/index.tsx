import { Box, FlatList, Heading } from "@gluestack-ui/themed";
import TopBar from "../../components/TopBar";
import TaskCardNotification from "../../components/TaskCardNotification";
import { useTasksContext } from "../../providers/contexts/tasksContext";
export default function Notification() {
  const { activeTasksArray } = useTasksContext();
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
          Notificações
        </Heading>
        <Box flex={1}>
          <FlatList
            data={activeTasksArray}
            keyExtractor={(item) => (item as unknown as TaskDataInterface).id}
            renderItem={({ item }) => {
              if (
                (item as unknown as TaskDataInterface).notificationStatus != 0
              ) {
                return (
                  <TaskCardNotification
                    taskId={(item as unknown as TaskDataInterface).id}
                  />
                );
              } else {
                return null;
              }
            }}
          />
        </Box>
      </Box>
    </>
  );
}
