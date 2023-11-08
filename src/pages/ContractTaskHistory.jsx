import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";

function ContractTaskHistory() {
  const location = useLocation();
  let contract = location.state?.contract;

  const [tasks, setTasks] = React.useState([]);
  const TASK_URL = process.env.REACT_APP_TASK;

  const token = React.useContext(Context);

  useEffect(() => {
    axios
      .get(
        TASK_URL + `?contract__contract_number=${contract.contract_number}&ordering=-created`,
        {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        }
      )
      .then((res) => {
        setTasks(res.data.results);
        console.log(tasks);
      });
  }, [contract]);

  return (
    <div className="content-wrapper">
      <div className="content">
        {contract.changes && (
          <section>
            <div className="row reverse">
              <div className="col-md-12">
                <div className="card card-outline card-info">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      &nbsp;{`History For ${contract.name}`}
                    </h3>
                  </div>
                  <div className="history-card">
                    <div className="card-body">
                      <div className="grid-container-h">
                        <div className="history-update col-2">Update Date</div>
                        <div className="history-change col-2">Project</div>
                        <div className="history-new-old col-4">Title</div>
                        <div className="history-new-old col-2">Tag</div>
                        <div className="history-user col-2">User</div>
                      </div>
                    </div>
                    <div>
                      {tasks?.map((task) => (
                        <Link
                          to={
                            task.project.name == "Installation"
                              ? "/task-manager/details"
                              : task.project.name == "Troubleshoot"
                              ? "/task-manager/troubleshoot"
                              : task.project.name == "Online Support"
                              ? "/task-manager/online_support"
                              : task.project.name == "Change Location"
                              ? "/task-manager/change_location"
                              : task.project.name == "Amendment"
                              ? "/task-manager/amendment"
                              : task.project.name == 'NOC Staff' 
                              ? '/task-manager/noc_assigned_details'
                              : ''
                          }
                          state={{ data: task }}
                        >
                          <div className="card-body">
                            <div className="grid-container-h-items">
                              <div className="history-update col-2">
                                <small style={{ display: "block" }}>
                                  {new Date(task.created)
                                    .toString()
                                    .slice(0, 16)}
                                </small>
                                <small>
                                  {new Date(task.created)
                                    .toLocaleTimeString()
                                    .replace(
                                      /([\d]+:[\d]{2})(:[\d]{2})(.*)/,
                                      "$1$3"
                                    )}
                                </small>
                              </div>
                              <div className="history-change col-2">
                                {task.project.name}
                              </div>
                              <div className="history-new-old col-4">
                                <small>{task.title}</small>
                              </div>
                              <div className="history-new-old col-2">
                                {task.tag.name}
                              </div>
                              <div className="history-user col-2">
                                {task.user.name}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ContractTaskHistory;
