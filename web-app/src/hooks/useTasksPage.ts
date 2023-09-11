import { useTasksContext } from "@/Providers/contexts/tasksContext";
import progressStatusPatch from "@/services/api/progressStatusPatch";
import { useDisclosure } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useTasksPage() {
  const {
    isOpen: createTaskModalisOpen,
    onOpen: createTaskModalonOpen,
    onClose: createTaskModalonClose,
  } = useDisclosure();
  const { data: session } = useSession();
  const { updateTasks, activeTasksArray, setActiveTasksArray } =
    useTasksContext();
  const router = useRouter();

  async function handleOnDragEnd(result: any) {
    console.log(result);
    if (result.destination) {
      setActiveTasksArray(
        activeTasksArray.map((task) => {
          if (task.id == result.draggableId) {
            task.progressStatus = Number(result.destination.droppableId) as
              | 0
              | 1
              | 2;
            return task;
          } else {
            return task;
          }
        })
      );
      if (session?.user.token) {
        const response = await progressStatusPatch(
          session.user.token,
          result.draggableId,
          Number(result.destination.droppableId)
        );
        if (response?.status === 401) {
          await signOut({
            redirect: false,
          });

          router.replace("/");
        } else if (response?.status != 200) {
          updateTasks();
        }
      }
    }
  }
  return {
    createTaskModalisOpen,
    createTaskModalonClose,
    createTaskModalonOpen,
    handleOnDragEnd,
  };
}
