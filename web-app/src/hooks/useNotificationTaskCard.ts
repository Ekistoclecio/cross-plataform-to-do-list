import { useTasksContext } from "@/Providers/contexts/tasksContext";
import notificationPatch from "@/services/api/notificationPatch";
import getTaskById from "@/utils/getTaskById";
import { useDisclosure } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useNotificationTaskCard(taskId: string) {
  const {
    isOpen: isOpenEditModalByNotification,
    onOpen: onOpenEditModalByNotification,
    onClose: onCloseEditModalByNotification,
  } = useDisclosure();
  const { data: session } = useSession();
  const { tasksArray, updateTasks } = useTasksContext();
  const [task, setTask] = useState(getTaskById(tasksArray, taskId));
  const router = useRouter();

  async function handleClickTaskCard() {
    if (session?.user.token) {
      const response = await notificationPatch(session.user.token, taskId);
      if (response?.status === 200) {
        updateTasks();
      } else if (response?.status === 401) {
        await signOut({
          redirect: false,
        });

        router.replace("/");
      }
      onOpenEditModalByNotification();
    }
  }
  return {
    task,
    handleClickTaskCard,
    isOpenEditModalByNotification,
    onCloseEditModalByNotification,
  };
}
