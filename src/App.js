import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./pages/cont.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Footer from "./components/Footer";
import NewContract from "./pages/NewContract";
import SingleContract from "./pages/SingleContract";
import Routers from "./pages/Routers";
import Login from "./pages/Login";
import Search from "./pages/Test/Reports";
import { useContext } from "react";
import { Context } from "./context/Context";
import Antenna from "./pages/Antenna";
import TestPrint from "./pages/Test/TestPrint";
import AmedmentPrint from "./pages/Test/AmendmentPrint";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "react-notifications/lib/notifications.css";
import TestWebSocket from "./pages/Test/TestWebSocket";
import History from "./pages/History";

// TASK-MANAGER
import TaskManager from "./TaskManager/pages/LandingPage/TaskManager";
import TaskDetails from "./TaskManager/pages/Installation/TaskDetails";
import TroubleshootDetails from "./TaskManager/pages/Troubleshoot/TroubleshootDetails";
import OnlineSupportDetails from "./TaskManager/pages/OnlineSupport/OnlineSupportDetails";
import ChangeLocationDetails from "./TaskManager/pages/ChangeLocation/ChangeLocationDetails";
import AmendmentDetails from "./TaskManager/pages/Amendment/AmendmentDetails";
import NocContractList from "./pages/Dashboards/NOC/NocContractList";
import NocDashboard from "./pages/Dashboards/NOC/NocDashboard";

export default function App() {
  const { user } = useContext(Context);
  // const user = true

  return (
    <div className="wrapper">
      <NotificationContainer />
      <Router>
        {user ? <Header /> : ""}
        {user ? <Sidebar /> : ""}
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route path="/test" element={<TestWebSocket />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/routers" element={<Routers />} />
          <Route path="/antenna" element={<Antenna />} />
          <Route path="/new-contract" element={<NewContract />} />
          <Route path="/contract-details" element={<SingleContract />} />
          <Route path="/search" element={<Search />} />
          <Route path="test_print" element={<TestPrint />} />
          <Route path="amendment-print" element={<AmedmentPrint />} />
          <Route path="history" element={<History />} />
          <Route path="/task-manager" element={<TaskManager />} />
          <Route path="/task-manager/details" element={<TaskDetails />} />
          <Route path="/task-manager/troubleshoot" element={<TroubleshootDetails />} />
          <Route path="/task-manager/online_support" element={<OnlineSupportDetails />} />
          <Route path="/task-manager/change_location" element={<ChangeLocationDetails />} />
          <Route path="/task-manager/amendment" element={<AmendmentDetails />} />
          <Route path="/task-manager/noc" element={<NocDashboard />} />
          <Route path="/task-manager/noc-contracts" element={<NocContractList />} />
        </Routes>
        {user ? <Footer /> : ""}
      </Router>
    </div>
  );
}
