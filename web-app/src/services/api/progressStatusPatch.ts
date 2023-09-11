import axios, { AxiosResponse } from "axios";

export default async function progressStatusPatch(
  token: string,
  taskId: string,
  newProgressStatus: number
) {
  try {
    const response: AxiosResponse = await axios.patch(
      `http://localhost:8080/tasks/progress_status/${taskId}`,
      JSON.stringify({
        progressStatus: newProgressStatus,
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
