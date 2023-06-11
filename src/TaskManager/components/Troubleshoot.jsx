import React from "react";

export default function Troubleshoot() {
  return (
    <section>
      <h3>Troubleshoot</h3>
      <div className="card text-dark bg-light mb-3">
        <div className="card-header">Task details</div>
        <div className="card-body">
          <div className="row mt-1">
            <label
              htmlFor="troubleshoot_title"
              className="col-sm-1 col-form-label text-muted"
            >
              Title
            </label>
            <div className="col-sm-11">
              <input
                type="text"
                name=""
                id="troubleshoot_title"
                placeholder="..."
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-2">
            <label
              htmlFor="troubleshoot_address"
              className="col-sm-1 col-form-label text-muted"
            >
              Address
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                name=""
                id="troubleshoot_address"
                placeholder="..."
                className="form-control fw-bold"
              />
            </div>
            <label
              htmlFor="troubleshoot_contact"
              className="col-sm-1 col-form-label text-muted"
            >
              Contact
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                name=""
                id="troubleshoot_contact"
                placeholder="..."
                className="form-control fw-bold"
              />
            </div>
          </div>
          <div className="row mt-2">
            <label
              htmlFor="troubleshoot_problem"
              className="col-sm-1 col-form-label text-muted"
            >
              Problem
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                name=""
                id="troubleshoot_problem"
                placeholder="..."
                className="form-control fw-bold"
              />
            </div>
            <label
              htmlFor="troubleshoot_charge"
              className="col-sm-2 col-form-label text-muted"
            >
              Service Charge
            </label>
            <div className="col-sm-2">
              <input
                type="text"
                name=""
                id="troubleshoot_charge"
                placeholder="..."
                className="form-control fw-bold"
              />
            </div>
          </div>
          <div className="row mt-5" id="pills-tab" role="tablist">
            <div className="col-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <span
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Description
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
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-check ml-3">
          <h4 className="mt-3">Checklist</h4>
          <br />
          <div className="form-check ml-3">
            <ul className="list-unstyled">
              <li className="list-item">
                <input
                  type="checkbox"
                  className="form-check-input border border-primary"
                  name=""
                  id=""
                />
                &nbsp;Cable
              </li>
              <li className="list-item">
                <input
                  type="checkbox"
                  className="form-check-input border border-primary"
                  name=""
                  id=""
                />
                &nbsp;Stand
              </li>
              <li className="list-item">
                <input
                  type="checkbox"
                  className="form-check-input border border-primary"
                  name=""
                  id=""
                />
                &nbsp;Router
              </li>
              <li className="list-item">
                <input
                  type="checkbox"
                  className="form-check-input border border-primary"
                  name=""
                  id=""
                />
                &nbsp;Antenna
              </li>
              <li className="list-item">
                <input
                  type="checkbox"
                  className="form-check-input border border-primary"
                  name=""
                  id=""
                />
                &nbsp;Router OS
              </li>
              <li className="list-item">
                <input
                  type="checkbox"
                  className="form-check-input border border-primary"
                  name=""
                  id=""
                />
                &nbsp;Signal
              </li>
              <li className="list-item">
                <input
                  type="checkbox"
                  className="form-check-input border border-primary"
                  name=""
                  id=""
                />
                &nbsp;DNS
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="d-flex flex-row-reverse bd-highlight">
          <div className="bd-highlight">
            <button type="submit" className="btn btn-success">
              <i className="fa-duotone fa-floppy-disk"></i>
              &nbsp;Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
