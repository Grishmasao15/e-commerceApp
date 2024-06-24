
const DynamicInput = () => {

  const lastname = {
    name: 'lastname',
    label: 'last name',
    type: 'text',
    id: 'lastname',
    validation: {
      required: {
        value: true,
        message: 'required*',
      },
      maxLength: {
        value: 30,
        message: '30 characters max',
      },
    },
  }

  const password_validation = {
    name: 'password',
    label: 'password',
    type: 'password',
    id: 'password',
    validation: {
      required: {
        value: true,
        message: 'required*',
      },
      minLength: {
        value: 6,
        message: 'min 6 characters',
      },
    },
  }

  const firstname = {
    name: 'firstname',
    label: 'first name',
    type: 'text',
    id: 'firstname',
    validation: {
      required: {
        value: true,
        message: 'required*',
      },
      maxLength: {
        value: 30,
        message: '30 characters max',
      },
    },
  }

  const email = {
    name: 'email',
    label: 'email',
    type: 'text',
    id: 'email',
    pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
    validation: {
      required: {
        value: true,
        message: 'required*',
      },
    },
  }

  const phone = {
    name: 'contact_no',
    label: 'Contact Number',
    type: 'text',
    id: 'phone',
    validation: {
      required: {
        value: true,
        message: 'required*',
      },
      maxLength: {
        value: 10,
        message: "enter valid contact number"
      },
    },
  }

  const DOB = {
    name: 'dob',
    label: 'DOB',
    type: 'text',
    id: 'dob',
    validation: {
      required: {
        value: true,
        message: 'required*',
      },
    },
  }

  const confirmPassword = {
    name: 'confirmPassword',
    label: 'confirm Password',
    type: 'password',
    id: 'confirmPassword',
    placeholder: 'Re-enter the same password',
    validation: {
      required: {
        value: true,
        message: 'required*',
      },
      minLength: {
        value: 6,
        message: 'min 6 characters',
      },
    },
  }

  const male = {
    name: 'gender',
    label: 'Male',
    type: 'radio',
    id: 'male',
  }

  const female = {
    name: 'gender',
    label: 'Female',
    type: 'radio',
    id: 'female',
  }


  const gender = {
    name: 'gender',
    label: 'gender',
    validation: {
      required: {
        value: true,
        message: 'required*',
      }
    }
  }

  return (

    <>
      <FormProvider {...methods}>
        <div>
          <h2 className="pt-6 font-semibold text-3xl text-blue-700 flex justify-center ">Registration</h2>
        </div>
        <div className="flex justify-center pt-6">
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            className="border-2 p-6"
          >
            <div className="pt-6">
              <Input {...firstname} />
              <Input {...lastname} />
              <Input {...email} />
              <Input {...DOB} />
              <Input {...phone} />
              <Input {...gender} />
              <Input {...password_validation} />
              <Input {...confirmPassword} />
            </div>
            <div className="mt-5">
              <button
                onClick={onSubmit}
                className="block items-center gap-1 p-2 w-full font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
              >
                Register
              </button>
            </div>
            <div className="flex">
              <div className="w-64 h-0.5 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></div>
              <p className="pt-5 px-1">OR</p>
              <div className="w-64 h-0.5 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></div>
            </div>
            <div className="mv-btn">
              <p className="flex justify-center text-xl">Already have an Account?{'\u00A0'}<Link to="/" className="text-blue-700 font-semibold"> login</Link></p>
            </div>
          </form>
          {/* <div id="activation-link" onClick={active}></div> */}
        </div>

      </FormProvider>
    </>

  )
}