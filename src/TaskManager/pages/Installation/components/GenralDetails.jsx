import React from "react"
import { useLocation } from "react-router-dom";
import { useGroup } from "../../../../components/useUser";

export default function GeneralDetails (props) {
    const location = useLocation();
    const data = location.state?.data;

    const groups = useGroup()

    console.log(groups);
   
    return (
        <>
        <h3 className="mt-3">General Details</h3>
          <div className="row mt-3">
            <label
              htmlFor="inputEmail3"
              className="col-2 col-form-label text-muted"
            >
              Contract number
            </label>
            <div className="col-4">
              <input
                type="text"
                name="contract_number"
                id="inputEmail3"
                placeholder="..."
                className="form-control"
                disabled
                defaultValue={data.contract.contract_number}
              />
            </div>
            <label
              htmlFor="inputEmail3"
              className="col-1 col-form-label text-muted"
            >
              <sapn className="textwrap">POC Name</sapn>
            </label>
            <div className="col-4 offset-1">
              <input
                type="text"
                name="contract_poc_name"
                id="inputEmail3"
                placeholder="..."
                disabled
                className="form-control"
                defaultValue={data.contract.name}
              />
            </div>
          </div>
          <div className="row mt-1">
            <label
              htmlFor="inputEmail3"
              className="col-sm-2 col-form-label text-muted"
            >
              Contact
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                name="contract.poc_number"
                id="inputEmail3"
                placeholder="..."
                className="form-control"
                disabled
                defaultValue={data.contract.contact}
              />
              {props.contact}
            </div>
            <label
              htmlFor="inputEmail3"
              className="col-1 col-form-label text-muted"
            >
              Organization
            </label>
            <div className="col-4 offset-1">
              <input
                type="text"
                name="organization"
                id="inputEmail3"
                // disabled={(groups.noc_manager || groups.noc_stuff) ? false : true}
                disabled
                placeholder="..."
                className="form-control"
                defaultValue={data.contract.organization}
              />
              {props.organization}
            </div>
          </div>
          <div className="row mt-1">
            <label
              htmlFor="inputEmail3"
              className="col-sm-2 col-form-label text-muted"
            >
              Address
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="address"
                id="inputEmail3"
                disabled
                placeholder="..."
                className="form-control"
                defaultValue={data.contract.address}
              />
              {props.address}
            </div>
          </div>
          <div className="row mt-1">
            <label
              htmlFor="inputEmail3"
              className="col-sm-2 col-form-label text-muted"
            >
              Bandwidth
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="packages"
                id="inputEmail3"
                disabled
                placeholder="..."
                className="form-control"
                defaultValue={data.contract.packages}
              />
              {props.package}
            </div>
          </div>
          <div className="row mt-1" id="pills-tab" role="tablist">
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
                ></div>
              </div>
            </div>
          </div>
          <textarea
            className="form-control border-top-0"
            placeholder="Leave a description here"
            id="floatingTextarea"
            disabled
            rows="6"
            defaultValue={data.description}
          ></textarea>
        </>
    )
}