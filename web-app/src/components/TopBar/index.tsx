"use client";

import { Flex } from "@chakra-ui/react";

import Logo from "../Logo";
import MenuTopBar from "../MenuTopBar";
import NotificationAlert from "../NotificationAlert";
import UserAvatarTopBar from "../UserAvatarTopBar";
import ArchiveIcon from "../ArchiveIcon";

export default function TopBar() {
  return (
    <Flex
      maxHeight={"min-content"}
      backgroundColor={"#363d65"}
      color={"gray.300"}
      alignItems={"center"}
      px={2}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"} height={"100%"}>
        <Logo />
        <MenuTopBar />
      </Flex>
      <Flex alignItems={"center"}>
        <ArchiveIcon />
        <NotificationAlert />
        <UserAvatarTopBar />
      </Flex>
    </Flex>
  );
}
