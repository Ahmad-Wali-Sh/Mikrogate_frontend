import React from "react";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../../context/Context";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useForm } from "react-hook-form";
import { useGroup } from "../../../../components/useUser";

function CreateTasks() {
  const location = useLocation();
  const data = location.state?.data;
  const token = useContext(Context);
  const [trigger, setTrigger] = useState(0);
  const ONLINE_URL = process.env.REACT_APP_ONLINE;

  const contractUrl = process.env.REACT_APP_NEW_CONTRACT;

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
  const PACKAGES_URL = process.env.REACT_APP_PACKAGE;
  const STATUS_URL = process.env.REACT_APP_CONTRACT_STATUS;

  const [contracts, setContracts] = useState([]);
  const groups = useGroup();
  const [contractNumber, setContractNumber] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   axios
  //     .get(contractUrl, {
  //       headers: {
  //         Authorization: "Token " + token.user.token,
  //       },
  //     })
  //     .then((res) => setContracts(res.data.results));
  // }, []);

  const [users, setUsers] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [status, setStatus] = React.useState([]);

  React.useEffect(() => {
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
      .get(PACKAGES_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setPackages(res.data.results);
      });
    axios
      .get(STATUS_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setStatus(res.data.results);
      });
  }, []);

  const ContractSearchHandle = (data) => {
    axios
      .get(
        CONTRACT +
          `?user=${data.user}&contract_number=${
            data.contract_number
          }&contract_id=${data.contract_id}&date_after=${
            data.date_after
          }&date_before=${data.date_before}&activation=${""}&valid=&status=${
            data.contract__status
          }&contract_type=${""}&contractpackage__package=${
            data.contract__package
          }&contractrouter__router=${""}&ordering=${data.sort_order}${
            data.order_by
          }&contractantenna__antenna=${""}`,
        {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        }
      )
      .then((res) => {
        setContracts(res.data.results);
      });
  };

  let i = 0;

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
  }, []);

  const [project, setProject] = useState(taskProjectState);

  const projectRef = useRef();

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

  const [projecter, setProjecter] = useState([]);
  const [tag, setTag] = useState([]);
  const [member, setMember] = useState([]);

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

  React.useEffect(() => {
    axios
      .get(PROJECT_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setProjecter(res.data.results);
      });
  }, []);

  React.useEffect(() => {
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

  const navigate = useNavigate();

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
      }).then((res) => {
        axios
          .get(TASK_URL + res.data.id + "/", {
            headers: {
              Authorization: "Token " + token.user.token,
            },
          })
          .then((res) => {
            if (res.data.project.name == "Installation") {
              navigate("/task-manager/details", { state: { data: res.data } });
            }
            if (res.data.project.name == "Troubleshoot") {
              navigate("/task-manager/troubleshoot", {
                state: { data: res.data },
              });
            }
            if (res.data.project.name == "Online Support") {
              navigate("/task-manager/online_support", {
                state: { data: res.data },
              });
            }
            if (res.data.project.name == "Change Location") {
              navigate("/task-manager/change_location", {
                state: { data: res.data },
              });
            }
            if (res.data.project.name == "Amendment") {
              navigate("/task-manager/amendment", {
                state: { data: res.data },
              });
            }
            if (res.data.project.name == "NOC Staff") {
              navigate("/task-manager/noc_assigned_details", {
                state: { data: res.data },
              });
            }
          });
      });
      submitNotification();
    } catch (error) {
      console.log(error);
      const errorNotification = (e) => {
        NotificationManager.error(error.message, "Error!", 2000);
      };
      errorNotification();
    }
  };

  console.log(form.assigned);

  const [search, setSearch] = React.useState({
    search: "",
  });

  function SearchHandle(e) {
    setSearch({ [e.target.name]: e.target.value });
  }

  const SearchSubmit = async (e) => {
    e.preventDefault();
    warningNotification();
    const SearchForm = new FormData();
    SearchForm.append("search", search.search);

    axios
      .get(TASK_URL + `?contracts=${search.search}`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        searchSuccessNotification();
      });
  };

  function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  const FilterMember = (e) => {
    axios
      .get(MEMBER_URL + "?name=" + e.target.value, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setMember(res.data.results);
      });
  };

  const [onlineSupport, setOnlineSupport] = React.useState([]);
  const [onlineSupportId, setOnlineSupportId] = React.useState();
  const [count, setCount] = React.useState([]);
  const [OnlineSupportData, setOnlineSupportData] = React.useState({
    contact: "",
    by: "",
    description: "",
    task: data.id,
  });

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
    }
  };

  const [detailsState, setDetailsState] = useState(true)
  return (
    <>
      <div
        className="modal fade"
        id="addTaskModal"
        tabIndex="1"
        role="dialog"
        aria-lablledby="addTaskModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content tab-content">
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
                className="nav nav-tabs nav-pills nav-justified"
                id="mytab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-toggle='tab'
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    onClick={() => {
                      setDetailsState(true)
                    }}
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                  >
                    Details
                  </button>
                </li>
                {groups.l1 != true && (
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      type="button"
                      role="tab"
                      onClick={() => {
                        setDetailsState(false)
                      }}
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    >
                      Members
                    </button>
                  </li>
                )}
              </ul>
              <div className="tab-content">
                <div
                  class={`tab-pane fade ${detailsState ? 'active show' : ''}`}
                  id="home-tab"
                  role="tabpanel"
                  data-toggle='tab'
                  tabIndex="1"
                  aria-labelledby="home-tab-pane"
                >
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
                          <span className="input-group-text" id="basic-addon1">
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
                            {projecter.map((item) =>
                              groups.l1 ? (
                                (item.name == "NOC Staff") |
                                  (item.name == "Online Support") && (
                                  <option value={item.id}>{item.name}</option>
                                )
                              ) : (
                                <option value={item.id}>{item.name}</option>
                              )
                            )}
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
                            <label className="input-group-text" htmlFor="tag">
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
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-1" id="pills-tab" role="tablist">
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
                          <div className="tab-content" id="nav-tabContent">
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
                    {groups.l1 && (
                      <div className="modal-footer">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          Create Task
                        </button>
                      </div>
                    )}
                  </form>
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
                      <span class="input-group-text" id="addon-wrapping">
                        <i className="fa-solid fa-bars-filter"></i>
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Filter members"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        onChange={FilterMember}
                      />
                    </div>
                  </div>
                  <div className="">
                    <h5>Selected:</h5>
                    <div>
                      {member.map((member) =>
                        form.assigned.map(
                          (assignedIndex) =>
                            member.id == assignedIndex && (
                              <span>{member.name}, </span>
                            )
                        )
                      )}
                    </div>
                  </div>
                  <form onSubmit={createTask}>
                    <div className="members-columns">
                      <div className="col-5 membersbox ">
                        <h4 className="members-text">NOC Stuff</h4>
                        <ul>
                          {member.map((item) =>
                            item.groups.includes("NOC Stuff") ? (
                              <div key={item.id}>
                                <li className="d-flex justify-content-between padd">
                                  <div className="list-item">
                                    <img
                                      src={item.avatar}
                                      alt="avatar"
                                      className="Member-avatar"
                                    />
                                    <span className="ml-4">{item.name}</span>
                                  </div>
                                  <input
                                    type="checkbox"
                                    disabled={groups.l1 ? true : false}
                                    className="mt-3 mr-3"
                                    name="assigned"
                                    value={item.id}
                                    onChange={handlerChange}
                                  />
                                </li>
                              </div>
                            ) : (
                              <div></div>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="col-5 membersbox ">
                        <h4 className="members-text">Technicians</h4>
                        <ul>
                          {member.map((item) =>
                            item.groups.includes("Technicians") ? (
                              <div key={item.id}>
                                <li className="d-flex justify-content-between padd">
                                  <div className="list-item">
                                    <img
                                      src={item.avatar}
                                      alt="avatar"
                                      className="Member-avatar"
                                    />
                                    <span className="ml-4">{item.name}</span>
                                  </div>
                                  <input
                                    type="checkbox"
                                    className="mt-3 mr-3"
                                    name="assigned"
                                    disabled={groups.l1 ? true : false}
                                    value={item.id}
                                    onChange={handlerChange}
                                  />
                                </li>
                              </div>
                            ) : (
                              <div></div>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Create Task
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        name="addTask"
        className="btn btn-secondary btn-sm mr-1"
        data-bs-toggle="modal"
        data-bs-target="#addTaskModal"
        onClick={() => (
          setContractNumber(data.contract.contract_number),
          setFind(data.contract)
        )}
      >
        Create Tasks For This Contract
      </button>
    </>
  );
}

export default CreateTasks;
