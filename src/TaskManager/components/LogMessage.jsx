import axios from "axios";
import React from "react";
import { useState, useContext, useRef } from "react";
import { Context } from "../../context/Context";
import Picker from "emoji-picker-react";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function LogMessage(props) {
  const token = useContext(Context);
  const TASK_LOG_URL = process.env.REACT_APP_TASK_LOG;
  const ME_URL = process.env.REACT_APP_USER;
  const [logmessage, setLogMessage] = React.useState({
    body: "",
    task: props.id,
  });
  const [note, setNote] = React.useState([]);
  const [trigger, setTrigger] = React.useState(0);
  const textAreaRef = useRef(null);

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };
  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const [inputStr, setInputStr] = useState("");

  const onEmojiClick = (event) => {
    setInputStr((prevInput) => prevInput + event.emoji);
  };


  const LogMessageSubmit = async (e) => {
    e.preventDefault();
    warningNotification();
    const LogMessageForm = new FormData();
    LogMessageForm.append("body", inputStr);
    LogMessageForm.append("task", logmessage.task);
    if (inputStr) {
      try {
        const response = await axios({
          method: "POST",
          url: TASK_LOG_URL,
          data: LogMessageForm,
          headers: {
            Authorization: "Token " + token.user.token,
          },
        });
        console.log(response);
        submitNotification();
        setTrigger((prev) => prev + 1);
        setInputStr('')
      } catch (err) {
        console.log(err);
        const errorNotification = (e) => {
          NotificationManager.error(err.message, "Error!", 2000);
        };
        errorNotification();
      }
    }
  };
  console.log(props.id);

  React.useEffect(() => {
    axios
      .get(TASK_LOG_URL + `?id=${props.id}`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setNote(res.data.results));
    console.log(note);
  }, [trigger]);

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

  function created(date) {
    return (
      new Date(date).getHours() +
      ":" +
      (new Date(date).getMinutes() < 10
        ? "0" + new Date(date).getMinutes()
        : new Date(date).getMinutes())
    );
  }

  return (
    <>
      <nav>
        <div class="nav nav-tabs mt-4" id="nav-tab" role="tablist">
          {/* <button
            class="nav-link"
            id="nav-message-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-message"
            type="button"
            role="tab"
            aria-controls="nav-message"
            aria-selected="false"
          >
            Send message
          </button> */}
          <button
            class="nav-link"
            id="nav-log-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-log"
            type="button"
            role="tab"
            aria-controls="nav-log"
            aria-selected="false"
          >
            Log note
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade"
          id="nav-message"
          role="tabpanel"
          aria-labelledby="nav-message-tab"
          tabindex="0"
        >
          <div className="card text-dark bg-light mb-3">
            {/* <div className="card-header">Log note</div> */}
            <form>
              <div className="card-body">
                <div className="row">
                  <div className="col-1 col-md-1 col-sm-2"></div>
                  <div className="col-6">
                    <p>
                      <span className="text-muted">To: Followers of</span>{" "}
                      &ldquo;task title&rdquo;
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-1 col-md-1 col-sm-2">
                    <label htmlFor="log_note" className="col-form-label">
                      <img src={user.avatar} alt="" className="avatar" />
                    </label>
                  </div>
                  <div className="col-11 col-md-11 col-sm-10">
                    <textarea
                      autosize="true"
                      id="log_note"
                      placeholder="Send a message to followers..."
                      className="form-control"
                      rows="4"
                      ref={textAreaRef}
                      name="body"
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-1 col-md-1 col-sm-2"></div>
                  <div className="col-1 col-md-2 col-sm-6 mt-1 text-muted">
                    <i className="fa-regular fa-face-smile p-1 icon"></i>
                    <i className="fa-solid fa-paperclip p-1 icon"></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col-1 col-md-1 col-sm-2"></div>
                  <div className="col-1 col-sm-1 mt-3">
                    <input
                      type="submit"
                      className="btn btn-secondary btn-sm"
                      value="Send"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          class="tab-pane fade rounded-0"
          id="nav-log"
          role="tabpanel"
          aria-labelledby="nav-log-tab"
          tabindex="0"
        >
          <div className="card text-dark bg-light mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-1">
                  <label htmlFor="log_note" className="col-form-label">
                    <img src={user.avatar} alt="" className="avatar" />
                  </label>
                </div>

                <div className="col-11">
                  <textarea
                    autosize="true"
                    id="log_note"
                    name="body"
                    placeholder="Log an internal note..."
                    className="form-control text-area"
                    rows="3"
                    value={inputStr}
                    onChange={(e) => setInputStr(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-1 offset-1">
                  <div className="dropdown">
                    <button
                      className="border-0 offset-8 text-muted"
                      type="button"
                      id="dropdown1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-regular fa-face-smile p-1 icon text-muted"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdown1">
                      {/* <li>
                        <Picker
                          pickerStyle={{ width: "100%" }}
                          onEmojiClick={onEmojiClick}
                          width={300}
                          height={300}
                          previewConfig={{
                            showPreview: false,
                          }}
                        />
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div className="col-1">
                  <button
                    className="border-0"
                    type="button"
                    id="dropdown1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-paperclip p-1 icon text-muted"></i>
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
              </div>
              <div className="row">
                <div className="col-1 col-md-1 col-sm-2"></div>
                <div className="col-1 col-sm-1 mt-3">
                  <form onSubmit={LogMessageSubmit}>
                    <input
                      type="submit"
                      className="btn btn-secondary btn-sm"
                      value="Log"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {note.map((item) => (
          <div className="card-body shadow p-3 mb-2 bg-body rounded col-12">
            <div className="row align-items-center ">
              <div className="col-1 col-md-1 col-sm-2 ">
                <label htmlFor="log_note" className="col-form-label">
                  <img src={item.user.avatar} alt="" className="avatar" />
                </label>
              </div>
              <div className="col-5 mx-3 mb-1">{item.user.name}</div>
              <div
                className="col-3 offset-1 deadline text-muted mb-1"
                style={{ fontSize: "12px" }}
              >
                {new Date(item.created).getDate() == new Date().getDate()
                  ? "Today" + " " + created(item.created)
                  : new Date(item.created).toDateString().slice(0, 10)}
              </div>
              <div className="col">
                <div className="row">
                  <div className="dropdown">
                    <button
                      className="btn text-muted"
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
                </div>
              </div>
              <div className="col-11 col-md-11 col-sm-11 offset-1">
                {item.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
