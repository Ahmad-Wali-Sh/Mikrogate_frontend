import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../../../context/Context";
import { useContext } from "react";
import { NotificationManager } from "react-notifications";
import { useGroup } from "../../../../components/useUser";

const ChangeLocation = (props) => {
  const location = useLocation();
  const data = location.state?.data;
  const token = useContext(Context);
  const [trigger, setTrigger] = useState(0)

  const groups = useGroup()

  console.log(data.id);

  const CHANGE_URL = process.env.REACT_APP_CHANGE_LOCATION;

  const [ChangeLocationData, setChangeLocation] = React.useState([]);
  const [ChangeLocationID, setChangeLocationID] = React.useState([]);

  useEffect(() => {
    axios.get(CHANGE_URL + `?id=${data.id}`, {
      headers: {
        Authorization: "Token " + token.user.token,
      },
    }).then((res) => {
      setChangeLocation(res.data.results);
      setChangeLocationID(res.data.results.map((item) => item.id));
      console.log(res.data.count);
    });
  }, [trigger]);

  const [changelocation, setChangelocation] = React.useState({
    address: "",
    contact: "",
    service_charge: "",
    description: "",
  });

  let handlerChange = (event) => {
    setChangelocation({
      ...changelocation,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };
  const errorNotification = (e) => {
    NotificationManager.error("Not Sent!", "", 2000);
  };
  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const updateChangeLocation = async (e) => {
    e.preventDefault();
    warningNotification();
    const data = new FormData();

    Object.keys(changelocation).map((key) => {
      data.append(
        changelocation[key] != "" && key,
        changelocation[key] != "" && changelocation[key]
      );
    });

    try {
      const response = await axios({
        method: "PATCH",
        url: CHANGE_URL + `${ChangeLocationID}/`,
        data: data,
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
  };

  const ChangeLocationSubmit = async (e) => {
    e.preventDefault();
    warningNotification();
    const ChangeLocationForm = new FormData();
    ChangeLocationForm.append("address", changelocation.address);
    ChangeLocationForm.append("contact", changelocation.contact);
    ChangeLocationForm.append("service_charge", changelocation.service_charge);
    ChangeLocationForm.append("description", changelocation.description);
    ChangeLocationForm.append("task", data.id);

    try {
      const response = await axios({
        method: "POST",
        url: CHANGE_URL,
        data: ChangeLocationForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(response);
      submitNotification();
      setTrigger(prev => prev + 1)
    } catch (err) {
      console.log(err);
      const errorNotification = (e) => {
        NotificationManager.error(err.message, "Error!", 2000);
      };
      errorNotification();
    }
  };

  return (
    <>
      {ChangeLocationData == false && (
        <div className="mb-2 mt-2">
          {(groups.noc_manager || groups.noc_stuff) && <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Add Details
          </button>}
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
                Change Location Settings
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={ChangeLocationSubmit}>
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
                  <button type="submit" className="btn btn-success" data-bs-dismiss='modal'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {ChangeLocationData.map((item) => (
        <>
          <h3>Change Location</h3>
          <div className="card text-dark bg-light mb-3">
            <form onSubmit={updateChangeLocation}>
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
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handlerChange}
                      defaultValue={data.title}
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
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      onChange={handlerChange}
                      defaultValue={item.address}
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
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handlerChange}
                      defaultValue={item.contact}
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
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handlerChange}
                      defaultValue={item.service_charge}
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
                          disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                          name="description"
                          onChange={handlerChange}
                          defaultValue={item.description}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              <small>by: {ChangeLocationData?.[0].user.name}</small>
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
};

export default ChangeLocation;
