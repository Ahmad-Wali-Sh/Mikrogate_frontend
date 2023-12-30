import React, { useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { Context } from "../context/Context";
import { useRealtime } from "../components/Services";
import { useGroup } from "../components/useUser";
import { useForm } from "react-hook-form";
import { useContractFilter, usePreviousContracts } from "../components/State";

const SingleContractNoc = () => {
  const routersUrl = process.env.REACT_APP_ROUTER;
  const antennasUrl = process.env.REACT_APP_ANTENNA;
  const packageUrl = process.env.REACT_APP_PACKAGE;
  const ContractUrl = process.env.REACT_APP_NEW_CONTRACT;
  const contractPackageURL = process.env.REACT_APP_CONTRACT_PACKAGE;
  const contractAntennaURL = process.env.REACT_APP_CONTRACT_ANTENNA;
  const contractRouterURl = process.env.REACT_APP_CONTRACT_ROUTER;
  const contractPaymentURL = process.env.REACT_APP_CONTRACT_PAYMENT;
  const contractOtherServiceURL = process.env.REACT_APP_CONTRACT_OTHER_SERVICE;
  const contractTypeUrl = process.env.REACT_APP_CONTRACT_TYPES;
  const contractStatusUrl = process.env.REACT_APP_CONTRACT_STATUS;
  const currencyUrl = process.env.REACT_APP_CONTRACT_CURRENCY;
  const taskUrl = process.env.REACT_APP_TASK;
  const ME_URL = process.env.REACT_APP_USERS

  const [packages, setPackages] = useState([]);
  const [antennas, setAntennas] = useState([]);
  const [routers, setRouters] = useState([]);
  const [contractPackage, setContractPackage] = useState([]);
  const [contractAntenna, setContractAntenna] = useState([]);
  const [contractRouter, setContractRouter] = useState([]);
  const [contractOtherService, setContractOtherService] = useState([]);
  const [contractPayment, setContractPayment] = useState([]);
  const [status, setStatus] = useState([]);
  const [contractType, setContractType] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [task, setTask] = useState([]);

  const [user, setUser] = React.useState([]);
 

  const location = useLocation();
  const contract = location.state?.contract;

  const token = useContext(Context);

  const contractUrl = process.env.REACT_APP_NEW_CONTRACT;

  const { NotifySubmit } = useRealtime()

  const CONTRACT = process.env.REACT_APP_NEW_CONTRACT;
  const STAGE_URL = process.env.REACT_APP_STAGE;
  const PROJECT_URL = process.env.REACT_APP_PROJECT;
  const TAG_URL = process.env.REACT_APP_TAG;
  const MEMBER_URL = process.env.REACT_APP_MEMBERS;
  const USERS_URL = process.env.REACT_APP_USERS;
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
            res.data.assigned?.map((assigne) => {
              NotifySubmit('You are being assigned to a task.', res.data.id, 'users', assigne.id)
            })
            console.error(res.data)
            // NotifySubmit(`${res.data.project.name} Task Created.`, res.data.id, (res.data.project.name == 'Amendment' || res.data.project.name == 'Troubleshoot' || res.data.project.name == 'CPE' || res.data.project.name == 'Online Support') ? 'noc' : '')
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
            if (res.data.project.name == "CPE") {
              navigate("/task-manager/cpe", {
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
    `Reinstallation`,
    `Active Package`,
    `Other (please specify in task description)`,
    `Signal and CCQ`,
    `Changing access point`,
    `Speed`,
  ];


  useEffect(() => {
    axios
      .get(ME_URL, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((res) => setUser(res.data.results));
    console.log(user);
  }, []);

  console.log(user)

  useEffect(() => {
    try {
      axios
        .get(contractStatusUrl, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setStatus(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(taskUrl, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setTask(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(packageUrl, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setPackages(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(antennasUrl, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setAntennas(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(routersUrl, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setRouters(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(contractTypeUrl, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setContractType(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(currencyUrl, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setCurrency(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(contractPackageURL + `?contract=${contract.id}`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setContractPackage(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(contractAntennaURL + `?contract=${contract.id}`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setContractAntenna(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(contractRouterURl + `?contract=${contract.id}`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setContractRouter(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(contractOtherServiceURL + `?contract=${contract.id}`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setContractOtherService(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(contractPaymentURL + `?contract=${contract.id}`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setContractPayment(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [contractData, setContractData] = useState({
    contract_number: contract.contract_number,
    contract_id: contract.contract_id,
    contract_type: contract.contract_type.id,
    valid: contract.valid,
    date: contract.date,
    activation: contract.activation,
    name: contract.name,
    contact: contract.contact,
    referral: contract.referral,
    organization: contract.organization,
    email: contract.email,
    address: contract.address,
    note: contract.note,
    status: contract.status.id,
  });

  const contractDataOnChange = (e) => {
    setContractData({
      ...contractData,
      [e.target.name]: e.target.value,
    });
  };

  const [packageData, setPackageData] = useState({
    package: contractPackage.map((item) => item.id),
    price: contractPackage.map((item) => item.price),
  });

  const packageOnChange = (e) => {
    setPackageData({
      ...packageData,
      [e.target.name]: e.target.value,
    });
  };

  const [antennaData, setAntennaData] = useState({
    antenna: contractAntenna.map((item) => item.antenna),
    condition: contractAntenna.map((item) => item.condition),
    serial_number: contractAntenna.map((item) => item.serial_number),
    quantity: contractAntenna.map((item) => item.quantity),
    amount: contractAntenna.map((item) => item.amount),
    Lease_amount: contractAntenna.map((item) => item.Lease_amount),
    total_amount: contractAntenna.map((item) => item.total_amount),
  });

  const antennaOnChange = (e) => {
    setAntennaData({
      ...antennaData,
      [e.target.name]: e.target.value,
    });
  };

  const [routerData, setRouterData] = useState({
    router: contractRouter.map((item) => item.router),
    condition: contractRouter.map((item) => item.condition),
    serial_number: contractRouter.map((item) => item.serial_number),
    quantity: contractRouter.map((item) => item.quantity),
    amount: contractRouter.map((item) => item.amount),
    Lease_amount: contractRouter.map((item) => item.Lease_amount),
    total_amount: contractRouter.map((item) => item.total_amount),
  });

  const routerOnChange = (e) => {
    setRouterData({
      ...routerData,
      [e.target.name]: e.target.value,
    });
  };

  const [paymentData, setPaymentData] = useState({
    payment_total: contractPayment.map((item) => item.payment_total),
    service_charge: contractPayment.map((item) => item.service_charge),
    other_charges: contractPayment.map((item) => item.other_charges),
    discount: contractPayment.map((item) => item.discount),
    lease_deposit: contractPayment.map((item) => item.lease_deposit),
    grand_total: contractPayment.map((item) => item.grand_total),
    currency: contractPayment.map((item) => item.currency),
  });

  const paymentOnChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const [otherServicesData, setOtherServicesData] = useState({
    service_type: contractOtherService.map((item) => item.service_type),
    description: contractOtherService.map((item) => item.description),
    payment_method: contractOtherService.map((item) => item.payment_method),
    price: contractOtherService.map((item) => item.price),
  });

  const otherServiceOnChange = (e) => {
    setOtherServicesData({
      ...otherServicesData,
      [e.target.name]: e.target.value,
    });
    console.log(otherServicesData);
  };

  const updatePersonalInfo = async (e) => {
    e.preventDefault();

    const contractPatchedData = new FormData();
    Object.keys(contractData).map((key) => {
      if (typeof contractData[key] != "object") {
        contractPatchedData.append(key, contractData[key]);
      }
    });

    contractPatchedData.append("status", parseInt(contractData.status));
    console.log(contractData.status);
    if (contractData.date != "") {
      contractPatchedData.append(
        "date",
        new Date(contractData.date).toISOString()
      );
    }
    if (contractData.activation != "") {
      contractPatchedData.append(
        "activation",
        new Date(contractData.activation).toISOString()
      );
    }
    if (contractData.valid != "") {
      contractPatchedData.append(
        "valid",
        new Date(contractData.valid).toISOString()
      );
    }

    try {
      const res = await axios({
        url: ContractUrl + `${contract.id}/`,
        method: "PATCH",
        data: contractPatchedData,
        headers: {
          Authorization: "Token " + token,
        },
      });
      NotificationManager.success(
        "Personal Info Updated Successfully",
        "",
        2000
      );
      console.log(res);
    } catch (err) {
      NotificationManager.error(
        "Error Updating Personal Info Please Check The Enteries And Try Again",
        "",
        10000
      );
      console.log(err);
    }
  };

  const updateAntennaInfo = async (e) => {
    e.preventDefault();

    const antennaPatchedData = new FormData();
    Object.keys(antennaData).map((key) => {
      if (typeof antennaData[key] != "object") {
        antennaPatchedData.append(key, antennaData[key]);
      }
    });
    if (contractAntenna.length == 0) {
      antennaPatchedData.append("contract", contract.id);
    }

    let antennaUrl =
      contractAntenna.length > 0
        ? contractAntennaURL + `${contractAntenna.map((item) => item.id)}/`
        : contractAntennaURL;
    let antennaMethod = contractAntenna.length > 0 ? "PATCH" : "POST";

    try {
      const res = await axios({
        url: antennaUrl,
        method: antennaMethod,
        data: antennaPatchedData,
        headers: {
          Authorization: "Token " + token,
        },
      });
      NotificationManager.success(
        "Antenna Info Updated Successfully",
        "",
        2000
      );
      console.log(res);
    } catch (err) {
      NotificationManager.error(
        "Error Updating Antenna Info Please Check The Enteries And Try Again",
        "",
        10000
      );
      console.log(err);
    }
  };

  const updateRouterInfo = async (e) => {
    e.preventDefault();
    const routerPatchedData = new FormData();
    Object.keys(routerData).map((key) => {
      if (typeof routerData[key] != "object") {
        routerPatchedData.append(key, routerData[key]);
      }
    });
    if (contractRouter.length == 0) {
      routerPatchedData.append("contract", contract.id);
    }
    let routerUrl =
      contractRouter.length > 0
        ? contractRouterURl + `${contractRouter.map((item) => item.id)}/`
        : contractRouterURl;
    let routerMethod = contractRouter.length > 0 ? "PATCH" : "POST";

    try {
      const res = await axios({
        url: routerUrl,
        method: routerMethod,
        data: routerPatchedData,
        headers: {
          Authorization: "Token " + token,
        },
      });
      NotificationManager.success("Router Info Updated Successfully", "", 2000);
      console.log(res);
    } catch (err) {
      NotificationManager.error(
        "Error Updating Router Info Please Check The Enteries And Try Again",
        "",
        10000
      );
      console.log(err);
    }
  };

  const updateBandwidthInfo = async (e) => {
    e.preventDefault();
    const packagePatchedData = new FormData();
    Object.keys(packageData).map((key) => {
      if (typeof packageData[key] != "object") {
        packagePatchedData.append(key, parseInt(packageData[key]));
      }
    });

    try {
      const res = await axios({
        url: contractPackageURL + `${contractPackage.map((item) => item.id)}/`,
        method: "PATCH",
        data: packagePatchedData,
        headers: {
          Authorization: "Token " + token,
        },
      });
      NotificationManager.success(
        "Bandwidth Info Updated Successfully",
        "",
        2000
      );
      console.log(res);
    } catch (err) {
      NotificationManager.error(
        "Error Updating Package Info Please Check The Enteries And Try Again",
        "",
        10000
      );
      console.log(err);
    }
  };

  const updateOtherServiceInfo = async (e) => {
    e.preventDefault();
    const otherServicePatchedData = new FormData();

    Object.keys(otherServicesData).map((key) => {
      if (typeof otherServicesData[key] != "object") {
        otherServicePatchedData.append(key, otherServicesData[key]);
      }
    });

    if (contractOtherService.length == 0) {
      otherServicePatchedData.append("contract", contract.id);
    }

    let otherServiceUrl =
      contractOtherService.length > 0
        ? contractOtherServiceURL +
          `${contractOtherService.map((item) => item.id)}/`
        : contractOtherServiceURL;
    let otherServiceMethod = contractOtherService.length > 0 ? "PATCH" : "POST";

    try {
      const res = await axios({
        url: otherServiceUrl,
        method: otherServiceMethod,
        data: otherServicePatchedData,
        headers: {
          Authorization: "Token " + token,
        },
      });
      NotificationManager.success(
        "Other Services Info Updated Successfully",
        "",
        2000
      );
      console.log(res);
    } catch (err) {
      NotificationManager.error(
        "Error Updating Other Services Info Please Check The Enteries And Try Again",
        "",
        10000
      );
      console.log(err);
    }
  };

  const updatePaymentInfo = async (e) => {
    e.preventDefault();
    const paymentPatchedData = new FormData();
    Object.keys(paymentData).map((key) => {
      if (typeof paymentData[key] != "object") {
        paymentPatchedData.append(key, parseInt(paymentData[key]));
      }
    });

    console.log(grandTotal());

    let contractPaymentUrl =
      contractPayment.length > 0
        ? contractPaymentURL + `${contractPayment.map((item) => item.id)}/`
        : contractPaymentURL;
    let contractPaymentMethod = contractPayment.length > 0 ? "PATCH" : "POST";
    try {
      const res = await axios({
        url: contractPaymentUrl,
        method: contractPaymentMethod,
        data: paymentPatchedData,
        headers: {
          Authorization: "Token " + token,
        },
      });
      console.log(res);
      NotificationManager.success(
        "Payment Info Updated Successfully",
        "",
        2000
      );
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        "Error Updating Payment Info Please Check The Enteries And Try Again",
        "",
        10000
      );
    }
  };

  const updateNote = async (e) => {
    e.preventDefault()
    const contractNote = new FormData();
    contractNote.append('note', contractData.note);
    try {
      const res = await axios({
        url: ContractUrl + `${contract.id}/`,
        method: 'PATCH',
        data: contractNote,
        headers: {
          Authorization: "Token " + token,
        },
      });
      console.log(res);
      NotificationManager.success(
        "Note Updated Successfully",
        "",
        2000
      );
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        "Error Updating Note Please Check The Enteries And Try Again",
        "",
        10000
      );
    }
  }

  const updateContract = async (e) => {
    e.preventDefault();

    const contractPatchedData = new FormData();
    Object.keys(contractData).map((key) => {
      contractPatchedData.append(
        contractData[key] != null ||
          (typeof contractData[key] != "object" && key),
        contractData[key]
      );
    });
    if (typeof contractData.status == "string") {
      contractPatchedData.append("status", parseInt(contractData.status));
    }
    if (contractData.date != "") {
      contractPatchedData.append(
        "date",
        new Date(contractData.date).toISOString()
      );
    }
    if (contractData.activation != "") {
      contractPatchedData.append(
        "activation",
        new Date(contractData.activation).toISOString()
      );
    }
    if (contractData.valid != "") {
      contractPatchedData.append(
        "valid",
        new Date(contractData.valid).toISOString()
      );
    }

    try {
      const res = await axios({
        url: ContractUrl + `${contract.id}/`,
        method: "PATCH",
        data: contractPatchedData,
        headers: {
          Authorization: "9fa0d5017237026daf1908fd009e27d6f8001255",
          "Content-Type": "multipart/form-data",
        },
      });
      NotificationManager.success(
        "Personal Info Updated Successfully",
        "",
        2000
      );
      console.log(res);
    } catch (err) {
      NotificationManager.error(
        "Error Updating Personal Info Please Check The Enteries And Try Again",
        "",
        10000
      );
      console.log(err);
    }

    const packagePatchedData = new FormData();
    packagePatchedData.append("package", packageData.bandwidth);
    packagePatchedData.append("price", packageData.price);

    try {
      const res = await axios({
        url: contractPackageURL + `${contractPackage.id}/`,
        method: "PATCH",
        data: packagePatchedData,
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      NotificationManager.success(
        "Package Info Updated Successfully",
        "",
        2000
      );
    } catch (err) {
      NotificationManager.error(
        "Error Updating Package Info Please Check The Enteries And Try Again",
        "",
        10000
      );
    }

    const antennaPatchedData = new FormData();
    antennaPatchedData.append("antenna", antennaData.antenna);
    antennaPatchedData.append("condition", antennaData.condition);
    antennaPatchedData.append("serial_number", antennaData.serial_number);
    antennaPatchedData.append("quantity", antennaData.quantity);
    antennaPatchedData.append("amount", antennaData.amount);
    antennaPatchedData.append("Lease_amount", antennaData.lease_amount);
    antennaPatchedData.append("total_amount", antennaData.total_amount);

    let antennaUrl =
      contractAntenna.length > 0
        ? contractAntennaURL + `${contractAntenna.id}/`
        : contractAntennaURL;
    let antennaMethod = contractAntenna.length > 0 ? "PATCH" : "POST";

    try {
      const res = await axios({
        url: antennaUrl,
        method: antennaMethod,
        data: antennaPatchedData,
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      NotificationManager.success(
        "Antenna Info Updated Successfully",
        "",
        2000
      );
    } catch (err) {
      NotificationManager.error(
        "Error Updating Antenna Info Please Check The Enteries And Try Again",
        "",
        10000
      );
    }

    const routerPatchedData = new FormData();
    routerPatchedData.append("router", routerData.router);
    routerPatchedData.append("condition", routerData.condition);
    routerPatchedData.append("serial_number", routerData.serial_number);
    routerPatchedData.append("quantity", routerData.quantity);
    routerPatchedData.append("amount", routerData.amount);
    routerPatchedData.append("Lease_amount", routerData.lease_amount);
    routerPatchedData.append("total_amount", routerData.total_amount);

    let routerUrl =
      contractRouter.length > 0
        ? contractRouterURl + `${contractRouter.id}/`
        : contractRouterURl;
    let routerMethod = contractRouter.length > 0 ? "PATCH" : "POST";

    try {
      const res = await axios({
        url: routerUrl,
        method: routerMethod,
        data: routerPatchedData,
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      NotificationManager.success("Router Info Updated Successfully", "", 2000);
    } catch (err) {
      NotificationManager.error(
        "Error Updating Router Info Please Check The Enteries And Try Again",
        "",
        10000
      );
    }

    const paymentPatchedData = new FormData();
    paymentPatchedData.append("contract", contractData.id);
    paymentPatchedData.append(
      "payment_total",
      parseInt(paymentData.payment_total)
    );
    paymentPatchedData.append(
      "service_charge",
      parseInt(paymentData.service_charge)
    );
    paymentPatchedData.append(
      "other_charges",
      parseInt(paymentData.other_charges)
    );
    paymentPatchedData.append("discount", parseInt(paymentData.discount));
    paymentPatchedData.append("grand_total", parseInt(grandTotal()));
    paymentPatchedData.append("currency", parseInt(paymentData.currency));

    let contractPaymentUrl =
      contractPayment.length > 0
        ? contractPaymentURL + `${contractPayment.map((item) => item.id)}/`
        : contractPaymentURL;
    let contractPaymentMethod = contractPayment.length > 0 ? "PATCH" : "POST";
    try {
      const res = await axios({
        url: contractPaymentUrl,
        method: contractPaymentMethod,
        data: paymentPatchedData,
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      NotificationManager.success(
        "Payment Info Updated Successfully",
        "",
        2000
      );
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        "Error Updating Payment Info Please Check The Enteries And Try Again",
        "",
        10000
      );
    }

    const otherServicePatchedData = new FormData();
    otherServicePatchedData.append("contract", contractData.id);
    Object.keys(otherServicesData).map((key) => {
      otherServicePatchedData.append(
        otherServicesData[key] != null && key,
        otherServicesData[key] != null && otherServicesData[key]
      );
    });

    let otherServiceUrl =
      contractOtherService.length > 0
        ? contractOtherServiceURL +
          `${contractOtherService.map((item) => item.id)}/`
        : contractOtherServiceURL;
    let otherServiceMethod = contractOtherService.length > 0 ? "PATCH" : "POST";

    try {
      const res = await axios({
        url: otherServiceUrl,
        method: otherServiceMethod,
        data: otherServicePatchedData,
        headers: {
          Authorization: "Token" + token,
          "Content-Type": "multipart/form-data",
        },
      });
      NotificationManager.success(
        "Other Services Info Updated Successfully",
        "",
        2000
      );
      console.log(res);
    } catch (err) {
      NotificationManager.error(
        "Error Updating Other Services Info Please Check The Enteries And Try Again",
        "",
        10000
      );
      console.log(err);
    }
  };

  const grandTotal = () => {
    let packagePrice = packageData.price;
    let routerPrice = routerData.amount;
    let antennaPrice = antennaData.amount;
    let antennaLeaseAmount = antennaData.Lease_amount;
    let routerLeaseAmount = routerData.Lease_amount;
    let otherServicePrice = otherServicesData.price;
    let serviceCharge = paymentData.service_charge;
    let otherCharges = paymentData.other_charges;
    let discount = paymentData.discount;

    return (
      packagePrice +
      antennaPrice +
      routerPrice +
      antennaLeaseAmount +
      routerLeaseAmount +
      otherServicePrice +
      serviceCharge +
      otherCharges -
      discount
    );
  };

  const navigate = useNavigate();
  const navigator = () => {
    navigate('/search');
  }

  return (
    <div className="content-wrapper">
      <div className="content">
        <div style={{ display: 'flex', gap: '0rem'}}>
        <div    
          className="btn btn-secondary m-2"  
          name="addTask"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
          onClick={() => (
            setContractNumber(contract.contract_number),
            setFind(contract)
          )}
        >
          <i className="fa-solid fa-plus"></i>
        </div>
        <Link 
        className="btn btn-info m-2"    
          to={{
            pathname: "/history",
          }}
          state={{ contract: contract }}
        >
          <i className="fa-solid fa-history"></i>
        </Link>
        </div>
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
                                    <input
                                      list="browsers"
                                      type="text"
                                      name="title"
                                      className="form-control"
                                      onChange={handlerChange}
                                      autoComplete="off"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                    />
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
                                        groups.sales_stuff && groups.l1
                                          ? (item.name == "Troubleshoot") |
                                              (item.name == "Amendment") && (
                                              <option value={item.id}>
                                                {item.name}
                                              </option>
                                            )
                                          : groups.l1
                                          ? (item.name == "Troubleshoot") |
                                              (item.name == "CPE") |
                                              (item.name ==
                                                "Online Support") && (
                                              <option value={item.id}>
                                                {item.name}
                                              </option>
                                            )
                                          : item.name != "Amendment" && (
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
{/* 
                            {project.selectedProject == "troubleshoot" && (
                              <Troubleshoot />
                            )}
                            {project.selectedProject == "changeLocation" && (
                              <ChangeLocation />
                            )}

                            {project.selectedProject == "amendment" && (
                              <Amendment />
                            )} */}
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
        <section>
          <form onSubmit={updatePersonalInfo}>
            <div className="card card-outline card-info">
              <div className="card-header">
                <div className="d-flex justify-content-between">
                  <span>
                    <i className="fa-solid fa-file-contract"></i>
                    &nbsp;Personal Info
                  </span>
                  <span>
                    <i className="fa-solid fa-user"></i>
                    &nbsp;by:&nbsp;{contract.user.name}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div className="row mt-3">
                  <div className="col-6">
                    <div>
                      <label htmlFor="status">Status</label>
                      <select disabled
                        className="form-select disabled border "
                        aria-label="Default select disabled example"
                        name="status"
                        id="status"
                        Selected={contract.status.id}
                        onChange={contractDataOnChange}
                      >
                        <option
                          className="bg-primary"
                          defaultValue={contract.status.id}
                          style={{ fontWeight: "bold" }}
                        >
                          {contract.status.name}
                        </option>
                        {status.map(
                          (item) =>
                            item.id != contractData.status && (
                              <option value={item.id}>{item.name}</option>
                            )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <label htmlFor="contype">Contract Type</label>
                      <select disabled
                        className="form-select disabled border "
                        name="contract_type"
                        id="contype"
                        Selected={contract.contract_type.id}
                        onChange={contractDataOnChange}
                      >
                        <option
                          className="bg-primary"
                          defaultValue={contract.contract_type.id}
                        >
                          {contract.contract_type.name}
                        </option>
                        {contractType.map(
                          (item) =>
                            item.id != contractData.contract_type && (
                              <option value={item.id}>{item.name}</option>
                            )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="contract_number">Contract Number</label>
                    <input disabled
                      type="text"
                      name="contract_number"
                      className="form-control"
                      defaultValue={contractData.contract_number}
                      onChange={contractDataOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="contract_id">ID</label>
                    <input disabled
                      type="text"
                      name="contract_id"
                      className="form-control"
                      id="contract_id"
                      defaultValue={contractData.contract_id}
                      onChange={contractDataOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="referral">Referral</label>
                    <input disabled
                      type="text"
                      name="referral"
                      className="form-control"
                      id="referral"
                      defaultValue={contractData.referral}
                      onChange={contractDataOnChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="contract_date">Contract Date</label>
                    <input disabled
                      type="date"
                      name="date"
                      className="form-control border "
                      id="contract_date"
                      value={new Date(contractData.date)
                        .toISOString()
                        .slice(0, 10)}
                      onChange={contractDataOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="activation_date">Activation Date</label>
                    <input disabled
                      type="date"
                      name="activation"
                      className="form-control border "
                      id="contract_date"
                      value={new Date(contractData.activation)
                        .toISOString()
                        .slice(0, 10)}
                      onChange={contractDataOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="valid_upto">Valid Upto</label>
                    <input disabled
                      type="date"
                      name="valid"
                      className="form-control border "
                      id="valid_upto"
                      value={new Date(contractData.valid)
                        .toISOString()
                        .slice(0, 10)}
                      onChange={contractDataOnChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="organization">Organization</label>
                    <input disabled
                      type="text"
                      name="organization"
                      className="form-control"
                      id="organization"
                      defaultValue={contractData.organization}
                      onChange={contractDataOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="poc_name">POC Name</label>
                    <input disabled
                      type="text"
                      name="name"
                      className="form-control"
                      id="poc_name"
                      defaultValue={contractData.name}
                      onChange={contractDataOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="poc_number">POC Number</label>
                    <input disabled
                      type="text"
                      name="contact"
                      className="form-control"
                      id="poc_number"
                      defaultValue={contractData.contact}
                      onChange={contractDataOnChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="email">Email</label>
                    <input disabled
                      type="text"
                      name="email"
                      className="form-control"
                      id="email"
                      defaultValue={contractData.email}
                      onChange={contractDataOnChange}
                    />
                  </div>
                  <div className="col-8">
                    <label htmlFor="address">Address</label>
                    <input disabled
                      type="text"
                      name="address"
                      className="form-control"
                      id="address"
                      defaultValue={contractData.address}
                      onChange={contractDataOnChange}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </form>
          <form onSubmit={updateBandwidthInfo}>
            <div className="card card-outline card-info">
              <div className="card-header">
                <i className="fa fa-box-open"></i>
                &nbsp;Bandwidth
              </div>
              <div className="card-body">
                <div className="row mt-3">
                  <div className="col-8">
                    <div className="form-group">
                      <label>Bandwidth</label>
                      <select disabled
                        className="form-control border "
                        name="package"
                        style={{ width: "100%" }}
                        onChange={packageOnChange}
                      >
                        <option
                          className="bg-primary"
                          value={contractPackage.map((item) => item.id)}
                        >
                          {contractPackage.map((item) => item.package.name)}
                        </option>

                        {packages.map(
                          (item) =>
                            item.id !=
                              contractPackage.map((item) => item.id) && (
                              <option value={item.id}>{item.name}</option>
                            )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-4">
                    <label htmlFor="bandwidth_price">Bandwidth Price</label>
                    <input disabled
                      type="text"
                      name="price"
                      className="form-control"
                      id="bandwidth_price"
                      defaultValue={contractPackage.map((item) => item.price)}
                      onChange={packageOnChange}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </form>
          <form onSubmit={updateAntennaInfo}>
            <div className="card card-outline card-info">
              <div className="card-header">
                <i className="fa-solid fa-satellite-dish"></i>
                &nbsp;Antenna
              </div>
              <div className="card-body">
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="antenna">Antenna</label>
                    <select disabled
                      className="form-control border "
                      name="antenna"
                      id="antenna"
                      onChange={antennaOnChange}
                    >
                      <option
                        className="bg-primary"
                        value={contractAntenna.map((item) => item.antenna.id)}
                      >
                        {contractAntenna.map((item) => item.antenna.name)}
                      </option>
                      {antennas.map(
                        (item) =>
                          item.id != contractAntenna.map((item) => item.id) && (
                            <option className="dropdown-item" value={item.id}>
                              {item.name}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                  <div className="col-2">
                    <label htmlFor="price">Price</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="amount"
                      id="price"
                      defaultValue={contractAntenna.map((item) => item.amount)}
                      onChange={antennaOnChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="condition">Condition</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="condition"
                      id="condition"
                      defaultValue={contractAntenna.map(
                        (item) => item.condition
                      )}
                      onChange={antennaOnChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="serial_number">Serial Number</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="serial_number"
                      id="serial_number"
                      defaultValue={contractAntenna.map(
                        (item) => item.serial_number
                      )}
                      onChange={antennaOnChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="lease_amount">Lease Amount</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="Lease_amount"
                      defaultValue={contractAntenna.map(
                        (item) => item.Lease_amount
                      )}
                      onChange={antennaOnChange}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </form>
          <form onSubmit={updateRouterInfo}>
            <div className="card card-outline card-info">
              <div className="card-header">
                <i className="fa-solid fa-router"></i>
                &nbsp;Router
              </div>
              <div className="card-body">
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="router">Router</label>
                    <select disabled
                      className="form-control border "
                      name="router"
                      id="router"
                      onChange={routerOnChange}
                    >
                      <option
                        className="bg-primary"
                        value={contractRouter.map((item) => item.router.id)}
                      >
                        {contractRouter.map((item) => item.router.name)}
                      </option>
                      {routers.map(
                        (item) =>
                          item.id != contractRouter.map((item) => item.id) && (
                            <option className="dropdown-item" value={item.id}>
                              {item.name}
                            </option>
                          )
                      )}
                    </select >
                  </div>
                  <div className="col-2">
                    <label htmlFor="price">Price</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="amount"
                      id="price"
                      defaultValue={contractRouter.map((item) => item.amount)}
                      onChange={routerOnChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="condition">Condition</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="condition"
                      id="condition"
                      defaultValue={contractRouter.map(
                        (item) => item.condition
                      )}
                      onChange={routerOnChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="serial_number">Serial Number</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="serial_number"
                      id="serial_number"
                      defaultValue={contractRouter.map(
                        (item) => item.serial_number
                      )}
                      onChange={routerOnChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="lease_amount">Lease Amount</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="Lease_amount"
                      defaultValue={contractRouter.map(
                        (item) => item.Lease_amount
                      )}
                      onChange={routerOnChange}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </form>
          <form onSubmit={updateOtherServiceInfo}>
            <div className="card card-outline card-info">
              <div className="card-header">
                <i className="fa-solid fa-ellipsis"></i>
                &nbsp;Other Services
              </div>
              <div className="card-body">
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="service_type">Service Type</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="service_type"
                      id="service_type"
                      defaultValue={contractOtherService.map(
                        (item) => item.service_type
                      )}
                      onChange={otherServiceOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="payment_method">Payment Method</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="payment_method"
                      id="payment_method"
                      defaultValue={contractOtherService.map(
                        (item) => item.payment_method
                      )}
                      onChange={otherServiceOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="price">Price</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="price"
                      id="price"
                      defaultValue={contractOtherService.map(
                        (item) => item.price
                      )}
                      onChange={otherServiceOnChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label htmlFor="description">Description</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="description"
                      id="description"
                      defaultValue={contractOtherService.map(
                        (item) => item.description
                      )}
                      onChange={otherServiceOnChange}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </form>
          <form onSubmit={updatePaymentInfo}>
            <div className="card card-outline card-info">
              <div className="card-header">
                <i className="fa-solid fa-sack-dollar"></i>
                &nbsp;Payment
              </div>
              <div className="card-body">
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="payment_total">Payment Total</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="payment_total"
                      id="payment_total"
                      defaultValue={contractPayment.map(
                        (item) => item.payment_total
                      )}
                      onChange={paymentOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="service_charge">Service Charge</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="service_charge"
                      id="service_charge"
                      defaultValue={contractPayment.map(
                        (item) => item.service_charge
                      )}
                      onChange={paymentOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="other_charges">Other Charges</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="other_charges"
                      id="other_charges"
                      defaultValue={contractPayment.map(
                        (item) => item.other_charges
                      )}
                      onChange={paymentOnChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label htmlFor="discount">Discount</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="discount"
                      id="discount"
                      defaultValue={contractPayment.map(
                        (item) => item.discount
                      )}
                      onChange={paymentOnChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="lease_deposit">Lease Deposit</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="lease_deposit"
                      id="lease_deposit"
                      defaultValue={contractPayment.map(
                        (item) => item.lease_deposit
                      )}
                      onChange={paymentOnChange}
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="grand_total">Grand Total</label>
                    <input disabled
                      type="text"
                      className="form-control"
                      name="grand_total"
                      id="grand_total"
                      defaultValue={contractPayment.map(
                        (item) => item.grand_total
                      )}
                      onChange={paymentOnChange}
                    />
                  </div>
                  <div className="col-1">
                    <label htmlFor="currency">Currency</label>
                    <div className="form-group">
                      <select disabled
                        className="form-control border "
                        name="currency"
                        id="currency"
                        onChange={paymentOnChange}
                      >
                        {currency.map((item) => (
                          <option className="dropdown-item" value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </form>
        </section>

        <hr />
        <section>
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={updateNote}>
                <div className="card card-outline card-info">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa-solid fa-note"></i>
                      &nbsp;Notes
                    </h3>
                  </div>
                  <div className="card-body">
                    <textarea
                      value={contractData.note}
                      id="summernotes"
                      name="note"
                      onChange={contractDataOnChange}
                    >
                      {contractData.note}
                    </textarea>
                  </div>
                </div>
              </form>
             
            </div>
          </div>
        </section>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <div className="timeline">
             
              <div>
                <i className="fas fa-clock bg-gray"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleContractNoc;
