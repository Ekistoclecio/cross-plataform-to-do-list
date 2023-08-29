"use client";

import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const configGraphic = {
  series: [
    {
      name: "Total de tarefas concluidas",
      data: [
        28, 29, 33, 36, 32, 32, 33, 28, 29, 33, 36, 32, 32, 33, 28, 29, 33, 36,
        32, 32, 33, 28, 29, 33, 36, 32, 32, 33, 28, 29, 33, 36, 32, 32, 33,
      ],
    },
    {
      name: "Tarefas concluidas com atraso",
      data: [
        12, 11, 14, 18, 17, 13, 13, 12, 11, 14, 18, 17, 13, 13, 12, 11, 14, 18,
        17, 13, 13, 12, 11, 14, 18, 17, 13, 13, 12, 11, 14, 18, 17, 13, 13,
      ],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    title: {
      align: "left" as "left" | "center" | "right" | undefined,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#CBD5E0",
      },
    },
    colors: ["#3182CE", "#805AD5"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },

    grid: {
      borderColor: "#2D3748",
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 1,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
      ],
      labels: {
        style: {
          colors: "#CBD5E0",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#CBD5E0",
        },
      },
      min: 5,
      max: 40,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      floating: true,
      offsetY: -10,
      offsetX: 0,
      labels: {
        colors: "#CBD5E0",
      },
    },
  },
};

interface ApexLineGraphicInterface {
  graphicTitle: string;
}

export default function ApexLineGraphic({
  graphicTitle,
}: ApexLineGraphicInterface) {
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
          //@ts-ignore
          options={{
            ...configGraphic.options,
            title: { ...configGraphic.options.title, text: graphicTitle },
          }}
          series={configGraphic.series}
          height={"100%"}
          width={"1500px"}
        />
      </Flex>
    </Flex>
  );
}
