import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../../context/Context";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import CheckList from "../../../components/CheckList";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useGroup } from "../../../../components/useUser";

export default function Troubleshoot() {
  const location = useLocation();
  const data = location.state?.data;
  const token = useContext(Context);

  const groups = useGroup();

  const [singleTroubleshootTask, setSingleTroubleshootTask] = React.useState(
    []
  );
  const troubleshoot_details = singleTroubleshootTask.map((item) => item.id);
  const TROUBLE_URL = process.env.REACT_APP_TROUBLE;

  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    axios
      .get(TROUBLE_URL + `?id=${data.id}`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setSingleTroubleshootTask(res.data.results);
        console.log(res.data.count);
      });
  }, [trigger]);

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };
  const errorNotification = (e) => {
    NotificationManager.error("Not Sent!", "", 2000);
  };
  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const [truobleshoot, setTroubleshoot] = React.useState({
    address: "",
    contact: "",
    problem: "",
    service_charge: "",
    description: "",
  });

  console.log(truobleshoot);
  console.log(singleTroubleshootTask);

  let handlerChange = (event) => {
    setTroubleshoot({
      ...truobleshoot,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const updateTrobleshoot = async (e) => {
    e.preventDefault();
    warningNotification();
    const data = new FormData();

    Object.keys(truobleshoot).map((key) => {
      data.append(
        truobleshoot[key] != "" && key,
        truobleshoot[key] != "" && truobleshoot[key]
      );
    });

    try {
      const response = await axios({
        method: "PATCH",
        url: TROUBLE_URL + `${troubleshoot_details}/`,
        data: data,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(response);
      setTrigger(prev => prev + 1)
      submitNotification();
    } catch (err) {
      console.log(err.message);
      errorNotification();
    }
  };

  function TroubleshootSubmit(e) {
    e.preventDefault();
    warningNotification();
    const TroubleshootForm = new FormData();
    TroubleshootForm.append("address", truobleshoot.address);
    TroubleshootForm.append("contact", truobleshoot.contact);
    TroubleshootForm.append("problem", truobleshoot.problem);
    TroubleshootForm.append("service_charge", truobleshoot.service_charge);
    TroubleshootForm.append("description", truobleshoot.description);
    TroubleshootForm.append("link_details", 4);
    TroubleshootForm.append("checklist", 1);
    TroubleshootForm.append("task", data.id);

    try {
      const response = axios({
        method: "POST",
        url: TROUBLE_URL,
        data: TroubleshootForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(response);
      submitNotification();
      setTrigger(prev => prev + 1)
    } catch (err) {
      console.log(err.message);
      errorNotification();
    }
  }

  return (
    <>
      {singleTroubleshootTask == false && (groups.noc_manager || groups.noc_stuff) && (
        <div className="mb-2 mt-2">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Add Details
          </button>
        </div>
      )}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Troubleshoot Settings
              </h5>
              {(groups.noc_manager || groups.noc_stuff) && (
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              )}
            </div>
            <div class="modal-body">
              <form onSubmit={TroubleshootSubmit}>
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_address"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Address
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="address"
                      id="troubleshoot_address"
                      placeholder="..."
                      disabled={
                        groups.noc_manager || groups.noc_stuff ? false : true
                      }
                      className="form-control"
                      onChange={handlerChange}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_contact"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Contact
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="contact"
                      id="troubleshoot_contact"
                      placeholder="..."
                      className="form-control"
                      onChange={handlerChange}
                    />
                  </div>
                  <label
                    htmlFor="troubleshoot_charge"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Service Charge
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="service_charge"
                      id="troubleshoot_charge"
                      placeholder="..."
                      className="form-control"
                      onChange={handlerChange}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_problem"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Problem
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="problem"
                      id="troubleshoot_problem"
                      placeholder="..."
                      className="form-control"
                      onChange={handlerChange}
                    />
                  </div>
                </div>
                <div className="row mt-5" id="pills-tab" role="tablist">
                  <div className="col-12">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <span
                          className="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          Description
                        </span>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <textarea
                          className="form-control border border-top-0 rounded-0"
                          placeholder="Leave a description here"
                          id="floatingTextarea"
                          rows="6"
                          name="description"
                          onChange={handlerChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success " data-bs-dismiss='modal'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {singleTroubleshootTask.map((item) => (
        <>
          <h3>Troubleshoot</h3>
          <div className="card text-dark bg-light mb-3">
            <form onSubmit={updateTrobleshoot}>
              <div className="card-header">Task details</div>
              <div className="card-body">
                <div className="row mt-1">
                  <label
                    htmlFor="troubleshoot_title"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="title"
                      id="troubleshoot_title"
                      placeholder="..."
                      className="form-control"
                      onChange={handlerChange}
                      defaultValue={data.title}
                      disabled={
                        groups.noc_manager || groups.noc_stuff ? false : true
                      }
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_address"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Address
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="address"
                      id="troubleshoot_address"
                      placeholder="..."
                      className="form-control"
                      onChange={handlerChange}
                      defaultValue={item.address}
                      disabled={
                        groups.noc_manager || groups.noc_stuff ? false : true
                      }
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_contact"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Contact
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="contact"
                      id="troubleshoot_contact"
                      placeholder="..."
                      className="form-control"
                      onChange={handlerChange}
                      defaultValue={item.contact}
                      disabled={
                        groups.noc_manager || groups.noc_stuff ? false : true
                      }
                    />
                  </div>
                  <label
                    htmlFor="troubleshoot_charge"
                    className="col-sm-3 col-form-label text-muted"
                  >
                    Service Charge
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      name="service_charge"
                      id="troubleshoot_charge"
                      placeholder="..."
                      className="form-control"
                      onChange={handlerChange}
                      disabled={
                        groups.noc_manager || groups.noc_stuff ? false : true
                      }
                      defaultValue={item.service_charge}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_problem"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Problem
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="problem"
                      id="troubleshoot_problem"
                      placeholder="..."
                      className="form-control"
                      onChange={handlerChange}
                      defaultValue={item.problem}
                      disabled={
                        groups.noc_manager || groups.noc_stuff ? false : true
                      }
                    />
                  </div>
                </div>
                <div className="row mt-5" id="pills-tab" role="tablist">
                  <div className="col-12">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <span
                          className="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          Description
                        </span>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <textarea
                          className="form-control border border-top-0 rounded-0"
                          placeholder="Leave a description here"
                          id="floatingTextarea"
                          rows="6"
                          disabled={
                            groups.noc_manager || groups.noc_stuff ? false : true
                          }
                          name="description"
                          onChange={handlerChange}
                          defaultValue={item.description}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {(groups.noc_manager || groups.noc_stuff) && <button type="submit" className="btn btn-success">
                  Submit
                </button>}
              </div>
            </form>
          </div>
        </>
      ))}
    </>
  );
}
