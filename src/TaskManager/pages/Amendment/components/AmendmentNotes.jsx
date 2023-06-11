import React from "react";
import axios from "axios";
import { Context } from "../../../../context/Context";
import { useContext } from "react";

function AmendmentNotes(props) {

  const token = useContext(Context);

  const [amendmentNote, setAmendmentNote] = React.useState([]);

  const AMENDMENT_URL = process.env.REACT_APP_AMENDMENT

  React.useEffect(() => {
    axios.get(AMENDMENT_URL + `?id=${props.id}`, {
      headers: {
        Authorization: "Token " + token.user.token,
      },
    }).then((res) => {
      setAmendmentNote(res.data.results);
    });
  }, []);

  console.log(amendmentNote);

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
      {amendmentNote  
      .map((item) => (
        <div className="card-body shadow p-3 bg-body rounded col-12  ">
          <div className="row align-items-center mb-3 pb-4 amendment--note">
            <div className="col-1 col-md-1 col-sm-2 ">
              <label htmlFor="log_note" className="col-form-label">
                <img src="../images/avatar1.jpeg" alt="" className="avatar" />
              </label>
            </div>
            <div className="col-5 mx-3 mb-1">{item.user.name}</div>
            <div
              className="col-3 offset-1 deadline text-muted mb-1"
              style={{ fontSize: "12px" }}
            >
              {new Date(item.created).getDate() == new Date().getDate()
                      ? "Today" + " " + created(item.created)
                      : new Date(item.created).toDateString().slice(0,10)}
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
              {item.message}
              
            </div>
          </div>
        </div>
       ))} 
    </>
  );
}

export default AmendmentNotes;
