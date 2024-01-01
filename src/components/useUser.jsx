import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";

export const useGroup = () => {
  const url = process.env.REACT_APP_USER;
  const token = useContext(Context);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: "Token " + token?.user?.token,
        },
      });
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const [groups, setGroups] = useState({
    noc_manager: "",
    sales_manager: "",
    noc_stuff: "",
    sales_stuff: "",
    technician: "",
    admin: "",
    manager: "",
    l1: "",
    finance: "",
  });

  console.log(user)
  const checkForGroup = () => {
    if (user?.groups?.includes("NOC Stuff")) {
      setGroups((prev) => ({
        ...prev,
        noc_stuff: true,
      }));
    }
    if (user?.groups?.includes("Sales Management")) {
      setGroups((prev) => ({
        ...prev,
        sales_manager: true,
      }));
    }
    if (user?.groups?.includes("NOC Management")) {
      setGroups((prev) => ({
        ...prev,
        noc_manager: true,
      }));
    }
    if (user?.groups?.includes("Sales Stuff")) {
      setGroups((prev) => ({
        ...prev,
        sales_stuff: true,
      }));
    }
    if (user?.groups?.includes("Technicians")) {
      setGroups((prev) => ({
        ...prev,
        technician: true,
      }));
    }
    if (user?.groups?.includes("L1")) {
      setGroups((prev) => ({
        ...prev,
        l1: true,
      }));
    }
    if (user?.groups?.includes("Finance")) {
      setGroups((prev) => ({
        ...prev,
        finance: true,
      }));
    }
  };

  useEffect(() => {
    checkForGroup();
  }, [user]);

  return groups;
};
