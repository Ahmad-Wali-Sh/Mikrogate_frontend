import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../../context/Context";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function OnlineChange() {
  const location = useLocation();
  const data = location.state?.data;
  const token = useContext(Context);
  const ONLINE_URL = process.env.REACT_APP_ONLINE;
  const TASK_URL = process.env.REACT_APP_TASK;

  console.log(data);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const ChangeToTroubleshoot = () => {
    const Form = new FormData();
    Form.append("title", title);
    Form.append("project", 2);
    axios
      .patch(TASK_URL + data.id + "/", Form, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        axios.get(
            TASK_URL + res.data.id + '/', { headers: {
                Authorization: "Token " + token.user.token,
            }}
        ).then((res) => {
            navigate("/task-manager/troubleshoot", {
              state: { data: res.data },
            });
        })
      });
  };

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Change Task To Troubleshoot
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="row mt-2">
                  <label
                    htmlFor="troubleshoot_address"
                    className="col-sm-2 col-form-label text-muted"
                  >
                    New_Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="title"
                      id="troubleshoot_address"
                      placeholder="..."
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-success "
                    onClick={() => ChangeToTroubleshoot()}
                  >
                    Change Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 mt-2">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          data-bs-whatever="@mdo"
        >
          Change To Troubleshoot
        </button>
      </div>
    </>
  );
}
