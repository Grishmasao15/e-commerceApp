// Steps/Contact.jsvalidateSelect

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { Field } from "../Forms/fields";
import { Select } from "../Forms/Select";
import { validateDate, validateEmail, validatePhone, validateSelect } from "../validations";
import { useEffect, useMemo } from "react";

export const Contact = () => {

  const preData = useLocation();
  console.log(preData, "PRe data inside basic");

  const [state, setState] = useAppState({});

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  const navigate = useNavigate();

  const saveData = (data) => {
    if (preData.state == null) {
      setState({ ...state, ...data });

    }
    else {
      let oldData = preData.state.data;
      let newData = { ...oldData, ...data }
      setState({ ...state, ...newData });
    }
  };

  useMemo(() => {

    console.log(state, "basic details");
    navigate("/education", { state: state });

  }, [state])

  let obj;
  if (preData.state) {

    const details = preData.state.data.basicdetails;
    obj = {
      firstname: details.firstname,
      lastname: details.lastname,
      designation: details.designation,
      email: details.email,
      phonenumber: details.phonenumber,
      gender: details.gender,
      dob: details.dob,
      address1: details.address1,
      address2: details.address2,
      city: details.city,
      state: details.state,
      relationship_status: details.relationship_status

    }
  }


  useEffect(() => {
    reset(obj)
  }, [])

  return (
    <div className="container">
      <form onSubmit={handleSubmit(saveData)}>
        <fieldset className="border-2">
          <legend className="text-3xl">Basic Details</legend>
          <div className="p-6">
            <div className="flex">
              <Field label="First name" error={errors?.firstname}>
                <input
                  {...register("firstname", { required: "required*" })}
                  type="text"
                  id="first-name"
                  className="mx-4"
                />
              </Field>
              <Field label="Last name" error={errors?.lastname}>
                <input
                  {...register("lastname", { required: "required*" })}
                  id="last-name"
                  type="text"
                  className="mx-4"
                />
              </Field>
            </div>
            <div className="flex">
              <Field label="Designation" error={errors?.designation}>
                <input
                  {...register("designation", { required: "required*" })}
                  type="text"
                  className="mx-4"
                  id="designation"
                />
              </Field>
              <Field label="Email" error={errors?.email}>
                <input
                  {...register("email", { required: "required*", validate: { validateEmail } })}
                  type="text"
                  className="mx-4"
                  id="email"
                />
              </Field>
            </div>
            <div className="flex">
              <Field label="Phone Number" error={errors?.phonenumber}>
                <input
                  {...register("phonenumber", { required: "required*", validate: { validatePhone } })}
                  type="text"
                  className="mx-4"
                  id="phonenumber"
                />
              </Field>
              <Field label="Gender" error={errors?.gender}>
                <input {...register("gender", { required: "required*" })} type="radio" className="mx-2" id="male" value="male" />
                <input {...register("gender", { required: "required*" })} type="radio" className="mx-2" id="female" value="female" />
                <input {...register("gender", { required: "required*" })} type="radio" className="mx-2" id="other" value="other" />
              </Field>
            </div>
            <div className="flex">
              <Field label="DOB" error={errors?.dob}>
                <input
                  {...register("dob", { required: "required*", validate: { validateDate } })}
                  type="date"
                  className="mx-4"
                  id="dob"
                />
              </Field>
              <Field label="Address 1" error={errors?.address1}>
                <input
                  {...register("address1", {
                    required: "required*",
                  })}
                  type="text"
                  className="mx-4"
                  id="address1"
                />
              </Field>
            </div>
            <div className="flex">
              <Field label="Address 2" error={errors?.address2}>
                <input
                  {...register("address2", { required: "required*" })}
                  type="text"
                  className="mx-4"
                  id="address2"
                />
              </Field>
              <Field label="City" error={errors?.city}>
                <input
                  {...register("city", { required: "required*" })}
                  type="text"
                  className="mx-4"
                  id="cityy"
                />
              </Field>
            </div>
            <div className="flex">
              <Select label="State" error={errors?.state}>

                <select id="state" name="state" className="mx-4" {...register("state", { validate: { validateSelect } })}>
                  <option value="-select-" >-select-</option>
                  <option value="Gujarat" >Gujarat</option>
                  <option value="Maharashtra" >Maharashtra</option>
                  <option value="Delhi" >Delhi</option>
                  <option value="Punjab">Punjab</option>
                </select>

              </Select>

              <Select label="Relationship Status" error={errors?.relationship_status}>

                <select id="relationshipstatus" name="relationshipstatus" className="mx-4" {...register("relationship_status", { validate: { validateSelect } })}>
                  <option value="-select-">-select-</option>
                  <option value="married" >Married</option>
                  <option value="unmarried" >Unmarried</option>
                </select>

              </Select>
            </div>
            <div className="flex justify-end pt-4">
              <button className="bg-blue-600 p-2 rounded text-white w-28">Next {">"}</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
