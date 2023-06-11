import React from "react";
import ChangeLocation from "./components/ChangeLocation";
import Header from "../../components/Header";
import LogMessage from "../../components/LogMessage";
import CheckList from "../../components/CheckList";
import Switch from "../../components/Switch";
import Link_Details from "../../components/Link_Details";
import { useLocation } from "react-router-dom";

export default function ChangeLocationDetails() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div className="content-wrapper">
      <div className="content">
      <div className="col-10 mt-5 m-auto">
        <Header />
        <ChangeLocation />
        <Link_Details data={[data]} id={data.id} />
        <CheckList />
        <Switch data={[data]} id={data.id}/>
        <LogMessage data={[data]} id={data.id} />
      </div>
      </div>
    </div>
  );
}
