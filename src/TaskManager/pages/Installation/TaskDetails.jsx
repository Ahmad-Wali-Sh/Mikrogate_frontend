import React from "react";
import { useLocation } from "react-router-dom";
import LogMessage from "../../components/LogMessage";
import Installations_details from "./components/Installations_details";
import Link_Details from "../../components/Link_Details";
import Header from "../../components/Header";
import Switch from "../../components/Switch";
import GeneralDetails from "./components/GenralDetails";

const TaskDetails = () => {
  const location = useLocation();
  const data = location.state?.data;  

  return (
    <div className="content-wrapper">
      <div className="content">
      <div className="col-10 mt-5 m-auto">
        <section>
          <Header task={data}/>
          <GeneralDetails />
          <Installations_details id={data.id} contract_id={data}/>
          <Link_Details data={[data]} id={data.id} />
          <Switch data={[data]} id={data.id}/>
          <LogMessage data={[data]} id={data.id}/>
        </section>
      </div>
      </div>
    </div>
  );
};

export default TaskDetails;
