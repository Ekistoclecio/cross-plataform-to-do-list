export default function getTaskById(
  tasksArray: TaskDataInterface[],
  taskId: string
) {
  const task = tasksArray.find((task) => task.id === taskId);
  if (task != undefined) {
    return task;
  } else {
    return null;
  }
}
