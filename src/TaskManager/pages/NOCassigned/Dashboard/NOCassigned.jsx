import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../../context/Context";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useForm } from "react-hook-form";
import { useGroup } from "../../../../components/useUser";

export default function NocAssigned() {
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
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_contact"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Contact
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      name="contact"
                      id="troubleshoot_contact"
                      placeholder="..."
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <label
                    htmlFor="onlineSupport_by"
                    className="col-sm-1 col-form-label text-muted"
                  >
                    By
                  </label>
                  <div className="col-sm-4">
                    <select
                      className="form-control border border-2"
                      id="onlineSupport_by"
                      name="by"
                      onChange={handleChange}
                    >
                      <option value="select" selected>
                        select
                      </option>
                      <option value="inPerson">In-Person</option>
                      <option value="phoneCall">Phone call</option>
                      <option value="telegram">Telegram</option>
                    </select>
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
        {onlineSupport == false && (
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Add Details
          </button>
        )}
      </div>
      {onlineSupport.map((item) => (
        <>
          <form onSubmit={OnlineSupportUpdate}>
            <h3>Details</h3>
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
                <div className="row mt-3">
                  <label
                    for="onlineSupport_contact"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    Contact
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="contact"
                      id="onlineSupport_contact"
                      placeholder="..."
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={item.contact}
                    />
                  </div>
                  <div className="col-1"></div>
                  <label
                    for="onlineSupport_by"
                    className="col-sm-1 col-form-label text-muted"
                  >
                    by
                  </label>
                  <div className="col-4 col-sm-4">
                    <select
                      className="form-control border border-2"
                      id="onlineSupport_by"
                      name="by"
                      defaultValue={item.by}
                      onChange={handleChange}
                    >
                      <option value="telegram">Telegram</option>
                      <option value="phoneCall">Phone call</option>
                      <option value="inPerson">In-Person</option>
                    </select>
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
                          defaultValue={item.description}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </>
      ))}
    </>
  );
}
