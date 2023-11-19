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
import { useGroup } from "../../../components/useUser";

export default function NocAssigned() {
  const contractUrl = process.env.REACT_APP_NEW_CONTRACT;
  const token = useContext(Context);
  const groups = useGroup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
  const PACKAGES_URL = process.env.REACT_APP_PACKAGE;
  const STATUS_URL = process.env.REACT_APP_CONTRACT_STATUS;

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

  const [archivedShow, setArchivedShow] = React.useState(false);
  const [contractName, setContractName] = React.useState("");
  const [contractId, setContractId] = React.useState("");
  const [contractNumbere, setContractNumbere] = React.useState("");
  const [trigger, setTrigger] = React.useState(0);

  const TaskSearchHandle = (data) => {
    axios
      .get(
        TASK_URL +
          `?contract__contract_number=${data.contract}&created_after=${
            data.created_after
          }&created_before=${data.created_before}&deadline_after=${
            data.deadline
          }&deadline_before=${data.deadline}&ordering=${data.sort_order}${
            data.order_by
          }&project=${groups.l1 ? 3 : data.project}&stage=${data.stage}&tag=${
            data.tag
          }&user=${data.user}&assigned__id=${
            data.assigned
          }&contract__contract_id=${data.contract__contract_id}&stage_net=${
            data.stage != 6 ? 6 : ""
          }`,
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
      .get(
        TASK_URL +
          `?user=&contract__contract_number=${contractNumbere}&project=2&deadline_after=&deadline_before=&tag=&stage=&stage_net=${
            archivedShow ? "" : 6
          }&assigned__id=&created_after=&created_before=&contract__contract_id=${contractId}`,
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
  }, [archivedShow, trigger, contractName, contractId, contractNumbere]);

  console.log(tasks);

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

      // for (let i = 1; i <= Math.ceil(res.data.count / 100 ); i++){
      //   axios.get(CONTRACT + `?page=${i}`, {headers: { Authorization: "Token " + token.user.token}}).then((res)=>{
      //     setMyData({...myData.push(...res.data.results)})
      //     myData.map((contracted)=> (
      //       contracted.contract_number == findInput.input && setFindCheck(contracted)
      //     )
      //   )})
      // }
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

  // React.useEffect(() => {
  //   axios
  //     .get(TASK_URL, {
  //       headers: {
  //         Authorization: "Token " + token.user.token,
  //       },
  //     })
  //     .then((res) => {
  //       setContenter(res.data.results);
  //     });
  // }, []);

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
      .get(TASK_URL + `?contracts=${search.search}&stage=${7}`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setContenter(res.data.results);
        searchSuccessNotification();
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
              <label>Archieved Tasks :</label>
              <input
                type="checkbox"
                style={{ marginLeft: "1rem" }}
                value={archivedShow}
                onChange={() => setArchivedShow((prev) => !prev)}
              />
              <br></br>
              <label>Contract id: </label>
              <input
                type="text"
                style={{ marginLeft: "3.2rem" }}
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
              />
              <br></br>
              <label>Contract Number: </label>
              <input
                type="text"
                style={{ marginLeft: "0.5rem" }}
                value={contractNumbere}
                onChange={(e) => setContractNumbere(e.target.value)}
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
              <th style={{ width: "14%" }}>Contract_Number</th>
              <th style={{ width: "14%" }}>Credintials</th>
              <th style={{ width: "13%" }}>Title</th>
              <th style={{ width: "13%" }}>Project</th>
              <th style={{ width: "14%" }}>Stage</th>
              <th style={{ width: "14%" }}>User</th>
              <th style={{ width: "14%" }}>Info</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <>
                <tr key={task.id}>
                  <td>{++i}.</td>
                  <td>
                    <a>{task.contract.contract_number}</a>
                    <br />
                    <small style={{ display: "block" }}>
                      {new Date(task.created).toString().slice(0, 16)}
                    </small>
                    <small>
                      {new Date(task.created)
                        .toLocaleTimeString()
                        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                    </small>
                  </td>
                  <td>
                    {task.contract.name}
                    <br></br>
                    {task.contract.contract_id}
                  </td>
                  <td>{task.title}</td>
                  <td>{task.project.name}</td>
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
                      onClick={handleSubmit(TaskSearchHandle)}
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
                            setTrigger((prev) => prev + 1);
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
                      {stage.map(
                        (stage) =>
                          stage.name != task.stage.name && (
                            <option
                              value={stage.id}
                              onClick={handleSubmit(TaskSearchHandle)}
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
