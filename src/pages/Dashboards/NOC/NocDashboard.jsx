import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { usePreviousTasks, useTaskListFilter } from "../../../components/State";

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
    document.title = "NOC Dashboard";
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

  const { taskFilter, setTaskFilter } = useTaskListFilter();
  const { previousTasks, setPreviousTasks } = usePreviousTasks();


  const PROJECT_URL = process.env.REACT_APP_PROJECT;
  const TASK_URL = process.env.REACT_APP_TASK;
  const [projecter, setProjecter] = useState([]);
  const [amendmentCount, setAmendmentCount] = useState(0)
  const [cpeCount, setCpeCount] = useState(0)
  const [onlineSupportCount, setOnlineSupportCount] = useState(0)
  const [troubleshootCount, setTroubleshootCount] = useState(0)

  const ProjectReturn = (name) => {
    const value = projecter.filter((project) => {
        return project.name == name ? project.id : ''
    })
    return value
}

 useEffect(() => {
  axios
  .get(PROJECT_URL, {
    headers: {
      Authorization: "Token " + token.user.token,
    },
  })
  .then((res) => {
    setProjecter(res.data.results);
  });
 }, [])


useEffect(() => {
   ProjectReturn('Amendment')?.[0]?.id && axios
    .get(
      TASK_URL +
        `?user=&contract__contract_number=&project=${ProjectReturn('Amendment')?.[0]?.id}&deadline_after=&deadline_before=&tag=&stage=&stage_net=6
        &assigned__id=&created_after=&created_before=&contract__contract_id=
        `,
      {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      }
    )
    .then((res) => {
      console.log(res);
      setAmendmentCount(res.data.count);
    })
    .catch((e) => console.log(e));

   ProjectReturn('CPE')?.[0]?.id && axios
    .get(
      TASK_URL +
        `?user=&contract__contract_number=&project=${ProjectReturn('CPE')?.[0]?.id}&deadline_after=&deadline_before=&tag=&stage=&stage_net=6
        &assigned__id=&created_after=&created_before=&contract__contract_id=
        `,
      {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      }
    )
    .then((res) => {
      console.log(res);
      setCpeCount(res.data.count);
    })
    .catch((e) => console.log(e));

   ProjectReturn('Online Support')?.[0]?.id && axios
    .get(
      TASK_URL +
        `?user=&contract__contract_number=&project=${ProjectReturn('Online Support')?.[0]?.id}&deadline_after=&deadline_before=&tag=&stage=&stage_net=6
        &assigned__id=&created_after=&created_before=&contract__contract_id=
        `,
      {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      }
    )
    .then((res) => {
      console.log(res);
      setOnlineSupportCount(res.data.count);
    })
    .catch((e) => console.log(e));

   ProjectReturn('Troubleshoot')?.[0]?.id && axios
    .get(
      TASK_URL +
        `?user=&contract__contract_number=&project=${ProjectReturn('Troubleshoot')?.[0]?.id}&deadline_after=&deadline_before=&tag=&stage=&stage_net=6
        &assigned__id=&created_after=&created_before=&contract__contract_id=
        `,
      {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      }
    )
    .then((res) => {
      console.log(res);
      setTroubleshootCount(res.data.count);
    })
    .catch((e) => console.log(e));


}, [projecter]);

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
                  <div
                    className="small-box bg-primary"
                    onClick={() => {
                      setTaskFilter();
                      setPreviousTasks();
                    }}
                  >
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
                      {troubleshootCount}
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
                      {onlineSupportCount}
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
                      {cpeCount}
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
                      {amendmentCount}
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
            <div className="float-left mt-5 ml-2"></div>
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
