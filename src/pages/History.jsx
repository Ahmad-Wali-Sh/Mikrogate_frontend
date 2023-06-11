import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function History() {
  const location = useLocation();
  let contract = location.state?.contract;
  const ME_URL = process.env.REACT_APP_USERS;
  const contractPackageURL = process.env.REACT_APP_CONTRACT_PACKAGE;
  const anttenaPackageURL = process.env.REACT_APP_CONTRACT_ANTENNA;
  const packageUrl = process.env.REACT_APP_PACKAGE;
  const anntenaURL = process.env.REACT_APP_ANTENNA;
  const routersUrl = process.env.REACT_APP_ROUTER;
  const contractRouterURl = process.env.REACT_APP_CONTRACT_ROUTER;
  const contractOtherServiceURL = process.env.REACT_APP_CONTRACT_OTHER_SERVICE;
  const contractPaymentURL = process.env.REACT_APP_CONTRACT_PAYMENT;
  const contractTypeUrl = process.env.REACT_APP_CONTRACT_TYPES;

  const [user, setUser] = useState([]);
  const [contractPackage, setContractPackage] = useState([]);
  const [packages, setPackages] = useState([]);
  const [AnttenaPackage, setAnttenaPackage] = useState([]);
  const [anttenas, setAnttenas] = useState([]);
  const [RouterPackage, setRouterPackage] = useState([]);
  const [routers, setRouters] = useState([]);
  const [types, setTypes] = useState([]);
  const [contractOtherService, setContractOtherService] = useState([]);
  const [contractPayment, setContractPayment] = useState([]);
  const [contractPaymentHis, setContractPaymentHis] = useState([]);
  const [contractSerialized, setcontractSerialized] = useState([]);
  const [ChangesArray, setChangesArray] = useState([]);

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
        .get(anttenaPackageURL + `?contract=${contract.id}`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setAnttenaPackage(res.data.results);
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
          setRouterPackage(res.data.results);
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
  useEffect(() => {
    try {
      axios
        .get(contractPaymentURL + `?contract=${contract.id}`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setContractPaymentHis(res.data.results);
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
        .get(anntenaURL, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          setAnttenas(res.data.results);
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
          setTypes(res.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function dateCompare(date) {
    const myDate = new Date(date);
    const myYear = myDate.getFullYear() * 8760;
    const myMonth = (myDate.getMonth() + 1) * 720;
    const myDay = myDate.getDate() * 24;
    const myHours = myDate.getHours() + 1;
    const myMinutes = myDate.getMinutes();
    const results = myYear + myMonth + myDay + myHours + myMinutes;
    console.log(
      `year ${myYear} month ${myMonth} day ${myDay} hours ${myHours} Minutes ${myMinutes} results ${results}`
    );
    return results;
  }

  function time(date) {
    const newDate = new Date(date);
    const hour =
      newDate.getHours() <= 9 ? "0" + newDate.getHours() : newDate.getHours();
    const minute =
      newDate.getMinutes() <= 9
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes();
    return hour + ":" + minute;
  }

  contract.changes.map((change) => {
    try {
      change.changes = [JSON.parse(change.changes)];
    } catch (e) {
      console.log(e);
    }
    return change;
  });

  contractPackage.map((origin) =>
    origin.changes.map((change) => {
      try {
        change.changes = [JSON.parse(change.changes)];
      } catch (e) {
        console.log(e);
      }
      return change;
      
    })
  );
  contractPayment.map((origin) =>
    origin.changes.map((change) => {
      try {
        change.changes = [JSON.parse(change.changes)];
      } catch (e) {
        console.log(e);
      }
      return change;
    })
  );
  AnttenaPackage.map((origin) =>
    origin.changes.map((change) => {
      try {
        change.changes = [JSON.parse(change.changes)];
      } catch (e) {
        console.log(e);
      }
      return change;
    })
  );
  contractOtherService.map((origin) =>
    origin.changes.map((change) => {
      try {
        change.changes = [JSON.parse(change.changes)];
      } catch (e) {
        console.log(e);
      }
      return change;
    })
  );
  RouterPackage.map((origin) =>
    origin.changes.map((change) => {
      try {
        change.changes = [JSON.parse(change.changes)];
      } catch (e) {
        console.log(e);
      }
      return change;
    })
  );

  return (
    <div className="content-wrapper">
      <div className="content">
        {contract.changes && (
          <section>
            <div className="row reverse">
              <div className="col-md-12">
                <div className="card card-outline card-info">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      &nbsp;History
                    </h3>
                  </div>
                  <div className="history-card">
                    <div className="card-body">
                      <div className="grid-container-h">
                        <div className="history-update">Update Date</div>
                        <div className="history-change">Change Type</div>
                        <div className="history-new-old">Old</div>
                        <div className="history-new-old">New</div>
                        <div className="history-category">Category</div>
                        <div className="history-user">User</div>
                      </div>
                    </div>
                    <div >
                    {contract.changes.map(
                      (change) =>
                        change.action == 1 && (
                          <Link
                            to={{
                              pathname: "/amendment-print",
                            }}
                            state={{
                              contract: contract,
                              changes: change,
                            }}
                          >
                            <div className="card-body">
                              <div className="grid-container-h-items">
                                <div className="history-update">
                                  <div>
                                    {change.timestamp.toString().slice(0, 10)}
                                  </div>
                                  <div>{time(change.timestamp)}</div>
                                </div>
                                <div className="history-change">
                                  {change.changes.map((changeData) =>
                                    Object.entries(changeData).map((name) => (
                                      <div>{name[0]}</div>
                                    ))
                                  )}
                                </div>
                                <div className="history-new-old">
                                  {change.changes.map((changeData) =>
                                    Object.entries(changeData).map((name) => (
                                      <div>
                                        {name[0] == "date" ||
                                        name[0] == "valid" ||
                                        name[0] == "activation"
                                          ? name[1][0].toString().slice(0, 10)
                                          : name[1][0]}
                                      </div>
                                    ))
                                  )}
                                </div>
                                <div className="history-new-old">
                                  {change.changes.map((changeData) =>
                                    Object.entries(changeData).map((name) => (
                                      <div>
                                        {name[0] == "date" ||
                                        name[0] == "valid" ||
                                        name[0] == "activation"
                                          ? name[1][0].toString().slice(0, 10)
                                          : name[1][1]}
                                      </div>
                                    ))
                                  )}
                                </div>

                                <div className="history-category">
                                  Personal Info
                                </div>
                                <div className="history-user">
                                  {contract.user.name}
                                </div>
                              </div>
                            </div>
                          </Link>
                        )
                    )}
                  
                    <div>
                      {contractPackage[0] &&
                        contractPackage[0].changes.map(
                          (change, key) =>
                          change.action == 1 && (
                            <Link
                              to={{
                                pathname: "/amendment-print",
                              }}
                              state={{
                                contract: contract,
                                changes: change,
                              }}
                            >
                              <div className="card-body">
                                <div className="grid-container-h-items">
                                  <div className="history-update">
                                    <div>
                                      {change.timestamp.toString().slice(0, 10)}
                                    </div>
                                    <div>{time(change.timestamp)}</div>
                                  </div>
                                  <div className="history-change">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>{name[0]}</div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][0]}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][1]}
                                        </div>
                                      ))
                                    )}
                                  </div>
  
                                  <div className="history-category">
                                    Bandwidth
                                  </div>
                                  <div className="history-user">
                                    {contract.user.name}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        )}
                    </div>
                    <div>
                      {AnttenaPackage[0] &&
                        AnttenaPackage[0].changes.map(
                          (change, key) =>
                          change.action == 1 && (
                            <Link
                              to={{
                                pathname: "/amendment-print",
                              }}
                              state={{
                                contract: contract,
                                changes: change,
                              }}
                            >
                              <div className="card-body">
                                <div className="grid-container-h-items">
                                  <div className="history-update">
                                    <div>
                                      {change.timestamp.toString().slice(0, 10)}
                                    </div>
                                    <div>{time(change.timestamp)}</div>
                                  </div>
                                  <div className="history-change">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>{name[0]}</div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][0]}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][1]}
                                        </div>
                                      ))
                                    )}
                                  </div>
  
                                  <div className="history-category">
                                    Anttena
                                  </div>
                                  <div className="history-user">
                                    {contract.user.name}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        )}
                    </div>
                    <div>
                      {contractOtherService[0] &&
                        contractOtherService[0].changes.map(
                          (change, key) =>
                          change.action == 1 && (
                            <Link
                              to={{
                                pathname: "/amendment-print",
                              }}
                              state={{
                                contract: contract,
                                changes: change,
                              }}
                            >
                              <div className="card-body">
                                <div className="grid-container-h-items">
                                  <div className="history-update">
                                    <div>
                                      {change.timestamp.toString().slice(0, 10)}
                                    </div>
                                    <div>{time(change.timestamp)}</div>
                                  </div>
                                  <div className="history-change">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>{name[0]}</div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][0]}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][1]}
                                        </div>
                                      ))
                                    )}
                                  </div>
  
                                  <div className="history-category">
                                    Other Services
                                  </div>
                                  <div className="history-user">
                                    {contract.user.name}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        )}
                    </div>
                    <div>
                      {RouterPackage[0] &&
                        RouterPackage[0].changes.map(
                          (change, key) =>
                          change.action == 1 && (
                            <Link
                              to={{
                                pathname: "/amendment-print",
                              }}
                              state={{
                                contract: contract,
                                changes: change,
                              }}
                            >
                              <div className="card-body">
                                <div className="grid-container-h-items">
                                  <div className="history-update">
                                    <div>
                                      {change.timestamp.toString().slice(0, 10)}
                                    </div>
                                    <div>{time(change.timestamp)}</div>
                                  </div>
                                  <div className="history-change">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>{name[0]}</div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][0]}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][1]}
                                        </div>
                                      ))
                                    )}
                                  </div>
  
                                  <div className="history-category">
                                    Router
                                  </div>
                                  <div className="history-user">
                                    {contract.user.name}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        )}
                    </div>
                    <div>
                      {contractPayment[0] &&
                        contractPayment[0].changes.map(
                          (change, key) =>
                          change.action == 1 && (
                            <Link
                              to={{
                                pathname: "/amendment-print",
                              }}
                              state={{
                                contract: contract,
                                changes: change,
                              }}
                            >
                              <div className="card-body">
                                <div className="grid-container-h-items">
                                  <div className="history-update">
                                    <div>
                                      {change.timestamp.toString().slice(0, 10)}
                                    </div>
                                    <div>{time(change.timestamp)}</div>
                                  </div>
                                  <div className="history-change">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>{name[0]}</div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][0]}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                  <div className="history-new-old">
                                    {change.changes.map((changeData) =>
                                      Object.entries(changeData).map((name) => (
                                        <div>
                                          {name[0] == "date" ||
                                          name[0] == "valid" ||
                                          name[0] == "activation"
                                            ? name[1][0].toString().slice(0, 10)
                                            : name[1][1]}
                                        </div>
                                      ))
                                    )}
                                  </div>
  
                                  <div className="history-category">
                                    Payment
                                  </div>
                                  <div className="history-user">
                                    {contract.user.name}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        )}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default History;
