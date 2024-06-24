import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAppState } from "../state";
// import { button, Form, input } from "../Forms";
import { Field } from "../Forms/fields";
import { useLocation } from "react-router-dom";
import { validateEnglishCheckbox, validateGujaratiCheckbox, validateHindiCheckbox } from "../validations";
import { useEffect } from "react";
import { useMemo } from "react";

export const LangKnown = () => {
  const [state, setState] = useAppState();

  const previouslang_data = useLocation();
  console.log(previouslang_data, "previouslang_data");

  const { handleSubmit, register, reset, formState: { errors }, } = useForm({ defaultValues: state });
  const navigate = useNavigate();

  const saveData = (data) => {

    if (previouslang_data?.state?.langknown_details) {
      let oldData = previouslang_data.state;
      let newData = { ...oldData, ...data };
      setState({ ...state, ...newData });
    }
    else {
      setState({ ...state, ...data });
    }

  };

  useMemo(() => {
    console.log(state, "use memo state of lang known");
    navigate("/tech-known", { state: state });

  }, [state])

  let obj;
  try {
    if (previouslang_data?.state?.langknown_details) {

      const details = previouslang_data.state.langknown_details
      console.log(details, "lang detailsss");

      let langarr = [];
      let obj2 = {}
      details.map((element) => {
        obj2[`${element.language_name}`] = element.rws
        langarr.push(element.language_name)
      })

      console.log(obj2, "obj2");
      console.log(langarr, "lang arr");
      let newarr = [langarr.includes("hindi") ? "hindi" : false, langarr.includes("english") ? "english" : false, langarr.includes("gujarati") ? "gujarati" : false]

      obj = {
        lang: newarr,
        hindi: obj2?.hindi ? obj2.hindi.split(",") : [],
        english: obj2?.english ? obj2.english.split(",") : [],
        gujarati: obj2?.gujarati ? obj2.gujarati.split(",") : [],

      }

    }

  }
  catch (error) {
    console.log(error);
  }

  useEffect(() => {
    reset(obj)
  }, [])



  return (
    <div className="container">
      <form onSubmit={handleSubmit(saveData)}>
        <fieldset className="border-2">
          <legend className="text-3xl">Language Known</legend>
          <div className="p-6">

            <div className="flex gap-3">
              <Field label="Hindi" error={errors?.lang?.[0]}><input type="checkbox" id="hindi" {...register("lang.0", { validate: { validateHindiCheckbox } })} value="hindi" /></Field>
              <Field label="Read" error={errors?.hindi}><input type="checkbox" id="hindiread" {...register("hindi")} name="hindi" value="read" /></Field>
              <Field label="Write" error={errors?.hindi}><input type="checkbox" id="hindiwrite" {...register("hindi")} name="hindi" value="write" /></Field>
              <Field label="Speak" error={errors?.hindi}><input type="checkbox" id="hindispeak" {...register("hindi")} name="hindi" value="speak" /></Field>

            </div>

            <div className="flex gap-3">

              <Field label="English" error={errors?.lang?.[1]}
              ><input type="checkbox" id="english" {...register("lang.1", { validate: { validateEnglishCheckbox } })} value="english" /></Field>
              <Field label="Read" error={errors?.english}><input type="checkbox" id="englishread" {...register("english")} name="english" value="read" /></Field>
              <Field label="Write" error={errors?.english}><input type="checkbox" id="englishwrite" {...register("english")} name="english" value="write" /></Field>
              <Field label="Speak" error={errors?.english}><input type="checkbox" id="englishspeak" {...register("english")} name="english" value="speak" /></Field>

            </div>

            <div className="flex gap-3">

              <Field label="Gujarati" error={errors?.lang?.[2]}
              ><input type="checkbox" id="gujarati" {...register("lang.2", { validate: { validateGujaratiCheckbox } })} value="gujarati" /></Field>
              <Field label="Read" error={errors?.gujarati}><input type="checkbox" id="gujaratiread" {...register("gujarati")} name="gujarati" value="read" /></Field>
              <Field label="Write" error={errors?.gujarati}><input type="checkbox" id="gujaratiwrite" {...register("gujarati")} name="gujarati" value="write" /></Field>
              <Field label="Speak" error={errors?.gujarati}><input type="checkbox" id="gujaratispeak" {...register("gujarati")} name="gujarati" value="speak" /></Field>

            </div>


            <div className="button-row">
              <div className="flex justify-start pt-2 -mb-10">
                <Link className="bg-blue-600 p-2 rounded text-white w-28" to="/work-exp">
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