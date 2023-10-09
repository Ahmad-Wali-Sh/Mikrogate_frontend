import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";

export const useGroup = () => {
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

  const [groups, setGroups] = useState({
    noc_manager: "",
    sales_manager: "",
    noc_stuff: "",
    sales_stuff: "",
    technician: "",
    admin: "",
    manager: "",
  });
  const checkForGroup = () => {
    if (user?.groups?.includes(3)) {
      setGroups((prev) => ({
        ...prev,
        noc_stuff: true,
      }));
    }
    if (user?.groups?.includes(1)) {
      setGroups((prev) => ({
        ...prev,
        sales_manager: true,
      }));
    }
    if (user?.groups?.includes(1)) {
      setGroups((prev) => ({
        ...prev,
        sales_manager: true,
      }));
    }
    if (user?.groups?.includes(2)) {
      setGroups((prev) => ({
        ...prev,
        noc_manager: true,
      }));
    }
    if (user?.groups?.includes(4)) {
      setGroups((prev) => ({
        ...prev,
        sales_stuff: true,
      }));
    }
    if (user?.groups?.includes(5)) {
      setGroups((prev) => ({
        ...prev,
        technician: true,
      }));
    }
  };

  useEffect(() => {
    checkForGroup();
  }, [user]);

  return groups
};
