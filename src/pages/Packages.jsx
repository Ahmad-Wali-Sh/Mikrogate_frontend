import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cx from "classnames";

export default class Packages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      packName: "",
      packPrice: "",
      packType: "",
      available: false,
      itemName: "",
      itemId: 0,
      itemPrice: 0,
      itemAvailable: false,

      nextUrl: "",
      previousUrl: "",
      count: "",
    };
    this.url = process.env.REACT_APP_PACKAGE;
    this.token = localStorage.getItem("user").slice(10, -2);

    this.handleChange = this.onChange.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleUpdate = this.updatePackage.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const packages = res.data.results;
        this.setState({ packages });
        this.setState({ count: res.data.count });
        this.setState({ nextUrl: res.data.next });
        this.setState({ previousUrl: res.data.previous });
      });
  }

  onChange = (e) => {
    if (e.target.name == "available" || e.target.name == "itemAvailable") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state.available);
    }
  };

  paginationHandler = (url) => {
    try {
      axios
        .get(url, {
          headers: {
            Authorization: "Token " + this.token,
          },
        })
        .then((res) => {
          const packages = res.data.results;
          this.setState({ packages });
          this.setState({ count: res.data.count });
          this.setState({ nextUrl: res.data.next });
          this.setState({ previousUrl: res.data.previous });
        });
    } catch (err) {
      console.log(err);
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.packName);
    formData.append("price", this.state.packPrice);
    formData.append("type", this.state.packType);
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
      window.location.replace("/packages");
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
    formData.append("available", this.state.itemAvailable);

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
        url: this.url + `${id}/`,
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
    let rowIndex = 1;
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
                    <li class="breadcrumb-item active">Packages</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>
          <section className="content">
            <div className="container-fluid">
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
                            Add New Package Details
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
                                <label htmlFor="packName">Name</label>
                                <input
                                  type="text"
                                  name="packName"
                                  id="packName"
                                  className="form-control"
                                  placeholder="eg: Package-63GB-1Mb-2GBDaily"
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <div className="col">
                                <label htmlFor="packType">Type</label>

                                <select
                                  className="form-control border border-secondary"
                                  id="packType"
                                  name="packType"
                                  value={this.state.band}
                                  onChange={this.onChange}
                                  // ref={band}
                                >
                                  <option value="" selected disabled>
                                    Select
                                  </option>
                                  <option value="Limited">Limited</option>
                                  <option value="Unlimited">Unlimited</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <div className="col">
                                <label htmlFor="packPrice">Price</label>
                                <input
                                  type="number"
                                  name="packPrice"
                                  id="packPrice"
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
                      <h3 className="card-title">Database Stored Packages</h3>
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
                            <th>Package Name</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.packages.map((r) => (
                            r.available && <tr key={r.id}>
                              <td>{rowIndex++}</td>
                              <td>{r.name}</td>
                              <td>{r.price}</td>
                              <td>
                                <i
                                  className={cx({
                                    "fa-solid fa-check": r.available == true,
                                    "fa-solid fa-times": r.available == false,
                                  })}
                                ></i>
                              </td>
                              <td className="project-actions text-right">
                                <button
                                  type="button"
                                  name="itemName"
                                  className="btn btn-info btn-sm mr-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#PackageUpdateModal"
                                  onClick={() => {
                                    this.updateState(
                                      r.id,
                                      r.name,
                                      r.price,
                                      r.available
                                    );
                                  }}
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </button>
                                {/* <button
                                  type="button"
                                  name="itemName"
                                  className="btn btn-danger btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalCenter"
                                  onClick={() => {
                                    this.updateState(
                                      r.id,
                                      r.name,
                                      r.price,
                                      r.available
                                    );
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </button> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                                Delete Package Details
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
                                data-bs-dismiss="modal"
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
                                  Update Package Details
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
                                        className="form-control"
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
                                        class="form-check-input ml-2 border border-primary"
                                        type="checkbox"
                                        defaultChecked={
                                          this.state.itemAvailable
                                        }
                                        id="flexCheckChecked"
                                        name="itemAvailable"
                                        onChange={this.onChange}
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
