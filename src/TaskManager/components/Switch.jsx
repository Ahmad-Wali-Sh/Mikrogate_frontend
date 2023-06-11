import React from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Switch(props) {
  const token = useContext(Context);
  const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;
  const INSTALL_URL = process.env.REACT_APP_INSTALLATION_CONFIRM;

  const [payment, setPayment] = React.useState(null);
  const [installtionCofirm, setInstallationConfirm] = React.useState(null);


  React.useEffect(() => {
    axios
      .get(PAYMENT_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => res.data.results.map((pay)=> (
        pay.task && props.id == pay.task ? setPayment(pay.payment) : ""
      )));
  }, []);

  React.useEffect(() => {
    axios
      .get(INSTALL_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => res.data.results.map((install => (
       install.task && props.id == install.task ? setInstallationConfirm(install.confirm) : ""
      ))));
  }, []);


  const handleSwitchInstall = async (e) => {
    let ask = window.confirm("Are You Sure to Confirm This Task Installation?")

    let isChecked = e.target.checked;
    ask == true ? setInstallationConfirm(true) : setInstallationConfirm(false);

    const SwitchInstallForm = new FormData();
    SwitchInstallForm.append("task", props.id);
    // SwitchInstallForm.append("user", props.data.user);
    SwitchInstallForm.append("confirm", e.target.checked);
    
    // try {
    //   const response = 
    //    await axios({
    //     url: INSTALL_URL,
    //     method: "POST",
    //     data: SwitchInstallForm,
    //     headers: {
    //       Authorization: "Token " + token.user.token,
    //     },
    //   })
    //   console.log(response)
    // } catch(err){console.log(err)})

   ask && await axios({
      url: INSTALL_URL,
      method: ask == true ? "POST": "GET",
      data: SwitchInstallForm,
      headers: {
        Authorization: "Token " + token.user.token,
      },
    }).then(res => console.log(res))


  }

  const handleSwitchPayment = async (e) => {
    let ask = window.confirm("Sure You Want To Confirm This Task Payment?")
    let isChecked = e.target.checked;
    ask == true ? setPayment(true) : setPayment(false)

    const SwitchPayForm = new FormData();
    SwitchPayForm.append("task", props.id);
    // SwitchInstallForm.append("user", props.data.user);
    SwitchPayForm.append("payment", e.target.checked);
    

    try {
      const response = 
      ask && await axios({
        url: PAYMENT_URL,
        method: ask == true ? "POST" : "GET",
        data: SwitchPayForm,
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      console.log(response)
    } catch(err){console.log(err)}

  }

  function handleSwitch(e) {
    setPayment(e.target.checked);
  }

  console.log(installtionCofirm)

  return (
    <>
      <div className="card bg-light mb-2 mt-2">
        <div className="card-body">
          <div className="row mt-2">
            <div className="col-4">Installation confirmed</div>
            {installtionCofirm != undefined &&
            <label  className={installtionCofirm == true ? "switch switch-checked": "switch"}>
               <input
                type="checkbox"
                name="installation"
                className={installtionCofirm == true ? "switch-checked": ""}
                id="switch"
                defaultChecked={installtionCofirm}
                onChange={(e) => handleSwitchInstall(e)}
              />
              <span className="slider round"></span>
            </label>}
            {installtionCofirm == null &&
            <label className={installtionCofirm == true ? "switch switch-checked": "switch"}>
               <input
                type="checkbox"
                name="installation"
                id="switch"
                className={installtionCofirm == true ? "switch-checked": ""}
                defaultChecked={installtionCofirm}
                onChange={(e) => handleSwitchInstall(e)}
              />
              <span className="slider round"></span>
            </label>}
          </div>
          <div className="row mt-2">
            <div className="col-4">Payment cleared</div>
            {payment != undefined && <label className={payment == true ? "switch switch-checked": "switch"}>
               <input
                type="checkbox"
                name="payment"
                id="switch"
                defaultChecked={payment}
                onChange={(e)=> handleSwitchPayment(e)}
              />
              <span className="slider round"></span>
            </label>}
            {payment == null && <label className={payment == true ? "switch switch-checked": "switch"}>
               <input
                type="checkbox"
                name="payment"
                id="switch"
                defaultChecked={payment}
                onChange={(e)=> handleSwitchPayment(e)}
              />
              <span className="slider round"></span>
            </label>}
          </div>
        </div>
      </div>
    </>
  );
}
