import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const navigate = useNavigate();

  const [inputdata, setInputdata] = useState({
    name: "",
    address: "",
    subject: "",
    contact: "",
  });

  //onchange function
  const setstud = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputdata((prestud) => {
      return {
        ...prestud,
        [name]: value,
      };
    });
  };

  //get single data student
  const { id } = useParams("");
  console.log(id);

  const getstuddata = async () => {
    const res = await fetch(
      `https://mern-crud-backend-z7q7.onrender.com/getstud/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setInputdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getstuddata();
  }, []);

  //update student Data
  const updatestud = async (e) => {
    e.preventDefault();

    const { name, address, subject, contact } = inputdata;
    const res2 = await fetch(`http://localhost:5000/updatestud/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        address,
        subject,
        contact,
      }),
    });
    const data2 = await res2.json();
    setInputdata(data2);
    toast.success("Please wait  !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/allstud");
    }, 3000);
  };

  return (
    <div className="container mt-5">
      <h4>Edit Student Information</h4>
      <div className="underline1"></div>
      <form className="mt-5 shadow p-5 w-75">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Student Name"
            onChange={setstud}
            name="name"
            value={inputdata.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Student Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Student Address"
            onChange={setstud}
            name="address"
            value={inputdata.address}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Student Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Subject Name"
            onChange={setstud}
            name="subject"
            value={inputdata.subject}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Student Mobile
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Contact Number"
            onChange={setstud}
            name="contact"
            value={inputdata.contact}
          />
        </div>
        <div className="d-flex">
          <button className="btn btn-primary" onClick={updatestud}>
            update Student
          </button>
          <ToastContainer />
          <NavLink className="btn btn-primary ms-auto" to="/allstud">
            Back to Home
          </NavLink>
        </div>
      </form>
    </div>
  );
}
