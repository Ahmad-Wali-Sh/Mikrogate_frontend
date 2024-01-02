import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../../context/Context";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useRealtime } from "../../../../components/Services";
import { useGroup } from "../../../../components/useUser";

export default function OnlineChange() {
  const location = useLocation();
  const data = location.state?.data;
  const token = useContext(Context);
  const ONLINE_URL = process.env.REACT_APP_ONLINE;
  const TASK_URL = process.env.REACT_APP_TASK;
  const PROJECT_URL = process.env.REACT_APP_PROJECT;

  const groups = useGroup()

  console.log(data);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [projectInput, setProjectInput] = useState();
  const { NotifySubmit } = useRealtime()

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
        NotifySubmit('Task Changed.', data.id, 'noc')
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

  const titles = [
    `Installation`,
    `Troubleshoot`,
    `Online Support`,
    `Change location`,
    `Connection`,
    `Connection (checking adapters, PoE and cable by customer)`,
    `Connection (rebooting antenna)`,
    `Connection (rebooting antenna and MikroTik router)`,
    `Connection (rebooting antenna and router)`,
    `Connection (rebooting antenna manually)`,
    `Connection (rebooting antenna using MAC Telnet)`,
    `Connection (rebooting MikroTik router)`,
    `Connection (rebooting router)`,
    `Connection (connecting cable to configured port)`,
    `Checking connection`,
    `Checking connection (internal network problem)`,
    `Connection (changing WiFi frequency)`,
    `Connection (changing WiFi setting)`,
    `Connection (changing WiFi settings and frequency)`,
    `Connection (specified device is not connected)`,
    `Changing WiFi password`,
    `Connection (Customer Antenna Power Off)`,
    `Connection (Customer Cable Problem)`,
    `Connection (Router Login Details, bring to the office)`,
    `Connection (Router Port Problem)`,
    `Speed (Internal WiFi Device Problem)`,
    `Sharing SAS portal with login details and training
    images`,
    `Accessing Website`,
    `Training (how to connect to hidden WiFi)`,
    `Training (how to login to Mikrogate App)`,
    `Queues(Increasing speed of all network)`,
    `Sharing WiFi password`,
    `Enabling SSID broadcast`,
    `Disabling SSID broadcast`,
    `Sharing Telegram bot with login details and video`,
    `Explaining how to login to Telegram bot`,
    `Limiting 1 device`,
    `Limiting # devices`,
    `Unlimiting 1 device`,
    `Unlimiting # devices`,
    `Limiting all network except 1 device`,
    `Limiting all network except # devices`,
    `Limiting all network`,
    `Unlimiting all network`,
    `Adding PCQ in antenna`,
    `Adding PCQ in router`,
    `Blocking 1 device`,
    `Blocking # devices`,
    `Unblocking 1 device`,
    `Unblocking # devices`,
    `Blocking all network except 1 device`,
    `Blocking all network except # devices`,
    `Speed`,
    `Speed (full usage)`,
    `Speed (all bandwidth can be received)`,
    `Speed (all daily traffic is used)`,
    `Speed (changing WiFi frequency)`,
    `Speed (changing WiFi setting)`,
    `Speed (changing WiFi settings and frequency)`,
    `Speed (the connected device was limited)`,
    `Speed (rebooting MikroTik router)`,
    `Speed (rebooting router)`,
    `Speed (upgrading antenna)`,
    `Speed (upgrading MikroTik router)`,
    `Speed (Internal WiFi Device Problem)`,
    `Enabling MAC filtering (Access List)`,
    `Enabling MAC filtering (static-only)`,
    `Disabling MAC filtering (Access List)`,
    `Disabling MAC filtering (static-only)`,
    `Adding 1 device to Access List`,
    `Adding # devices to Access List`,
    `Adding 1 device to Leases`,
    `Adding # devices to Leases`,
    `Signal (cooperating with customer to find better signal)`,
    `Checking signal`,
    `Configuration`,
    `Configuration (antenna)`,
    `Configuration (MikroTik router)`,
    `Configuration (router)`,
    `Online game (PUBG)`,
    `Online game (other)`,
    `Checking and explaining customer usage`,
    `Sharing information`,
    `Change Wifi SSID`,
    `Sharing information (expiration and remaining traffic)`,
    `Sharing information (list of connected devices)`,
    `Sharing information (list of connected devices utilizing bandwidth)`,
    `Sharing information (MikroTik router configuration details)`,
    `Sharing information (MikroTik router login details)`,
    `Sharing information (router login details)`,
    `Training (how to login and configure router)`,
    `Training (how to login and change WiFi password)`,
    `Training (how to connect to WiFi)`,
    `Training (how to connect to hidden WiFi)`,
    `Checking equipment (cable)`,
    `Checking equipment (router)`,
    `Checking equipment (router and adapter)`,
    `Checking equipment (PoE)`,
    `Checking equipment (PoE and adapter)`,
    `Checking equipment (antenna)`,
    `Checking equipment (router, PoE and adapters)`,
    `Checking equipment (router, PoE, adapters and cable)`,
    `Setting unfiltered DNS`,
    `Setting filtered DNS`,
    `Other (please specify in task description)`,
    `Signal and CCQ`,
    `Changing access point`,
    `Speed`,
  ];

  return (
    <>
      {(groups.noc_manager || groups.noc_stuff || groups.l1) && (
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
                    {/* <input
                      type="text"
                      name="title"
                      id="troubleshoot_address"
                      placeholder="..."
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="form-control"
                    /> */}
                    <input list="browsers" type="text"
                                      name="title"
                                      className="form-control"
                                      onChange={(e) => {
                                        setTitle(e.target.value);
                                      }}
                                      autoComplete="off"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1" />
                                    <datalist id="browsers">
                                      {titles.map((title) => (
                                        <option value={title}></option>
                                      ))}
                                    </datalist>
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
      )}
    </>
  );
}
