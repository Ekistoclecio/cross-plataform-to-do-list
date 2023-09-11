import { Box, Text } from "@gluestack-ui/themed";
import AuthForm from "../../components/AuthForm";
export default function Auth() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={"100%"}
      backgroundColor="#1d213a"
    >
      <Box display="flex" alignItems="center" marginBottom={24}>
        <Text size="5xl" fontWeight="bold" color="#4c5ee5">
          Kanban
        </Text>
        <Text size="5xl" marginTop={-24} fontWeight="bold" color="#4c5ee5">
          To Do
        </Text>
        <Text
          color="#718096"
          marginTop={-12}
          fontWeight="$medium"
          textAlign="center"
        >
          Uma ferramenta que te auxiliar a gerenciar suas tarefas com rapidez e
          facilidade.
        </Text>
      </Box>
      <AuthForm />
    </Box>
  );
}
