import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppState } from "../state";
// import { button, Form, input } from "../Forms";
import { Field } from "../Forms/fields";
import { useEffect, useMemo } from "react";

export const Education = () => {

  const [state, setState] = useAppState();
  const previousdata = useLocation();
  console.log(previousdata, "previous data in education");
  const { handleSubmit, reset, register, formState: { errors }, } = useForm({ defaultValues: state, mode: "onSubmit" });
  const navigate = useNavigate();


  const saveData = (data) => {
    if (previousdata?.state?.education_details) {
      let oldData = previousdata.state;
      let newData = { ...oldData, ...data };
      setState({ ...state, ...newData });
    }
    else {
      setState({ ...state, ...data });
    }

  };

  useMemo(() => {
    navigate("/work-exp", { state: state });

  }, [state])

  const validatePassingYear = (value) => {
    if (value.toString().trim().length == 4 && !isNaN(value) && value <= (new Date(Date.now()).getFullYear())) {
      return true;
    }
    else {
      return "please enter valid year"
    }
  }

  const validatePercentage = (value) => {
    if (value > 0 && value < 100 && !isNaN(value)) {
      return true
    }
    else {
      return "please enter valid percentage"
    }
  }

  let obj;
  if (previousdata.state?.education_details) {
    const details = previousdata.state.education_details;
    obj = {
      sscboard: details[0]?.nameofboard_or_coursename,
      sscpassingyear: details[0]?.passingyear,
      sscpercentage: details[0]?.percentage,
      hscboard: details[1]?.nameofboard_or_coursename,
      hscpassingyear: details[1]?.passingyear,
      hscpercentage: details[1]?.percentage,
      bachelorcourse: details[2]?.nameofboard_or_coursename,
      bachelorpassingyear: details[2]?.passingyear,
      bachelorpercentage: details[2]?.percentage,
      mastercourse: details[3]?.nameofboard_or_coursename,
      masterpassingyear: details[3]?.passingyear,
      masterpercentage: details[3]?.percentage

    }
  }

  useEffect(() => {
    reset(obj)
  }, [])

  const validateMasterCourse = (value, formValues) => {

    if (formValues.masterpassingyear && !value || formValues.masterpercentage && !value) {
      return "you have to fill this field because you've filled one of this"
    }
    else {
      return true;
    }

  }

  const validateMasterPassingyear = (value, formValues) => {

    if (formValues.masterpercentage && !value || formValues.mastercourse && !value) {
      return "you have to fill this field because you've filled one of this"
    }
    else if (value && value.toString().trim().length !== 4 || value > (new Date(Date.now()).getFullYear()) || isNaN(value)) {
      return "please enter valid year"
    }
    else {
      return true;
    }

  }

  const validateMasterPercentage = (value, formValues) => {

    if (formValues.mastercourse && !value || formValues.masterpassingyear && !value) {
      return "you have to fill this field because you've filled one of this"
    }
    else if (value && isNaN(value) || value < 0 || value > 100) {
      return "please enter valid percentage"
    }
    else {
      return true;
    }

  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(saveData)}>
        <fieldset className="border-2">
          <legend className="text-3xl">Education Details</legend>
          <div className="p-6">

            <Field><label htmlFor="sscresult">SSC Result</label></Field>
            <Field><hr /></Field>
            <div className="flex">
              <Field label="Name of board" error={errors?.sscboard}><input {...register("sscboard", { required: "required*" })} id="sscboard" /></Field>
              <Field label="Passing year" error={errors?.sscpassingyear}><input {...register("sscpassingyear", { required: "required*", validate: { validatePassingYear } })} id="sscpassingyear" /></Field>
              <Field label="Percentage" error={errors?.sscpercentage}><input {...register("sscpercentage", { required: "required*", validate: { validatePercentage } })} id="sscpercentage" /></Field>
            </div>

            <Field><label htmlFor="hscresult">HSC Result</label></Field>
            <Field><hr /></Field>
            <div className="flex">
              <Field label="Name of board" error={errors?.hscboard}><input {...register("hscboard", { required: "required*", })} id="hscboard" /></Field>
              <Field label="Passing year" error={errors?.hscpassingyear}><input {...register("hscpassingyear", { required: "required*", validate: { validatePassingYear } })} id="hscpassingyear" /></Field>
              <Field label="Percentage" error={errors?.hscpercentage}><input {...register("hscpercentage", { required: "required*", validate: { validatePercentage } })} id="hscpercentage" /></Field>
            </div>

            <Field><label htmlFor="bachelordegree">Bachelor Degree</label></Field>
            <Field><hr /></Field>
            <div className="flex">
              <Field label="Course Name" error={errors?.bachelorcourse}><input {...register("bachelorcourse", { required: "required*" })} id="bachelorcourse" /></Field>
              <Field label="Passing year" error={errors?.bachelorpassingyear}><input {...register("bachelorpassingyear", { required: "required*", validate: { validatePassingYear } })} id="bachelorpassingyear" /></Field>
              <Field label="Percentage" error={errors?.bachelorpercentage}><input {...register("bachelorpercentage", { required: "required*", validate: { validatePercentage } })} id="bachelorpercentage" /></Field>
            </div>

            <Field><label htmlFor="masterdegree">Master Degree</label></Field>
            <Field><hr /></Field>
            <div className="flex">
              <Field label="Course Name" error={errors?.mastercourse}><input {...register("mastercourse", { validate: validateMasterCourse })} id="mastercourse" /></Field>
              <Field label="Passing year" error={errors?.masterpassingyear}><input {...register("masterpassingyear", { validate: validateMasterPassingyear })} id="masterpassingyear" /></Field>
              <Field label="Percentage" error={errors?.masterpercentage} ><input {...register("masterpercentage", { validate: validateMasterPercentage })} id="masterpercentage" /></Field>
            </div>

            <div className="button-row">
              <div className="flex justify-start pt-2 -mb-10">

                <Link className="bg-blue-600 p-2 rounded text-white w-28" to="/multistep-form">
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