import { TasksProvider } from "./contexts/tasksContext";
import { UserProvider } from "./contexts/userContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <TasksProvider>{children}</TasksProvider>
    </UserProvider>
  );
}
