import React, { useState, useEffect } from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';


const Table = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  interface elementInterface {
    id: number,
    firstname: string,
    lastname: string,
    contact_no: string,
    email: string,
    gender: string,
    city: string,
    createdAt: Date,
    updatedAt: Date

  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3030/message", { withCredentials: true });
        setPosts(res.data.data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const home = () => {
    navigate(`/home`)
  }

  const update = async (id: number) => {
    let res = await fetch(`http://localhost:3030/old-details/${id}`)
    let resjson = await res.json();
    console.log(resjson.data, "resssdataaaaaaaaaaaa");
    navigate(`/student-form`, { state: resjson.data })
  }

  const deleteData = async (id: number) => {
    let res = await axios.post(`http://localhost:3030/delete/${id}`);
    navigate(`/home`)
    console.log(res, "delete res");
  }

  return (
    <div className="main">
      <div className="table-header">
        <h1 className="text-3xl font-semibold pb-8 pt-8">Student Details</h1>
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
              <th>Created At</th>
              <th>Update</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
            {posts.map((element: elementInterface, i) => {

              let created_at!: string;
              if (element.createdAt) {
                let date: Date = new Date(element.createdAt)
                created_at = date.toLocaleString();
              }
              return (<tr key={i}>
                <td>{element.id}</td>
                <td>{element.firstname}</td>
                <td>{element.lastname}</td>
                <td>{element.contact_no}</td>
                <td>{element.email}</td>
                <td>{element.gender}</td>
                <td>{element.city}</td>
                <td id="created_at">{created_at}</td>
                <td><button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" onClick={() => update(element.id)}>Edit</button></td>
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
  );
}

export default Table;