import "./cont.css";
import React, { Component } from "react";
import Stepper from "bs-stepper";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export default class NewContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packs: [],
      routers: [],
      antennas: [],
      contract_status: [],
      contract_type: [],
      contract_currency: [],
      con_no: "",
      contract_id: "",
      con_type: "",
      poc_name: "",
      poc_no: "",
      referral: "",
      org: "",
      email: "",
      address: "",
      con_date: "",
      activation: "",
      valid: "",
      status: "",
      note: "",
      band: "",
      band_price: 0,
      antenna: "",
      ann_cond: "",
      ann_ser_no: "",
      ann_quan: "",
      ann_amnt: 0,
      ann_lease_amnt: 0,
      ann_ttl_amnt: "",
      router: "",
      rou_cond: "",
      rou_ser_no: "",
      rou_quan: "",
      rou_amnt: 0,
      rou_lease_amnt: 0,
      rou_ttl_amnt: "",
      ser_type: "No",
      ser_desc: "",
      ser_pay_mtd: "",
      ser_price: 0,
      pay_ttl: 0,
      serv_chrg: 0,
      othr_chrg: 0,
      discount: 0,
      grand_total: 0,
      curren: "",
      sales_agent: "",
      lease_deposit: 0,
      sales_id: 0,
      message: "",
      con_antenna: "",
      con_router: "",
      antenna_price: "",
      con_count: 0,
      submit_state: false
    };

    this.packages_url = process.env.REACT_APP_PACKAGE;
    this.routers_url = process.env.REACT_APP_ROUTER;
    this.antennas_url = process.env.REACT_APP_ANTENNA;
    this.contracts_url = process.env.REACT_APP_NEW_CONTRACT;
    this.user_url = process.env.REACT_APP_USER;
    this.log_url = process.env.REACT_APP_LOG;
    this.contract_status_url = process.env.REACT_APP_CONTRACT_STATUS;
    this.contract_type_url = process.env.REACT_APP_CONTRACT_TYPES;
    this.contract_currency_url = process.env.REACT_APP_CONTRACT_CURRENCY;

    this.token = localStorage.getItem("user").slice(10, -2);

    // this.todaysDate = new Date()
    // console.log(this.todaysDate.toDateString())
    this.today = new Date();

    this.date =
      this.today.getFullYear() +
      1 +
      "-" +
      (this.today.getMonth() + 1) +
      "-" +
      this.today.getDate();
    // var emroz = today.getDate()
    // if (emroz < 10) {
    //     console.log(`0${emroz}`)
    // }
    // console.log(today)

    this.handleChange = this.onChange.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
  }

  // grandTotal = () => {

  //   return pack_price + antenna_price + router_price;
  // };

  onDateChange = (e) => {
    function addOneYear (date){
      const dateCopy = new Date(date)
      dateCopy.setFullYear(dateCopy.getFullYear() + 1)
      dateCopy.setDate(dateCopy.getDate() - 1)
      return dateCopy;
    }
    this.setState({[e.target.name]: e.target.value });
    this.setState(prev => ({...prev, activation: e.target.value, valid: addOneYear(e.target.value).toISOString().slice(0, 10) }))

  }
  onChange = (e) => {
    // console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value });
    
  };

  conPrint = (e) => {
    e.preventDefault();
    console.log("clicked");
    let ddd = document.querySelector("#printSec").innerHTML;
    window.print(ddd);
  };
  

  componentDidMount() {
    document.title = "Mikrogate | New Contract";
    this.stepper1Node = document.querySelector("#stepper1");
    this.stepper = new Stepper(document.querySelector("#stepper1"));

    axios
      .get(this.packages_url + "?available=true", {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const packs = res.data.results;
        this.setState({ packs });
        console.log(res.data.results);
      });

    axios
      .get(this.routers_url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const routers = res.data.results;
        this.setState({ routers });
      });

    axios
      .get(this.antennas_url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const antennas = res.data.results;
        this.setState({ antennas });
      });

    axios
      .get(this.contract_status_url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const contract_status = res.data.results;
        this.setState({ contract_status });
      });

    axios
      .get(this.contract_type_url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const contract_type = res.data.results;
        this.setState({ contract_type });
      });

    axios
      .get(this.contracts_url, {
        headers: {
          Authorization: "Token " + this.token,
        }
      })
      .then((res) => {
          const con_count = res.data.count
          console.log(res.data.count)
          this.setState({ con_count })
      })

    axios
      .get(this.contract_currency_url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const contract_currency = res.data.results;
        this.setState({ contract_currency });
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
        console.log(sales_agent);
      });

    this.setState({ sales_id: this.state.sales_agent.id });
  }

  copyToClip = (e) => {
    // const grandTotal = (model, object) => {
    //   for (let i = 0; i <= model.length; i += 1) {
    //     if (model[i].id == object) {
    //       return model[i].price
    //     }
    //   }
    // }

    // const antenna_p = grandTotal(this.state.antennas, this.state.antenna)

    // this.setState({antenna_price: antenna_p})

    // console.log(this.state.antenna_price)

    let element = document.querySelector("table");
    element.removeAttribute("hidden");
    // let hidden = element.getAttribute("hidden");
    const elTable = document.querySelector("table");

    let range, sel;

    // Ensure that range and selection are supported by the browsers
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      // unselect any element in the page
      sel.removeAllRanges();

      try {
        range.selectNodeContents(elTable);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(elTable);
        sel.addRange(range);
      }

      document.execCommand("copy");
    }

    sel.removeAllRanges();





    console.log(this.grandTotal());
    element.setAttribute("hidden", "hidden");
  };

  contractGenerate = (count) => {
    const now = new Date()
    const year = now.getFullYear().toString().slice(2,4)
    let month = now.getMonth() + 1
        if (month.toString().length == 1){
        month = "0" + month
        } 
    let day = now.getDate().toString()
        if (day.length == 1){
          day = "0" + day
        }

        if(count != 0){
    const dateNumber = year + month + day
    const countNumber = parseInt(count) + 1
    const number = dateNumber + "-" + countNumber

    return number
  }
  }



  onSubmit = async (e) => {

    axios
      .get(this.contracts_url, {
        headers: {
          Authorization: "Token " + this.token,
        }
      })
      .then((res) => {
          const con_count = res.data.count
          console.log(res.data.count)
          this.setState({ con_count })
      })

      this.setState({con_no: this.contractGenerate(this.state.con_count)})

    e.preventDefault();
    const data = new FormData();
    data.append("contract_number", this.contractGenerate(this.state.con_count));
    data.append("contract_type", this.state.con_type);
    data.append("name", this.state.poc_name);
    data.append("contact", this.state.poc_no);
    data.append("contract_id", this.state.contract_id);
    data.append("referral", this.state.referral);
    data.append("organization", this.state.org);
    data.append("email", this.state.email);
    data.append("address", this.state.address);
    if (this.state.con_date != "") {
      data.append("date", new Date(this.state.con_date).toISOString());
    }
    if (this.state.activation != "") {
      data.append("activation", new Date(this.state.activation).toISOString());
    }
    if (this.state.valid != "") {
      data.append("valid", new Date(this.state.valid).toISOString());
    }
    data.append("status", this.state.status);
    data.append("note", this.state.note);

    try {
       const contractResponse = this.state.con_count && await axios({
        url: process.env.REACT_APP_NEW_CONTRACT,
        method: "POST",
        data: data,
        headers: {
          Authorization: "Token " + this.token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(contractResponse);
      NotificationManager.success("Personal Info Added Successfully", "", 2000);
      // this.setState({message: contractResponse.statusText})

      if (this.state.band != "") {
        const contractPackageData = new FormData();
        contractPackageData.append("contract", contractResponse.data.id);
        contractPackageData.append("package", this.state.band);
        contractPackageData.append("price", this.state.band_price);

        try {
          const contractPackage = await axios({
            url: process.env.REACT_APP_CONTRACT_PACKAGE,
            method: "POST",
            data: contractPackageData,
            headers: {
              Authorization: "Token " + this.token,
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(contractPackage);
          NotificationManager.success(
            "Bandwidth Info Added Successfully",
            "",
            2000
          );
        } catch (packageError) {
          console.log(packageError);
          NotificationManager.error(
            "Error Adding Bandwidth Info Please Check Your Data And Try Again",
            "",
            10000
          );
        }
      }

      if (this.state.antenna != "") {
        const contractAntennaData = new FormData();
        contractAntennaData.append("contract", contractResponse.data.id);
        contractAntennaData.append("antenna", this.state.antenna);
        contractAntennaData.append("condition", this.state.ann_cond);
        contractAntennaData.append("serial_number", this.state.ann_ser_no);
        contractAntennaData.append("quantity", this.state.ann_quan);
        contractAntennaData.append("amount", this.state.ann_amnt);
        contractAntennaData.append("lease_amount", this.state.ann_lease_amnt);
        contractAntennaData.append("total_amount", this.state.ann_ttl_amnt);

        try {
          const contractAntenna = await axios({
            url: process.env.REACT_APP_CONTRACT_ANTENNA,
            method: "POST",
            data: contractAntennaData,
            headers: {
              Authorization: "Token " + this.token,
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(contractAntenna);
          NotificationManager.success(
            "Antenna Info Added Successfully",
            "",
            2000
          );
        } catch (antennaError) {
          console.log(antennaError);
          NotificationManager.error(
            "Error Adding Antenna Info Please Check Your Data And Try Again",
            "",
            10000
          );
        }
      }
      if (this.state.router != "") {
        const contractRouterData = new FormData();
        contractRouterData.append("contract", contractResponse.data.id);
        contractRouterData.append("router", this.state.router);
        contractRouterData.append("condition", this.state.rou_cond);
        contractRouterData.append("serial_number", this.state.rou_ser_no);
        contractRouterData.append("quantity", this.state.rou_quan);
        contractRouterData.append("amount", this.state.rou_amnt);
        contractRouterData.append("lease_amount", this.state.rou_lease_amnt);
        contractRouterData.append("total_amount", this.state.rou_ttl_amnt);

        try {
          const contractRouter = await axios({
            url: process.env.REACT_APP_CONTRACT_ROUTER,
            method: "POST",
            data: contractRouterData,
            headers: {
              Authorization: "Token " + this.token,
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(contractRouter);
          NotificationManager.success(
            "Router Info Added Successfully",
            "",
            2000
          );
        } catch (routerError) {
          console.log(routerError);
          NotificationManager.error(
            "Error Adding Router Info Please Check Your Data And Try Again",
            "",
            10000
          );
        }
      }
      if (this.state.ser_type != "No") {
        const contractOtherServiceData = new FormData();
        contractOtherServiceData.append("contract", contractResponse.data.id);
        contractOtherServiceData.append("service_type", this.state.ser_type);
        contractOtherServiceData.append("description", this.state.ser_desc);
        contractOtherServiceData.append(
          "payment_method",
          this.state.ser_pay_mtd
        );
        contractOtherServiceData.append("price", this.state.ser_price);

        try {
          const contractOtherService = await axios({
            url: process.env.REACT_APP_CONTRACT_OTHER_SERVICE,
            method: "POST",
            data: contractOtherServiceData,
            headers: {
              Authorization: "Token " + this.token,
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(contractOtherService);
          NotificationManager.success(
            "Other-Service Info Added Successfully",
            "",
            2000
          );
        } catch (otherServiceError) {
          console.log(otherServiceError);
          NotificationManager.error(
            "Error Adding Other-Service Info Please Check Your Data And Try Again",
            "",
            10000
          );
        }
      }
      const contractPaymentData = new FormData();
      contractPaymentData.append("contract", contractResponse.data.id);
      contractPaymentData.append("payment_total", this.paymentTotal());
      contractPaymentData.append("service_charge", this.state.serv_chrg);
      contractPaymentData.append("other_charges", this.state.othr_chrg);
      contractPaymentData.append("discount", this.state.discount);
      contractPaymentData.append("lease_deposit", this.state.lease_deposit);
      contractPaymentData.append("grand_total", this.grandTotal());
      contractPaymentData.append("currency", this.state.curren);

      try {
        const contractPayment = await axios({
          url: process.env.REACT_APP_CONTRACT_PAYMENT,
          method: "POST",
          data: contractPaymentData,
          headers: {
            Authorization: "Token " + this.token,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(contractPayment);
        NotificationManager.success(
          "Payment Info Added Successfully",
          "",
          2000
        );
      } catch (paymentError) {
        console.log(paymentError);
        NotificationManager.error(
          "Error Adding Payment Data Please Check Your Data And Try Again",
          "",
          10000
        );
      }
      this.setState({submit_state: true})
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        "Error Adding Personal Info Please Check Your Data And Try Again",
        "",
        10000
      );
    }
    // setTimeout(() => {
    //   let element = document.querySelector("#alert");
    //   element.removeAttribute("hidden");
    // }, 3000);
  }; 
  paymentTotal = () => {
    return (
      parseInt(this.state.band_price) +
      parseInt(this.state.rou_amnt) +
      parseInt(this.state.ann_amnt) +
      parseInt(this.state.ser_price)
    );
  };

  grandTotal = () => {
    return (
      parseInt(this.state.band_price) +
      parseInt(this.state.rou_amnt) +
      parseInt(this.state.ann_amnt) +
      parseInt(this.state.ann_lease_amnt) +
      parseInt(this.state.rou_lease_amnt) +
      parseInt(this.state.ser_price) +
      parseInt(this.state.serv_chrg) +
      parseInt(this.state.othr_chrg) -
      this.state.discount
    );
  };

  // grandTotal = () => {
  //   this.state.antennas.map( ant => {if(ant.id == this.state.antenna){return ant.price}})
  // }

  render() {
    return (
      <div>
        <div>
          <table className="copytoclipboard" hidden>
            <thead>
              <tr key={1}>
                <th>contract number</th>
                <th>Contract date</th>
                <th>Activation date</th>
                <th>Validate up to</th>
                <th>Organization</th>
                <th>POC Name</th>
                <th>POC Number</th>
                <th>POC Email</th>
                <th>Add</th>
                <th>Bandwidth</th>
                <th>Monthly BW price</th>
                <th>Antenna</th>
                <th>Antenna Price</th>
                <th>Antenna Possess</th>
                <th>Serial Number</th>
                <th>Lease Amount</th>
                <th>Router</th>
                <th>Router price</th>
                <th>Router Possess</th>
                <th>Installation cost</th>
                <th>IP Public</th>
                <th>IP monthly rent</th>
                <th>Others</th>
                <th>Grant total</th>
                <th>Currency</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr key={2}>
               <td>{this.state.con_no}</td>
                <td>{this.state.con_date}</td>
                <td>{this.state.activation}</td>
               <td>{this.state.valid}</td>
               <td>{this.state.org}</td>
                <td>{this.state.poc_name}</td>
                <td>{this.state.poc_no}</td>
                <td>{this.state.email}</td>
                <td>{this.state.address}</td>
                {" "}
                <td>
                  {this.state.packs.map((p) =>
                    p.id == this.state.band ? p.name : ""
                  )}
                </td>
                {" "}
                <td>
                  {this.state.band_price != 0
                    ? this.state.band_price
                    : this.state.packs.map((pack) =>
                        pack.id == this.state.band ? pack.price : ""
                      )}
                </td>
                {" "}
                <td>
                  {this.state.antennas.map((ann) =>
                    ann.id == this.state.antenna ? ann.name : ""
                  )}
                </td>
               <td>{this.state.ann_amnt}</td>
               <td>{this.state.ann_cond}</td>
               <td>{this.state.ann_ser_no}</td>
               {" "}
               <td>
                  {/* {this.state.antennas.map((ann) =>
                    ann.id == this.state.antenna ? ann.price : ""
                  )} */}
                  {/* {this.state.antennas.map((ant) => {
                    if (ant.id == this.state.antenna) {
                      return ant.price;
                    }
                  })} */}
                  {this.state.ann_lease_amnt}
                </td>
                {" "}
                <td>
                  {this.state.routers.map((rou) =>
                    rou.id == this.state.router ? rou.name : ""
                  )}
                </td>
                {" "}
               <td>
                  {/* {this.state.routers.map((rou) =>
                    rou.id == this.state.router ? rou.price : ""
                  )} */}
                  {this.state.rou_amnt}
                </td>
             <td>
                  {this.state.rou_cond}
                </td>
               <td>{this.state.serv_chrg}</td>
               <td>{this.state.ser_type}</td>
               <td>{this.state.ser_price}</td>
                <td>{this.state.othr_chrg}</td>
                <td>{this.grandTotal()}</td>
                <td>
                  {this.state.contract_currency.map((cur) =>
                    this.state.curren == cur.id ? cur.name : ""
                  )}
                </td>
                <td>{this.state.sales_agent.name}</td>
              </tr>
            </tbody>
          </table>

          {/* <input id="copy_btn" type="button" value="copy" /> */}
        </div>
        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>New Contract</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a>Contracts</a>
                    </li>
                    <li className="breadcrumb-item active">New Contract</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <form
                    onSubmit={this.onSubmit}
                    className="needs-validation"
                    novalidate
                  >
                    <div className="card card-default">
                      <div className="card-header">
                        <h3 className="card-title">Contract Form</h3>
                      </div>
                      <div className="card-body p-0">
                        <div id="stepper1" className="bs-stepper">
                          <div className="bs-stepper-header">
                            {/* <!-- your steps here --> */}
                            <div className="step" data-target="#dates-part">
                              <button
                                type="button"
                                className="step-trigger"
                                role="tab"
                                aria-controls="dates-part"
                                id="dates-part-trigger"
                              >
                                <span className="bs-stepper-circle">
                                  <i className="fa-solid fa-calendar-days"></i>
                                </span>
                                <span className="bs-stepper-label">Dates</span>
                              </button>
                            </div>
                            <div className="line"></div>
                            {/* PERSONAL INFORMATION */}
                            <div className="step" data-target="#personal-part">
                              <button
                                type="button"
                                className="step-trigger"
                                role="tab"
                                aria-controls="personal-part"
                                id="personal-part-trigger"
                              >
                                <span className="bs-stepper-circle">
                                  <i className="fa-solid fa-file-contract nav-icon"></i>
                                </span>
                                <span className="bs-stepper-label">
                                  Personal Info
                                </span>
                              </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#package-part">
                              <button
                                type="button"
                                className="step-trigger"
                                role="tab"
                                aria-controls="package-part"
                                id="package-part-trigger"
                              >
                                <span className="bs-stepper-circle">
                                  <i className="fa-solid fa-box-open nav-icon"></i>
                                </span>
                                <span className="bs-stepper-label">
                                  Package
                                </span>
                              </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#device-part">
                              <button
                                type="button"
                                className="step-trigger"
                                role="tab"
                                aria-controls="device-part"
                                id="device-part-trigger"
                              >
                                <span className="bs-stepper-circle">
                                  <i className="fa-solid fa-router nav-icon"></i>
                                </span>
                                <span className="bs-stepper-label">Device</span>
                              </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#other-part">
                              <button
                                type="button"
                                className="step-trigger"
                                role="tab"
                                aria-controls="other-part"
                                id="other-part-trigger"
                              >
                                <span className="bs-stepper-circle">
                                  <i className="fa-solid fa-ellipsis"></i>
                                </span>
                                <span className="bs-stepper-label">
                                  Other Service
                                </span>
                              </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#payment-part">
                              <button
                                type="button"
                                className="step-trigger"
                                role="tab"
                                aria-controls="payment-part"
                                id="payment-part-trigger"
                              >
                                <span className="bs-stepper-circle">
                                  <i className="fa-solid fa-sack-dollar"></i>
                                </span>
                                <span className="bs-stepper-label">
                                  Payment
                                </span>
                              </button>
                            </div>
                            <div className="line"></div>

                            <div className="step" data-target="#summary-part">
                              <button
                                type="button"
                                className="step-trigger"
                                role="tab"
                                aria-controls="summary-part"
                                id="summary-part-trigger"
                              >
                                <span className="bs-stepper-circle">
                                  <i className="fa-solid fa-ballot-check"></i>
                                </span>
                                <span className="bs-stepper-label">
                                  Summary
                                </span>
                              </button>
                            </div>
                          </div>

                          <div className="bs-stepper-content">
                            <div className="col-2 mx-auto marginLeft">
                              <i
                                class="fa-solid fa-angle-left fa-angle-left-m callout-info"
                                onClick={() => this.stepper.previous()}
                              ></i>
                              <i
                                className="fa-solid fa-angle-right fa-angle-left-m callout-info"
                                onClick={() => this.stepper.next()}
                              ></i>
                            </div>
                            {/* <form> */}
                            <div
                              id="personal-part"
                              className="content"
                              role="tabpanel"
                              aria-labelledby="personal-part-trigger"
                            >
                              <div className="form-group">
                                <div className="row">
                                  {/* <!-- left column --> */}
                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- /.card-header --> */}
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-6">
                                            {/* <div className="form-group">
                                              <label htmlFor="contractNumber">
                                                Contract Number
                                              </label>
                                              <input
                                                type="text"
                                                name="con_no"
                                                className="form-control is-invalid"
                                                id="contractNumber"
                                                placeholder="eg: 123456-7890"
                                                // value={this.state.con_no}
                                                value={this.state.con_no}
                                                onChange={this.onChange}
                                              />
                                            </div> */}
                                          </div>
                                          <div className="col-12">
                                            <div className="form-group">
                                              <label htmlFor="contract_id">
                                                ID
                                              </label>
                                              <input
                                                type="text"
                                                name="contract_id"
                                                className="form-control"
                                                id="contract_id"
                                                placeholder="eg: IDxxxx"
                                                value={this.state.contract_id}
                                                onChange={this.onChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="conType">
                                            Contract Type
                                          </label>
                                          <select
                                            className="form-control is-invalid"
                                            id="conType"
                                            name="con_type"
                                            value={this.state.con_type}
                                            placeholder="eg: Individual"
                                            onChange={this.onChange}
                                            required
                                          >
                                            <option value="">Select</option>
                                            {this.state.contract_type.map(
                                              (item) => (
                                                <option value={item.id}>
                                                  {item.name}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="nameLastname">
                                            Name / Lastname
                                          </label>
                                          <input
                                            type="text"
                                            name="poc_name"
                                            className="form-control is-invalid"
                                            id="nameLastname"
                                            placeholder="eg: John, Doe"
                                            value={this.state.poc_name}
                                            onChange={this.onChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="contact">
                                            Phone / Mobile
                                          </label>
                                          <input
                                            type="text"
                                            name="poc_no"
                                            className="form-control is-invalid"
                                            id="contact"
                                            placeholder="eg: 07xx-xxx-xxx"
                                            value={this.state.poc_no}
                                            onChange={this.onChange}
                                            required
                                          />
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column */}

                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- /.card-header --> */}
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="referral">
                                            Referral
                                          </label>
                                          <input
                                            type="text"
                                            name="referral"
                                            className="form-control"
                                            id="referral"
                                            placeholder="eg: ID1234"
                                            value={this.state.referral}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="org">
                                            Organization
                                          </label>
                                          <input
                                            type="text"
                                            name="org"
                                            className="form-control"
                                            id="org"
                                            placeholder="eg: xyz.co"
                                            value={this.state.org}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="email">email</label>
                                          <input
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="eg: johndoe@email.com"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="address">
                                            Address
                                          </label>
                                          <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            id="address"
                                            placeholder="eg: 4455 Landing Lange, APT 4"
                                            value={this.state.address}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column End */}
                                </div>
                              </div>
                              {/* <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.previous()}
                              >
                                Previous
                              </button>
                              <span>&nbsp;</span>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.next()}
                              >
                                Next
                              </button> */}
                            </div>
                            {/* END OF PERSONAL PART */}

                            {/* PACKAGE PART START */}
                            <div
                              id="package-part"
                              className="content"
                              role="tabpanel"
                              aria-labelledby="package-part-trigger"
                            >
                              <div className="form-group">
                                <div className="row">
                                  {/* <!-- left column --> */}
                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="conType">
                                            Choose Bandwidth
                                          </label>
                                          <select
                                            className="form-control is-invalid"
                                            id="conType"
                                            name="band"
                                            onChange={this.onChange}
                                            required
                                          >
                                            <option value="">Select</option>
                                            {this.state.packs.map((pak) => (
                                              <option value={pak.id}>
                                                {pak.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column */}

                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="pprice">Price</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="pprice"
                                            name="band_price"
                                            value={this.state.band_price}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column End */}
                                </div>
                              </div>
                              {/* <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.previous()}
                              >
                                Previous
                              </button>
                              <span>&nbsp;</span>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.next()}
                              >
                                Next
                              </button> */}
                            </div>
                            {/* END OF PACKAGE PART */}
                            {/* DEVICE SECTION */}
                            <div
                              id="device-part"
                              className="content"
                              role="tabpanel"
                              aria-labelledby="device-part-trigger"
                            >
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="card card-primary">
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="annName">
                                            Antenna
                                          </label>
                                          <select
                                            className="form-control"
                                            id="annName"
                                            name="antenna"
                                            onChange={this.onChange}
                                          >
                                            <option selected>Select</option>
                                            {this.state.antennas.map((item) => (
                                              <option value={item.id}>
                                                {item.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="annCond">
                                            Antenna Condition
                                          </label>
                                          <select
                                            className="form-control"
                                            id="annName"
                                            name="ann_cond"
                                            value={this.state.ann_cond}
                                            onChange={this.onChange}
                                          >
                                            <option value="" selected>
                                              Select
                                            </option>
                                            <option value="Sold">Sold</option>
                                            <option value="Lease">Lease</option>
                                            <option value="Test">Test</option>
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="ann_desc">
                                            Serial Number
                                          </label>
                                          <input
                                            type="text"
                                            name="ann_ser_no"
                                            className="form-control"
                                            id="ann_desc"
                                            placeholder="eg: AD020B761D99"
                                            value={this.state.ann_ser_no}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="card card-primary">
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="annQnt">
                                            Quantity
                                          </label>
                                          <input
                                            type="number"
                                            name="ann_quan"
                                            className="form-control"
                                            id="annQnt"
                                            placeholder="0"
                                            value={this.state.ann_quan}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="row">
                                          <div className="col">
                                            <div className="form-group">
                                              <label htmlFor="annAmnt">
                                                Amount
                                              </label>
                                              <input
                                                type="text"
                                                name="ann_amnt"
                                                className="form-control"
                                                id="annAmnt"
                                                placeholder="0"
                                                value={this.state.ann_amnt}
                                                onChange={this.onChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col">
                                            <div className="form-group">
                                              <label htmlFor="annAmnt">
                                                Lease Amount
                                              </label>
                                              <input
                                                type="text"
                                                name="ann_lease_amnt"
                                                className="form-control"
                                                id="annAmnt"
                                                placeholder="0"
                                                value={
                                                  this.state.ann_lease_amnt
                                                }
                                                onChange={this.onChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="annTtlAmnt">
                                            Total Amount
                                          </label>
                                          <input
                                            type="text"
                                            name="ann_ttl_amnt"
                                            className="form-control"
                                            id="annTtlAmnt"
                                            placeholder="0"
                                            value={
                                              parseInt(
                                                this.state.ann_lease_amnt
                                              ) + parseInt(this.state.ann_amnt)
                                            }
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="card card-primary">
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="rouName">
                                            Router
                                          </label>
                                          <select
                                            className="form-control"
                                            id="rouName"
                                            name="router"
                                            value={this.state.router}
                                            onChange={this.onChange}
                                          >
                                            <option selected>Select</option>
                                            {this.state.routers.map((item) => (
                                              <option value={item.id}>
                                                {item.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="rouCond">
                                            Router Condition
                                          </label>
                                          <select
                                            className="form-control"
                                            id="rouName"
                                            name="rou_cond"
                                            value={this.state.rou_cond}
                                            onChange={this.onChange}
                                          >
                                            <option value="" selected>
                                              Select
                                            </option>
                                            <option value="Sold">Sold</option>
                                            <option value="Lease">Lease</option>
                                            <option value="Test">Test</option>
                                          </select>
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="rou_desc">
                                            Serial Number
                                          </label>
                                          <input
                                            type="text"
                                            name="rou_ser_no"
                                            className="form-control"
                                            id="rou_desc"
                                            placeholder="eg: AD020B761D99"
                                            value={this.state.rou_ser_no}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="card card-primary">
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="rouQnt">
                                            Quantity
                                          </label>
                                          <input
                                            type="number"
                                            name="rou_quan"
                                            className="form-control"
                                            id="rouQnt"
                                            placeholder="0"
                                            value={this.state.rou_quan}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="row">
                                          <div className="col">
                                            <div className="form-group">
                                              <label htmlFor="rouAmnt">
                                                Amount
                                              </label>
                                              <input
                                                type="text"
                                                name="rou_amnt"
                                                className="form-control"
                                                id="rouAmnt"
                                                placeholder="0"
                                                value={this.state.rou_amnt}
                                                onChange={this.onChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col">
                                            <div className="form-group">
                                              <label htmlFor="rouAmnt">
                                                Lease Amount
                                              </label>
                                              <input
                                                type="text"
                                                name="rou_lease_amnt"
                                                className="form-control"
                                                id="rouAmnt"
                                                placeholder="0"
                                                value={
                                                  this.state.rou_lease_amnt
                                                }
                                                onChange={this.onChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="rouTtlAmnt">
                                            Total Amount
                                          </label>
                                          <input
                                            type="text"
                                            name="rou_ttl_amnt"
                                            className="form-control"
                                            id="rouTtlAmnt"
                                            placeholder="0"
                                            value={
                                              parseInt(
                                                this.state.rou_lease_amnt
                                              ) + parseInt(this.state.rou_amnt)
                                            }
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.previous()}
                              >
                                Previous
                              </button>
                              <span>&nbsp;</span>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.next()}
                              >
                                Next
                              </button> */}
                            </div>
                            {/* END DEVICE SECTION */}
                            {/* OTHER SERVICE START */}
                            <div
                              id="other-part"
                              className="content"
                              role="tabpanel"
                              aria-labelledby="other-part-trigger"
                            >
                              <div className="form-group">
                                <div className="row">
                                  {/* <!-- left column --> */}
                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="serviceType">
                                            Service Type
                                          </label>
                                          <input
                                            type="text"
                                            name="ser_type"
                                            className="form-control"
                                            id="serviceType"
                                            value={this.state.ser_type}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="service_desc">
                                            Description
                                          </label>
                                          <input
                                            type="text"
                                            name="ser_desc"
                                            className="form-control"
                                            id="service_desc"
                                            value={this.state.ser_desc}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column */}

                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="pay_mtd">
                                            Payment Method
                                          </label>
                                          <input
                                            type="text"
                                            name="ser_pay_mtd"
                                            className="form-control"
                                            id="pay_mtd"
                                            value={this.state.ser_pay_mtd}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="service_price">
                                            Price
                                          </label>
                                          <input
                                            type="text"
                                            name="ser_price"
                                            className="form-control"
                                            id="service_price"
                                            value={this.state.ser_price}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column End */}
                                </div>
                              </div>
                              {/* <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.previous()}
                              >
                                Previous
                              </button>
                              <span>&nbsp;</span>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.next()}
                              >
                                Next
                              </button> */}
                            </div>
                            {/* OTHER SERVICE END */}
                            {/* PAYMENT SECTION START */}
                            <div
                              id="payment-part"
                              className="content"
                              role="tabpanel"
                              aria-labelledby="payment-part-trigger"
                            >
                              <div className="form-group">
                                <div className="row">
                                  {/* <!-- left column --> */}
                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="pay_total">
                                            Payment Total
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="pay_total"
                                            name="pay_ttl"
                                            value={this.paymentTotal()}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="service_charge">
                                            Service Charge
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="service_charge"
                                            name="serv_chrg"
                                            value={this.state.serv_chrg}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="other_charges">
                                            Other Charges
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="other_charges"
                                            name="othr_chrg"
                                            value={this.state.othr_chrg}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column */}

                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="discount">
                                            Discount
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="discount"
                                            name="discount"
                                            value={this.state.discount}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="row">
                                          <div className="col-8">
                                            <div className="form-group">
                                              <label htmlFor="grand_total">
                                                Grand Total
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="grand_total"
                                                name="grand_total"
                                                value={this.grandTotal()}
                                                onChange={this.onChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-4">
                                            <div className="form-group">
                                              <label htmlFor="grand_total">
                                                Currency
                                              </label>
                                              <select
                                                name="curren"
                                                id=""
                                                className="form-control is-invalid"
                                                onChange={this.onChange}
                                                required
                                              >
                                                <option value="">Select</option>
                                                {this.state.contract_currency.map(
                                                  (item) => (
                                                    <option value={item.id}>
                                                      {item.name}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="form-group">
                                          <label htmlFor="lease_deposit">
                                            Lease Deposit
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="lease_deposit"
                                            name="lease_deposit"
                                            value={this.state.lease_deposit}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column End */}
                                </div>
                              </div>
                              {/* <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.previous()}
                              >
                                Previous
                              </button>
                              <span>&nbsp;</span>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.next()}
                              >
                                Next
                              </button> */}
                            </div>
                            {/* PAYMENT SECTION END */}

                            {/* DATES SECTION START */}
                            <div
                              id="dates-part"
                              className="content"
                              role="tabpanel"
                              aria-labelledby="dates-part-trigger"
                            >
                              <div className="form-group">
                                <div className="row">
                                  {/* <!-- left column --> */}
                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="con_date">
                                            Contract Date
                                          </label>
                                          <input
                                            type="date"
                                            className="form-control is-invalid"
                                            id="con_date"
                                            name="con_date"
                                            onChange={this.onDateChange}
                                            required
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="activation">
                                            Activation Date
                                          </label>
                                          <input
                                            type="date"
                                            className="form-control is-invalid"
                                            id="activation"
                                            name="activation"
                                            onChange={this.onChange}
                                            defaultValue={this.state.activation}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="valid">
                                            Valid Upto
                                          </label>
                                          <input
                                            type="date"
                                            className="form-control is-invalid"
                                            id="valid"
                                            name="valid"
                                            onChange={this.onChange}
                                            defaultValue={this.state.valid}
                                            required
                                          />
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column */}

                                  <div className="col-md-6">
                                    {/* <!-- general form elements --> */}
                                    <div className="card card-primary">
                                      {/* <!-- form start --> */}
                                      <div className="card-body">
                                        <div className="form-group">
                                          <label htmlFor="status">Status</label>
                                          <select
                                            className="form-control is-invalid"
                                            name="status"
                                            id="status"
                                            onChange={this.onChange}
                                            required
                                          >
                                            <option value="">Select</option>
                                            {this.state.contract_status.map(
                                              (item) => (
                                                <option value={item.id}>
                                                  {item.name}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>

                                        <div className="form-group">
                                          <label htmlFor="note">Note</label>
                                          <textarea
                                            className="form-control"
                                            name="note"
                                            id="note"
                                            rows="5"
                                            onChange={this.onChange}
                                          ></textarea>
                                        </div>
                                      </div>
                                      {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                  </div>

                                  {/* Second Column End */}
                                </div>
                              </div>
                              {/* <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.stepper.next()}
                              >
                                Next
                              </button> */}
                            </div>
                            {/* DATES SECTION END */}

                            {/* SUMMARY SECTION START */}
                            <div
                              id="summary-part"
                              className="content"
                              role="tabpanel"
                              aria-labelledby="summary-part-trigger"
                            >
                              {/* TEST INVOICE */}

                              <div className="callout callout-info">
                                <h5>
                                  <i className="fas fa-info"></i> Note:
                                </h5>
                                This page has been enhanced for printing. Click
                                the print button at the bottom of the contract
                                to test.
                              </div>

                              {/* <!-- Main content --> */}
                              <section className="invoice pad" id="printSec">
                                {/* <div className="row">
                                  <div className="col-12">
                                    <h1>
                                      <b>INTERNET</b>
                                    </h1>
                                  </div>
                                </div> */}
                                {/* <div className="row">
                                  <div className="col-12">
                                    <h1 style={{ color: "#34c0eb" }}>
                                      CONTRACT FROM
                                    </h1>
                                    <br />
                                    <br />
                                  </div>
                                </div> */}
                                {/* <!-- info row --> */}
                                <div className="row invoice-info mt-5">
                                  <div className="col-sm-2 invoice-col hit">
                                    <address>
                                      Contract Number
                                      <br />
                                      Contract Date
                                      <br />
                                      Activation Date
                                      <br />
                                      Valid up to
                                      <br />
                                      Organization
                                      <br />
                                      POC
                                      <br />
                                      POC Number
                                      <br />
                                      POC email
                                      <br />
                                      Address
                                      <br />
                                      Bandwidth Price/M
                                      <br />
                                      Bandwidth
                                      <br />
                                    </address>
                                  </div>
                                  {/* <!-- /.col --> */}
                                  <div className="col-sm-5 invoice-col hit">
                                    <address>
                                      {this.state.con_no}
                                      <br />
                                      {this.state.con_date}
                                      <br />
                                      {this.state.activation}
                                      <br />
                                      {this.state.valid}
                                      <br />
                                      {this.state.org}
                                      <br />
                                      {this.state.poc_name}
                                      <br />
                                      {this.state.poc_no}
                                      <br />
                                      {this.state.email}
                                      <br />
                                      {this.state.address}
                                      <br />
                                      {this.state.band_price}
                                      <br />
                                      {this.state.packs.map((p) =>
                                        p.id == this.state.band ? p.name : ""
                                      )}
                                      <br />
                                    </address>
                                  </div>
                                  {/* <!-- /.col --> */}
                                  {/* col */}
                                  <div className="col-sm-2 invoice-col hit">
                                    <address>
                                      IP Public
                                      <br />
                                      IP Rent/Monthly
                                      <br />
                                      Others
                                      <br />
                                      Grand Total
                                      <br />
                                      <br />
                                      Sales
                                      <br />
                                      <b>Sales Signature Stamp</b>
                                      <br />
                                      <div className="sales-stamp"></div>
                                    </address>
                                  </div>
                                  <div className="col-sm-3 invoice-col hit">
                                    <address>
                                      {this.state.ser_type}
                                      <br />
                                      {this.state.ser_price}
                                      <br />
                                      {this.state.othr_chrg}
                                      <br />
                                      {this.grandTotal()}&nbsp;&nbsp;
                                      {this.state.contract_currency.map((cur) =>
                                        this.state.curren == cur.id
                                          ? cur.name
                                          : ""
                                      )}
                                      <br />
                                      <br />
                                      {this.state.sales_agent.name}
                                    </address>
                                  </div>
                                </div>
                                {/* <!-- /.row --> */}

                                {/* device row */}

                                <div className="row invoice-info">
                                  <div className="col-sm-2 invoice-col hit">
                                    Antenna
                                    <br />
                                    Antenna Price
                                    <br />
                                    Router
                                    <br />
                                    Router Price
                                    <br />
                                    Installation Cost
                                  </div>
                                  <div className="col-sm-5 invoice-col hit">
                                    {this.state.antennas.map((ann) =>
                                      ann.id == this.state.antenna
                                        ? ann.name
                                        : ""
                                    )}
                                    &nbsp;&nbsp;&nbsp;{this.state.ann_cond}
                                    <br />
                                    {this.state.ann_amnt}
                                    <br />
                                    {this.state.routers.map((rou) =>
                                      rou.id == this.state.router
                                        ? rou.name
                                        : ""
                                    )}
                                    &nbsp;&nbsp;&nbsp;{this.state.rou_cond}
                                    <br />
                                    {this.state.rou_amnt}
                                    <br />
                                    {this.state.serv_chrg}
                                  </div>
                                  <div className="col-sm-2 invoice-col hit">
                                    Antenna Serial No
                                    <br />
                                    Antenna Lease
                                    <br />
                                    Router Serial No
                                    <br />
                                    Router Lease Amount
                                  </div>
                                  <div className="col-sm-3 invoice-col hit">
                                    {this.state.ann_ser_no}
                                    <br />
                                    {this.state.ann_lease_amnt}
                                    <br />
                                    {this.state.rou_ser_no}
                                    <br />
                                    {this.state.rou_lease_amnt}
                                  </div>
                                </div>

                                {/* end device row */}
                                <div className="row invoice-info">
                                  <div className="col-sm-12 cus-sign">
                                    <br />
                                    <br />
                                    <b>Customer Signature Stamp</b>
                                    <div className="customer-stamp"></div>
                                  </div>
                                </div>

                                {/* <div className="row sales-footer">
                                  <div className="col-4 sales">
                                          پشتیبانی فنی
                                          <br />
                                          <i className="fa-solid fa-user-headset" style={{fontSize: "50px"}}></i>
                                   
                                  
                                        <div>
                                          <br />
                                          0786 72 24 24
                                          <br />
                                          0796 72 242 4
                                          <br />
                                          0799 53 24 24
                                        </div>
                                  </div>
                                  <div className="col-4 finance">
                                    <b>
                                      بخش مالی
                                      <br />
                                      0796 18 26 26
                                      <br />
                                      0786 72 26 26
                                    </b>
                                  </div>
                                  <div className="col-4 support">
                                    <b>
                                      بخش فروشات
                                      <br />
                                      0786 72 25 25
                                      <br />
                                      0799 35 26 76
                                    </b>
                                  </div>
                                </div> */}
                              </section>

                              {/* END TEST INVOICE */}
                              <div
                                class="alert alert-success alert-dismissible"
                                id="alert"
                                hidden
                              >
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="alert"
                                  aria-hidden="true"
                                >
                                  &times;
                                </button>
                                <h5>
                                  <i className="icon fas fa-check"></i> Message!
                                </h5>
                                {this.state.message}
                              </div>
                              <div
                                class="alert alert-danger alert-dismissible"
                                id="alert"
                                hidden
                              >
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="alert"
                                  aria-hidden="true"
                                >
                                  &times;
                                </button>
                                <h5>
                                  <i className="icon fas fa-times"></i> Alert!
                                </h5>
                                {this.state.message}
                              </div>

                              <div className="row no-print mt-5">
                                <div className="col-12">
                                  {/* <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => this.stepper.previous()}
                                  >
                                    Previous
                                  </button> */}
                                  <input
                                    type="submit"
                                    className={this.state.submit_state == false ? "btn btn-success float-right" : "btn float-right disabledbutton"}
                                    value="Submit"
                                  />
                                  {/* <i className="far fa-credit-card"></i> */}
                                  <button
                                    type="button"
                                    className={this.state.con_no == "" ? "btn btn-default float-right disabled" : "btn btn-default float-right"}
                                    onClick={this.conPrint}
                                    style={{ marginRight: "5px" }}
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </button>
                                  <button
                                    id="copy_btn"
                                    type="button"
                                    className={this.state.con_no == "" ? "btn btn-default float-right disabled" : "btn btn-default float-right"}
                                    onClick={() => {
                                      this.copyToClip();
                                    }}
                                    style={{ marginRight: "5px" }}
                                  >
                                    <i className="fa-solid fa-copy"></i> Copy
                                  </button>
                                  <button
                                    id="new_btn"
                                    type="button"
                                    className="btn btn-default float-right"
                                    onClick={() => {
                                      this.stepper.reset();
                                    }}
                                    style={{ marginRight: "5px" }}
                                  >
                                    <i className="fa-solid fa-file"></i> New
                                    Contract
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* SUMMARY SECTION END */}
                          </div>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>
                    {/* <!-- /.card --> */}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
