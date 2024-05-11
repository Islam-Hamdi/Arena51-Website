"use client"
import React from 'react'
import LineChart from '../seller-home-page/components/LineChart'
import BarChart from '../seller-home-page/components/BarChart'
import DonutChart from '../seller-home-page/components/Donut'
import AreaChart from '../seller-home-page/components/AreaChart'
import CategoryLineChart from "../seller-home-page/components/catagroryLine";
import RadarChart from "../seller-home-page/components/catagorydistribution";
 
const Page = () => {
  return (
    <div>
        <div style={{ background: "black", padding: "20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ marginBottom: "20px" }}>
                <h2>Bar Chart: Purchases by Month</h2>
                <BarChart />
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h2>Donut Chart: % of Free and Paid Games</h2>
                <DonutChart />
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h2>Area Chart: Average price for games in each category</h2>
                <AreaChart />
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h2>Radar Chart: % of Games Per Gategories</h2>
                <RadarChart />
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h2>Category Line Chart: Number of Games Per Category</h2>
                <CategoryLineChart />
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h2>Line Chart: Price by Game</h2>
                <LineChart />
            </div>
        </div>
    </div>
  )
}
 
export default Page;
 