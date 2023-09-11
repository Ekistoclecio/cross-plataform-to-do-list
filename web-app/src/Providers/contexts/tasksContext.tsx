import listUserTasks from "@/services/api/listUserTasks";
import { signOut, useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import listArchiveUserTasks from "@/services/api/listArchivedTasks";

interface TasksContextInterface {
  tasksArray: TaskDataInterface[];
  archivedTasksArray: TaskDataInterface[];
  currentDate: string;
  setTasksArray: (val: any) => void;
  setArchivedTasksArray: (val: any) => void;
  updateTasks: () => void;
}

const tasksContext = createContext<TasksContextInterface>(
  {} as TasksContextInterface
);

const Provider = tasksContext.Provider;

export const TasksProvider = (props: any) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [tasksArray, setTasksArray] = useState([] as TaskDataInterface[]);
  const [archivedTasksArray, setArchivedTasksArray] = useState(
    [] as TaskDataInterface[]
  );
  const [currentDate, setCurrentDate] = useState("");

  async function updateTasks() {
    if (session?.user.token) {
      const responseTasksActive = await listUserTasks(session.user.token);
      if (responseTasksActive?.status === 401) {
        await signOut({
          redirect: false,
        });

        router.replace("/");
        return;
      }

      const ActiveTasksArray = responseTasksActive?.data.sort(
        (val1: TaskDataInterface, val2: TaskDataInterface) => {
          const date1 = new Date(val1.deadline as string);
          const date2 = new Date(val2.deadline as string);

          return date1.getTime() - date2.getTime();
        }
      );
      setTasksArray(() => ActiveTasksArray);

      const responseTasksArchived = await listArchiveUserTasks(
        session.user.token
      );

      const ArchivedTasksArray = responseTasksArchived?.data.sort(
        (val1: TaskDataInterface, val2: TaskDataInterface) => {
          const date1 = new Date(val1.deadline as string);
          const date2 = new Date(val2.deadline as string);

          return date1.getTime() - date2.getTime();
        }
      );
      setArchivedTasksArray(() => ArchivedTasksArray);
    }
  }

  function getCurrentDate() {
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
  }

  useEffect(() => {
    updateTasks();
    getCurrentDate();
  }, [session]);

  return (
    <Provider
      value={{
        tasksArray,
        archivedTasksArray,
        currentDate,
        setTasksArray,
        setArchivedTasksArray,
        updateTasks,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useTasksContext = () => useContext(tasksContext);
