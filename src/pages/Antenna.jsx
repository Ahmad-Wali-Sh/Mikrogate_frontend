import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cx from "classnames";
// import $ from 'jquery'

export default class Antenna extends Component {
  constructor(props) {
    super(props);
    this.state = {
      antenna: [],
      annName: "",
      annPrice: "",
      available: false,
      itemName: "",
      itemId: 0,
      itemPrice: 0,
    };
    this.url = process.env.REACT_APP_ANTENNA;
    this.token = localStorage.getItem("user").slice(10, -2);
    // this.rowIndex = 1

    this.handleChange = this.onChange.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleUpdate = this.updatePackage.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const antenna = res.data.results;
        this.setState({ antenna });
        // console.log(antenna)
      });

      // const myModal = document.getElementById('exampleModalCenter')
      // const myInput = document.getElementById('annPrice')

      // myModal.addEventListener('shown.bs.modal', () => {
      //   myInput.focus()
      // })
  }

  onChange = (e) => {
    if (e.target.name == 'available'){
      this.setState({ [e.target.name]: e.target.checked })
    }else {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.available)
  }};

  onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.annName);
    formData.append("price", this.state.annPrice);
    formData.append("available", this.state.available);

    try {
      await axios({
        method: "POST",
        url: this.url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + this.token,
        },
      });
      window.location.replace('/antenna')
    } catch (err) {
      console.log(err);
    }
  };

  updateState = (id, name, price) => {
    this.setState({ itemId: id });
    this.setState({ itemName: name });
    this.setState({ itemPrice: price });
  };

  updatePackage = async (e) => {
    const formData = new FormData();
    formData.append("name", this.state.itemName);
    formData.append("price", this.state.itemPrice);

    try {
      await axios({
        method: "PATCH",
        url: this.url + `${this.state.itemId}/`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + this.token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  deletePackage = async () => {
    const id = this.state.itemId;

    try {
      await axios({
        method: "DELETE",
        url: this.url + id,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + this.token,
        },
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload(false);
  };

  render() {
    let rowIndex = 1
    return (
      <div>
        <div className="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">{/* <h1>Device Form</h1> */}</div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li class="breadcrumb-item active">Antenna</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>
          <section className="content">
            <div className="container-fluid">
              {/* <div className="row">
                  <div className="col-10 offset-md-1">
                  <div className="card card-default">
                  <div className="card-header">
                    <h3 className="card-title">Add New Package</h3>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="devName">Package Name</label>
                            <input
                              type="text"
                              name="annName"
                              id="annName"
                              className="form-control"
                              placeholder="eg: TPLink WR-840"
                              onChange={this.onChange}
                            />
                          </div>
                          <div
                            className="form-group clearfix"
                            onChange={this.onChange}
                          >
                            <label htmlFor="packAvailable">Available</label>
                            <div id="packAvailable">
                              <div className="icheck-success d-inline">
                                <input
                                  type="radio"
                                  name="available"
                                  id="radioDanger1"
                                  value="true"
                                  checked
                                />
                                <label htmlFor="radioDanger1">
                                  YES&nbsp;&nbsp;&nbsp;
                                </label>
                              </div>
                              <div className="icheck-danger d-inline">
                                <input
                                  type="radio"
                                  name="available"
                                  id="radioDanger2"
                                  value="false"
                                />
                                <label htmlFor="radioDanger2">NO</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="devPrice">Price</label>
                            <input
                              type="text"
                              name="annPrice"
                              id="annPrice"
                              className="form-control"
                              onChange={this.onChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="btnAction">Actions</label>
                            <input
                              type="submit"
                              id="btnAction"
                              className="btn btn-success form-control"
                              value="Submit"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                  </div>
                </div> */}

              {/* Package ADD MODAL */}

              <div className="row">
                <form className="form" onSubmit={this.onSubmit}>
                  <div
                    className="modal fade"
                    id="PackageAddModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="PackageAddModalTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="PackageAddModalTitle">
                            Add New Antenna Details
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="form-group">
                              <div className="col">
                                <label htmlFor="annName">Name</label>
                                <input
                                  type="text"
                                  name="annName"
                                  id="annName"
                                  className="form-control"
                                  placeholder="eg: SXTsq 5 High Power"
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <div className="col">
                                <label htmlFor="annPrice">Price</label>
                                <input
                                  type="number"
                                  name="annPrice"
                                  id="annPrice"
                                  className="form-control border border-secondary"
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <div className="col">
                                <input
                                  class="form-check-input ml-2 border border-primary"
                                  type="checkbox"
                                  id="available"
                                  name="available"
                                  defaultChecked={this.state.available}
                                  onChange={this.onChange}
                                />
                                <label
                                  class="form-check-label ml-5"
                                  for="available"
                                >
                                  Available
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          {/* <p name="message">Added Success</p> */}
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            data-id=""
                            type="submit"
                            className="btn btn-success"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* END Package ADD */}

              <div className="row">
                <div className="col-10 offset-md-1">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Database Stored Antennas</h3>
                      <button
                        className="btn btn-success float-right"
                        data-bs-toggle="modal"
                        data-bs-target="#PackageAddModal"
                      >
                        <i className="fa-solid fa-plus-large"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <table id="example1" className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Antenna Name</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.antenna.map((r) => (
                            <tr key={r.id}>
                              <td>{rowIndex++}</td>
                              <td>{r.name}</td>
                              <td>{r.price}</td>
                              {/* <td>
                                <i
                                  className={cx({
                                    "fa-solid fa-check": r.available == true,
                                    "fa-solid fa-times": r.available == false,
                                  })}
                                ></i>
                              </td> */}
                              <td className="project-actions text-right">
                                <button
                                  type="button"
                                  name="itemName"
                                  className="btn btn-info btn-sm mr-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#PackageUpdateModal"
                                  onClick={() => {
                                    this.updateState(r.id, r.name, r.price);
                                  }}
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </button>
                                {/* <button
                                  type="button"
                                  name="itemName"
                                  className="btn btn-danger btn-sm"
                                  // data-toggle="modal"
                                  // data-target="#exampleModalCenter"
                                  data-bs-toggle="modal" data-bs-target="#exampleModalCenter"
                                  onClick={() => {
                                    this.updateState(r.id, r.name, r.price);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </button> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div
                        className="modal fade"
                        id="exampleModalCenter"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalCenterTitle"
                              >
                                Delete Antenna Details
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              Are you sure you want to delete &ldquo;
                              {this.state.itemName} &rdquo;&nbsp;?
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                // data-dismiss="modal"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Close
                              </button>
                              <button
                                onClick={() => {
                                  this.deletePackage();
                                }}
                                data-id=""
                                type="button"
                                className="btn btn-danger confirm-delete"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* UPDATE Package DETAILS */}

                      <form className="form" onSubmit={this.updatePackage}>
                        <div
                          className="modal fade"
                          id="PackageUpdateModal"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="PackageUpdateModalTitle"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="PackageUpdateModalTitle"
                                >
                                  Update Antenna Details
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="row">
                                  <div className="form-group">
                                    <div className="col">
                                      <label htmlFor="upName">Name</label>
                                      <input
                                        type="text"
                                        name="itemName"
                                        id="upName"
                                        className="form-control"
                                        value={this.state.itemName}
                                        onChange={this.onChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group">
                                    <div className="col">
                                      <label htmlFor="upPrice">Price</label>
                                      <input
                                        type="number"
                                        name="itemPrice"
                                        id="upPrice"
                                        className="form-control border border-secondary"
                                        value={this.state.itemPrice}
                                        onChange={this.onChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group">
                                    <div className="col">
                                      <input
                                        class="form-check-input ml-2  border border-primary"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckChecked"
                                      />
                                      <label
                                        class="form-check-label ml-5"
                                        for="flexCheckChecked"
                                      >
                                        Available
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  data-id=""
                                  type="submit"
                                  className="btn btn-info"
                                >
                                  Patch
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>

                      {/* END UPDATE Package PRICE */}
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
