import { useState } from "react";
import { useUserContext } from "../providers/contexts/userContext";
import { Alert } from "react-native";
import signUp from "../services/api/signUp";

const regexMinCaracters = /[^\s]{1,}/;
const regexToVerifyEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function useAuthForm() {
  const { login } = useUserContext();
  const [newUser, setNewUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [desableSubmitButton, setDesableSubmitButton] = useState(false);

  function handleBoxLoginRegister() {
    setNewUser(!newUser);
    setShowRepeatPassword(false);
    setShowPassword(false);
    setFormData({
      name: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  }

  function validateForm() {
    if (
      !regexMinCaracters.test(formData.name) &&
      !regexMinCaracters.test(formData.lastName) &&
      !regexMinCaracters.test(formData.userName) &&
      !regexMinCaracters.test(formData.email) &&
      !regexMinCaracters.test(formData.password) &&
      !regexMinCaracters.test(formData.repeatPassword)
    ) {
      Alert.alert(
        "Dados Invalidos",
        "Cada campo do formulário deve conter no mínimo 1 caractere."
      );
      return false;
    }
    if (formData.password != formData.repeatPassword) {
      Alert.alert("Senhas diferentes", "As senhas precisam ser iguais");
      return false;
    }
    if (!regexToVerifyEmail.test(formData.email)) {
      Alert.alert(
        "Email invalido",
        "O e-mail digitado não representa um endereço de e-mail valido"
      );
      return false;
    }
    return true;
  }

  async function register() {
    if (validateForm()) {
      const response = await signUp(formData);
      if (response?.status === 201) {
        Alert.alert("Novo Usuario", "Usuário criado com sucesso");
        setShowPassword(false);
        setShowRepeatPassword(false);
        setNewUser(false);
      } else if (response?.status === 400) {
        Alert.alert("Ocorreu um erro", response.data.message);
        throw new Error();
      } else {
        Alert.alert(
          "Ocorreu um erro",
          "Falha na criação do usuário, tente novamente."
        );
      }
    }
  }

  async function handleSubmitForm() {
    setDesableSubmitButton(true);
    if (newUser) {
      try {
        await register();
        setDesableSubmitButton(false);
      } catch (error) {
        console.log(error);
        setDesableSubmitButton(false);
      }
    } else {
      try {
        login(formData);
        setDesableSubmitButton(false);
      } catch (error) {
        setDesableSubmitButton(false);
      }
    }
  }

  return {
    newUser,
    formData,
    setFormData,
    setShowPassword,
    showPassword,
    showRepeatPassword,
    setShowRepeatPassword,
    handleSubmitForm,
    desableSubmitButton,
    handleBoxLoginRegister,
  };
}
