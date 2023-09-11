"use client";

import {
  Avatar,
  Button,
  Circle,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserAvatarTopBar() {
  const { data: session } = useSession();
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          _hover={{
            backgroundColor: "#464d75",
          }}
          borderRadius={"full"}
          bg={"trasnparent"}
          width={"min-content"}
          height={"min-content"}
          color={"gray.300"}
          fontWeight={"medium"}
          padding={1}
        >
          {/* <Circle fontWeight={"bold"} size="50px" bg="#141730" fontSize={16}>
            {"EL"}
          </Circle> */}
          <Avatar name={session?.user.name + " " + session?.user.lastName} />
          <Text
            marginLeft={2}
            display={{ base: "none", md: "block" }}
            marginRight={2}
          >
            {session?.user.name + " " + session?.user.lastName}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent maxWidth={"160px"} bg={"#33374f"} border={"none"}>
        <PopoverArrow bg={"#33374f"} shadow={"none"} />
        <PopoverBody p={0} py={2}>
          <Flex
            as={"button"}
            _hover={{ background: "#40455c" }}
            cursor={"pointer"}
            px={3}
            py={1}
            onClick={() => logout()}
            width={"100%"}
          >
            <Icon
              color={"red"}
              mt={1}
              mr={2}
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="4"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M7.5 1v7h1V1h-1z" />
              <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
            </Icon>
            <Text color={"gray.300"}>Sair</Text>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
