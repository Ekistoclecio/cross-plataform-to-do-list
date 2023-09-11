"use client";

import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  chakra,
} from "@chakra-ui/react";

import useAuthForm from "@/hooks/useAuthForm";

export default function AuthForm({
  newUser,
  setNewUser,
}: PropsAuthFormInterface) {
  const {
    authFormData,
    onChangeInputs,
    showPassword,
    setShowPassword,
    showRepeatPassword,
    setRepeatShowPassword,
    handleBoxLoginRegister,
    register,
    handleSignIn,
  } = useAuthForm({
    newUser,
    setNewUser,
  });

  return (
    <>
      <Box
        borderColor={"gray.300"}
        boxShadow={"dark-lg"}
        padding={5}
        borderRadius={"lg"}
        backgroundColor={"#22263f"}
        width={{ base: "420px", lg: "inherit" }}
      >
        <Text
          fontWeight={"bold"}
          color={"gray.300"}
          marginBottom={4}
          textAlign={"center"}
        >
          {newUser ? "Cadastro" : "Entrar"}
        </Text>
        <Input
          placeholder="Nome de usuario"
          size="md"
          color="gray.300"
          borderColor={"gray.500"}
          marginBottom={3}
          name="userName"
          value={authFormData.userName}
          onChange={onChangeInputs}
        ></Input>
        <InputGroup>
          <Input
            placeholder="Senha"
            size="md"
            color="gray.300"
            borderColor={"gray.500"}
            name="password"
            value={authFormData.password}
            onChange={onChangeInputs}
            type={showPassword ? "text" : "password"}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword((prev) => !prev)}
              bg={"transparent"}
              _hover={{ background: "none", border: "none" }}
              marginRight={"-20px"}
              color={"gray.300"}
            >
              {showPassword ? (
                <Icon
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="4"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </Icon>
              ) : (
                <Icon
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="4"
                  fill="currentColor"
                  className="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                </Icon>
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        {newUser ? (
          <>
            <InputGroup marginY={3}>
              <Input
                placeholder="Repetir senha"
                size="md"
                color="gray.300"
                borderColor={"gray.500"}
                name="repeatPassword"
                value={authFormData.repeatPassword}
                onChange={onChangeInputs}
                type={showRepeatPassword ? "text" : "password"}
              ></Input>
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setRepeatShowPassword((prev) => !prev)}
                  bg={"transparent"}
                  _hover={{ background: "none", border: "none" }}
                  marginRight={"-20px"}
                  color={"gray.300"}
                >
                  {showRepeatPassword ? (
                    <Icon
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="4"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </Icon>
                  ) : (
                    <Icon
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="4"
                      fill="currentColor"
                      className="bi bi-eye-slash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </Icon>
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Input
              placeholder="Nome"
              size="md"
              color="gray.300"
              borderColor={"gray.500"}
              onChange={onChangeInputs}
              name="name"
              value={authFormData.name}
              marginBottom={3}
            ></Input>
            <Input
              placeholder="Sobrenome"
              size="md"
              color="gray.300"
              borderColor={"gray.500"}
              onChange={onChangeInputs}
              name="lastName"
              value={authFormData.lastName}
              marginBottom={3}
            ></Input>
            <Input
              placeholder="E-mail"
              size="md"
              color="gray.300"
              borderColor={"gray.500"}
              name="email"
              value={authFormData.email}
              onChange={onChangeInputs}
            ></Input>
            <Flex flexDirection="column" alignItems={"center"} marginY={4}>
              <Button
                colorScheme="blue"
                onClick={register}
                backgroundColor={"#4c5ee5"}
                _hover={{ backgroundColor: "#3c4ed5" }}
              >
                Pronto
              </Button>
            </Flex>
            <Flex alignItems={"center"}>
              <Text
                textColor={"gray.500"}
                fontWeight={"bold"}
                fontSize={14}
                whiteSpace={"nowrap"}
              >
                Ja possui um cadastro?
              </Text>
              <chakra.button
                marginLeft={1}
                color={"#4c5ee5"}
                fontWeight={"bold"}
                onClick={handleBoxLoginRegister}
                fontSize={14}
              >
                Entrar
              </chakra.button>
            </Flex>
          </>
        ) : (
          <>
            <Flex flexDirection="column" alignItems={"center"} marginY={4}>
              <Button
                colorScheme="blue"
                onClick={handleSignIn}
                backgroundColor={"#4c5ee5"}
                _hover={{ backgroundColor: "#374ad0" }}
              >
                Pronto
              </Button>
            </Flex>
            <Flex flexDirection={"column"} alignItems={"center"} marginTop={4}>
              <Flex alignItems={"center"}>
                <Text
                  fontSize={14}
                  textColor={"gray.500"}
                  fontWeight={"bold"}
                  whiteSpace={"nowrap"}
                >
                  Ainda não é cadastrado?
                </Text>
                <chakra.button
                  whiteSpace={"nowrap"}
                  fontSize={14}
                  marginLeft={1}
                  color={"#4c5ee5"}
                  fontWeight={"bold"}
                  onClick={handleBoxLoginRegister}
                >
                  Cadastrar-se
                </chakra.button>
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
}
