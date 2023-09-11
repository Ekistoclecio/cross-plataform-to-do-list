"use client";

import { useTasksContext } from "@/Providers/contexts/tasksContext";
import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { lineChartConfig } from "@/config/apexCharts";
import useApexLineGraphic from "@/hooks/useApexLineGraphic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ApexLineGraphic({
  graphicTitle,
  filterType,
  priority,
}: PropsApexLineGraphicInterface) {
  const {
    categories,
    tasksCompletedOnTime,
    tasksCompletedLate,
    calculateWidthChart,
  } = useApexLineGraphic(filterType, priority);
  return (
    <Flex
      borderRadius={"12px"}
      padding={2}
      width={{ base: "93vw", md: "97vw", xl: "64vw" }}
      height={"30vh"}
      backgroundColor={"#0d112a"}
      color={"black"}
    >
      <Flex
        overflowX={"auto"}
        overflowY={"hidden"}
        css={{
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#3d415a",
            borderRadius: "24px",
          },
        }}
      >
        <ApexCharts
          type="line"
          options={{
            ...lineChartConfig.options,
            xaxis: { ...lineChartConfig.options.xaxis, categories: categories },
            title: { ...lineChartConfig.options.title, text: graphicTitle },
          }}
          series={[
            {
              name: "Total de tarefas concluidas",
              data: tasksCompletedOnTime,
            },
            {
              name: "Tarefas concluidas com atraso",
              data: tasksCompletedLate,
            },
          ]}
          height={"100%"}
          width={`${calculateWidthChart()}px`}
        />
      </Flex>
    </Flex>
  );
}
