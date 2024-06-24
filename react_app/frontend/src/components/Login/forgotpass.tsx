import './forgotpass.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface valuesInterface {
  email: string
}

const validate = (values: valuesInterface) => {

  const errors: valuesInterface = {} as valuesInterface;
  console.log(values, "valuessssss");

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'please enter valid email';
  }

  return errors;

}

export const Forgotpassword = () => {

  const formik = useFormik({
    initialValues: {
      email: '',

    },
    validate,
    onSubmit: async (values) => {
      try {
        let res = await axios.post("http://192.168.10.75:3030/forgot-password", { values });
        console.log(res, "result forgot");
        if (res.data.success) {
          let link: HTMLElement = document.getElementById("activation-link") as HTMLElement;
          let linktext: HTMLElement = document.getElementById("activation-text") as HTMLElement;
          linktext.innerText = "Click Below to Set New Password"
          link.innerText = "Click Here";
        }
        else {
          formik.errors.email = res.data.message
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
    <div className='pt-12'>
      <div className="email-input content">
        <h4>Please Enter your Registered Email!</h4>
        <form className="fields" onSubmit={formik.handleSubmit}>
          <input type="text" name="email" id="email" onChange={handleInput} placeholder="Enter email" className="dvalid border-2" />
          {formik.errors.email && formik.touched.email ? <div className="text-red-600" id="emailError">{formik.errors.email}</div> : null}
          <input type="submit" value="Generate" className="submit" id="submit" />
          <p id="activation-text" className='px-9 py-2'></p>
          <Link to="reset-password" id="activation-link" className="px-24" state={formik.values.email}></Link>
        </form>
      </div>
    </div>
  )
}
