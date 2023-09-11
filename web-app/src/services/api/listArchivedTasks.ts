import axios, { AxiosResponse } from "axios";

export default async function listArchiveUserTasks(token: string) {
  try {
    const response: AxiosResponse = await axios.get(
      "http://localhost:8080/archive",
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
