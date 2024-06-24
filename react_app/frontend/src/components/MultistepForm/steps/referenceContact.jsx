import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAppState } from "../state";
import { useLocation } from "react-router-dom";
// import { button, Form, input } from "../Forms";
import { useEffect } from "react";
import { useMemo } from "react";

import { Field } from "../Forms/fields";

export const ReferenceContact = () => {
  const [state, setState] = useAppState();

  const previousrefcontactdata = useLocation();
  console.log(previousrefcontactdata, "previous ref contact data");
  console.log(state.refcontact_details);

  const { handleSubmit, register, reset, control, formState: { errors }, } = useForm({ defaultValues: state?.referencecontact ? state : { referencecontact: [{ name: "", contactnumber: "", relation: "" }, { name: "", contactnumber: "", relation: "" }] } });
  // { referencecontact: [{ name: "", contactnumber: "", relation: "" }] }
  const navigate = useNavigate();

  const saveData = (data) => {

    const refContactValidation = () => {

      let flag = true;
      let contacts = document.getElementsByClassName("contacts")[0].children;
      console.log(contacts, "contacts");


      for (let i = 0; i < contacts.length; i++) {

        let inputs = contacts[i].getElementsByTagName("input");
        let count = 0;
        for (let j = 0; j < inputs.length; j++) {
          if (inputs[j].value.trim().length > 0) {
            count++;

          }
        };


        if (count > 0) {
          for (let j = 0; j < inputs.length; j++) {

            if (inputs[j].value.trim() === "") {
              flag = false;
              document.getElementById(`${inputs[j].name}Error`).style.display = "block";
              document.getElementById(`${inputs[j].name}Error`).innerHTML = "please enter value";
            }

          };
        }
      };

      return flag;
    }

    if (!refContactValidation()) {
      return;
    }

    if (previousrefcontactdata?.state?.refcontact_details) {
      let oldData = previousrefcontactdata.state;
      let newData = { ...oldData, ...data };
      setState({ ...state, ...newData });
    }
    else {
      setState({ ...state, ...data });
    }

  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "referencecontact"
  });

  useMemo(() => {
    console.log(state, "use memo state in reference contact");
    navigate("/preferences", { state: state });

  }, [state])


  let obj;
  try {
    if (previousrefcontactdata?.state?.refcontact_details) {

      const details = previousrefcontactdata.state.refcontact_details
      console.log(details, "previousrefcontactdata detailsss");

      obj = {
        referencecontact: details
      }

    }

  }
  catch (error) {
    console.log(error);
  }

  useEffect(() => {
    reset(obj)
  }, [])



  console.log(fields, "fljdfhsd");

  const removeError = (id) => {
    document.getElementById(id).style.display = "none"
  }

  const validateContact = (value) => {
    if (value) {

      if (value.trim().length != 10 || isNaN(value)) {
        return "please enter valid contact number"
      }
      else {
        return true;
      }
    }
    else {
      return true
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(saveData)}>
        <fieldset className="border-2">
          <legend className="text-3xl">Reference Contact</legend>
          <div className="p-6">

            <div className="flex justify-end">
              <button type="button" onClick={() => {
                append({ name: "", contactnumber: "", relation: "" });
              }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-6 py-0.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+</button>
            </div>

            <div className="contacts">
              {fields.map((field, index) => {
                return (
                  <div className="flex gap-2" key={field.id}>
                    <div>
                      <Field label="Name" error={errors?.referencecontact?.[index]?.name}><input {...register(`referencecontact.${index}.name`)} id="name" onChange={() => removeError(`referencecontact.${index}.nameError`)} /></Field>
                      <small id={`referencecontact.${index}.nameError`} className="error text-red-600"></small>
                    </div>

                    <div>
                      <Field label="Contact Number" error={errors?.referencecontact?.[index]?.contactnumber}><input {...register(`referencecontact.${index}.contactnumber`, { validate: { validateContact } })} id="contactnumber" onChange={() => removeError(`referencecontact.${index}.contactnumberError`)} /></Field>
                      <small id={`referencecontact.${index}.contactnumberError`} className="error text-red-600"></small>
                    </div>

                    <div>
                      <Field label="Relation" error={errors?.referencecontact?.[index]?.relation}><input {...register(`referencecontact.${index}.relation`)} type="text" id="relation" onChange={() => removeError(`referencecontact.${index}.relationError`)} /></Field>
                      <small id={`referencecontact.${index}.relationError`} className="error text-red-600"></small>
                    </div>

                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-6 py-0.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => remove(index)}>
                      -
                    </button>
                  </div>
                )
              })}
            </div>



            <div className="button-row">
              <div className="flex justify-start pt-2 -mb-10">
                <Link className="bg-blue-600 p-2 rounded text-white w-28" to="/tech-known">
                  {"<"} Previous
                </Link>
              </div>
              <div className="flex justify-end">
                <button className="bg-blue-600 p-2 rounded text-white w-28">Next {">"}</button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};