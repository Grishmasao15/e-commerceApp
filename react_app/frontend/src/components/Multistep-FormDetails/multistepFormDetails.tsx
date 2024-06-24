
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export const MultistepFormTable = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const home = () => {
    navigate(`/home`)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3030/form-details", { withCredentials: true });
        console.log(res, "ressssss");
        setPosts(res.data.data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  interface elementInterface {
    id: number,
    firstname: string,
    lastname: string,
    phonenumber: string,
    email: string,
    gender: string,
    city: string,
    createdAt: Date,
    updatedAt: Date

  }


  const deleteData = async (id: number) => {
    let res = await axios.post(`http://localhost:3030/delete-multiform-data/${id}`);

    console.log(res, "delete res");
    if (res.data.success) {
      alert(res.data.message);
      navigate(`/home`)
    }
    else {
      alert("problem with deleting record")
    }

  }

  const viewDetails = async (id: number) => {
    navigate(`/view-details`, { state: id })
  }


  return (
    <>
      <div className="main">
        <div className="table-header">
          <h1 className="text-3xl font-semibold pb-8 pt-8">Multi-step Form Details</h1>
          <table id="myTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Gender</th>
                <th>City</th>
                <th>View Details</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {posts.map((element: elementInterface, i) => {

                return (<tr key={i}>
                  <td>{element.id}</td>
                  <td>{element.firstname}</td>
                  <td>{element.lastname}</td>
                  <td>{element.phonenumber}</td>
                  <td>{element.email}</td>
                  <td>{element.gender}</td>
                  <td>{element.city}</td>
                  <td><button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" onClick={() => viewDetails(element.id)}>View Details</button></td>
                  <td><button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" onClick={() => deleteData(element.id)}>Delete</button></td>
                </tr>)
              })}
            </tbody>
          </table>
          <div className="flex justify-center pt-16">
            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2" onClick={home}>Home</button>
          </div>
        </div>
      </div>
    </>
  )
}