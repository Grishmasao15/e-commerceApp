// Steps/Confirm.js

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { button, Form, Section, SectionRow } from "../Forms/section";
import axios from "axios";
import { Link } from "react-router-dom";

export const Confirm = () => {
  const [state,setState] = useAppState();
  const navigate=useNavigate();
  const { handleSubmit } = useForm({ defaultValues: state });

  const submitData = async (data) => {
    console.info(data,"submit dataaaa");

    try{

      if(!data.firstname || !data.lastname|| !data.designation|| !data.email|| !data.phonenumber|| !data.gender|| !data.dob|| !data.address1|| !data.city|| !data.state|| !data.relationship_status|| !data.sscboard|| !data.sscpassingyear|| !data.sscpercentage|| !data.hscboard|| !data.hscpassingyear|| !data.hscpercentage|| !data.bachelorcourse|| !data.bachelorpassingyear|| !data.bachelorpercentage){
        alert("You've not filled mandatory data which is basic details and education details.please fill it first and then submit form!")
        // navigate(`/multistep-form`)
      }
      else{
        console.log(data,"dataaaaaaaaaaaaa");

        if(data?.basicdetails){
          const id=data?.basicdetails?.id;
          let res = await axios.post(`http://localhost:3030/multi-step-dataupdate/${id}`,{data});
          console.log(res,"ress");
          if(res.data.success){
            alert(res.data.message);
            setState({...{}})
            navigate(`/multistep-formdetails`)
          }
          else{
            alert("problem with storing form data")
          }

        }
        else{
          let res = await axios.post(`http://localhost:3030/multi-step-datastore`,{data});
          if(res.data.success){
            alert(res.data.message)

            setState({...{}})
            navigate(`/multistep-formdetails`)
          }
          else{
            alert("problem with storing form data")
          }
        }
      }
    }
    catch(error){
      console.log(error);
      alert("error in storing form data")
    }

    // Submit data to the server
  };

  return (
    <div className="container">
      <h1 className="flex justify-center text-3xl text-blue-900">Form Preview</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <fieldset className="border-2">
          <legend className="text-3xl">Basic Details</legend>
          <div className="pt-4 pl-5" ><Link className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/multistep-form">Edit</Link></div>
          
          <div className="p-6">
            <div className="pb-3">
              <label htmlFor="firstname" className="pr-2">First Name</label>
              <input type="text" id="firstname" value={state.firstname} readOnly />
              <label htmlFor="lastname" className="pl-6 pr-2">Last Name</label>
              <input type="text" id="lastname" value={state.lastname} readOnly/>
            </div>
            <div className="pb-3">
              <label htmlFor="designation" className="pr-2">Designation</label>
              <input type="text" id="designation" value={state.designation} readOnly/>
              <label htmlFor="email" className="pl-6 pr-2">Email</label>
              <input type="text" id="email" value={state.email} readOnly/>
            </div>
            <div className="pb-3">
              <label htmlFor="phonenumber" className="pr-2">Phone Number</label>
              <input type="text" id="phonenumber" value={state.phonenumber} readOnly/>
              <label htmlFor="gender" className="pl-6 pr-2">Gender</label>
              <input type="text" id="gender" value={state.gender} readOnly/>
            </div>
            <div className="pb-3">
              <label htmlFor="dob" className="pr-2">DOB</label>
              <input type="date" id="dob" value={state.dob} readOnly/>
              <label htmlFor="address1" className="pl-6 pr-2">Address 1</label>
              <input type="text" id="address1" value={state.address1} readOnly/>
            </div>
            <div className="pb-3">
              <label htmlFor="address2" className="pr-2">Address 2</label>
              <input type="text" id="address2" value={state.address2} readOnly/>
              <label htmlFor="city" className="pl-6 pr-2">City</label>
              <input type="text" id="cityy" value={state.city} readOnly/>
            </div>
            <div className="pb-3">
              <label htmlFor="state" className="pr-2">State</label>
              <input type="text" id="statee" value={state.state} readOnly/>
              <label htmlFor="relationshipstatus" className="pl-6 pr-2">Relationship Status</label>
              <input type="text" id="relationshipstatus" value={state.relationship_status} readOnly/>
            </div>
          </div>
        </fieldset><br />
        <fieldset className="border-2">
          <legend className="text-3xl">Education Details</legend>
          <div className="pt-4 pl-5" ><Link className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/education">Edit</Link></div>
          <div className="p-6">
            <label htmlFor="SSC Result">SSC Result</label>
            <hr />
            <div className="py-4">
              <label htmlFor="nameofboard" className="pr-2">Name of Board</label>
              <input type="text" id="nameofboard" value={state.sscboard} readOnly/>
              <label htmlFor="passingyear" className="pr-2">Passing Year</label>
              <input type="text" id="passingyear" value={state.sscpassingyear} readOnly/>
              <label htmlFor="percentage" className="pr-2">Percentage</label>
              <input type="text" id="percentage" value={state.sscpercentage} readOnly/>
            </div>

            <label htmlFor="HSC Result">HSC Result</label>
            <hr />
            <div className="py-4">
              <label htmlFor="nameofboard" className="pr-2">Name of Board</label>
              <input type="text" id="nameofboard" value={state.hscboard} readOnly/>
              <label htmlFor="passingyear" className="pr-2">Passing Year</label>
              <input type="text" id="passingyear" value={state.hscpassingyear} readOnly/>
              <label htmlFor="percentage" className="pr-2">Percentage</label>
              <input type="text" id="percentage" value={state.hscpercentage} readOnly/>
            </div>

            <label htmlFor="bachelordegree">Bachelor Degree</label>
            <hr />
            <div className="py-4">
              <label htmlFor="nameofboard" className="pr-2">Course Name</label>
              <input type="text" id="nameofboard" value={state.bachelorcourse} readOnly/>
              <label htmlFor="passingyear" className="pr-2">Passing Year</label>
              <input type="text" id="passingyear" value={state.bachelorpassingyear} readOnly/>
              <label htmlFor="percentage" className="pr-2">Percentage</label>
              <input type="text" id="percentage" value={state.bachelorpercentage} readOnly/>
            </div>

            <label htmlFor="masterdegree">Master degree</label>
            <hr />
            <div className="py-4">
              <label htmlFor="nameofboard" className="pr-2">Name of Board</label>
              <input type="text" id="nameofboard" value={state.mastercourse} readOnly/>
              <label htmlFor="passingyear" className="pr-2">Passing Year</label>
              <input type="text" id="passingyear" value={state.masterpassingyear} readOnly/>
              <label htmlFor="percentage" className="pr-2">Percentage</label>
              <input type="text" id="percentage" value={state.masterpercentage} readOnly/>
            </div>
          </div>
        </fieldset><br />
        <fieldset className="border-2">
          <legend className="text-3xl">Work Experience</legend>
          <div className="pt-4 pl-5" ><Link className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/work-exp">Edit</Link></div>
          <div className="p-6">

             {state.workexperience?.map((element,index)=>{
              return(
                <>
                <div key={index}>
                <div className="flex gap-2 py-2">
                  <label htmlFor="workexpcompany" className="pt-1.5">Company Name</label>
                  <input type="text" id="workexpcompany" className="w-40" value={element.company_name} readOnly/>
                  <label htmlFor="workexpdesig" className="pr-2 pt-1.5">Designation</label>
                  <input type="text" id="workexpdesig" className="w-40" value={element.designation} readOnly/>
                  <label htmlFor="workexpfrom" className="pr-2 pt-1.5">From</label>
                  <input type="date" id="workexpfrom" className="w-40" value={element.from_date} readOnly/>
                  <label htmlFor="workexpto" className="pr-2 pt-1.5">To</label>
                  <input type="date" id="workexpto" className="w-40" value={element.to_date} readOnly/>
                </div>
                </div>
                </>
              )
             })}
 
          </div>
        </fieldset><br />
        <fieldset className="border-2">
          <legend className="text-3xl">Language Known</legend>
          <div className="pt-4 pl-5" ><Link className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/lang-known">Edit</Link></div>
          <div className="p-6">
            <table className="border-2 border-slate-400 w-96">
              <thead>
                <tr>                  
                  <th className="border-2 border-slate-400">Language Name</th>
                  <th className="border-2 border-slate-400">Read,Write,Speak</th>
                </tr>
              </thead>
              <tbody>
                {state.lang?.map((element)=>{
                  return(
                    <tr>
                      <td className="border-2 border-slate-400">{element}</td>
                      <td className="border-2 border-slate-400">{(state[element])?.toString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div><br />
        </fieldset>
        <fieldset className="border-2">
          <legend className="text-3xl">Technology Known</legend>
          <div className="pt-4 pl-5" ><Link className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/tech-known">Edit</Link></div>
          <div className="p-6">
            <table className="border-2 border-slate-400 w-96">
              <thead>
                <tr>
                  <th className="border-2 border-slate-400">Technology Name</th>
                  <th className="border-2 border-slate-400">Level of Expertise</th>
                </tr>
              </thead>
              <tbody>
                {state.tech?.map((element)=>{
                  return(
                    <tr>
                      <td className="border-2 border-slate-400">{element}</td>
                      <td className="border-2 border-slate-400">{(state[element])?.toString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </fieldset><br />
        <fieldset className="border-2">
          <legend className="text-3xl">Reference Contact</legend>
          <div className="pt-4 pl-5" ><Link className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/ref-contact">Edit</Link></div>
          <div className="p-6">

            {state.referencecontact?.map((element,index)=>{
              return(
                <>
                <div key={index}>
                <div className="py-2">
                  <label htmlFor="name" className="pr-2">Name</label>
                  <input type="text" id="name1" className="" value={element.name} readOnly/>
                  <label htmlFor="contactnumber" className="pr-2 pl-2">Contact Number</label>
                  <input type="text" id="contactnumber1" className="" value={element.contactnumber} readOnly/>
                  <label htmlFor="relation" className="pr-2 pl-2">Relation</label>
                  <input type="text" id="relation1" className="" value={element.relation} readOnly/>
                </div>
                </div>
                </>
              )
             })}    
             
          </div>
        </fieldset><br />
        <fieldset className="border-2">
          <legend className="text-3xl">Preferences</legend>
          <div className="pt-4 pl-5" ><Link className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to="/preferences">Edit</Link></div>
          <div className="p-6">
            <label htmlFor="preferredlocation" className="pr-2">Preferred Location</label>
            <input type="text" id="preferredlocation" className="" value={state.preferredlocation} readOnly/><br /><br />
            <label htmlFor="noticeperiod" className="pr-2">Notice Period</label>
            <input type="text" id="noticeperiod" className="" value={state.noticeperiod} readOnly/><br /><br />
            <label htmlFor="expectedctc" className="pr-2">Expected CTC</label>
            <input type="text" id="expectedctc" className="" value={state.expectedctc} readOnly/><br /><br />
            <label htmlFor="currentctc" className="pr-2">Current CTC</label>
            <input type="text" id="currentctc" className="" value={state.currentctc} readOnly/><br /><br />
            <label htmlFor="department" className="pr-2">Department</label>
            <input type="text" id="department" className="" value={state.department} readOnly/>
          </div>
        </fieldset>

        <div className="flex justify-center pt-10">
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-36">Submit</button>
        </div>
      </form>
    </div>
    

  );
};
