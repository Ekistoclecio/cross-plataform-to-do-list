"use client";

import { Flex, Heading, List, ListItem } from "@chakra-ui/react";
import TaskCard from "../TaskCard";
import { useTasksContext } from "@/Providers/contexts/tasksContext";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function TaskBoard({
  title,
  progressStatus,
}: PropsTaskBoardInterface) {
  const { activeTasksArray } = useTasksContext();

  return (
    <>
      <Flex
        backgroundColor={"#0d112a"}
        color={"#6c7ef5"}
        flex={1}
        flexDirection={"column"}
        borderRadius={"12px"}
        paddingY={4}
        maxHeight={"83vh"}
        maxWidth={{ base: "240px", lg: "32.2vw" }}
      >
        <Heading
          textAlign={"center"}
          borderBottom={"4px"}
          borderColor={"#1d213a"}
          paddingBottom={4}
        >
          {title}
        </Heading>
        <Flex
          flexDirection={"column"}
          flex={1}
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#3d415a",
              borderRadius: "24px",
            },
          }}
        >
          <Droppable droppableId={`${progressStatus}`}>
            {(provided) => (
              <List
                as={"ul"}
                {...provided.droppableProps}
                ref={provided.innerRef}
                height={"100%"}
              >
                {activeTasksArray.map((task, index) => {
                  if (progressStatus === task.progressStatus) {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <ListItem
                            as={"li"}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              archivable={progressStatus === 2 ? true : false}
                              taskId={task.id}
                            />
                          </ListItem>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Flex>
      </Flex>
    </>
  );
}
