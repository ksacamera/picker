// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import pickerbanner from "./images/pickerbanner.png";
import axios from "axios";

const Hockey = () => {
  const [brands, setBrands] = useState([]);
  const [stickModels, setStickModels] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch brands
    axios
      .get("/api/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  return (
    <>
      <img
        src={pickerbanner}
        alt="Picker Banner"
        style={{ width: "350px", height: "auto" }}
      />
      <h1>Hockey Page</h1>

      <h2>Brands:</h2>
      <ul>
      {brands.map((brand) => (
          <li key={brand.BrandID}>
            <img
              src={brand.avatar}
              alt={`${brand.BrandName} Avatar`}
              style={{ width: "100px", height: "auto" }}
            />
            {brand.BrandName}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Hockey;
