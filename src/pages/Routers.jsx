import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cx from "classnames";
// import $ from 'jquery'

export default class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routers: [],
      rouName: "",
      rouPrice: "",
      available: "",
      itemName: "",
      itemId: 0,
      itemPrice: 0,
    };
    this.url = process.env.REACT_APP_ROUTER;
    this.token = localStorage.getItem("user").slice(10, -2);

    this.handleChange = this.onChange.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleUpdate = this.updateRouter.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.url, {
        headers: {
          Authorization: "Token " + this.token,
        },
      })
      .then((res) => {
        const routers = res.data.results;
        this.setState({ routers });
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.available)
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.rouName);
    formData.append("price", this.state.rouPrice);
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
      window.location.replace('/routers')
    } catch (err) {
      console.log(err);
    }
  };

  updateState = (id, name, price) => {
    this.setState({ itemId: id });
    this.setState({ itemName: name });
    this.setState({ itemPrice: price });

    // console.log(this),
    // console.log(this.state.itemName)
  };

  updateRouter = async (e) => {
    e.preventDefault()
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

  deleteRouter = async () => {
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
    window.location.reload(true);
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
                    <li class="breadcrumb-item active">Routers</li>
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
                    <h3 className="card-title">Add New Router</h3>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="devName">Router Name</label>
                            <input
                              type="text"
                              name="rouName"
                              id="rouName"
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
                              name="rouPrice"
                              id="rouPrice"
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

              {/* ROUTER ADD MODAL */}

              <div className="row">
                <form className="form" onSubmit={this.onSubmit}>
                  <div
                    className="modal fade"
                    id="RouterAddModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="RouterAddModalTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="RouterAddModalTitle">
                            Add New Router Details
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
                                <label htmlFor="rouName">Name</label>
                                <input
                                  type="text"
                                  name="rouName"
                                  id="rouName"
                                  className="form-control"
                                  placeholder="eg: TPLink WR-840"
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <div className="col">
                                <label htmlFor="rouPrice">Price</label>
                                <input
                                  type="number"
                                  name="rouPrice"
                                  id="rouPrice"
                                  className="form-control  border border-secondary"
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

              {/* END ROUTER ADD */}

              <div className="row">
                <div className="col-10 offset-md-1">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Database Stored Routers</h3>
                      <button
                        className="btn btn-success float-right"
                        data-bs-toggle="modal"
                        data-bs-target="#RouterAddModal"
                      >
                        <i className="fa-solid fa-plus-large"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <table id="example1" className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Router Name</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.routers.map((r) => (
                            <tr key={r.id}>
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
                                {/* <a className="btn btn-info btn-sm mr-1" >
                                        <i className="fas fa-pencil-alt"></i>
                                    </a> */}
                                <button
                                  type="button"
                                  name="itemName"
                                  className="btn btn-info btn-sm mr-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#RouterUpdateModal"
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
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalCenter"
                                  onClick={() => {
                                    this.updateState(r.id, r.name, r.price);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </button> */}

                                {/* <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
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
                                Delete Router Details
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
                                  this.deleteRouter();
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

                      {/* UPDATE ROUTER DETAILS */}

                      <form className="form" onSubmit={this.updateRouter}>
                        <div
                          className="modal fade"
                          id="RouterUpdateModal"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="RouterUpdateModalTitle"
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
                                  id="RouterUpdateModalTitle"
                                >
                                  Update Router Details
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
                                        class="form-check-input ml-2 border border-primary"
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

                      {/* END UPDATE ROUTER PRICE */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <div className="container-fluid">
                    
                    
                </div> */}
        </div>
      </div>
    );
  }
}
