import axios from "axios";
import React from "react";
import { useEffect, useContext } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { useGroup } from "../../../components/useUser";
import { useAssignedFilter } from "../../../components/State";

export default function FinanceTasks() {
  const token = useContext(Context);
  const groups = useGroup();
  const [trigger, setTrigger] = React.useState("");

  const { assignedFilter, setAssignedFilter } = useAssignedFilter();

  const ME_URL = process.env.REACT_APP_USER;
  const TASK_URL = process.env.REACT_APP_TASK;

  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    axios
      .get(
        TASK_URL.slice(0, -5) +
          `finance-tasks/?ordering=-created&contract__contract_id=${
            assignedFilter.contractId ? assignedFilter.contractId : ""
          }&contract__contract_number=${
            assignedFilter.contractNumbere ? assignedFilter.contractNumbere : ""
          }&payment_cleared=${assignedFilter.archivedShow ? "" : false}`,
        {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setTasks(res.data.results);
      })
      .catch((e) => console.log(e));
  }, [
    assignedFilter.archivedShow,
    assignedFilter.contractName,
    assignedFilter.contractId,
    assignedFilter.contractNumbere,
    trigger,
  ]);

  // const token = true

  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    axios
      .get(ME_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setUser(res.data));
    console.log(user);
  }, []);

  const submitNotification = (type) => {
    NotificationManager.success("New Task Created!", "", 2000);
  };
  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const paymentHandle = (task) => {
    const Form = new FormData();
    Form.append("payment_cleared", !task.payment_cleared);
    axios
      .patch(TASK_URL + task.id + "/", Form, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then(() => {
        setTrigger(new Date());
      });
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">NOC Staff Tasks</h3>
                </div>
              </div>
              <label>Show Paid Tasks :</label>
              <input
                type="checkbox"
                style={{ marginLeft: "1rem" }}
                checked={assignedFilter.archivedShow}
                onChange={(e) =>
                  setAssignedFilter({
                    archivedShow: e.target.checked,
                    contractId: assignedFilter.contractId,
                    contractNumbere: assignedFilter.contractNumbere,
                  })
                }
              />
              <br></br>
              <label>Contract id: </label>
              <input
                type="text"
                style={{ marginLeft: "3.2rem" }}
                value={assignedFilter.contractId}
                onChange={(e) =>
                  setAssignedFilter({
                    archivedShow: assignedFilter.archivedShow,
                    contractId: e.target.value,
                    contractNumbere: assignedFilter.contractNumbere,
                  })
                }
              />
              <br></br>
              <label>Contract Number: </label>
              <input
                type="text"
                style={{ marginLeft: "0.5rem" }}
                value={assignedFilter.contractNumbere}
                onChange={(e) =>
                  setAssignedFilter({
                    archivedShow: assignedFilter.archivedShow,
                    contractId: assignedFilter.contractId,
                    contractNumbere: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <table className="table projects">
          <thead>
            <tr>
              <th style={{ width: "1%" }}>#</th>
              <th style={{ width: "14%" }}>Contract_Credintials</th>
              <th style={{ width: "14%" }}>Task_Credintials</th>
              <th style={{ width: "13%" }}>Assigned</th>
              <th style={{ width: "13%" }}>Service_Charge</th>
              <th style={{ width: "14%" }}>Payment</th>
              <th style={{ width: "14%" }}>User</th>
              <th style={{ width: "14%" }}>Info</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, num) => (
              <>
                <tr key={task.id}>
                  <td>{num + 1}.</td>
                  <td>
                    <a>
                      <small className="text-muted">C#:</small>{" "}
                      {task.contract.contract_number}
                    </a>
                    <br />
                    <a>
                      <small className="text-muted">ID: </small>
                      {task.contract.contract_id}
                    </a>
                    <br />
                    <small className="text-muted">Name: </small>
                    {task.contract.name}
                    <br />
                  </td>
                  <td>
                    <div className="text-dark">{task.project.name}</div>
                    {task.title}
                  </td>
                  <td>
                    <select className="form-control btn">
                      <option hidden>
                        <small>Assigned ↓</small>
                      </option>
                      {task.assigned.map((assigne) => (
                        <option disabled>{assigne.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="text-bold text-center">
                    {task.troubleshoot_cost} AF
                  </td>
                  <td>
                    <button
                      className={`btn btn-${
                        task.payment_cleared ? "success" : "info"
                      }`}
                      onClick={() => {
                        paymentHandle(task);
                      }}
                    >
                      {task.payment_cleared ? "Paid" : "Clear"}
                    </button>
                  </td>
                  <td>
                    <small>{task.user.name}</small>
                    <br />
                    <small className="text-muted" style={{ display: "block" }}>
                      {new Date(task.created).toString().slice(0, 16)}
                    </small>
                    <small className="text-muted">
                      {new Date(task.created)
                        .toLocaleTimeString()
                        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                    </small>
                  </td>
                  <td>
                    <Link
                      className="text-decoration-none"
                      to={
                        task.project.name == "Installation"
                          ? "/task-manager/details"
                          : task.project.name == "Troubleshoot"
                          ? "/task-manager/troubleshoot"
                          : task.project.name == "Online Support"
                          ? "/task-manager/online_support"
                          : task.project.name == "Change Location"
                          ? "/task-manager/change_location"
                          : task.project.name == "CPE"
                          ? "/task-manager/cpe"
                          : task.project.name == "Amendment"
                          ? "/task-manager/amendment"
                          : task.project.name == "NOC Staff"
                          ? "/task-manager/noc_assigned_details"
                          : ""
                      }
                      state={{ data: task }}
                    >
                      More...
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
