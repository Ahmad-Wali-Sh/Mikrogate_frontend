
import axios from "axios";
import { useContext } from "react";
import { useRef } from "react";
import { Context } from "../context/Context";

export default function Login() {

  document.title = 'Mikrogate | LOGIN';
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post(process.env.REACT_APP_LOGIN,{
        username: emailRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data});
      console.log(res)
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
      console.log(err)
    }
  }

    return (
      <div>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              {/* <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">Login #01</h2>
              </div> */}
            </div>
            <div className="row justify-content-center">
              <div className="col-md-7 col-lg-5 mt-5">
                <div className="login-wrap p-4 p-md-5">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="fa fa-user-o"></span>
                  </div>
                  <h3 className="text-center mb-4">Sign In</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        className="form-control rounded-left"
                        placeholder="Email"
                        ref={emailRef}
                      />
                      
                    </div>
                    <div className="form-group d-flex">
                      <input
                        type="password"
                        name="password"
                        className="form-control rounded-left"
                        placeholder="Password"
                        ref={passwordRef}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary rounded submit px-3"
                      >
                        Login
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50">
                        <label className="checkbox-wrap checkbox-primary">
                          Remember Me
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a >Forgot Password</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
