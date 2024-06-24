import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';

interface valuesInterface {
  fname: string,
  lname: string,
  phone: string,
  email: string,
  gender: string,
  dob: string,
  password: string,
  confirmPassword: string
}

const validate = (values: valuesInterface) => {

  const errors: valuesInterface = {} as valuesInterface;

  console.log(values, "valuessssss");

  console.log(values, "values");
  let phoneRegex: RegExp = /^([6-9]{1})([0-9]{9})$/;
  let passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const currentDate = new Date();
  const userDate = new Date(values.dob)

  if (!values.fname) {
    errors.fname = 'Required';
  } else if (values.fname.length > 15) {
    errors.fname = 'Must be 15 characters or less';
  }

  if (!values.lname) {
    errors.lname = 'Required';
  } else if (values.lname.length > 20) {
    errors.lname = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'please enter valid email';
  }

  if (!values.dob) {
    errors.dob = "Required"
  }
  else if (userDate > currentDate) {
    errors.dob = "enter valid date of birth"
  }

  if (!values.gender) {
    errors.gender = 'Required';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  }
  else if (!phoneRegex.test(values.phone)) {
    errors.phone = 'enter valid phone number';
  }
  else if (values.phone.length > 10) {
    errors.phone = 'must be 10 digits';
  }

  if (!values.password) {
    errors.password = 'Required';
  }
  else if (!passRegex.test(values.password)) {
    errors.password = "password must contain one special character,atleast one uppercase character,one number and max length 8"
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "password doesn't match"
  }

  return errors;

}

export const Register = () => {

  const navigate = useNavigate()

  const [obj, setObj] = useState({
    activation_token: "",
    user_email: ""
  })



  //newwww

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      dob: '',
      gender: '',
      phone: '',
      password: '',
      confirmPassword: ''

    },
    validate,
    onSubmit: async (values) => {

      try {
        let res = await axios.post("http://192.168.10.75:3030/create", { values });
        console.log(res, "resulttttttttttttt");
        setObj({
          activation_token: res.data.activation_token,
          user_email: res.data.email
        });


        if (res.status === 200) {
          let link: HTMLElement = document.getElementById("activation-link") as HTMLElement;
          link.innerText = "Click Here";

        }
      } catch (error) {
        console.log(error);
        const errMessage = error.response.data.message;
        if (errMessage === "email already exist!") {
          formik.errors.email = errMessage
        };
      }

    },
  });

  const active = () => {
    navigate(`/activation`, { state: obj })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(e)
  };







  return (

    <>
      <div className="center" id="loader"></div>
      <div className="container">
        <div className="form">
          <div className="content">
            <h2 className="heading">Registration</h2>
            <form action="" className="user" method="" onSubmit={formik.handleSubmit}>
              <div className="fname">
                <label id="fname" >First Name: </label>
                <input type="text" name="fname" id="fname" onChange={handleInput} placeholder="Enter First Name" className="dvalid" />
                {formik.touched.fname && formik.errors.fname ? <div className="text-red-600">{formik.errors.fname}</div> : null}
              </div>
              <div className="lname">
                <label id="lname">Last Name: </label>
                <input type="text" name="lname" id="lname" onChange={handleInput} placeholder="Enter Last Name" className="dvalid" />
                {formik.touched.lname && formik.errors.lname ? <div className="text-red-600">{formik.errors.lname}</div> : null}
              </div>
              <div className="email">
                <label id="email">Email: </label>
                <input type="text" name="email" id="email" onChange={handleInput} placeholder="Enter Email" className="dvalid" />
                {formik.errors.email && formik.touched.email ? <div className="text-red-600" id="emailError">{formik.errors.email}</div> : null}
              </div>
              <div className="dob">
                <label id="dob">Date Of Birth: </label>
                {/* <div className="date-format">
                  <input type="text" name="year" id="year" onChange={handleInput} className="dvalid" placeholder="Year" />
                  {formik.errors.year && formik.touched.year ? <div className="text-red-600">{formik.errors.year}</div> : null}
                  <input type="text" name="month" id="month" onChange={handleInput} className="dvalid" placeholder="Month" />
                  {formik.errors.month && formik.touched.month ? <div className="text-red-600">{formik.errors.month}</div> : null}
                  <input type="text" name="day" id="day" onChange={handleInput} className="dvalid" placeholder="Day" /><br />
                  {formik.errors.day && formik.touched.day ? <div className="text-red-600">{formik.errors.day}</div> : null}
                </div> */}
                <input type="date" name="dob" id="dob" className="" onChange={handleInput} />
                {formik.errors.dob && formik.touched.dob ? <div className="text-red-600">{formik.errors.dob}</div> : null}

              </div>
              <div className="gender">
                <label id="fname">Gender:
                  <input type="radio" name="gender" onChange={handleInput} value="male" id="male" /><label id="male">Male</label>
                  <input type="radio" name="gender" onChange={handleInput} value="female" id="female" /><label
                    id="female">Female</label></label>
              </div>
              {formik.errors.gender && formik.touched.gender ? <div className="text-red-600">{formik.errors.gender}</div> : null}
              <div className="phone">
                <label id="phone">Phone Number: </label>
                <input type="text" id="phone" name="phone" onChange={handleInput} className="dvalid" placeholder="Enter Phone Number" />
                {formik.errors.phone && formik.touched.phone ? <div className="text-red-600">{formik.errors.phone}</div> : null}
              </div>

              <div className="password">
                <label id="password">Password: </label>
                <input type="password" name="password" onChange={handleInput} id="password" placeholder="Enter a password"
                  className="dvalid" />
                {formik.errors.password && formik.touched.password ? <div className="text-red-600">{formik.errors.password}</div> : null}
              </div>
              <div className="confirmPassword">
                <label id="confirmPassword">Confirm Password: </label>
                <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleInput}
                  placeholder="Re-enter the same password" className="dvalid" />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="text-red-600">{formik.errors.confirmPassword}</div> : null}
              </div>

              <div className="submit">
                <input type="submit" id="submit" value="Register" />
              </div>
              <div className="or">
                <div className="left"></div>
                <p>OR</p>
                <div className="right"></div>
              </div>
              <div className="mv-btn">
                <p>Already have an Account? <Link to="/" >login</Link></p>
              </div>
            </form>
            <div id="activation-link" onClick={active} className="cursor-pointer"></div>


          </div>
        </div>

      </div>
    </>
  )
}
