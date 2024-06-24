import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAppState } from "../state";
import { Select } from "../Forms/Select";
import { Field } from "../Forms/fields";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useMemo } from "react";


export const Preferences = () => {
  const [state, setState] = useAppState();

  const previouspreferencesdata = useLocation();
  console.log(previouspreferencesdata, "previous preferences data");

  const { handleSubmit, register, reset, formState: { errors }, } = useForm({ defaultValues: state });
  const navigate = useNavigate();

  const saveData = (data) => {

    if (previouspreferencesdata?.state?.preferences_details) {
      let oldData = previouspreferencesdata.state;
      let newData = { ...oldData, ...data };
      setState({ ...state, ...newData });
    }
    else {
      setState({ ...state, ...data });
    }

  };


  let obj;
  if (previouspreferencesdata.state?.preferences_details) {
    const details = previouspreferencesdata.state.preferences_details;


    obj = {
      preferredlocation: details?.preferredlocation,
      noticeperiod: details?.noticeperiod,
      expectedctc: details?.expectedctc,
      currentctc: details?.currentctc,
      department: details?.department,
    }
  }

  useMemo(() => {
    console.log(state, "use memo state of preferences");
    navigate("/confirm", { state: state });

  }, [state])


  useEffect(() => {
    reset(obj)
  }, [])

  const selectValidate = (value) => {
    if (value === "-select-") {
      return "please select any of following"
    }
    else {
      return true;
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(saveData)}>
        <fieldset className="border-2">
          <legend className="text-3xl">Preferences</legend>
          <div className="p-6">

            <div className="">
              <Select label="Preferred Location" error={errors?.preferredlocation}>

                <select id="preferredlocation" name="preferredlocation" multiple {...register("preferredlocation", { validate: { selectValidate } })}>
                  <option value="ahmedabad" >Ahmedabad</option>
                  <option value="surat" >Surat</option>
                  <option value="patan" >Patan</option>
                </select>

              </Select>
              <Field label="Notice Period" error={errors?.sscboard}><input {...register("noticeperiod",)} id="workexpcompany1" /></Field>
              <Field label="Expected Ctc" error={errors?.sscpassingyear}><input {...register("expectedctc",)} id="workexpdesignation1" /></Field>
              <Field label="Current Ctc" error={errors?.sscpercentage}><input {...register("currentctc",)} type="text" id="workexpfrom1" /></Field>

              <Select label="Department" error={errors?.department}>

                <select id="department" name="department" {...register("department", { validate: { selectValidate } })}>
                  <option value="-select-">-select- </option>
                  <option value="hr" >HR</option>
                  <option value="development" >Development</option>
                  <option value="design" >Design</option>
                  <option value="marketing">Marketing</option>
                </select>

              </Select>
            </div>



            <div className="button-row">
              <div className="flex justify-start pt-2 -mb-10">
                <Link className="bg-blue-600 p-2 rounded text-white w-28" to="/ref-contact">
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