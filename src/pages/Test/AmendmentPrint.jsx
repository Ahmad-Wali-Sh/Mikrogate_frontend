import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";

const AmendmentPrint = () => {
  const contractPackageURL = process.env.REACT_APP_CONTRACT_PACKAGE;
  const contractAntennaURL = process.env.REACT_APP_CONTRACT_ANTENNA;
  const contractRouterURl = process.env.REACT_APP_CONTRACT_ROUTER;
  const contractPaymentURL = process.env.REACT_APP_CONTRACT_PAYMENT;
  const contractOtherServiceURL = process.env.REACT_APP_CONTRACT_OTHER_SERVICE;

  const [contractPackage, setContractPackage] = useState([]);
  const [contractAntenna, setContractAntenna] = useState([]);
  const [contractRouter, setContractRouter] = useState([]);
  const [contractOtherService, setContractOtherService] = useState([]);
  const [contractPayment, setContractPayment] = useState([]);

  const location = useLocation();
  const contract = location.state?.contract;
  const changes = location.state?.changes

  console.log(changes)

  const token = useContext(Context);

  useEffect(() => {
    axios({
      url: contractPackageURL + `?contract=${contract.id}`,
      method: "GET",
      headers: {
        Authorization: "Token " + token.user.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setContractPackage(res.data.results);
    });
  }, []);

  useEffect(() => {
    axios({
      url: contractAntennaURL + `?contract=${contract.id}`,
      method: "GET",
      headers: {
        Authorization: "Token " + token.user.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setContractAntenna(res.data.results);
    });
  }, []);

  useEffect(() => {
    axios({
      url: contractRouterURl + `?contract=${contract.id}`,
      method: "GET",
      headers: {
        Authorization: "Token " + token.user.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setContractRouter(res.data.results);
    });
  }, []);
  console.log(contractPayment)

  useEffect(() => {
    axios({
      url: contractOtherServiceURL + `?contract=${contract.id}`,
      method: "GET",
      headers: {
        Authorization: "Token " + token.user.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setContractOtherService(res.data.results);
    });
  }, []);

  useEffect(() => {
    axios({
      url: contractPaymentURL + `?contract=${contract.id}`,
      method: "GET",
      headers: {
        Authorization: "Token " + token.user.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setContractPayment(res.data.results);
    });
  }, []);

  const conPrint = (e) => {
    e.preventDefault();
    
    let print_btn = document.querySelector("#print_btn")
    let copy_btn = document.querySelector("#copy_btn")
    copy_btn.setAttribute("hidden", "hidden");
    
    console.log("clicked");
    let ddd = document.querySelector("section");
    window.print(ddd);
    
    copy_btn.removeAttribute("hidden", "hidden")
  };


  const copyToClip = (e) => {
   

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





    element.setAttribute("hidden", "hidden");
  };
  console.log(contractOtherService.map((ip) => ip.service_type))

  function changeUpdate(changed) {
    let res = ""
    changes.changes.map((change)=> (
      Object.entries(change).map((name)=>{
       res = (name[0] == changed ? name[1][0] : "")
      })   
    ))
      return res
  }

  return (
    <div>
      <div className="content-wrapper">
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
              <td>{contract.contract_number}</td>
              <td>{new Date(contract.data).toDateString()}</td>
              <td>
                {contract.activation
                  ? new Date(contract.activation).toDateString()
                  : "/"}
              </td>
              <td>{new Date(contract.valid).toDateString()}</td>
              <td>{contract.organization}</td>
              <td>{contract.name}</td>
              <td>{contract.contact}</td>
              <td>{contract.email}</td>
              <td>{contract.address}</td>{" "}
              <td>{contractPackage.map((item) => item.package.name)}</td>{" "}
              <td>{contractPackage.map((item) => item.price)}</td>{" "}
              <td>
                {contractAntenna.length > 0
                  ? contractAntenna.map((item) => item.antenna.name)
                  : "None"}
              </td>
              <td>
                {contractAntenna.length > 0
                  ? contractAntenna.map((item) => item.amount)
                  : 0}
              </td>
              <td>
                {contractAntenna.length > 0
                  ? contractAntenna.map((item) => item.amount)
                  : 0}
              </td>
              <td>
                {contractAntenna.length > 0
                  ? contractAntenna.map((item) => item.serial_number)
                  : "None"}
              </td>
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
                {contractAntenna.map((item) => item.Lease_amount)}
              </td>
              {" "}
              <td>
                {contractRouter.length > 0
                  ? contractRouter.map((item) => item.router.name)
                  : "None"}
              </td>{" "}
              <td>
                {/* {this.state.routers.map((rou) =>
                    rou.id == this.state.router ? rou.price : ""
                  )} */}
                {contractRouter.length > 0
                  ? contractRouter.map((item) => item.amount)
                  : 0}
              </td>
              <td>{contractRouter.map((item) => item.condition)}</td>
              <td>
                {contractPayment.service_charge > 0
                  ? contractPayment.service_charge
                  : 0}
              </td>
              <td>{contractOtherService.length > 0
                        ? contractOtherService.map((ip) => ip.service_type)
                        : "No"}</td>
              <td>
              {contractOtherService.length > 0
                        ? contractOtherService.map((ip) => ip.price)
                        : 0}
              </td>
              <td>{contractPayment.map((item) => item.other_charges)}</td>
              <td>{contractPayment.map((item) => item.grand_total)} </td>
              <td>{contractPayment.map((item) => item.currency.name)}</td>
              <td>{contract.user.name}</td>
            </tr>
          </tbody>
        </table>
        <div className="content">
          <div>
            <div>
              {/* <!-- Main content --> */}

              <section className="invoice pad" id="printSec">
                {/* <!-- info row --> */}
                <div className="row invoice-info">
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
                      Bandwidth
                      <br />
                      Bandwidth Price/M
                      <br />
                    </address>
                  </div>
                  {/* <!-- /.col --> */}
                  <div className="col-sm-5 invoice-col hit">
                    {changeUpdate("contract_number") || contract.contract_number}
                    <br />
                    {new Date(changeUpdate("date") || contract.date).toDateString()}
                    <br />
                    {contract.activation
                      ? new Date(changeUpdate("activation") || contract.activation).toDateString()
                      : "/"}
                    <br />
                    {new Date(changeUpdate("valid") || contract.valid).toDateString()}
                    <br />
                    {changeUpdate("organization") || contract.organization}
                    <br />
                    {changeUpdate("name") || contract.name}
                    <br />
                    {changeUpdate("contact") || contract.contact}
                    <br />
                    {changeUpdate("email") || contract.email}
                    <br />
                    {changeUpdate("address") || contract.address}
                    <br />
                    {contractPackage.map((item) => item.package.name)}
                    <br />
                    {contractPackage.map((item) => item.price)}
                    <br />
                  </div>
                  {/* <!-- /.col --> */}
                  {/* col */}
                  <div className="col-sm-2 invoice-col hit">
                    <address>
                      Other Services
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
                      {contractOtherService.length > 0
                        ? contractOtherService.map((ip) => ip.service_type)
                        : "No"}
                      <br />
                      {contractOtherService.length > 0
                        ? contractOtherService.map((ip) => ip.price)
                        : 0}
                      <br />
                      {contractPayment.map((item) => item.other_charges)}
                      <br />
                      {contractPayment.map((item) => item.grand_total)}{" "}
                      {contractPayment.map((item) => item.currency.name)}
                      <br />
                      <br />
                      {contract.user.name}
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
                    <div className="row">
                      <div className="col">
                        {contractAntenna.length > 0
                          ? contractAntenna.map((item) => item.antenna.name)
                          : "None"}
                      </div>
                      <div className="col print-form-anttena-price">
                        {contractAntenna.length > 0
                          ? contractAntenna.map((item) => item.amount)
                          : 0}
                      </div>
                    </div>
                    {contractAntenna.length > 0
                      ? contractAntenna.map((item) => item.amount)
                      : 0}
                    <br />
                    <div className="row">
                      <div className="col ">
                        {contractRouter.length > 0
                          ? contractRouter.map((item) => item.router.name)
                          : "None"}
                      </div>
                      <div className="col print-form-router-type">
                        {contractRouter.map((item) => item.condition)}
                      </div>
                    </div>
                    {contractRouter.length > 0
                      ? contractRouter.map((item) => item.amount)
                      : 0}
                    <br />
                    {contractPayment.service_charge > 0
                      ? contractPayment.service_charge
                      : 0}
                  </div>
                  <div className="col-sm-2 invoice-col hit">
                    Antenna-SN
                    <br />
                    Antenna Lease
                    <br />
                    Router-SN
                    <br />
                    Router Lease Amount
                  </div>
                  <div className="col-sm-3 invoice-col hit">
                    {contractAntenna.length > 0
                      ? contractAntenna.map((item) => item.serial_number)
                      : "None"}
                    <br />
                    {contractAntenna.map((item) => item.Lease_amount)}
                    <br />
                    {contractRouter.length > 0
                      ? contractRouter.map((item) => item.serial_number)
                      : "None"}
                    <br />
                    {contractRouter.map((item) => item.Lease_amount)}
                  </div>
                </div>

                <div className="row invoice-info">
                  <div className="col-sm-12 cus-sign">
                    <br />
                    <br />
                    <b>Customer Signature Stamp</b>
                    <div className="customer-stamp"></div>
                  </div>
                </div>
                <button
                  id="copy_btn"
                  type="button"
                  className="btn btn-default float-right"
                  onClick={() => copyToClip()}
                  style={{ marginRight: "1rem" }}
                >
                  <i className="fa-solid fa-copy"></i> Copy
                </button>
                <button
                  id="print-btn"
                  type="button"
                  className="btn btn-default float-right"
                  onClick={(e) => conPrint(e)}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fas fa-print"></i>
                </button>

                {/* end device row */}
              </section>

              {/* END TEST INVOICE */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmendmentPrint;
