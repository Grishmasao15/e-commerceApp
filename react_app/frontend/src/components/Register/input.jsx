import { useFormContext } from "react-hook-form";
import { findInputError } from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormInvalid";
import { AnimatePresence, motion } from "framer-motion";
// import { Input } from "./input";

export const Input = ({ label, type, id, placeholder, pattern, validation, name }) => {

  const { register, formState: { errors } } = useFormContext()

  const inputError = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputError)

  // const male = {
  //   name: 'gender',
  //   label: 'Male',
  //   type: 'radio',
  //   id: 'male',
  // }

  // const female = {
  //   name: 'gender',
  //   label: 'Female',
  //   type: 'radio',
  //   id: 'female',
  // }

  // const validateEmail = () => {
  //   validation:{
  //     message:"enter valid mail"
  //   }
  // }

  // const handleInput = async () => {
  //   let email = document.getElementById('email');
  //   console.log(email);
  // }


  return (
    <div className="">
      <div className="pt-2">
        <label htmlFor={id} className="text-lg pl-1 capitalize">
          {label}
        </label>
      </div>
      {label == "gender" ?
        <>
          <div className="p-2.5 bg-gray-50 border border-gray-300 inline-flex gap-2 w-96 h-12 rounded-lg">
            <div className="flex items-center">
              <label htmlFor="male" className="text-lg pr-1 pb-1"> male</label>
              <input id="male" type="radio" name="gender" className="" />
            </div>
            <div className="flex items-center">
              <label htmlFor="female" className="text-lg pr-1 pb-1">female</label>
              <input id="female" type="radio" name="gender" className="" />
            </div>
            <div className="flex items-center">
              <label htmlFor="other" className="text-lg pr-1 pb-1">other</label>
              <input id="other" type="radio" name="gender" className="" />
            </div>
          </div>
        </>
        :
        label == "DOB" ?
          <>
            {/* <div>
                <div className="flex justify-center gap-4 pt-2 pr-6">
                  <div>
                    <label htmlFor="date" className="text-lg pl-1 capitalize">date</label><br />
                    <input type="text" id="date" name="date" placeholder="dd" className="p-2.5 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-medium rounded-lg w-40" {...register(name, validation)} />

                  </div>
                  <div>
                    <label htmlFor="month" className="text-lg pl-1 capitalize">month</label><br />
                    <input type="text" id="month" name="month" placeholder="mm" className="p-2.5 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-medium rounded-lg w-40" {...register(name, validation)} />
                  </div>
                  <div>
                    <label htmlFor="date" className="text-lg pl-1 capitalize">year</label><br />
                    <input type="text" id="year" name="year" placeholder="yyyy" className="p-2.5 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-medium rounded-lg w-40" {...register(name, validation)} />
                  </div>
                </div>
              </div> */}

            <div className="p-2.5 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-medium rounded-lg w-40">
              <input type="date" id="dob" name="dob" className=" bg-gray-50" />
            </div>

          </>
          : < input id={id} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ width: "500px" }} placeholder={placeholder} />}

      {
        isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )
      }
    </div >
  )
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 rounded-md"
      {...framer_error}
    >
      {/* <MdError /> */}
      {message}
    </motion.p>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
