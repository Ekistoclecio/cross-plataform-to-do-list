import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useTasksContext } from "@/Providers/contexts/tasksContext";
import updateTask from "@/services/api/updateTask";
import getTaskById from "@/utils/getTaskById";
import { useToast } from "@chakra-ui/react";

export default function useEditTaskModal(
  taskId: string,
  onClose: () => void,
  file?: boolean
) {
  const { data: sesseion } = useSession();
  const { updateTasks } = useTasksContext();
  const [editMode, setEditMode] = useState(false);
  const [editTaskForm, setEditTaskForm] = useState({
    progressStatus: 0,
    title: "",
    description: "",
    priority: false,
    deadline: "",
  });
  const { activeTasksArray, archivedTasksArray } = useTasksContext();
  const [task, setTask] = useState(getTaskById(activeTasksArray, taskId));

  useEffect(() => {
    if (activeTasksArray) {
      if (file) {
        setTask(getTaskById(archivedTasksArray, taskId));
      } else {
        setTask(getTaskById(activeTasksArray, taskId));
      }
    }
  }, [activeTasksArray]);

  useEffect(() => {
    if (task != null) {
      setEditTaskForm(() => ({
        progressStatus: task.progressStatus,
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        deadline: task.deadline,
      }));
    }
  }, [task]);

  const router = useRouter();
  const toast = useToast();

  function onChangeInputs(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    setEditTaskForm({ ...editTaskForm, [e.target.name]: e.target.value });
  }

  function handleEditButton() {
    setEditMode(true);
  }

  async function handleSaveButton() {
    if (sesseion?.user.token) {
      const response = await updateTask(
        sesseion.user.token,
        taskId,
        editTaskForm
      );
      if (response?.status === 200) {
        toast({
          title: "Tarefa atualizada com sucesso.",
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
      }
      closeEditModal();
    }
  }

  function handleStatusSelect(val: number) {
    setEditTaskForm({ ...editTaskForm, progressStatus: val });
  }

  function closeEditModal() {
    if (task) {
      setEditTaskForm(() => ({
        progressStatus: task.progressStatus,
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        deadline: task.deadline,
      }));
    }
    setEditMode(false);
    onClose();
  }

  return {
    closeEditModal,
    editMode,
    editTaskForm,
    task,
    handleStatusSelect,
    onChangeInputs,
    handleSaveButton,
    handleEditButton,
  };
}
