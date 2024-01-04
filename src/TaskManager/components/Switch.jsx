import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { useGroup } from "../../components/useUser";

export default function Switch(props) {
  const token = useContext(Context);
  const TASK_URL = process.env.REACT_APP_TASK;
  const groups = useGroup()

  const { register, handleSubmit, reset } = useForm()

  const submitNotification = (type) => {
    NotificationManager.success("New Task Created!", "", 2000);
  };
  const errorNotification = (e) => {
    NotificationManager.error('Nothing to Add', "Error!", 2000);
  };

  const [tasker, setTasker] = useState(props.data)

  useEffect(() => {
    axios.get(TASK_URL + props.id + '/', { headers: {
      Authorization: "Token " + token.user.token,
    }}).then((e) => {
      console.log(e.data);
      reset({
        installation: e.data.installation_confirmed
      })
    })
  }, [tasker])

  const SwitchSubmit = (data) => {
    const Form = new FormData()
    Form.append('installation_confirmed', data.installation)
    axios
      .patch(TASK_URL + props.id + '/', Form, { headers: {
        Authorization: "Token " + token.user.token,
      }
      }).then((e) => {
        setTasker(new Date())
        NotificationManager.success('Data Send Succesfully.')
      }).catch((e) => {
        console.log(e);
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
          </div>
          <div className="row mt-2">
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
