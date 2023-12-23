import React from "react";
import LogMessage from "../../components/LogMessage";
import Header from "../../components/Header";
import OnlineSupport from "./components/OnlineSupport";
import { useLocation } from "react-router-dom";
import OnlineChange from "./components/OnlineChange";

export default function OnlineSupportDetails() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <>
      <div className="content-wrapper">
        <div className="content">
        <div className="col-10 mt-5 m-auto">
          <Header />
          <OnlineChange />
          <OnlineSupport />
          <LogMessage data={[data]} id={data.id} />
        </div>
        </div>
      </div>
    </>
  );
}
