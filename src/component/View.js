import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export default function View() {
  const [getstud, SetGetstud] = useState([]);

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
      SetGetstud(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getstuddata();
  }, []);

  return (
    <div className="container mt-5">
      <h4>All Student Information</h4>
      <div className="underline"></div>
      <ul className="list-group w-50 mt-4">
        <li className="list-group-item active" aria-current="true">
          All Information About
        </li>
        <li className="list-group-item">Student Name:- {getstud.name}</li>
        <li className="list-group-item">Student Address:- {getstud.address}</li>
        <li className="list-group-item">Student Subject:- {getstud.subject}</li>
        <li className="list-group-item">Student Mobile:- {getstud.contact}</li>
      </ul>
      <Link className="btn btn-primary mt-5" to="/allstud">
        Back
      </Link>
    </div>
  );
}
