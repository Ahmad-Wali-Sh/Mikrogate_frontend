import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Amendment() {
  const location = useLocation();
  const data = location.state?.data;
 

  return (
    <section>
        <>
          <h3>Amendment</h3>
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
                    value={data.title}
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
                        value={data.description}
                      ></textarea>
                    </div>
                  </div>
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
          </div>
        </>
    </section>
  );
}
