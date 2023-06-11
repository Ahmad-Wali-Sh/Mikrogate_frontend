import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

export default function Header() {
  const location = useLocation();
  const data = location.state?.data;
  const token = useContext(Context);
  const member = data.assigned;
  const MEMBERS_URL = process.env.REACT_APP_MEMBERS;
  const TASK_URL = process.env.REACT_APP_TASK;
  const ME_URL = process.env.REACT_APP_USER
  const SOCKET_URL = process.env.REACT_APP_SOCKET


  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    axios
      .get(ME_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setUser(res.data));
    console.log(user);
  }, []);

  const receiveNotification = (e) => {
    NotificationManager.info("New Data Recieved", "New Task Updated!", 5000);
  };

  const ServerURL = SOCKET_URL

  const { sendJsonMessage } = useWebSocket(ServerURL, {  
    onOpen: (e) => {
      console.log(e)
    },

    onClose: (e) => {
      console.log(e)
    },
    
    onMessage: (e) => {
      const data = JSON.parse(e.data)
      data.data.value.message.includes(user.id) && receiveNotification() 
    }
  })





  const [Members, setMembers] = React.useState([]);
  React.useEffect(() => {
    axios.get(MEMBERS_URL, {
      headers: {
        Authorization: "Token " + token.user.token,
      },
    }).then((res) => {
      setMembers(res.data.results);
    });
  }, []);
  console.log(Members);

  const [details, setDetails] = React.useState([]);
  React.useEffect(() => {
    axios.get(TASK_URL + `${data.id}/`, {
      headers: {
        Authorization: "Token " + token.user.token,
      },
    }).then((res) => {
      setDetails(res.data.assigned);
    });
  }, []);

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };

  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const [memberList, setMemberList] = React.useState({
    assigned: [],
  });

  React.useEffect(() => {
    member.map((item) => memberList.assigned.push(String(item.id)));
  }, []);

  const handleChange = (event) => {
    if (event.target.checked) {
      setMemberList((prevState) => ({
        
        assigned: [...prevState.assigned, event.target.value],
      }));
    }
    if (!event.target.checked) {
      setMemberList((prevState) => ({
        ...memberList,
        assigned: prevState.assigned.filter(
          (assign) => assign !== event.target.value
        ),
      }));
    }
  };

  console.log(memberList);

  const MembersSubmit = async (e) => {
    e.preventDefault();
    warningNotification();
    const MemberForm = new FormData();
    memberList.assigned.map((item) => MemberForm.append("assigned", item));
    
    
    try {
      const response = await axios({
        method: "PATCH",
        url: TASK_URL + `${data.id}/`,
        data: MemberForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(response);
      sendJsonMessage({
        "message": response.data.assigned.filter(function(item){
          return item !== user.id
        })  
      })
      submitNotification();
      axios.get(TASK_URL + `${data.id}/`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      }).then((res) => {
        setDetails(res.data.assigned);
        setMemberList({ assigned: res.data.assigned });
      });

    } catch (err) {
      console.log(err);
      const errorNotification = (e) => {
        NotificationManager.error(err.message, "Error", 2000);
      };
      errorNotification();
    }
  };
  const assign = details.map((item) => item.id);
  console.log(assign)
  return (
    <>
      <h1>{data.title}</h1>
      <div className="members mt-3">
        <ul>
          {details.map((member) => (
            <li>
              <img
                src={member.avatar}
                alt=""
                className="avatar avatar--header"
                data-toggle="tooltip"
                data-placement="top"
                title={member.name}
              />
            </li>
          ))}
          <button
            type="button"
            name="addTask"
            className="btn btn-secondary rounded-circle circle-width mx-3"
            data-bs-toggle="modal"
            data-bs-target="#membersModal"
          >
            <i className="fa-solid fa-plus "></i>
          </button>
        </ul>

        <div
          class="modal fade"
          id="membersModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-ml">
            <div class="modal-content">
              <div class="modal-header">Add or remove task members</div>
              <div className="modal-body">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabIndex="2"
                  >
                    <div>
                      <div className="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          <i className="fa-solid fa-bars-filter"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Filter members"
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                        />
                      </div>
                    </div>
                    <form onSubmit={MembersSubmit}>
                      <div className="membersbox">
                        <ul className="row">
                          {Members.map((item) => (
                            <li className="d-flex justify-content-between padd">
                              <div className="list-item">
                                <img
                                  src={item.avatar}
                                  alt="avatar"
                                  className="avatar pad"
                                />
                                <span className="ml-4">{item.name}</span>
                              </div>
                              <input
                                type="checkbox"
                                className="mt-3 mr-3"
                                name="assigned"
                                value={item.id}
                                defaultChecked={
                                  assign.includes(item.id) ? true : false
                                }
                                onChange={handleChange}
                              />
                            </li>
                          ))}
                        </ul>
                        <div className="modal-footer">
                          <button type="submit" className="btn btn-success">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="progress mt-5">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          aria-label="Success example"
          style={{ width: "25%" }}
          aria-defaultValuenow="25"
          aria-defaultValuemin="0"
          aria-defaultValuemax="100"
        ></div>
      </div>
      <ul
        className="nav nav-pills nav-justified mt-5 mb-5"
        id="mytab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          {/* <button
            className="nav-link active"
            id="task-tab"
            data-bs-toggle="tab"
            data-bs-target="#task-tab-pane"
            type="button"
            role="tab"
            aria-controls="task-tab-pane"
            aria-selected="true"
          >
            Task
          </button> */}
        </li>
        <li className="nav-item" role="presentation">
          {/* <button
            className="nav-link"
            id="files-tab"
            data-bs-toggle="tab"
            data-bs-target="#files-tab-pane"
            type="button"
            role="tab"
            aria-controls="files-tab-pane"
            aria-selected="false"
          >
            Files
          </button> */}
        </li>
        <li className="nav-item" role="presentation">
          {/* <button
            className="nav-link"
            id="activity-tab"
            data-bs-toggle="tab"
            data-bs-target="#activity-tab-pane"
            type="button"
            role="tab"
            aria-controls="activity-tab-pane"
            aria-selected="false"
          >
            Activity
          </button> */}
        </li>
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="task-tab-pane"
          role="tabpanel"
          aria-labelledby="task-tab"
          tabIndex="-1"
        >
          <div className="mb-5">
            <div className="row">
              <div className="col-1 col-sm-2">
                <label htmlFor="project" className="col-form-label text-muted">
                  Project
                </label>
              </div>
              <div className="col-3 col-sm-4">
                <select
                  className="form-select"
                  id="project"
                  aria-label="Default select example"
                  name="project"
                >
                  <option value={data.project.id}>{data.project.name}</option>
                </select>
              </div>

              <div className="col-1 col-sm-2">
                <label htmlFor="project" className="col-form-label text-muted">
                  Customer
                </label>
              </div>
              <div className="col-5 col-sm-4">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="contract name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    defaultValue={data.contract.contract_number}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-1 col-sm-2">
                <label htmlFor="deadline" className="col-form-label text-muted">
                  Deadline
                </label>
              </div>
              <div className="col-3 col-sm-4">
                <div className="input-group mb-3">
                  <input
                    type="date"
                    name="deadline"
                    className="form-control"
                    defaultValue={data.deadline.slice(0, 10)}
                  />
                </div>
              </div>
              <div className="col-1 col-sm-2">
                <label htmlFor="tag" className="col-form-label text-muted">
                  Tag
                </label>
              </div>
              <div className="col-5 col-sm-4">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="tag">
                    <i className="fa-solid fa-tag"></i>
                  </label>
                  <select
                    className="form-select"
                    id="tag"
                    aria-label="Default select example"
                  >
                    <option defaultValue={data.tag.id}>{data.tag.name}</option>
                    <option>Normal</option>
                    <option defaultValue="1">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
