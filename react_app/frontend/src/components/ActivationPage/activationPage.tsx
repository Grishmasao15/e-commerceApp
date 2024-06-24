import axios from "axios"
import "./activationPage.css"
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Activation = () => {

  const state = useLocation();
  const navigate = useNavigate();

  console.log(state, "state");
  // console.log(state.state, "stateeee");

  const activation_token = state.state.activation_token;
  const user_email = state.state.user_email

  // const obj = {
  //   activation_token: state.state.activation_token,
  //   user_email: state.state.user_email
  // }

  const [activationlink, setActivationlink] = useState("");
  const [activationmsg, setActivationMsg] = useState("");
  const [loginlink, setLoginLink] = useState("");
  const [relink, setReLink] = useState("");



  const act_code = async () => {

    let res = await fetch(`http://192.168.10.75:3030/act-code/${user_email}`);
    let resjson = await res.json();
    console.log(resjson.data, "new token");
    const new_token = resjson.data;
    setActivationlink(new_token)
    // document.getElementById("activation-token").innerText = new_token;
    // document.getElementById("activation-token").value = new_token;

  }
  act_code();


  const activation_check = async () => {

    let res = await fetch(`http://192.168.10.75:3030/activation-account/${activationlink}/${user_email}`);
    let resjson = await res.json();
    console.log(resjson, "reasqs");
    if (resjson.success) {
      setActivationMsg("Your account is activated.Click on below link to login!");
      setLoginLink("Login")
      return;
    }
    if (resjson.message === "link activated") {
      navigate(`/login`);
    }
    else {
      setActivationMsg("Link is expired.Click on below link to regenerate the link!")
      setReLink("Regenerate Link")
    }

  }

  const regenLink = async () => {
    let res = await fetch(`http://192.168.10.75:3030/reactivation-code/${user_email}`)
    let resjson = await res.json();
    console.log(resjson.data, "data");
    const token = resjson.data;

    setActivationlink(token)
    setActivationMsg("")
    setReLink("")
    act_code();



  }

  return (
    <>
      <div className="container">
        <div className="thanks-registration">
          <p className="thanks-msg">Thank You for Your Registration!</p>
          <p className="activate-msg">Click on Below Link to Activate Your Account</p>
          <p className="activate-link cursor-pointer" id="activation-token" onClick={activation_check}>{activationlink}</p>
          <p id="activated-msg">{activationmsg}</p>
          <Link to="/login" id="login-link" className="cursor-pointer">{loginlink}</Link>
          <div id="re-link" className="cursor-pointer" onClick={regenLink}>{relink}</div>
        </div>
      </div>
    </>
  )
}