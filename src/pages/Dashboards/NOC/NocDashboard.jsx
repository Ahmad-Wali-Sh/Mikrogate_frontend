import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from '../../../context/Context';
import { Link } from "react-router-dom";

export default function NocDashboard() {
  let i = 0;
  const url = process.env.REACT_APP_NEW_CONTRACT;
  const [contracts, setContracts] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);
  const [previousUrl, setPreviousUrl] = useState([]);
  const [newCon, setNewCon] = useState();
  const token = useContext(Context);

  // FOR NEW Rendering


  useEffect(() => {
    document.title = 'NOC Dashboard';
    const fetchContracts = async () => {
      const res = await axios.get(url + `?contract-status=1`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      // console.log(res.data)
      setContracts(res.data.results);
      setNextUrl(res.data.next)
      setPreviousUrl(res.data.previous)
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

  contracts.map((a) => {
    if (a.status == "in-progress") {
      inProgress += inProgress + 1;
    }
  });

  const paginationHandler = (url) => {
    try{
      axios.get(url, {
        headers: {
          Authorization: "Token " + token.user.token,
        }
      }).then( res => {
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        setContracts(res.data.results)

    })
    }catch(err){
      console.log(err)
    }
  }

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
              <div className="col-lg-4 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/noc-contracts",
                  }}
                >
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>5</h3>
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
              <div className="col-lg-4 col-6">
                <Link
                  to={{
                    pathname: "/task-manager/noc-tasks",
                  }}
                >
                  <div className="small-box bg-info">
                  <div className="inner">
                      <h3>5</h3>
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
              
              <div className="col-lg-4 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>
                      {expired}
                      <sup style={{ fontSize: "14px" }}>expired</sup>
                    </h3>
                    <p>Reporting</p>
                  </div>
                  <div className="icon">
                    <i className="fa-light fa-business-time"></i>
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
                    <h3 className="card-title">New Contracts Overview</h3>
                  </div>
                  <div className="card-body p-0">
                    <table className="table projects">
                      <thead>
                        <tr>
                          <th style={{ width: "1%" }}>#</th>
                          <th>Contract Number</th>
                          <th>POC Name</th>
                          <th>POC Number</th>
                          <th>Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contracts.map((contract) => (
                          <tr key={contract.id}>
                            <td>{++i}.</td>
                            <td>
                              <a>{contract.contract_number}</a>
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

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="float-left mt-5 ml-2">
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
