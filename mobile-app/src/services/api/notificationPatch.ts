import axios, { AxiosResponse } from "axios";

export default async function notificationPatch(token: string, taskId: string) {
  try {
    const response: AxiosResponse = await axios.patch(
      `http://10.0.2.2:8080/tasks/notification/${taskId}`,
      {},
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
