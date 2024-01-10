import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Label,
} from "recharts";
import "./Overview.css";
import { area, lab } from "d3";

function Overview() {
  const data = [
    {
      month: "Jan",
      revenue: 900,
    },
    {
      month: "Feb",
      revenue: 300,
    },
    {
      month: "Mar",
      revenue: 500,
    },
    {
      month: "Apr",
      revenue: 200,
    },
    {
      month: "May",
      revenue: 600,
    },
    {
      month: "Jun",
      revenue: 400,
    },
    {
      month: "Jul",
      revenue: 1200,
    },
    {
      month: "Aug",
      revenue: 1700,
    },
    {
      month: "Sep",
      revenue: 1800,
    },
    {
      month: "Oct",
      revenue: 300,
    },
    {
      month: "Nov",
      revenue: 300,
    },
    {
      month: "Dec",
      revenue: 300,
    },
  ];

  return (
    <>
      <div className="overviewContainer">
        <div className="monthlyRevenue">
          <ResponsiveContainer>
            <AreaChart width={500} height={400} data={data}>
              <XAxis dataKey="month"></XAxis>
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="ordersStatus">ordersStatus</div>
        <div className="topSelling">topSelling</div>
        <div className="valuableCustomers">valuableCustomers</div>
      </div>
    </>
  );
}

export default Overview;
