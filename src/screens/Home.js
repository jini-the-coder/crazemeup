import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [clothItems, setClothItems] = useState([]);
  const [clothCategory, setClothCategory] = useState([]);
  const [itemsFetched, setItemsFetched] = useState(false);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/clothData", {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
    });
    let responseval = await response.json();
    setClothItems(responseval[0]);
    setClothCategory(responseval[1]);
    setItemsFetched(true);
    if (localStorage.getItem("authToken")) {
      let userdata = await fetch("http://localhost:5000/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });
      let userdataval = await userdata.json();
      // console.log(userdataval);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      {/* <Carousel /> */}
      <div className="d-flex justify-content-center m-3">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="container">
        {itemsFetched &&
          clothCategory.map((data) => {
            return (
              <div key={data._id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {itemsFetched &&
                  clothItems
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            filterItems={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })}
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
}
