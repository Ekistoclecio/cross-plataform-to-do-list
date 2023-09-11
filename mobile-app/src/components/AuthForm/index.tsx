import { Box, Button, Text, Input, InputIcon } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Alert, TextInput } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useUserContext } from "../../providers/contexts/userContext";
import signUp from "../../services/api/signUp";

export const regexMinCaracters = /[^\s]{6,}/; // Valida se a string não esta vazia e tem pelo menos um caractere diferente de espaço em branco
const regexToVerifyEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function AuthForm() {
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
        "Cada campo do formulário deve conter no mínimo 6 caracteres."
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
        throw new Error();
      }
    } else {
      throw new Error();
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

  return (
    <>
      <Box
        shadowColor="#000000"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.25}
        shadowRadius={12}
        backgroundColor="#22263f"
        borderRadius={8}
        elevation={8}
        padding={16}
        minWidth={320}
      >
        <Text
          fontWeight="bold"
          textAlign="center"
          marginBottom={4}
          color="#CBD5E0"
          size="lg"
        >
          {newUser ? "Cadastro" : "Entrar"}
        </Text>
        <Input marginTop={15} variant="outline" size="lg" borderColor="#718096">
          <TextInput
            style={{ color: "#CBD5E0", fontSize: 18, padding: 10 }}
            placeholderTextColor={"#718096"}
            placeholder="Nome de usuario"
            value={formData.userName}
            onChangeText={(text) =>
              setFormData({ ...formData, userName: text })
            }
          />
        </Input>
        <Input marginTop={20} variant="outline" size="lg" borderColor="#718096">
          <TextInput
            secureTextEntry={!showPassword}
            style={{ color: "#CBD5E0", fontSize: 18, padding: 10, flex: 1 }}
            placeholderTextColor={"#718096"}
            placeholder="Senha"
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          <InputIcon>
            <Button
              onPress={() => setShowPassword(!showPassword)}
              bgColor="transparent"
            >
              {showPassword ? (
                <Svg width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                  <Path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <Path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </Svg>
              ) : (
                <Svg width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                  <Path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                  <Path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                  <Path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                </Svg>
              )}
            </Button>
          </InputIcon>
        </Input>
        {newUser && (
          <>
            <Input
              marginTop={20}
              variant="outline"
              size="lg"
              borderColor="#718096"
            >
              <TextInput
                secureTextEntry={!showRepeatPassword}
                style={{ color: "#CBD5E0", fontSize: 18, padding: 10, flex: 1 }}
                placeholderTextColor={"#718096"}
                placeholder="Repetir senha"
                value={formData.repeatPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, repeatPassword: text })
                }
              />
              <InputIcon>
                <Button
                  onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                  bgColor="transparent"
                >
                  {showRepeatPassword ? (
                    <Svg width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                      <Path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <Path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </Svg>
                  ) : (
                    <Svg width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                      <Path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <Path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <Path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </Svg>
                  )}
                </Button>
              </InputIcon>
            </Input>
            <Input
              marginTop={20}
              variant="outline"
              size="lg"
              borderColor="#718096"
            >
              <TextInput
                style={{ color: "#CBD5E0", fontSize: 18, padding: 10, flex: 1 }}
                placeholderTextColor={"#718096"}
                placeholder="Nome"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              ></TextInput>
            </Input>

            <Input
              marginTop={20}
              variant="outline"
              size="lg"
              borderColor="#718096"
            >
              <TextInput
                style={{ color: "#CBD5E0", fontSize: 18, padding: 10, flex: 1 }}
                placeholderTextColor={"#718096"}
                placeholder="Sobrenome"
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData({ ...formData, lastName: text })
                }
              ></TextInput>
            </Input>

            <Input
              marginTop={20}
              variant="outline"
              size="lg"
              borderColor="#718096"
            >
              <TextInput
                style={{ color: "#CBD5E0", fontSize: 18, padding: 10, flex: 1 }}
                placeholderTextColor={"#718096"}
                placeholder="E-mail"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              ></TextInput>
            </Input>
          </>
        )}
        <Button
          marginTop={20}
          backgroundColor="#4c5ee5"
          onPress={handleSubmitForm}
          isDisabled={desableSubmitButton}
          sx={{
            ":active": {
              backgroundColor: "#3c4ed5",
            },
          }}
        >
          <Text color="#CBD5E0">Pronto</Text>
        </Button>
        {newUser ? (
          <Box
            marginTop={20}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="#CBD5E0">Ja possui um cadastro?</Text>
            <Button
              backgroundColor="transparent"
              onPress={handleBoxLoginRegister}
            >
              <Text
                color="#4c5ee5"
                size={"lg"}
                marginLeft={-12}
                fontWeight="bold"
              >
                Entrar
              </Text>
            </Button>
          </Box>
        ) : (
          <Box
            marginTop={20}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="#CBD5E0">Ainda não é cadastrado?</Text>
            <Button
              backgroundColor="transparent"
              onPress={handleBoxLoginRegister}
            >
              <Text
                color="#4c5ee5"
                size={"lg"}
                marginLeft={-12}
                fontWeight="bold"
              >
                Cadastrar-se
              </Text>
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
