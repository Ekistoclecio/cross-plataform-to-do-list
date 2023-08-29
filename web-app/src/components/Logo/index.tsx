"use client";

import { TaskClipboardIcon } from "@/assets/Icons";
import { Link } from "@chakra-ui/next-js";
import { Box, Icon, Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Link
      href={"/tasks"}
      display={"flex"}
      alignItems={"center"}
      _hover={{ textDecoration: "none" }}
      paddingRight={4}
      boxShadow="1px 0px 0px 0px rgba(203, 213, 224, 0.24)"
    >
      <Icon
        xmlns="http://www.w3.org/2000/svg"
        boxSize={{ base: "48px", lg: "68px" }}
        viewBox="0 0 24 24"
        backgroundColor={"transparent"}
        fill="gray.300"
      >
        <TaskClipboardIcon />
      </Icon>
      <Box lineHeight={"28px"} color={"gray.300"}>
        <Text fontWeight={"bold"} fontSize={"24px"}>
          Kanban
        </Text>
        <Text fontWeight={"bold"} fontSize={"24px"}>
          To Do
        </Text>
      </Box>
    </Link>
  );
}
