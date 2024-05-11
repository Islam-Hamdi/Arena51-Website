import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch("api/gamesListings");
      if (response.ok) {
        const data = await response.json();

        const totalGames = data.length;
        const freeGames = data.filter((game) => game.price === 0).length;
        const paidGames = totalGames - freeGames;

        const series = [freeGames, paidGames];
        const labels = ["Free Games", "Paid Games"];

        setChartData({ series, labels });
      } else {
        console.error("Failed to fetch game listings");
      }
    } catch (error) {
      console.error("An error occurred while fetching games:", error);
    }
  };

  const { series, labels } = chartData;

  const chartOptions = {
    series,
    labels,
    colors: ["#8ED94B", "#32441D"], // Green for free games, Dark green for paid games
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
