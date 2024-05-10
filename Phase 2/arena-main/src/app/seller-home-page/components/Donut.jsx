import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("api/gamesListings");
      if (response.ok) {
        const data = await response.json();
        console.log(data.map((price)=> price.price))

        const categories = [...new Set(data.map((game) => game.categories))];

        const series = categories.map((category) =>
          data.filter((game) => game.categories === category).length
        );
        const labels = categories;

        setChartData({ series, labels });
      } else {
        console.error("Failed to fetch game listings");
      }
    } catch (error) {
      console.error("An error occurred while fetching categories:", error);
    }
  };

  const { series, labels } = chartData;

  const chartOptions = {
    series,
    labels,
    colors: ["#8ED94B", "#32441D", "#345D04"], 
    theme: {
      mode: "dark",
    },
    chart: {
      type: "donut",
      height: 350,
      toolbar: {
        show: false,
      },
      background: "black",
    },
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: "#ffffff",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val + " games"; 
        },
      },
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={chartOptions.series}
      type="donut"
      height={chartOptions.chart.height}
    />
  );
};

export default DonutChart;
