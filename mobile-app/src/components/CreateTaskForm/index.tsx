import {
  Box,
  Button,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Input,
  InputField,
  Text,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import DatePicker from "../DatePicker";
import { Alert, TextInput } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import formatDate from "../../utils/formatDate";
import { regexMinCaracters } from "../AuthForm";
import { useUserContext } from "../../providers/contexts/userContext";
import createNewTask from "../../services/api/createNewTask";
import { useTasksContext } from "../../providers/contexts/tasksContext";

export default function CreateTaskForm() {
  const navegation = useNavigation();
  const { userSession, logout } = useUserContext();
  const { updateTasks } = useTasksContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: formatDate(new Date()),
    priority: false,
  });

  function validateFormData() {
    if (!regexMinCaracters.test(formData.title)) {
      Alert.alert(
        "Titulo invalido",
        "O titulo da tarefa deve conter pelo menos 6 caracteres"
      );
      return false;
    }
    return true;
  }

  async function handleCreateNewTask() {
    if (validateFormData()) {
      if (userSession?.token) {
        const response = await createNewTask(formData, userSession.token);
        if (response?.status === 201) {
          Alert.alert("Sucesso", "Tarefa criada com sucesso");
          setFormData({
            title: "",
            description: "",
            priority: false,
            deadline: formatDate(new Date()),
          });
          updateTasks();
        } else if (response?.status === 401) {
          logout();
        } else {
          Alert.alert(
            "Erro na criação da tarefa",
            "Ocorreu um erro ou tentar criar a nova tarefa, verifique os dados e tente novamente"
          );
        }
      }
    }
  }

  function handleCancelButton() {
    setFormData({
      title: "",
      description: "",
      priority: false,
      deadline: formatDate(new Date()),
    });
    navegation.navigate("kanbanList");
  }

  return (
    <Box height={"100%"} justifyContent="space-between">
      <Box>
        <Text color="#CBD5E0" marginTop={8} fontWeight="bold" fontSize={20}>
          Titulo:{" "}
          <Text fontWeight="$normal" color="#718096">
            (Maximo de 128 caracteres)
          </Text>
        </Text>
        <Input marginTop={8} variant="outline" size="lg" borderColor="#718096">
          <TextInput
            style={{
              color: "#CBD5E0",
              fontSize: 18,
              padding: 10,
              width: "100%",
            }}
            placeholderTextColor={"#718096"}
            placeholder="Titulo da tarefa"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
        </Input>
        <Text marginTop={24} color="#CBD5E0" fontWeight="bold" fontSize={20}>
          Descrição:
        </Text>
        <Textarea
          marginTop={8}
          size="lg"
          w="100%"
          borderColor="#718096"
          height={"40%"}
          aria-label="textarea"
        >
          <TextInput
            style={{
              color: "#CBD5E0",
              fontSize: 18,
              padding: 10,
              height: "100%",
              textAlignVertical: "top",
            }}
            placeholderTextColor={"#718096"}
            placeholder="Descrição da tarefa"
            multiline={true}
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
          />
        </Textarea>
        <Box flexDirection="row" alignItems="center" gap={12} marginTop={24}>
          <Text color="#CBD5E0" fontWeight="bold" fontSize={20}>
            Prazo final:
          </Text>
          <DatePicker
            isReadOnly={false}
            setFormData={setFormData}
            formData={formData}
            aria-label="datePicker"
          />
        </Box>
        <Checkbox
          size="md"
          value="priority"
          marginTop={24}
          aria-label="checkbox"
          isChecked={formData.priority}
          onChange={() =>
            setFormData({ ...formData, priority: !formData.priority })
          }
        >
          <CheckboxIndicator
            mr="$2"
            width={30}
            height={30}
            aria-label="CheckboxIndicator"
          >
            <CheckboxIcon as={CheckIcon} aria-label={"icon"} />
          </CheckboxIndicator>
          <CheckboxLabel
            marginBottom={-5}
            color="#CBD5E0"
            fontWeight="bold"
            fontSize={18}
            aria-label="checkbox label"
          >
            Definir essa tarefa como prioridade.
          </CheckboxLabel>
        </Checkbox>
      </Box>
      <Box flexDirection="row" gap={20} marginBottom={20}>
        <Button
          onPress={handleCancelButton}
          flex={1}
          backgroundColor="#4A5568"
          sx={{
            ":active": {
              backgroundColor: "#2D3748",
            },
          }}
        >
          <Text color="#CBD5E0" fontWeight="bold" size="lg">
            Cancelar
          </Text>
        </Button>
        <Button
          onPress={handleCreateNewTask}
          flex={1}
          backgroundColor="#4c5ee5"
          sx={{
            ":active": {
              backgroundColor: "#1c2eb5",
            },
          }}
        >
          <Text color="#CBD5E0" fontWeight="bold" size="lg">
            Criar
          </Text>
        </Button>
      </Box>
    </Box>
  );
}
