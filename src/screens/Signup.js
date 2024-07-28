import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img1 from "../images/img4.jpg";

export default function Signup() {
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
        location: cred.geolocation,
      }),
    });
    const jsonval = await response.json();
    if (!jsonval.success) {
      alert("Enter valid credentials");
    }
    if (jsonval.success) {
      navigate("/login");
    }
  };
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-container">
      <div className="login-image">
        <img
          src={Img1}
          className="d-block"
          alt="..."
          style={{ height: "500px", objectFit: "fill" }}
        />
      </div>
      <div className="login-form container">
        <form className="login-page" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              name="name"
              value={cred.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={cred.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={cred.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLocation1" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLocation1"
              name="geolocation"
              value={cred.geolocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
