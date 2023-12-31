import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";

export default function NocDashboard() {
  const token = useContext(Context);
  const TASK_URL = process.env.REACT_APP_TASK;

  const [counts, setCounts] = useState([]);

  useEffect(() => {
    axios
      .get(TASK_URL.slice(0, -5) + "model-counts/", {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setCounts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a>Home</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/noc-contracts",
                  }}
                >
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>+100</h3>
                      <p>Contract List</p>
                    </div>
                    <div className="icon">
                      <i className="fa-light fa-buildings"></i>
                    </div>
                    <a className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/noc-tasks",
                  }}
                >
                  <div className="small-box bg-primary">
                    <div className="inner">
                      <h3>+100</h3>
                      <p>Tasks List</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag"></i>
                    </div>
                    <a className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/noc-assigned",
                  }}
                >
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>
                        {counts?.troubleshoot_count}
                        <sup style={{ fontSize: "14px" }}></sup>
                      </h3>
                      <p>Troubleshoot Tasks</p>
                    </div>
                    <div className="icon">
                      <i className="fa-light fa-business-time"></i>
                    </div>
                    <a className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/online-support-tasks",
                  }}
                >
                  <div className="small-box bg-secondary">
                    <div className="inner">
                      <h3>
                        {counts?.online_support_count}
                        <sup style={{ fontSize: "14px" }}></sup>
                      </h3>
                      <p>Online Support Tasks</p>
                    </div>
                    <div className="icon">
                      <i className="fa-light fa-business-time"></i>
                    </div>
                    <a className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/cpe-tasks",
                  }}
                >
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>
                        {counts?.cpe_count}
                        <sup style={{ fontSize: "14px" }}></sup>
                      </h3>
                      <p>CPE Tasks</p>
                    </div>
                    <div className="icon">
                      <i className="fa-light fa-business-time"></i>
                    </div>
                    <a className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/amendment-tasks",
                  }}
                >
                  <div className="small-box bg-light">
                    <div className="inner">
                      <h3>
                        {counts?.amendment_count}
                        <sup style={{ fontSize: "14px" }}></sup>
                      </h3>
                      <p>Amendment Tasks</p>
                    </div>
                    <div className="icon">
                      <i className="fa-light fa-business-time"></i>
                    </div>
                    <a className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="float-left mt-5 ml-2"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
