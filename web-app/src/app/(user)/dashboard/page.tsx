"use client";

import {
  Button,
  Flex,
  Text,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";

import InfoCard from "@/components/InfoCard";
import ApexLineGraphic from "@/components/ApexLineGraphic";
import ApexPieGraphic from "@/components/ApexPieGraphic";
import FilterDateModal from "@/components/FilterDateModal";

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex gap={4} flexDirection={"column"} color={"gray.300"}>
        <Flex
          alignItems={"center"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Text
            marginRight={{ base: 0, md: 3 }}
            fontWeight={"bold"}
            marginBottom={{ base: 2, md: 0 }}
          >
            Filtrar por:
          </Text>
          <Flex>
            <Button
              borderRightRadius={0}
              color={"gray.300"}
              backgroundColor={"#4c5ee5"}
              _hover={{ backgroundColor: "#374ad0" }}
              minWidth={"min-content"}
              padding={2}
            >
              Ultimos 7 dias
            </Button>
            <Button
              borderRadius={0}
              borderX={"1px"}
              borderColor={"rgba(203, 213, 224, 0.24)"}
              color={"gray.300"}
              backgroundColor={"#4c5ee5"}
              _hover={{ backgroundColor: "#374ad0" }}
              minWidth={"min-content"}
              padding={2}
            >
              Ultimos 30 dias
            </Button>
            <Button
              borderLeftRadius={0}
              color={"gray.300"}
              backgroundColor={"#4c5ee5"}
              _hover={{ backgroundColor: "#374ad0" }}
              minWidth={"min-content"}
              padding={2}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              onClick={onOpen}
            >
              <Text display={true ? { base: "block", md: "none" } : "block"}>
                No intervalo de
              </Text>
              <Text display={true ? { base: "none", md: "block" } : "none"}>
                25/08/2018 - 23/08/2019
              </Text>
            </Button>
          </Flex>
          <Text
            fontWeight={"bold"}
            marginTop={2}
            display={true ? { base: "block", md: "none" } : "none"}
          >
            Filtro: 23/08/2017 - 23/05/2019
          </Text>
        </Flex>
        <Flex
          gap={4}
          display={{ base: "flex", xl: "none" }}
          flexDirection={"column"}
        >
          <ApexLineGraphic graphicTitle="Total de Tarefas Concluídas" />
          <ApexLineGraphic graphicTitle="Total de Tarefas Prioritarias Concluídas" />
        </Flex>
        <Flex
          gap={4}
          display={{ base: "flex", xl: "none" }}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={"space-around"}
        >
          <ApexPieGraphic graphicTitle="Divisão Percentual de Tarefas" />
          <ApexPieGraphic graphicTitle="Divisão Percentual de Tarefas Prioritarias" />
        </Flex>
        <Flex gap={4} display={{ base: "none", xl: "flex" }}>
          <ApexLineGraphic graphicTitle="Total de Tarefas Concluídas" />
          <ApexPieGraphic graphicTitle="Divisão Percentual de Tarefas" />
        </Flex>
        <Flex gap={4} display={{ base: "none", xl: "flex" }}>
          <ApexLineGraphic graphicTitle="Total de Tarefas Prioritarias Concluídas" />
          <ApexPieGraphic graphicTitle="Divisão Percentual de Tarefas Prioritarias" />
        </Flex>
        <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
          <InfoCard
            title="Total de tarefas"
            description="Total de tarefas cadastradas pelo usuario no aplicativo."
            totalTasks={25}
            priorityTasks={10}
          />
          <InfoCard
            title="Atrasadas"
            description="Total de tarefas que ainda não foram concluidas e estão com o prazo de entrega vencido."
            totalTasks={25}
            priorityTasks={10}
          />
          <InfoCard
            title="A Fazer"
            description='Total de tarefas na coluna de "A Fazer".'
            totalTasks={25}
            priorityTasks={10}
          />
          <InfoCard
            title="Em Progresso"
            description='Total de tarefas na coluna de "Em Progresso".'
            totalTasks={25}
            priorityTasks={10}
          />
          <InfoCard
            title="Concluídas"
            description='Total de tarefas na coluna de "Concluídas".'
            totalTasks={25}
            priorityTasks={10}
          />
        </Flex>
      </Flex>
      <FilterDateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
