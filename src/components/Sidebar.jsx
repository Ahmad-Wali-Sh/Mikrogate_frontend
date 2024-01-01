import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { useGroup } from "./useUser";

export default function Sidebar() {
  const url = process.env.REACT_APP_USER;
  const [user, setUser] = useState([]);
  const token = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      });
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const groups = useGroup();
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
          <img
            src="./dist/img/mg.png"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
            alt=""
          />
          <span className="brand-text font-weight-light">MIKROGATE</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <>
              <div className="image">
                <img
                  src={user.avatar}
                  className="img-circle elevation-2"
                  alt=""
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  {user.name}
                </a>
              </div>
            </>
          </div>
          <nav className="mt-2" role="navigation">
            <ul
              className="nav  nav-sidebar flex-column"
              data-widget="treeview"
              role="navigation"
              data-accordion="true"
            >
              {(groups.noc_stuff || groups.noc_manager || groups.l1) && (
                <li
                  className={`nav-item ${
                    groups.noc_stuff == true
                      ? "menu-open"
                      : groups.noc_manager == true
                      ? "menu-open"
                      : groups.l1 == true
                      ? "menu-open"
                      : ""
                  }`}
                >
                  <ul className="nav nav-treeview">
                    <div className="nav-header">Network Operation Center</div>
                    <li className="nav-item">
                      <Link to="/task-manager/noc" className="nav-link">
                        <i className="fa-solid fa-people-roof nav-icon"></i>
                        <p>NOC</p>
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link to="/task-manager/technicians" className="nav-link">
                        <i className="fa-solid fa-clipboard-user nav-icon"></i>
                        <p>My Tasks</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {(groups.sales_manager || groups.sales_stuff) && (
                <li
                  className={`nav-item ${
                    groups.sales_stuff == true
                      ? "menu-open"
                      : groups.sales_manager == true
                      ? "menu-open"
                      : ""
                  }`}
                >
                  <ul className="nav nav-treeview">
                    <div className="nav-header">Sales</div>
                    <li
                      className={`nav-item ${
                        groups.sales_stuff == true
                          ? "menu-open"
                          : groups.sales_manager == true
                          ? "menu-open"
                          : ""
                      }`}
                    >
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <Link className="nav-link" to="/search">
                            <i className="fa-solid fa-files nav-icon"></i>
                            <p>All Contracts</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/new-contract/">
                            <i className="fa-solid fa-file-circle-plus nav-icon"></i>
                            <p>New Contract</p>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link to="/packages" className="nav-link">
                        <i className="fa-solid fa-box-open nav-icon"></i>
                        <p>Package List</p>
                      </Link>
                      <Link className="nav-link" to="/antenna">
                        <i className="fa-solid fa-satellite-dish nav-icon"></i>
                        <p> Antenna</p>
                      </Link>
                      <Link className="nav-link" to="/routers/">
                        <i className="fa-solid fa-router nav-icon"></i>
                        <p> Router</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {(groups.finance_manager || groups.finance) && (
                <li className={`nav-item menu-open`}>
                  <div className="nav-header">Finance</div>
                  <ul className="nav nav-treeview">
                    <li className="nav-item ">
                      <Link to="/" className="nav-link">
                        <i className="fa-solid fa-clipboard-user nav-icon"></i>
                        <p>Finance</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {groups.technician && (
                <li
                  className={`nav-item ${
                    groups.technician == true ? "menu-open" : ""
                  }`}
                >
                  <div className="nav-header">Technicians</div>
                  <ul className="nav nav-treeview">
                    <li className="nav-item ">
                      <Link to="/task-manager/technicians" className="nav-link">
                        <i className="fa-solid fa-clipboard-user nav-icon"></i>
                        <p>My Tasks</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
