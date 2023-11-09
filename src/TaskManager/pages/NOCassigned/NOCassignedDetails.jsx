import React from "react";
import LogMessage from "../../components/LogMessage";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import NocAssigned from "./Dashboard/NOCassigned";
import CreateTasks from "./Dashboard/CreateTasks";
import GeneralDetails from "../Installation/components/GenralDetails";

export default function NocAssignedDetails() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <>
      <div className="content-wrapper">
        <div className="content">
          <div className="col-10 mt-5 m-auto">
            <Header />
            <NocAssigned />
            <CreateTasks data={[data]}/>
            <LogMessage data={[data]} id={data.id} />
          </div>
        </div>
      </div>
    </>
  );
}
