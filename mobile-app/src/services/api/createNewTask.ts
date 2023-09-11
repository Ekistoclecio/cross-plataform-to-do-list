import axios, { AxiosResponse } from "axios";

export default async function createNewTask(newTaskForm: any, token: string) {
  try {
    const response: AxiosResponse = await axios.post(
      "http://10.0.2.2:8080/tasks/create",
      JSON.stringify({
        title: newTaskForm.title,
        description: newTaskForm.description,
        priority: newTaskForm.priority,
        deadline: newTaskForm.deadline,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
      return null;
    }
  }
}
