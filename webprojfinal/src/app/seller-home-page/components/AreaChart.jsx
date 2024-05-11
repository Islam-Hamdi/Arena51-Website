import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
 
const AreaChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        labels: [],
    });
 
    useEffect(() => {
        fetchAveragePrices();
    }, []);
 
    const fetchAveragePrices = async () => {
        try {
            const response = await fetch("api/gamesListings"); // Assuming this endpoint returns game prices
            if (response.ok) {
                const data = await response.json();
 
                // Calculate average price for each category
                const categories = [...new Set(data.map((game) => game.categories))];
                const averagePrices = categories.map((category) => {
                    const gamesInCategory = data.filter((game) => game.categories === category);
                    const totalPrice = gamesInCategory.reduce((acc, game) => acc + game.price, 0);
                    return totalPrice / gamesInCategory.length;
                });
 
                const labels = categories;
 
                setChartData({ series: [{ data: averagePrices }], labels });
            } else {
                console.error("Failed to fetch game prices");
            }
        } catch (error) {
            console.error("An error occurred while fetching prices:", error);
        }
    };
 
    const { series, labels } = chartData;
    const chartOptions = {
        colors: ['#79e200'], // Setting area color
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
            type: "area",
            height: 350,
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: true,
            },
            background: "black",
        },
        legend: {
            show: false,
        },
        yaxis: {
            title: {
                text: "Average Price",
            },
            labels: {
                formatter: (val) => `$${val.toFixed(2)}`, // Display numbers with two decimal places
            },
        },
        xaxis: {
            type: "category",
            categories: labels,
        },
        tooltip: {
            shared: true,
            y: {
                formatter: (val) => `$${val.toFixed(2)}`, // Display numbers with two decimal places
            },
        },
    };
 
    return (
        <>
            {(typeof window !== 'undefined') &&
                <Chart
                    options={chartOptions}
                    series={series}
                    type="area"
                    height={chartOptions.chart.height}
                />
            }
        </>
    );
};
 
export default AreaChart;