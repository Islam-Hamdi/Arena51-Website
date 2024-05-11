"use client"
import React from 'react'
import LineChart from '../seller-home-page/components/LineChart'
import BarChart from '../seller-home-page/components/BarChart'
import DonutChart from '../seller-home-page/components/Donut'
import AreaChart from '../seller-home-page/components/AreaChart'
import CategoryLineChart from "../seller-home-page/components/catagroryLine";
import RadarChart from "../seller-home-page/components/catagorydistribution";

const page = () => {
  return (
    <div>
         <div style={{ background: "black", padding: "20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "45%" }}>
                        <LineChart />
                    </div>
                    <div style={{ width: "50%" }}>
                        <BarChart />
                    </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "30%" }}>
                        <DonutChart />
                    </div>
                    <div style={{ width: "30%" }}>
                        <RadarChart />
                    </div>
                    <div style={{ width: "70%" }}>
                        <AreaChart />
                    </div>

                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "70%" }}>
                    <CategoryLineChart /></div>
                </div>
           
    </div>
  )
}

export default page