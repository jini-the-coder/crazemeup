import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img1 from "../images/img1.jpg";

export default function Login() {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
    });
    const jsonval = await response.json();
    if (!jsonval.success) {
      alert("Enter valid credentials");
    }
    if (jsonval.success) {
      localStorage.setItem("authToken", jsonval.authToken);
      localStorage.setItem("useremail", cred.email);
      navigate("/");
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
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm new user
          </Link>
        </form>
      </div>
    </div>
  );
}
