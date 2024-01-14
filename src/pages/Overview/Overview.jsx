import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { API_CONST } from "../../constants/apiConstants";

import "./Overview.css";

function Overview() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([
    [
      {
        name: "John",
        phone: "1234567890",
        orderCount: 5,
        totalSpent: 500,
      },
      {
        name: "John",
        phone: "1234567890",
        orderCount: 5,
        totalSpent: 500,
      },
    ],
  ]);

  const fetchOverviewData = async () => {
    try {
      const response = await fetch(API_CONST + "/overview", {
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
      const newCustomerData = valuableCustomers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        orderCount: customer.orderCount && 0,
        totalSpent: customer.totalSpent && 0,
      }));
      console.log(newCustomerData);
      setCustomerData(newCustomerData);
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

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const handleClick = (customer) => {
    console.log("clicked", customer);
    navigate(`/customers/${customer.id}`);
  };

  return (
    <>
      <div className="overviewContainer">
        <div className="monthlyRevenue">
          <div className="label">Monthly Revenue</div>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
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
          <div className="label">Orders Status</div>
          <div className="pieChartContainer">
            <ResponsiveContainer
              className="pieChartRC"
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={orderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius="40%"
                  outerRadius="80%"
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

          {customerData ? (
            customerData.map((customer) => (
              <ValuableCustomerComponent
                customer={customer}
                handleClick={() => handleClick(customer)}
              />
            ))
          ) : (
            <ValuableCustomerComponent customer={customerData} />
          )}
        </div>
      </div>
    </>
  );
}

export default Overview;
