import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { NotificationManager } from "react-notifications";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { useRealtime, useSocket } from "./Services";

export default function Header() {
  const USER_API = process.env.REACT_APP_USER;
  const TASK_URL = process.env.REACT_APP_TASK;
  const CONTRACT = process.env.REACT_APP_NEW_CONTRACT;
  const API_URL = USER_API.slice(0, -8);
  const prevLength = useRef();

  const [audio] = useState(new Audio('../../dist/audio/notification.wav'))

  const PlayAudio = () => {
    audio.play()
  } 

  const receiveNotification = (e) => {
    NotificationManager.info("New Data Recieved", "Check Notifications!", 5000);
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(USER_API, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const [triggerNotify, setTriggerNotify] = useState();
  const socket = useSocket();
  const token = useContext(Context);

  useEffect(() => {
    socket?.on("message", (data) => {
      console.log(data);
      setTriggerNotify(new Date());
      axios
        .get(API_URL + "taskmanager/user-notification/?user=" + user?.id, {
          headers: {
            Authorization: "Token " + token.user.token,
          },
        })
        .then((res) => {
          console.log(res.data.results);
          setNotifications(res.data.results);
        })
        .catch((e) => console.log(e));
    });

    return () => {
      socket?.off("message");
    };
  });

  const { NotifySubmit } = useRealtime()
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL + "taskmanager/user-notification/?user=" + user?.id, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        console.log(res.data.results);

        setNotifications(res.data.results);
      })
      .catch((e) => console.log(e));
  }, [user, triggerNotify]);

  const [notifLength, setNotifLength] = useState(notifications.length);
  useEffect(() => {
    prevLength.current = notifications.length;
    if (notifications.length > notifLength) {
      receiveNotification("Wow it is working.");
      PlayAudio()
      setNotifLength(notifications.length);
    }
  }, [notifications, notifLength]);

  const [dropdown, setDropdown] = useState(false);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "http://10.80.200.2:3001/";
  };

  const calculateTimeAgo = (timestamper) => {
    const now = new Date();
    const timestamp = new Date(timestamper)
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) {
      return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const DeleteNotify = (id) => {
      axios.delete(API_URL + "taskmanager/user-notification/" + id + '/', { headers: {
        Authorization: "Token " + token.user.token,
      }}).then((e) => setTriggerNotify(new Date()))
  }

  const GoToTask = (taskId) => {
    taskId && axios.get(
        TASK_URL + taskId + '/', {headers: {
            Authorization: "Token " + token.user.token,
        }}
    ).then((res) => {
        if (res.data.project.name == "Installation") {
            navigate("/task-manager/details", { state: { data: res.data } });
          }
          if (res.data.project.name == "Troubleshoot") {
            navigate("/task-manager/troubleshoot", {
              state: { data: res.data },
            });
          }
          if (res.data.project.name == "Online Support") {
            navigate("/task-manager/online_support", {
              state: { data: res.data },
            });
          }
          if (res.data.project.name == "Change Location") {
            navigate("/task-manager/change_location", {
              state: { data: res.data },
            });
          }
          if (res.data.project.name == "Amendment") {
            navigate("/task-manager/amendment", {
              state: { data: res.data },
            });
          }
          if (res.data.project.name == "NOC Staff") {
            navigate("/task-manager/noc_assigned_details", {
              state: { data: res.data },
            });
          }
          if (res.data.project.name == "CPE") {
            navigate("/task-manager/cpe", {
              state: { data: res.data },
            });
          }
    }).catch((e) => console.log(e))
  }

  const GoToContract = (contractId) => {
    axios.get(CONTRACT + contractId + '/', { headers: {
      Authorization: "Token " + token.user.token,
    }}).then((res) => {
      navigate('/contract-details-noc', {
        state: { contract: res.data}
      })
    })
  }
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a
              className="nav-link"
              onClick={() => logout()}
              style={{ cursor: "pointer" }}
            >
              Logout
            </a>
          </li>
        </ul>

        {
          // Dropdown for Notifications
        }
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link notification-icon"
              data-toggle="dropdown"
              onClick={() => setDropdown((prev) => !prev)}
              onBlurCapture={() => setDropdown(false)}
            >
              <i className="fa fa-bell"></i>
              {notifications.length != 0 && <span className="badge badge-danger navbar-badge notification-badge">
                {notifications.length != 0 && notifications.length}
              </span>}
            </a>
            <div
              className={` ${
                dropdown
                  ? "dropdown-notification-show"
                  : "dropdown-notification-hidden"
              }`}
            >
              <span className="dropdown-header">Notification Center</span>
              {notifications?.map((notify) => (
                <>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item row" onClick={() => {
                     notify.notification_detail?.task_id && GoToTask(notify.notification_detail?.task_id)
                     notify.notification_detail?.contract_id && GoToContract(notify.notification_detail?.contract_id)
                      setDropdown(false)
                      DeleteNotify(notify.id)
                  }}>
                    <div className="col-12">
                      <div className="row">
                        <i className="fas fa-users col-2"></i>
                        <small className="col-7">
                          {notify.notification_detail?.sender__name}
                        </small>
                        <small className="col-3 text-muted text-sm">
                          {calculateTimeAgo(notify.notification_detail?.timestamp)}
                        </small>
                      </div>
                      <div className="row">
                        <small className="notification-text col-12">
                          {notify.notification_detail?.content}
                        </small>
                      </div>
                      <div className="row">
                        <small className="notification-text col-4 text-muted col-2">
                          Id: {notify.notification_detail?.task__contract__contract_id ? notify.notification_detail?.task__contract__contract_id : notify.notification_detail?.contract__contract_id}
                        </small>
                        <small className="notification-text col-8 text-muted col-2">
                          Title: {notify.notification_detail?.task__title}
                        </small>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div className="dropdown-divider"></div>
              <a className="dropdown-footer">
                {notifications.length} Notifications
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
