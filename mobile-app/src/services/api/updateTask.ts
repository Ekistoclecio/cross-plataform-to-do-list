import axios, { AxiosResponse } from "axios";

export default async function updateTask(
  token: string,
  taskId: string,
  taskData: {
    progressStatus: number;
    title: string;
    description?: string;
    deadline: string;
    priority: boolean;
  }
) {
  try {
    const response: AxiosResponse = await axios.put(
      `http://10.0.2.2:8080/tasks/update/${taskId}`,
      JSON.stringify({
        progressStatus: taskData.progressStatus,
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline,
        priority: taskData.priority,
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
