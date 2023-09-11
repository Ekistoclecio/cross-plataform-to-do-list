"use client";

import { Button, Flex, Text } from "@chakra-ui/react";

import InfoCard from "@/components/InfoCard";
import ApexLineGraphic from "@/components/ApexLineGraphic";
import ApexPieGraphic from "@/components/ApexPieGraphic";
import useDashboardPage from "@/hooks/useDashboardPage";

export default function Dashboard() {
  const { dateFilter, setDateFilter, tasksStatistics } = useDashboardPage();
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
              backgroundColor={dateFilter === 0 ? "#273ac0" : "#4c5ee5"}
              _hover={{ backgroundColor: "#273ac0" }}
              minWidth={"min-content"}
              padding={2}
              onClick={() => setDateFilter(0)}
            >
              Ultimos 7 dias
            </Button>
            <Button
              borderRadius={0}
              borderX={"1px"}
              borderColor={"rgba(203, 213, 224, 0.24)"}
              color={"gray.300"}
              backgroundColor={dateFilter === 1 ? "#273ac0" : "#4c5ee5"}
              _hover={{ backgroundColor: "#273ac0" }}
              minWidth={"min-content"}
              padding={2}
              onClick={() => setDateFilter(1)}
            >
              Ultimos 30 dias
            </Button>
            <Button
              borderLeftRadius={0}
              color={"gray.300"}
              backgroundColor={dateFilter === 2 ? "#273ac0" : "#4c5ee5"}
              _hover={{ backgroundColor: "#273ac0" }}
              minWidth={"min-content"}
              padding={2}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              onClick={() => setDateFilter(2)}
            >
              Ultimos 90 dias
            </Button>
          </Flex>
        </Flex>
        <Flex
          gap={4}
          display={{ base: "flex", xl: "none" }}
          flexDirection={"column"}
        >
          <ApexLineGraphic
            priority={false}
            filterType={dateFilter}
            graphicTitle="Total de Tarefas Concluídas"
          />
          <ApexLineGraphic
            priority={true}
            filterType={dateFilter}
            graphicTitle="Total de Tarefas Prioritarias Concluídas"
          />
        </Flex>
        <Flex
          gap={4}
          display={{ base: "flex", xl: "none" }}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={"space-around"}
        >
          <ApexPieGraphic
            priority={false}
            graphicTitle="Divisão Percentual de Tarefas"
          />
          <ApexPieGraphic
            priority={true}
            graphicTitle="Divisão Percentual de Tarefas Prioritarias"
          />
        </Flex>
        <Flex gap={4} display={{ base: "none", xl: "flex" }}>
          <ApexLineGraphic
            priority={false}
            filterType={dateFilter}
            graphicTitle="Total de Tarefas Concluídas"
          />
          <ApexPieGraphic
            priority={false}
            graphicTitle="Divisão Percentual de Tarefas"
          />
        </Flex>
        <Flex gap={4} display={{ base: "none", xl: "flex" }}>
          <ApexLineGraphic
            priority={true}
            filterType={dateFilter}
            graphicTitle="Total de Tarefas Prioritarias Concluídas"
          />
          <ApexPieGraphic
            priority={true}
            graphicTitle="Divisão Percentual de Tarefas Prioritarias"
          />
        </Flex>
        <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
          <InfoCard
            title="Total de tarefas"
            description="Total de tarefas cadastradas pelo usuario no aplicativo."
            totalTasks={tasksStatistics.total.total}
            priorityTasks={tasksStatistics.total.priority}
          />
          <InfoCard
            title="Atrasadas"
            description="Total de tarefas que ainda não foram concluidas e estão com o prazo de entrega vencido."
            totalTasks={tasksStatistics.late.total}
            priorityTasks={tasksStatistics.late.priority}
          />
          <InfoCard
            title="A Fazer"
            description='Total de tarefas na coluna de "A Fazer".'
            totalTasks={tasksStatistics.to_do.total}
            priorityTasks={tasksStatistics.to_do.priority}
          />
          <InfoCard
            title="Em Progresso"
            description='Total de tarefas na coluna de "Em Progresso".'
            totalTasks={tasksStatistics.progress.total}
            priorityTasks={tasksStatistics.progress.priority}
          />
          <InfoCard
            title="Concluídas"
            description='Total de tarefas na coluna de "Concluídas".'
            totalTasks={tasksStatistics.completed.total}
            priorityTasks={tasksStatistics.completed.priority}
          />
        </Flex>
      </Flex>
    </>
  );
}
