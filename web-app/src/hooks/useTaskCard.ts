import { useTasksContext } from "@/Providers/contexts/tasksContext";
import archiveTask from "@/services/api/archiveTask";
import deleteTask from "@/services/api/deleteTask";
import getTaskById from "@/utils/getTaskById";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useTaskCard(taskId: string) {
  const { data: session } = useSession();
  const { activeTasksArray, currentDate } = useTasksContext();
  const toast = useToast();
  const [task, setTask] = useState(getTaskById(activeTasksArray, taskId));

  useEffect(() => {
    if (activeTasksArray) {
      setTask(getTaskById(activeTasksArray, taskId));
    }
  }, [activeTasksArray]);

  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEditTaskModal,
    onOpen: onOpenEditTaskModal,
    onClose: onCloseEditTaskModal,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { updateTasks } = useTasksContext();
  const router = useRouter();

  async function sendDeleteTask() {
    if (session?.user.token) {
      const response = await deleteTask(session?.user.token, taskId);
      if (response?.status === 200) {
        toast({
          title: "Tarefa excluida com sucesso.",
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
    }
    onCloseConfirmDelete();
  }

  async function sendArchiveTask(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (session?.user.token) {
      const response = await archiveTask(session?.user.token, taskId);
      if (response?.status === 200) {
        toast({
          title: `Tarefa ${
            response.data.status ? "arquivada" : "desarquivada"
          } com sucesso`,
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
    }
  }

  function generateExclamationIcon() {
    if (task) {
      if (task?.progressStatus === 2) {
        const val =
          new Date(task.deadline).getTime() -
            new Date(task.finishedDate || "").getTime() <
          0
            ? "flex"
            : "none";
        return val;
      } else {
        const val =
          new Date(task.deadline).getTime() - new Date(currentDate).getTime() <
          0
            ? "flex"
            : "none";
        return val;
      }
    } else {
      return "none";
    }
  }

  function handleDeleteTaskButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onOpenConfirmDelete();
  }

  return {
    handleDeleteTaskButton,
    cancelRef,
    sendDeleteTask,
    isOpenConfirmDelete,
    onCloseConfirmDelete,
    isOpenEditTaskModal,
    onCloseEditTaskModal,
    onOpenEditTaskModal,
    task,
    setTask,
    sendArchiveTask,
    generateExclamationIcon,
  };
}
