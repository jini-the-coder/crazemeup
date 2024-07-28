import React from "react";
import { Link } from "react-router-dom";
import twitter from "../images/twitter.svg";
import instagram from "../images/instagram.svg";
import facebook from "../images/facebook.svg";

export default function Footer() {
  return (
    <footer className="py-1" style={{ backgroundColor: "#f9d6d6" }}>
      <div className="d-flex justify-content-center gap-10 py-4 my-4 border-top">
        <p>© 2024 CrazeMeUP, Inc. All rights reserved.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <Link to="#">
              <img
                src={twitter}
                alt="twitter"
                className="bi"
                width="24"
                height="24"
              />
            </Link>
          </li>
          <li className="ms-3">
            <Link to="#">
              <img
                src={instagram}
                alt="instagram"
                className="bi"
                width="24"
                height="24"
              />
            </Link>
          </li>
          <li className="ms-3">
            <Link to="#">
              <img
                src={facebook}
                alt="facebook"
                className="bi"
                width="24"
                height="24"
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
