import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../../context/Context";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function Amendment() {
  const location = useLocation();
  const data = location.state?.data;
  const token = useContext(Context);
  const [trigger, setTrigger] = useState(0);
  const ONLINE_URL = process.env.REACT_APP_AMENDMENT;

  const ME_URL = process.env.REACT_APP_USER
  const [user, setUser] = useState()
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

  console.log(data);

  const [onlineSupport, setOnlineSupport] = React.useState([]);
  const [onlineSupportId, setOnlineSupportId] = React.useState();
  const [count, setCount] = React.useState([]);
  const [OnlineSupportData, setOnlineSupportData] = React.useState({
    contact: "",
    by: "",
    description: "",
    task: data.id,
  });

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };
  const errorNotification = (e) => {
    NotificationManager.error("Not Sent!", "", 2000);
  };
  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  React.useEffect(() => {
    axios
      .get(ONLINE_URL + `?id=${data.id}`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setOnlineSupport(res.data.results);
        setOnlineSupportId(res.data.results.map((item) => item.id));
        setCount(res.data.count);
        console.log(res.data.results);
      });
  }, [trigger]);

  function handleChange(event) {
    setOnlineSupportData({
      ...OnlineSupportData,
      [event.target.name]: event.target.value,
    });
    console.log(OnlineSupportData);
  }

  const OnlineSupportUpdate = async (e) => {
    e.preventDefault();
    warningNotification();
    const OnlineSupportForm = new FormData();

    Object.keys(OnlineSupportData).map((key) => {
      OnlineSupportForm.append(
        OnlineSupportData[key] != "" && key,
        OnlineSupportData[key] != "" && OnlineSupportData[key]
      );
    });

    OnlineSupportForm.append('user', user.id)

    console.log(count);
    try {
      const response = await axios({
        method: "PATCH",
        url: ONLINE_URL + `${onlineSupportId}/`,
        data: OnlineSupportForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(response);
      submitNotification();
      setTrigger((prev) => prev + 1);
    } catch (err) {
      console.log(err.message);
      errorNotification();
    }
  };

  function handleChange(event) {
    setOnlineSupportData({
      ...OnlineSupportData,
      [event.target.name]: event.target.value,
    });
  }
  console.log(OnlineSupportData);

  const OnlineSupportSubmit = async (e) => {
    e.preventDefault();
    warningNotification();
    const OnlineSupportForm = new FormData();

    Object.keys(OnlineSupportData).map((key) => {
      OnlineSupportForm.append(
        OnlineSupportData[key] != "" && key,
        OnlineSupportData[key] != "" && OnlineSupportData[key]
      );
    });

    OnlineSupportForm.append('user', user.id)

    try {
      const response = await axios({
        method: "POST",
        url: ONLINE_URL,
        data: OnlineSupportForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(response);
      submitNotification();
      setTrigger((prev) => prev + 1);
    } catch (err) {
      console.log(err.message);
      errorNotification();
    }
  };

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={OnlineSupportSubmit}>
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Online Support
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_address"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="title"
                      id="troubleshoot_address"
                      placeholder="..."
                      className="form-control"
                      onChange={handleChange}
                      value={data.title}
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
                          name="message"
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-success "
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="mb-2 mt-2">
        {(onlineSupport == false && data.project.name == 'Amendment') && (
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Amendment Data
          </button>
        )}
      </div>
      {onlineSupport.map((item) => (
        <>
          <form onSubmit={OnlineSupportUpdate}>
            <h4>Support Information</h4>
            <div className="card text-dark bg-light mb-3">
              <div className="card-header">Task details</div>
              <div className="card-body">
                <div className="row mt-1">
                  <label
                    for="onlineSupport_title"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="title"
                      id="onlineSupport_title"
                      placeholder="..."
                      className="form-control"
                      onChange={handleChange}
                      value={data.title}
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
                          onChange={handleChange}
                          value={item.message}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <small>by: {onlineSupport?.[0].user.name}</small>
            <div className="modal-footer">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </>
      ))}
    </>
  );
}
