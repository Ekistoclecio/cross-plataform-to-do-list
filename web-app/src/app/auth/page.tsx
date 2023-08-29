"use client";

import AuthForm from "../../components/AuthForm";

import { Image, Text, Flex, chakra } from "@chakra-ui/react";
import { useState } from "react";
import AuthBackgroundImg from "../../assets/image/AuthBackgroundImg.jpg";

export default function Auth() {
  const [newUser, setNewUser] = useState(false);
  return (
    <>
      <Flex>
        <Flex
          minHeight="100vh"
          width={"80vw"}
          display={{ base: "none", lg: "block" }}
          minWidth={1}
        >
          <Image
            aspectRatio={4 / 2}
            height={"100%"}
            src={AuthBackgroundImg.src}
          />
        </Flex>
        <Flex
          width={{ base: "100vw", lg: "20vw" }}
          minWidth={"min-content"}
          minHeight={"100vh"}
          backgroundColor={"#1d213a"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          padding={12}
        >
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            minHeight={"100%"}
          >
            <Flex
              flexDirection={{ base: "row", lg: "column" }}
              alignItems={"center"}
              justifyContent={"center"}
              lineHeight={"44px"}
              gap={{ base: 3, lg: 0 }}
            >
              <Text fontWeight={"bold"} fontSize={42} color={"#4c5ee5"}>
                Kanban
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={42}
                color={"#4c5ee5"}
                whiteSpace={"nowrap"}
              >
                To Do
              </Text>
            </Flex>
            <Text
              fontWeight={"bold"}
              fontSize={14}
              textColor={"gray.500"}
              textAlign={"center"}
              lineHeight={6}
              maxWidth={"400px"}
              marginBottom={10}
            >
              Uma ferramenta que te auxiliar a gerenciar suas tarefas com
              rapidez e facilidade.
            </Text>
            <AuthForm newUser={newUser} setNewUser={setNewUser} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
