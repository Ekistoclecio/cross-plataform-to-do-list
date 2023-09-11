import axios, { AxiosResponse } from "axios";

export default async function signUp(authFormData: AuthFormInterface) {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:8080/user/create",
      JSON.stringify({
        name: authFormData.name,
        lastName: authFormData.lastName,
        email: authFormData.email,
        userName: authFormData.userName,
        password: authFormData.password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
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
