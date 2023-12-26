import React from "react";
import { useState } from "react";
import axios from "axios";
import { Context } from "../../../../context/Context";
import { useContext } from "react";
import Picker from "emoji-picker-react";
import NotificationManager from "react-notifications/lib/NotificationManager";

function AmendmentLog(props) {
  const AMENDMENT_URL = process.env.REACT_APP_AMENDMENT;
  const token = useContext(Context);
  const [user, setUser] = React.useState({});
  const ME_URL = process.env.REACT_APP_USER
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


  const [logmessage, setLogMessage] = React.useState({
    message: "",
    task: props.id,
    user: user.id
  });

  const [note, setNote] = React.useState([]);

  const [inputStr, setInputStr] = useState("");

  const onEmojiClick = (event) => {
    setInputStr((prevInput) => prevInput + event.emoji);
  };

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };
  
  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const NoteSubmit = (e) => {
  };

  console.log(props.id)
  console.log(inputStr);

  const LogMessageSubmit = async (e) => {
    e.preventDefault();
    warningNotification()
    const LogMessageForm = new FormData();
    LogMessageForm.append("message", inputStr);
    LogMessageForm.append("task", props.id);
    LogMessageForm.append("user", user.id);


    try {
      const response = await axios({
        method: "POST",
        url: AMENDMENT_URL,
        data: LogMessageForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      console.log(response);
      submitNotification()
    } catch (err) {
      console.log(err);
      const errorNotification = (e) => {
        NotificationManager.error(err.message, "Error", 2000);
      };
      errorNotification();
    }
    window.location.replace('amendment')
  };
  console.log(props.id);


  
  return (
    <>
      <div className="row mt-4" style={{ boxSizing: "content-box" }}>
        <div className="col-1" style={{ position: "relative", bottom: "1rem" }}>
          <label htmlFor="log_note" className="col-form-label">
            <img src={user.avatar} alt="" className="avatar" />
          </label>
        </div>

        <div className="col-10">
          <textarea
            autosize="true"
            id="log_note"
            name="message"
            placeholder="Send Your Message..."
            className="form-control text-area"
            rows="2"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
          ></textarea>
        </div>
        <div className="col-1">
          <form onSubmit={LogMessageSubmit}>
            <button
              type="submit"
              className="btn btn-secondary message--send btn-sm"
              
            >
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-1 offset-1">
          <div className="dropdown">
            <button
              className="border-0 text-muted"
              type="button"
              id="dropdown1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-regular fa-face-smile p-1 icon text-muted"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdown1">
              <li>
                <Picker
                  pickerStyle={{ width: "100%" }}
                  width={300}
                  height={300}
                  onEmojiClick={onEmojiClick}
                  previewConfig={{
                    showPreview: false,
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="col-1 clip mx-2">
          <button
            className="border-0 text-muted"
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
    </>
  );
}

export default AmendmentLog;
