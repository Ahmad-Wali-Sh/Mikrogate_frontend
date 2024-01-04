import axios from "axios";
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import Troubleshoot from "../../../TaskManager/components/Troubleshoot";
import ChangeLocation from "../../../TaskManager/pages/ChangeLocation/components/ChangeLocation";
import Amendment from "../../../TaskManager/pages/Amendment/components/Amendment";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import cx from "classnames";
import { useForm } from "react-hook-form";

export default function TechniciansDashboard() {
  const contractUrl = process.env.REACT_APP_NEW_CONTRACT;
  const token = useContext(Context);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      archieved: false
    }
  });

  const [contracts, setContracts] = useState([]);
  const [contractNumber, setContractNumber] = useState([]);
  const [projecter, setProjecter] = useState([]);
  const [tag, setTag] = useState([]);

  const CONTRACT = process.env.REACT_APP_NEW_CONTRACT;
  const STAGE_URL = process.env.REACT_APP_STAGE;
  const PROJECT_URL = process.env.REACT_APP_PROJECT;
  const TAG_URL = process.env.REACT_APP_TAG;
  const MEMBER_URL = process.env.REACT_APP_MEMBERS;
  const USERS_URL = process.env.REACT_APP_USERS;
  const ME_URL = process.env.REACT_APP_USER;
  const TASK_URL = process.env.REACT_APP_TASK;
  const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;
  const INSTALL_UR = process.env.REACT_APP_INSTALLATION_CONFIRM;

  const [users, setUsers] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    // axios
    //   .get(TASK_URL, {
    //     header: {
    //       Authorization: "Token " + token.user.token,
    //     },
    //   })
    //   .then((res) => {
    //     setTasks(res.data.results);
    //   });

    axios
      .get(USERS_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setUsers(res.data.results);
      });

    axios
      .get(PROJECT_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setProjecter(res.data.results);
      });

    axios
      .get(TAG_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setTag(res.data.results);
      });
  }, []);

  useEffect(() => {
    reset({
      archieved: false
    })
  }, [])

  const TaskSearchHandle = (data) => {
    axios
      .get(
        TASK_URL +
          `?contract__contract_number=${data.contract}&created_after=${data.created_after}&created_before=${data.created_before}&deadline_after=${data.deadline}&deadline_before=${data.deadline}&ordering=${data.sort_order}${data.order_by}&project=${data.project}&stage=${data.stage}&tag=${data.tag}&assigned__id=${user.id}&contract__contract_id=${data.contract__contract_id}&archieved=${data.archieved}`,
        {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setTasks(res.data.results);
      });
  };



  useEffect(() => {
    axios
      .get(contractUrl, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setContracts(res.data.results));
  }, []);

  let i = 0;
  console.log(contracts);

  // const token = true

  let contractState = {
    contract: "",
    full_name: "",
    contract: "",
    organization: "",
    address: "",
    package: "",
  };

  let taskProjectState = {
    selectedProject: "",
  };

  const [payment, setPayment] = React.useState([]);
  const [installtionCofirm, setInstallationConfirm] = React.useState([]);

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

  const [project, setProject] = useState(taskProjectState);

  const contractNoRef = useRef();
  const projectRef = useRef();

  function handleSwitch(e) {
    let isChecked = e.target.checked;
    console.log(isChecked);
  }

  React.useEffect(() => {
    axios
      .get(PAYMENT_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setPayment(res.data.results));
  }, []);

  React.useEffect(() => {
    axios
      .get(INSTALL_UR, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setInstallationConfirm(res.data.results));
  }, []);

  const submitNotification = (type) => {
    NotificationManager.success("New Task Created!", "", 2000);
  };
  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };
  const searchSuccessNotification = (e) => {
    NotificationManager.success("New Data Recieved", "Done!", 2000);
  };
  const receiveNotification = (e) => {
    NotificationManager.info("New Data Recieved", "New Task Updated!", 5000);
  };

  const [find, setFind] = React.useState("");
  const [findInput, setFindInput] = React.useState({
    input: "",
  });
  const handleSubmit123 = async (e) => {
    e.preventDefault();
    warningNotification();
    try {
      const res = await axios.get(
        CONTRACT + `?query=${contractNoRef.current.value}`,
        {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        }
      );
      console.log(res.data.results);
      console.log(contractNoRef.current.value);
      setFind(res.data.results[0]);

      searchSuccessNotification();
    } catch (err) {
      console.log(err);
      const errorNotification = (e) => {
        NotificationManager.error(err.message, "Error!", 2000);
      };
      errorNotification();
    }
  };
  const [contenter, setContenter] = React.useState([]);

  console.log(find);
  console.log(installtionCofirm);



  const [stage, setStage] = useState([]);

  const [member, setMember] = useState([]);

  React.useEffect(() => {
    axios
      .get(STAGE_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setStage(res.data.results);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(MEMBER_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setMember(res.data.results);
      });
  }, []);

  let [form, setForm] = React.useState({
    title: "",
    assigned: [],
    deadline: "",
    project: 1,
    description: "",
    stage: 1,
    contract: 1,
    tag: 1,
  });

  const changeHandle = (e) => {
    setFindInput({
      ...findInput,
      input: e.target.value,
    });
  };

  let handlerChange = (event) => {
    if (event.target.name !== "assigned") {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    } else {
      if (event.target.checked) {
        setForm((prevState) => ({
          ...form,
          assigned: [...prevState.assigned, event.target.value],
        }));
      }
      if (!event.target.checked) {
        setForm((prevState) => ({
          ...form,
          assigned: prevState.assigned.filter(
            (assign) => assign !== event.target.value
          ),
        }));
      }
    }
  };

  document.addEventListener("touchstart", function () {}, true);

  // useEffect(() => {
  //   socket.on("getNotification", (data) => {
  //     console.log(data);
  //     {
  //       data.receiverName.includes(user.id) && receiveNotification();
  //     }
  //   });
  // }, [user]);

  const createTask = async (event) => {
    event.preventDefault();
    warningNotification();

    const loginForm = new FormData();
    loginForm.append("title", form.title);
    loginForm.append("contract", find.id);
    form.assigned.map((item) => loginForm.append("assigned", JSON.parse(item)));
    loginForm.append("deadline", new Date(form.deadline).toISOString());
    loginForm.append("project", form.project);
    loginForm.append("stage", 1);
    loginForm.append("tag", form.tag);
    loginForm.append("description", form.description);

    try {
      const respone = await axios({
        method: "post",
        url: TASK_URL,
        data: loginForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(respone);
      submitNotification();
      // socket.emit("sendNotification", {
      //   senderName: user.name,
      //   receiverName: respone.data.assigned,
      // });
    } catch (error) {
      console.log(error);
      const errorNotification = (e) => {
        NotificationManager.error(error.message, "Error!", 2000);
      };
      errorNotification();
    }
  };


  useEffect(()=> {
      axios
    .get(
      TASK_URL + `?assigned__id=${user.id}&ordering=-created&archieved=${false}`,
      {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      }
    )
    .then((res) => {
      console.log(res);
      setTasks(res.data.results);
    });

  }, [user.id])

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-12">
              <section className="content">
                <div className="container-fluid">
                  <h2 className="text-center display-4 mb-5 pt-5">
                    Search Tasks
                  </h2>
                  <form
                    id="searchForm"
                    onSubmit={handleSubmit(TaskSearchHandle)}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <br />
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <div className="form-group">
                              <label htmlFor="dateRange">From:</label>
                              <div className="input-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="reservation"
                                  name="date1"
                                  {...register("created_after")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label htmlFor="dateRange">To:</label>

                              <div className="input-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="reservation"
                                  name="date2"
                                  {...register("created_before")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Stage:</label>
                              <select
                                className="form-control "
                                aria-label="Default select example"
                                name="status"
                                id="status"
                                {...register("stage")}
                              >
                                <option value="">Any</option>
                                {stage.map((stage) => (
                                  <option value={stage.id}>{stage.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>ID</label>
                              <input
                                type="text"
                                className="form-control"
                                {...register("contract__contract_id")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <div className="form-group">
                              <label>Project:</label>
                              <select
                                className="form-control "
                                name="antenna"
                                style={{ width: "100%" }}
                                {...register("project")}
                              >
                                <option value="">Any</option>
                                {projecter.map((project) => (
                                  <option value={project.id}>
                                    {project.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Tag:</label>
                              <select
                                className="form-control"
                                name="router"
                                style={{ width: "100%" }}
                                {...register("tag")}
                              >
                                <option value="">Any</option>
                                {tag.map((tag) => (
                                  <option value={tag.id}>{tag.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Deadline:</label>
                              <input
                                type="date"
                                className="form-control"
                                name="date2"
                                {...register("deadline")}
                              />
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Archieved Tasks:</label>
                              <select
                                className="form-control"
                                style={{ width: "100%" }}
                                {...register("archieved")}
                              >
                                <option value=""></option>
                                <option value={true}>Show</option>
                                <option value={false} selected>Hide</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-lg">
                            <input
                              type="search"
                              className="form-control form-control-lg"
                              placeholder="Contract Number"
                              name="query"
                              {...register("contract")}
                            />
                            <div className="input-group-append">
                              <button
                                type="submit"
                                className="btn btn-lg btn-default"
                              >
                                <i className="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </section>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Tasks</h3>
                  <div
                    className="modal fade"
                    id="addTaskModal"
                    tabIndex="-1"
                    role="dialog"
                    // aria-lablledby="addTaskModalTitle"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-xl" role="document">
                      <div className="modal-content">
                        <div className="modal-header bg-primary">
                          <h5
                            className="modal-title cl-light text-light"
                            id="addTaskModalTitle"
                          >
                            New Task
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i className="fa-duotone fa-circle-xmark close-icon"></i>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul
                            className="nav nav-pills nav-justified"
                            id="mytab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="home-tab-pane"
                                aria-selected="true"
                              >
                                Details
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="profile-tab-pane"
                                aria-selected="false"
                              >
                                Members
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div
                              className="tab-pane fade show active"
                              id="home-tab-pane"
                              role="tabpanel"
                              aria-labelledby="home-tab"
                              tabIndex="2"
                            >
                              <div className="input-group mb-3 mt-3"></div>

                              <form onSubmit={createTask}>
                                <div className="row">
                                  <div className="col-1 col-sm-1">
                                    <label
                                      htmlFor="project"
                                      className="col-form-label text-muted"
                                    >
                                      Title
                                    </label>
                                  </div>
                                  <div className="col-11 col-sm-11">
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa-solid fa-pen"></i>
                                      </span>
                                      <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={handlerChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-5">
                                  <div className="row">
                                    <div className="col-1 col-sm-1">
                                      <label
                                        htmlFor="project"
                                        className="col-form-label text-muted"
                                      >
                                        Project
                                      </label>
                                    </div>

                                    <div className="col-3 col-sm-4">
                                      <select
                                        className="form-select"
                                        id="project"
                                        aria-label="Default select example"
                                        ref={projectRef}
                                        name="project"
                                        onChange={handlerChange}
                                      >
                                        <option selected>Select</option>
                                        {projecter.map((item) => (
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    <div className="col-1"></div>
                                    <div className="col-1 col-sm-1">
                                      <label
                                        htmlFor="project"
                                        className="col-form-label text-muted"
                                      >
                                        Customer
                                      </label>
                                    </div>
                                    <div className="col-5 col-sm-5">
                                      <div className="input-group mb-3">
                                        <span
                                          className="input-group-text"
                                          id="basic-addon1"
                                        >
                                          <i className="fa-solid fa-user"></i>
                                        </span>

                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="contract"
                                          aria-label="Username"
                                          name="contract"
                                          aria-describedby="basic-addon1"
                                          value={contractNumber}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-1 col-sm-1">
                                      <label
                                        htmlFor="deadline"
                                        className="col-form-label text-muted"
                                      >
                                        Deadline
                                      </label>
                                    </div>
                                    <div className="col-3 col-sm-4">
                                      <div className="input-group mb-3">
                                        <input
                                          type="date"
                                          className="form-control"
                                          name="deadline"
                                          onChange={handlerChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-1"></div>
                                    <div className="col-1">
                                      <label
                                        htmlFor="tag"
                                        className="col-form-label text-muted"
                                      >
                                        Tag
                                      </label>
                                    </div>
                                    <div className="col-5 col-sm-5">
                                      <div className="input-group">
                                        <label
                                          className="input-group-text"
                                          htmlFor="tag"
                                        >
                                          <i className="fa-solid fa-tag"></i>
                                        </label>
                                        <select
                                          className="form-select"
                                          id="tag"
                                          aria-label="Default select example"
                                          name="tag"
                                          onChange={handlerChange}
                                        >
                                          <option selected>Select</option>
                                          {tag.map((item) => (
                                            <option value={item.id}>
                                              {item.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="row mt-1"
                                    id="pills-tab"
                                    role="tablist"
                                  >
                                    <div className="col-12">
                                      <nav>
                                        <div
                                          className="nav nav-tabs"
                                          id="nav-tab"
                                          role="tablist"
                                        >
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
                                      <div
                                        className="tab-content"
                                        id="nav-tabContent"
                                      >
                                        <div
                                          className="tab-pane fade show active"
                                          id="nav-home"
                                          role="tabpanel"
                                          aria-labelledby="nav-home-tab"
                                        >
                                          <textarea
                                            className="form-control border-top-0"
                                            placeholder="Leave a description here"
                                            id="floatingTextarea"
                                            name="description"
                                            rows="6"
                                            onChange={handlerChange}
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    className="btn btn-primary"
                                    type="submit"
                                  >
                                    Create Task
                                  </button>
                                </div>
                              </form>

                              {project.selectedProject == "troubleshoot" && (
                                <Troubleshoot />
                              )}
                              {project.selectedProject == "changeLocation" && (
                                <ChangeLocation />
                              )}

                              {project.selectedProject == "amendment" && (
                                <Amendment />
                              )}
                            </div>
                            <div
                              class="tab-pane fade"
                              id="profile-tab-pane"
                              role="tabpanel"
                              aria-labelledby="profile-tab"
                              tabindex="0"
                            >
                              <div className="d-flex justify-content-center m-4"></div>
                              <div className="col-6 m-auto">
                                <div className="input-group flex-nowrap">
                                  <span
                                    class="input-group-text"
                                    id="addon-wrapping"
                                  >
                                    <i className="fa-solid fa-bars-filter"></i>
                                  </span>
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Filter members"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                  />
                                </div>
                              </div>
                              <form onSubmit={createTask}>
                                <div className="col-5 membersbox">
                                  <ul>
                                    {member.map((item) => (
                                      <li className="d-flex justify-content-between padd">
                                        <div className="list-item">
                                          <img
                                            src={item.avatar}
                                            alt="avatar"
                                            className="Member-avatar"
                                          />
                                          <span className="ml-4">
                                            {item.name}
                                          </span>
                                        </div>
                                        <input
                                          type="checkbox"
                                          className="mt-3 mr-3"
                                          name="assigned"
                                          value={item.id}
                                          onChange={handlerChange}
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <table className="table projects">
          <thead>
            <tr>
              <th style={{ width: "1%" }}>#</th>
              <th style={{ width: "14%" }}>Contract_Number</th>
              <th style={{ width: "13%" }}>Title</th>
              <th style={{ width: "13%" }}>Project</th>
              <th style={{ width: "14%" }}>Assigned</th>
              <th style={{ width: "14%" }}>Stage</th>
              <th style={{ width: "14%" }}>User</th>
              <th style={{ width: "14%" }}>Info</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <>
                <tr key={task.id} className={task.archieved ? 'archived-bg' : ''}>
                  <td>{++i}.</td>
                  <td>
                    <br />
                    <a>{task.contract.contract_number}</a>
                    <br />
                    <small style={{display: 'block'}}>
                      {new Date(task.created)
                        .toString().slice(0,16)}
                    </small>
                    <small>
                      {new Date(task.created)
                        .toLocaleTimeString()
                        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                    </small>
                  </td>
                  <td>
                    <small>{task.title}</small>
                    <br></br>
                    <small>name: {task.contract.name}</small>
                    <br></br>
                    <small>id: {task.contract.contract_id}</small>
                  </td>
                  <td>{task.project.name}</td>
                  <td>
                    <select className="form-control">
                      <option hidden>Click To See</option>
                      {task.assigned.map((assigne) => (
                        <option disabled>{assigne.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className={cx({
                        "badge badge-pill badge-success":
                          task.stage.name === "Completed",
                        "badge badge-pill badge-info":
                          task.stage.name === "New",
                        "badge badge-pill badge-primary":
                          task.stage.name === "In-Progress",
                        "badge badge-pill badge-danger":
                          task.stage.name === "Canceled",
                        "badge badge-pill badge-warning":
                          task.stage.name === "Pending",
                        "badge badge-pill badge-secondary":
                          task.stage.name === "Archieved",
                      })}
                      onClick={
                        handleSubmit(TaskSearchHandle)
                      }
                      onChange={(e) => {
                        const StageForm = new FormData();
                        StageForm.append("stage", e.target.value);
                        axios
                          .patch(TASK_URL + task.id + "/", StageForm, {
                            headers: {
                              Authorization: "Token " + token.user.token,
                            },
                          })
                          .then((res) => {
                            handleSubmit(TaskSearchHandle);
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      <option
                        style={{ color: "green" }}
                        selected={task.stage.id}
                      >
                        {task.stage.name}
                      </option>
                      {task.stage.name != "Archieved" &&
                        stage.map(
                          (stage) =>
                            stage.name != "Archieved" &&
                            stage.name != "New" &&
                            stage.name != "Canceled" &&
                            stage.name != task.stage.name && (
                              <option
                                value={stage.id}
                                onClick={
                                  handleSubmit(TaskSearchHandle)
                                }
                              >
                                {stage.name}
                              </option>
                            )
                        )}
                      {task.stage.name}
                    </select>
                  </td>
                  <td>{task.user.name}</td>
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
                          : task.project.name == "Amendment"
                          ? "/task-manager/amendment"
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
