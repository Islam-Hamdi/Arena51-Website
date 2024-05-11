import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const CategoryLineChart = () => {
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
                const categories = [...new Set(data.map((game) => game.categories))];
                const series = categories.map((category) =>
                    data.filter((game) => game.categories === category).length
                );
                setChartData({ series, labels: categories });
            } else {
                console.error("Failed to fetch game listings");
            }
        } catch (error) {
            console.error("An error occurred while fetching categories:", error);
        }
    };

    const { series, labels } = chartData;

    const chartOptions = {
        colors: ['#79e200'], // Setting line color to green
        sparkline: {
            enabled: false,
        },
        theme: {
            mode: "dark",
        },
        stroke: {
            curve: "smooth",
        },
        chart: {
            type: "line",
            height: 350,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: "black",
        },
        legend: {
            show: false,
        },
        yaxis: {
            title: {
                text: "Number of Games",
            },
            min: 0, // Set the minimum value for the y-axis
            forceNiceScale: true, // Ensure y-axis displays only integer values
        },
        xaxis: {
            type: "category",
            categories: labels,
        },
        tooltip: {
            shared: false,
            y: {
                formatter: (val) => `${val} games`,
            },
        },
    };
    
    return (
        <Chart
            options={chartOptions}
            series={[{ data: series }]}
            type="line"
            height={chartOptions.chart.height}
        />
    );
};

export default CategoryLineChart;
