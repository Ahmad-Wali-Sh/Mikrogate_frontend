import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useGroup } from "../../components/useUser";

export default function CheckList() {
  const [trigger, setTrigger] = useState(0);
  const location = useLocation();
  const data = location.state?.data;
  const groups = useGroup();

  const token = useContext(Context);

  const CHECKLIST_URL = process.env.REACT_APP_CHECKLIST_URL;

  useEffect(() => {
    axios
      .get(CHECKLIST_URL + `?id=${data.id}`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setCount(res.data.count);
        setCheckListId(res.data.results.map((item) => item.id));
        setTaskCheckList(res.data.results);
        console.log(res.data.results);
      });
  }, [trigger]);

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };
  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const [taskCheckList, setTaskCheckList] = useState([]);

  const [count, setCount] = React.useState();
  const [checkListId, setCheckListId] = React.useState();
  const [checklist, setChecklist] = React.useState({
    cable: false,
    stand: false,
    router: false,
    antenna: false,
    router_os: false,
    signal: false,
    dns: false,
    task: data.id,
  });

  const checkboxHandleChange = (event) => {
    setChecklist({
      ...checklist,
      [event.target.name]: event.target.checked,
    });
  };

  const checklistSubmit = async (event) => {
    event.preventDefault();
    warningNotification();
    const checklistForm = new FormData();

    Object.keys(checklist).map((key) => {
      checklistForm.append(
        checklist[key] != "" && key,
        checklist[key] != "" && checklist[key]
      );
    });

    console.log(CHECKLIST_URL);
    try {
      const respone = await axios({
        method: count > 0 ? "PATCH" : "POST",
        url: count > 0 ? CHECKLIST_URL + `${checkListId}/` : CHECKLIST_URL,
        data: checklistForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(respone);
      setTrigger((prev) => prev + 1);
      submitNotification();
    } catch (err) {
      console.log(err);
      const errorNotification = (e) => {
        NotificationManager.error(err.message, "Error", 2000);
      };
      errorNotification();
    }
  };

  return (
    <>
      {taskCheckList == false && groups.technician && (
        <button
          type="button"
          class="btn btn-primary mt-2"
          data-bs-toggle="modal"
          data-bs-target="#checklistModal"
          data-bs-whatever="@mdo"
        >
          Add Checklist
        </button>
      )}
      <div
        class="modal fade"
        id="checklistModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-ml">
          <div class="modal-content">
            <div class="modal-header">
              <div className="form-check ml-3">
                <form onSubmit={checklistSubmit}>
                  <h4 className="mt-3">Checklist</h4>
                  <br />
                  <div className="form-check ml-3">
                    <ul className="list-unstyled">
                      <li className="list-item">
                        <input
                          type="checkbox"
                          className="form-check-input border border-primary"
                          name="cable"
                          id=""
                          onChange={checkboxHandleChange}
                        />
                        &nbsp;Cable
                      </li>
                      <li className="list-item">
                        <input
                          type="checkbox"
                          className="form-check-input border border-primary"
                          name="stand"
                          id=""
                          onChange={checkboxHandleChange}
                        />
                        &nbsp;Stand
                      </li>
                      <li className="list-item">
                        <input
                          type="checkbox"
                          className="form-check-input border border-primary"
                          name="router"
                          id=""
                          onChange={checkboxHandleChange}
                        />
                        &nbsp;Router
                      </li>
                      <li className="list-item">
                        <input
                          type="checkbox"
                          className="form-check-input border border-primary"
                          name="antenna"
                          id=""
                          onChange={checkboxHandleChange}
                        />
                        &nbsp;Antenna
                      </li>
                      <li className="list-item">
                        <input
                          type="checkbox"
                          className="form-check-input border border-primary"
                          name="router_os"
                          id=""
                          onChange={checkboxHandleChange}
                        />
                        &nbsp;Router OS
                      </li>
                      <li className="list-item">
                        <input
                          type="checkbox"
                          className="form-check-input border border-primary"
                          name="signal"
                          id=""
                          onChange={checkboxHandleChange}
                        />
                        &nbsp;Signal
                      </li>
                      <li className="list-item">
                        <input
                          type="checkbox"
                          className="form-check-input border border-primary"
                          name="dns"
                          id=""
                          onChange={checkboxHandleChange}
                        />
                        &nbsp;DNS
                      </li>
                    </ul>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {taskCheckList != false &&
        taskCheckList.map((item) => (
          <div className="form-check ml-3">
            <form onSubmit={checklistSubmit}>
              <h4 className="mt-3">Checklist</h4>
              <br />
              <div className="form-check ml-3">
                <ul className="list-unstyled">
                  <li className="list-item">
                    <input
                      type="checkbox"
                      className="form-check-input border border-primary"
                      name="cable"
                      id=""
                      disabled
                      onChange={checkboxHandleChange}
                      defaultChecked={item.cable}
                    />
                    &nbsp;Cable
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      className="form-check-input border border-primary"
                      name="stand"
                      id=""
                      disabled
                      onChange={checkboxHandleChange}
                      defaultChecked={item.stand}
                    />
                    &nbsp;Stand
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      className="form-check-input border border-primary"
                      name="router"
                      id=""
                      disabled
                      onChange={checkboxHandleChange}
                      defaultChecked={item.router}
                    />
                    &nbsp;Router
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      className="form-check-input border border-primary"
                      name="antenna"
                      id=""
                      disabled
                      onChange={checkboxHandleChange}
                      defaultChecked={item.antenna}
                    />
                    &nbsp;Antenna
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      className="form-check-input border border-primary"
                      name="router_os"
                      id=""
                      disabled
                      onChange={checkboxHandleChange}
                      defaultChecked={item.router_os}
                    />
                    &nbsp;Router OS
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      className="form-check-input border border-primary"
                      name="signal"
                      id=""
                      disabled
                      onChange={checkboxHandleChange}
                      defaultChecked={item.signal}
                    />
                    &nbsp;Signal
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      className="form-check-input border border-primary"
                      name="dns"
                      id=""
                      disabled
                      onChange={checkboxHandleChange}
                      defaultChecked={item.dns}
                    />
                    &nbsp;DNS
                  </li>
                </ul>
              </div>
              {/* <div className="modal-footer">
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </div> */}
            </form>
          </div>
        ))}
    </>
  );
}
