import axios from "axios";
import './addtutorial.css'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useFormik } from 'formik';

interface valuesInterface {
  firstname: string,
  lastname: string,
  contact_no: string,
  email: string,
  gender: string,
  city: string,
}

const validate = (values: valuesInterface) => {


  const errors: valuesInterface = {} as valuesInterface;
  let phoneRegex = /^([6-9]{1})([0-9]{9})$/;

  if (!values.firstname) {
    errors.firstname = 'required*';
  } else if (values.firstname.length > 15) {
    errors.firstname = 'Must be 15 characters or less';
  }

  if (!values.lastname) {
    errors.lastname = 'required*';
  } else if (values.lastname.length > 20) {
    errors.lastname = 'Must be 20 characters or less';
  }

  if (!values.contact_no) {
    errors.contact_no = 'Required';
  }
  else if (!phoneRegex.test(values.contact_no)) {
    errors.contact_no = 'enter valid phone number';
  }
  else if (values.contact_no.length > 10) {
    errors.contact_no = 'must be 10 digits';
  }

  if (!values.email) {
    errors.email = 'required*';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'please enter valid email';
  }

  if (!values.gender) {
    errors.gender = 'required*';
  }

  if (!values.city) {
    errors.city = 'required*';
  }

  return errors;

}

const AddDetails = () => {
  // const data = new URLSearchParams(new FormData(formElement));
  // try {  
  const navigate = useNavigate();
  const state = useLocation();

  let obj;

  if (state.state == null) {
    obj = {
      firstname: "",
      lastname: "",
      contact_no: "",
      email: "",
      city: "",
      gender: ""
    }
  }
  else {
    const { createdAt, updatedAt, ...user } = state.state;
    obj = user;
    console.log(obj, "objjjjjj");
  }



  // interface FormState {
  //   firstname: string;
  //   lastname: string;
  //   contact_no: string;
  //   email: string;
  //   city: string;

  // }

  // const [formData, setFormData] = useState({
  //   firstname: obj.firstname,
  //   lastname: obj.lastname,
  //   contact_no: obj.contact_no,
  //   email: obj.email,
  //   city: obj.city
  // })

  // const [gender, setGender] = useState(obj.gender);

  // const handleGender = (e) => {
  //   setGender(e.currentTarget.value);
  //   console.log(gender);
  // }


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(formData, "form data");
  //     console.log(gender);
  //     console.log(state.state, "state length");
  //     if (state.state == null) {
  //       let res = await axios.post("http://localhost:3030/create-student", { formData, gender });
  //       if (res.status === 200) {
  //         alert("inserted successfully")
  //       };
  //       navigate(`/student-details`);
  //     }
  //     else {
  //       let res = await axios.post(`http://localhost:3030/update/${state.state.id}`, { formData, gender });
  //       if (res.status === 200) {
  //         alert("updated successfully")
  //       };
  //       navigate(`/student-details`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const home = () => {
    navigate(`/home`)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: obj.firstname,
      lastname: obj.lastname,
      contact_no: obj.contact_no,
      email: obj.email,
      city: obj.city,
      gender: obj.gender

    },
    validate,
    onSubmit: async (values) => {

      try {
        console.log(state.state, "state length");
        if (state.state == null) {
          console.log(values, "insert values");
          let res = await axios.post("http://localhost:3030/create-student", { values });
          if (res.status === 200) {
            alert("inserted successfully")
          };
          navigate(`/student-details`);
        }
        else {
          console.log(values, "update values");
          let res = await axios.post(`http://localhost:3030/update/${state.state.id}`, { values });
          if (res.status === 200) {
            alert("updated successfully")
          };
          navigate(`/student-details`);
        }
      } catch (error) {
        console.log(error);
      }

    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(e)
  };


  // const form = document.getElementById('myForm');
  // console.log(form);
  // const obj = new URLSearchParams(new FormData(form));
  // console.log(obj);

  // let res1 = await fetch("http://localhost:3030/create",
  //   {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     method: "POST",
  //     body: new FormData(document.getElementById("myForm"))
  //   })

  // } catch (error) {
  //   console.log(error);
  // }



  return (
    <>

      <div className="flex justify-center pt-8">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-black" id="form-heading">Student Details</h1>
      </div>
      <div className="flex justify-center">
        <div className="border-2 p-10 text-xl">
          <form action="" id="myForm" className="" onSubmit={formik.handleSubmit}>
            <label htmlFor="firstname">Firstname: </label>
            <input className="w-50 border-2" type="text" id="firstname" name="firstname" onChange={handleInput} value={formik.values.firstname} /><br /><br />
            {formik.touched.firstname && formik.errors.firstname ? <div className="text-red-600 text-base -mt-4">{formik.errors.firstname}</div> : null}

            <label htmlFor="lastname">Lastname: </label>
            <input className="w-50 border-2" type="text" id="lastname" name="lastname" onChange={handleInput} value={formik.values.lastname} /><br /><br />
            {formik.touched.lastname && formik.errors.lastname ? <div className="text-red-600 text-base -mt-4">{formik.errors.lastname}</div> : null}

            <label htmlFor="contact_no">Contact No: </label>
            <input className="w-50 border-2" type="text" id="contact_no" name="contact_no" onChange={handleInput} value={formik.values.contact_no} /><br /><br />
            {formik.touched.contact_no && formik.errors.contact_no ? <div className="text-red-600 text-base -mt-4">{formik.errors.contact_no}</div> : null}

            <label htmlFor="email">email: </label>
            <input className="w-50 border-2" type="text" id="email" name="email" onChange={handleInput} value={formik.values.email} /><br /><br />
            {formik.touched.email && formik.errors.email ? <div className="text-red-600 text-base -mt-4">{formik.errors.email}</div> : null}

            <div className="inline-block">
              <label id="gender" className="pr-2" >Gender: </label>
              <input type="radio" name="gender" className="cursor-pointer" checked={formik.values.gender === "male"} onChange={handleInput} id="male" value="male" />
              <label id="male" className="pl-1 pr-1">male</label>
              <input type="radio" name="gender" className="cursor-pointer" checked={formik.values.gender === "female"} onChange={handleInput} id="female" value="female" />
              <label id="female" className="pl-1">female</label>
            </div><br /><br />
            {formik.touched.gender && formik.errors.gender ? <div className="text-red-600 text-base -mt-0">{formik.errors.gender}</div> : null}

            <label htmlFor="city">City: </label>
            <input className="w-50 border-2" type="text" id="city" name="city" onChange={handleInput} value={formik.values.city} /><br /><br />
            {formik.touched.city && formik.errors.city ? <div className="text-red-600 text-base -mt-4">{formik.errors.city}</div> : null}

            <div className="pl-20 pr-20">
              <input type="submit" value="Submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" />
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center pt-16">
        <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2" onClick={home}>Home</button>
      </div>
    </>
  )
};

export default AddDetails;

