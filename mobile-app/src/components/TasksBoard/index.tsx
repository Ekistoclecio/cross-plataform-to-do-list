import { Box, FlatList, Heading } from "@gluestack-ui/themed";
import TaskCard from "../TaskCard";
import { useTasksContext } from "../../providers/contexts/tasksContext";
import { ListRenderItemInfo } from "react-native";

interface PropsTaskBoardInterface {
  title: string;
  progressStatus: 0 | 1 | 2;
}

export default function TasksBoard({
  title,
  progressStatus,
}: PropsTaskBoardInterface) {
  const { activeTasksArray } = useTasksContext();
  return (
    <Box
      borderRadius={12}
      paddingBottom={4}
      width={290}
      backgroundColor="#0d112a"
    >
      <Heading
        color="#6c7ef5"
        size="3xl"
        textAlign="center"
        borderBottomColor="#1d213a"
        borderBottomWidth={2}
        marginBottom={12}
      >
        {title}
      </Heading>
      <FlatList
        data={activeTasksArray}
        keyExtractor={(item) => (item as unknown as TaskDataInterface).id}
        renderItem={({ item }) => {
          if (
            (item as unknown as TaskDataInterface).progressStatus ===
            progressStatus
          ) {
            return (
              <TaskCard
                archivable={title === "Concluidas" ? true : false}
                taskId={(item as unknown as TaskDataInterface).id}
              />
            );
          } else {
            return <></>;
          }
        }}
      />
    </Box>
  );
}
