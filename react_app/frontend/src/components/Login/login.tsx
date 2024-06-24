
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import "./login.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// export const LoginPage = () => {

//   const navigate = useNavigate()

//   const [data, setData] = useState({
//     email: "",
//     password: ""
//   })

//   let name, value;

//   const handleInputs = (e: { target: { name: string; value: string; }; }) => {
//     name = e.target.name;
//     value = e.target.value;

//     setData({ ...data, [name]: value });
//   }

//   const login = async () => {

//     try {
//       let res = await axios.post("http://localhost:3030/login", { data }, { withCredentials: true });
//       console.log(res, "resloginn");
//       if (res.status === 200) {
//         navigate(`/home`);
//       }
//       else {
//         console.log(res, "resssss")
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response.data.message) {
//         const errorEle: HTMLElement = document.getElementById("id-error") as HTMLElement
//         errorEle.innerText = error.response.data.message;
//       }

//     }

//   }

//   return (
//     <>
//       <div className="center" id="loader"></div>
//       <div className="container">
//         <div className="form">
//           <div className="content">
//             <h2 className="card-title"><u>Login</u></h2>
//             <form action="" className="user" method="post">
//               <div className="email">
//                 <label id="email-label" >Email: </label>
//                 <input
//                   type="text"
//                   name="email"
//                   id="email"
//                   placeholder="Enter your email"
//                   className="dvalid"
//                   onChange={handleInputs}
//                 />

//               </div>

//               <div className="password">
//                 <label id="pass-label">Password:</label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="Enter your password"
//                   className="dvalid"
//                   onChange={handleInputs}
//                 />
//                 <p id="id-error" className="text-red-600"></p>
//               </div>
//               <div className="forgot-pass">
//                 <Link to="forgot-password" id="forgot-password"
//                 >Forgot Password?</Link>
//               </div>

//               <div className="submit">
//                 {/* <div id="submit" onClick={login}>Login</div> */}
//                 <input type="button" id="submit" value="Login" onClick={login} />
//               </div>

//               <div className="or">
//                 <div className="left"></div>
//                 <p>OR</p>
//                 <div className="right"></div>
//               </div>
//               <div className="mv-btn">
//                 <p>
//                   Create New Account?
//                   <Link to="/register" >register</Link>
//                 </p>
//               </div>
//             </form>
//             <div className="link"></div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


import { useState } from "react";
import { useAuth } from "./useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location, "locationnnnnnnnnnnnn");

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      email: username,
      password: password
    }

    try {
      let res = await axios.post("http://192.168.10.75:3030/login", { data }, { withCredentials: true });
      console.log(res, "resloginn");
      const user = res.data.user;
      // console.log(token);
      if (res.data.success) {
        await login({ user });
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }
      else {
        const errorEle: HTMLElement = document.getElementById("id-error") as HTMLElement
        errorEle.innerText = res.data.message;
      }
    }
    catch (error) {
      console.log(error);
      const errorEle: HTMLElement = document.getElementById("id-error") as HTMLElement
      errorEle.innerText = "issues during registration";
    }

    // if (username === "user" && password === "password") {
    //   // Replace with actual authentication logic
    //   await login({ username, password });
    // } else {
    //   alert("Invalid username or password");
    // }

  };

  const removeError = (id: string) => {
    const errorEle: HTMLElement = document.getElementById("id-error") as HTMLElement;
  }

  return (

    <>
      <div className="center" id="loader"></div>
      <div className="container">
        <div className="form">
          <div className="content">
            <h2 className="card-title"><u>Login</u></h2>
            <form action="" className="user" method="post" onSubmit={handleLogin} >
              <div className="email">
                <label id="email-label" >Email: </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="dvalid"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); removeError("id-error") }}
                />

              </div>

              <div className="password">
                <label id="pass-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="dvalid"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p id="id-error" className="text-red-600"></p>
              </div>
              <div className="forgot-pass">
                <Link to="forgot-password" id="forgot-password"
                >Forgot Password?</Link>
              </div>

              {/* <button type="submit">Login</button> */}

              <div className="submit">
                {/* <div id="submit" onClick={login}>Login</div> */}
                <button id="submit" type="submit">Login</button>
                {/* <input type="button" id="submit" value="Login" onClick={login} /> */}
              </div>

              <div className="or">
                <div className="left"></div>
                <p>OR</p>
                <div className="right"></div>
              </div>
              <div className="mv-btn">
                <p>
                  Create New Account?
                  <Link to="/register" >register</Link>
                </p>
              </div>
            </form>
            <div className="link"></div>
          </div>
        </div>
      </div>
    </>

    // <div>
    //   <form onSubmit={handleLogin}>
    //     <div>
    //       <label htmlFor="username">Username:</label>
    //       <input
    //         id="username"
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         id="password"
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
};