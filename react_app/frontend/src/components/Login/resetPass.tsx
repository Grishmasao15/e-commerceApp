import "./resetPass.css";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface valuesInterface {
  password: string,
  confirmPassword: string
}

const validate = (values: valuesInterface) => {

  const errors: valuesInterface = {} as valuesInterface;
  let passRegex: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!values.password) {
    errors.password = 'Required';
  }
  else if (!passRegex.test(values.password)) {
    errors.password = "password must contain one special character,atleast one special character,one number and max length 8"
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "password doesn't match"
  }

  return errors;

}

export const ResetPassForm = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state, "reset pass state");

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate,
    onSubmit: async (values) => {
      try {
        console.log(values, "vall");
        let res = await axios.post(`http://192.168.10.75:3030/update-pass/${state}`, { values });
        console.log(res, "update pass res");
        if (res.data.success) {
          alert(res.data.message);
          navigate(`/`);
        }
        else {
          alert(res.data.message)
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(e)
  };

  return (
    <div className="pt-8">
      <form className="resetPass" onSubmit={formik.handleSubmit}>
        <div className="password">
          <label htmlFor="lname">Create Password: </label>
          <input type="password" name="password" id="password" onChange={handleInput} placeholder="Enter a password" className="dvalid border-2" />
          {formik.errors.password && formik.touched.password ? <div className="text-red-600">{formik.errors.password}</div> : null}
        </div>
        <div className="confirmPassword">
          <label htmlFor="confirmPassword">Re-enter Password: </label>
          <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleInput} placeholder="Re-enter the same password" className="dvalid border-2" />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="text-red-600">{formik.errors.confirmPassword}</div> : null}
        </div>
        <input type="submit" value="Reset Password" id="submit" className="submit" />
      </form>
    </div>
  )
}

