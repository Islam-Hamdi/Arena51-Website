import { useState } from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
    const [chartOptions] = useState({
        series: [
            {
                name: "Sales", // Name of the series
                data: [10000, 15000, 20000, 18000, 22000, 25000, 23000, 28000], // Monthly sales data
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
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: 'black', // Set background color
            color: "black"
        },
        legend: {
            show: false
        },
        fill: {
            // type: "gradient",
            // gradient: {
            //     shadeIntensity: 1,
            //     inverseColors: false,
            //     opacityFrom: 1,
            //     opacityTo: 90,
            //     stops: [, 100, 100],
            // },
        },
        yaxis: {
            title: {
                text: "Sales Amount ($)",
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

    return (
        <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={chartOptions.chart.height}
        />
    );
};

export default BarChart;
