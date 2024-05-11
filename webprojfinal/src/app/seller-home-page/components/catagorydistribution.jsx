import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { GoZoomIn } from "react-icons/go";
 
const RadarChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        categories: [],
    });
 
    useEffect(() => {
        fetchPercentageByCategory();
    }, []);
 
    const fetchPercentageByCategory = async () => {
        try {
            const response = await fetch("api/gamesListings");
            if (response.ok) {
                const data = await response.json();
 
                const categories = [...new Set(data.map((game) => game.categories))];
                const gamesCount = data.length; // Total number of games
 
                const percentageByCategory = categories.map((category) => {
                    const gamesInCategory = data.filter((game) => game.categories === category);
                    const percentage = (gamesInCategory.length / gamesCount) * 100; // Calculate percentage
                    return percentage;
                });
 
                setChartData({ series: [{ data: percentageByCategory }], categories });
            } else {
                console.error("Failed to fetch game listings");
            }
        } catch (error) {
            console.error("An error occurred while fetching percentage by category:", error);
        }
    };
 
    const { series, categories } = chartData;
 
    const chartOptions = {
        series,
        options: {
            chart: {
                height: 350,
                type: 'radar',
                toolbar: {
                    show: true,
                },
                zoom: {
                    enabled: true,
                },
            },
            xaxis: {
                categories,
            },
            colors: ['#68C301'], // Specify the color of the line
        },
    };
 
    return (
        <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type="radar"
            height={chartOptions.options.chart.height}
        />
    );
};
 
export default RadarChart;
 