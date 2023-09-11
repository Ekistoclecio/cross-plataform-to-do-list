import { Button, Text, Box } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { Svg, Path } from "react-native-svg";
import { useTasksContext } from "../../providers/contexts/tasksContext";
import getTaskById from "../../utils/getTaskById";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../providers/contexts/userContext";
import notificationPatch from "../../services/api/notificationPatch";

interface PropsTaskCardFileInterface {
  taskId: string;
}

export default function TaskCardNotification({
  taskId,
}: PropsTaskCardFileInterface) {
  const navigation = useNavigation();
  const { userSession, logout } = useUserContext();
  const { activeTasksArray, updateTasks } = useTasksContext();
  const [task, setTask] = useState(getTaskById(activeTasksArray, taskId));
  const [newNotification, setNewNotification] = useState(
    task?.notificationVisualization
  );

  useEffect(() => {
    if (task) {
      setNewNotification(task.notificationVisualization);
    }
  }, [task]);

  useEffect(() => {
    setTask(getTaskById(activeTasksArray, taskId));
  }, [activeTasksArray]);

  async function sendPatchNotificationVisualization() {
    if (userSession?.token) {
      const response = await notificationPatch(userSession.token, taskId);
      if (response?.status === 200) {
        updateTasks();
      } else if (response?.status === 401) {
        logout();
      }
    }
  }

  function redirectEditTaskForm() {
    sendPatchNotificationVisualization();
    navigation.navigate("editTask", { taskId, prevScreen: "notification" });
  }
  return (
    <Button
      backgroundColor="#CBD5E0"
      paddingHorizontal={6}
      paddingVertical={4}
      marginHorizontal={8}
      marginBottom={8}
      borderRadius={12}
      height={100}
      flexDirection="column"
      justifyContent="space-between"
      onPress={redirectEditTaskForm}
      sx={{
        ":active": {
          backgroundColor: "#EDF2F7",
        },
      }}
    >
      <Text
        color="#000"
        alignSelf="flex-start"
        fontWeight="bold"
        numberOfLines={3}
      >
        {!newNotification ? (
          <Box paddingHorizontal={5} justifyContent="flex-start">
            <Svg fill="#f00" width={16} height={16} viewBox="0 0 16 16">
              <Path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <Path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </Svg>
          </Box>
        ) : (
          <></>
        )}
        {task?.notificationStatus === 2
          ? `O prazo para a conclusão da tarefa "${task.title}" terminou.`
          : `O prazo para a conclusão da tarefa "${task?.title}" ira acabar em breve.`}
      </Text>

      <Text color="#222" alignSelf="flex-start">
        {" "}
        Prazo final: {task?.deadline}
      </Text>
    </Button>
  );
}
