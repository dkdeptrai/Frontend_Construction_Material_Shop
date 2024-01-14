import React, { useEffect, useState } from "react";
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

import ProgressBar from "@ramonak/react-progress-bar";

import ValuableCustomerComponent from "../../components/ValuableCustomerComponent/valuableCustomerComponent";

import "./Overview.css";
import { API_CONST } from "../../constants/apiConstants";

function Overview() {
  const fetchOverviewData = async () => {
    try {
      const response = await fetch(`${API_CONST}/overview`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      const revenueData = data.monthlySales.monthlySalesItems;
      revenueData.map((revenue) => {
        revenue.month = revenue.month.split("-")[1];
      });
      setRevenueData(revenueData);

      const orderStatistics = data.orderStatistics;
      const newOrderData = [
        {
          name: "Pending",
          value: orderStatistics.processingOrderCount,
          fill: "#deefff",
        },
        {
          name: "Delivered",
          value: orderStatistics.completedOrderCount,
          fill: "#e1ffe7",
        },
        {
          name: "Cancelled",
          value: orderStatistics.cancelledOrderCount,
          fill: "#ffdfdf",
        },
        {
          name: "Delivering",
          value: orderStatistics.deliveringOrderCount,
          fill: "#fff4d8",
        },
      ];
      setOrderData(newOrderData);
      const valuableCustomers = data.valuableCustomers;
    } catch (e) {
      console.log("Error in fetching overview data: ", e);
    }
  };
  const [revenueData, setRevenueData] = useState([
    {
      month: "Jan",
      revenue: 900,
    },
  ]);
  const [orderData, setOrderData] = useState([
    {
      name: "Delivering",
      value: 200,
      fill: "#fff4d8",
    },
  ]);

  const customerData = [
    {
      name: "John",
      phone: "1234567890",
      orderCount: 5,
      totalSpent: 500,
    },
  ];

  useEffect(() => {
    fetchOverviewData();
  }, []);

  return (
    <>
      <div className="overviewContainer">
        <div className="monthlyRevenue">
          <div className="label">Monthly Revenue</div>
          <AreaChart width={550} height={400} data={revenueData}>
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
        </div>
        <div className="ordersStatus">
          <div className="label">Orders Status</div>
          <div className="pieChartContainer">
            <ResponsiveContainer className="pieChartRC">
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
        </div>
        <div className="topSelling">
          <div className="label">Top Revenue Growth</div>
          <ProgressBar
            completed={70}
            bgColor="#8884d8"
            animateOnRender={true}
          />
        </div>
        <div className="valuableCustomers">
          <div className="label">Valuable Customers</div>

          {customerData.map((customer) => (
            <ValuableCustomerComponent customer={customer} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Overview;
