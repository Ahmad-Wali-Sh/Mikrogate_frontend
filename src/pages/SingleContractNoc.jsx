import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

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

  // const token = useContext(Context);

  const token = localStorage.getItem("user").slice(10, -2);


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
        <Link
          className="history-btn"
          to={{
            pathname: "/history",
          }}
          state={{ contract: contract }}
        >
          <p>History</p>
        </Link>
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
