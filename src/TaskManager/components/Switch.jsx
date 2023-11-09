import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { useGroup } from "../../components/useUser";

export default function Switch(props) {
  const token = useContext(Context);
  const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;
  const INSTALL_URL = process.env.REACT_APP_INSTALLATION_CONFIRM;
  const ME_URL = process.env.REACT_APP_USER;
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    axios
      .get(ME_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => setUser(res.data));
  }, []);

  const groups = useGroup()

  const { register, handleSubmit, reset } = useForm()

  const [payment, setPayment] = React.useState(null);
  const [installtionCofirm, setInstallationConfirm] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(PAYMENT_URL, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) =>{
        setPayment(res.data.results[0])
        reset({
          payment: payment?.payment ? payment?.payment : ''
        })
      }
      );
  }, []);

  React.useEffect(() => {

    reset({
      payment: payment?.payment ? payment?.payment : false,
      installation: installtionCofirm?.confirm ? installtionCofirm.confirm : false
    })
  }, [payment, installtionCofirm])

  React.useEffect(() => {
    axios
      .get(INSTALL_URL + '?task=' + props.id, {
        headers: {
          Authorization: "Token " + token.user.token,
        },
      })
      .then((res) => {
        setInstallationConfirm(res.data.results[0])
        reset({
          installation: installtionCofirm?.confirm ? installtionCofirm.confirm : ''
        })
      }
      );
  }, []);

  console.log(payment)
  console.log(installtionCofirm)


  const handleSwitchInstall = (data) => {

  }

  const submitNotification = (type) => {
    NotificationManager.success("New Task Created!", "", 2000);
  };
  const errorNotification = (e) => {
    NotificationManager.error('Nothing to Add', "Error!", 2000);
  };

  const SwitchSubmit = (data) => {

    const SwitchInstallForm = new FormData()
    SwitchInstallForm.append('task', props.id)
    SwitchInstallForm.append('confirm', data.installation)


    const SwitchPaymentForm = new FormData()
    SwitchPaymentForm.append('task', props.id)
    SwitchPaymentForm.append('payment', data.payment)

    axios({
      url: INSTALL_URL + `${installtionCofirm?.id ? installtionCofirm.id + '/' : ''}`,
      method: installtionCofirm?.id ? 'PATCH' : 'POST',
      data: SwitchInstallForm,
      headers: {
        Authorization: 'Token ' + token.user.token
      }
    }).then((res) => {
      console.log(res.data)
      submitNotification()
    }).catch(()=> {
      errorNotification()
    })

    axios({
      url: PAYMENT_URL + `${payment?.id ? payment?.id + '/' : ''}`,
      method: payment?.id ? 'PATCH' : 'POST',
      data: SwitchPaymentForm,
      headers: {
        Authorization: 'Token ' + token.user.token
      }
    }).then((res) => {
      console.log(res.data)
      submitNotification()
    }).catch(()=> {
      errorNotification()
    })

  }
  

  return (
    <>
      <div className="card bg-light mb-2 mt-2">
        <div className="card-body">
          <div className="row mt-2">
            
            <div className="col-4">Installation confirmed</div>
              <label
                className="switch"
                >
                <input
                  type="checkbox"
                  name="installation"
                  {...register('installation')}
                  id="switch"
                  disabled={(groups?.noc_manager || groups.noc_stuff) ? false : true}
                  />
                <span className="slider round"></span>
              </label>
            <div className="col-6"><small>{`${installtionCofirm && 'by: ' + installtionCofirm?.user.name}`}</small></div>
          </div>
          <div className="row mt-2">
            <div className="col-4">Payment cleared</div>
            
              <label className="switch">
                <input
                  type="checkbox"
                  name="payment"
                  id="switch"
                  {...register('payment')}
                  disabled={(groups?.noc_manager || groups.noc_stuff) ? false : true}
                />
                <span className="slider round"></span>
              </label>
              <div className="col-6"><small>{`${payment && 'by: ' + payment?.user.name}`}</small></div>
            {(groups?.noc_manager || groups.noc_stuff) && (
              <div className="modal-footer">
              <button className="btn btn-success" type="submit" onClick={handleSubmit(SwitchSubmit)}>
                Submit
              </button>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
