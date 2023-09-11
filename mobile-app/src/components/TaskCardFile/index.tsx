import { Box, Button, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Svg, Path } from "react-native-svg";
import getTaskById from "../../utils/getTaskById";
import { useEffect, useState } from "react";
import { useTasksContext } from "../../providers/contexts/tasksContext";
import useTaskCard from "../../hooks/useTaskCard";

interface PropsTaskCardFileInterface {
  taskId: string;
}

export default function TaskCardFile({ taskId }: PropsTaskCardFileInterface) {
  const navigation = useNavigation();
  const { archivedTasksArray } = useTasksContext();
  const [task, setTask] = useState(getTaskById(archivedTasksArray, taskId));
  const { handleDeleteTaskButton } = useTaskCard(taskId);

  useEffect(() => {
    setTask(getTaskById(archivedTasksArray, taskId));
  }, [archivedTasksArray]);

  function redirectEditTaskForm() {
    navigation.navigate("editTask", { taskId, prevScreen: "file" });
  }

  function showDelayMessage() {
    if (task?.deadline && task.finishedDate) {
      if (
        new Date(task?.deadline).getTime() -
          new Date(task.finishedDate).getTime() <
        0
      ) {
        return "flex";
      } else {
        return "none";
      }
    }
  }
  return (
    <Button
      backgroundColor="#CBD5E0"
      paddingHorizontal={6}
      paddingVertical={4}
      marginHorizontal={8}
      marginBottom={8}
      borderRadius={12}
      height={140}
      justifyContent="space-between"
      onPress={redirectEditTaskForm}
      sx={{
        ":active": {
          backgroundColor: "#EDF2F7",
        },
      }}
    >
      <Box flex={5} justifyContent="space-between">
        <Text
          color="#000"
          alignSelf="flex-start"
          fontWeight="bold"
          numberOfLines={4}
        >
          {task?.title}
        </Text>
        <Box flexDirection="row">
          <Text color="#000">Concluida: {task?.finishedDate}</Text>
          <Text
            backgroundColor="#f00"
            width={88}
            textAlign="center"
            borderRadius={4}
            fontWeight="bold"
            color="#fff"
            marginLeft={4}
            display={task?.priority ? "flex" : "none"}
          >
            Prioridade
          </Text>
        </Box>
        <Text color="#f00" display={showDelayMessage()}>
          Concluida com atraso.
        </Text>
      </Box>
      <Box
        flex={1}
        flexDirection="column"
        justifyContent="space-around"
        height={"100%"}
      >
        <Button
          onPress={handleDeleteTaskButton}
          backgroundColor="transparent"
          sx={{
            ":active": {
              backgroundColor: "#EDF2F7",
            },
          }}
        >
          <Svg width={24} height={24} fill={"#222"} viewBox="0 0 16 16">
            <Path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <Path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
          </Svg>
        </Button>
        <Button
          onPress={() => console.log("vc clicou para deletar uma task")}
          backgroundColor="transparent"
          sx={{
            ":active": {
              backgroundColor: "#EDF2F7",
            },
          }}
        >
          <Svg width={24} height={24} fill={"#222"} viewBox="0 0 16 16">
            <Path d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z" />
          </Svg>
        </Button>
      </Box>
    </Button>
  );
}
