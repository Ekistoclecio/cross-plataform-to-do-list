"use client";

import {
  Button,
  Circle,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";

import NotificationTaskCard from "../NotificationTaskCard";

export default function NotificationAlert() {
  const [newNotification, setNewNotification] = useState(false);
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          bg={"trasnparent"}
          _hover={{ backgroundColor: "#464d75" }}
          size={"max-content"}
          marginRight={2}
          borderRadius={"full"}
        >
          <Circle position={"relative"} size={"40px"}>
            <Circle
              top={"8px"}
              right={"8px"}
              size={"10px"}
              backgroundColor={"red"}
              position={"absolute"}
              color={"gray.300"}
              fontWeight={"bold"}
              display={newNotification ? "block" : "none"}
            ></Circle>
            <Icon
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              width="24px"
              fill={"gray.300"}
              viewBox="0 0 448 512"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
            </Icon>
          </Circle>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        maxWidth={"300px"}
        bg={"#33374f"}
        padding={0}
        border={"none"}
        color="gray.300"
      >
        <PopoverArrow bg={"#33374f"} shadow={"none"} />
        <PopoverCloseButton />
        <PopoverHeader>Notificações</PopoverHeader>
        <PopoverBody padding={0}>
          <NotificationTaskCard
            taskTitle="Task de teste x"
            newNotification={true}
            taskDeadline="25/06/2023"
          />
          <NotificationTaskCard
            taskTitle="Task de teste y"
            newNotification={true}
            taskDeadline="29/06/2023"
          />
          <NotificationTaskCard
            taskTitle="Task de teste z"
            newNotification={true}
            taskDeadline="27/06/2023"
          />
          <NotificationTaskCard
            taskTitle="Task de teste w"
            newNotification={false}
            taskDeadline="25/06/2023"
          />
          <NotificationTaskCard
            taskTitle="Task de teste r"
            newNotification={false}
            taskDeadline="25/06/2023"
          />
          <NotificationTaskCard
            taskTitle="Task de teste t"
            newNotification={false}
            taskDeadline="25/06/2023"
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
