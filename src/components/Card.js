import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  const priceRef = useRef();
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    if (localStorage.getItem("authToken")) {
      let cloth = [];
      for (const item of data) {
        if (item.id === props.filterItems._id) {
          cloth = item;
          break;
        }
      }
      if (cloth.length !== 0) {
        if (cloth.size === size) {
          await dispatch({
            type: "UPDATE",
            id: props.filterItems._id,
            price: finalPrice,
            qty: qty,
          });
        } else if (cloth.size !== size) {
          await dispatch({
            type: "ADD",
            id: props.filterItems._id,
            name: props.filterItems.name,
            img: props.filterItems.img,
            price: finalPrice,
            qty: qty,
            size: size,
          });
          return;
        }
        return;
      }
      await dispatch({
        type: "ADD",
        id: props.filterItems._id,
        name: props.filterItems.name,
        img: props.filterItems.img,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      alert("Signin to place order");
    }
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div
        className="card mt-3"
        style={{ width: "18rem", height: "600px", margin: "20px" }}
      >
        <img
          src={props.filterItems.img}
          className="card-img-top"
          alt="..."
          style={{ height: "400px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.filterItems.name}</h5>
          {/* <p className="card-text">Card desc</p> */}
          <div className="container w-100">
            <select
              className="m-2 h-100 rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">${finalPrice}/-</div>
            <hr />
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="m-3 btn btn-success"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
