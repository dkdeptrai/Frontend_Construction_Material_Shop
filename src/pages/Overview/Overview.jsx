import React from "react";
import {
  PieChart,
  Pie,
  Cell,
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

import ValuableCustomerComponent from "../../components/ValuableCustomerComponent/valuableCustomerComponent";

import "./Overview.css";

function Overview() {
  const revenueData = [
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
  const orderData = [
    {
      name: "Pending",
      value: 300,
      fill: "#deefff",
    },
    {
      name: "Delivered",
      value: 500,
      fill: "#e1ffe7",
    },
    {
      name: "Cancelled",
      value: 700,
      fill: "#ffdfdf",
    },
    {
      name: "Delivering",
      value: 200,
      fill: "#fff4d8",
    },
  ];

  const customerData = [
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <>
      <div className="overviewContainer">
        <div className="monthlyRevenue">
          <ResponsiveContainer>
            <AreaChart width={500} height={400} data={revenueData}>
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
        <div className="ordersStatus">
          <ResponsiveContainer className="pieChartContainer">
            <PieChart>
              <Pie
                data={orderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={50}
                outerRadius={90}
                dataKey="value"
              ></Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="orderLabels">
            <div className="processingLabel">Processing</div>
            <div className="deliveringLabel">Delivering</div>
            <div className="cancelledLabel">Cancelled</div>
            <div className="deliveredLabel">Delivered</div>
          </div>
        </div>
        <div className="topSelling">topSelling</div>
        <div className="valuableCustomers">
          {customerData.map((customer) => (
            <ValuableCustomerComponent customer={customer} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Overview;
