import React from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function UserService() {
  const token = useContext(Context);
  const ME_URL = process.env.REACT_APP_USER
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    axios
      .get(ME_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setUser(res.data));
    console.log(user);
  }, []);

  return <></>;
}
