import axios from "axios";
import { React, Component } from "react";
import { Link } from "react-router-dom";
import NotificationManager from "react-notifications/lib/NotificationManager";

export class MainDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      task: [],
      id: 0,
      project: "",
      contract_no: "",
      stages: [],
    };
    this.token = localStorage.getItem("user").slice(10, -2);
    this.STATE_URL = process.env.REACT_APP_STAGE
    this.TASK_URL = process.env.REACT_APP_TASK
  }
  updateTask = async (e, { ...tasks }) => {
    e.preventDefault();
    await this.setState({ task: tasks.items });
    console.log(this.state.task);
  };
  componentDidMount() {
    this.setState({ data: this.props.data });
    axios({
      url: this.STATE_URL,
      method: "GET",
      headers: {
        Authorization: "Token " + this.token,
      },
    }).then((e) => {
      const stages = e.data.results;
      this.setState({ stages });
    });
  }

  submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };
  errorNotification = (e) => {
    NotificationManager.error("Not Sent!", "", 2000);
  };
  warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  changeState = async (e, task, stage) => {
    e.preventDefault();
    this.warningNotification();
    const data = new FormData();
    data.append("stage", stage);

    try {
      const response = await axios({
        url: this.TASK_URL + `${task}/`,
        method: "PATCH",
        data: data,
        headers: {
          Authorization: "Token " + this.token,
        },
      });
      console.log(response);
      this.submitNotification();
    } catch (err) {
      console.log(err);
      this.errorNotification();
    }
    window.location.replace("/task-manager");
  };

  render() {
    return (
      <>
        {this.state.data.map((items) => (
          <div className="cardItem content-box">
            <div className="row height">
              <div className="col-8 ">
                <Link
                  className="text-decoration-none"
                  to={
                    items.project.name == "Installation"
                      ? "/task-manager/details"
                      : items.project.name == "Troubleshoot"
                      ? "/task-manager/troubleshoot"
                      : items.project.name == "Online Support"
                      ? "/task-manager/online_support"
                      : items.project.name == "Change Location"
                      ? "/task-manager/change_location"
                      : items.project.name == "Amendment"
                      ? "/task-manager/amendment"
                      : ""
                  }
                  state={{ data: items }}
                >
                  <div className="cardTitleText item-title col-11">{items.title}</div>
                  <div className="cardTitleText grey col-11">{items.contract.contract_number}</div>
                </Link>
                <p className="text-muted mt-2">
                  {items.project.name == "Installation"
                    ? items.contract.poc_name
                    : items.contract.contract_no}
                </p>
              </div>
              <div className="col-4 ttt">
                <div className="flexing">
                  <div className="image--flex">
                    {/* {items.user.map((item) => ( */}
                    <img
                      src={items.user.avatar}
                      alt=""
                      className="avatar--task"
                      data-toggle="tooltip"
                      data-placement="top"
                      title={items.user.name}
                    />
                    {/* ))} */}
                  </div>
                  <div className="d-flex justify-content-end ">
                    <div className="iconsize">
                    </div>
                    <div className="dropdown">
                      <button
                        className="btn mx-3 border-0"
                        type="button"
                        id="dropdown1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdown1">
                        <li>
                          <a className="dropdown-item text-primary" href="#">
                            Edit
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-danger" href="#">
                            Archive
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div class="dropdown">
                      <a
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div 
                          className={
                            items.stage.name == "New"
                              ? "dot bg-secondary"
                              : items.stage.name == "In-Progress"
                              ? "dot bg-primary"
                              : items.stage.name == "Completed"
                              ? "dot color--success"
                              : "dot bg-dark"
                          }
                        ></div>
                      </a>

                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        {this.state.stages.map((item) => (
                          <li>
                            <a
                              class="dropdown-item"
                              name="stage"
                              key={item.id}
                              onClick={(e) =>
                                this.changeState(e, items.id, item.id)
                              }
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="taskBottom">
                <p className="cardText bold">
                  <i className="fa-solid fa-clock"></i>&nbsp;
                  {new Date(items.deadline).toDateString().slice(0, 10)}
                </p>
                <h6>
                  <span
                    className={`badge mt-1 bg-${
                      items.tag.name == "Normal"
                        ? "primary"
                        : items.tag.name == "pending"
                        ? "warning"
                        : "danger"
                    }`}
                  >
                    {items.tag.name}
                  </span>
                </h6>
              </div>
            </div>

            <div
              className="modal fade"
              id="addTaskModal_2"
              tabIndex="-1"
              role="dialog"
              aria-lablledby="addTaskModalTitle"
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
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="home-tab-pane"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                        tabIndex="2"
                      >
                        <form>
                          <div className="input-group mb-3 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Find customer"
                              aria-label="Recipient's username"
                              aria-describedby="button-addon2"
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="submit"
                              id="button-addon2"
                            >
                              Find
                            </button>
                          </div>
                        </form>
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
                            <div className="col-3 col-sm-3 mt-2"></div>
                            <div className="col-2 col-sm-2"></div>
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
                                contract_no
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
                                <input type="date" className="form-control" />
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
                                >
                                  <option>Normal</option>
                                  <option value="1">Urgent</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="profile-tab-pane"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                        tabindex="0"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export function Details(props) {
  return (
    <>
      <div className="row">
        <div className="col-10 offset-md-1">
          <div className="card">
            <div className="card-header">{props.title}</div>
            <div className="card-body">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
