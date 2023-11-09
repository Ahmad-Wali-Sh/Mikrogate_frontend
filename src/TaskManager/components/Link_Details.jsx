import React, { useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useGroup } from "../../components/useUser";

export default function Link_Details(props) {
  const [LinkDetailsData, setLinkDetailsData] = React.useState([]);
  const [count, setCount] = React.useState();
  const URL = process.env.REACT_APP_LINK;
  const groups = useGroup();

  const token = useContext(Context);

  const [trigger, setTrigger] = useState(0);

  React.useEffect(() => {
    axios
      .get(URL + `?id=${props.id}`, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setLinkDetailsData(res.data.results);
        setCount(res.data.count);
        console.log(res.data.results);
      });
  }, [trigger]);

  const submitNotification = (e) => {
    NotificationManager.success("Sent!", "", 2000);
  };

  const warningNotification = (e) => {
    NotificationManager.warning("Sending Your Data...", "Pending", 2000);
  };

  const [linkdetails, setLinkDetails] = React.useState({
    installation_type: "",
    device: "",
    access_point: "",
    signal: "",
    ccq: "",
    cable: "",
    connector: "",
    payment: "",
    bill_number: "",
    additional_details: "",
    installation_date: "",
    task: props.id,
  });

  const handleChange = (e) => {
    setLinkDetails({ ...linkdetails, [e.target.name]: e.target.value });
  };
  console.log(linkdetails.additional_details);

  const handleSubmit = async (e) => {
    e.preventDefault();
    warningNotification();
    const data = new FormData();

    Object.keys(linkdetails).map((key) => {
      data.append(
        linkdetails[key] != "" && key,
        linkdetails[key] != "" && linkdetails[key]
      );
    });

    if (linkdetails.installation_date != "") {
      data.append(
        "installation_date",
        new Date(linkdetails.installation_date).toISOString()
      );
    }

    try {
      const response = await axios({
        method: count > 0 ? "PATCH" : "POST",
        url:
          count > 0 ? URL + LinkDetailsData.map((item) => item.id) + "/" : URL,
        data: data,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      setTrigger((prev) => prev + 1);
      console.log(response);
      {
        response && submitNotification();
      }
    } catch (err) {
      console.log(err);
      const errorNotification = (e) => {
        NotificationManager.error(err.message, "Error!", 2000);
      };
      errorNotification();
    }
  };

  console.log(linkdetails);

  return (
    <div>
      {LinkDetailsData == false && groups.technician && (
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#linkModal"
          data-bs-whatever="@mdo"
        >
          Add Link Details
        </button>
      )}
      <div
        class="modal fade"
        id="linkModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Link Details Settings
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div class="mb-3 col-6">
                    <label for="pppoe_user" class="col-form-label">
                      Installation Type
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="installation_type"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      Device
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="device"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      Access Point
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="access_point"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      Signal
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="signal"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      CCQ
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="ccq"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      Cable
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="cable"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      Connector
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="connector"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      Payment
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="payment"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      Bill Number
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="bill_number"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3 col-6">
                    <label for="pppoe_password" class="col-form-label">
                      Installation Date
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      name="installation_date"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div class="mb-3 col-12">
                    <label for="message-text" class="col-form-label">
                      Additional Details:
                    </label>
                    <textarea
                      class="form-control"
                      id="message-text"
                      name="additional_details"
                      onChange={handleChange}
                      rows="5"
                    ></textarea>
                  </div>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {LinkDetailsData != false &&
          LinkDetailsData.map((item) => (
            <div className="card bg-light mb-3 mt-3">
              <div className="card-header">Link Details</div>
              <div className="card-body">
                {/* <div className="row">
                  <div className="col-5">
                    <label
                      htmlFor="customer_name"
                      className="col-form-label text-muted"
                    >
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="poc_name"
                      id="customer_name"
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={props.data.poc_name}
                    />
                  </div>
                  <div className="col-2"></div>
                  <div className="col-5">
                    <label
                      htmlFor="customer_id"
                      className="col-form-label text-muted"
                    >
                      Customer ID
                    </label>
                    <input
                      type="text"
                      name="contract_id"
                      id="customer_id"
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={props.data.contract_id}
                    />
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-5">
                    <label
                      htmlFor="installation_type"
                      className="col-form-label text-muted"
                    >
                      Installation Type
                    </label>
                    <input
                      type="text"
                      name="installation_type"
                      id="installation_type"
                      className="form-control"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      onChange={handleChange}
                      defaultValue={item.installation_type}
                    />
                  </div>
                  <div className="col-2"></div>
                  <div className="col-5">
                    <label
                      htmlFor="device"
                      className="col-form-label text-muted"
                    >
                      Device
                    </label>
                    <input
                      type="text"
                      name="device"
                      id="device"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={item.device}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <label
                      htmlFor="access_point"
                      className="col-form-label text-muted"
                    >
                      Access Point
                    </label>
                    <input
                      type="text"
                      name="access_point"
                      id="access_point"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={item.access_point}
                    />
                  </div>
                  <div className="col-2"></div>
                  <div className="col-5">
                    <label
                      htmlFor="signal"
                      className="col-form-label text-muted"
                    >
                      Signal
                    </label>
                    <input
                      type="text"
                      name="signal"
                      id="signal"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={item.signal}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <label htmlFor="ccq" className="col-form-label text-muted">
                      CCQ
                    </label>
                    <input
                      type="text"
                      name="ccq"
                      id="ccq"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={item.ccq}
                    />
                  </div>
                  <div className="col-2"></div>
                  <div className="col-5">
                    <label
                      htmlFor="cable"
                      className="col-form-label text-muted"
                    >
                      Cable
                    </label>
                    <input
                      type="text"
                      name="cable"
                      id="cable"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={item.cable}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <label
                      htmlFor="connector"
                      className="col-form-label text-muted"
                    >
                      Connector
                    </label>
                    <input
                      type="text"
                      name="connector"
                      id="connector"
                      className="form-control"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      onChange={handleChange}
                      defaultValue={item.connector}
                    />
                  </div>
                  <div className="col-2"></div>
                  <div className="col-5">
                    <label
                      htmlFor="payment"
                      className="col-form-label text-muted"
                    >
                      Payment
                    </label>
                    <input
                      type="text"
                      name="payment"
                      id="payment"
                      className="form-control"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      onChange={handleChange}
                      defaultValue={item.payment}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <label
                      htmlFor="bill_number"
                      className="col-form-label text-muted"
                    >
                      Bill Number
                    </label>
                    <input
                      type="text"
                      name="bill_number"
                      id="bill_number"
                      className="form-control"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      onChange={handleChange}
                      defaultValue={item.bill_number}
                    />
                  </div>
                  <div className="col-2"></div>
                  <div className="col-5">
                    <label
                      htmlFor="installation_date"
                      className="col-form-label text-muted"
                    >
                      Installation Date
                    </label>
                    <input
                      type="date"
                      name="installation_date"
                      id="installation_date"
                      disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                      className="form-control"
                      onChange={handleChange}
                      defaultValue={item.installation_date.slice(0, 10)}
                    />
                  </div>
                </div>

                <div className="row mt-3" id="pills-tab" role="tablist">
                  <div className="col-12">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <span
                          className="nav-item active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          Additional Details
                        </span>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <textarea
                          className="form-control border border-top-0 rounded-0"
                          placeholder="Leave a description here"
                          id="floatingTextarea"
                          rows="6"
                          disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                          onChange={handleChange}
                          name="additional_details"
                          defaultValue={item.additional_details}
                        ></textarea>
                        
                        {(groups.noc_manager || groups.noc_stuff) && <div className="modal-footer">
                          <button
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            type="submit"
                            >
                            Submit
                          </button>
                        </div>}
                            <small>by: {LinkDetailsData[0].user.name}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </form>
    </div>
  );
}
