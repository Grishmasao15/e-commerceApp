import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppState } from "../state";
import { Field } from "../Forms/fields";
import { validateDate } from "../validations";
import { useMemo } from "react";
import { useEffect } from "react";

export const WorkExperience = () => {
  const [state, setState] = useAppState();

  const previousworkexp_data = useLocation();
  console.log(previousworkexp_data, "previousworkexp_data");

  console.log(state, "helloooooooooooooooooooooooooooooooo")

  console.log(state, "work ecp stateeeee");
  const { handleSubmit, register, reset, control, formState: { errors }, } = useForm({ defaultValues: state?.workexperience ? state : { workexperience: [{ company_name: "", designation: "", from_date: "", to_date: "" }, { company_name: "", designation: "", from_date: "", to_date: "" }, { company_name: "", designation: "", from_date: "", to_date: "" }] } });
  // { workexperience: [{ company_name: "", designation: "", from_date: new Date(), to_date: new Date() }] }
  const navigate = useNavigate();

  const saveData = (data) => {

    const workExpValidation = () => {

      let flag = true;
      let companies = document.getElementsByClassName("companies")[0].children;

      console.log(companies, "companies");


      for (let i = 0; i < companies.length; i++) {

        let inputs = companies[i].getElementsByTagName("input");
        let count = 0;
        for (let j = 0; j < inputs.length; j++) {
          if (inputs[j].value.trim().length > 0) {
            count++;

          }
        };


        if (count > 0) {
          for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].name.includes("to_date")) {
              if (inputs[j].value && inputs[j].value.trim() < inputs[j - 1].value.trim()) {
                flag = false;
                document.getElementById(`${inputs[j].name}Error`).style.display = "inline";
                document.getElementById(`${inputs[j].name}Error`).innerHTML = "to date can't be greater than from date";
              }
              else if (!inputs[j].value) {
                flag = false;
                document.getElementById(`${inputs[j].name}Error`).style.display = "block";
                document.getElementById(`${inputs[j].name}Error`).innerHTML = "please enter value";
              }
            }
            else {
              if (inputs[j].value.trim() === "") {
                flag = false;
                document.getElementById(`${inputs[j].name}Error`).style.display = "block";
                document.getElementById(`${inputs[j].name}Error`).innerHTML = "please enter value";
              }
            }
          };
        }
      };

      return flag;
    }

    if (!workExpValidation()) {
      return;
    }

    if (previousworkexp_data?.state?.workexp_details) {
      let oldData = previousworkexp_data.state;
      console.log(oldData, "oldddddddd in work");
      let newData = { ...oldData, ...data };
      console.log(newData, "newwwwwwww in work");
      setState({ ...state, ...newData });
      console.log(state, "in if stateeee");
    }
    else {
      setState({ ...state, ...data });
    }

  };

  let obj;
  try {
    if (previousworkexp_data?.state?.workexp_details) {

      const details = previousworkexp_data.state.workexp_details
      console.log(details, "previous work exp data detailsss");

      obj = {
        workexperience: details
      }

    }

  }
  catch (error) {
    console.log(error);
  }

  const removeError = (id) => {
    document.getElementById(id).style.display = "none"
  }

  useEffect(() => {
    reset(obj)
  }, [])


  useMemo(() => {
    console.log(state, "use memo state in workkkk");
    navigate("/lang-known", { state: state });

  }, [state])


  const { fields, append, remove } = useFieldArray({
    control,
    name: "workexperience"
  });


  return (
    <div className="container">
      <form onSubmit={handleSubmit(saveData)}>
        <fieldset className="border-2">
          <legend className="text-3xl">Work Experience</legend>
          <div className="p-6">

            <div className="flex justify-end">
              <button type="button" onClick={() => {
                append({ company_name: "", designation: "", from_date: "", to_date: "" });
              }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-6 py-0.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+</button>
            </div>

            <div className="companies">
              {fields.map((field, index) => {
                return (


                  <div className="flex gap-2" key={field.id}>
                    <div className="">
                      <Field label="Company Name" error={errors?.workexperience?.[index]?.company_name}><input {...register(`workexperience.${index}.company_name`)} id="workexpcompany1" className="w-40" onChange={() => removeError(`workexperience.${index}.company_nameError`)} /></Field>
                      <small id={`workexperience.${index}.company_nameError`} className="error text-red-600"></small>
                    </div>

                    <div>
                      <Field label="Designation" error={errors?.workexperience?.[index]?.designation}><input {...register(`workexperience.${index}.designation`)} id="workexpdesignation1" className="w-40" onChange={() => removeError(`workexperience.${index}.designationError`)} /></Field>
                      <small id={`workexperience.${index}.designationError`} className="error text-red-600"></small>
                    </div>

                    <div>
                      <Field label="From" error={errors?.workexperience?.[index]?.from_date}><input {...register(`workexperience.${index}.from_date`, { validate: validateDate })} type="date" id="workexpfrom1" onChange={() => removeError(`workexperience.${index}.from_dateError`)} /></Field>
                      <small id={`workexperience.${index}.from_dateError`} className="error text-red-600"></small>
                    </div>

                    <div>
                      <Field label="to" error={errors?.workexperience?.[index]?.to_date}><input {...register(`workexperience.${index}.to_date`, { validate: validateDate })} type="date" id="workexpto1" onChange={() => removeError(`workexperience.${index}.to_dateError`)} /></Field>
                      <small id={`workexperience.${index}.to_dateError`} className="error text-red-600"></small>
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
                <Link className="bg-blue-600 p-2 rounded text-white w-28" to="/education">
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