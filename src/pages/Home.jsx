import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

export default function Home() {
  let i = 0;
  const url = process.env.REACT_APP_NEW_CONTRACT;
  const [contracts, setContracts] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);
  const [previousUrl, setPreviousUrl] = useState([]);
  const [newCon, setNewCon] = useState();
  const token = useContext(Context);

  useEffect(() => {
    document.title = "Mikrogate | HOME";
    const fetchContracts = async () => {
      const res = await axios.get(url + `?contract-status=1`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      // console.log(res.data)
      setContracts(res.data.results);
      setNextUrl(res.data.next);
      setPreviousUrl(res.data.previous);
      setNewCon(res.data.count);
    };
    fetchContracts();
  }, []);

  let expired = 0;
  let inProgress = 0;

  contracts.map((a) => {
    if (a.status == "expired") {
      expired += expired + 1;
    }
  });

  // contracts.map( a => {
  //   if (a.status == 'new') {
  //     newCon += newCon+1
  //   }
  // })

  contracts.map((a) => {
    if (a.status == "in-progress") {
      inProgress += inProgress + 1;
    }
  });

  const paginationHandler = (url) => {
    try {
      axios
        .get(url, {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        })
        .then((res) => {
          setNextUrl(res.data.next);
          setPreviousUrl(res.data.previous);
          setContracts(res.data.results);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <!-- Content Wrapper. Contains page content --> */}
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
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
                  {/* <li className="breadcrumb-item active">Dashboard v1</li> */}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/noc",
                  }}
                >
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>5</h3>

                      <p>NOC</p>
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
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{newCon}</h3>

                    <p>Technicians</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag"></i>
                  </div>
                  <a className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>
                      {expired}
                      <sup style={{ fontSize: "14px" }}>expired</sup>
                    </h3>
                    <p>Finance</p>
                  </div>
                  <div className="icon">
                    <i className="fa-light fa-business-time"></i>
                  </div>
                  <a className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{inProgress}</h3>
                    <p>Done Projects</p>
                  </div>
                  <div className="icon">
                    <i className="fa-light fa-bars-progress"></i>
                  </div>
                  <a className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">New Customers</h3>

                    {/* <div className="card-tools">
                      <ul className="pagination pagination-sm float-right">
                        <li className="page-item">
                          <a className="page-link" >
                            &laquo;
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" >
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" >
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" >
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" >
                            &raquo;
                          </a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                  {/* <!-- /.card-header --> */}
                  <div className="card-body p-0">
                    <table className="table projects">
                      <thead>
                        <tr>
                          <th style={{ width: "1%" }}>#</th>
                          <th>Contract Number</th>
                          <th>POC Name</th>
                          <th>POC Number</th>
                          <th>Address</th>
                          {/* <th className="text-center">Status</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {contracts.map((contract) => (
                          <tr key={contract.id}>
                            <td>{++i}.</td>
                            <td>
                              <a>{contract.contract_number}</a>
                              {/* &nbsp;&nbsp; */}
                              {/* <br />
                              <small
                                className={cx({
                                  "badge badge-info": contract.status === "new",
                                  "badge badge-success":
                                    contract.status === "done",
                                  "badge badge-primary":
                                    contract.status === "in-progress",
                                  "badge badge-warning":
                                    contract.status === "pending",
                                  "badge badge-danger":
                                    contract.status === "canceled",
                                  "badge badge-secondary":
                                    contract.status === "expired",
                                })}
                              >
                                {contract.status}
                              </small>*/}
                              <br />
                              <small>
                                {new Date(contract.date).toDateString()}
                              </small>
                            </td>
                            <td>{contract.name}</td>
                            <td className="project_progress">
                              {contract.contact}
                            </td>
                            <td>{contract.address}</td>

                            {/* <td className="project-state">
                                <span
                                  className={cx({
                                    "badge badge-info":
                                      contract.status == "new",
                                    "badge badge-success":
                                      contract.status == "done",
                                    "badge badge-primary":
                                      contract.status == "in-progress",
                                    "badge badge-warning":
                                      contract.status == "pending",
                                    "badge badge-danger":
                                      contract.status == "canceled",
                                    "badge badge-secondary":
                                      contract.status == "expired",
                                  })}
                                >
                                  {contract.status}
                                </span>
                              </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* <!-- /.card-body --> */}
                </div>
                {/* <!-- /.card --> */}
              </div>
            </div>
          </div>
          <div>
            <div className="float-left mt-5 ml-2">
              {/* <b>Result: {count}</b> */}
            </div>
            <nav className="Page navigation example mt-5">
              <ul className="pagination justify-content-center">
                {previousUrl && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        paginationHandler(previousUrl);
                      }}
                    >
                      <i className="fa-solid fa-arrow-left-long"></i> Previous
                    </button>
                  </li>
                )}
                {nextUrl && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        paginationHandler(nextUrl);
                      }}
                    >
                      Next <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
}
