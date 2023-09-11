"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

export default function MenuTopBar() {
  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button
            padding={0}
            display={{ base: "flex", lg: "none" }}
            as={Button}
            color={"gray.300"}
            backgroundColor={"transparent"}
            _hover={{ backgroundColor: "#464d75" }}
            _active={{ backgroundColor: "transparent" }}
            border={"1px"}
            borderColor={"gray.600"}
            borderRadius={5}
            marginLeft={4}
          >
            <Icon
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </Icon>
          </Button>
        </PopoverTrigger>
        <PopoverContent maxWidth={"200px"} bg={"#33374f"} border={"none"}>
          <PopoverArrow bg={"#33374f"} shadow={"none"} />
          <PopoverBody paddingX={0}>
            <Link
              href={"/tasks"}
              _hover={{
                backgroundColor: "#40455c",
                textDecoration: "none",
              }}
              height={"100%"}
              display={"flex"}
              alignItems={"center"}
              paddingY={4}
              paddingX={2}
            >
              Tarefas
            </Link>
            <Link
              href={"/dashboard"}
              _hover={{
                backgroundColor: "#40455c",
                textDecoration: "none",
              }}
              height={"100%"}
              display={"flex"}
              alignItems={"center"}
              paddingY={4}
              paddingX={2}
            >
              Estatística
            </Link>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Link
        href={"/tasks"}
        _hover={{
          textDecoration: "none",
          backgroundColor: "#464d75",
        }}
        paddingX={4}
        height={"100%"}
        display={{ base: "none", lg: "flex" }}
        alignItems={"center"}
      >
        Tarefas
      </Link>
      <Link
        href={"/dashboard"}
        _hover={{
          textDecoration: "none",
          backgroundColor: "#464d75",
        }}
        paddingX={4}
        height={"100%"}
        display={{ base: "none", lg: "flex" }}
        alignItems={"center"}
      >
        Estatística
      </Link>
    </>
  );
}
