import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";

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
  return (
    <div>
      {/* <!-- Main Sidebar Container --> */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* <!-- Brand Logo --> */}
        <a href="index3.html" className="brand-link">
          <img
            src="./dist/img/mg.png"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
            alt=""
          />
          <span className="brand-text font-weight-light">MIKROGATE</span>
        </a>

        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user panel (optional) --> */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            {/* {user.map((item) => ( */}
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
            {/* ))} */}
          </div>

          {/* <!-- SidebarSearch Form --> */}
          

          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <div className="nav-link active">
                  <i className="nav-icon fa-solid fa-gauge"></i>
                  <p>
                    Dashboard
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview">
                  <div className="nav-header">Administration</div>
                  <li className="nav-item">
                    <Link to="/task-manager/noc" className="nav-link">
                      <i className="fa-solid fa-people-roof nav-icon"></i>
                      <p>Admin</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/task-manager/noc" className="nav-link">
                      <i className="fa-solid fa-people-roof nav-icon"></i>
                      <p>Manager</p>
                    </Link>
                  </li>
                  <div className="nav-header">Network Operations Center</div>
                  <li className="nav-item">
                    <Link to="/task-manager/noc" className="nav-link">
                      <i className="fa-solid fa-people-roof nav-icon"></i>
                      <p>NOC</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/task-manager/technicians" className="nav-link">
                      <i className="fa-solid fa-clipboard-user nav-icon"></i>
                      <p>Technicians</p>
                    </Link>
                  </li>
                  <div className="nav-header">Sales</div>
                  <li className="nav-item">
                    <Link to="/search" className="nav-link">
                      <i className="fa-solid fa-cart-shopping nav-icon"></i>
                      <p>Sales</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <div className="nav-link active">
                  <i className="nav-icon fa-solid fa-cart-shopping"></i>
                  <p>
                    SALES
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview">
                  <div className="nav-header">Contracts</div>
                  <li className="nav-item ">
                    <a href="" className="nav-link">
                      <i className="fa-solid fa-file-contract nav-icon"></i>
                      <p>
                        Contracts
                        <i className="right fas fa-angle-left"></i>
                      </p>
                    </a>
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
                  <div className="nav-header">Package</div>
                  <li className="nav-item">
                    <Link to="/packages" className="nav-link">
                      <i className="fa-solid fa-box-open nav-icon"></i>
                      <p>Package List</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <i className="fa-solid fa-microchip nav-icon"></i>
                      <p>
                        Devices
                        <i className="right fas fa-angle-left"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link className="nav-link" to="/antenna">
                          <i className="fa-solid fa-satellite-dish nav-icon"></i>
                          <p> Antenna</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/routers/">
                          <i className="fa-solid fa-router nav-icon"></i>
                          <p> Router</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <div className="nav-link active">
                  <i className="nav-icon fa-solid fa-bars-progress"></i>
                  <p>
                    Task Manager
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/task-manager" className="nav-link">
                      <i className="fa-solid fa-clipboard-user nav-icon"></i>
                      <p>Task Manager</p>
                    </Link>
                  </li>
                </ul>
              </li>
              
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </div>
  );
}
