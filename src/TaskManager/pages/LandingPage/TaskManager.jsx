import React, { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import Troubleshoot from "../../components/Troubleshoot";
import Amendment from "../Amendment/components/Amendment";
import ChangeLocation from "../ChangeLocation/ChangeLocationDetails";
import { Details, MainDetails } from "../../components/Details";
import NotificationManager from "react-notifications/lib/NotificationManager";
import  useWebSocket, { ReadyState }  from "react-use-websocket";
import { useContext } from "react";
import { Context } from "../../../context/Context";


export function getDetails(...data) {
  console.log(data);
}

export default function TaskManager(props) {

  const token = useContext(Context);
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


  const ME_URL = process.env.REACT_APP_USER
  const TASK_URL = process.env.REACT_APP_TASK;

  const [payment, setPayment] = React.useState([]);
  const [installtionCofirm, setInstallationConfirm] = React.useState([]);
      
      const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL
      const INSTALL_UR = process.env.REACT_APP_INSTALLATION_CONFIRM

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

  const url = process.env.REACT_APP_CONTRACT;
  const [contract, setContract] = useState(contractState);
  const [project, setProject] = useState(taskProjectState);

  let contratsLength = 0;
  const contractNoRef = useRef();
  const projectRef = useRef();

  function handleChange(event) {
    setProject({ selectedProject: event.target.value });
    console.log(event.target.value);
  }

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
    input: ""
  })
  const CONTRACT = process.env.REACT_APP_NEW_CONTRACT
  const handleSubmit = async (e) => {
    e.preventDefault();
    warningNotification();
    try {
      const res = await axios.get(
        CONTRACT + `?query=${contractNoRef.current.value}`, {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        }
      );
      console.log(res.data.results);
      console.log(contractNoRef.current.value)
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

        console.log(find)
        console.log(installtionCofirm)

  function TaskArray (props) {
    return (
   
      contenter.map((task) => (
              <>
            {task.assigned.map((assigned) => (
              <>
                {assigned.id == user.id ? (
                  <>
                    {task.project.name == `${props.project}` && (
                      <div className="col-6">
                      <MainDetails data={[task]} />
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
          </>
            ))
          )
    }

  React.useEffect(() => {
    axios
      .get(TASK_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setContenter(res.data.results);
      });
  }, []);



  const [stage, setStage] = useState([]);
  const [projecter, setProjecter] = useState([]);
  const [tag, setTag] = useState([]);
  const [member, setMember] = useState([]);

  const STAGE_URL = process.env.REACT_APP_STAGE;
  const PROJECT_URL = process.env.REACT_APP_PROJECT;
  const TAG_URL = process.env.REACT_APP_TAG;
  const MEMBER_URL = process.env.REACT_APP_MEMBERS;

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

  const changeHandle = (e) => {
    setFindInput({
      ...findInput,
      input: e.target.value
    })
  }


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
      submitNotification()
      // socket.emit("sendNotification", {
      //   senderName: user.name,
      //   receiverName: respone.data.assigned,
      // });
      sendJsonMessage({
        "message": respone.data.assigned.filter(function(item){
          return item !== user.id
        })  
      })
      
    } catch (error) {
      console.log(error);
      const errorNotification = (e)  => {
        NotificationManager.error(error.message, "Error!", 2000)
      }
      errorNotification()
    }
  };

  const [content, setContent] = useState([]);

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
        setContenter(res.data.results);
        searchSuccessNotification();
      });
  };

  const [message, setMessage] = React.useState('')
  const [NotificationHistory, setNotificationHistory] = React.useState([])

  const ServerURL = process.env.REACT_APP_SOCKET

  
    
      

  const { readyState, sendJsonMessage, send } = useWebSocket(ServerURL, {  
    onOpen: (e) => {
      console.log(e)
    },

    onClose: (e) => {
      console.log(e)
    },
    
    onMessage: (e) => {
      const data = JSON.parse(e.data)

      

      
      data.data.value.message.includes(user.id) && receiveNotification() 
      console.log(data.data.value.message)
      // switch(data.type) {
      //   case "websocket.send":
      //     setMessage(data.text)
      //     break;

      //   case "send_notification" :
      //     console.log(data.value)
      //     data.data.value.message.includes(user.id) ? receiveNotification() : submitNotification ()
      //   break;

      //   default:
      //     console.log("Unknown")
      //     break;
      // }
      console.log(e)
    }
  })

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
  }[readyState];


  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
          <div className="container">
            <div className="row mb-5">
              <div className="col-10 offset-md-1">
                {/* <form
                  className="search-container"
                  action="//llamaswill.tumblr.com/search"
                  onSubmit={SearchSubmit}
                >
                  <input
                    id="search-box"
                    type="text"
                    className="search-box"
                    name="search"
                    onChange={SearchHandle}
                  />
                  <label for="search-box">
                    <span className="search-icon">
                      <i class="fa-regular fa-magnifying-glass"></i>
                    </span>
                  </label>
                  <input type="submit" id="search-submit" />
                </form> */}
                <div className="flexer">
                  {content.map((item) => (
                    <h1>{item.results.title}</h1>
                  ))}
                  <p className="float-left tasktitle">Tasks&nbsp;</p>
                  <button
                    type="button"
                    name="addTask"
                    className="btn btn-secondary rounded-circle circle-width"
                    data-bs-toggle="modal"
                    data-bs-target="#addTaskModal"
                  >
                    <i className="fa-solid fa-plus "></i>
                  </button>
                </div>

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
                            <form onSubmit={handleSubmit}>
                              <div className="input-group mb-3 mt-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Find customer"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  ref={contractNoRef}
                                  onChange={changeHandle}
                                />
                                <button
                                  className="btn btn-outline-secondary"
                                  type="submit"
                                  id="button-addon2"
                                >
                                  Find
                                </button>
                              </div>
                            </form>

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
                                        value={find.contract_number}
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
            <div className="details">
              
              <Details title="Installation" className="spacer">
                <div className="col-12 row">
                    <TaskArray project="Installation"/>
                </div>
              </Details>
              <Details title="Troubleshoot" className="spacer">
                <div className="col-12 row">
                    <TaskArray project="Troubleshoot"/>
                </div>
              </Details>
              <Details title="Online Support" className="spacer">
                <div className="col-12 row">
                    <TaskArray project="Online Support"/>
                </div>
              </Details>
              <Details title="Change Location" className="spacer">
                <div className="col-12 row">
                    <TaskArray project="Change Location"/>
                </div>
              </Details>

              <Details title="Amendment" className="spacer">
                <div className="col-12 row">
                    <TaskArray project="Amendment"/>
                </div>
              </Details>
            </div>
          </div>
        </section>
    </div>
  </div>
  );
}
