import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppState } from "../state";
// import { button, Form, input } from "../Forms";
import { Field } from "../Forms/fields";
import { useEffect } from "react";
import { useMemo } from "react";
import { validatePhpTech, validateMysqlTech, validateLaravelTech, validateOracleTech } from "../validations";

export const TechKnown = () => {
  const [state, setState] = useAppState();
  const previoustechknowndata = useLocation();
  console.log(previoustechknowndata, "previous tech known data");
  const { handleSubmit, register, reset, formState: { errors }, } = useForm({ defaultValues: state });
  const navigate = useNavigate();

  const saveData = (data) => {

    if (previoustechknowndata?.state?.techknown_details) {
      let oldData = previoustechknowndata.state;
      let newData = { ...oldData, ...data };
      setState({ ...state, ...newData });
    }
    else {
      setState({ ...state, ...data });
    }

  };

  useMemo(() => {
    console.log(state, "use memo state of tech known");
    navigate("/ref-contact", { state: state });

  }, [state])


  let obj;
  try {
    if (previoustechknowndata?.state?.techknown_details) {

      const details = previoustechknowndata.state.techknown_details
      console.log(details, "tech detailsss");

      let techarr = [];
      let obj2 = {}
      details.map((element) => {
        obj2[`${element.technology_name}`] = element.level_of_expertise
        techarr.push(element.technology_name)
      })
      console.log(obj2, 'level object');
      let newarr = [techarr.includes("php") ? "php" : false, techarr.includes("mysql") ? "mysql" : false, techarr.includes("laravel") ? "laravel" : false, techarr.includes("oracle") ? "oracle" : false]

      console.log(newarr, "new arr technoilogyyyyy");

      // let phpval = details[0].technology_name = "php" ? details[0].level_of_expertise:null;


      obj = {
        tech: newarr,
        php: obj2.php ? obj2.php : null,
        mysql: obj2.mysql ? obj2.mysql : null,
        laravel: obj2.laravel ? obj2.laravel : null,
        oracle: obj2.oracle ? obj2.oracle : null
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
          <legend className="text-3xl">Technology Known</legend>
          <div className="p-6">

            <div className="flex gap-3">

              <Field label="PHP" error={errors?.tech?.[0]}><input type="checkbox" id="phplabel" {...register("tech.0", { validate: { validatePhpTech } })} value="php" /></Field>
              <Field label="Beginner" error={errors?.php}><input type="radio" id="phpbeginner" {...register("php")} name="php" value="beginner" /></Field>
              <Field label="Mideator" error={errors?.php}><input type="radio" id="phpmideator" {...register("php")} name="php" value="mideator" /></Field>
              <Field label="Expert" error={errors?.php}><input type="radio" id="phpexpert" {...register("php")} name="php" value="expert" /></Field>

            </div>

            <div className="flex gap-3">

              <Field label="MySQL" error={errors?.tech?.[1]}><input type="checkbox" id="mysqllabel" {...register("tech.1", { validate: { validateMysqlTech } })} value="mysql" /></Field>
              <Field label="Beginner" error={errors?.mysql}><input type="radio" id="mysqlbeginner" {...register("mysql")} name="mysql" value="beginner" /></Field>
              <Field label="Mideator" error={errors?.mysql}><input type="radio" id="mysqlmideator" {...register("mysql")} name="mysql" value="mideator" /></Field>
              <Field label="Expert" error={errors?.mysql}><input type="radio" id="mysqlexpert" {...register("mysql")} name="mysql" value="expert" /></Field>

            </div>

            <div className="flex gap-3">

              <Field label="Laravel" error={errors?.tech?.[2]}><input type="checkbox" id="laravellabel" {...register("tech.2", { validate: { validateLaravelTech } })} value="laravel" /></Field>
              <Field label="Beginner" error={errors?.laravel}><input type="radio" id="laravelbeginner" {...register("laravel")} name="laravel" value="beginner" /></Field>
              <Field label="Mideator" error={errors?.laravel}><input type="radio" id="laravelmideator" {...register("laravel")} name="laravel" value="mideator" /></Field>
              <Field label="Expert" error={errors?.laravel}><input type="radio" id="laravelexpert" {...register("laravel")} name="laravel" value="expert" /></Field>

            </div>

            <div className="flex gap-3">

              <Field label="Oracle" error={errors?.tech?.[3]}><input type="checkbox" id="oraclelabel" {...register("tech.3", { validate: { validateOracleTech } })} value="oracle" /></Field>
              <Field label="Beginner" error={errors?.oracle}><input type="radio" id="oraclebeginner" {...register("oracle")} name="oracle" value="beginner" /></Field>
              <Field label="Mideator" error={errors?.oracle}><input type="radio" id="oraclemideator" {...register("oracle")} name="oracle" value="mideator" /></Field>
              <Field label="Expert" error={errors?.oracle}><input type="radio" id="oracleexpert" {...register("oracle")} name="oracle" value="expert" /></Field>

            </div>


            <div className="button-row">
              <div className="flex justify-start pt-2 -mb-10">
                <Link className="bg-blue-600 p-2 rounded text-white w-28" to="/lang-known">
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