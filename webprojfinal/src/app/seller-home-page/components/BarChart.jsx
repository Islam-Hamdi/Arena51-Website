import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
 
const BarChart = () => {
    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                name: "Sales", // Name of the series
                data: [], // Monthly sales data (will be updated dynamically)
                color: '#79e200'
            },
        ],
        sparkline: {
            enabled: false,
        },
        theme: {
            mode: 'dark',
        },
        chart: {
            type: "bar",
            height: 350,
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: true,
            },
            background: 'black', // Set background color
            color: "black"
        },
        legend: {
            show: false
        },
        fill: {},
        yaxis: {
            title: {
                text: "Purchases",
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], // Months
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return "$" + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // Format tooltip value as currency
                },
            },
        },
    });
 
    useEffect(() => {
        fetchPurchase();
    }, []);
 
    const fetchPurchase = async () => {
        try {
            const response = await fetch("api/purchase");
            const data = await response.json();
            const formattedData = formatData(data);
            updateChartOptions(formattedData);
        } catch (error) {
            console.error("Error fetching purchase data:", error);
        }
    };
 
    const formatData = (data) => {
        // Format data to match the structure expected by the chart component
        const monthlySales = Array.from({ length: 8 }, () => 0); // Initialize array with 0 for each month
        data.forEach(purchase => {
            const monthIndex = new Date(purchase.purchaseDate).getMonth(); // Get month index from purchaseDate
            monthlySales[monthIndex] += purchase.price * purchase.quantity; // Increment sales for the respective month
        });
        return monthlySales;
    };
 
    const updateChartOptions = (data) => {
        // Update chart options with the formatted data
        setChartOptions(prevOptions => ({
            ...prevOptions,
            series: [{ data }]
        }));
    };
 
    return (
        <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={chartOptions.chart.height}
        />
    );
};
 
export default BarChart