import React from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css";

//pages
//components
import InfoContainer from "../../components/InfoContainer/InfoContainer";

function Dashboard() {
  return (
    <div className="info-bundle">
      <InfoContainer className="top-left" />
      <InfoContainer className="top-right" />
      <InfoContainer className="bottom-left" />
      <InfoContainer className="bottom-right" />
    </div>
  );
}

export default Dashboard;
