"use client";

import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { pieChartConfig } from "@/config/apexCharts";
import useApexPieGraphic from "@/hooks/useApexPieGraphic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ApexPieGraphic({
  graphicTitle,
  priority,
}: PropsApexPieGraphicInterface) {
  const { series } = useApexPieGraphic(priority);
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
            ...pieChartConfig.options,
            title: { ...pieChartConfig.options.title, text: graphicTitle },
          }}
          series={series}
          type="pie"
          width={"380px"}
        />
      </Flex>
    </Flex>
  );
}
