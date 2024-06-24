import '../css/homepage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {
  const navigate = useNavigate()

  const form = () => {
    navigate(`/student-form`)
  }
  const studentDetails = () => {
    navigate(`/student-details`)
  }
  const multiStepForm = () => {
    navigate(`/multistep-form`)
  }
  const multiStepFormDetails = () => {
    navigate(`/multistep-formdetails`)
  }

  const logOutFunc = async () => {
    let res = await axios.post(`http://localhost:3030/logout`, {}, { withCredentials: true });
    console.log(res, "logout res");
    if (res.status === 200) {
      navigate(`/`)
    }
  }


  return (
    <>
      <div className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 homePage">
        <div className="pt-8 pr-8">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 float-end" onClick={logOutFunc}>Log Out</button>
        </div>
        <h1 className='text-2xl py-16'>Click on buttons to fill the details and view details</h1>
        <div className=''>
          <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2" onClick={form}>Form</button><br /><br />
          <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2" onClick={studentDetails}>Student Details</button><br /><br />
          <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2" onClick={multiStepForm}>Multistep Form</button><br /><br />
          <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2" onClick={multiStepFormDetails}>Multistep Form Details</button><br />
        </div>
      </div>
    </>
  )
}