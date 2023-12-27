import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { useGroup } from "../../components/useUser";
import { useForm } from "react-hook-form";
import { usePreviousTasks } from "../../components/State";

export default function Header() {
  const location = useLocation();
  const data = location.state?.data;
  const token = useContext(Context);
  const member = data.assigned;
  const MEMBERS_URL = process.env.REACT_APP_MEMBERS;
  const TASK_URL = process.env.REACT_APP_TASK;
  const ME_URL = process.env.REACT_APP_USER;
  const SOCKET_URL = process.env.REACT_APP_SOCKET;
  const STAGE_URL = process.env.REACT_APP_STAGE;
  const navigate = useNavigate();

  const [trigger, setTrigger] = useState("");

  const { register, handleSubmit, reset, watch } = useForm();

  const [user, setUser] = React.useState({});
  const [stages, setStages] = useState([]);
  React.useEffect(() => {
    axios
      .get(ME_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setUser(res.data));
    console.log(user);

    axios
      .get(STAGE_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setStages(res.data.results);
      });
  }, []);

  const receiveNotification = (e) => {
    NotificationManager.info("New Data Recieved", "New Task Updated!", 5000);
  };

  const ServerURL = SOCKET_URL;

  const { sendJsonMessage } = useWebSocket(ServerURL, {
    onOpen: (e) => {
      console.log(e);
    },

    onClose: (e) => {
      console.log(e);
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data);
      data.data.value.message.includes(user.id) && receiveNotification();
    },
  });

  const [filter, setFilter] = React.useState("");
  console.log(filter);
  const [Members, setMembers] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(MEMBERS_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setMembers(res.data.results.sort());
      })
      .catch((e) => console.log(e));
  }, [filter]);

  const [details, setDetails] = React.useState([]);
  const [tasker, setTasker] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(TASK_URL + `${data.id}/`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setDetails(res.data.assigned);
        setTasker(res.data);
        console.error(res.data);
      });
  }, [trigger]);

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };

  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const [memberList, setMemberList] = React.useState({
    assigned: [],
  });

  React.useEffect(() => {
    member.map((item) => memberList.assigned.push(String(item.id)));
  }, []);

  const handleChange = (event) => {
    if (event.target.checked) {
      setMemberList((prevState) => ({
        assigned: [...prevState.assigned, event.target.value],
      }));
    }
    if (!event.target.checked) {
      setMemberList((prevState) => ({
        ...memberList,
        assigned: prevState.assigned.filter(
          (assign) => assign !== event.target.value
        ),
      }));
    }
  };

  const values = [...document.querySelectorAll(".inputing:checked")].map(
    (el) => el.value
  );

  console.log(values);

  const assign = details.map((item) => item.id);

  const MembersSubmit = async (e) => {
    e.preventDefault();
    warningNotification();
    const MemberForm = new FormData();
    if (values[0]) {
      values.map((item) => MemberForm.append("assigned", item));
    } else {
      MemberForm.append("assigned", data.user.id);
    }

    try {
      const response = await axios({
        method: "PATCH",
        url: TASK_URL + `${data.id}/`,
        data: MemberForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(response);
      sendJsonMessage({
        message: response.data.assigned.filter(function (item) {
          return item !== user.id;
        }),
      });
      submitNotification();
      axios
        .get(TASK_URL + `${data.id}/`, {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        })
        .then((res) => {
          setDetails(res.data.assigned);
          setMemberList({ assigned: res.data.assigned });
        });
    } catch (err) {
      console.log(err);
      const errorNotification = (e) => {
        NotificationManager.error(err.message, "Error", 2000);
      };
      errorNotification();
    }
  };

  const { previousTasks, setPreviousTasks } = usePreviousTasks();

  const DeleteTask = () => {
    axios
      .delete(TASK_URL + data.id + "/", {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then(() => {
        submitNotification();
        navigate("/task-manager/noc-tasks");
        // window.location.reload()
        setPreviousTasks();
      });
  };

  const groups = useGroup();
  return (
    <>
      <h1>{data.title}</h1>
      <div className="members mt-3">
        <ul>
          {details.map((member) => (
            <li>
              <img
                src={member.avatar}
                alt=""
                className="avatar avatar--header"
                data-toggle="tooltip"
                data-placement="top"
                title={member.name}
              />
            </li>
          ))}
          {(groups.noc_manager || groups.noc_stuff) && (
            <>
              <button
                type="button"
                name="addTask"
                className="btn btn-secondary rounded-circle circle-width mx-3"
                data-bs-toggle="modal"
                data-bs-target="#membersModal"
              >
                <i className="fa-solid fa-plus "></i>
              </button>
              <button
                type="button"
                name="addTask"
                className="btn btn-secondary rounded-circle circle-width mx-3"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </>
          )}
        </ul>

        <div
          class="modal fade"
          id="membersModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-ml">
            <div class="modal-content">
              <div class="modal-header">Add or remove task members</div>
              <div className="modal-body">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabIndex="2"
                  >
                    <div>
                      <div className="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          <i className="fa-solid fa-bars-filter"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Filter members"
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                          onChange={(e) => {
                            setFilter(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <form onSubmit={MembersSubmit}>
                      <div className="membersbox">
                        <ul className="row">
                          {Members.map(
                            (item, num) =>
                              (item.groups.includes("L1") ||
                                item.groups.includes("Technicians") ||
                                item.groups.includes("NOC Stuff")) && (
                                <li className="d-flex justify-content-between padd">
                                  <div className="list-item">
                                    <img
                                      src={item.avatar}
                                      alt="avatar"
                                      className="avatar pad"
                                    />
                                    <span className="ml-4">{item.name}</span>
                                  </div>
                                  <input
                                    type="checkbox"
                                    className="mt-3 mr-3 inputing"
                                    name="assigned"
                                    {...register(`assigned.${num}`)}
                                    value={item.id}
                                    defaultChecked={
                                      assign.includes(item.id) ? true : false
                                    }
                                    onChange={handleChange}
                                  />
                                </li>
                              )
                          )}
                        </ul>
                        <div className="modal-footer">
                          <button type="submit" className="btn btn-success">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-ml">
            <div class="modal-content">
              <div class="modal-header">
                Are You Sure Want To Delete This Task?
              </div>
              <div className="col-12 p-2 direction-rtl">
                <button
                  className="btn btn-primary col-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    DeleteTask();
                  }}
                >
                  Yes
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="progress mt-5">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          aria-label="Success example"
          style={{
            width:
              tasker?.stage?.name == "Archieved" ||
              tasker?.stage?.name == "Completed"
                ? "100%"
                : tasker?.stage?.name == "Pending" ||
                  tasker?.stage?.name == "In-Progress"
                ? "50%"
                : tasker?.stage?.name == "New" ||
                  tasker?.stage?.name == "Canceled"
                ? "0%"
                : "20%",
          }}
          aria-defaultValuenow="25"
          aria-defaultValuemin="0"
          aria-defaultValuemax="100"
        ></div>
      </div>
      <ul style={{ display: "flex", margin: "2rem" }} id="mytab" role="tablist">
        {stages?.map((stage) =>
          groups.l1 || groups.technician ? (
            (stage.name == "Pending" ||
              stage.name == "Completed" ||
              stage.name == "In-Progress" ||
              stage.name == "Canceled" ||
              stage.name == "New") && (
              <div
                className={`btn ${
                  stage.name == tasker?.stage?.name
                    ? "btn-success"
                    : "btn-secondary"
                }  m-1`}
                onClick={() => {
                  const Form = new FormData();
                  Form.append("stage", stage.id);
                  axios
                    .patch(TASK_URL + `${data.id}/`, Form, {
                      headers: {
                        Authorization: "Token " + token.user.token,
                      },
                    })
                    .then((e) => {
                      setTrigger(new Date());
                    });
                }}
              >
                {stage.name}
              </div>
            )
          ) : (
            <div
              className={`btn ${
                stage.name == tasker?.stage?.name
                  ? "btn-success"
                  : "btn-secondary"
              }  m-1`}
              onClick={() => {
                const Form = new FormData();
                Form.append("stage", stage.id);
                axios
                  .patch(TASK_URL + `${data.id}/`, Form, {
                    headers: {
                      Authorization: "Token " + token.user.token,
                    },
                  })
                  .then((e) => {
                    setTrigger(new Date());
                  });
              }}
            >
              {stage.name}
            </div>
          )
        )}
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="task-tab-pane"
          role="tabpanel"
          aria-labelledby="task-tab"
          tabIndex="-1"
        >
          <div className="mb-5">
            <div className="row">
              <div className="col-1 col-sm-2">
                <label htmlFor="project" className="col-form-label text-muted">
                  Project
                </label>
              </div>
              <div className="col-3 col-sm-4">
                <select
                  className="form-select"
                  id="project"
                  disabled
                  aria-label="Default select example"
                  name="project"
                >
                  <option value={data.project.id}>{data.project.name}</option>
                </select>
              </div>

              <div className="col-1 col-sm-2">
                <label htmlFor="project" className="col-form-label text-muted">
                  Contract Number
                </label>
              </div>
              <div className="col-5 col-sm-4">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="contract name"
                    aria-label="Username"
                    disabled
                    aria-describedby="basic-addon1"
                    defaultValue={data.contract.contract_number}
                  />
                </div>
              </div>
              <div className="col-1 col-sm-2">
                <label htmlFor="project" className="col-form-label text-muted">
                  Customer Name
                </label>
              </div>
              <div className="col-5 col-sm-4">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nothing to Show"
                    aria-label="Username"
                    disabled
                    aria-describedby="basic-addon1"
                    value={data.contract.name}
                  />
                </div>
              </div>
              <div className="col-1 col-sm-2">
                <label htmlFor="project" className="col-form-label text-muted">
                  Customer ID
                </label>
              </div>
              <div className="col-5 col-sm-4">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nothing To show"
                    aria-label="Username"
                    disabled
                    aria-describedby="basic-addon1"
                    value={data.contract.contract_id}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-1 col-sm-2">
                <label htmlFor="deadline" className="col-form-label text-muted">
                  Deadline
                </label>
              </div>
              <div className="col-3 col-sm-4">
                <div className="input-group mb-3">
                  <input
                    type="date"
                    name="deadline"
                    disabled
                    className="form-control"
                    defaultValue={data.deadline.slice(0, 10)}
                  />
                </div>
              </div>
              <div className="col-1 col-sm-2">
                <label htmlFor="tag" className="col-form-label text-muted">
                  Tag
                </label>
              </div>
              <div className="col-5 col-sm-4">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="tag">
                    <i className="fa-solid fa-tag"></i>
                  </label>
                  <select
                    className="form-select"
                    id="tag"
                    disabled
                    aria-label="Default select example"
                  >
                    <option defaultValue={data.tag.id}>{data.tag.name}</option>
                    <option>Normal</option>
                    <option defaultValue="1">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
