import "../cont.css";
import React, { Component } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import cx from "classnames";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routers: [],
      antennas: [],
      packages: [],
      contracts: [],
      contract_type: [],
      contract_status: [],
      currencies: [],
      log: [],
      users: [],
      data: [],
      contractsPackages: [],
      nextUrl: "",
      previousUrl: "",
      count: "",
      
      contractPackage: [],
      Packages: [],
      contractAntenna: [],
      contractRouter: [],
      contractOtherService: [],
      contractPayment: [],

      id: 0,
      con_no: "",
      con_type: "",
      valid_upto: "",
      contract_id: "",
      contract_date: "",
      activation_date: "",
      poc_name: "",
      poc_number: "",
      referral: "",
      org: "",
      email: null,
      address: "",
      band: "",
      band_price: 0,
      antenna: "",
      ann_cond: "",
      ann_ser_no: "",
      ann_quan: "",
      ann_lease_amnt: 0,
      ann_amnt: 0,
      ann_ttl_amnt: 0,
      router: "",
      rou_cond: "",
      rou_ser_no: "",
      rou_quan: "",
      rou_lease_amnt: 0,
      rou_amnt: 0,
      rou_ttl_amnt: "",
      ser_type: "No",
      ser_desc: "",
      ser_pay_mtd: "",
      ser_price: 0,
      pay_ttl: 0,
      serv_chrg: 0,
      othr_chrg: 0,
      discount: 0,
      lease_deposit: 0,
      note: "",
      grand_total: 0,
      curren: null,
      sales_agent: "",
      status: "",
      changes: "",

      contract: [],

      singleContract: [],
      singlePackage: "",
      singlePackagePrice: "",
      singleAntenna: "",
      singleAntennaCond: "",
      singleAntennaPrice: "",

      contains: [],
      rout: "",
      anten: "",
      package: "",
      query: "",
      date1: "",
      date2: "",
      device_condition: "",
      dateRange: new Date().toDateString(),
      has_router: 3,
      has_antenna: 3,
      created_by: "",
      item: [],
    };

    this.routersUrl = process.env.REACT_APP_ROUTER;
    this.antennasUrl = process.env.REACT_APP_ANTENNA;
    this.packageUrl = process.env.REACT_APP_PACKAGE;
    this.ContractUrl = process.env.REACT_APP_NEW_CONTRACT;
    this.contractTypeUrl = process.env.REACT_APP_CONTRACT_TYPES;
    this.contractStatusUrl = process.env.REACT_APP_CONTRACT_STATUS;
    this.contractPackageURL = process.env.REACT_APP_CONTRACT_PACKAGE;
    this.contractAntennaURL = process.env.REACT_APP_CONTRACT_ANTENNA;
    this.contractRouterURl = process.env.REACT_APP_CONTRACT_ROUTER;
    this.contractPaymentURL = process.env.REACT_APP_CONTRACT_PAYMENT;
    this.contractOtherServiceURL = process.env.REACT_APP_CONTRACT_OTHER_SERVICE;
    this.currencyUrl = process.env.REACT_APP_CONTRACT_CURRENCY;
    this.user_url = process.env.REACT_APP_USER;
    this.users_url = process.env.REACT_APP_USERS;
    this.log_url = process.env.REACT_APP_LOG;
    this.token = localStorage.getItem("user").slice(10, -2);
    this.handleChange = this.onChange.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
    //this.conDate = new Date(this.state.contract_date).toDateString()
    //this.upconda = `${this.conDate.getMonth()}-${this.conDate.getDate()}-${this.conDate.getFullYear()}`
    this.data = [];
  }

  handleSelect(ranges) {
    return {
      selection: {
        startDate: [new Date()],
        endDate: [new Date()],
      },
    };
  }



 
  componentDidMount() {
    // this.getData()
    // if (!this.state.Packages){
    //   this.getData().then(data => this.setState({Packages:data}))
    //                 .catch(err => console.log(err))
    // }
    //  axios({
    //   url: this.contractPackageURL,
    //   method: "GET",
    //   headers: {
    //     Authorization: "Token " + this.token,
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => {
    //   const packages = res.data.results;
    //   this.setState({ packages });
    //   this.setState({ packages: packages });
    //   this.setState({ count: res.data.count });
    //   this.setState({ nextUrl: res.data.next });
    //   this.setState({ previousUrl: res.data.previous });
    // });

      axios({
          method: "GET",
          url: this.contractPackageURL,
          // data: data,
          headers: {
            Authorization: "Token " + this.token,
            "Content-Type": "application/json",
          }}).then((res) => {
          const contractsPackages = res.data.results;
          this.setState({ contractsPackages });
          this.setState({ count: res.data.count });
          this.setState({ nextUrl: res.data.next });
          this.setState({ previousUrl: res.data.previous });

          for (let i = 2; i <= Math.ceil(res.data.count / 100) ; i++){
            axios({
              method: "GET",
              url: this.contractPackageURL + `?page=${i}`,
              headers: {
                Authorization: "Token " + this.token,
                "Content-Type": "application/json",
              }
            }).then((res)=>{
              const contractsPackages2 = res.data.results
              console.log(res)
              this.setState({...contractsPackages.push(...contractsPackages2)})
            })
          }
        });

    axios
      .get(this.user_url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const sales_agent = res.data;
        this.setState({ sales_agent });
      });

    axios
      .get(this.routersUrl, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const routers = res.data.results;
        this.setState({ routers });
      });
    axios
      .get(this.antennasUrl, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const antennas = res.data.results;
        this.setState({ antennas });
      });
    axios
      .get(this.packageUrl, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const packages = res.data.results;
        this.setState({ packages });
      });
    axios
      .get(this.ContractUrl, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const contracts = res.data.results;
        this.setState({ count: res.data.count });
        this.setState({ nextUrl: res.data.next });
        this.setState({ previousUrl: res.data.previous });
        this.setState({ contracts });
      });
    axios
      .get(this.users_url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const users = res.data.results;
        this.setState({ users });
      });
    axios({
      url: this.contractTypeUrl,
      method: "GET",
      headers: {
        Authorization: "Token " + this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const contract_type = res.data.results;
      this.setState({ contract_type });
    });
    axios({
      url: this.contractStatusUrl,
      method: "GET",
      headers: {
        Authorization: "Token " + this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const contract_status = res.data.results;
      this.setState({ contract_status });
    });
    axios({
      url: this.currencyUrl,
      method: "GET",
      headers: {
        Authorization: "Token " + this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const currencies = res.data.results;
      this.setState({ currencies });
    });
  }

  
 

  searchContract = async (e) => {
    e.preventDefault();
    const query = this.state.query;
    const status = this.state.status;
    const start_date =
      this.state.date1 != "" ? new Date(this.state.date1).toISOString() : "";
    const end_date =
      this.state.date2 != "" ? new Date(this.state.date2).toISOString() : "";
    const dev_cond = this.state.device_condition;
    const has_router = parseInt(this.state.has_router);
    const has_antenna = parseInt(this.state.has_antenna);
    const package_type = this.state.package;
    const created_by = this.state.created_by;

    console.log(created_by);

    try {
      await axios({
        method: "GET",
        url: `${this.ContractUrl}?query=${query}&created_by=${created_by}&contract-status=${status}&start_date=${start_date}&end_date=${end_date}`,
        // data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + this.token,
        },
      }).then((res) => {
        const contracts = res.data.results;
        this.setState({ contracts });
        this.setState({ count: res.data.count });
        this.setState({ nextUrl: res.data.next });
        this.setState({ previousUrl: res.data.previous });
      });
    } catch (err) {
      console.log(err);
    }
  };



  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  paginationHandler = (url) => {
    try {
      axios
        .get(url, {
          headers: {
            Authorization: "Token " + this.token,
          },
        })
        .then((res) => {
          const contracts = res.data.results;
          this.setState({ nextUrl: res.data.next });
          this.setState({ previousUrl: res.data.previous });
          this.setState({ contracts: contracts });
        });
    } catch (err) {
      console.log(err);
    }
  };

  grandTotal = () => {
    let packagePrice =
      this.state.contractPackage.length > 0
        ? parseInt(this.state.contractPackage.map((item) => item.price))
        : 0;
    let routerPrice =
      this.state.contractRouter.length > 0
        ? parseInt(this.state.contractRouter.map((item) => item.amount))
        : 0;
    let antennaPrice =
      this.state.contractAntenna.length > 0
        ? parseInt(this.state.contractAntenna.map((item) => item.amount))
        : 0;
    let antennaLeaseAmount =
      this.state.contractAntenna.length > 0
        ? parseInt(this.state.contractAntenna.map((item) => item.Lease_amount))
        : 0;
    let routerLeaseAmount =
      this.state.contractRouter.length > 0
        ? parseInt(this.state.contractRouter.map((item) => item.Lease_amount))
        : 0;
    let otherServicePrice =
      this.state.contractOtherService.length > 0
        ? parseInt(
            this.state.contractPayment.map((item) => item.service_charge)
          )
        : 0;
    let serviceCharge =
      this.state.contractPayment.length > 0
        ? parseInt(
            this.state.contractPayment.map((item) => item.service_charge)
          )
        : 0;
    let otherCharges =
      this.state.contractPayment.length > 0
        ? parseInt(this.state.contractPayment.map((item) => item.other_charges))
        : 0;
    let discount =
      this.state.contractPayment.length > 0
        ? parseInt(this.state.contractPayment.map((item) => item.discount))
        : 0;

    return (
      packagePrice +
      antennaPrice +
      routerPrice +
      antennaLeaseAmount +
      routerLeaseAmount +
      otherServicePrice +
      otherCharges -
      discount
    );
  };

  render() {
    let i = 0;
    var options = [
      { value: "one", label: "One" },
      { value: "two", label: "Two" },
    ];
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
    console.log(this.state.contractsPackages)
    return (
      <div>
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <h2 className="text-center display-4 mb-5 pt-5">
                Search Contracts
              </h2>
              <form onSubmit={this.searchContract} id="searchForm">
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
                              onChange={this.onChange}
                            >
                              <option value="">Any</option>
                              {this.state.users.map((item) => (
                                <option value={item.id}>{item.name}</option>
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
                          >
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label>Order By:</label>
                          <select
                            className="form-control"
                            style={{ width: "100%" }}
                          >
                            <option value="Title">Contract Number</option>
                            <option value="Date">Date</option>
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
                              onChange={this.onChange}
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
                              onChange={this.onChange}
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
                            Selected={this.state.status.id}
                            onChange={this.onChange}
                          >
                            <option value="">Any</option>
                            {this.state.contract_status.map(
                              (item) =>
                                item.id != this.state.status.id && (
                                  <option value={item.id}>{item.name}</option>
                                )
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label>Device Condition</label>
                          <select
                            className="form-control"
                            name="device_condition"
                            style={{ width: "100%" }}
                            onChange={this.onChange}
                          >
                            <option value="">Any</option>
                            <option value="Sold">Sold</option>
                            <option value="Lease">Lease</option>
                            <option value="Test">Test</option>
                          </select>
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
                            onChange={this.onChange}
                          >
                            <option value="">Any</option>

                            {this.state.packages.map((pkg) => (
                              <option value={pkg.name}>{pkg.name}</option>
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
                            onChange={this.onChange}
                          >
                            <option value="">Any</option>
                            {this.state.antennas.map((ann) => (
                              <option value={ann.id}>{ann.name}</option>
                            ))}
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
                            onChange={this.onChange}
                          >
                            <option value="">Any</option>
                            {this.state.routers.map((rou) => (
                              <option value={rou.id}>{rou.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-lg">
                        <input
                          type="search"
                          className="form-control form-control-lg"
                          placeholder="Type your keywords here"
                          name="query"
                          onChange={this.onChange}
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
                      <table className="table projects" id="allcontractstable" >
                        <thead>
                          <tr>
                            <th style={{ width: "1%" }}>#</th>
                            <th>Contract Number</th>
                            <th>
                            <div>ID</div>
                            </th>
                            <th>POC Name</th>
                            <th>POC Number</th>
                            <th>Address</th>
                            <th>
                            <div>Packages</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody >
                          {this.state.contracts.map((contract) => (
                            <tr key={contract.id}>
                              <td>{++i}.</td>
                              <td style={{maxWidth: "10rem"}}>
                                <div style={{maxWidth: "10rem"}}>
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
                                <div style={{ width: "3rem"}}>
                                  {contract.contract_id}
                                </div>
                              </td>
                              <td>
                                <div style={{ width: "5rem"}}>{contract.name}</div>
                              </td>
                              <td >
                                <div style={{width: "6rem"}}>{contract.contact}</div>
                                </td>
                              <td >
                                <div style={{width: "10rem"}}>{contract.address}</div>
                              </td>
                              <td >
                              {this.state.contractsPackages == [] ? <em>Loading...</em> : this.state.contractsPackages.map((item) => (
                                  item.contract == contract.id && (
                                    <div style={{width: "15rem"}}>
                                      {item.package.name}
                                    </div>
                                  )
                                ))}
                              </td>
                              <td
                                className="project-actions text-right"
                                style={{ minWidth: "7rem" }}
                              >
                                <Link
                                  className="btn btn-primary btn-sm mr-1"
                                  to={{
                                    pathname: "/contract-details",
                                  }}
                                  state={{ contract: contract }}
                                >
                                  <i className="fa-solid fa-folder-open"></i>
                                </Link>
                                <Link
                                  className="btn btn-info btn-sm "
                                  to={{
                                    pathname: "/test_print",
                                  }}
                                  state={{ contract: contract }}
                                >
                                  <i className="fa-solid fa-print"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <div className="float-left mt-5 ml-2">
                        <b>Result: {this.state.count}</b>
                      </div>
                      <nav className="Page navigation example mt-5">
                        <ul className="pagination justify-content-center">
                          {this.state.previousUrl && (
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => {
                                  this.paginationHandler(
                                    this.state.previousUrl
                                  );
                                }}
                              >
                                <i className="fa-solid fa-arrow-left-long"></i>{" "}
                                Previous
                              </button>
                            </li>
                          )}
                          {this.state.nextUrl && (
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => {
                                  this.paginationHandler(this.state.nextUrl);
                                }}
                              >
                                Next{" "}
                                <i className="fa-solid fa-arrow-right-long"></i>
                              </button>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
