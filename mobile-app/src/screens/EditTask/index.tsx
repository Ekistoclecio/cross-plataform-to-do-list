import { Box, Heading } from "@gluestack-ui/themed";
import TopBar from "../../components/TopBar";
import EditTaskForm from "../../components/EditTaskForm";

export default function EditTask() {
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
          Editar Tarefa
        </Heading>
        <Box flex={1}>
          <EditTaskForm />
        </Box>
      </Box>
    </>
  );
}
