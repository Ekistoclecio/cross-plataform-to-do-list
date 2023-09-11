import { Box, Button, Text } from "@gluestack-ui/themed";
import { Svg, Path } from "react-native-svg";
import useTaskCard from "../../hooks/useTaskCard";

interface PropsTaskCardInterface {
  archivable: boolean;
  taskId: string;
}

export default function TaskCard({
  archivable,
  taskId,
}: PropsTaskCardInterface) {
  const {
    redirectEditTask,
    task,
    generateExclamationIcon,
    handleDeleteTaskButton,
    sendArchiveTask,
  } = useTaskCard(taskId);
  return (
    <Button
      backgroundColor="#CBD5E0"
      paddingHorizontal={6}
      paddingVertical={4}
      marginHorizontal={12}
      marginBottom={12}
      borderRadius={12}
      height={160}
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      onPress={redirectEditTask}
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
        {task?.title}
      </Text>
      <Box>
        <Box flexDirection="row" alignItems="center">
          <Text
            width={20}
            height={20}
            borderRadius={"$full"}
            backgroundColor="#f00"
            textAlign="center"
            fontWeight="bold"
            color="#fff"
            marginRight={4}
            display={generateExclamationIcon()}
          >
            !
          </Text>
          <Text color="#000">Prazo: {task?.deadline}</Text>

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
        <Box
          width={"100%"}
          gap={8}
          flexDirection="row"
          justifyContent="space-around"
        >
          <Button
            flex={1}
            alignItems="center"
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
          {archivable ? (
            <Button
              flex={1}
              onPress={sendArchiveTask}
              backgroundColor="transparent"
              sx={{
                ":active": {
                  backgroundColor: "#EDF2F7",
                },
              }}
            >
              <Svg width={24} height={24} fill={"#222"} viewBox="0 0 16 16">
                <Path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              </Svg>
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Button>
  );
}
