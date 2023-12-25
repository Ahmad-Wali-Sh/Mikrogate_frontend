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
import { useNavigate } from "react-router-dom";
import { useGroup } from "../../../components/useUser";
import {
  useContractFilter,
  usePreviousContracts,
} from "../../../components/State";

export default function NocContractList() {
  const contractUrl = process.env.REACT_APP_NEW_CONTRACT;
  const token = useContext(Context);

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
    watch,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const { contractFilter, setContractFilter } = useContractFilter();
  const { previousContracts, setPreviousContracts } = usePreviousContracts();

  useEffect(() => {
    setContractFilter({
      user: watch("user"),
      sort_order: watch("sort_order"),
      order_by: watch("order_by"),
      date_after: watch("date_after"),
      date_before: watch("date_before"),
      contract__status: watch("contract__status"),
      contract_id: watch("contract_id"),
      project: watch("project"),
      tag: watch("tag"),
      deadline: watch("deadline"),
      assigned: watch("assigned"),
      contract_number: watch("contract_number"),
    });
  }, [
    watch("contract_number"),
    watch("assigned"),
    watch("project"),
    watch("contract_id"),
    watch("sort_order"),
    watch("order_by"),
    watch("contract__status"),
    watch("user"),
    watch("date_before"),
    watch("date_after"),
  ]);
  console.log(contractFilter);

  useEffect(() => {
    contractFilter &&
      setTimeout(() => {
        reset({
          user: contractFilter.user ? contractFilter.user : "",
          sort_order: contractFilter.sort_order
            ? contractFilter.sort_order
            : "",
          order_by: contractFilter.order_by ? contractFilter.order_by : "",
          date_after: contractFilter.date_after
            ? contractFilter.date_after
            : "",
          date_before: contractFilter.date_before
            ? contractFilter.date_before
            : "",
          contract__status: contractFilter.contract__status
            ? contractFilter.contract__status
            : "",
          contract_id: contractFilter.contract_id
            ? contractFilter.contract_id
            : "",
          project: contractFilter.project ? contractFilter.project : "",
          tag: contractFilter.tag ? contractFilter.tag : "",
          deadline: contractFilter.deadline ? contractFilter.deadline : "",
          assigned: contractFilter.assigned ? contractFilter.assigned : "",
          contract_number: contractFilter.contract_number
            ? contractFilter.contract_number
            : "",
        });
      }, 1000);
  }, []);

  useEffect(() => {
    setContracts(previousContracts);
  }, []);

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
        setPreviousContracts(res.data.results);
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

  const titles = [
    `Installation`,
    `Troubleshoot`,
    `Online Support`,
    `Change location`,
    `Connection`,
    `Connection (checking adapters, PoE and cable by customer)`,
    `Connection (rebooting antenna)`,
    `Connection (rebooting antenna and MikroTik router)`,
    `Connection (rebooting antenna and router)`,
    `Connection (rebooting antenna manually)`,
    `Connection (rebooting antenna using MAC Telnet)`,
    `Connection (rebooting MikroTik router)`,
    `Connection (rebooting router)`,
    `Connection (connecting cable to configured port)`,
    `Checking connection`,
    `Checking connection (internal network problem)`,
    `Connection (changing WiFi frequency)`,
    `Connection (changing WiFi setting)`,
    `Connection (changing WiFi settings and frequency)`,
    `Connection (specified device is not connected)`,
    `Changing WiFi password`,
    `Connection (Customer Antenna Power Off)`,
    `Connection (Customer Cable Problem)`,
    `Connection (Router Login Details, bring to the office)`,
    `Connection (Router Port Problem)`,
    `Speed (Internal WiFi Device Problem)`,
    `Sharing SAS portal with login details and training
    images`,
    `Accessing Website`,
    `Training (how to connect to hidden WiFi)`,
    `Training (how to login to Mikrogate App)`,
    `Queues(Increasing speed of all network)`,
    `Sharing WiFi password`,
    `Enabling SSID broadcast`,
    `Disabling SSID broadcast`,
    `Sharing Telegram bot with login details and video`,
    `Explaining how to login to Telegram bot`,
    `Limiting 1 device`,
    `Limiting # devices`,
    `Unlimiting 1 device`,
    `Unlimiting # devices`,
    `Limiting all network except 1 device`,
    `Limiting all network except # devices`,
    `Limiting all network`,
    `Unlimiting all network`,
    `Adding PCQ in antenna`,
    `Adding PCQ in router`,
    `Blocking 1 device`,
    `Blocking # devices`,
    `Unblocking 1 device`,
    `Unblocking # devices`,
    `Blocking all network except 1 device`,
    `Blocking all network except # devices`,
    `Speed`,
    `Speed (full usage)`,
    `Speed (all bandwidth can be received)`,
    `Speed (all daily traffic is used)`,
    `Speed (changing WiFi frequency)`,
    `Speed (changing WiFi setting)`,
    `Speed (changing WiFi settings and frequency)`,
    `Speed (the connected device was limited)`,
    `Speed (rebooting MikroTik router)`,
    `Speed (rebooting router)`,
    `Speed (upgrading antenna)`,
    `Speed (upgrading MikroTik router)`,
    `Speed (Internal WiFi Device Problem)`,
    `Enabling MAC filtering (Access List)`,
    `Enabling MAC filtering (static-only)`,
    `Disabling MAC filtering (Access List)`,
    `Disabling MAC filtering (static-only)`,
    `Adding 1 device to Access List`,
    `Adding # devices to Access List`,
    `Adding 1 device to Leases`,
    `Adding # devices to Leases`,
    `Signal (cooperating with customer to find better signal)`,
    `Checking signal`,
    `Configuration`,
    `Configuration (antenna)`,
    `Configuration (MikroTik router)`,
    `Configuration (router)`,
    `Online game (PUBG)`,
    `Online game (other)`,
    `Checking and explaining customer usage`,
    `Sharing information`,
    `Change Wifi SSID`,
    `Sharing information (expiration and remaining traffic)`,
    `Sharing information (list of connected devices)`,
    `Sharing information (list of connected devices utilizing bandwidth)`,
    `Sharing information (MikroTik router configuration details)`,
    `Sharing information (MikroTik router login details)`,
    `Sharing information (router login details)`,
    `Training (how to login and configure router)`,
    `Training (how to login and change WiFi password)`,
    `Training (how to connect to WiFi)`,
    `Training (how to connect to hidden WiFi)`,
    `Checking equipment (cable)`,
    `Checking equipment (router)`,
    `Checking equipment (router and adapter)`,
    `Checking equipment (PoE)`,
    `Checking equipment (PoE and adapter)`,
    `Checking equipment (antenna)`,
    `Checking equipment (router, PoE and adapters)`,
    `Checking equipment (router, PoE, adapters and cable)`,
    `Setting unfiltered DNS`,
    `Setting filtered DNS`,
    `Other (please specify in task description)`,
    `Signal and CCQ`,
    `Changing access point`,
    `Speed`,
  ];

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <section className="content">
                <div className="container-fluid">
                  <h2 className="text-center display-4 mb-5 pt-5">
                    Search Contracts
                  </h2>
                  <form
                    id="searchForm"
                    onSubmit={handleSubmit(ContractSearchHandle)}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <br />
                          <div className="col-6">
                            <div class="form-group">
                              <div className="form-group">
                                <label>Created by:</label>
                                <select
                                  className="form-control"
                                  style={{ width: "100%" }}
                                  name="created_by"
                                  {...register("user")}
                                >
                                  <option value="">Any</option>
                                  {users.map((user) => (
                                    <option value={user.id}>{user.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Sort Order:</label>
                              <select
                                className="form-control"
                                style={{ width: "100%" }}
                                {...register("sort_order")}
                              >
                                <option value="">[A - Z][1-2-3]</option>
                                <option value="-">[Z - A][3-2-1]</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Order By:</label>
                              <select
                                className="form-control"
                                style={{ width: "100%" }}
                                {...register("order_by")}
                              >
                                <option value="contract_number">
                                  Contract Number
                                </option>
                                <option value="date">Date</option>
                                <option value="contract_id">Contract ID</option>
                              </select>
                            </div>
                          </div>
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
                                  {...register("date_after")}
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
                                  {...register("date_before")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Status:</label>
                              <select
                                className="form-select border border-dark"
                                aria-label="Default select example"
                                name="status"
                                id="status"
                                {...register("contract__status")}
                              >
                                <option value="">Any</option>
                                {status.map((stat) => (
                                  <option value={stat.id}>{stat.name}</option>
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
                                {...register("contract_id")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group">
                              <label>Package:</label>
                              <select
                                className="form-control"
                                name="package"
                                style={{ width: "100%" }}
                                {...register("contract__package")}
                              >
                                <option value="">Any</option>
                                {packages.map((pack) => (
                                  <option value={pack.id}>{pack.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Antenna:</label>
                              <select
                                className="form-control"
                                name="antenna"
                                style={{ width: "100%" }}
                              >
                                <option value="">Any</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="form-group">
                              <label>Router:</label>
                              <select
                                className="form-control"
                                name="router"
                                style={{ width: "100%" }}
                              >
                                <option value="">Any</option>
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
                              {...register("contract_number")}
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
                          {groups.l1 != true && (
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
                          )}
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
                                    {/* <input
                                      type="text"
                                      name="title"
                                      className="form-control"
                                      autoComplete="off"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      onChange={handlerChange}
                                    /> */}
                                    {/* <input list='titles' name='titles' >
                                    <datalist
                                      name="title"
                                      id='title'
                                      className="form-control"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      onChange={handlerChange}
                                    >
                                      {titles.map((title) => (
                                      <option value={title}></option>
                                      ))}
                                    </datalist> */}
                                    <input list="browsers" type="text"
                                      name="title"
                                      className="form-control"
                                      onChange={handlerChange}
                                      autoComplete="off"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1" />
                                    <datalist id="browsers">
                                      {titles.map((title) => (
                                        <option value={title}></option>
                                      ))}
                                    </datalist>
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
                                          (item.name == "Troubleshoot") |
                                            (item.name == "Online Support") && (
                                            <option value={item.id}>
                                              {item.name}
                                            </option>
                                          )
                                        ) : (
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
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
                                  {/* <div className="col-12">
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
                                  </div> */}
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
                                              <span className="ml-4">
                                                {item.name}
                                              </span>
                                            </div>
                                            <input
                                              type="checkbox"
                                              disabled={
                                                groups.l1 ? true : false
                                              }
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
                                              <span className="ml-4">
                                                {item.name}
                                              </span>
                                            </div>
                                            <input
                                              type="checkbox"
                                              className="mt-3 mr-3"
                                              name="assigned"
                                              disabled={
                                                groups.l1 ? true : false
                                              }
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card-body p-0">
        <table className="table projects">
          <thead>
            <tr>
              <th style={{ width: "1%" }}>#</th>
              <th>Contract Number</th>
              <th>POC Name</th>
              <th>POC Number</th>
              <th>Address</th>
              <th>Task Creation</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td>{++i}.</td>
                <td>
                  <a>{contract.contract_number}</a>
                  <br />
                  <small>{new Date(contract.date).toDateString()}</small>
                </td>
                <td>{contract.name}</td>
                <td className="project_progress">{contract.contact}</td>
                <td>{contract.address}</td>
                <td>
                  <button
                    type="button"
                    name="addTask"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#addTaskModal"
                    onClick={()=> (
                        setContractNumber(contract.contract_number),
                        setFind(contract)
                    )}
                  >
                    Create Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>f
        </table>
      </div> */}
      <section className="content">
        <div className="container-fluid">
          <div className="row" id="prineted">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title mt-5">All Customers</h3>

                  <div className="card-tools">
                    <ul className="pagination pagination-sm float-right">
                      <li className="page-item">
                        <a className="page-link">&laquo;</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">2</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">3</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link">&raquo;</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body p-0">
                  <table className="table projects" id="allcontractstable">
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}>#</th>
                        <th>Contract_Number</th>
                        <th style={{ width: "10%" }}>ID</th>
                        <th>POC Name</th>
                        <th>POC Number</th>
                        <th>Address</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contracts.map((contract) => (
                        <tr key={contract.id}>
                          <td>{++i}.</td>
                          <td style={{ maxWidth: "10rem" }}>
                            <div style={{ maxWidth: "10rem" }}>
                              {contract.contract_number}
                            </div>
                            <small
                              className={cx({
                                "badge badge-pill badge-success":
                                  contract.status.name === "Done",
                                "badge badge-pill badge-primary":
                                  contract.status.name === "New",
                                "badge badge-pill badge-danger":
                                  contract.status.name === "Canceled",
                                "badge badge-pill badge-warning":
                                  contract.status.name === "Pending",
                                "badge badge-pill badge-secondary":
                                  contract.status.name === "Terminated",
                              })}
                            >
                              {contract.status.name}
                            </small>
                          </td>
                          <td>
                            <div style={{ width: "4rem" }}>
                              {contract.contract_id}
                            </div>
                          </td>
                          <td>
                            <div style={{ width: "5rem" }}>{contract.name}</div>
                          </td>
                          <td>
                            <div style={{ width: "6rem" }}>
                              {contract.contact}
                            </div>
                          </td>
                          <td>
                            <div style={{ width: "10rem" }}>
                              {contract.address}
                            </div>
                          </td>
                          <td>
                            <small>
                              {contract.changes[0].timestamp.slice(0, 10)}
                            </small>
                            <small style={{ display: "block" }}>
                              {getDayName(contract.changes[0].timestamp)}
                            </small>
                            <small>
                              {new Date(contract.changes[0].timestamp)
                                .toLocaleTimeString()
                                .replace(
                                  /([\d]+:[\d]{2})(:[\d]{2})(.*)/,
                                  "$1$3"
                                )}
                            </small>
                          </td>
                          <td
                            className="project-actions text-right"
                            style={{ minWidth: "7rem" }}
                          >
                            <Link
                              className="btn btn-primary btn-sm mr-1"
                              to={{
                                pathname: "/contract-details-tasks",
                              }}
                              state={{ contract: contract }}
                            >
                              <i className="fa-solid fa-folder-open"></i>
                            </Link>
                            <button
                              type="button"
                              name="addTask"
                              className="btn btn-secondary btn-sm mr-1"
                              data-bs-toggle="modal"
                              data-bs-target="#addTaskModal"
                              onClick={() => (
                                setContractNumber(contract.contract_number),
                                setFind(contract)
                              )}
                            >
                              <i class="fa-solid fa-plus"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <div className="float-left mt-5 ml-2">
                    <b>Result:</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
