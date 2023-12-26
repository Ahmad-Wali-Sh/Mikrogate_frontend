import React from "react";
import LogMessage from "../../components/LogMessage";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import CPE from "./CPE";
import Troubleshoot from "../Troubleshoot/components/Troubleshoot";
import OnlineChange from "../OnlineSupport/components/OnlineChange";

export default function CPEDetails() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <>
      <div className="content-wrapper">
        <div className="content">
        <div className="col-10 mt-5 m-auto">
          <Header />
          <OnlineChange />
          <Troubleshoot />
          <CPE />
          <LogMessage data={[data]} id={data.id} />
        </div>
        </div>
      </div>
    </>
  );
}
