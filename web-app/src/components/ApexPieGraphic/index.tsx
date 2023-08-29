"use client";

import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const configGraphic = {
  series: [44, 55, 13, 43],
  options: {
    colors: ["#00D8D0", "#0072bb", "#004da8", "#002f5e"],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["A fazer", "Em progresso", "Concluidas", "Em atraso"],
    legend: {
      offsetY: 60,
      labels: {
        colors: "#CBD5E0",
      },
    },
    stroke: {
      colors: ["#0d112a"],
    },
    title: {
      text: "Average High & Low Temperature",
      align: "left" as "left" | "center" | "right" | undefined,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#CBD5E0",
      },
    },
  },
};

interface ApexPieGraphicInterface {
  graphicTitle: string;
}

export default function ApexPieGraphic({
  graphicTitle,
}: ApexPieGraphicInterface) {
  return (
    <Flex
      borderRadius={"12px"}
      padding={2}
      minWidth={"min-content"}
      width={{ base: "93vw", lg: "34vw" }}
      height={"30vh"}
      backgroundColor={"#0d112a"}
      color={"black"}
      alignItems={"center"}
      justifyContent={"center"}
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
          //@ts-ignore
          options={{
            ...configGraphic.options,
            title: { ...configGraphic.options.title, text: graphicTitle },
          }}
          series={configGraphic.series}
          type="pie"
          width={"380px"}
        />
      </Flex>
    </Flex>
  );
}
