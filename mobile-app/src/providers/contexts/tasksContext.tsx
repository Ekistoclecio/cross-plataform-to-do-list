import { createContext, useContext, useEffect, useState } from "react";
import listActiveTasks from "../../services/api/listActiveTasks";
import listArchivedTasks from "../../services/api/listArchivedTasks";
import { useUserContext } from "./userContext";

interface TasksContextInterface {
  activeTasksArray: TaskDataInterface[];
  archivedTasksArray: TaskDataInterface[];
  setActiveTasksArray: (val: TaskDataInterface[]) => void;
  setArchivedTasksArray: (val: TaskDataInterface[]) => void;
  updateTasks: () => void;
}

const tasksContext = createContext<TasksContextInterface>(
  {} as TasksContextInterface
);

const Provider = tasksContext.Provider;

export const TasksProvider = (props: any) => {
  const { userSession, logout, getCurrentDate } = useUserContext();
  const [activeTasksArray, setActiveTasksArray] = useState(
    [] as TaskDataInterface[]
  );
  const [archivedTasksArray, setArchivedTasksArray] = useState(
    [] as TaskDataInterface[]
  );

  async function updateTasks() {
    if (userSession?.token) {
      const responseActiveTaskss = await listActiveTasks(userSession.token);
      if (responseActiveTaskss?.status === 401) {
        logout();
        return;
      }

      const ActiveTasksArray = responseActiveTaskss?.data.sort(
        (val1: TaskDataInterface, val2: TaskDataInterface) => {
          const date1 = new Date(val1.deadline as string);
          const date2 = new Date(val2.deadline as string);

          return date1.getTime() - date2.getTime();
        }
      );
      setActiveTasksArray(ActiveTasksArray);

      const responseTasksArchived = await listArchivedTasks(userSession.token);

      const ArchivedTasksArrayTemp = responseTasksArchived?.data.sort(
        (val1: TaskDataInterface, val2: TaskDataInterface) => {
          const date1 = new Date(val1.deadline as string);
          const date2 = new Date(val2.deadline as string);

          return date1.getTime() - date2.getTime();
        }
      );
      setArchivedTasksArray(() => ArchivedTasksArrayTemp);
    }
  }

  useEffect(() => {
    if (userSession != null) {
      updateTasks();
      getCurrentDate();
    }
  }, [userSession]);

  return (
    <Provider
      value={{
        activeTasksArray,
        archivedTasksArray,
        setActiveTasksArray,
        setArchivedTasksArray,
        updateTasks,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useTasksContext = () => useContext(tasksContext);
