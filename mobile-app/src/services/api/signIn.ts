import axios from "axios";

export default async function signIn(authFormData: AuthUserFormInterface) {
  try {
    const response = await axios.post(
      "http://10.0.2.2:8080/user/login",
      JSON.stringify({
        userName: authFormData?.userName,
        password: authFormData?.password,
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
