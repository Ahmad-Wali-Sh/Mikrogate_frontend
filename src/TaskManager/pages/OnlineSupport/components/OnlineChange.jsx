import React, { useEffect, useState } from "react";
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
  const PROJECT_URL = process.env.REACT_APP_PROJECT;

  console.log(data);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [projectInput, setProjectInput] = useState();

  const ChangeToTroubleshoot = () => {
    const Form = new FormData();
    Form.append("title", title);
    Form.append("project", projectInput);
    axios
      .patch(TASK_URL + data.id + "/", Form, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        axios
          .get(TASK_URL + res.data.id + "/", {
            headers: {
              Authorization: "Token " + token.user.token,
            },
          })
          .then((res) => {
            if (res.data.project.name == "Troubleshoot")
              navigate("/task-manager/troubleshoot", {
                state: { data: res.data },
              });
            if (res.data.project.name == "Online Support")
              navigate("/task-manager/online_support", {
                state: { data: res.data },
              });
            if (res.data.project.name == "CPE")
              navigate("/task-manager/cpe", {
                state: { data: res.data },
              });
          });
      });
  };

  const [project, setProject] = useState([]);

  useEffect(() => {
    axios
      .get(PROJECT_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setProject(res.data.results);
      });
  }, []);

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
                  Change Task
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
                    className="col-sm-3 col-form-label text-muted"
                  >
                    New Title
                  </label>
                  <div className="col-sm-9">
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
                  <label
                    htmlFor="troubleshoot_address"
                    className="col-sm-3 col-form-label text-muted"
                  >
                    New Project
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setProjectInput(e.target.value);
                      }}
                    >
                      <option></option>
                      {project.map(
                        (pro) =>
                          pro.name != "Amendment" &&
                          pro.name != "Installation" &&
                          pro.name != data.project.name && (
                            <option value={pro.id}>{pro.name}</option>
                          )
                      )}
                    </select>
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
          Change Task
        </button>
      </div>
    </>
  );
}
