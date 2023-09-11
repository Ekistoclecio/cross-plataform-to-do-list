import signUp from "@/services/api/signUp";
import { useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const regexMinCaracters = /^(?=(?:\S*\s*){1,})(?=\S+$)/; // Valida se a string não esta vazia e tem pelo menos um caractere diferente de espaço em branco

const regexToVarifyEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function useAuthForm({
  newUser,
  setNewUser,
}: PropsAuthFormInterface) {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setRepeatShowPassword] = useState(false);
  const [authFormData, setAuthFormData] = useState<AuthFormInterface>({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  function handleBoxLoginRegister() {
    setNewUser(!newUser);
    setRepeatShowPassword(false);
    setShowPassword(false);
    setAuthFormData({
      name: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  }

  function onChangeInputs(e: ChangeEvent<HTMLInputElement>) {
    setAuthFormData({ ...authFormData, [e.target.name]: e.target.value });
  }

  function validateForm() {
    if (
      !regexMinCaracters.test(authFormData.name || "") &&
      !regexMinCaracters.test(authFormData.lastName || "") &&
      !regexMinCaracters.test(authFormData.userName || "") &&
      !regexMinCaracters.test(authFormData.email || "") &&
      !regexMinCaracters.test(authFormData.password) &&
      !regexMinCaracters.test(authFormData.repeatPassword || "")
    ) {
      toast({
        title: "Dados Invalidos",
        description:
          "Cada campo do formulário deve conter no mínimo 6 caracteres.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return false;
    }
    if (authFormData.password != authFormData.repeatPassword) {
      toast({
        title: "Senhas diferentes",
        description: "As senhas precisam ser iguais",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return false;
    }
    if (!regexToVarifyEmail.test(authFormData.email || "")) {
      toast({
        title: "E-mail invalido",
        description:
          "O e-mail digitado não representa um endereço de e-mail valido",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return false;
    }

    return true;
  }

  async function register(event: any) {
    event.preventDefault();
    event.target.disabled = true;
    if (validateForm()) {
      const response = await signUp(authFormData);
      toast({
        title:
          response?.status === 201
            ? "Usuario registrado"
            : "Erro na criação do usuario",
        description: response?.data.message,
        duration: 5000,
        isClosable: true,
        status: response?.status === 201 ? "success" : "error",
        position: "top",
      });
      if (response?.status === 201) {
        setShowPassword(false);
        setRepeatShowPassword(false);
        setNewUser(false);
      }
      event.target.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }

  async function handleSignIn(event: any) {
    event.preventDefault();
    event.target.disabled = true;
    const result = await signIn("credentials", {
      redirect: false,
      userName: authFormData.userName,
      password: authFormData.password,
    });

    if (result?.error) {
      toast({
        title: "Falha no login",
        description: "Nome de usuario ou senha inválidos",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      event.target.disabled = false;
      return;
    }

    router.replace("/tasks");
  }

  return {
    authFormData,
    onChangeInputs,
    showPassword,
    setShowPassword,
    showRepeatPassword,
    setRepeatShowPassword,
    handleBoxLoginRegister,
    register,
    handleSignIn,
  };
}
