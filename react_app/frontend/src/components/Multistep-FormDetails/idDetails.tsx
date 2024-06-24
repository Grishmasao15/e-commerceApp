import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const IdDetails = () => {

  const state = useLocation();
  const navigate = useNavigate();
  const [data, setData]: any = useState([]);

  const id = state.state;
  console.log(id, "iddddddddddddddddddddddddddddddddddddd");
  console.log(state, "statee");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3030/id-details/${id}`, { withCredentials: true });
        console.log(res, "id detailsss");
        setData(res.data.data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  console.log(data, "dataaaaaaaa");

  const editDetails = (data: any) => {
    try {
      navigate(`/multistep-form`, { state: data })
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h1 className="flex justify-center text-3xl text-blue-900">View Details</h1>
      <form>
        {data?.basicdetails ? <fieldset className="border-2">
          <legend className="text-3xl">Basic Details</legend>
          <div className="p-6">
            <div className="pb-3">
              <label htmlFor="firstname" className="pr-2">First Name</label>
              <input type="text" id="firstname" value={data.basicdetails.firstname ? data.basicdetails.firstname : ""} readOnly />
              <label htmlFor="lastname" className="pl-6 pr-2">Last Name</label>
              <input type="text" id="lastname" value={data.basicdetails.lastname ? data.basicdetails.lastname : ""} readOnly />
            </div>
            <div className="pb-3">
              <label htmlFor="designation" className="pr-2">Designation</label>
              <input type="text" id="designation" value={data.basicdetails.designation ? data.basicdetails.designation : ""} readOnly />
              <label htmlFor="email" className="pl-6 pr-2">Email</label>
              <input type="text" id="email" value={data.basicdetails.email ? data.basicdetails.email : ""} readOnly />
            </div>
            <div className="pb-3">
              <label htmlFor="phonenumber" className="pr-2">Phone Number</label>
              <input type="text" id="phonenumber" value={data.basicdetails.phonenumber ? data.basicdetails.phonenumber : ""} readOnly />
              <label htmlFor="gender" className="pl-6 pr-2">Gender</label>
              <input type="text" id="gender" value={data.basicdetails.gender ? data.basicdetails.gender : ""} readOnly />
            </div>
            <div className="pb-3">
              <label htmlFor="dob" className="pr-2">DOB</label>
              <input type="date" id="dob" value={data.basicdetails.dob ? data.basicdetails.dob : ""} readOnly />
              <label htmlFor="address1" className="pl-6 pr-2">Address 1</label>
              <input type="text" id="address1" value={data.basicdetails.address1 ? data.basicdetails.address1 : ""} readOnly />
            </div>
            <div className="pb-3">
              <label htmlFor="address2" className="pr-2">Address 2</label>
              <input type="text" id="address2" value={data.basicdetails.address2 ? data.basicdetails.address2 : ""} readOnly />
              <label htmlFor="city" className="pl-6 pr-2">City</label>
              <input type="text" id="cityy" value={data.basicdetails.city ? data.basicdetails.city : ""} readOnly />
            </div>
            <div className="pb-3">
              <label htmlFor="state" className="pr-2">State</label>
              <input type="text" id="statee" value={data.basicdetails.state ? data.basicdetails.state : ""} readOnly />
              <label htmlFor="relationshipstatus" className="pl-6 pr-2">Relationship Status</label>
              <input type="text" id="relationshipstatus" value={data.basicdetails.relationship_status ? data.basicdetails.relationship_status : ""} readOnly />
            </div>
          </div>
        </fieldset> : ""}<br />
        {data?.education_details ? <fieldset className="border-2">
          <legend className="text-3xl">Education Details</legend>
          <div className="p-6">
            <label htmlFor="SSC Result">SSC Result</label>
            <hr />
            <div className="py-4">
              <label htmlFor="nameofboard" className="pr-2">Name of Board</label>
              <input type="text" id="nameofboard" value={data.education_details[0]?.nameofboard_or_coursename ? data.education_details[0]?.nameofboard_or_coursename : ""} readOnly />
              <label htmlFor="passingyear" className="pr-2">Passing Year</label>
              <input type="text" id="passingyear" value={data.education_details[0]?.percentage ? data.education_details[0]?.passingyear : ""} readOnly />
              <label htmlFor="percentage" className="pr-2">Percentage</label>
              <input type="text" id="percentage" value={data.education_details[0]?.percentage ? data.education_details[0]?.percentage : ""} readOnly />
            </div>

            <label htmlFor="HSC Result">HSC Result</label>
            <hr />
            <div className="py-4">
              <label htmlFor="nameofboard" className="pr-2">Name of Board</label>
              <input type="text" id="nameofboard" value={data.education_details[1]?.nameofboard_or_coursename ? data.education_details[1]?.nameofboard_or_coursename : ""} readOnly />
              <label htmlFor="passingyear" className="pr-2">Passing Year</label>
              <input type="text" id="passingyear" value={data.education_details[1]?.percentage ? data.education_details[1]?.passingyear : ""} readOnly />
              <label htmlFor="percentage" className="pr-2">Percentage</label>
              <input type="text" id="percentage" value={data.education_details[1]?.percentage ? data.education_details[1]?.percentage : ""} readOnly />
            </div>

            <label htmlFor="bachelordegree">Bachelor Degree</label>
            <hr />
            <div className="py-4">
              <label htmlFor="nameofboard" className="pr-2">Course Name</label>
              <input type="text" id="nameofboard" value={data.education_details[2]?.nameofboard_or_coursename ? data.education_details[2]?.nameofboard_or_coursename : ""} readOnly />
              <label htmlFor="passingyear" className="pr-2">Passing Year</label>
              <input type="text" id="passingyear" value={data.education_details[2]?.percentage ? data.education_details[2]?.passingyear : ""} readOnly />
              <label htmlFor="percentage" className="pr-2">Percentage</label>
              <input type="text" id="percentage" value={data.education_details[2]?.percentage ? data.education_details[2]?.percentage : ""} readOnly />
            </div>

            <label htmlFor="masterdegree">Master degree</label>
            <hr />
            <div className="py-4">
              <label htmlFor="nameofboard" className="pr-2">Name of Board</label>
              <input type="text" id="nameofboard" value={data.education_details[3]?.nameofboard_or_coursename ? data.education_details[3]?.nameofboard_or_coursename : ""} readOnly />
              <label htmlFor="passingyear" className="pr-2">Passing Year</label>
              <input type="text" id="passingyear" value={data.education_details[3]?.percentage ? data.education_details[3]?.passingyear : ""} readOnly />
              <label htmlFor="percentage" className="pr-2">Percentage</label>
              <input type="text" id="percentage" value={data.education_details[3]?.percentage ? data.education_details[3]?.percentage : ""} readOnly />
            </div>
          </div>
        </fieldset> : ""}<br />
        {data?.workexp_details ? <fieldset className="border-2">
          <legend className="text-3xl">Work Experience</legend>
          <div className="p-6">

            {data.workexp_details.map((element: any, index: number) => {
              return (
                <>
                  <div key={index}>
                    <div className="flex gap-2 py-2">
                      <label htmlFor="workexpcompany" className="pt-1.5">Company Name</label>
                      <input type="text" id="workexpcompany" className="w-40" value={element.company_name ? element.company_name : ""} readOnly />
                      <label htmlFor="workexpdesig" className="pr-2 pt-1.5">Designation</label>
                      <input type="text" id="workexpdesig" className="w-40" value={element.designation ? element.designation : ""} readOnly />
                      <label htmlFor="workexpfrom" className="pr-2 pt-1.5">From</label>
                      <input type="date" id="workexpfrom" className="w-40" value={element.from_date ? element.from_date : ""} readOnly />
                      <label htmlFor="workexpto" className="pr-2 pt-1.5">To</label>
                      <input type="date" id="workexpto" className="w-40" value={element.to_date ? element.to_date : ""} readOnly />
                    </div>
                  </div>
                </>
              )
            })}

          </div>
        </fieldset> : ""}<br />
        {data?.langknown_details ? <fieldset className="border-2">
          <legend className="text-3xl">Language Known</legend>
          <div className="p-6">
            <table className="border-2 border-slate-400 w-96">
              <thead>
                <tr>
                  <td className="border-2 border-slate-400 w-96">Language Name</td>
                  <td className="border-2 border-slate-400 w-96">Read,Write,Speak</td>
                </tr>
              </thead>
              <tbody>
                {data.langknown_details.map((element: any) => {
                  return (
                    <tr>
                      <td className="border-2 border-slate-400 w-96">{element.language_name ? element.language_name : ""}</td>
                      <td className="border-2 border-slate-400 w-96">{element.rws ? element.rws : ""}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div><br />
        </fieldset> : ""}
        {data?.techknown_details ? < fieldset className="border-2">
          <legend className="text-3xl">Technology Known</legend>
          <div className="p-6">
            <table className="border-2 border-slate-400 w-96">
              <thead>
                <tr>
                  <td className="border-2 border-slate-400 w-96">Technology Name</td>
                  <td className="border-2 border-slate-400 w-96">Level of Expertise</td>
                </tr>
              </thead>
              <tbody>
                {data.techknown_details.map((element: any) => {
                  return (
                    <tr>
                      <td className="border-2 border-slate-400 w-96">{element.technology_name ? element.technology_name : ""}</td>
                      <td className="border-2 border-slate-400 w-96">{element.level_of_expertise ? element.level_of_expertise : ""}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </fieldset> : ""}<br />
        {data?.refcontact_details ? <fieldset className="border-2">
          <legend className="text-3xl">Reference Contact</legend>
          <div className="p-6">

            {data.refcontact_details.map((element: any, index: number) => {
              return (
                <>
                  <div key={index}>
                    <div className="flex gap-2 py-2">
                      <label htmlFor="name" className="pt-1.5">Name</label>
                      <input type="text" id="name" className="w-40" value={element.name ? element.name : ""} readOnly />
                      <label htmlFor="contact" className="pr-2 pt-1.5">Contact Number</label>
                      <input type="text" id="contact" className="w-40" value={element.contactnumber ? element.contactnumber : ""} readOnly />
                      <label htmlFor="relation" className="pr-2 pt-1.5">Relation</label>
                      <input type="text" id="relation" className="w-40" value={element.relation ? element.relation : ""} readOnly />
                    </div>
                  </div>
                </>
              )
            })}

          </div>
        </fieldset> : ""}<br />
        {data?.preferences_details ? < fieldset className="border-2">
          <legend className="text-3xl">Preferences</legend>
          <div className="p-6">
            <label htmlFor="preferredlocation" className="pr-2">Preferred Location</label>
            <input type="text" id="preferredlocation" className="" value={data.preferences_details.preferredlocation ? data.preferences_details.preferredlocation : ""} readOnly /><br /><br />
            <label htmlFor="noticeperiod" className="pr-2">Notice Period</label>
            <input type="text" id="noticeperiod" className="" value={data.preferences_details.noticeperiod ? data.preferences_details.noticeperiod : ""} readOnly /><br /><br />

            <label htmlFor="expectedctc" className="pr-2">Expected CTC</label>
            <input type="text" id="expectedctc" className="" value={data.preferences_details.expectedctc ? data.preferences_details.expectedctc : ""} readOnly /><br /><br />

            <label htmlFor="currentctc" className="pr-2">Current CTC</label>
            <input type="text" id="currentctc" className="" value={data.preferences_details.currentctc ? data.preferences_details.currentctc : ""} readOnly /><br /><br />

            <label htmlFor="department" className="pr-2">Department</label>
            <input type="text" id="department" className="" value={data.preferences_details.department ? data.preferences_details.department : ""} readOnly />
          </div>
        </fieldset> : ""}


      </form>

      {data?.preferences_details ? <div className="flex justify-center pt-10">
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 w-36" onClick={() => editDetails({ data })} >Edit</button>
      </div> : ""}
    </div >
  )
}