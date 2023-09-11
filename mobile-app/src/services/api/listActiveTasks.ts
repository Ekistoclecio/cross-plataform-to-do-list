import axios, { AxiosResponse } from "axios";

export default async function listActiveTasks(token: string) {
  try {
    const response: AxiosResponse = await axios.get("http://10.0.2.2:8080", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
