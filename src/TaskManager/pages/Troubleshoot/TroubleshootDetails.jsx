import React from "react";
import { useLocation } from "react-router-dom";
import LogMessage from "../../components/LogMessage";
import Troubleshoot from "./components/Troubleshoot";
import Header from "../../components/Header";
import Switch from "../../components/Switch";
import CheckList from "../../components/CheckList";
import Link_Details from "../../components/Link_Details";


const TroubleshootDetails = (props) => {
  const location = useLocation();
  const data = location.state?.data;


  return (
    <div className="content-wrapper">
      <div className="content">
      <div className="col-10 mt-5 m-auto">
        <Header />
        <Troubleshoot />
        <Link_Details data={[data]} id={data.id} />
        <CheckList />
        <Switch data={[data]} id={data.id}/>
        <LogMessage data={[data]} id={data.id} />
      </div>
      </div>
    </div>
  );
};

export default TroubleshootDetails;
