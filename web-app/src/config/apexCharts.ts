export const lineChartConfig = {
  options: {
    chart: {
      height: 350,
      type: "line" as
        | "area"
        | "line"
        | "bar"
        | "pie"
        | "donut"
        | "radialBar"
        | "scatter"
        | "bubble"
        | "heatmap"
        | "candlestick"
        | "boxPlot"
        | "radar"
        | "polarArea"
        | "rangeBar"
        | "rangeArea"
        | "treemap"
        | undefined,
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
      curve: "smooth" as
        | "smooth"
        | "straight"
        | "stepline"
        | ("smooth" | "straight" | "stepline")[]
        | undefined,
    },

    grid: {
      borderColor: "#2D3748",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 1,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
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
    },
    legend: {
      position: "top" as "top" | "right" | "bottom" | "left" | undefined,
      horizontalAlign: "left" as "left" | "center" | "right" | undefined,
      floating: true,
      offsetY: -10,
      offsetX: 0,
      labels: {
        colors: "#CBD5E0",
      },
    },
  },
};

export const pieChartConfig = {
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
