import { Button, Text, Box } from "@gluestack-ui/themed";
import { Svg, Path } from "react-native-svg";
import useTaskCardNotification from "../../hooks/useTaskCardNotification";

export default function TaskCardNotification({
  taskId,
}: PropsTaskCardFileInterface) {
  const { redirectEditTaskForm, newNotification, task } =
    useTaskCardNotification(taskId);
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
