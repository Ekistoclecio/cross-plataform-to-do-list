import { useTasksContext } from "@/Providers/contexts/tasksContext";
import createNewTask from "@/services/api/createNewTask";
import { useToast } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function useCreateTaskModal({
  isOpen,
  onClose,
}: PropsCreateTaskModalInterface) {
  const { updateTasks } = useTasksContext();
  const router = useRouter();
  const { data: session } = useSession();
  const toast = useToast();
  const [currentDate, setCurrentDate] = useState("");
  const [createTaskForm, setCreateTaskForm] = useState({
    title: "",
    description: "",
    priority: false,
    deadline: "",
  });

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let formatedMonth;
    let formatedDay;

    if (month < 10) {
      formatedMonth = `0${month}`;
    } else {
      formatedMonth = month;
    }
    if (day < 10) {
      formatedDay = `0${day}`;
    } else {
      formatedDay = day;
    }

    setCurrentDate(`${year}-${formatedMonth}-${formatedDay}`);
  }, [isOpen]);

  function closeModal() {
    onClose();
    setCreateTaskForm({
      title: "",
      description: "",
      priority: false,
      deadline: "",
    });
  }

  function onChangeInputs(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    setCreateTaskForm({ ...createTaskForm, [e.target.name]: e.target.value });
  }

  function validateFormData() {
    const regexMinCaracters = /[^\s]{1,}/;
    if (!regexMinCaracters.test(createTaskForm.title)) {
      toast({
        title: "O titulo da tarefa não pode ser vazio",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    } else {
      return true;
    }
  }

  async function handleCreateNewTask() {
    if (validateFormData()) {
      if (session?.user.token) {
        const response = await createNewTask(
          createTaskForm,
          session.user.token
        );
        if (response?.status === 201) {
          toast({
            title: "Nova tarefa criada com sucesso",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          updateTasks();
        } else if (response?.status === 401) {
          await signOut({
            redirect: false,
          });

          router.replace("/");
        } else {
          toast({
            title: "Erro na criação da tarefa",
            description:
              "Ocorreu um erro ou tentar criar a nova tarefa, tente novamente",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
      onClose();
      setCreateTaskForm({
        title: "",
        description: "",
        priority: false,
        deadline: "",
      });
    }
  }

  return {
    currentDate,
    createTaskForm,
    handleCreateNewTask,
    onChangeInputs,
    setCreateTaskForm,
    closeModal,
  };
}
